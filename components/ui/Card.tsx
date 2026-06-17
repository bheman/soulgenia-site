import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  /** Adds a ring to draw extra attention — used on "most popular" pricing card */
  highlighted?: boolean;
}

export default function Card({
  children,
  className = "",
  highlighted = false,
}: CardProps) {
  return (
    <div
      className={[
        "rounded-2xl border bg-white p-6 shadow-sm",
        highlighted
          ? "border-slate-700 ring-2 ring-slate-700"
          : "border-zinc-200",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}
