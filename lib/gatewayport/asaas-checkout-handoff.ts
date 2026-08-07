import type { ProviderIntent } from "./checkout-orchestration.ts";

export type AsaasEnvironment = "sandbox" | "production" | "live";
export type AsaasBillingType = "CREDIT_CARD" | "PIX";
export type AsaasChargeType = "RECURRENT";

export type GatewayPortAsaasCheckoutConfig = {
  env: AsaasEnvironment;
  apiBaseUrl: string;
  apiKeyPresent: boolean;
  webhookTokenPresent: boolean;
  allowProductionSubscription: boolean;
  starterPriceBrl: number;
  successUrl: string;
  cancelUrl: string;
};

export type GatewayPortAsaasCheckoutPayload = {
  billingTypes: AsaasBillingType[];
  chargeTypes: AsaasChargeType[];
  minutesToExpire: number;
  externalReference: string;
  callback: {
    successUrl: string;
    cancelUrl: string;
    expiredUrl: string;
  };
  items: Array<{
    externalReference: string;
    name: string;
    description: string;
    quantity: number;
    value: number;
  }>;
  subscription: {
    cycle: "MONTHLY";
  };
};

export type GatewayPortAsaasCheckoutHandoff = {
  status: "ready_for_sandbox" | "ready_for_production" | "blocked_by_production_flag" | "invalid_config";
  provider: "asaas";
  method: "POST";
  endpointUrl: string;
  providerPayloadAllowed: boolean;
  requestHeadersPreview: {
    accept: "application/json";
    contentType: "application/json";
    accessToken: "present_redacted" | "missing";
  };
  payload: GatewayPortAsaasCheckoutPayload;
  externalReference: string;
  idempotencyKey: string;
  reconciliationMetadata: ProviderIntent["reconciliationMetadata"];
  guard: {
    flagEnvKey: "GATEWAYPORT_ASAAS_ALLOW_PRODUCTION_SUBSCRIPTION";
    productionFlagRequired: boolean;
    customerDocumentPolicyRequired: true;
    webhookPolicyRequired: true;
    browserReturnAuthoritative: false;
    grantsActiveWhatsApp: false;
  };
  invalidReasons: string[];
};

type HandoffInput = {
  providerIntent: ProviderIntent;
  env?: NodeJS.ProcessEnv;
};

const DEFAULT_ASAAS_PRODUCTION_URL = "https://api.asaas.com/v3";
const DEFAULT_ASAAS_SANDBOX_URL = "https://api-sandbox.asaas.com/v3";

function normalizeAsaasEnv(value: string | undefined): AsaasEnvironment {
  const normalized = value?.trim().toLowerCase();
  if (normalized === "production" || normalized === "live") return normalized;
  return "sandbox";
}

function normalizeBaseUrl(value: string | undefined, env: AsaasEnvironment): string {
  const fallback = env === "sandbox" ? DEFAULT_ASAAS_SANDBOX_URL : DEFAULT_ASAAS_PRODUCTION_URL;
  return (value?.trim() || fallback).replace(/\/+$/, "");
}

function asBoolean(value: string | undefined): boolean {
  return value?.trim().toLowerCase() === "true";
}

function numericPrice(value: string | undefined, fallback: number): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function absoluteUrl(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed && /^https?:\/\//.test(trimmed) ? trimmed : undefined;
}

export function readGatewayPortAsaasCheckoutConfig(
  env: NodeJS.ProcessEnv = process.env
): GatewayPortAsaasCheckoutConfig {
  const asaasEnv = normalizeAsaasEnv(env.GATEWAYPORT_ASAAS_ENV);
  const successUrl =
    absoluteUrl(env.GATEWAYPORT_ASAAS_SUCCESS_URL) ??
    "http://localhost:3331/pt/checkout/asaas/success";
  const cancelUrl =
    absoluteUrl(env.GATEWAYPORT_ASAAS_CANCEL_URL) ??
    "http://localhost:3331/pt/checkout/asaas/cancel";

  return {
    env: asaasEnv,
    apiBaseUrl: normalizeBaseUrl(env.GATEWAYPORT_ASAAS_API_BASE_URL, asaasEnv),
    apiKeyPresent: Boolean(env.GATEWAYPORT_ASAAS_API_KEY?.trim()),
    webhookTokenPresent: Boolean(env.GATEWAYPORT_ASAAS_WEBHOOK_TOKEN?.trim()),
    allowProductionSubscription: asBoolean(env.GATEWAYPORT_ASAAS_ALLOW_PRODUCTION_SUBSCRIPTION),
    starterPriceBrl: numericPrice(env.GATEWAYPORT_ASAAS_STARTER_PRICE_BRL, 97),
    successUrl,
    cancelUrl,
  };
}

