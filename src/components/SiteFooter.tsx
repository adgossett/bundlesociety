import { Link } from "@tanstack/react-router";
import logoAsset from "@/assets/logo.png.asset.json";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border/60 bg-card">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <Link to="/" aria-label="The Bundle Society home">
          <img
            src={logoAsset.url}
            alt="The Bundle Society"
            className="h-8 w-auto"
            width={1096}
            height={643}
          />
        </Link>
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
