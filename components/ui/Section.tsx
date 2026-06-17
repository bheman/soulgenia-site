import { ReactNode } from "react";
import Container from "./Container";

interface SectionProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  /** Pass an id to enable anchor links (e.g. id="pricing") */
  id?: string;
  /** Background variant — default is white */
  bg?: "white" | "zinc" | "slate";
}

const bgMap = {
  white: "bg-white",
  zinc: "bg-zinc-50",
  slate: "bg-slate-900 text-zinc-50",
};

/**
 * Standard section wrapper with consistent vertical padding.
 * All landing sections use this to keep rhythm uniform.
 */
export default function Section({
  children,
  className = "",
  containerClassName = "",
  id,
  bg = "white",
}: SectionProps) {
  return (
    <section
      id={id}
      className={`py-16 sm:py-24 ${bgMap[bg]} ${className}`}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
