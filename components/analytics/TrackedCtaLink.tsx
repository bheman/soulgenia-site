"use client";

import type { ReactNode } from "react";
import { trackEvent } from "@/lib/analytics";
import { captureUtm, getStoredUtm } from "@/lib/utm";

type CtaDestination =
  | "whatsapp"
  | "trial"
  | "internal"
  | "diagnostico"
  | "desk_signup"
  | "planos";

export default function TrackedCtaLink({
  href,
  position,
  children,
  className,
  target,
  rel,
  destination,
}: {
  href: string;
  position: string;
  children: ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  destination?: CtaDestination;
}) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={className}
      onClick={() => {
        captureUtm();
        const inferredDestination = destination || inferDestination(href);

        trackEvent("cta_clicked", {
          variant: "default",
          position,
          destination: inferredDestination,
          href,
          path: window.location.pathname,
          ...getStoredUtm(),
        });

        if (inferredDestination === "whatsapp") {
          window.fbq?.("track", "Lead", {
            content_name: "auria_whatsapp_cta",
            content_category: "whatsapp",
          });
        }
      }}
    >
      {children}
    </a>
  );
}

function inferDestination(href: string): CtaDestination {
  if (href.includes("wa.me") || href.includes("whatsapp.com")) return "whatsapp";
  if (href.startsWith("/trial")) return "trial";
  if (href.startsWith("/diagnostico")) return "diagnostico";
  if (href.startsWith("#planos")) return "planos";
  return "internal";
}

declare global {
  interface Window {
    fbq?: (
      command: "track" | "init",
      eventName: string,
      properties?: Record<string, unknown>
    ) => void;
  }
}
