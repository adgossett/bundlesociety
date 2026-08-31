import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
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
  { to: "/", label: "Shop" },
  { to: "/", label: "Bundles" },
  { to: "/", label: "Wigs" },
  { to: "/", label: "Frontals" },
  { to: "/", label: "Closures" },
  { to: "/", label: "Custom Order" },
  { to: "/", label: "Contact" },
] as const;

export function SiteHeader() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-background pb-4 pt-0 shadow-navbar-glow sm:pb-6">
      {/* Announcement banner */}
      <div className="w-full bg-primary py-2.5 text-center">
        <p className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-[0.18em] text-ink">
          <span>Free shipping on orders above</span>
          <span className="text-ink">$100</span>
          <Heart className="size-4 fill-pink-deep text-pink-deep" aria-hidden />
        </p>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 px-3 pt-3 sm:gap-4 sm:px-8 sm:pt-4">
        {/* Left: hamburger (mobile) / search (desktop) */}
        <div className="flex shrink-0 items-center gap-2">
          <div className="md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <button
                  aria-label="Open menu"
                  className="grid size-10 shrink-0 place-items-center rounded-full border border-border bg-card text-foreground shadow-card transition-colors hover:bg-primary/10 hover:text-primary"
                >
                  <Menu className="size-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[85vw] max-w-xs bg-background px-5 pb-8 pt-6">
                <SheetHeader className="mb-5">
                  <SheetTitle className="sr-only">Navigation menu</SheetTitle>
                  <Logo size="xs" />
                </SheetHeader>
                <nav className="flex flex-col gap-1.5">
                  {links.map((link) => (
                    <SheetClose asChild key={`mobile-${link.to}-${link.label}`}>
                      <Link
                        to={link.to}
                        activeOptions={{ exact: true }}
                        activeProps={{
                          className:
                            link.label === "Home"
                              ? "bg-primary text-primary-foreground"
                              : "text-foreground hover:bg-primary/10 hover:text-primary",
                        }}
                        inactiveProps={{
                          className: "text-foreground hover:bg-primary/10 hover:text-primary",
                        }}
                        className="w-full rounded-full px-5 py-3 text-sm font-extrabold uppercase tracking-wide transition-colors"
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>
                <div className="mt-6 rounded-2xl border border-border bg-card p-4 text-xs font-semibold text-muted-foreground shadow-card">
                  United States | USD $
                  <p className="mt-1 font-normal">Free shipping on orders above $100</p>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          <Link
            to="/"
            aria-label="Search bundles"
            className="hidden size-11 shrink-0 place-items-center rounded-full border border-border bg-card text-foreground shadow-card transition-colors hover:bg-primary/10 hover:text-primary md:grid"
          >
            <Search className="size-4" />
          </Link>
        </div>

        <Link
          to="/"
          aria-label="The Bundle Society home"
          className="flex min-w-0 justify-center"
        >
          <Logo size="xs" />
        </Link>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
          <span className="hidden text-sm font-semibold text-foreground lg:inline">
            United States | USD $
          </span>
          <Link
            to="/"
            aria-label="Search bundles"
            className="grid size-10 shrink-0 place-items-center rounded-full border border-border bg-card text-foreground shadow-card transition-colors hover:bg-primary/10 hover:text-primary sm:size-11 md:hidden"
          >
            <Search className="size-4" />
          </Link>
          <Link
            to="/"
            aria-label="Account"
            className="hidden size-10 shrink-0 place-items-center rounded-full border border-border bg-card text-foreground shadow-card transition-colors hover:bg-primary/10 hover:text-primary sm:grid sm:size-11"
          >
            <User className="size-4" />
          </Link>
          <Link
            to="/"
            aria-label="Cart"
            className="relative grid size-10 shrink-0 place-items-center rounded-full border border-border bg-card text-foreground shadow-card transition-colors hover:bg-primary/10 hover:text-primary sm:size-11"
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

      {/* Mobile scrollable pill nav */}
      <div className="mt-3 px-3 md:hidden">
        <nav className="scrollbar-hide flex items-center gap-1 overflow-x-auto rounded-full border border-border bg-card p-1.5 shadow-card">
          {links.map((link) => (
            <Link
              key={`m-pill-${link.label}`}
              to={link.to}
              activeOptions={{ exact: true }}
              activeProps={{
                className:
                  link.label === "Home"
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-primary/10 hover:text-primary",
              }}
              inactiveProps={{ className: "text-foreground hover:bg-primary/10 hover:text-primary" }}
              className="shrink-0 rounded-full px-4 py-2 text-[0.7rem] font-extrabold uppercase tracking-wide transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>


      {/* Desktop pill nav */}
      <div className="mx-auto mt-4 hidden max-w-7xl justify-center px-4 md:flex">
        <nav className="scrollbar-hide flex max-w-full items-center gap-1 overflow-x-auto rounded-full border border-border bg-background p-2 shadow-card sm:gap-2 sm:px-3">
          {links.map((link) => (
            <Link
              key={`${link.to}-${link.label}`}
              to={link.to}
              activeOptions={{ exact: true }}
              activeProps={{
                className:
                  link.label === "Home"
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-primary/10 hover:text-primary",
              }}
              inactiveProps={{ className: "text-foreground hover:bg-primary/10 hover:text-primary" }}
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
