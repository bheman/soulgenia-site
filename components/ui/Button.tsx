import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  /** Pass href to render a link-styled button (use with Next Link as wrapper) */
  asChild?: boolean;
}

const variantStyles = {
  primary:
    "bg-slate-800 text-white hover:bg-slate-700 active:bg-slate-900 focus-visible:ring-slate-600",
  secondary:
    "border border-slate-800 bg-white text-slate-800 hover:bg-zinc-50 active:bg-zinc-100 focus-visible:ring-slate-600",
};

const sizeStyles = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

/**
 * Primary and secondary button.
 * No external dependencies — pure Tailwind.
 * Use `variant="primary"` for CTAs, `variant="secondary"` for ghost actions.
 */
export default function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={[
        "inline-flex items-center justify-center gap-2 rounded-xl font-semibold",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        variantStyles[variant],
        sizeStyles[size],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </button>
  );
}
