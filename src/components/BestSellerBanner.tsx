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
        <div className="relative mx-auto w-full max-w-sm">
          <img
            src={wigAsset.url}
            alt="Burgundy body wave 6x6 HD lace closure wig"
            loading="lazy"
            className="mx-auto w-full object-cover"
          />

          <span className="absolute left-2 top-3 max-w-[8rem] text-[0.55rem] font-bold uppercase leading-tight tracking-[0.15em] text-muted-foreground sm:text-[0.6rem]">
            Raw donor hair,
            <br />
            350g density
            <span className="mt-1 block h-px w-16 bg-pink-deep" />
          </span>

          <span className="absolute right-2 top-1/3 max-w-[7rem] text-right text-[0.55rem] font-bold uppercase leading-tight tracking-[0.15em] text-muted-foreground sm:text-[0.6rem]">
            6x6 HD lace
            <span className="ml-auto mt-1 block h-px w-14 bg-primary" />
          </span>

          <span className="absolute -bottom-4 right-0 rounded-full border-2 border-foreground bg-background px-5 py-2 font-display text-sm font-bold tracking-widest text-foreground shadow-card">
            $260.00
          </span>
        </div>
      </div>
    </section>
  );
}
