import { Link } from "@tanstack/react-router";
import { Search, ShoppingBag, User } from "lucide-react";
import { Logo } from "./Logo";
import { useCart } from "@/lib/cart";

const links = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/shop", label: "Bundles" },
  { to: "/shop", label: "Wigs" },
  { to: "/shop", label: "Frontals" },
  { to: "/shop", label: "Closures" },
  { to: "/contact", label: "Custom Order" },
  { to: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const { count } = useCart();

  return (
    <header className="sticky top-0 z-30 bg-background/90 pb-6 backdrop-blur">
      <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 pt-4 sm:px-8">
        <Link
          to="/shop"
          aria-label="Search bundles"
          className="grid size-11 place-items-center rounded-full border border-foreground/20 text-foreground transition-colors hover:bg-foreground/5"
        >
          <Search className="size-4" />
        </Link>

        <Link
          to="/"
          aria-label="The Bundle Society home"
          className="absolute left-1/2 top-4 -translate-x-1/2"
        >
          <Logo size="sm" />
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <span className="hidden text-sm font-semibold text-foreground sm:inline">
            United States | USD $
          </span>
          <Link
            to="/contact"
            aria-label="Account"
            className="grid size-11 place-items-center rounded-full border border-foreground/20 text-foreground transition-colors hover:bg-foreground/5"
          >
            <User className="size-4" />
          </Link>
          <Link
            to="/cart"
            aria-label="Cart"
            className="relative grid size-11 place-items-center rounded-full border border-foreground/20 text-foreground transition-colors hover:bg-foreground/5"
          >
            <ShoppingBag className="size-4" />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-pink-deep text-[0.7rem] font-bold text-ink-foreground">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>

      <div className="mx-auto mt-4 flex max-w-7xl justify-center px-4">
        <nav className="scrollbar-hide flex max-w-full items-center gap-1 overflow-x-auto rounded-full bg-white p-2 shadow-card sm:gap-2 sm:px-3">
          {links.map((link) => (
            <Link
              key={`${link.to}-${link.label}`}
              to={link.to}
              activeOptions={{ exact: link.to === "/" }}
              activeProps={{ className: "bg-primary text-primary-foreground" }}
              inactiveProps={{ className: "text-foreground hover:text-primary" }}
              className="shrink-0 rounded-full px-4 py-2.5 text-xs font-extrabold uppercase tracking-wide transition-colors sm:px-6 sm:text-sm"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
