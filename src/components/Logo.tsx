export function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const scale =
    size === "lg"
      ? "text-5xl sm:text-7xl"
      : size === "md"
        ? "text-2xl"
        : "text-xl";

  return (
    <div className="leading-[0.95]">
      <div className={`font-display font-semibold ${scale}`}>
        <span className="text-foreground">The</span>
        <span className="text-primary">Bundle</span>
      </div>
      <div className={`font-display font-semibold ${scale} text-pink-deep`}>Society</div>
      {size !== "sm" && (
        <div className="mt-1 text-[0.6rem] font-semibold uppercase tracking-[0.35em] text-muted-foreground">
          Premium Bundles
        </div>
      )}
    </div>
  );
}