function invalidReasonsFor(intent: ProviderIntent, config: GatewayPortAsaasCheckoutConfig): string[] {
  const reasons: string[] = [];

  if (intent.provider !== "asaas") reasons.push("provider_must_be_asaas");
  if (intent.operation !== "create_checkout") reasons.push("operation_must_be_create_checkout");
  if (intent.currency !== "BRL") reasons.push("currency_must_be_brl");
  if (intent.reconciliationMetadata.marketFunnel !== "brazil") reasons.push("market_funnel_must_be_brazil");
  if (intent.reconciliationMetadata.entryRoute !== "pt_br") reasons.push("entry_route_must_be_pt_br");
  if (intent.amountMinor !== Math.round(config.starterPriceBrl * 100)) reasons.push("amount_must_match_pt_starter_brl");
  if (!config.apiKeyPresent) reasons.push("asaas_api_key_missing");
  if (!config.webhookTokenPresent) reasons.push("asaas_webhook_token_missing");
  if (!absoluteUrl(config.successUrl)) reasons.push("success_url_invalid");
  if (!absoluteUrl(config.cancelUrl)) reasons.push("cancel_url_invalid");

  return reasons;
}

function asaasCheckoutPayload(
  intent: ProviderIntent,
  config: GatewayPortAsaasCheckoutConfig
): GatewayPortAsaasCheckoutPayload {
  const amountBrl = (intent.amountMinor ?? Math.round(config.starterPriceBrl * 100)) / 100;

  return {
    billingTypes: ["CREDIT_CARD", "PIX"],
    chargeTypes: ["RECURRENT"],
    minutesToExpire: 60,
    externalReference: intent.externalReference,
    callback: {
      successUrl: config.successUrl,
      cancelUrl: config.cancelUrl,
      expiredUrl: config.cancelUrl,
    },
    items: [
      {
        externalReference: "gatewayport_starter_brl_monthly",
        name: "GatewayPort Starter",
        description: "Hosted WhatsApp connection for agents - Starter BRL monthly plan",
        quantity: 1,
        value: amountBrl,
      },
    ],
    subscription: {
      cycle: "MONTHLY",
    },
  };
}

export function createGatewayPortAsaasPtCheckoutHandoff(input: HandoffInput): GatewayPortAsaasCheckoutHandoff {
  const config = readGatewayPortAsaasCheckoutConfig(input.env);
  const invalidReasons = invalidReasonsFor(input.providerIntent, config);
  const productionFlagRequired = config.env === "production" || config.env === "live";
  const productionAllowed = !productionFlagRequired || config.allowProductionSubscription;
  const valid = invalidReasons.length === 0;
  const providerPayloadAllowed = valid && productionAllowed;
  const status: GatewayPortAsaasCheckoutHandoff["status"] = !valid
    ? "invalid_config"
    : !productionAllowed
      ? "blocked_by_production_flag"
      : productionFlagRequired
        ? "ready_for_production"
        : "ready_for_sandbox";

  return {
    status,
    provider: "asaas",
    method: "POST",
    endpointUrl: `${config.apiBaseUrl}/checkouts`,
    providerPayloadAllowed,
    requestHeadersPreview: {
      accept: "application/json",
      contentType: "application/json",
      accessToken: config.apiKeyPresent ? "present_redacted" : "missing",
    },
    payload: asaasCheckoutPayload(input.providerIntent, config),
    externalReference: input.providerIntent.externalReference,
    idempotencyKey: input.providerIntent.idempotencyKey,
    reconciliationMetadata: input.providerIntent.reconciliationMetadata,
    guard: {
      flagEnvKey: "GATEWAYPORT_ASAAS_ALLOW_PRODUCTION_SUBSCRIPTION",
      productionFlagRequired,
      customerDocumentPolicyRequired: true,
      webhookPolicyRequired: true,
      browserReturnAuthoritative: false,
      grantsActiveWhatsApp: false,
    },
    invalidReasons,
  };
}

export function redactedAsaasCheckoutHandoffJson(handoff: GatewayPortAsaasCheckoutHandoff): string {
  return JSON.stringify(handoff, null, 2);
}
