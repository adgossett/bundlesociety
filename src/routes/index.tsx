import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { Check, Sparkles } from "lucide-react";
import { listProducts } from "@/lib/shop.functions";
import { formatPrice, type Product } from "@/lib/shop";
import { ProductCard } from "@/components/ProductCard";
import { ArrowButton } from "@/components/ArrowButton";
import { SearchTypewriter } from "@/components/SearchTypewriter";
import { CartPlayground } from "@/components/CartPlayground";

import flyerAsset from "@/assets/flyer-clean.png.asset.json";


const productsQuery = queryOptions({
  queryKey: ["products"],
  queryFn: () => listProducts(),
});

export const Route = createFileRoute("/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(productsQuery),
  head: () => ({
    meta: [
      { title: "The Bundle Society — Premium Hair Bundles from $200" },
      {
        name: "description",
        content:
          "Soft, full and long-lasting premium hair bundles in straight, body wave and deep wave. Multiple lengths, custom orders welcome.",
      },
      { property: "og:title", content: "The Bundle Society — Premium Hair Bundles from $200" },
      {
        property: "og:description",
        content: "Premium straight, body wave and deep wave bundles. Build your look today.",
      },
    ],
  }),
  component: Home,
});

const benefits = [
  "Premium hair bundles",
  "Soft, full, and long-lasting",
  "Straight • Body Wave • Deep Wave",
  "Multiple lengths available",
  "Custom bundle orders welcome",
];

function Home() {
  const { data } = useSuspenseQuery(productsQuery);
  const products = data as Product[];
  const featured = products.filter((p) => p.featured).slice(0, 3);
  const lowest = products.reduce((min, p) => Math.min(min, p.price_cents), Infinity);

  return (
    <div className="mx-auto max-w-6xl px-4 pt-6">
      <section className="relative flex flex-col items-center overflow-hidden rounded-[2.5rem] bg-card px-6 py-16 text-center shadow-pop sm:py-24">
        <img
          src={flyerAsset.url}
          alt=""
          aria-hidden
          className="absolute inset-0 size-full object-cover object-[center_30%]"
        />
        <div className="absolute inset-0 bg-background/45" />
        <div className="relative flex w-full flex-col items-center">
        <h1 className="font-display text-5xl font-semibold tracking-tight sm:text-7xl">
          <span className="text-primary">The</span>{" "}
          <span className="text-pink-deep">Bundle</span>{" "}
          <span className="text-foreground">Society</span>
        </h1>
        <p className="mt-4 max-w-md text-muted-foreground">
          Luxury bundles for the woman who never shows up half-done.
        </p>

        <div className="mt-10 w-full">
          <SearchTypewriter />
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/shop"
            className="rounded-full bg-primary px-7 py-3 font-display text-lg font-semibold text-primary-foreground shadow-card transition-transform hover:-translate-y-0.5"
          >
            Shop Bundles
          </Link>
          <Link
            to="/contact"
            className="rounded-full bg-pink-soft px-7 py-3 font-display text-lg font-semibold text-accent-foreground shadow-card transition-transform hover:-translate-y-0.5"
          >
            Custom Order
          </Link>
        </div>
        </div>
      </section>

      <CartPlayground products={products} />

      <section className="mt-6 grid gap-4 sm:grid-cols-3">

        {["Straight", "Body Wave", "Deep Wave"].map((texture, i) => (
          <Link
            key={texture}
            to="/shop"
            search={{ texture }}
            className={`rounded-3xl px-6 py-8 font-display text-2xl font-semibold shadow-card transition-transform hover:-translate-y-1 ${
              i === 1
                ? "bg-primary text-primary-foreground"
                : "bg-pink-soft text-accent-foreground"
            }`}
          >
            {texture}
            <span className="mt-1 block text-sm font-semibold opacity-80">Shop the texture</span>
          </Link>
        ))}
      </section>

      <section className="mt-16">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <h2 className="font-display text-4xl font-semibold">
            Choose your <span className="text-pink-deep">perfect bundle</span>
          </h2>
          <Link to="/shop" className="font-semibold text-primary hover:underline">
            View all bundles →
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="mt-16 grid gap-6 rounded-[2.5rem] bg-card p-8 shadow-pop sm:p-12 lg:grid-cols-2">
        <div>
          <p className="font-display text-sm font-semibold uppercase tracking-[0.3em] text-pink-deep">
            For
          </p>
          <h2 className="font-display text-6xl font-semibold text-primary">
            Starting at {formatPrice(Number.isFinite(lowest) ? lowest : 20000)}
          </h2>
          <p className="mt-4 max-w-sm text-muted-foreground">
            Every set is quality-checked before it ships. Mix textures and lengths for a fully
            custom order.
          </p>
          <div className="mt-8">
            <ArrowButton to="/shop" tone="pink">
              Select the bundles
              <br />
              you love
            </ArrowButton>
          </div>
        </div>
        <ul className="space-y-4">
          {benefits.map((benefit) => (
            <li key={benefit} className="flex items-start gap-3">
              <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-pink-soft">
                <Check className="size-3.5 text-accent-foreground" />
              </span>
              <span className="font-display text-lg font-semibold">{benefit}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-6 flex items-center gap-3 rounded-3xl bg-card px-6 py-5 shadow-card">
        <Sparkles className="size-5 text-pink-deep" />
        <p className="font-display text-xl font-semibold">Limited bundles available</p>
      </section>
    </div>
  );
}
