import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getOrder } from "@/lib/shop.functions";
import { formatPrice } from "@/lib/shop";

export const Route = createFileRoute("/order/$id")({
  head: () => ({
    meta: [
      { title: "Order Confirmation — The Bundle Society" },
      { name: "description", content: "Your bundle order request has been received." },
      { property: "og:title", content: "Order Confirmation — The Bundle Society" },
      { property: "og:description", content: "Your bundle order request has been received." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: OrderConfirmation,
});

function OrderConfirmation() {
  const { id } = Route.useParams();
  const fetchOrder = useServerFn(getOrder);
  const { data, isLoading } = useQuery({
    queryKey: ["order", id],
    queryFn: () => fetchOrder({ data: { id } }),
  });

  return (
    <div className="mx-auto max-w-2xl px-4 py-14">
      {isLoading ? (
        <p className="text-center text-muted-foreground">Loading your order…</p>
      ) : !data ? (
        <div className="rounded-3xl bg-card p-10 text-center shadow-pop">
          <h1 className="font-display text-3xl font-semibold">Order not found</h1>
          <Link to="/shop" className="mt-6 inline-block font-semibold text-primary hover:underline">
            Back to shop
          </Link>
        </div>
      ) : (
        <div className="rounded-[2rem] bg-card p-8 shadow-pop sm:p-10">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.3em] text-pink-deep">
            Thank you
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold">
            Order <span className="text-primary">{data.order.reference}</span>
          </h1>
          <p className="mt-3 text-muted-foreground">
            Thanks {data.order.customer_name} — your request is in. We'll email you shortly with
            payment and shipping details.
          </p>

          <ul className="mt-8 space-y-3 border-t border-border pt-6">
            {data.items.map((item) => (
              <li key={item.id} className="flex justify-between gap-3">
                <span>
                  {item.product_name} · {item.length}" × {item.quantity}
                </span>
                <span className="font-bold">
                  {formatPrice(item.unit_price_cents * item.quantity)}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-6 border-t border-border pt-4">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Total</p>
            <p className="font-display text-4xl font-semibold text-primary">
              {formatPrice(data.order.total_cents)}
            </p>
            <p className="mt-1 text-sm capitalize text-muted-foreground">
              Status: {data.order.status}
            </p>
          </div>

          <Link
            to="/shop"
            className="mt-8 inline-block rounded-2xl bg-primary px-6 py-3 font-display text-lg font-semibold text-primary-foreground"
          >
            Keep shopping
          </Link>
        </div>
      )}
    </div>
  );
}
