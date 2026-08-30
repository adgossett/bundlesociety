import { Link } from "@tanstack/react-router";
import { formatPrice, imageFor, type Product } from "@/lib/shop";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to="/shop/$slug"
      params={{ slug: product.slug }}
      className="group flex flex-col overflow-hidden rounded-3xl bg-card shadow-card transition-transform hover:-translate-y-1"
    >
      <div className="aspect-square overflow-hidden bg-muted">
        <img
          src={imageFor(product.image_key)}
          alt={`${product.name} — ${product.texture} hair bundles`}
          loading="lazy"
          width={1024}
          height={1024}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <span className="w-fit rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent-foreground">
          {product.texture}
        </span>
        <h3 className="font-display text-xl font-semibold">{product.name}</h3>
        <p className="text-sm text-muted-foreground">
          {product.lengths[0]}"–{product.lengths[product.lengths.length - 1]}" available
        </p>
        <p className="mt-auto pt-2 font-display text-2xl font-semibold text-primary">
          {formatPrice(product.price_cents)}
        </p>
      </div>
    </Link>
  );
}
