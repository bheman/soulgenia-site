import crypto from "node:crypto";

export async function sendLeadEvent({ env = process.env, route }) {
  const mode = env.CAPI_MODE || "disabled";
  const eventId = crypto.randomUUID();

  if (mode !== "enabled") {
    return {
      mode,
      sent: false,
      event_id: eventId,
      reason: "capi_disabled_or_stubbed"
    };
  }

  if (!env.META_PIXEL_ID || !env.META_ACCESS_TOKEN) {
    return {
      mode,
      sent: false,
      event_id: eventId,
      reason: "missing_meta_credentials"
    };
  }

  return {
    mode,
    sent: false,
    event_id: eventId,
    reason: `live_capi_not_implemented_for_route_${route}`
  };
}
