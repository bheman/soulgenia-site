import {
  dashboardStateFor,
  transitionEntitlementState,
  type BillingProvider,
  type EntitlementSignal,
  type GatewayPortState,
} from "./entitlements.ts";

export type Currency = "USD" | "BRL" | "custom";

export type CheckoutProvider = Exclude<BillingProvider, "none">;

export type ProviderPaymentStatus =
  | "none"
  | "pending"
  | "paid"
  | "failed"
  | "expired"
  | "refunded"
  | "reversed";

export type ProviderSubscriptionStatus =
  | "none"
  | "created"
  | "trialing"
  | "active"
  | "past_due"
  | "cancel_at_period_end"
  | "cancelled"
  | "deleted"
  | "suspended";

export type ProviderRiskStatus = "none" | "pending_review" | "approved" | "rejected" | "disputed";

export type ProviderAmount = {
  minor: number;
  currency: Currency;
};

export type NormalizedProviderEvent = {
  provider: CheckoutProvider;
  providerEventId: string;
  eventType: string;
  objectId: string;
  gatewayportReference?: string;
  paymentStatus: ProviderPaymentStatus;
  subscriptionStatus: ProviderSubscriptionStatus;
  riskStatus: ProviderRiskStatus;
  amount?: ProviderAmount;
  periodStart?: string;
  periodEnd?: string;
  rawPayloadRedacted: Record<string, unknown>;
};

export type ProviderTransitionIntent = {
  provider: CheckoutProvider;
  providerEventId: string;
  eventType: string;
  gatewayportReference?: string;
  signal: EntitlementSignal | null;
  currentState?: GatewayPortState;
  nextStatePreview?: GatewayPortState;
  dashboardStatePreview?: ReturnType<typeof dashboardStateFor>;
  reason: string;
  grantsActiveWhatsApp: false;
  writesProductState: false;
};

export interface GatewayPortProviderAdapter<TFixture = Record<string, unknown>> {
  provider: CheckoutProvider;
  mapFixtureEvent(payload: TFixture): NormalizedProviderEvent;
  toTransitionIntent(event: NormalizedProviderEvent, currentState?: GatewayPortState): ProviderTransitionIntent;
}

type UnknownRecord = Record<string, unknown>;

type StripeFixtureEvent = {
  id: string;
  type: string;
  data: {
    object: UnknownRecord & {
      id: string;
      object?: string;
      payment_status?: string;
      status?: string;
      amount_total?: number;
      amount_paid?: number;
      amount_due?: number;
      amount_refunded?: number;
      currency?: string;
      current_period_start?: number;
      current_period_end?: number;
      period_start?: number;
      period_end?: number;
      metadata?: UnknownRecord;
      client_reference_id?: string;
      subscription?: string;
      invoice?: string;
      payment_intent?: string;
      charge?: string;
    };
  };
};

type PayPalFixtureEvent = {
  id: string;
  event_type: string;
  resource: UnknownRecord & {
    id: string;
    status?: string;
    custom_id?: string;
    invoice_id?: string;
    amount?: { value?: string; currency_code?: string };
    billing_info?: {
      last_payment?: { amount?: { value?: string; currency_code?: string } };
      next_billing_time?: string;
    };
  };
};

type AsaasFixtureEvent = {
  id: string;
  event: string;
  payment?: UnknownRecord & {
    id: string;
    status?: string;
    externalReference?: string;
    value?: number;
    netValue?: number;
    billingType?: string;
    dueDate?: string;
    confirmedDate?: string;
  };
  checkout?: UnknownRecord & {
    id: string;
    status?: string;
    externalReference?: string;
    value?: number;
  };
  riskAnalysis?: UnknownRecord & {
    id: string;
    status?: string;
    externalReference?: string;
  };
};

function asCurrency(value: unknown, fallback: Currency): Currency {
  if (value === "USD" || value === "BRL" || value === "custom") return value;
  if (typeof value === "string") {
    const upper = value.toUpperCase();
    if (upper === "USD" || upper === "BRL") return upper;
  }
  return fallback;
}

function isoFromEpochSeconds(value: unknown): string | undefined {
  return typeof value === "number" ? new Date(value * 1000).toISOString() : undefined;
}

