import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import { listProducts } from "@/lib/shop.functions";
import { formatPrice, type Product } from "@/lib/shop";
import { ProductCard } from "@/components/ProductCard";
import { SearchTypewriter } from "@/components/SearchTypewriter";
import { CartPlayground } from "@/components/CartPlayground";
import { HeroFolders } from "@/components/HeroFolders";



import logoAsset from "@/assets/logo.png.asset.json";

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
      {/* HERO — Google-style search scene with interactive product folders */}
      <section className="relative isolate overflow-hidden">
        <div className="relative z-10 mx-auto flex min-h-[88vh] w-full max-w-4xl flex-col justify-center px-4 pb-16 pt-28 text-center sm:px-6 sm:pt-32">
          <h1>
            <span className="sr-only">The Bundle Society</span>
            <img
              src={logoAsset.url}
              alt=""
              aria-hidden
              className="mx-auto w-64 drop-shadow-sm sm:w-80 lg:w-96"
              width={1096}
              height={643}
            />
          </h1>
          <p className="mx-auto mt-4 max-w-md text-base text-muted-foreground sm:text-lg">
            Premium human hair bundles — soft, full and long-lasting.
          </p>

          <div className="mt-8 w-full sm:mt-10">
            <SearchTypewriter
              suggestions={["straight bundles", "body wave sets", "custom orders"]}
              className="mx-auto"
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

          <div className="mx-auto mt-14 w-full max-w-2xl">
            <HeroFolders />
          </div>

          <ul className="mt-12 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            {heroPoints.map((point) => (
              <li key={point} className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-primary" />
                {point}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex w-full flex-col gap-3 border-t border-foreground/15 pt-5 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <p>Starting at {formatPrice(Number.isFinite(lowest) ? lowest : 20000)}</p>
            <p className="flex items-center justify-center gap-2">
              Scroll to explore <ArrowDown className="size-4 animate-bounce" />
            </p>
          </div>
        </div>
      </section>


      {/* RESULT CHIPS + STAT BAR */}
      <section className="border-y border-border/60 bg-card/60">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="flex flex-wrap justify-center gap-2.5">
            {["All", "Straight", "Body Wave", "Deep Wave", "Custom sets"].map((chip, i) => (
              <Link
                key={chip}
                to="/shop"
                {...(i > 0 && i < 4 ? { search: { texture: chip } } : {})}
                className="rounded-full border border-border bg-background px-5 py-2 text-sm font-medium text-muted-foreground shadow-sm transition-colors hover:border-primary hover:text-foreground"
              >
                {chip}
              </Link>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-3xl border border-border bg-background px-5 py-6 text-center shadow-sm"
              >
                <p className="font-display text-3xl font-semibold text-primary sm:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT / STATEMENT */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:py-24">
        <div className="rounded-[2.5rem] border border-border bg-card px-6 py-14 shadow-sm sm:px-14">
          <p className="text-center text-xs font-bold uppercase tracking-[0.35em] text-pink-deep">
            The Society
          </p>
          <h2 className="mx-auto mt-5 max-w-3xl text-center font-display text-3xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
            Luxury bundles for the woman who never shows up half-done.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-center text-muted-foreground">
            Every set is hand-checked before it ships — no shedding, no thin wefts, no surprises.
            Mix textures and lengths and we'll build the set around you.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-display text-base font-semibold text-primary-foreground shadow-card transition-transform hover:-translate-y-0.5"
            >
              Browse the catalogue <ArrowUpRight className="size-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* TEXTURES — result-style cards */}
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:pb-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-3xl font-semibold sm:text-5xl">
            Three signature <span className="text-pink-deep">textures</span>
          </h2>
          <p className="text-sm text-muted-foreground">Tap a texture to shop it</p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {textureDetail.map((t) => (
            <Link
              key={t.name}
              to="/shop"
              search={{ texture: t.name }}
              className="group flex flex-col rounded-3xl border border-border bg-background p-7 shadow-sm transition-all hover:-translate-y-1 hover:border-primary hover:shadow-card"
            >
              <span className="font-display text-xl font-semibold text-primary">{t.numeral}</span>
              <h3 className="mt-3 font-display text-2xl font-semibold transition-colors group-hover:text-pink-deep sm:text-3xl">
                {t.name}
              </h3>
              <p className="mt-2 flex-1 text-muted-foreground">{t.body}</p>
              <span className="mt-6 grid size-11 place-items-center rounded-full bg-pink-soft text-accent-foreground transition-transform group-hover:translate-x-1">
                <ArrowRight className="size-5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED BUNDLES — Shopify-style collection */}
      <section className="border-y border-border/60 bg-card/60">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:py-24">
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
              className="rounded-full border border-foreground/20 bg-background px-6 py-2.5 font-display text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
            >
              View all
            </Link>
          </div>
          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* INTERACTIVE BASKET */}
      <section className="mx-auto max-w-6xl px-4 pt-20">
        <CartPlayground products={products} />
      </section>

      {/* TESTIMONIAL MARQUEE */}
      <section className="mt-20 overflow-hidden border-y border-border/60 bg-card/60 py-16">
        <p className="mx-auto max-w-6xl px-4 text-xs font-bold uppercase tracking-[0.35em] text-pink-deep">
          Loved by our clients
        </p>
        <div className="mt-8 flex w-max animate-marquee gap-5">
          {[...testimonials, ...testimonials].map((t, i) => (
            <figure
              key={i}
              className="w-[22rem] shrink-0 rounded-3xl border border-border bg-background p-6 shadow-sm"
            >
              <blockquote className="font-display text-lg font-semibold leading-snug">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-4 text-sm text-muted-foreground">{t.who}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* CTA BAND — search prompt style */}
      <section className="mx-auto max-w-4xl px-4 py-24 text-center">
        <h2 className="mx-auto max-w-2xl font-display text-4xl font-semibold leading-[1.05] sm:text-5xl">
          Ready to build your set?
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
          Starting at {formatPrice(Number.isFinite(lowest) ? lowest : 20000)}. Limited bundles
          available each drop.
        </p>
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
            Request a custom set
          </Link>
        </div>
      </section>
    </div>
  );
}
