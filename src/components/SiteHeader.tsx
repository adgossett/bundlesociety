import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { Logo } from "./Logo";
import { useCart } from "@/lib/cart";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

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
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-header pb-4 pt-4 shadow-sm sm:pb-6 sm:pt-6">
      <div className="relative mx-auto flex max-w-7xl items-center justify-center px-4 sm:px-8">
        {/* Mobile hamburger */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 lg:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                aria-label="Open menu"
                className="grid size-10 place-items-center rounded-full border border-foreground/20 text-foreground transition-colors hover:bg-white/30"
              >
                <Menu className="size-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-header pb-8 pt-6">
              <SheetHeader className="mb-4">
                <SheetTitle className="sr-only">Navigation menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col items-center gap-2">
                {links.map((link) => (
                  <SheetClose asChild key={`mobile-${link.to}-${link.label}`}>
                    <Link
                      to={link.to}
                      activeOptions={{ exact: link.to === "/" }}
                      activeProps={{ className: "bg-primary text-primary-foreground" }}
                      inactiveProps={{ className: "text-foreground hover:bg-white/40" }}
                      className="w-full max-w-xs rounded-full px-6 py-3 text-center text-sm font-extrabold uppercase tracking-wide transition-colors"
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
                <div className="mt-4 text-xs font-semibold text-foreground/70">
                  United States | USD $
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        <Link
          to="/"
          aria-label="The Bundle Society home"
        >
          <Logo size="sm" />
        </Link>

        <div className="absolute right-4 top-1/2 flex -translate-y-1/2 items-center gap-1.5 sm:right-8 sm:gap-3">
          <span className="hidden text-sm font-semibold text-foreground lg:inline">
            United States | USD $
          </span>
          <Link
            to="/shop"
            aria-label="Search bundles"
            className="grid size-10 place-items-center rounded-full border border-foreground/20 text-foreground transition-colors hover:bg-white/30 sm:size-11"
          >
            <Search className="size-4" />
          </Link>
          <Link
            to="/contact"
            aria-label="Account"
            className="grid size-10 place-items-center rounded-full border border-foreground/20 text-foreground transition-colors hover:bg-white/30 sm:size-11"
          >
            <User className="size-4" />
          </Link>
          <Link
            to="/cart"
            aria-label="Cart"
            className="relative grid size-10 place-items-center rounded-full border border-foreground/20 text-foreground transition-colors hover:bg-white/30 sm:size-11"
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

      {/* Desktop pill nav */}
      <div className="mx-auto mt-4 hidden max-w-7xl justify-center px-4 lg:flex">
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
