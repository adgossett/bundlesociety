import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const cartItemSchema = z.object({
  productId: z.string().uuid(),
  length: z.number().int().min(8).max(40),
  quantity: z.number().int().min(1).max(20),
});

const orderSchema = z.object({
  customerName: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(40).default(""),
  addressLine1: z.string().trim().min(1).max(200),
  addressLine2: z.string().trim().max(200).default(""),
  city: z.string().trim().min(1).max(100),
  state: z.string().trim().max(100).default(""),
  postalCode: z.string().trim().max(20).default(""),
  country: z.string().trim().min(1).max(100).default("United States"),
  notes: z.string().trim().max(1000).default(""),
  items: z.array(cartItemSchema).min(1).max(30),
});

const inquirySchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(40).default(""),
  message: z.string().trim().min(1).max(1000),
});

export const listProducts = createServerFn({ method: "GET" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin
    .from("products")
    .select("id, slug, name, texture, description, lengths, price_cents, image_key, featured")
    .eq("active", true)
    .order("price_cents", { ascending: true });
  if (error) {
    console.error("listProducts failed", error.message);
    throw new Error("Could not load bundles right now.");
  }
  return data ?? [];
});

export const getProduct = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) => z.object({ slug: z.string().max(120) }).parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row, error } = await supabaseAdmin
      .from("products")
      .select("id, slug, name, texture, description, lengths, price_cents, image_key, featured")
      .eq("slug", data.slug)
      .eq("active", true)
      .maybeSingle();
    if (error) {
      console.error("getProduct failed", error.message);
      throw new Error("Could not load this bundle.");
    }
    return row;
  });

export const createOrder = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => orderSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const ids = [...new Set(data.items.map((i) => i.productId))];
    const { data: products, error: productError } = await supabaseAdmin
      .from("products")
      .select("id, name, price_cents, lengths")
      .in("id", ids)
      .eq("active", true);
    if (productError || !products || products.length !== ids.length) {
      throw new Error("One or more bundles are no longer available.");
    }

    const byId = new Map(products.map((p) => [p.id, p]));
    const items = data.items.map((item) => {
      const product = byId.get(item.productId)!;
      if (!product.lengths.includes(item.length)) {
        throw new Error(`${product.name} is not available in ${item.length}".`);
      }
      return {
        product_id: product.id,
        product_name: product.name,
        length: item.length,
        quantity: item.quantity,
        unit_price_cents: product.price_cents,
      };
    });

    const total = items.reduce((sum, i) => sum + i.unit_price_cents * i.quantity, 0);
    const reference = `TBS-${Date.now().toString(36).toUpperCase().slice(-5)}${Math.floor(Math.random() * 900 + 100)}`;

    const { data: order, error: orderError } = await supabaseAdmin
      .from("orders")
      .insert({
        reference,
        customer_name: data.customerName,
        email: data.email,
        phone: data.phone,
        address_line1: data.addressLine1,
        address_line2: data.addressLine2,
        city: data.city,
        state: data.state,
        postal_code: data.postalCode,
        country: data.country,
        notes: data.notes,
        total_cents: total,
      })
      .select("id, reference")
      .single();
    if (orderError || !order) {
      console.error("createOrder failed", orderError?.message);
      throw new Error("We couldn't save your order. Please try again.");
    }

    const { error: itemsError } = await supabaseAdmin
      .from("order_items")
      .insert(items.map((i) => ({ ...i, order_id: order.id })));
    if (itemsError) {
      console.error("createOrder items failed", itemsError.message);
      throw new Error("We couldn't save your order items. Please try again.");
    }

    return { id: order.id, reference: order.reference };
  });

export const getOrder = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) => z.object({ id: z.string().uuid() }).parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: order, error } = await supabaseAdmin
      .from("orders")
      .select("id, reference, customer_name, city, state, status, total_cents, created_at")
      .eq("id", data.id)
      .maybeSingle();
    if (error) {
      console.error("getOrder failed", error.message);
      throw new Error("Could not load this order.");
    }
    if (!order) return null;
    const { data: items } = await supabaseAdmin
      .from("order_items")
      .select("id, product_name, length, quantity, unit_price_cents")
      .eq("order_id", order.id);
    return { order, items: items ?? [] };
  });

export const createInquiry = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => inquirySchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("inquiries").insert({
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message,
    });
    if (error) {
      console.error("createInquiry failed", error.message);
      throw new Error("We couldn't send your message. Please try again.");
    }
    return { ok: true };
  });
