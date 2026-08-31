import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Mail, MessageCircle, Twitter } from "lucide-react";
import logoAsset from "@/assets/logo.png.asset.json";

const shopLinks = [
  { to: "/", label: "Bundles" },
  { to: "/", label: "Wigs" },
  { to: "/", label: "Frontals" },
  { to: "/", label: "Closures" },
  { to: "/", label: "Custom Order" },
];

const helpLinks = [
  { to: "/", label: "Contact" },
  { to: "/", label: "Shipping" },
  { to: "/", label: "Returns" },
  { to: "/", label: "FAQ" },
];

export function SiteFooter() {
  return (
    <footer className="bg-background">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div className="lg:col-span-1">
          <Link to="/" aria-label="The Bundle Society home">
            <img
              src={logoAsset.url}
              alt="The Bundle Society"
              className="h-14 w-auto"
            />
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Premium hair bundles made to keep you flawless. Soft, full and
            long-lasting sets in every texture, with custom orders welcome.
          </p>
          <h3 className="mt-8 font-display text-xs font-semibold uppercase tracking-[0.3em] text-pink-deep">
            Join the list
          </h3>
          <form
            className="mt-4 flex max-w-xs overflow-hidden rounded-md border border-border"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              required
              placeholder="Email"
              className="w-full bg-background px-3 py-2.5 text-sm outline-none placeholder:text-muted-foreground"
            />
            <button
              type="submit"
              className="bg-primary px-4 font-display text-xs font-semibold uppercase tracking-widest text-primary-foreground"
            >
              Join
            </button>
          </form>
        </div>

        {/* Shop */}
        <div>
          <h3 className="font-display text-xs font-semibold uppercase tracking-[0.3em] text-pink-deep">
            Shop
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {shopLinks.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="transition-colors hover:text-primary">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Help */}
        <div>
          <h3 className="font-display text-xs font-semibold uppercase tracking-[0.3em] text-pink-deep">
            Help
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {helpLinks.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="transition-colors hover:text-primary">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-display text-xs font-semibold uppercase tracking-[0.3em] text-pink-deep">
            Contact
          </h3>
          <div className="mt-4 space-y-3 text-sm text-muted-foreground">
            <p>
              Questions about a custom set or an order? We're here to help.
            </p>
            <div className="flex items-center gap-2">
              <Mail className="size-4 text-primary" />
              <span>hello@thebundlesociety.com</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle className="size-4 text-pink-deep" />
              <span>Replies within 24 hours</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} The Bundle Society</p>
          <div className="flex items-center gap-4">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:text-primary">
              <Instagram className="size-4" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="hover:text-primary">
              <Facebook className="size-4" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter" className="hover:text-primary">
              <Twitter className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
