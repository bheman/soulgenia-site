"use client";

import { useEffect } from "react";
import posthog from "posthog-js";
import { trackEvent } from "@/lib/analytics";
import { captureUtm, getStoredUtm } from "@/lib/utm";

export default function LandingAnalytics({
  page,
  variant = "default",
}: {
  page: string;
  variant?: "exausto" | "escala" | "conta" | "default";
}) {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY?.trim();
    const host =
      process.env.NEXT_PUBLIC_POSTHOG_HOST?.trim() || "https://app.posthog.com";

    if (key && !window.posthog) {
      posthog.init(key, {
        api_host: host,
        capture_pageview: false,
      });
      window.posthog = posthog;
    }

    captureUtm();

    trackEvent("landing_view", {
      page,
      variant,
      path: window.location.pathname,
      ...getStoredUtm(),
    });
  }, [page, variant]);

  return null;
}

declare global {
  interface Window {
    posthog?: {
      capture: (event: string, properties?: object) => void;
    };
  }
}
