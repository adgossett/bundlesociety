import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

export function ArrowButton({
  to,
  children,
  tone = "green",
}: {
  to: string;
  children: ReactNode;
  tone?: "green" | "pink";
}) {
  const toneClass =
    tone === "green"
      ? "bg-primary text-primary-foreground hover:bg-primary/90"
      : "bg-pink-deep text-primary-foreground hover:bg-pink-deep/90";

  return (
    <Link
      to={to}
      className={`inline-flex items-center gap-3 rounded-2xl px-6 py-3.5 font-display text-lg font-semibold shadow-card transition-transform hover:-translate-y-0.5 ${toneClass}`}
    >
      {children}
      <span className="grid size-8 place-items-center rounded-full bg-card text-foreground">
        <ArrowRight className="size-4" />
      </span>
    </Link>
  );
}
