import { Link } from "@tanstack/react-router";
import { ShoppingBag, Star } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/lib/cart";
import { formatPrice, imageFor, type Product } from "@/lib/shop";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const defaultLength = product.lengths[Math.floor(product.lengths.length / 2)] ?? product.lengths[0]!;

  const quickAdd = () => {
    add({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      texture: product.texture,
      imageKey: product.image_key,
      length: defaultLength,
      quantity: 1,
      priceCents: product.price_cents,
    });
    toast.success(`${product.name} added to your cart`, {
      description: `${defaultLength}" · ${formatPrice(product.price_cents)}`,
    });
  };

  return (
    <div className="group">
      {/* Image + hover quick add (Shopify style) */}
      <div className="relative overflow-hidden rounded-2xl bg-muted">
        <Link to="/shop/$slug" params={{ slug: product.slug }} aria-label={product.name}>
          <img
            src={imageFor(product.image_key)}
            alt={`${product.name} — ${product.texture} hair bundles`}
            loading="lazy"
            width={1024}
            height={1024}
            className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        {product.featured && (
          <span className="absolute left-3 top-3 rounded-full bg-pink-deep px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary-foreground">
            Bestseller
          </span>
        )}

        <button
          type="button"
          onClick={quickAdd}
          className="absolute inset-x-3 bottom-3 flex translate-y-3 items-center justify-center gap-2 rounded-full bg-ink/90 py-3 font-display text-sm font-semibold text-ink-foreground opacity-0 backdrop-blur transition-all duration-300 hover:bg-ink group-hover:translate-y-0 group-hover:opacity-100"
        >
          <ShoppingBag className="size-4" /> Quick add · {defaultLength}"
        </button>
      </div>

      {/* Info row */}
      <div className="mt-4 flex items-start justify-between gap-3 px-0.5">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
            {product.texture}
          </p>
          <h3 className="mt-1 font-display text-lg font-semibold leading-tight">
            <Link to="/shop/$slug" params={{ slug: product.slug }} className="hover:text-primary">
              {product.name}
            </Link>
          </h3>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {product.lengths[0]}"–{product.lengths[product.lengths.length - 1]}"
          </p>
        </div>
        <div className="text-right">
          <span className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
            <Star className="size-3.5 fill-primary text-primary" /> 4.9
          </span>
          <p className="mt-1 font-display text-lg font-semibold">
            {formatPrice(product.price_cents)}
          </p>
        </div>
      </div>
    </div>
  );
}
