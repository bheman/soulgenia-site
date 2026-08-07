export type BillingProvider = "stripe" | "paypal" | "asaas" | "none";
export type PaymentMethodFamily = "card" | "paypal" | "pix" | "boleto" | "unknown" | "none";
export type MarketFunnel = "global" | "brazil";
export type PlanKey = "starter" | "builder" | "pro" | "agency" | "enterprise";

export type GatewayPortState =
  | "checkout_started"
  | "checkout_pending_payment"
  | "trial_preflight"
  | "trialing_no_card_pending_review"
  | "trial_connected_limited"
  | "trial_conversion_pending_pix"
  | "renewal_pending_pix"
  | "provider_review_pending"
  | "paid_pending_onboarding"
  | "active_limited"
  | "past_due"
  | "paused_reactivation_hold_30d"
  | "cancel_at_period_end"
  | "cancelled"
  | "suspended"
  | "refund_review_pending"
  | "refunded_closed"
  | "rejected_refund_required"
  | "dispute_review";

export type DashboardState =
  | "checkout_pending"
  | "trial_setup_pending"
  | "trial_review_pending"
  | "trial_active_limited"
  | "trial_conversion_due"
  | "payment_pending"
  | "paid_setup_pending"
  | "workspace_active"
  | "active_until_period_end"
  | "reactivation_available"
  | "manual_review_required"
  | "offboarding_or_closed"
  | "suspended";

export type Capability =
  | "dashboard_read"
  | "connection_request"
  | "whatsapp_connect"
  | "message_read"
  | "media_process"
  | "payload_submit"
  | "scheduled_send_execute"
  | "api_key_create"
  | "billing_reactivate"
  | "data_export";

export type EntitlementSignal =
  | "auth_verified"
  | "trial_review_started"
  | "connection_gate_passed"
  | "payment_pending"
  | "payment_confirmed"
  | "provider_success_redirect"
  | "provider_cancel_redirect"
  | "provider_review_started"
  | "payment_failed"
  | "unpaid_trial_expired"
  | "paid_cancel_requested"
  | "paid_period_ended"
  | "refund_requested"
  | "refund_completed"
  | "risk_rejected"
  | "risk_suspended"
  | "dispute_opened";

export type PlanLimits = {
  planKey: PlanKey;
  connectionsIncluded: number;
  workspacesIncluded: number;
  apiClientsIncluded: number;
  messagesIncluded: number;
  mediaActionsIncluded: number;
  retentionDays: number;
  approvalFirst: boolean;
};

export type EntitlementSnapshot = {
  state: GatewayPortState;
  planKey: PlanKey;
  billingProvider: BillingProvider;
  paymentMethodFamily: PaymentMethodFamily;
  marketFunnel: MarketFunnel;
  now?: Date;
  trialEndsAt?: Date | null;
  currentPeriodEnd?: Date | null;
  paidThrough?: Date | null;
  reactivationHoldUntil?: Date | null;
  messagesUsed?: number;
  mediaActionsUsed?: number;
  activeConnections?: number;
  activeApiClients?: number;
};

export type CapabilityDecision = {
  allowed: boolean;
  reason: string;
  dashboardState: DashboardState;
};

export const PLAN_LIMITS: Record<PlanKey, PlanLimits> = {
  starter: {
    planKey: "starter",
    connectionsIncluded: 1,
    workspacesIncluded: 1,
    apiClientsIncluded: 1,
    messagesIncluded: 500,
    mediaActionsIncluded: 100,
    retentionDays: 30,
    approvalFirst: true,
  },
  builder: {
    planKey: "builder",
    connectionsIncluded: 1,
    workspacesIncluded: 1,
    apiClientsIncluded: 3,
    messagesIncluded: 3000,
    mediaActionsIncluded: 2000,
    retentionDays: 30,
    approvalFirst: true,
  },
  pro: {
    planKey: "pro",
    connectionsIncluded: 3,
    workspacesIncluded: 3,
    apiClientsIncluded: 10,
    messagesIncluded: 10000,
    mediaActionsIncluded: 7500,
    retentionDays: 90,
    approvalFirst: true,
  },
  agency: {
    planKey: "agency",
    connectionsIncluded: 0,
    workspacesIncluded: 0,
    apiClientsIncluded: 0,
    messagesIncluded: 0,
    mediaActionsIncluded: 0,
    retentionDays: 0,
    approvalFirst: true,
  },
  enterprise: {
    planKey: "enterprise",
    connectionsIncluded: 0,
    workspacesIncluded: 0,
    apiClientsIncluded: 0,
    messagesIncluded: 0,
    mediaActionsIncluded: 0,
    retentionDays: 0,
    approvalFirst: true,
  },
};

