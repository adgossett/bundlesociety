import { useEffect, useState } from "react";
import logoAsset from "@/assets/logo.png.asset.json";

export function LoadingScreen() {
  const [fading, setFading] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), 1400);
    const removeTimer = setTimeout(() => setGone(true), 2000);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (gone) return null;

  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white transition-opacity duration-700 ${
        fading ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <img
        src={logoAsset.url}
        alt="The Bundle Society"
        className="w-56 animate-[tbs-logo-pop_1.1s_ease-out_both] sm:w-72"
      />
      <div className="mt-8 flex gap-2">
        <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-[#A8C32A] [animation-delay:-0.3s]" />
        <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-[#E87BA0] [animation-delay:-0.15s]" />
        <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-[#A8C32A]" />
      </div>
    </div>
  );
}
