import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import { listProducts } from "@/lib/shop.functions";
import { formatPrice, type Product } from "@/lib/shop";
import { ProductCard } from "@/components/ProductCard";
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
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const heroPoints = [
  "100% premium human hair",
  "Soft, full and long-lasting",
  "Custom sets built for you",
];

const stats = [
  { value: "3", label: "Signature textures" },
  { value: "14–28\"", label: "Lengths in stock" },
  { value: "1,200+", label: "Sets shipped" },
  { value: "4.9", label: "Average rating" },
];

const textureDetail = [
  {
    numeral: "I",
    name: "Straight",
    body: "Glass-flat, mirror shine. The blowout finish that lasts through the week.",
  },
  {
    numeral: "II",
    name: "Body Wave",
    body: "Loose, bouncy movement. Our most-ordered texture for everyday softness.",
  },
  {
    numeral: "III",
    name: "Deep Wave",
    body: "Deep, defined curl pattern with volume that holds after every wash day.",
  },
];

const testimonials = [
  { quote: "Third set from them and the hair still looks brand new.", who: "Naomi · Atlanta" },
  { quote: "The deep wave holds a curl for weeks. I never go anywhere else.", who: "Simone · Houston" },
  { quote: "They built a custom mixed-length set for my wedding. Flawless.", who: "Kayla · Chicago" },
  { quote: "Soft, zero shedding, and the lengths are true to size.", who: "Bri · Detroit" },
  { quote: "Ordered on Monday, installed by Friday. Obsessed.", who: "Tasha · Dallas" },
];