const DASHBOARD_STATE_BY_ENTITLEMENT: Record<GatewayPortState, DashboardState> = {
  checkout_started: "checkout_pending",
  checkout_pending_payment: "payment_pending",
  trial_preflight: "trial_setup_pending",
  trialing_no_card_pending_review: "trial_review_pending",
  trial_connected_limited: "trial_active_limited",
  trial_conversion_pending_pix: "trial_conversion_due",
  renewal_pending_pix: "payment_pending",
  provider_review_pending: "manual_review_required",
  paid_pending_onboarding: "paid_setup_pending",
  active_limited: "workspace_active",
  past_due: "payment_pending",
  paused_reactivation_hold_30d: "reactivation_available",
  cancel_at_period_end: "active_until_period_end",
  cancelled: "offboarding_or_closed",
  suspended: "suspended",
  refund_review_pending: "manual_review_required",
  refunded_closed: "offboarding_or_closed",
  rejected_refund_required: "manual_review_required",
  dispute_review: "manual_review_required",
};

const ACTIVE_CAPABILITIES = new Set<Capability>([
  "message_read",
  "media_process",
  "payload_submit",
  "scheduled_send_execute",
  "api_key_create",
]);

export function dashboardStateFor(state: GatewayPortState): DashboardState {
  return DASHBOARD_STATE_BY_ENTITLEMENT[state];
}

export function transitionEntitlementState(
  current: GatewayPortState,
  signal: EntitlementSignal
): GatewayPortState {
  if (signal === "risk_suspended") return "suspended";
  if (signal === "dispute_opened") return "dispute_review";
  if (signal === "risk_rejected") return "rejected_refund_required";
  if (signal === "refund_requested") return "refund_review_pending";
  if (signal === "refund_completed") return "refunded_closed";
  if (signal === "unpaid_trial_expired") return "paused_reactivation_hold_30d";
  if (signal === "paid_period_ended" && current === "cancel_at_period_end") {
    return "paused_reactivation_hold_30d";
  }
  if (signal === "paid_cancel_requested" && current === "active_limited") {
    return "cancel_at_period_end";
  }

  switch (current) {
    case "checkout_started":
    case "checkout_pending_payment":
      if (signal === "payment_pending") return "checkout_pending_payment";
      if (signal === "payment_confirmed") return "paid_pending_onboarding";
      if (signal === "provider_review_started") return "provider_review_pending";
      if (signal === "payment_failed") return "past_due";
      return current;
    case "trial_preflight":
      if (signal === "trial_review_started") return "trialing_no_card_pending_review";
      if (signal === "connection_gate_passed") return "trial_connected_limited";
      return current;
    case "trialing_no_card_pending_review":
      if (signal === "connection_gate_passed") return "trial_connected_limited";
      return current;
    case "paid_pending_onboarding":
      if (signal === "connection_gate_passed") return "active_limited";
      return current;
    case "past_due":
    case "paused_reactivation_hold_30d":
      if (signal === "payment_confirmed") return "paid_pending_onboarding";
      return current;
    default:
      return current;
  }
}

