import { useEffect, useRef, useState } from "react";

function parseValue(value: string) {
  const empty = { target: 0, prefix: "", suffix: value, decimals: 0 };
  const range = value.match(/^(\d+)[–-]([\d,.]+)(.*)$/);
  if (range) {
    const [, low = "", high = "", rest = ""] = range;
    if (!high) return empty;
    return { target: parseFloat(high.replace(/,/g, "")), prefix: low + "–", suffix: rest, decimals: 0 };
  }
  const match = value.match(/^([\d,.]+)(.*)$/);
  if (!match) return empty;
  const [, numStr = "", rest = ""] = match;
  if (!numStr) return empty;
  const decimals = numStr.includes(".") ? (numStr.split(".")[1]?.length ?? 0) : 0;
  return { target: parseFloat(numStr.replace(/,/g, "")), prefix: "", suffix: rest, decimals };
}

function format(n: number, decimals: number) {
  return decimals > 0
    ? n.toFixed(decimals)
    : Math.round(n).toLocaleString("en-US");
}

export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState("0");
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const { target, prefix, suffix, decimals } = parseValue(value);

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || started.current) return;
        started.current = true;
        const duration = 1600;
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setDisplay(prefix + format(target * eased, decimals) + suffix);
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
