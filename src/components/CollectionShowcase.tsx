import { useState } from "react";
import { type Product } from "@/lib/shop";
import { ProductCard } from "@/components/ProductCard";
import bundlesAsset from "@/assets/col-bundles.jpg.asset.json";
import lashesAsset from "@/assets/col-lashes.jpg.asset.json";
import lipglossAsset from "@/assets/col-lipgloss.jpg.asset.json";

type CollectionId = "new" | "sale" | "best";

const collections: {
  id: CollectionId;
  title: string;
  heading: string;
  blurb: string;
  image: string;
  tone: "pink" | "lime";
}[] = [
  {
    id: "new",
    title: "Bundles",
    heading: "Shop Our Hair Bundles",
    blurb:
      "Premium human hair in straight, body wave and deep wave — soft, full and long-lasting.",
    image: bundlesAsset.url,
    tone: "pink",
  },
  {
    id: "sale",
    title: "Lashes",
    heading: "Shop The Lash Collection",
    blurb: "Fluffy, reusable strip lashes that finish the look in seconds.",
    image: lashesAsset.url,
    tone: "lime",
  },
  {
    id: "best",
    title: "Lip Gloss",
    heading: "Shop Our Pink Gloss",
    blurb: "Hydrating, high-shine gloss made to pair with every set.",
    image: lipglossAsset.url,
    tone: "pink",
  },
];

function pick(products: Product[], id: CollectionId) {
  const sorted = [...products];
  if (id === "best") sorted.sort((a, b) => Number(b.featured) - Number(a.featured));
  if (id === "sale") sorted.sort((a, b) => a.price_cents - b.price_cents);
  if (id === "new") sorted.reverse();
  return sorted.slice(0, 4);
}

export function CollectionShowcase({ products }: { products: Product[] }) {
  const [active, setActive] = useState<CollectionId>("new");
  const current = collections.find((c) => c.id === active)!;
  const shown = pick(products, active);

  return (
    <section aria-label="Shop by collection">
      {/* Poster cards */}
      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-5 sm:grid-cols-3">
          {collections.map((c) => {
            const isActive = c.id === active;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setActive(c.id)}
                aria-pressed={isActive}
                className={`group relative overflow-hidden border-2 bg-card p-2 text-left transition-all duration-300 hover:-translate-y-1 ${
                  isActive
                    ? "border-primary shadow-pop"
                    : "border-border shadow-sm hover:border-pink-deep"
                }`}
              >
                <span className="absolute left-1/2 top-4 z-10 w-max -translate-x-1/2 whitespace-nowrap bg-primary px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.25em] text-primary-foreground backdrop-blur">
                  Shop by collection
                </span>
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <img
                    src={c.image}
                    alt={`${c.title} collection`}
                    loading="lazy"
                    className="absolute inset-0 size-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
                  />
                  <span
                    className="absolute bottom-6 left-5 font-display text-4xl font-extrabold uppercase leading-none tracking-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.55)] sm:text-5xl"
                    style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                  >
                    {c.title}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Ticker strip */}
      <div className="overflow-hidden border-y border-border/60 bg-card/60 py-2.5">
        <div className="flex w-max animate-marquee gap-8 whitespace-nowrap">
          {Array.from({ length: 12 }).map((_, i) => (
            <span
              key={i}
              className="font-display text-xs font-bold uppercase tracking-[0.45em] text-foreground"
            >
              {current.title}
            </span>
          ))}
        </div>
      </div>

      {/* Active collection grid */}
      <div className="bg-background">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <h2 className="text-center font-display text-4xl font-extrabold uppercase tracking-tight sm:text-6xl">
            {current.heading}
          </h2>
          <p className="mx-auto mt-3 max-w-md text-center text-sm text-muted-foreground">
            {current.blurb} Tap a collection above to switch.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4 [&_.rounded-2xl]:rounded-none [&_.rounded-2xl]:border [&_.rounded-2xl]:border-border [&_.rounded-2xl]:bg-card">
            {shown.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