function Home() {
  const { data } = useSuspenseQuery(productsQuery);
  const products = data as Product[];
  const featured = products.filter((p) => p.featured).slice(0, 3);
  const lowest = products.reduce((min, p) => Math.min(min, p.price_cents), Infinity);

  return (
    <div className="w-full">
      {/* HERO — Google-style search scene on light background */}
      <section className="relative isolate overflow-hidden">
        <img
          src={flyerAsset.url}
          alt=""
          aria-hidden
          className="absolute inset-0 size-full object-cover object-[center_28%]"
        />
        <div className="absolute inset-0 bg-background/88" />

        <div className="relative mx-auto flex min-h-[92vh] max-w-4xl flex-col items-center justify-center px-4 pb-16 pt-28 text-center sm:pt-32">
          <h1 className="font-display text-6xl font-semibold leading-none tracking-tight sm:text-8xl lg:text-9xl">
            <span className="text-pink-deep">The</span>{" "}
            <span className="text-foreground">Bundle</span>{" "}
            <span className="text-primary">Society</span>
          </h1>
          <p className="mt-4 max-w-md text-base text-muted-foreground sm:text-lg">
            Premium human hair bundles — soft, full and long-lasting.
          </p>

          <div className="mt-10 w-full">
            <SearchTypewriter
              suggestions={["straight bundles", "body wave sets", "custom orders"]}
            />
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/shop"
              className="rounded-full bg-primary px-7 py-3.5 font-display text-base font-semibold text-primary-foreground shadow-card transition-transform hover:-translate-y-0.5"
            >
              Shop bundles
            </Link>
            <Link
              to="/contact"
              className="rounded-full bg-pink-soft px-7 py-3.5 font-display text-base font-semibold text-accent-foreground shadow-card transition-transform hover:-translate-y-0.5"
            >
              Custom order
            </Link>
          </div>

          <ul className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            {heroPoints.map((point) => (
              <li key={point} className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-primary" />
                {point}
              </li>
            ))}
          </ul>

          <div className="mt-14 flex w-full items-center justify-between border-t border-foreground/15 pt-5 text-sm text-muted-foreground">
            <p>Starting at {formatPrice(Number.isFinite(lowest) ? lowest : 20000)}</p>
            <p className="flex items-center gap-2">
              Scroll to explore <ArrowDown className="size-4 animate-bounce" />
            </p>
          </div>
        </div>
      </section>

      {/* STAT BAR */}
      <section className="bg-ink text-ink-foreground">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-8 border-t border-ink-foreground/15 px-4 py-12 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="px-2">
              <p className="font-display text-4xl font-semibold text-primary sm:text-5xl">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-ink-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT / STATEMENT */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:py-28">
        <p className="text-xs font-bold uppercase tracking-[0.35em] text-pink-deep">The Society</p>
        <div className="mt-6 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <h2 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
            Luxury bundles for the woman who never shows up half-done.
          </h2>
          <div className="flex flex-col justify-end gap-6">
            <p className="text-muted-foreground">
              Every set is hand-checked before it ships — no shedding, no thin wefts, no surprises.
              Mix textures and lengths and we'll build the set around you.
            </p>
            <Link
              to="/shop"
              className="inline-flex w-fit items-center gap-2 font-display text-lg font-semibold text-primary hover:underline"
            >
              Browse the catalogue <ArrowUpRight className="size-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* TEXTURES — numbered list */}
      <section className="border-y border-border/60 bg-card">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-3xl font-semibold sm:text-5xl">
              Three signature <span className="text-pink-deep">textures</span>
            </h2>
            <p className="text-sm text-muted-foreground">Tap a texture to shop it</p>
          </div>

          <div className="mt-10 divide-y divide-border">
            {textureDetail.map((t) => (
              <Link
                key={t.name}
                to="/shop"
                search={{ texture: t.name }}
                className="group grid items-center gap-4 py-8 sm:grid-cols-[6rem_1fr_auto]"
              >
                <span className="font-display text-2xl font-semibold text-primary">{t.numeral}</span>
                <div>
                  <h3 className="font-display text-3xl font-semibold transition-colors group-hover:text-pink-deep sm:text-4xl">
                    {t.name}
                  </h3>
                  <p className="mt-2 max-w-xl text-muted-foreground">{t.body}</p>
                </div>
                <span className="grid size-12 shrink-0 place-items-center rounded-full bg-pink-soft text-accent-foreground transition-transform group-hover:translate-x-1">
                  <ArrowRight className="size-5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED BUNDLES — Shopify-style collection */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:py-24">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-pink-deep">
              The collection
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold sm:text-5xl">
              Featured sets
            </h2>
          </div>
          <Link
            to="/shop"
            className="rounded-full border border-foreground/20 px-6 py-2.5 font-display text-sm font-semibold transition-colors hover:bg-ink hover:text-ink-foreground"
          >
            View all
          </Link>
        </div>
        <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* INTERACTIVE BASKET */}
      <section className="mx-auto max-w-6xl px-4 pb-4">
        <CartPlayground products={products} />
      </section>

      {/* TESTIMONIAL MARQUEE */}
      <section className="mt-20 overflow-hidden bg-ink py-16 text-ink-foreground">
        <p className="mx-auto max-w-6xl px-4 text-xs font-bold uppercase tracking-[0.35em] text-primary">
          Loved by our clients
        </p>
        <div className="mt-8 flex w-max animate-marquee gap-5">
          {[...testimonials, ...testimonials].map((t, i) => (
            <figure
              key={i}
              className="w-[22rem] shrink-0 rounded-3xl bg-ink-foreground/5 p-6 ring-1 ring-ink-foreground/10"
            >
              <blockquote className="font-display text-lg font-semibold leading-snug">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-4 text-sm text-ink-muted">{t.who}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* CTA BAND */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="rounded-[2.5rem] bg-primary px-8 py-14 text-primary-foreground shadow-pop sm:px-14">
          <h2 className="max-w-2xl font-display text-4xl font-semibold leading-[1.05] sm:text-6xl">
            Ready to build your set?
          </h2>
          <p className="mt-4 max-w-lg text-primary-foreground/85">
            Starting at {formatPrice(Number.isFinite(lowest) ? lowest : 20000)}. Limited bundles
            available each drop.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/shop"
              className="rounded-full bg-ink px-7 py-3.5 font-display text-base font-semibold text-ink-foreground transition-transform hover:-translate-y-0.5"
            >
              Shop bundles
            </Link>
            <Link
              to="/contact"
              className="rounded-full bg-pink-soft px-7 py-3.5 font-display text-base font-semibold text-accent-foreground transition-transform hover:-translate-y-0.5"
            >
              Request a custom set
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
