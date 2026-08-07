export type GatewayPortReferralEntryRoute = "root_en" | "pt_br" | "operator";
export type GatewayPortReferralMarketFunnel = "global" | "brazil" | "operator";

export type GatewayPortAttributionSnapshot = {
  productId: "gatewayport";
  anonymousVisitorId: string;
  entryRoute: GatewayPortReferralEntryRoute;
  marketFunnel: GatewayPortReferralMarketFunnel;
  landingPath: string;
  refCode?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  attributionTouchId: string;
  referralAttributionId?: string;
  partnerId?: string;
  attributionWindowDays: 60;
  firstTouchAt: string;
  lastTouchAt: string;
  commissionCandidate: boolean;
  partnerResolved: false;
};

export type GatewayPortProviderReconciliationMetadata = {
  productId: "gatewayport";
  checkoutAttemptId: string;
  gatewayportUserId: string;
  workspaceId?: string;
  planKey: string;
  marketFunnel: GatewayPortReferralMarketFunnel;
  entryRoute: GatewayPortReferralEntryRoute;
  attributionTouchId?: string;
  referralAttributionId?: string;
  partnerId?: string;
};

type AttributionInput = {
  params?: URLSearchParams | Record<string, string | string[] | undefined>;
  entryRoute: GatewayPortReferralEntryRoute;
  marketFunnel: GatewayPortReferralMarketFunnel;
  landingPath: string;
  now?: Date;
};

const ACCEPTED_KEYS = ["ref", "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

function readParam(
  params: URLSearchParams | Record<string, string | string[] | undefined> | undefined,
  key: (typeof ACCEPTED_KEYS)[number] | "visitor_id"
): string | undefined {
  if (!params) return undefined;
  const value = params instanceof URLSearchParams ? params.get(key) : params[key];
  if (Array.isArray(value)) return value[0];
  return value ?? undefined;
}

function cleanValue(value: string | undefined, maxLength = 96): string | undefined {
  const cleaned = value?.trim().replace(/[\u0000-\u001f\u007f]/g, "").slice(0, maxLength);
  return cleaned || undefined;
}

function normalizeRefCode(value: string | undefined): string | undefined {
  const cleaned = cleanValue(value, 64)?.toLowerCase().replace(/[^a-z0-9_.-]/g, "-").replace(/-+/g, "-");
  return cleaned?.replace(/^-|-$/g, "") || undefined;
}

function stableHash(input: string): string {
  let hash = 5381;
  for (let index = 0; index < input.length; index += 1) {
    hash = (hash * 33) ^ input.charCodeAt(index);
  }
  return (hash >>> 0).toString(36);
}

function snapshotSeed(input: {
  refCode?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  entryRoute: GatewayPortReferralEntryRoute;
  marketFunnel: GatewayPortReferralMarketFunnel;
  landingPath: string;
}): string {
  return [
    input.refCode,
    input.utmSource,
    input.utmMedium,
    input.utmCampaign,
    input.utmContent,
    input.utmTerm,
    input.entryRoute,
    input.marketFunnel,
    input.landingPath,
  ]
    .filter(Boolean)
    .join("|");
}

export function createGatewayPortAttributionSnapshot(input: AttributionInput): GatewayPortAttributionSnapshot {
  const refCode = normalizeRefCode(readParam(input.params, "ref"));
  const utmSource = cleanValue(readParam(input.params, "utm_source"));
  const utmMedium = cleanValue(readParam(input.params, "utm_medium"));
  const utmCampaign = cleanValue(readParam(input.params, "utm_campaign"));
  const utmContent = cleanValue(readParam(input.params, "utm_content"));
  const utmTerm = cleanValue(readParam(input.params, "utm_term"));
  const seed = snapshotSeed({
    refCode,
    utmSource,
    utmMedium,
    utmCampaign,
    utmContent,
    utmTerm,
    entryRoute: input.entryRoute,
    marketFunnel: input.marketFunnel,
    landingPath: input.landingPath,
  });
  const anonymousVisitorId =
    cleanValue(readParam(input.params, "visitor_id"), 80) ?? `anon_gatewayport_${stableHash(seed || input.landingPath)}`;
  const touchHash = stableHash(`${anonymousVisitorId}|${seed || "direct"}`);
  const timestamp = (input.now ?? new Date()).toISOString();

  return {
    productId: "gatewayport",
    anonymousVisitorId,
    entryRoute: input.entryRoute,
    marketFunnel: input.marketFunnel,
    landingPath: input.landingPath,
    refCode,
    utmSource,
    utmMedium,
    utmCampaign,
    utmContent,
    utmTerm,
    attributionTouchId: `gpat_touch_${touchHash}`,
    referralAttributionId: refCode ? `gpat_ref_${stableHash(`${refCode}|${anonymousVisitorId}`)}` : undefined,
    attributionWindowDays: 60,
    firstTouchAt: timestamp,
    lastTouchAt: timestamp,
    commissionCandidate: Boolean(refCode),
    partnerResolved: false,
  };
}

export function providerReconciliationMetadataFor(input: {
  checkoutAttemptId: string;
  gatewayportUserId: string;
  workspaceId?: string;
  planKey: string;
  marketFunnel: GatewayPortReferralMarketFunnel;
  entryRoute: GatewayPortReferralEntryRoute;
  attribution?: GatewayPortAttributionSnapshot;
}): GatewayPortProviderReconciliationMetadata {
  return {
    productId: "gatewayport",
    checkoutAttemptId: input.checkoutAttemptId,
    gatewayportUserId: input.gatewayportUserId,
    workspaceId: input.workspaceId,
    planKey: input.planKey,
    marketFunnel: input.marketFunnel,
    entryRoute: input.entryRoute,
    attributionTouchId: input.attribution?.attributionTouchId,
    referralAttributionId: input.attribution?.referralAttributionId,
    partnerId: input.attribution?.partnerId,
  };
}
