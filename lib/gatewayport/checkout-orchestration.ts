import {
  dashboardStateFor,
  transitionEntitlementState,
  type BillingProvider,
  type EntitlementSignal,
  type GatewayPortState,
  type MarketFunnel,
  type PaymentMethodFamily,
  type PlanKey,
} from "./entitlements.ts";
import type {
  GatewayPortAttributionSnapshot,
  GatewayPortProviderReconciliationMetadata,
} from "./referral-attribution.ts";
import { providerReconciliationMetadataFor } from "./referral-attribution.ts";

export type EntryRoute = "root_en" | "pt_br" | "operator";
export type Currency = "USD" | "BRL" | "custom";
export type BillingMode = "subscription" | "one_time_activation" | "manual_renewal" | "trial" | "none";
export type CheckoutAttemptStatus =
  | "started"
  | "pending_provider"
  | "provider_confirmed"
  | "cancelled"
  | "expired"
  | "failed"
  | "reconciled";

export type CheckoutAction =
  | "start_trial"
  | "start_paid_checkout"
  | "start_pix_renewal"
  | "request_cancellation"
  | "request_refund_review"
  | "request_reactivation";

export type CheckoutAttemptDraft = {
  id: string;
  gatewayportUserId: string;
  workspaceId?: string;
  trialPreflightId?: string;
  entryRoute: EntryRoute;
  marketFunnel: MarketFunnel;
  billingProvider: BillingProvider;
  paymentMethodFamily: PaymentMethodFamily;
  billingMode: BillingMode;
  internalPlanKey: PlanKey;
  currency: Currency;
  amountMinor?: number;
  status: CheckoutAttemptStatus;
  attribution?: GatewayPortAttributionSnapshot;
  postCheckoutDestination: string;
  idempotencyKey: string;
  createdAt: string;
  updatedAt: string;
};

export type ProviderIntent = {
  provider: Exclude<BillingProvider, "none">;
  operation:
    | "create_checkout"
    | "create_subscription_approval"
    | "create_pix_payment"
    | "cancel_at_period_end"
    | "submit_refund_review"
    | "create_reactivation_checkout";
  externalReference: string;
  idempotencyKey: string;
  amountMinor?: number;
  currency: Currency;
  providerPayloadAllowed: false;
  reconciliationMetadata: GatewayPortProviderReconciliationMetadata;
  returnRoute: string;
  cancelRoute: string;
};

export type EntitlementTransitionDecision = {
  fromState?: GatewayPortState;
  signal?: EntitlementSignal;
  nextState: GatewayPortState;
  dashboardState: ReturnType<typeof dashboardStateFor>;
  reason: string;
  grantsActiveWhatsApp: false;
};

export type CheckoutOrchestrationRequest = {
  action: CheckoutAction;
  gatewayportUserId: string;
  workspaceId?: string;
  trialPreflightId?: string;
  entryRoute: EntryRoute;
  marketFunnel: MarketFunnel;
  billingProvider?: BillingProvider;
  paymentMethodFamily?: PaymentMethodFamily;
  billingMode?: BillingMode;
  planKey?: PlanKey;
  currency?: Currency;
  amountMinor?: number;
  attribution?: GatewayPortAttributionSnapshot;
  currentState?: GatewayPortState;
  now?: Date;
  idFactory?: () => string;
};

export type CheckoutOrchestrationResult = {
  attempt: CheckoutAttemptDraft;
  providerIntent: ProviderIntent | null;
  entitlementTransition: EntitlementTransitionDecision;
};

export type ProviderReturnResolution = {
  returnKind: "success" | "cancel";
  nextAttemptStatus: CheckoutAttemptStatus;
  entitlementTransition: null;
  reason: "provider_return_is_not_authoritative";
};

export type ProviderConfirmationRequest = {
  currentState: GatewayPortState;
  provider: Exclude<BillingProvider, "none">;
  providerEventId: string;
};

const DEFAULT_PLAN: PlanKey = "starter";

function makeId(idFactory: (() => string) | undefined, prefix: string): string {
  if (idFactory) return idFactory();
  return `${prefix}_${Math.random().toString(36).slice(2, 12)}${Date.now().toString(36)}`;
}

function iso(now?: Date): string {
  return (now ?? new Date()).toISOString();
}

function destinationForState(state: GatewayPortState): string {
  return dashboardStateFor(state);
}

function providerOperationFor(action: CheckoutAction, provider: Exclude<BillingProvider, "none">): ProviderIntent["operation"] {
  if (action === "start_pix_renewal") return "create_pix_payment";
  if (action === "request_cancellation") return "cancel_at_period_end";
  if (action === "request_refund_review") return "submit_refund_review";
  if (action === "request_reactivation") return "create_reactivation_checkout";
  if (provider === "paypal") return "create_subscription_approval";
  return "create_checkout";
}

