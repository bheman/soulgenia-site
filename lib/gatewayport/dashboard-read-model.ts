import {
  canUseCapability,
  dashboardStateFor,
  type Capability,
  type DashboardState,
  type EntitlementSnapshot,
  type GatewayPortState,
} from "./entitlements.ts";

export type DashboardSeverity = "setup" | "active" | "attention" | "blocked" | "closed";
export type DashboardCardKey =
  | "checkout_started"
  | "payment_pending"
  | "trial_setup"
  | "connection_review"
  | "trial_connected"
  | "pix_conversion_due"
  | "pix_renewal_pending"
  | "provider_review"
  | "activation_pending"
  | "connected_approval_first"
  | "payment_problem"
  | "paused_reactivation"
  | "active_until_period_end"
  | "cancelled_closed"
  | "suspended_review"
  | "refund_under_review"
  | "refunded_closed"
  | "not_eligible_refund_required"
  | "dispute_review";

export type LocalizedLabel = {
  en: string;
  pt: string;
};

export type GatewayPortDashboardCard = {
  entitlementState: GatewayPortState;
  dashboardState: DashboardState;
  cardKey: DashboardCardKey;
  severity: DashboardSeverity;
  statusChip: LocalizedLabel;
  title: LocalizedLabel;
  primaryActionKey: string;
  primaryActionEnabled: boolean;
  allowedSurfaces: string[];
  blockedSurfaces: string[];
  gateLabel?: string;
};

export type GatewayPortHydratedCapability = {
  capability: Capability;
  allowed: boolean;
  reason: string;
};

export type GatewayPortHandoffGate = {
  card: "connection_status" | "quota_retention" | "agent_template_cards" | "api_mcp_config" | "approval_audit" | "billing_reactivation" | "support_expectations";
  visible: boolean;
  enabled: boolean;
  reason: string;
};

export type DashboardReadModelInput = {
  entitlement: EntitlementSnapshot;
  routeReady?: boolean;
  tokenRevealApproved?: boolean;
  credentialEligible?: boolean;
  providerReturnKind?: "success" | "cancel";
};

export type GatewayPortDashboardReadModel = GatewayPortDashboardCard & {
  providerReturnKind?: "success" | "cancel";
  providerReturnAuthoritative: false;
  capabilities: GatewayPortHydratedCapability[];
  handoffGates: GatewayPortHandoffGate[];
};

const CAPABILITIES_TO_HYDRATE: Capability[] = [
  "dashboard_read",
  "connection_request",
  "whatsapp_connect",
  "message_read",
  "media_process",
  "payload_submit",
  "scheduled_send_execute",
  "api_key_create",
  "billing_reactivate",
  "data_export",
];

const ACTIVE_HANDOFF_STATES = new Set<GatewayPortState>([
  "trial_connected_limited",
  "active_limited",
  "cancel_at_period_end",
]);

