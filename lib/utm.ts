"use client";

export interface UtmParams {
  ref?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  anonymous_visitor_id?: string;
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
  const hasUtm = ["ref", "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"].some(
    (key) => url.searchParams.has(key)
  );
  const current = getStoredUtm();
  const anonymousVisitorId = current.anonymous_visitor_id ?? `anon_${crypto.randomUUID()}`;

  const params: UtmParams = {
    ref: url.searchParams.get("ref") ?? current.ref,
    utm_source: url.searchParams.get("utm_source") ?? current.utm_source,
    utm_medium: url.searchParams.get("utm_medium") ?? current.utm_medium,
    utm_campaign: url.searchParams.get("utm_campaign") ?? current.utm_campaign,
    utm_content: url.searchParams.get("utm_content") ?? current.utm_content,
    utm_term: url.searchParams.get("utm_term") ?? current.utm_term,
    anonymous_visitor_id: anonymousVisitorId,
    referrer: document.referrer || current.referrer,
  };

  if (hasUtm || !sessionStorage.getItem(SESSION_KEY)) {
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
