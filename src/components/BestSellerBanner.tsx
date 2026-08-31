import wigAsset from "@/assets/best-seller-wig.jpg.asset.json";

export function BestSellerBanner() {
  return (
    <section aria-label="Best seller" className="overflow-hidden border-y border-border/60 bg-card">
      {/* Ticker — matches the other marquee bars on the page */}
      <div className="flex w-max animate-marquee gap-8 border-b border-border/60 py-2 text-[0.65rem] font-bold uppercase tracking-[0.4em] text-foreground">
        {Array.from({ length: 10 }).map((_, i) => (
          <span key={i} className="flex items-center gap-3">
            <span className="size-1.5 rounded-full bg-primary" />
            Best sellers
            <span className="size-1.5 rounded-full bg-pink-deep" />
          </span>
        ))}
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:py-20 md:grid-cols-[1.1fr_0.9fr]">
        {/* Headline */}
        <div className="text-center md:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-muted-foreground">
            <span className="size-1.5 rounded-full bg-primary" />
            Most loved this month
          </span>
          <h2 className="mt-4 font-display text-5xl font-semibold uppercase leading-[0.95] tracking-tight sm:text-7xl">
            <span className="text-pink-deep">Best</span>{" "}
            <span className="text-foreground">seller</span>
          </h2>
          <p className="mt-4 max-w-md text-sm text-muted-foreground md:mx-0 mx-auto">
            Our burgundy body wave wig — raw donor hair, 350g density and a 6x6 HD lace closure,
            pre-plucked and ready to install straight out of the box.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3 md:justify-start">
            <span className="rounded-full bg-primary px-6 py-3 font-display text-sm font-semibold uppercase tracking-[0.14em] text-primary-foreground shadow-card">
              $260.00
            </span>
            <span className="rounded-full border border-border bg-background px-6 py-3 font-display text-sm font-semibold uppercase tracking-[0.14em] text-foreground shadow-sm">
              18" · Burgundy
            </span>
          </div>
        </div>

        {/* Product with callouts */}
        <div className="relative mx-auto w-full max-w-md pb-4 pt-4">
          <div className="mx-auto aspect-[3/4] w-[52%] overflow-hidden rounded-3xl border border-border bg-background shadow-card">
            <img
              src={wigAsset.url}
              alt="Burgundy body wave 6x6 HD lace closure wig"
              loading="lazy"
              className="h-full w-full object-cover object-center"
            />
          </div>

          {/* Top-left callout */}
          <div className="absolute left-0 top-2 w-[24%]">
            <p className="text-[0.55rem] font-bold uppercase leading-tight tracking-[0.2em] text-muted-foreground">
              Raw donor hair,
              <br />
              350g density
            </p>
            <svg
              viewBox="0 0 120 64"
              className="mt-1 w-full text-pink-deep"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M6 4 V54 H114" strokeLinecap="round" />
              <path d="M106 47 L114 54 L106 61" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* Right callout */}
          <div className="absolute right-0 top-1/3 w-[24%]">
            <p className="text-right text-[0.55rem] font-bold uppercase leading-tight tracking-[0.2em] text-muted-foreground">
              6x6 HD lace
            </p>
            <svg
              viewBox="0 0 120 64"
              className="mt-1 w-full text-primary"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M114 4 V54 H6" strokeLinecap="round" />
              <path d="M14 47 L6 54 L14 61" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