function minorFromDecimalString(value: unknown): number | undefined {
  if (typeof value !== "string") return undefined;
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return undefined;
  return Math.round(parsed * 100);
}

function minorFromBrazilDecimal(value: unknown): number | undefined {
  if (typeof value !== "number" || !Number.isFinite(value)) return undefined;
  return Math.round(value * 100);
}

function withDefined(input: UnknownRecord): UnknownRecord {
  return Object.fromEntries(Object.entries(input).filter(([, value]) => value !== undefined));
}

function stripeReference(object: StripeFixtureEvent["data"]["object"]): string | undefined {
  return (
    (typeof object.client_reference_id === "string" && object.client_reference_id) ||
    (typeof object.metadata?.gatewayport_reference === "string" && object.metadata.gatewayport_reference) ||
    (typeof object.metadata?.gatewayportReference === "string" && object.metadata.gatewayportReference) ||
    undefined
  );
}

function mapStripePaymentStatus(type: string, object: StripeFixtureEvent["data"]["object"]): ProviderPaymentStatus {
  if (type === "checkout.session.completed" || type === "invoice.paid") return "paid";
  if (type === "invoice.payment_failed") return "failed";
  if (type === "charge.refunded") return "refunded";
  if (object.payment_status === "paid") return "paid";
  if (object.payment_status === "unpaid" || object.status === "past_due") return "failed";
  return "pending";
}

function mapStripeSubscriptionStatus(type: string, object: StripeFixtureEvent["data"]["object"]): ProviderSubscriptionStatus {
  if (type === "customer.subscription.deleted") return "deleted";
  if (type === "customer.subscription.trial_will_end") return "trialing";
  if (object.status === "active") return "active";
  if (object.status === "trialing") return "trialing";
  if (object.status === "past_due" || object.status === "unpaid") return "past_due";
  if (object.status === "canceled") return "cancelled";
  return "none";
}

function signalFromStripe(type: string, object: StripeFixtureEvent["data"]["object"]): EntitlementSignal | null {
  if (type === "checkout.session.completed" || type === "invoice.paid") return "payment_confirmed";
  if (type === "invoice.payment_failed") return "payment_failed";
  if (type === "customer.subscription.deleted") return "paid_period_ended";
  if (type === "charge.refunded") return "refund_completed";
  if (type === "customer.subscription.trial_will_end") return null;
  if (type === "customer.subscription.updated") {
    if (object.status === "active" || object.status === "trialing") return "payment_confirmed";
    if (object.status === "past_due" || object.status === "unpaid") return "payment_failed";
    if (object.status === "canceled") return "paid_period_ended";
  }
  return "provider_review_started";
}

function signalFromPayPal(type: string, resource: PayPalFixtureEvent["resource"]): EntitlementSignal | null {
  if (type === "BILLING.SUBSCRIPTION.ACTIVATED") return "payment_confirmed";
  if (type === "BILLING.SUBSCRIPTION.CREATED") return "payment_pending";
  if (type === "BILLING.SUBSCRIPTION.CANCELLED" || type === "BILLING.SUBSCRIPTION.EXPIRED") return "paid_period_ended";
  if (type === "PAYMENT.SALE.DENIED" || type === "BILLING.SUBSCRIPTION.PAYMENT.FAILED") return "payment_failed";
  if (type === "PAYMENT.SALE.REFUNDED") return "refund_completed";
  if (type === "PAYMENT.SALE.REVERSED") return "dispute_opened";
  if (resource.status === "SUSPENDED") return "risk_suspended";
  return "provider_review_started";
}

function signalFromAsaas(type: string, status?: string): EntitlementSignal | null {
  if (type === "CHECKOUT_PAID" || type === "PAYMENT_RECEIVED" || status === "RECEIVED" || status === "CONFIRMED") {
    return "payment_confirmed";
  }
  if (type === "CHECKOUT_EXPIRED" || type === "PAYMENT_OVERDUE" || status === "OVERDUE") return "payment_failed";
  if (type === "PAYMENT_REFUNDED") return "refund_completed";
  if (type === "PAYMENT_CHARGEBACK_REQUESTED" || type === "PAYMENT_CHARGEBACK_DISPUTE") return "dispute_opened";
  if (type === "RISK_ANALYSIS_APPROVED") return "payment_confirmed";
  if (type === "RISK_ANALYSIS_REJECTED") return "risk_rejected";
  if (type === "RISK_ANALYSIS_REQUESTED") return "provider_review_started";
  return "provider_review_started";
}

