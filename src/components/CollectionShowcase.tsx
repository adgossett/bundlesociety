import { useState } from "react";
import { type Product } from "@/lib/shop";
import { ProductCard } from "@/components/ProductCard";
import bundlesAsset from "@/assets/col-bundles.jpg.asset.json";
import lashesAsset from "@/assets/col-lashes.jpg.asset.json";
import lipglossAsset from "@/assets/col-lipgloss.jpg.asset.json";
import wigBobAsset from "@/assets/prod-wig-bob.jpg.asset.json";
import wigLongAsset from "@/assets/prod-wig-long.jpg.asset.json";
import bundlesHandAsset from "@/assets/prod-bundles-hand.jpg.asset.json";
import bundleBoxAsset from "@/assets/prod-bundle-box.jpg.asset.json";

const gridImages = [
  bundlesHandAsset.url,
  wigLongAsset.url,
  bundleBoxAsset.url,
  wigBobAsset.url,
];

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
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <span className="absolute inset-x-0 top-0 z-10 block bg-primary py-1 text-center text-[8px] font-bold uppercase tracking-[0.35em] text-primary-foreground">
                    Shop by collection
                  </span>
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

      {/* Active collection grid — light banner band */}
      <div className="bg-card">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <h2 className="text-center font-display text-5xl font-extrabold uppercase leading-[0.9] tracking-tighter text-foreground sm:text-7xl">
            {current.heading}
          </h2>
          <p className="mx-auto mt-4 max-w-md text-center text-sm text-muted-foreground">
            {current.blurb} Tap a collection above to switch.
          </p>
          <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4 [&_.rounded-2xl]:rounded-none [&_.rounded-2xl]:border [&_.rounded-2xl]:border-border [&_.rounded-2xl]:bg-card">
            {shown.map((product, i) => (
              <div key={product.id} className="relative">
                <span className="pointer-events-none absolute inset-x-0 top-0 z-10 block bg-primary py-1 text-center text-[8px] font-bold uppercase tracking-[0.35em] text-primary-foreground">
                  {current.title}
                </span>
                <ProductCard
                  product={product}
                  imageUrl={gridImages[i % gridImages.length]}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
