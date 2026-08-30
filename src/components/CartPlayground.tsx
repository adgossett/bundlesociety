import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { MousePointerClick, PackageCheck, Truck } from "lucide-react";
import basketFullImg from "@/assets/basket.png";
import basketEmptyImg from "@/assets/basket-empty.png";
import { useCart } from "@/lib/cart";
import { formatPrice, type Product } from "@/lib/shop";

const STEPS = [
  {
    icon: MousePointerClick,
    title: "1. Tap a texture",
    body: "Pick straight, body wave or deep wave and it drops straight into your basket.",
  },
  {
    icon: PackageCheck,
    title: "2. Review your set",
    body: "Adjust lengths and quantities in the cart — mix textures for a custom set.",
  },
  {
    icon: Truck,
    title: "3. Place your order",
    body: "Send your order request and we confirm payment and shipping personally.",
  },
];

export function CartPlayground({ products }: { products: Product[] }) {
  const { add, count, subtotal } = useCart();
  const [bump, setBump] = useState(0);

  const textures = ["Straight", "Body Wave", "Deep Wave"];
  const pickProduct = (texture: string) =>
    products.find((p) => p.texture === texture) ?? products[0];

  const addBundle = (product: Product | undefined) => {
    if (!product) return;
    const length = product.lengths[0] ?? 14;
    add({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      texture: product.texture,
      imageKey: product.image_key,
      length,
      quantity: 1,
      priceCents: product.price_cents,
    });
    setBump((n) => n + 1);
    toast.success(`${product.name} added to your basket`);
  };

  return (
    <section className="mt-16 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
      <div className="rounded-[2.5rem] bg-card p-6 shadow-pop sm:p-8">
        <h2 className="font-display text-3xl font-semibold">
          Fill your <span className="text-pink-deep">basket</span>
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Tap a texture — or the basket itself — to start building your set.
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {textures.map((texture) => (
            <button
              key={texture}
              type="button"
              onClick={() => addBundle(pickProduct(texture))}
              className="rounded-full bg-pink-soft px-5 py-2 font-display text-sm font-semibold uppercase tracking-wider text-accent-foreground shadow-card transition-transform hover:-translate-y-0.5"
            >
              {texture}
            </button>
          ))}
          <button
            type="button"
            onClick={() => addBundle(products.find((p) => p.featured) ?? products[0])}
            className="rounded-full bg-primary px-5 py-2 font-display text-sm font-semibold uppercase tracking-wider text-primary-foreground shadow-card transition-transform hover:-translate-y-0.5"
          >
            Bundles
          </button>
        </div>

        <button
          type="button"
          aria-label="Add a bundle to the basket"
          onClick={() => addBundle(products.find((p) => p.featured) ?? products[0])}
          className="relative mt-6 block w-full rounded-3xl bg-muted p-4 text-left transition-transform hover:-translate-y-0.5"
        >
          <img
            key={bump}
            src={count === 0 ? basketEmptyImg : basketFullImg}
            alt={count === 0 ? "Empty wire shopping cart with pink handle" : "Shopping cart filled with bundle boxes"}
            loading="lazy"
            width={1024}
            height={768}
            className="mx-auto w-full max-w-sm animate-in zoom-in-95 duration-300"
          />
          {count === 0 && (
            <p className="mt-2 text-center text-sm text-muted-foreground">
              Your basket is empty — tap to add a bundle.
            </p>
          )}
        </button>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <p className="font-display text-lg font-semibold">
            {count} {count === 1 ? "bundle" : "bundles"} ·{" "}
            <span className="text-primary">{formatPrice(subtotal)}</span>
          </p>
          <Link
            to="/cart"
            className="rounded-2xl bg-primary px-6 py-3 font-display text-base font-semibold text-primary-foreground shadow-card transition-transform hover:-translate-y-0.5"
          >
            View cart
          </Link>
        </div>
      </div>

      <div className="grid content-start gap-4">
        {STEPS.map((step) => (
          <div key={step.title} className="rounded-3xl bg-card p-6 shadow-card">
            <span className="grid size-10 place-items-center rounded-2xl bg-pink-soft">
              <step.icon className="size-5 text-accent-foreground" />
            </span>
            <h3 className="mt-3 font-display text-xl font-semibold">{step.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{step.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