const CARD_BY_ENTITLEMENT: Record<GatewayPortState, Omit<GatewayPortDashboardCard, "entitlementState" | "dashboardState" | "primaryActionEnabled">> = {
  checkout_started: {
    cardKey: "checkout_started",
    severity: "setup",
    statusChip: { en: "Checkout started", pt: "Checkout iniciado" },
    title: { en: "Checkout started", pt: "Checkout iniciado" },
    primaryActionKey: "return_to_checkout",
    allowedSurfaces: ["billing", "pricing", "support", "dashboard_read"],
    blockedSurfaces: ["QR", "token reveal", "agent handoff", "media", "sends", "scheduling"],
    gateLabel: "checkout_pending",
  },
  checkout_pending_payment: {
    cardKey: "payment_pending",
    severity: "attention",
    statusChip: { en: "Payment pending", pt: "Pagamento pendente" },
    title: { en: "Payment pending", pt: "Pagamento pendente" },
    primaryActionKey: "finish_payment",
    allowedSurfaces: ["billing", "support", "dashboard_read"],
    blockedSurfaces: ["QR", "token reveal", "agent handoff", "media", "sends", "scheduling"],
    gateLabel: "payment_pending",
  },
  trial_preflight: {
    cardKey: "trial_setup",
    severity: "setup",
    statusChip: { en: "Limited access", pt: "Acesso limitado" },
    title: { en: "Complete workspace setup", pt: "Conclua a configuracao" },
    primaryActionKey: "complete_workspace_setup",
    allowedSurfaces: ["workspace setup", "demo/sample", "connection request", "quota preview", "dashboard_read"],
    blockedSurfaces: ["QR until gate passes", "token reveal", "real media", "sends", "scheduling"],
    gateLabel: "trial_preflight",
  },
  trialing_no_card_pending_review: {
    cardKey: "connection_review",
    severity: "attention",
    statusChip: { en: "Review pending", pt: "Revisao pendente" },
    title: { en: "Connection review pending", pt: "Revisao de conexao pendente" },
    primaryActionKey: "wait_for_connection_review",
    allowedSurfaces: ["dashboard_read", "checklist", "support", "demo/sample"],
    blockedSurfaces: ["QR until approved", "token reveal", "real media", "sends", "scheduling"],
    gateLabel: "manual_review",
  },
  trial_connected_limited: {
    cardKey: "trial_connected",
    severity: "active",
    statusChip: { en: "Trial connected (limited)", pt: "Trial conectado (limitado)" },
    title: { en: "Trial connected", pt: "Trial conectado" },
    primaryActionKey: "connect_your_agent",
    allowedSurfaces: ["agent handoff templates", "quota meters", "bounded reads", "media within quota", "approval queue", "audit"],
    blockedSurfaces: ["autonomous sends", "quota expansion", "extra connections", "risky media beyond quota"],
  },
  trial_conversion_pending_pix: {
    cardKey: "pix_conversion_due",
    severity: "attention",
    statusChip: { en: "Pix conversion pending", pt: "Pix de conversao pendente" },
    title: { en: "Complete Pix payment", pt: "Conclua o pagamento Pix" },
    primaryActionKey: "complete_pix_payment",
    allowedSurfaces: ["billing", "trial status", "dashboard_read", "active trial surfaces until expiry if still entitled"],
    blockedSurfaces: ["paid entitlement", "quota expansion", "extra connection"],
    gateLabel: "pix_pending",
  },
  renewal_pending_pix: {
    cardKey: "pix_renewal_pending",
    severity: "attention",
    statusChip: { en: "Pix renewal pending", pt: "Renovacao Pix pendente" },
    title: { en: "Complete Pix renewal", pt: "Conclua a renovacao Pix" },
    primaryActionKey: "complete_pix_renewal",
    allowedSurfaces: ["billing", "dashboard_read", "active paid surfaces until paid-through if still entitled"],
    blockedSurfaces: ["new paid period", "quota expansion", "extra connection"],
    gateLabel: "pix_pending",
  },
  provider_review_pending: {
    cardKey: "provider_review",
    severity: "attention",
    statusChip: { en: "Provider review", pt: "Revisao do provedor" },
    title: { en: "Provider review", pt: "Revisao do provedor" },
    primaryActionKey: "wait_for_review",
    allowedSurfaces: ["billing status", "support", "dashboard_read"],
    blockedSurfaces: ["QR", "token reveal", "media", "sends", "scheduling"],
    gateLabel: "provider_review",
  },
  paid_pending_onboarding: {
    cardKey: "activation_pending",
    severity: "setup",
    statusChip: { en: "Activation pending", pt: "Ativacao pendente" },
    title: { en: "Activation pending", pt: "Ativacao pendente" },
    primaryActionKey: "complete_activation",
    allowedSurfaces: ["workspace setup", "connection request", "billing receipt", "dashboard_read"],
    blockedSurfaces: ["token reveal", "media", "sends", "scheduling until connection/runtime gates pass"],
    gateLabel: "activation_pending",
  },
  active_limited: {
    cardKey: "connected_approval_first",
    severity: "active",
    statusChip: { en: "Connected + approval-first", pt: "Conectado + approval-first" },
    title: { en: "GatewayPort is active", pt: "GatewayPort esta ativo" },
    primaryActionKey: "use_gatewayport",
    allowedSurfaces: ["agent handoff", "bounded reads", "media within quota", "approvals", "scheduling", "audit", "billing", "dashboard_read"],
    blockedSurfaces: ["autonomous sends", "over-quota actions", "extra connections beyond plan"],
  },
  past_due: {
    cardKey: "payment_problem",
    severity: "blocked",
    statusChip: { en: "Payment problem", pt: "Problema de pagamento" },
    title: { en: "Update payment", pt: "Atualize o pagamento" },
    primaryActionKey: "update_payment",
    allowedSurfaces: ["billing", "support", "dashboard_read", "data export"],
    blockedSurfaces: ["token reveal", "media", "sends", "scheduling", "new WhatsApp actions"],
    gateLabel: "payment_required",
  },
  paused_reactivation_hold_30d: {
    cardKey: "paused_reactivation",
    severity: "blocked",
    statusChip: { en: "Paused", pt: "Pausado" },
    title: { en: "Workspace paused", pt: "Workspace pausado" },
    primaryActionKey: "reactivate_within_30d",
    allowedSurfaces: ["dashboard_read", "billing_reactivate", "data export", "support"],
    blockedSurfaces: ["token reveal", "media", "sends", "scheduling", "new WhatsApp actions"],
    gateLabel: "reactivation_hold",
  },
  cancel_at_period_end: {
    cardKey: "active_until_period_end",
    severity: "attention",
    statusChip: { en: "Active until period end", pt: "Ativo ate o fim do periodo" },
    title: { en: "Active until period end", pt: "Ativo ate o fim do periodo" },
    primaryActionKey: "manage_cancellation",
    allowedSurfaces: ["active plan surfaces until paid-through", "billing", "export", "dashboard_read"],
    blockedSurfaces: ["post-period entitlement extension", "quota expansion without plan change"],
    gateLabel: "cancel_at_period_end",
  },
  cancelled: {
    cardKey: "cancelled_closed",
    severity: "closed",
    statusChip: { en: "Cancelled", pt: "Cancelado" },
    title: { en: "Cancelled", pt: "Cancelado" },
    primaryActionKey: "view_retention_export_status",
    allowedSurfaces: ["dashboard_read", "data export if still within policy", "support"],
    blockedSurfaces: ["QR", "token reveal", "media", "sends", "scheduling", "reactivation without new checkout"],
    gateLabel: "closed",
  },
  suspended: {
    cardKey: "suspended_review",
    severity: "blocked",
    statusChip: { en: "Suspended", pt: "Suspenso" },
    title: { en: "Suspended", pt: "Suspenso" },
    primaryActionKey: "contact_review",
    allowedSurfaces: ["dashboard_read", "support", "data export if policy allows"],
    blockedSurfaces: ["QR", "token reveal", "media", "sends", "scheduling", "billing expansion"],
    gateLabel: "suspended",
  },
  refund_review_pending: {
    cardKey: "refund_under_review",
    severity: "attention",
    statusChip: { en: "Under review", pt: "Em revisao" },
    title: { en: "Refund under review", pt: "Reembolso em revisao" },
    primaryActionKey: "view_support_status",
    allowedSurfaces: ["support", "billing status", "dashboard_read", "data export if policy allows"],
    blockedSurfaces: ["token reveal", "new connection changes", "media", "sends", "scheduling"],
    gateLabel: "manual_review",
  },
  refunded_closed: {
    cardKey: "refunded_closed",
    severity: "closed",
    statusChip: { en: "Closed / refunded", pt: "Encerrado / reembolsado" },
    title: { en: "Closed / refunded", pt: "Encerrado / reembolsado" },
    primaryActionKey: "view_closure_status",
    allowedSurfaces: ["support", "dashboard_read", "data export if policy allows"],
    blockedSurfaces: ["QR", "token reveal", "media", "sends", "scheduling", "billing expansion"],
    gateLabel: "closed",
  },
  rejected_refund_required: {
    cardKey: "not_eligible_refund_required",
    severity: "blocked",
    statusChip: { en: "Not eligible", pt: "Nao elegivel" },
    title: { en: "Follow refund path", pt: "Siga o fluxo de reembolso" },
    primaryActionKey: "follow_refund_path",
    allowedSurfaces: ["support", "billing/refund status", "dashboard_read"],
    blockedSurfaces: ["QR", "token reveal", "media", "sends", "scheduling"],
    gateLabel: "manual_review",
  },
  dispute_review: {
    cardKey: "dispute_review",
    severity: "blocked",
    statusChip: { en: "Dispute review", pt: "Revisao de disputa" },
    title: { en: "Dispute review", pt: "Revisao de disputa" },
    primaryActionKey: "wait_for_review",
    allowedSurfaces: ["support", "billing status", "dashboard_read", "data export if policy allows"],
    blockedSurfaces: ["QR", "token reveal", "media", "sends", "scheduling", "plan changes"],
    gateLabel: "manual_review",
  },
};

