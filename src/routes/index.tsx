import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import {
  ArrowDown,
  ArrowRight,
  CreditCard,
  Heart,
  Instagram,
  ShoppingCart,
  Star,
  Truck,
} from "lucide-react";
import { listProducts } from "@/lib/shop.functions";
import { formatPrice, type Product } from "@/lib/shop";
import { SearchTypewriter } from "@/components/SearchTypewriter";
import { HeroFolders } from "@/components/HeroFolders";
import { CollectionShowcase } from "@/components/CollectionShowcase";
import { CountUp } from "@/components/CountUp";




import logoAsset from "@/assets/logo.png.asset.json";
import socialImage from "@/assets/ig-model.png.asset.json";

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

const testimonials = [
  { quote: "Third set from them and the hair still looks brand new.", who: "Naomi · Atlanta" },
  { quote: "The deep wave holds a curl for weeks. I never go anywhere else.", who: "Simone · Houston" },
  { quote: "They built a custom mixed-length set for my wedding. Flawless.", who: "Kayla · Chicago" },
  { quote: "Soft, zero shedding, and the lengths are true to size.", who: "Bri · Detroit" },
  { quote: "Ordered on Monday, installed by Friday. Obsessed.", who: "Tasha · Dallas" },
];

const howItWorks = [
  { icon: ShoppingCart, title: "Add to cart", body: "Pick your textures and lengths, then checkout." },
  { icon: CreditCard, title: "Payment", body: "We accept card, Cash App and Zelle payments." },
  { icon: Truck, title: "Shipping", body: "Sets ship within 1–3 business days, tracked." },
];

