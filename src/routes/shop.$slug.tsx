import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { Check } from "lucide-react";
import { getProduct } from "@/lib/shop.functions";
import { formatPrice, imageFor, type Product } from "@/lib/shop";
import { useCart } from "@/lib/cart";

const productQuery = (slug: string) =>
  queryOptions({
    queryKey: ["product", slug],
    queryFn: () => getProduct({ data: { slug } }),
  });

export const Route = createFileRoute("/shop/$slug")({
  loader: async ({ context, params }) => {
    const product = await context.queryClient.ensureQueryData(productQuery(params.slug));
    if (!product) throw notFound();
    return product;
  },
  head: ({ loaderData }) => {
    const product = loaderData as Product | undefined;
    if (!product) {
      return { meta: [{ title: "Bundle unavailable" }, { name: "robots", content: "noindex" }] };
    }
    return {
      meta: [
        { title: `${product.name} — The Bundle Society` },
        { name: "description", content: product.description.slice(0, 155) },
        { property: "og:title", content: `${product.name} — The Bundle Society` },
        { property: "og:description", content: product.description.slice(0, 155) },
      ],
    };
  },
  component: ProductDetail,
});

function ProductDetail() {
  const { slug } = Route.useParams();
  const { data } = useSuspenseQuery(productQuery(slug));
  const product = data as Product;
  const { add } = useCart();
  const [length, setLength] = useState(product.lengths[0]);
  const [quantity, setQuantity] = useState(1);

  function addToCart() {
    add({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      texture: product.texture,
      imageKey: product.image_key,
      length,
      quantity,
      priceCents: product.price_cents,
    });
    toast.success(`${product.name} (${length}") added to your cart`);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Link to="/shop" className="text-sm font-semibold text-muted-foreground hover:text-primary">
        ← Back to shop
      </Link>
      <div className="mt-4 grid gap-8 lg:grid-cols-2">
        <div className="overflow-hidden rounded-[2rem] bg-card shadow-pop">
          <img
            src={imageFor(product.image_key)}
            alt={`${product.name} — ${product.texture} hair bundles`}
            width={1024}
            height={1024}
            className="size-full object-cover"
          />
        </div>
        <div className="rounded-[2rem] bg-card p-8 shadow-pop">
          <span className="rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent-foreground">
            {product.texture}
          </span>
          <h1 className="mt-4 font-display text-4xl font-semibold">{product.name}</h1>
          <p className="mt-2 font-display text-3xl font-semibold text-primary">
            {formatPrice(product.price_cents)}
          </p>
          <p className="mt-4 text-muted-foreground">{product.description}</p>

          <div className="mt-8">
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Length
            </p>
            <div className="flex flex-wrap gap-2">
              {product.lengths.map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLength(l)}
                  className={`rounded-full px-4 py-2 text-sm font-bold transition-colors ${
                    l === length
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted hover:bg-pink-soft"
                  }`}
                >
                  {l}"
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Qty</p>
            <div className="flex items-center gap-3 rounded-full bg-muted px-3 py-1.5">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="size-7 rounded-full bg-card font-bold"
              >
                −
              </button>
              <span className="w-6 text-center font-bold">{quantity}</span>
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => setQuantity((q) => Math.min(20, q + 1))}
                className="size-7 rounded-full bg-card font-bold"
              >
                +
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={addToCart}
            className="mt-8 w-full rounded-2xl bg-primary px-6 py-4 font-display text-lg font-semibold text-primary-foreground shadow-card transition-transform hover:-translate-y-0.5"
          >
            Add to cart
          </button>

          <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
            {["Soft, full and long-lasting", "Minimal shedding", "Custom orders welcome"].map(
              (item) => (
                <li key={item} className="flex items-center gap-2">
                  <Check className="size-4 text-primary" />
                  {item}
                </li>
              ),
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
