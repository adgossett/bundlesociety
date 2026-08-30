import { useEffect, useState } from "react";
import { Search } from "lucide-react";

const QUERY = "The bundle society";

export function SearchTypewriter() {
  const [text, setText] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    let timeout: ReturnType<typeof setTimeout>;

    const type = () => {
      i += 1;
      setText(QUERY.slice(0, i));
      if (i < QUERY.length) {
        timeout = setTimeout(type, 70 + Math.random() * 90);
      } else {
        setDone(true);
        // Restart after a pause
        timeout = setTimeout(() => {
          i = 0;
          setText("");
          setDone(false);
          timeout = setTimeout(type, 500);
        }, 4000);
      }
    };

    timeout = setTimeout(type, 800);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="mx-auto flex w-full max-w-xl items-center gap-3 rounded-full border border-border bg-card px-5 py-4 shadow-pop transition-shadow hover:shadow-card focus-within:shadow-card">
      <Search className="size-5 shrink-0 text-muted-foreground" />
      <div className="relative flex-1 text-left text-lg">
        <span className="text-foreground">{text}</span>
        <span
          aria-hidden
          className={`ml-0.5 inline-block h-6 w-[2px] translate-y-1 bg-foreground align-baseline ${
            done ? "animate-pulse" : ""
          }`}
        />
        {text.length === 0 && (
          <span className="pointer-events-none absolute left-0 top-0 text-transparent">
            placeholder
          </span>
        )}
      </div>
    </div>
  );
}