function Home() {
  const { data } = useSuspenseQuery(productsQuery);
  const products = data as Product[];
  const lowest = products.reduce((min, p) => Math.min(min, p.price_cents), Infinity);
  const [email, setEmail] = useState("");

  return (
    <div className="w-full">
      {/* HERO — Google-style search scene; artwork with interactive folders lives in the hero itself */}
      <section className="relative isolate overflow-hidden">
        <HeroFolders />

        <div className="relative z-10 mx-auto flex min-h-[92vh] w-full max-w-7xl flex-col justify-center px-4 pb-16 pt-32 sm:px-6 sm:pt-36 lg:px-10">
          <div className="w-full max-w-xl text-center md:max-w-[34rem] md:text-left lg:max-w-[38rem]">
            <h1>
              <span className="sr-only">The Bundle Society</span>
              <img
                src={logoAsset.url}
                alt=""
                aria-hidden
                className="mx-auto w-64 drop-shadow-sm sm:w-80 md:mx-0 lg:w-96"
                width={1096}
                height={643}
              />
            </h1>
            <p className="mx-auto mt-4 max-w-md text-base text-muted-foreground sm:text-lg md:mx-0">
              Premium human hair bundles — soft, full and long-lasting.
            </p>

            <div className="mt-8 w-full sm:mt-10">
              <SearchTypewriter
                suggestions={["straight bundles", "body wave sets", "custom orders"]}
                className="mx-auto md:mx-0"
              />
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
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

            <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground md:justify-start">
              {heroPoints.map((point) => (
                <li key={point} className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-primary" />
                  {point}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex w-full flex-col gap-3 border-t border-foreground/15 pt-5 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
              <p>Starting at {formatPrice(Number.isFinite(lowest) ? lowest : 20000)}</p>
              <p className="flex items-center justify-center gap-2 md:justify-start">
                Scroll to explore <ArrowDown className="size-4 animate-bounce" />
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* SHOP BY COLLECTION — interactive posters + active collection grid */}
      <CollectionShowcase products={products} />

      {/* STAT BAR */}
      <section className="border-y border-border/60 bg-card/60">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-3xl border border-border bg-background px-5 py-6 text-center shadow-sm"
              >
                <p className="font-display text-3xl font-semibold text-primary sm:text-4xl">
                  <CountUp value={stat.value} />
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* JOIN THE LIST */}
      <section className="relative overflow-hidden border-y border-border/60 bg-card">
        <div className="flex w-max animate-marquee gap-8 border-b border-border/60 py-2 text-[0.65rem] font-bold uppercase tracking-[0.4em] text-pink-deep">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i}>Subscribe to the newsletter</span>
          ))}
        </div>
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:py-20">
          <h2 className="font-display text-5xl font-semibold uppercase leading-[0.95] tracking-tight sm:text-7xl">
            Join the list
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground">
            Be the first to know about new bundle drops, restocks and members-only offers.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("You're on the list — welcome to the Society.");
              setEmail("");
            }}
            className="mx-auto mt-8 flex w-full max-w-md items-center gap-2 rounded-full border border-border bg-background p-1.5 shadow-sm"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              aria-label="Email address"
              className="min-w-0 flex-1 bg-transparent px-4 text-sm outline-none placeholder:text-muted-foreground"
            />
            <button
              type="submit"
              className="grid size-10 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105"
              aria-label="Subscribe"
            >
              <ArrowRight className="size-5" />
            </button>
          </form>
        </div>
      </section>

      {/* HOW IT WORKS — icon circles */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <div className="grid gap-10 sm:grid-cols-3">
          {howItWorks.map(({ icon: Icon, title, body }) => (
            <div key={title} className="flex flex-col items-center text-center">
              <span className="grid size-28 place-items-center rounded-full border-2 border-pink-deep/40 bg-pink-soft text-accent-foreground shadow-sm">
                <Icon className="size-10" strokeWidth={1.5} />
              </span>
              <h3 className="mt-5 font-display text-sm font-bold uppercase tracking-[0.2em]">
                {title}
              </h3>
              <p className="mt-2 max-w-[16rem] text-sm text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* LOTS OF LOVE — reviews */}
      <section className="overflow-hidden border-y border-border/60 bg-pink-soft/60">
        <div className="flex w-max animate-marquee gap-8 border-b border-border/60 py-2 text-[0.65rem] font-bold uppercase tracking-[0.4em] text-accent-foreground">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i}>Customer's reviews</span>
          ))}
        </div>
        <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:py-20">
          <h2 className="font-display text-5xl font-semibold uppercase leading-[0.95] tracking-tight sm:text-7xl">
            Lots of love
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {testimonials.slice(0, 3).map((t) => (
              <figure key={t.who} className="rounded-2xl border border-border bg-background p-6">
                <div className="flex justify-center gap-0.5 text-primary">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-4 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-3 text-xs font-bold uppercase tracking-[0.2em]">
                  {t.who}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* SOCIAL — dark band with torn-page bottom edge */}
      <section className="relative overflow-hidden bg-foreground text-background">
        <div className="flex w-max animate-marquee gap-8 border-b border-background/15 py-2 text-[0.65rem] font-bold uppercase tracking-[0.4em] text-pink-deep">
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i}>Follow us</span>
          ))}
        </div>
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 pb-28 sm:py-20 sm:pb-32 md:grid-cols-2">
          <div className="relative mx-auto w-full max-w-sm">
            {/* corner stickers */}
            <div className="absolute -left-4 -top-4 z-10 rotate-[-12deg] border-2 border-pink-soft bg-foreground p-2 shadow-card">
              <Heart className="size-4 fill-pink-soft text-pink-soft" />
            </div>
            <div className="absolute -bottom-4 -right-4 z-10 rotate-[10deg] border-2 border-pink-soft bg-foreground p-2 shadow-card">
              <Heart className="size-4 fill-pink-soft text-pink-soft" />
            </div>
            {/* pink polaroid-style frame with cropped inset photo */}
            <div className="rotate-[-2deg] bg-pink-soft p-5 pb-16 shadow-card sm:p-6 sm:pb-20">
              <img
                src={socialImage.url}
                alt="Bundle Society hair bundles"
                className="aspect-[4/5] w-full border-2 border-foreground/10 object-cover object-top"
                loading="lazy"
              />
            </div>
          </div>
          <div className="text-center md:text-left">
            <div className="relative inline-block">
              <p className="font-script relative z-10 -mb-4 -rotate-3 text-4xl text-white sm:-mb-6 sm:text-5xl">
                Let's get social on
              </p>
              <h2 className="font-condensed text-[5.5rem] uppercase leading-[0.85] tracking-wide text-pink-deep sm:text-[8.5rem]">
                Instagram
              </h2>
            </div>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="mt-7 inline-flex items-center gap-2 rounded-full border-2 border-background/40 px-7 py-3.5 font-display text-sm font-semibold uppercase tracking-[0.15em] transition-colors hover:border-primary hover:text-primary"
            >
              <Instagram className="size-4" /> @thebundlesociety
            </a>
          </div>
        </div>
        {/* torn paper edge */}
        <svg
          aria-hidden="true"
          className="absolute bottom-0 left-0 h-10 w-full text-background sm:h-14"
          viewBox="0 0 1200 48"
          preserveAspectRatio="none"
        >
          {/* soft shadow strip behind the tear */}
          <path
            fill="currentColor"
            opacity="0.35"
            transform="translate(0,-6)"
            d="M0,48 L0,26 L11,18 L27,11 L41,13 L56,15 L65,11 L77,23 L86,15 L98,17 L113,12 L129,35 L135,31 L147,12 L153,33 L161,22 L169,27 L184,23 L200,15 L215,32 L224,19 L238,31 L253,15 L262,28 L276,29 L287,27 L300,21 L309,36 L318,15 L328,30 L339,34 L349,27 L356,30 L364,37 L372,26 L378,31 L392,33 L403,24 L414,30 L429,38 L436,35 L446,28 L462,11 L472,35 L488,38 L498,34 L514,19 L527,20 L542,14 L548,21 L558,20 L567,26 L580,12 L593,27 L603,21 L615,39 L625,34 L636,34 L645,15 L653,16 L669,15 L682,39 L690,21 L696,18 L710,23 L725,20 L739,32 L755,31 L768,41 L784,39 L796,26 L808,14 L824,23 L833,12 L846,15 L857,27 L864,15 L872,27 L883,27 L890,36 L905,24 L921,21 L936,22 L943,17 L956,26 L969,19 L977,16 L988,33 L1001,40 L1009,27 L1018,29 L1026,35 L1032,39 L1042,37 L1049,37 L1059,29 L1067,25 L1076,31 L1090,24 L1099,33 L1108,36 L1120,37 L1129,19 L1142,24 L1148,17 L1158,25 L1167,35 L1178,29 L1189,19 L1198,12 L1211,17 L1200,48 Z"
          />
          <path
            fill="currentColor"
            d="M0,48 L0,26 L11,18 L27,11 L41,13 L56,15 L65,11 L77,23 L86,15 L98,17 L113,12 L129,35 L135,31 L147,12 L153,33 L161,22 L169,27 L184,23 L200,15 L215,32 L224,19 L238,31 L253,15 L262,28 L276,29 L287,27 L300,21 L309,36 L318,15 L328,30 L339,34 L349,27 L356,30 L364,37 L372,26 L378,31 L392,33 L403,24 L414,30 L429,38 L436,35 L446,28 L462,11 L472,35 L488,38 L498,34 L514,19 L527,20 L542,14 L548,21 L558,20 L567,26 L580,12 L593,27 L603,21 L615,39 L625,34 L636,34 L645,15 L653,16 L669,15 L682,39 L690,21 L696,18 L710,23 L725,20 L739,32 L755,31 L768,41 L784,39 L796,26 L808,14 L824,23 L833,12 L846,15 L857,27 L864,15 L872,27 L883,27 L890,36 L905,24 L921,21 L936,22 L943,17 L956,26 L969,19 L977,16 L988,33 L1001,40 L1009,27 L1018,29 L1026,35 L1032,39 L1042,37 L1049,37 L1059,29 L1067,25 L1076,31 L1090,24 L1099,33 L1108,36 L1120,37 L1129,19 L1142,24 L1148,17 L1158,25 L1167,35 L1178,29 L1189,19 L1198,12 L1211,17 L1200,48 Z"
          />
        </svg>
      </section>

      {/* CTA BAND */}
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
