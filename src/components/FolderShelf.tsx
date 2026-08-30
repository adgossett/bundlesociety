import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import bundlesAsset from "@/assets/bundles.jpg.asset.json";
import lashesAsset from "@/assets/lashes.jpg.asset.json";
import lipglossAsset from "@/assets/lipgloss.jpg.asset.json";

type Folder = {
  id: string;
  index: string;
  label: string;
  blurb: string;
  image: string;
  to: string;
  search?: Record<string, string>;
};

const folders: Folder[] = [
  {
    id: "bundles",
    index: "01",
    label: "Bundles",
    blurb: "Body wave, straight & deep wave wefts",
    image: bundlesAsset.url,
    to: "/shop",
  },
  {
    id: "lashes",
    index: "02",
    label: "Lashes",
    blurb: "Fluffy hand-made strip lashes",
    image: lashesAsset.url,
    to: "/contact",
  },
  {
    id: "lipgloss",
    index: "03",
    label: "Lip Gloss",
    blurb: "Hydrating high-shine pink gloss",
    image: lipglossAsset.url,
    to: "/contact",
  },
];

export function FolderShelf() {
  const [active, setActive] = useState<string>("bundles");

  return (
    <div className="w-full">
      <div className="grid gap-6 sm:grid-cols-3 sm:gap-5">
        {folders.map((folder) => {
          const isActive = active === folder.id;
          return (
            <div key={folder.id} className="flex flex-col items-center">
              <button
                type="button"
                onClick={() => setActive(folder.id)}
                onMouseEnter={() => setActive(folder.id)}
                aria-pressed={isActive}
                aria-label={`Open the ${folder.label} folder`}
                className="group relative block w-full max-w-[19rem] [perspective:1000px] focus:outline-none"
              >
                {/* folder back panel */}
                <div
                  className={[
                    "relative rounded-[1.4rem] rounded-tl-[0.6rem] pt-7 transition-all duration-500",
                    isActive
                      ? "-translate-y-1 bg-pink-soft shadow-pop"
                      : "bg-muted opacity-70 shadow-sm group-hover:opacity-100",
                  ].join(" ")}
                >
                  {/* tab */}
                  <span
                    className={[
                      "absolute -top-4 left-5 rounded-t-xl px-5 py-2 text-[0.65rem] font-extrabold uppercase tracking-[0.2em] transition-colors duration-500",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground group-hover:bg-pink-soft group-hover:text-accent-foreground",
                    ].join(" ")}
                  >
                    {folder.index}
                  </span>

                  {/* product peeking out of the folder */}
                  <div className="relative h-40 overflow-hidden px-5 sm:h-44">
                    <img
                      src={folder.image}
                      alt={folder.label}
                      loading="lazy"
                      className={[
                        "mx-auto h-full w-full rounded-t-2xl object-cover shadow-card transition-all duration-500 ease-out",
                        isActive
                          ? "translate-y-0 scale-100 saturate-100"
                          : "translate-y-12 scale-95 saturate-50",
                      ].join(" ")}
                    />
                  </div>

                  {/* folder front flap */}
                  <div
                    className={[
                      "relative z-10 origin-bottom rounded-b-[1.4rem] border-t px-5 pb-5 pt-4 text-left transition-all duration-500 ease-out",
                      isActive
                        ? "border-primary/40 bg-background [transform:rotateX(14deg)]"
                        : "border-border bg-card [transform:rotateX(0deg)]",
                    ].join(" ")}
                  >
                    <p className="font-display text-xl font-semibold">{folder.label}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{folder.blurb}</p>
                  </div>
                </div>
              </button>

              <Link
                to={folder.to}
                className={[
                  "mt-4 inline-flex items-center gap-1.5 rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-card"
                    : "border border-border bg-background text-muted-foreground hover:text-foreground",
                ].join(" ")}
              >
                Explore {folder.label} <ArrowUpRight className="size-4" />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