function intentFromNormalized(
  event: NormalizedProviderEvent,
  signal: EntitlementSignal | null,
  currentState?: GatewayPortState
): ProviderTransitionIntent {
  const nextStatePreview = signal && currentState ? transitionEntitlementState(currentState, signal) : undefined;
  return {
    provider: event.provider,
    providerEventId: event.providerEventId,
    eventType: event.eventType,
    gatewayportReference: event.gatewayportReference,
    signal,
    currentState,
    nextStatePreview,
    dashboardStatePreview: nextStatePreview ? dashboardStateFor(nextStatePreview) : undefined,
    reason: signal ? `provider_event:${event.provider}:${event.eventType}:${signal}` : `provider_event:${event.provider}:${event.eventType}:record_only`,
    grantsActiveWhatsApp: false,
    writesProductState: false,
  };
}

export const stripeProviderAdapter: GatewayPortProviderAdapter<StripeFixtureEvent> = {
  provider: "stripe",
  mapFixtureEvent(payload) {
    const object = payload.data.object;
    const amountMinor = object.amount_total ?? object.amount_paid ?? object.amount_due ?? object.amount_refunded;
    const currency = asCurrency(object.currency, "USD");
    return {
      provider: "stripe",
      providerEventId: payload.id,
      eventType: payload.type,
      objectId: object.id,
      gatewayportReference: stripeReference(object),
      paymentStatus: mapStripePaymentStatus(payload.type, object),
      subscriptionStatus: mapStripeSubscriptionStatus(payload.type, object),
      riskStatus: "none",
      amount: typeof amountMinor === "number" ? { minor: amountMinor, currency } : undefined,
      periodStart: isoFromEpochSeconds(object.current_period_start ?? object.period_start),
      periodEnd: isoFromEpochSeconds(object.current_period_end ?? object.period_end),
      rawPayloadRedacted: withDefined({
        id: payload.id,
        type: payload.type,
        objectId: object.id,
        objectType: object.object,
        status: object.status,
        paymentStatus: object.payment_status,
        gatewayportReference: stripeReference(object),
        subscription: object.subscription,
        invoice: object.invoice,
        paymentIntent: object.payment_intent,
        charge: object.charge,
      }),
    };
  },
  toTransitionIntent(event, currentState) {
    return intentFromNormalized(event, signalFromStripe(event.eventType, event.rawPayloadRedacted as StripeFixtureEvent["data"]["object"]), currentState);
  },
};

export const paypalProviderAdapter: GatewayPortProviderAdapter<PayPalFixtureEvent> = {
  provider: "paypal",
  mapFixtureEvent(payload) {
    const resource = payload.resource;
    const amountMinor =
      minorFromDecimalString(resource.amount?.value) ?? minorFromDecimalString(resource.billing_info?.last_payment?.amount?.value);
    const currency = asCurrency(resource.amount?.currency_code ?? resource.billing_info?.last_payment?.amount?.currency_code, "USD");
    const status = typeof resource.status === "string" ? resource.status : undefined;
    return {
      provider: "paypal",
      providerEventId: payload.id,
      eventType: payload.event_type,
      objectId: resource.id,
      gatewayportReference: resource.custom_id ?? resource.invoice_id,
      paymentStatus:
        payload.event_type === "PAYMENT.SALE.REFUNDED"
          ? "refunded"
          : payload.event_type === "PAYMENT.SALE.REVERSED"
            ? "reversed"
            : payload.event_type === "PAYMENT.SALE.DENIED" || payload.event_type === "BILLING.SUBSCRIPTION.PAYMENT.FAILED"
              ? "failed"
              : payload.event_type === "BILLING.SUBSCRIPTION.ACTIVATED"
                ? "paid"
                : "pending",
      subscriptionStatus:
        payload.event_type === "BILLING.SUBSCRIPTION.CREATED"
          ? "created"
          : payload.event_type === "BILLING.SUBSCRIPTION.ACTIVATED"
            ? "active"
            : payload.event_type === "BILLING.SUBSCRIPTION.CANCELLED" || payload.event_type === "BILLING.SUBSCRIPTION.EXPIRED"
              ? "cancelled"
              : status === "SUSPENDED"
                ? "suspended"
                : "none",
      riskStatus: payload.event_type === "PAYMENT.SALE.REVERSED" ? "disputed" : status === "SUSPENDED" ? "pending_review" : "none",
      amount: amountMinor !== undefined ? { minor: amountMinor, currency } : undefined,
      periodEnd: resource.billing_info?.next_billing_time,
      rawPayloadRedacted: withDefined({
        id: payload.id,
        eventType: payload.event_type,
        resourceId: resource.id,
        status,
        gatewayportReference: resource.custom_id ?? resource.invoice_id,
      }),
    };
  },
  toTransitionIntent(event, currentState) {
    return intentFromNormalized(event, signalFromPayPal(event.eventType, event.rawPayloadRedacted as PayPalFixtureEvent["resource"]), currentState);
  },
};

