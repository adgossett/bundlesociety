import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { listProducts } from "@/lib/shop.functions";
import { TEXTURES, type Product } from "@/lib/shop";
import { ProductCard } from "@/components/ProductCard";

const productsQuery = queryOptions({
  queryKey: ["products"],
  queryFn: () => listProducts(),
});

type ShopSearch = { texture?: string; length?: number };

export const Route = createFileRoute("/shop/")({
  validateSearch: (search: Record<string, unknown>): ShopSearch => ({
    texture: typeof search["texture"] === "string" ? search["texture"] : undefined,
    length: search["length"] != null ? Number(search["length"]) || undefined : undefined,
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(productsQuery),
  head: () => ({
    meta: [
      { title: "Shop Hair Bundles — The Bundle Society" },
      {
        name: "description",
        content:
          "Browse premium straight, body wave and deep wave hair bundles in lengths from 14 to 28 inches.",
      },
      { property: "og:title", content: "Shop Hair Bundles — The Bundle Society" },
      {
        property: "og:description",
        content: "Premium bundles in every texture and length, starting at $200.",
      },
    ],
  }),
  component: Shop,
});

const LENGTHS = [14, 16, 18, 20, 22, 24, 26, 28];

function Shop() {
  const { data } = useSuspenseQuery(productsQuery);
  const { texture, length } = Route.useSearch();
  const products = (data as Product[]).filter(
    (p) => (!texture || p.texture === texture) && (!length || p.lengths.includes(length)),
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-display text-5xl font-semibold">
        Shop <span className="text-primary">bundles</span>
      </h1>
      <p className="mt-2 max-w-lg text-muted-foreground">
        Premium hair in three signature textures. Filter by texture and length to find your set.
      </p>

      <div className="mt-8 space-y-4 rounded-3xl bg-card p-5 shadow-card">
        <Filter label="Texture">
          <Chip to="/shop" search={{ length }} active={!texture}>
            All
          </Chip>
          {TEXTURES.map((t) => (
            <Chip key={t} to="/shop" search={{ texture: t, length }} active={texture === t}>
              {t}
            </Chip>
          ))}
        </Filter>
        <Filter label="Length">
          <Chip to="/shop" search={{ texture }} active={!length}>
            Any
          </Chip>
          {LENGTHS.map((l) => (
            <Chip key={l} to="/shop" search={{ texture, length: l }} active={length === l}>
              {l}"
            </Chip>
          ))}
        </Filter>
      </div>

      {products.length === 0 ? (
        <p className="mt-12 text-center text-muted-foreground">
          No bundles match those filters yet.{" "}
          <Link to="/contact" className="font-semibold text-primary hover:underline">
            Request a custom set
          </Link>
          .
        </p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

function Filter({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 w-16 text-xs font-bold uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      {children}
    </div>
  );
}

function Chip({
  to,
  search,
  active,
  children,
}: {
  to: string;
  search: ShopSearch;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      to={to}
      search={search}
      className={`rounded-full px-4 py-1.5 text-sm font-bold transition-colors ${
        active
          ? "bg-primary text-primary-foreground"
          : "bg-muted text-foreground hover:bg-pink-soft"
      }`}
    >
      {children}
    </Link>
  );
}
