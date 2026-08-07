"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { trackEvent } from "@/lib/analytics";

/**
 * Fires `pricing_tier_viewed` once per tier when the wrapped card enters the
 * viewport. Wraps the (server-rendered) card JSX as children so the page can
 * stay a server component.
 */
export default function PricingTierViewTracker({
  tier,
  className,
  children,
}: {
  tier: "essencial" | "pro" | "premium";
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const fired = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !fired.current) {
            fired.current = true;
            trackEvent("pricing_tier_viewed", { tier });
            observer.disconnect();
          }
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [tier]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