export const asaasProviderAdapter: GatewayPortProviderAdapter<AsaasFixtureEvent> = {
  provider: "asaas",
  mapFixtureEvent(payload) {
    const object = payload.payment ?? payload.checkout ?? payload.riskAnalysis;
    if (!object?.id) {
      throw new Error(`Asaas fixture ${payload.id} is missing payment, checkout, or riskAnalysis object`);
    }
    const status = typeof object.status === "string" ? object.status : undefined;
    const amountMinor = minorFromBrazilDecimal(payload.payment?.value ?? payload.payment?.netValue ?? payload.checkout?.value);
    return {
      provider: "asaas",
      providerEventId: payload.id,
      eventType: payload.event,
      objectId: object.id,
      gatewayportReference: object.externalReference,
      paymentStatus:
        payload.event === "CHECKOUT_PAID" || payload.event === "PAYMENT_RECEIVED"
          ? "paid"
          : payload.event === "CHECKOUT_EXPIRED"
            ? "expired"
            : payload.event === "PAYMENT_OVERDUE"
              ? "failed"
              : payload.event === "PAYMENT_REFUNDED"
                ? "refunded"
                : payload.event.startsWith("PAYMENT_CHARGEBACK")
                  ? "reversed"
                  : "pending",
      subscriptionStatus: "none",
      riskStatus:
        payload.event === "RISK_ANALYSIS_APPROVED"
          ? "approved"
          : payload.event === "RISK_ANALYSIS_REJECTED"
            ? "rejected"
            : payload.event === "RISK_ANALYSIS_REQUESTED"
              ? "pending_review"
              : payload.event.startsWith("PAYMENT_CHARGEBACK")
                ? "disputed"
                : "none",
      amount: amountMinor !== undefined ? { minor: amountMinor, currency: "BRL" } : undefined,
      periodEnd: payload.payment?.dueDate,
      rawPayloadRedacted: withDefined({
        id: payload.id,
        event: payload.event,
        objectId: object.id,
        status,
        billingType: payload.payment?.billingType,
        gatewayportReference: object.externalReference,
      }),
    };
  },
  toTransitionIntent(event, currentState) {
    const status = typeof event.rawPayloadRedacted.status === "string" ? event.rawPayloadRedacted.status : undefined;
    return intentFromNormalized(event, signalFromAsaas(event.eventType, status), currentState);
  },
};

export const providerAdapters = {
  stripe: stripeProviderAdapter,
  paypal: paypalProviderAdapter,
  asaas: asaasProviderAdapter,
} satisfies Record<CheckoutProvider, GatewayPortProviderAdapter>;

export function mapProviderFixtureEvent(provider: CheckoutProvider, payload: Record<string, unknown>): NormalizedProviderEvent {
  switch (provider) {
    case "stripe":
      return stripeProviderAdapter.mapFixtureEvent(payload as StripeFixtureEvent);
    case "paypal":
      return paypalProviderAdapter.mapFixtureEvent(payload as PayPalFixtureEvent);
    case "asaas":
      return asaasProviderAdapter.mapFixtureEvent(payload as AsaasFixtureEvent);
  }
}

export function providerTransitionIntent(
  event: NormalizedProviderEvent,
  currentState?: GatewayPortState
): ProviderTransitionIntent {
  return providerAdapters[event.provider].toTransitionIntent(event, currentState);
}
