"use client";

/**
 * Analytics helpers.
 *
 * Events are sent to the first-party `/api/event` endpoint for MVP tracking.
 * If PostHog is configured, the same events are mirrored there too.
 */

export type AnalyticsEvent =
  | "landing_view"
  | "cta_clicked"
  | "trial_form_viewed"
  | "trial_form_submitted"
  | "trial_form_error"
  | "pricing_tier_viewed"
  | "faq_item_opened"
  | "demo_video_played";

interface EventProperties {
  variant?: "exausto" | "escala" | "conta" | "default";
  position?: string;
  tier?: "essencial" | "pro" | "premium";
  [key: string]: string | number | boolean | undefined;
}

export function trackEvent(
  event: AnalyticsEvent,
  properties?: EventProperties
): void {
  if (typeof window === "undefined") return;

  try {
    sendFirstPartyEvent(event, properties);

    const ph = (
      window as unknown as {
        posthog?: { capture: (event: string, properties?: object) => void };
      }
    ).posthog;

    if (ph?.capture) {
      ph.capture(event, properties);
    }
  } catch {
    // Never throw from analytics.
  }
}

function sendFirstPartyEvent(
  event: AnalyticsEvent,
  properties?: EventProperties
): void {
  const payload = JSON.stringify({ event, properties });

  try {
    if (navigator.sendBeacon) {
      const blob = new Blob([payload], { type: "application/json" });
      navigator.sendBeacon("/api/event", blob);
      return;
    }

    void fetch("/api/event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
      keepalive: true,
    });
  } catch {
    // Never block navigation or UX because analytics failed.
  }
}
