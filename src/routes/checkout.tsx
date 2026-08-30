import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { createOrder } from "@/lib/shop.functions";
import { formatPrice } from "@/lib/shop";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Place Your Order — The Bundle Society" },
      {
        name: "description",
        content: "Send us your bundle order and shipping details. We confirm payment personally.",
      },
      { property: "og:title", content: "Place Your Order — The Bundle Society" },
      { property: "og:description", content: "Submit your bundle order request." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Checkout,
});

const schema = z.object({
  customerName: z.string().trim().min(1, "Enter your full name").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().max(40),
  addressLine1: z.string().trim().min(1, "Enter your street address").max(200),
  addressLine2: z.string().trim().max(200),
  city: z.string().trim().min(1, "Enter your city").max(100),
  state: z.string().trim().max(100),
  postalCode: z.string().trim().max(20),
  country: z.string().trim().min(1, "Enter your country").max(100),
  notes: z.string().trim().max(1000),
});

function Checkout() {
  const { lines, subtotal, clear } = useCart();
  const submit = useServerFn(createOrder);
  const navigate = useNavigate();
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const raw = Object.fromEntries(
      ["customerName", "email", "phone", "addressLine1", "addressLine2", "city", "state", "postalCode", "country", "notes"].map(
        (key) => [key, String(form.get(key) ?? "")],
      ),
    );
    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) next[String(issue.path[0])] = issue.message;
      setErrors(next);
      return;
    }
    setErrors({});
    setSending(true);
    try {
      const result = await submit({
        data: {
          ...parsed.data,
          items: lines.map((l) => ({
            productId: l.productId,
            length: l.length,
            quantity: l.quantity,
          })),
        },
      });
      clear();
      toast.success("Order request sent!");
      navigate({ to: "/order/$id", params: { id: result.id } });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setSending(false);
    }
  }

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <h1 className="font-display text-4xl font-semibold">Your cart is empty</h1>
        <Link
          to="/shop"
          className="mt-6 inline-block rounded-2xl bg-primary px-6 py-3 font-display text-lg font-semibold text-primary-foreground"
        >
          Shop bundles
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="font-display text-5xl font-semibold">
        Place your <span className="text-primary">order</span>
      </h1>
      <p className="mt-2 max-w-lg text-muted-foreground">
        No payment is taken here. We review your request and reach out with payment and shipping
        details.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <form onSubmit={onSubmit} className="space-y-4 rounded-3xl bg-card p-6 shadow-pop sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Full name" name="customerName" error={errors["customerName"]} />
            <Field label="Email" name="email" type="email" error={errors["email"]} />
          </div>
          <Field label="Phone (optional)" name="phone" error={errors["phone"]} />
          <Field label="Street address" name="addressLine1" error={errors["addressLine1"]} />
          <Field label="Apartment, suite (optional)" name="addressLine2" error={errors["addressLine2"]} />
          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="City" name="city" error={errors["city"]} />
            <Field label="State" name="state" error={errors["state"]} />
            <Field label="Postal code" name="postalCode" error={errors["postalCode"]} />
          </div>
          <Field label="Country" name="country" defaultValue="United States" error={errors["country"]} />
          <div>
            <label htmlFor="notes" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Order notes (optional)
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={4}
              maxLength={1000}
              className="mt-1 w-full rounded-2xl border border-border bg-background px-4 py-3 outline-none focus:border-primary"
            />
          </div>
          <button
            type="submit"
            disabled={sending}
            className="w-full rounded-2xl bg-primary px-6 py-4 font-display text-lg font-semibold text-primary-foreground disabled:opacity-60"
          >
            {sending ? "Sending…" : "Submit order request"}
          </button>
        </form>

        <aside className="h-fit rounded-3xl bg-card p-6 shadow-pop">
          <h2 className="font-display text-2xl font-semibold">Order summary</h2>
          <ul className="mt-4 space-y-3">
            {lines.map((line) => (
              <li key={`${line.productId}-${line.length}`} className="flex justify-between gap-3 text-sm">
                <span>
                  {line.name} · {line.length}" × {line.quantity}
                </span>
                <span className="font-bold">{formatPrice(line.priceCents * line.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 border-t border-border pt-4">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Total</p>
            <p className="font-display text-3xl font-semibold text-primary">{formatPrice(subtotal)}</p>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  defaultValue,
  error,
}: {
  label: string;
  name: string;
  type?: string | undefined;
  defaultValue?: string | undefined;
  error?: string | undefined;
}) {
  return (
    <div>
      <label htmlFor={name} className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue}
        maxLength={255}
        className="mt-1 w-full rounded-2xl border border-border bg-background px-4 py-3 outline-none focus:border-primary"
      />
      {error && <p className="mt-1 text-sm text-destructive">{error}</p>}
    </div>
  );
}