export function canUseCapability(
  entitlement: EntitlementSnapshot,
  capability: Capability
): CapabilityDecision {
  const dashboardState = dashboardStateFor(entitlement.state);
  const plan = PLAN_LIMITS[entitlement.planKey];
  const now = entitlement.now ?? new Date();

  if (capability === "dashboard_read" || capability === "data_export") {
    return { allowed: true, reason: "account_access_allowed", dashboardState };
  }

  if (capability === "billing_reactivate") {
    const insideHold =
      entitlement.state === "paused_reactivation_hold_30d" &&
      (!entitlement.reactivationHoldUntil || entitlement.reactivationHoldUntil >= now);
    return {
      allowed: insideHold || entitlement.state === "past_due",
      reason: insideHold ? "reactivation_hold_open" : "reactivation_not_available",
      dashboardState,
    };
  }

  if (entitlement.state === "paused_reactivation_hold_30d") {
    return { allowed: false, reason: "capabilities_paused_for_reactivation_hold", dashboardState };
  }

  if (
    entitlement.state === "cancelled" ||
    entitlement.state === "suspended" ||
    entitlement.state === "refund_review_pending" ||
    entitlement.state === "refunded_closed" ||
    entitlement.state === "rejected_refund_required" ||
    entitlement.state === "dispute_review"
  ) {
    return { allowed: false, reason: `blocked_by_${entitlement.state}`, dashboardState };
  }

  if (entitlement.state === "past_due" && ACTIVE_CAPABILITIES.has(capability)) {
    return { allowed: false, reason: "payment_past_due_blocks_cost_bearing_actions", dashboardState };
  }

  if (capability === "connection_request") {
    return {
      allowed: entitlement.state === "trial_preflight" || entitlement.state === "paid_pending_onboarding",
      reason: "connection_request_gate",
      dashboardState,
    };
  }

  if (capability === "whatsapp_connect") {
    const connectionSlots = entitlement.activeConnections ?? 0;
    const stateAllowsConnection =
      entitlement.state === "trialing_no_card_pending_review" ||
      entitlement.state === "paid_pending_onboarding";
    return {
      allowed: stateAllowsConnection && connectionSlots < plan.connectionsIncluded,
      reason: stateAllowsConnection ? "connection_slot_available" : "connection_state_blocked",
      dashboardState,
    };
  }

  if (capability === "api_key_create") {
    return {
      allowed:
        (entitlement.state === "trial_connected_limited" ||
          entitlement.state === "active_limited" ||
          entitlement.state === "cancel_at_period_end") &&
        (entitlement.activeApiClients ?? 0) < plan.apiClientsIncluded,
      reason: "api_client_limit_check",
      dashboardState,
    };
  }

  if (
    entitlement.state !== "trial_connected_limited" &&
    entitlement.state !== "active_limited" &&
    entitlement.state !== "cancel_at_period_end"
  ) {
    return { allowed: false, reason: `capability_requires_active_state_${entitlement.state}`, dashboardState };
  }

  if (entitlement.state === "trial_connected_limited" && entitlement.trialEndsAt && entitlement.trialEndsAt < now) {
    return { allowed: false, reason: "trial_window_ended", dashboardState };
  }

  if (entitlement.state === "cancel_at_period_end") {
    const paidThrough = entitlement.paidThrough ?? entitlement.currentPeriodEnd;
    if (paidThrough && paidThrough < now) {
      return { allowed: false, reason: "paid_period_ended", dashboardState };
    }
  }

  if (
    (capability === "message_read" ||
      capability === "payload_submit" ||
      capability === "scheduled_send_execute") &&
    (entitlement.messagesUsed ?? 0) >= plan.messagesIncluded
  ) {
    return { allowed: false, reason: "message_quota_exhausted", dashboardState };
  }

  if (capability === "media_process" && (entitlement.mediaActionsUsed ?? 0) >= plan.mediaActionsIncluded) {
    return { allowed: false, reason: "media_action_quota_exhausted", dashboardState };
  }

  return { allowed: true, reason: "entitlement_allows_capability", dashboardState };
}

export function providerEventFamily(provider: BillingProvider): PaymentMethodFamily {
  if (provider === "paypal") return "paypal";
  if (provider === "none") return "none";
  return "unknown";
}