function capabilityMap(entitlement: EntitlementSnapshot): Map<Capability, GatewayPortHydratedCapability> {
  return new Map(
    CAPABILITIES_TO_HYDRATE.map((capability) => {
      const decision = canUseCapability(entitlement, capability);
      return [
        capability,
        {
          capability,
          allowed: decision.allowed,
          reason: decision.reason,
        },
      ];
    })
  );
}

function capabilityAllowed(capabilities: Map<Capability, GatewayPortHydratedCapability>, capability: Capability): boolean {
  return capabilities.get(capability)?.allowed ?? false;
}

function gateReason(capabilities: Map<Capability, GatewayPortHydratedCapability>, capability: Capability): string {
  return capabilities.get(capability)?.reason ?? "capability_not_hydrated";
}

function buildHandoffGates(
  entitlement: EntitlementSnapshot,
  capabilities: Map<Capability, GatewayPortHydratedCapability>,
  routeReady: boolean,
  tokenRevealApproved: boolean,
  credentialEligible: boolean
): GatewayPortHandoffGate[] {
  const activeHandoff = ACTIVE_HANDOFF_STATES.has(entitlement.state);
  const apiKeyAllowed = capabilityAllowed(capabilities, "api_key_create");
  const auditActive = capabilityAllowed(capabilities, "payload_submit") || capabilityAllowed(capabilities, "scheduled_send_execute");
  const reactivationAllowed = capabilityAllowed(capabilities, "billing_reactivate");

  return [
    {
      card: "connection_status",
      visible: true,
      enabled: true,
      reason: "read_only_status",
    },
    {
      card: "quota_retention",
      visible: true,
      enabled: activeHandoff,
      reason: activeHandoff ? "quota_visible_for_entitled_state" : "quota_read_only_until_entitled",
    },
    {
      card: "agent_template_cards",
      visible: true,
      enabled: activeHandoff && capabilityAllowed(capabilities, "message_read"),
      reason: activeHandoff ? gateReason(capabilities, "message_read") : "templates_unlock_after_connection_online",
    },
    {
      card: "api_mcp_config",
      visible: activeHandoff,
      enabled: activeHandoff && apiKeyAllowed && routeReady && tokenRevealApproved && credentialEligible,
      reason:
        activeHandoff && apiKeyAllowed && routeReady && tokenRevealApproved && credentialEligible
          ? "credential_reveal_gates_passed"
          : "config_appears_after_connection_entitlement_route_and_token_gates",
    },
    {
      card: "approval_audit",
      visible: true,
      enabled: auditActive,
      reason: auditActive ? "approval_flow_available" : "audit_read_only_or_paused",
    },
    {
      card: "billing_reactivation",
      visible: true,
      enabled: reactivationAllowed,
      reason: reactivationAllowed ? gateReason(capabilities, "billing_reactivate") : "billing_reactivation_unavailable",
    },
    {
      card: "support_expectations",
      visible: true,
      enabled: true,
      reason: "support_copy_always_visible",
    },
  ];
}

export function buildGatewayPortDashboardReadModel(input: DashboardReadModelInput): GatewayPortDashboardReadModel {
  const dashboardState = dashboardStateFor(input.entitlement.state);
  const baseCard = CARD_BY_ENTITLEMENT[input.entitlement.state];
  const hydratedCapabilities = capabilityMap(input.entitlement);
  const capabilities = Array.from(hydratedCapabilities.values());
  const primaryActionEnabled =
    baseCard.primaryActionKey === "reactivate_within_30d"
      ? capabilityAllowed(hydratedCapabilities, "billing_reactivate")
      : baseCard.severity !== "closed" && baseCard.severity !== "blocked";

  return {
    ...baseCard,
    entitlementState: input.entitlement.state,
    dashboardState,
    primaryActionEnabled,
    providerReturnKind: input.providerReturnKind,
    providerReturnAuthoritative: false,
    capabilities,
    handoffGates: buildHandoffGates(
      input.entitlement,
      hydratedCapabilities,
      input.routeReady ?? false,
      input.tokenRevealApproved ?? false,
      input.credentialEligible ?? false
    ),
  };
}
