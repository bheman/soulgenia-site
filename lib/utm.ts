"use client";

export interface UtmParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  referrer?: string;
}

const SESSION_KEY = "utm_params";

/**
 * Reads UTM params from the current URL and persists them in sessionStorage.
 * Only overwrites stored params if the URL contains new UTM values.
 * Call this in a client component on mount (e.g., inside a useEffect).
 */
export function captureUtm(): void {
  if (typeof window === "undefined") return;

  const url = new URL(window.location.href);
  const hasUtm = ["utm_source", "utm_medium", "utm_campaign", "utm_content"].some(
    (key) => url.searchParams.has(key)
  );

  const params: UtmParams = {
    utm_source: url.searchParams.get("utm_source") ?? undefined,
    utm_medium: url.searchParams.get("utm_medium") ?? undefined,
    utm_campaign: url.searchParams.get("utm_campaign") ?? undefined,
    utm_content: url.searchParams.get("utm_content") ?? undefined,
    referrer: document.referrer || undefined,
  };

  if (hasUtm) {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(params));
  } else if (!sessionStorage.getItem(SESSION_KEY) && params.referrer) {
    // Preserve referrer even without UTM params on first visit
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(params));
  }
}

/**
 * Retrieves stored UTM params from sessionStorage.
 * Returns empty object if none are stored or if called server-side.
 */
export function getStoredUtm(): UtmParams {
  if (typeof window === "undefined") return {};
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as UtmParams) : {};
  } catch {
    return {};
  }
}
