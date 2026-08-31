import wigAsset from "@/assets/best-seller-wig.jpg.asset.json";

export function BestSellerBanner() {
  return (
    <section aria-label="Best seller" className="border-y border-border/60 bg-card">
      {/* Top ticker */}
      <div className="overflow-hidden bg-foreground py-1.5">
        <div className="flex w-max animate-marquee gap-6 whitespace-nowrap">
          {Array.from({ length: 16 }).map((_, i) => (
            <span
              key={i}
              className="font-display text-[0.6rem] font-bold uppercase tracking-[0.3em] text-background"
            >
              Best Sellers
            </span>
          ))}
        </div>
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 sm:py-16 md:grid-cols-[1.15fr_0.85fr]">
        {/* Headline */}
        <div className="text-center md:text-left">
          <h2 className="font-display text-6xl font-extrabold uppercase leading-[0.85] tracking-tighter sm:text-8xl">
            <span className="text-pink-deep">Best</span>{" "}
            <span className="text-foreground">Seller</span>
          </h2>
          <p className="mt-3 font-display text-2xl italic tracking-tight text-foreground sm:text-4xl">
            burgundy body wave wig
          </p>
        </div>

        {/* Product with callouts */}
        <div className="relative mx-auto w-full max-w-sm px-16 pb-10 pt-14 sm:px-20">
          <div className="mx-auto aspect-[3/4] w-full overflow-hidden">
            <img
              src={wigAsset.url}
              alt="Burgundy body wave 6x6 HD lace closure wig"
              loading="lazy"
              className="h-full w-full object-cover object-center"
            />
          </div>

          {/* Top-left callout: text, elbow line down then right with arrow up into product */}
          <div className="absolute left-0 top-0 w-36 sm:w-40">
            <p className="text-[0.5rem] font-bold uppercase leading-tight tracking-[0.14em] text-foreground sm:text-[0.58rem]">
              Raw donor hair,
              <br />
              350g density
            </p>
            <svg
              viewBox="0 0 120 56"
              className="mt-1 w-full text-foreground"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 6 V50 H112" />
              <path d="M104 44 L112 50 L104 56" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* Right callout: text, elbow line down then left with arrow */}
          <div className="absolute right-0 top-1/4 w-32 sm:w-36">
            <p className="text-right text-[0.5rem] font-bold uppercase leading-tight tracking-[0.14em] text-foreground sm:text-[0.58rem]">
              6x6 HD lace
            </p>
            <svg
              viewBox="0 0 120 56"
              className="mt-1 w-full text-foreground"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M116 6 V50 H8" />
              <path d="M16 44 L8 50 L16 56" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <span className="absolute bottom-0 right-2 rounded-full border-2 border-foreground bg-background px-5 py-2 font-display text-sm font-bold tracking-widest text-foreground shadow-card">
            $260.00
          </span>
        </div>

      </div>
    </section>
  );
}
