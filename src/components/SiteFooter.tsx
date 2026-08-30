import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border/60 bg-card">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-10 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p className="font-display text-base font-semibold text-foreground">
          The<span className="text-primary">Bundle</span>
          <span className="text-pink-deep">Society</span>
        </p>
        <div className="flex gap-5">
          <Link to="/shop" className="hover:text-primary">
            Shop bundles
          </Link>
          <Link to="/contact" className="hover:text-primary">
            Custom orders
          </Link>
        </div>
        <p>© {new Date().getFullYear()} The Bundle Society</p>
      </div>
    </footer>
  );
}
