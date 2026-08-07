import {
  applyVerifiedProviderConfirmation,
  orchestrateCheckout,
  resolveProviderReturn,
  type ProviderReturnResolution,
} from "./checkout-orchestration.ts";
import { buildGatewayPortDashboardReadModel } from "./dashboard-read-model.ts";
import type { DashboardState, GatewayPortState, PlanKey } from "./entitlements.ts";
import {
  createGatewayPortAttributionSnapshot,
  type GatewayPortAttributionSnapshot,
  type GatewayPortProviderReconciliationMetadata,
} from "./referral-attribution.ts";

export type TestCheckoutPlanKey = Extract<PlanKey, "starter" | "builder" | "pro">;

export type TestCheckoutPlan = {
  key: TestCheckoutPlanKey;
  name: string;
  amountMinor: number;
  currency: "USD";
  billingLabel: string;
  envKey: string;
};

export type StripePriceEnvStatus = {
  planKey: TestCheckoutPlanKey;
  key: string;
  status: "present" | "missing" | "invalid";
};

export type TestCheckoutUiPreview = {
  attemptId: string;
  planKey: TestCheckoutPlanKey;
  amountMinor: number;
  currency: "USD";
  attemptStatus: "pending_provider";
  nextEntitlementState: "checkout_pending_payment";
  nextDashboardState: "payment_pending";
  provider: "stripe";
  providerOperation: "create_checkout";
  providerPayloadAllowed: false;
  attribution: GatewayPortAttributionSnapshot;
  providerReconciliationMetadata: GatewayPortProviderReconciliationMetadata;
  successReturnAuthoritative: false;
  customerFacingStatus: "Payment pending";
};

export type VerifiedProviderFixturePreview = {
  providerEventId: string;
  nextEntitlementState: GatewayPortState;
  nextDashboardState: DashboardState;
  dashboardCardKey: string;
  grantsActiveWhatsApp: false;
};

export const TEST_CHECKOUT_PLANS: TestCheckoutPlan[] = [
  {
    key: "starter",
    name: "Starter",
    amountMinor: 1900,
    currency: "USD",
    billingLabel: "US$19/mo",
    envKey: "GATEWAYPORT_STRIPE_STARTER_PRICE_ID",
  },
  {
    key: "builder",
    name: "Builder",
    amountMinor: 4900,
    currency: "USD",
    billingLabel: "US$49/mo",
    envKey: "GATEWAYPORT_STRIPE_BUILDER_PRICE_ID",
  },
  {
    key: "pro",
    name: "Pro",
    amountMinor: 9900,
    currency: "USD",
    billingLabel: "US$99/mo",
    envKey: "GATEWAYPORT_STRIPE_PRO_PRICE_ID",
  },
];

export function isTestCheckoutUiEnabled(env: NodeJS.ProcessEnv = process.env): boolean {
  return env.GATEWAYPORT_CHECKOUT_UI_MODE === "test_preview";
}

export function getTestCheckoutPlan(planKey: string | undefined): TestCheckoutPlan {
  return TEST_CHECKOUT_PLANS.find((plan) => plan.key === planKey) ?? TEST_CHECKOUT_PLANS[0];
}

export function getStripePriceEnvStatus(env: NodeJS.ProcessEnv = process.env): StripePriceEnvStatus[] {
  return TEST_CHECKOUT_PLANS.map((plan) => {
    const value = env[plan.envKey] ?? "";
    return {
      planKey: plan.key,
      key: plan.envKey,
      status: value.length === 0 ? "missing" : /^price_/.test(value) ? "present" : "invalid",
    };
  });
}

export function canOpenStripeTestCheckout(env: NodeJS.ProcessEnv = process.env): boolean {
  return isTestCheckoutUiEnabled(env) && getStripePriceEnvStatus(env).every((item) => item.status === "present");
}

export function createTestCheckoutUiPreview(
  planKey: TestCheckoutPlanKey,
  idFactory: () => string = () => `gpc_preview_${planKey}_local`,
  attribution: GatewayPortAttributionSnapshot = createGatewayPortAttributionSnapshot({
    entryRoute: "root_en",
    marketFunnel: "global",
    landingPath: "/gatewayport/checkout/test",
    now: new Date("2026-06-30T15:00:00.000Z"),
  })
): TestCheckoutUiPreview {
  const plan = getTestCheckoutPlan(planKey);
  const result = orchestrateCheckout({
    action: "start_paid_checkout",
    gatewayportUserId: "local_test_user",
    workspaceId: "local_test_workspace",
    entryRoute: "root_en",
    marketFunnel: "global",
    billingProvider: "stripe",
    paymentMethodFamily: "card",
    billingMode: "subscription",
    currency: "USD",
    amountMinor: plan.amountMinor,
    planKey: plan.key,
    attribution,
    now: new Date("2026-06-30T15:00:00.000Z"),
    idFactory,
  });

  const providerIntent = result.providerIntent;

  if (result.attempt.status !== "pending_provider" || providerIntent?.operation !== "create_checkout") {
    throw new Error("GatewayPort test checkout preview must remain a pending Stripe checkout intent.");
  }

  return {
    attemptId: result.attempt.id,
    planKey: plan.key,
    amountMinor: plan.amountMinor,
    currency: "USD",
    attemptStatus: "pending_provider",
    nextEntitlementState: "checkout_pending_payment",
    nextDashboardState: "payment_pending",
    provider: "stripe",
    providerOperation: "create_checkout",
    providerPayloadAllowed: false,
    attribution,
    providerReconciliationMetadata: providerIntent.reconciliationMetadata,
    successReturnAuthoritative: false,
    customerFacingStatus: "Payment pending",
  };
}

export function resolveTestCheckoutProviderReturn(
  returnKind: "success" | "cancel"
): ProviderReturnResolution & {
  displayedEntitlementState: "checkout_pending_payment" | "cancelled";
  displayedDashboardState: "payment_pending" | "offboarding_or_closed";
} {
  const resolution = resolveProviderReturn(returnKind);
  return {
    ...resolution,
    displayedEntitlementState: returnKind === "success" ? "checkout_pending_payment" : "cancelled",
    displayedDashboardState: returnKind === "success" ? "payment_pending" : "offboarding_or_closed",
  };
}

export function simulateVerifiedStripeEvent(
  providerEventId = "evt_fixture_gatewayport_test_checkout"
): VerifiedProviderFixturePreview {
  const transition = applyVerifiedProviderConfirmation({
    currentState: "checkout_pending_payment",
    provider: "stripe",
    providerEventId,
  });
  const readModel = buildGatewayPortDashboardReadModel({
    entitlement: {
      state: transition.nextState,
      planKey: "starter",
      billingProvider: "stripe",
      paymentMethodFamily: "card",
      marketFunnel: "global",
    },
  });

  return {
    providerEventId,
    nextEntitlementState: transition.nextState,
    nextDashboardState: transition.dashboardState,
    dashboardCardKey: readModel.cardKey,
    grantsActiveWhatsApp: transition.grantsActiveWhatsApp,
  };
}

export function redactedSerializedPreview(preview: TestCheckoutUiPreview): string {
  return JSON.stringify(preview, null, 2);
}
