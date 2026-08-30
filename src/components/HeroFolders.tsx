import { useState } from "react";
import bundlesAsset from "@/assets/bundles.jpg.asset.json";
import lashesAsset from "@/assets/lashes.jpg.asset.json";
import lipglossAsset from "@/assets/lipgloss.jpg.asset.json";

type FolderDef = {
  id: string;
  label: string;
  productImg: string;
  folder: string; // tailwind bg class for the folder body
  accent: string; // tailwind bg class for the label chip
};

const folders: FolderDef[] = [
  {
    id: "bundles",
    label: "Bundles",
    productImg: bundlesAsset.url,
    folder: "bg-pink-soft",
    accent: "bg-pink-soft",
  },
  {
    id: "lashes",
    label: "Lashes",
    productImg: lashesAsset.url,
    folder: "bg-primary",
    accent: "bg-primary",
  },
  {
    id: "lipgloss",
    label: "Lip Gloss",
    productImg: lipglossAsset.url,
    folder: "bg-pink-soft",
    accent: "bg-pink-soft",
  },
];

/**
 * Three interactive product folders. Closed they look like plain empty
 * folders; hover or click lights one up and its product rises out of it.
 */
export function HeroFolders() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [pinned, setPinned] = useState<string | null>(null);
  const active = hovered ?? pinned;

  return (
    <div
      aria-label="Product folders"
      className="flex w-full items-end justify-center gap-4 sm:gap-6"
    >
      {folders.map((folder) => {
        const isActive = active === folder.id;
        return (
          <button
            key={folder.id}
            type="button"
            aria-pressed={isActive}
            aria-label={`${folder.label} folder — tap to reveal`}
            onClick={() => setPinned(pinned === folder.id ? null : folder.id)}
            onMouseEnter={() => setHovered(folder.id)}
            onMouseLeave={() => setHovered(null)}
            className="group relative w-[30%] max-w-[11rem] cursor-pointer pt-24 outline-none sm:pt-28"
          >
            {/* product rises out of the folder */}
            <span
              className={`pointer-events-none absolute bottom-[62%] left-1/2 w-[78%] -translate-x-1/2 transition-all duration-500 ease-out ${
                isActive ? "translate-y-0 scale-100 opacity-100" : "translate-y-8 scale-75 opacity-0"
              }`}
            >
              <img
                src={folder.productImg}
                alt=""
                aria-hidden
                className="aspect-square w-full rounded-2xl border-4 border-background object-cover shadow-card"
              />
            </span>

            {/* folder tab */}
            <span
              className={`absolute left-3 top-[calc(100%-4.75rem)] h-4 w-[42%] rounded-t-lg transition-colors duration-300 ${folder.folder} ${
                isActive ? "brightness-105" : "opacity-80 group-hover:opacity-100"
              }`}
            />

            {/* folder body */}
            <span
              className={`relative block aspect-[4/3] w-full rounded-xl rounded-tl-none transition-all duration-300 ${folder.folder} ${
                isActive
                  ? "-translate-y-1 shadow-[0_0_40px_8px_hsl(var(--primary)/0.45)] ring-4 ring-primary"
                  : "shadow-card ring-0 group-hover:-translate-y-1 group-hover:ring-4 group-hover:ring-primary/60"
              }`}
            >
              <span
                className={`absolute inset-x-3 bottom-3 h-1.5 rounded-full bg-background/50 transition-opacity ${
                  isActive ? "opacity-100" : "opacity-60"
                }`}
              />
            </span>

            {/* label chip */}
            <span
              className={`pointer-events-none absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-background px-3 py-1 font-display text-[11px] font-semibold text-foreground shadow-card transition-all duration-300 ${
                isActive
                  ? "translate-y-0 opacity-100"
                  : "translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
              }`}
            >
              {folder.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
