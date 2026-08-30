import logoAsset from "@/assets/logo.png.asset.json";

export function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const width = size === "lg" ? "w-64 sm:w-96" : size === "md" ? "w-32" : "w-28";

  return (
    <img
      src={logoAsset.url}
      alt="The Bundle Society — Premium Bundles"
      className={`${width} h-auto`}
      width={1096}
      height={643}
    />
  );
}