function providerIntentFor(
  action: CheckoutAction,
  provider: BillingProvider,
  attempt: CheckoutAttemptDraft
): ProviderIntent | null {
  if (provider === "none" || action === "start_trial") return null;

  return {
    provider,
    operation: providerOperationFor(action, provider),
    externalReference: attempt.id,
    idempotencyKey: attempt.idempotencyKey,
    amountMinor: attempt.amountMinor,
    currency: attempt.currency,
    providerPayloadAllowed: false,
    reconciliationMetadata: providerReconciliationMetadataFor({
      checkoutAttemptId: attempt.id,
      gatewayportUserId: attempt.gatewayportUserId,
      workspaceId: attempt.workspaceId,
      planKey: attempt.internalPlanKey,
      marketFunnel: attempt.marketFunnel,
      entryRoute: attempt.entryRoute,
      attribution: attempt.attribution,
    }),
    returnRoute: `/gatewayport/checkout/return/${attempt.id}`,
    cancelRoute: `/gatewayport/checkout/cancel/${attempt.id}`,
  };
}

function nextStateFor(action: CheckoutAction, currentState?: GatewayPortState): GatewayPortState {
  switch (action) {
    case "start_trial":
      return "trial_preflight";
    case "start_paid_checkout":
      return "checkout_pending_payment";
    case "start_pix_renewal":
      return currentState === "trial_connected_limited" || currentState === "trialing_no_card_pending_review"
        ? "trial_conversion_pending_pix"
        : "renewal_pending_pix";
    case "request_cancellation":
      return transitionEntitlementState(currentState ?? "active_limited", "paid_cancel_requested");
    case "request_refund_review":
      return transitionEntitlementState(currentState ?? "active_limited", "refund_requested");
    case "request_reactivation":
      return currentState ?? "paused_reactivation_hold_30d";
  }
}

function signalFor(action: CheckoutAction): EntitlementSignal | undefined {
  if (action === "request_cancellation") return "paid_cancel_requested";
  if (action === "request_refund_review") return "refund_requested";
  if (action === "start_paid_checkout" || action === "start_pix_renewal" || action === "request_reactivation") {
    return "payment_pending";
  }
  return "auth_verified";
}

export function orchestrateCheckout(request: CheckoutOrchestrationRequest): CheckoutOrchestrationResult {
  const planKey = request.planKey ?? DEFAULT_PLAN;
  const provider = request.billingProvider ?? (request.action === "start_trial" ? "none" : "stripe");
  const paymentMethodFamily =
    request.paymentMethodFamily ??
    (provider === "none" ? "none" : provider === "paypal" ? "paypal" : provider === "asaas" ? "pix" : "card");
  const nextState = nextStateFor(request.action, request.currentState);
  const timestamp = iso(request.now);
  const id = makeId(request.idFactory, "gpc_attempt");
  const billingMode =
    request.billingMode ??
    (request.action === "start_trial"
      ? "trial"
      : request.action === "start_pix_renewal"
        ? "manual_renewal"
        : "subscription");

  const attempt: CheckoutAttemptDraft = {
    id,
    gatewayportUserId: request.gatewayportUserId,
    workspaceId: request.workspaceId,
    trialPreflightId: request.trialPreflightId,
    entryRoute: request.entryRoute,
    marketFunnel: request.marketFunnel,
    billingProvider: provider,
    paymentMethodFamily,
    billingMode,
    internalPlanKey: planKey,
    currency: request.currency ?? (request.marketFunnel === "brazil" ? "BRL" : "USD"),
    amountMinor: request.amountMinor,
    status: provider === "none" ? "started" : "pending_provider",
    attribution: request.attribution,
    postCheckoutDestination: destinationForState(nextState),
    idempotencyKey: `gatewayport:${request.gatewayportUserId}:${id}`,
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  return {
    attempt,
    providerIntent: providerIntentFor(request.action, provider, attempt),
    entitlementTransition: {
      fromState: request.currentState,
      signal: signalFor(request.action),
      nextState,
      dashboardState: dashboardStateFor(nextState),
      reason: request.action,
      grantsActiveWhatsApp: false,
    },
  };
}

export function resolveProviderReturn(returnKind: "success" | "cancel"): ProviderReturnResolution {
  return {
    returnKind,
    nextAttemptStatus: returnKind === "cancel" ? "cancelled" : "pending_provider",
    entitlementTransition: null,
    reason: "provider_return_is_not_authoritative",
  };
}

export function applyVerifiedProviderConfirmation(request: ProviderConfirmationRequest): EntitlementTransitionDecision {
  const nextState = transitionEntitlementState(request.currentState, "payment_confirmed");
  return {
    fromState: request.currentState,
    signal: "payment_confirmed",
    nextState,
    dashboardState: dashboardStateFor(nextState),
    reason: `verified_provider_event:${request.provider}:${request.providerEventId}`,
    grantsActiveWhatsApp: false,
  };
}
