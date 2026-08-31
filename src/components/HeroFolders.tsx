import { useState } from "react";
import flyerEmpty from "@/assets/flyer-empty.png";
import bundlesAsset from "@/assets/bundles.jpg.asset.json";
import lashesAsset from "@/assets/lashes.jpg.asset.json";
import lipglossAsset from "@/assets/lipgloss.jpg.asset.json";

type FolderDef = {
  id: string;
  label: string;
  productImg: string;
  accent: string; // tailwind bg class for label chip
  // hot-spot box over the folder in the artwork (percentages)
  box: { left: string; top: string; width: string; height: string };
};

const folders: FolderDef[] = [
  {
    id: "bundles",
    label: "Bundles",
    productImg: bundlesAsset.url,
    accent: "bg-pink-soft",
    box: { left: "70%", top: "12%", width: "21.5%", height: "11.5%" },
  },
  {
    id: "lashes",
    label: "Lashes",
    productImg: lashesAsset.url,
    accent: "bg-primary",
    box: { left: "70%", top: "24%", width: "21.5%", height: "11.5%" },
  },
  {
    id: "lipgloss",
    label: "Lip Gloss",
    productImg: lipglossAsset.url,
    accent: "bg-pink-soft",
    box: { left: "70%", top: "36%", width: "21.5%", height: "11.5%" },
  },
];

/**
 * The hero artwork (woman at desk with three folders) rendered as a
 * right-anchored layer of the hero section, with interactive folder
 * hot-spots: hover/click lights a folder up and its product pops out.
 */
export function HeroFolders() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [pinned, setPinned] = useState<string | null>(null);
  const active = hovered ?? pinned;

  return (
    <div
      aria-label="Product folders"
      className="pointer-events-none absolute top-[10%] right-[18%] hidden aspect-[928/1152] w-[min(50vw,38rem)] select-none md:block lg:right-[26%] xl:right-[34%]"
    >
      {/* Outer glow that spills past the folder artwork */}
      <div
        aria-hidden
        className="absolute -right-[10%] top-[5%] aspect-square w-[55%] rounded-full bg-primary/30"
        style={{ filter: "blur(64px)" }}
      />
      <div
        aria-hidden
        className="absolute bottom-[10%] -left-[5%] aspect-square w-[45%] rounded-full bg-pink-deep/25"
        style={{ filter: "blur(56px)" }}
      />

      <img
        src={flyerEmpty}
        alt=""
        aria-hidden
        className="absolute inset-0 size-full object-contain object-right [mask-image:linear-gradient(to_left,black_72%,transparent)]"
        width={928}
        height={1152}
      />

      {/* Soft blobs sitting on the white space behind the folders */}
      <div
        aria-hidden
        className="absolute left-[8%] top-[8%] aspect-square w-[30%] rounded-full bg-primary/20"
        style={{ filter: "blur(40px)" }}
      />
      <div
        aria-hidden
        className="absolute left-[5%] top-[30%] aspect-square w-[26%] rounded-full bg-pink-deep/[0.18]"
        style={{ filter: "blur(36px)" }}
      />
      <div
        aria-hidden
        className="absolute left-[12%] bottom-[22%] aspect-square w-[28%] rounded-full bg-primary/[0.18]"
        style={{ filter: "blur(38px)" }}
      />
      <div
        aria-hidden
        className="absolute right-[18%] bottom-[10%] aspect-square w-[22%] rounded-full bg-pink-deep/[0.15]"
        style={{ filter: "blur(32px)" }}
      />

      {/* Curved arrows pointing at each folder from different sides */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 z-20 size-full overflow-visible"
        aria-hidden="true"
      >
        <defs>
          <marker id="arrowhead-lime" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L6,3 L0,6 Z" fill="hsl(78 55% 52%)" />
          </marker>
          <marker id="arrowhead-pink" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L6,3 L0,6 Z" fill="hsl(336 78% 72%)" />
          </marker>
        </defs>
        {/* Top folder — from above, pointing down-right */}
        <path
          d="M 48 4 Q 58 2 66 10"
          fill="none"
          stroke="hsl(78 55% 52%)"
          strokeWidth="0.55"
          markerEnd="url(#arrowhead-lime)"
          opacity="0.9"
        />
        {/* Middle folder — from left, pointing right */}
        <path
          d="M 42 23 Q 52 23 64 24"
          fill="none"
          stroke="hsl(336 78% 72%)"
          strokeWidth="0.55"
          markerEnd="url(#arrowhead-pink)"
          opacity="0.9"
        />
        {/* Bottom folder — from below, pointing up-right */}
        <path
          d="M 48 48 Q 58 44 66 35"
          fill="none"
          stroke="hsl(78 55% 52%)"
          strokeWidth="0.55"
          markerEnd="url(#arrowhead-lime)"
          opacity="0.9"
        />
      </svg>

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
            className="group pointer-events-auto absolute z-30 cursor-pointer rounded-xl outline-none transition-all duration-300 focus-visible:ring-4 focus-visible:ring-primary/60"
            style={folder.box}
          >
            {/* glow / light-up layer */}
            <span
              className={`absolute inset-0 rounded-xl transition-all duration-300 ${
                isActive
                  ? "bg-white/25 ring-4 ring-primary shadow-[0_0_40px_8px_hsl(var(--primary)/0.55)]"
                  : "ring-0 group-hover:bg-white/20 group-hover:ring-4 group-hover:ring-primary/70 group-hover:shadow-[0_0_32px_6px_hsl(var(--primary)/0.45)]"
              }`}
            />

            {/* product pops out of the folder */}
            <span
              className={`pointer-events-none absolute left-1/2 top-0 w-[85%] -translate-x-1/2 transition-all duration-500 ease-out ${
                isActive
                  ? "-translate-y-[88%] opacity-100 scale-100"
                  : "translate-y-0 opacity-0 scale-75"
              }`}
            >
              <img
                src={folder.productImg}
                alt=""
                aria-hidden
                className="aspect-square w-full rounded-2xl border-4 border-white object-cover shadow-card"
              />
            </span>

            {/* label chip */}
            <span
              className={`pointer-events-none absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-3 py-1 font-display text-[11px] font-semibold text-foreground shadow-card transition-all duration-300 ${folder.accent} ${
                isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0"
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
