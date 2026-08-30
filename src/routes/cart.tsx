import { createFileRoute, Link } from "@tanstack/react-router";
import { Trash2 } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatPrice, imageFor } from "@/lib/shop";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — The Bundle Society" },
      { name: "description", content: "Review the hair bundles in your cart before placing your order." },
      { property: "og:title", content: "Your Cart — The Bundle Society" },
      { property: "og:description", content: "Review your selected bundles and place your order." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { lines, subtotal, updateQuantity, remove } = useCart();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="font-display text-5xl font-semibold">
        Your <span className="text-pink-deep">cart</span>
      </h1>

      {lines.length === 0 ? (
        <div className="mt-8 rounded-3xl bg-card p-10 text-center shadow-card">
          <p className="text-muted-foreground">Your cart is empty.</p>
          <Link
            to="/shop"
            className="mt-6 inline-block rounded-2xl bg-primary px-6 py-3 font-display text-lg font-semibold text-primary-foreground"
          >
            Shop bundles
          </Link>
        </div>
      ) : (
        <>
          <ul className="mt-8 space-y-4">
            {lines.map((line) => (
              <li
                key={`${line.productId}-${line.length}`}
                className="flex flex-wrap items-center gap-4 rounded-3xl bg-card p-4 shadow-card"
              >
                <img
                  src={imageFor(line.imageKey)}
                  alt={line.name}
                  loading="lazy"
                  width={1024}
                  height={1024}
                  className="size-20 rounded-2xl object-cover"
                />
                <div className="min-w-40 flex-1">
                  <p className="font-display text-lg font-semibold">{line.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {line.texture} • {line.length}"
                  </p>
                </div>
                <div className="flex items-center gap-3 rounded-full bg-muted px-3 py-1.5">
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    onClick={() => updateQuantity(line.productId, line.length, line.quantity - 1)}
                    className="size-7 rounded-full bg-card font-bold"
                  >
                    −
                  </button>
                  <span className="w-6 text-center font-bold">{line.quantity}</span>
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    onClick={() => updateQuantity(line.productId, line.length, line.quantity + 1)}
                    className="size-7 rounded-full bg-card font-bold"
                  >
                    +
                  </button>
                </div>
                <p className="w-24 text-right font-display text-xl font-semibold text-primary">
                  {formatPrice(line.priceCents * line.quantity)}
                </p>
                <button
                  type="button"
                  aria-label={`Remove ${line.name}`}
                  onClick={() => remove(line.productId, line.length)}
                  className="rounded-full p-2 text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="size-4" />
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-card p-6 shadow-pop">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Subtotal
              </p>
              <p className="font-display text-4xl font-semibold text-primary">
                {formatPrice(subtotal)}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Shipping and payment arranged after we confirm your order.
              </p>
            </div>
            <Link
              to="/checkout"
              className="rounded-2xl bg-primary px-8 py-4 font-display text-lg font-semibold text-primary-foreground shadow-card transition-transform hover:-translate-y-0.5"
            >
              Place your order
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
