import type { Metadata } from "next";
import Link from "next/link";
import {
  TEST_CHECKOUT_PLANS,
  canOpenStripeTestCheckout,
  createTestCheckoutUiPreview,
  getStripePriceEnvStatus,
  getTestCheckoutPlan,
  isTestCheckoutUiEnabled,
  simulateVerifiedStripeEvent,
  type TestCheckoutPlanKey,
} from "@/lib/gatewayport/test-checkout-ui";
import { createGatewayPortAttributionSnapshot } from "@/lib/gatewayport/referral-attribution";

export const metadata: Metadata = {
  title: "GatewayPort local test checkout",
  robots: {
    index: false,
    follow: false,
  },
};

type TestCheckoutSearchParams = {
  plan?: string;
  simulate?: string;
  ref?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  visitor_id?: string;
};

type TestCheckoutPageProps = {
  searchParams?: Promise<TestCheckoutSearchParams>;
};

function money(amountMinor: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amountMinor / 100);
}

function checkoutHref(planKey: TestCheckoutPlanKey, params: TestCheckoutSearchParams, simulate?: "verified"): string {
  const query = new URLSearchParams({ plan: planKey });
  for (const key of ["ref", "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "visitor_id"] as const) {
    const value = params[key];
    if (value) query.set(key, value);
  }
  if (simulate) query.set("simulate", simulate);
  return `/gatewayport/checkout/test?${query.toString()}`;
}

export default async function GatewayPortTestCheckoutPage({ searchParams }: TestCheckoutPageProps) {
  const params = searchParams ? await searchParams : {};
  const selectedPlan = getTestCheckoutPlan(params.plan);
  const attribution = createGatewayPortAttributionSnapshot({
    params,
    entryRoute: "root_en",
    marketFunnel: "global",
    landingPath: "/gatewayport/checkout/test",
    now: new Date("2026-06-30T15:00:00.000Z"),
  });
  const preview = createTestCheckoutUiPreview(selectedPlan.key as TestCheckoutPlanKey, undefined, attribution);
  const envStatuses = getStripePriceEnvStatus();
  const enabled = isTestCheckoutUiEnabled();
  const canOpenProvider = canOpenStripeTestCheckout();
  const verifiedFixture = params.simulate === "verified" ? simulateVerifiedStripeEvent() : null;

  return (
    <main className="min-h-screen bg-[var(--ink)] text-[var(--cream)]">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-5 py-8 sm:px-8 lg:px-10">
        <header className="flex flex-col gap-6 border-b border-white/15 pb-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <Link className="text-sm font-semibold text-[var(--primary-lighter)] hover:text-[var(--cream)]" href="/gatewayport">
              GatewayPort
            </Link>
            <p className="mt-6 text-xs font-bold uppercase tracking-[0.24em] text-[var(--brass)]">
              Local test checkout
            </p>
            <h1 className="mt-3 text-4xl leading-tight text-[var(--cream)] sm:text-5xl">
              Prove the checkout state model before touching Stripe.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[color-mix(in_srgb,var(--cream)_78%,transparent)]">
              This route creates a sanitized local checkout attempt preview. It does not create a provider session,
              write product state, persist customer data, provision WhatsApp, reveal tokens, or activate GatewayPort.
            </p>
          </div>
          <div className="w-full max-w-sm rounded-lg border border-white/15 bg-white/[0.04] p-4">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--brass)]">Route gate</p>
            <p className="mt-3 text-2xl font-semibold text-[var(--cream)]">{enabled ? "test_preview enabled" : "disabled"}</p>
            <p className="mt-2 text-sm leading-6 text-[color-mix(in_srgb,var(--cream)_70%,transparent)]">
              Set <code className="rounded bg-black/35 px-1.5 py-0.5">GATEWAYPORT_CHECKOUT_UI_MODE=test_preview</code>{" "}
              for local QA visibility.
            </p>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-3" aria-label="GatewayPort test checkout plans">
          {TEST_CHECKOUT_PLANS.map((plan) => {
            const active = plan.key === selectedPlan.key;
            return (
              <Link
                key={plan.key}
                href={checkoutHref(plan.key, params)}
                className={`rounded-lg border p-5 transition ${
                  active
                    ? "border-[var(--brass)] bg-[color-mix(in_srgb,var(--brass)_14%,transparent)]"
                    : "border-white/15 bg-white/[0.04] hover:border-white/35"
                }`}
              >
                <p className="text-sm font-semibold text-[var(--primary-lighter)]">{plan.name}</p>
                <p className="mt-3 text-3xl font-semibold text-[var(--cream)]">{plan.billingLabel}</p>
                <p className="mt-3 text-sm leading-6 text-[color-mix(in_srgb,var(--cream)_72%,transparent)]">
                  Local preview only. Selecting this plan creates a provider-neutral attempt preview, not a checkout session.
                </p>
              </Link>
            );
          })}
        </section>

        <section className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-lg border border-white/15 bg-[color-mix(in_srgb,var(--primary)_36%,black)] p-5 sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--brass)]">Attempt preview</p>
                <h2 className="mt-3 text-2xl text-[var(--cream)]">{selectedPlan.name} enters payment pending.</h2>
              </div>
              <span className="w-fit rounded-full border border-[var(--brass)] px-3 py-1 text-sm font-semibold text-[var(--brass)]">
                {money(preview.amountMinor)} / month
              </span>
            </div>

            <dl className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                ["Attempt", preview.attemptId],
                ["Provider", preview.provider],
                ["Operation", preview.providerOperation],
                ["Attempt status", preview.attemptStatus],
                ["Next entitlement", preview.nextEntitlementState],
                ["Dashboard state", preview.nextDashboardState],
                ["Provider payload", preview.providerPayloadAllowed ? "allowed" : "not allowed"],
                ["Success return", preview.successReturnAuthoritative ? "authoritative" : "not authoritative"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-md border border-white/10 bg-black/20 p-3">
                  <dt className="text-xs uppercase tracking-[0.16em] text-[color-mix(in_srgb,var(--cream)_58%,transparent)]">
                    {label}
                  </dt>
                  <dd className="mt-2 break-words text-sm font-semibold text-[var(--cream)]">{value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                className="rounded-md bg-[var(--brass)] px-4 py-3 text-center text-sm font-bold text-[var(--ink)] hover:bg-[var(--cream)]"
                href="/gatewayport/checkout/test/success"
              >
                View success return
              </Link>
              <Link
                className="rounded-md border border-white/20 px-4 py-3 text-center text-sm font-bold text-[var(--cream)] hover:border-[var(--cream)]"
                href="/gatewayport/checkout/test/cancel"
              >
                View cancel return
              </Link>
              <Link
                className="rounded-md border border-[var(--primary-lighter)] px-4 py-3 text-center text-sm font-bold text-[var(--primary-lighter)] hover:bg-[var(--primary-lighter)] hover:text-[var(--ink)]"
                href={checkoutHref(selectedPlan.key as TestCheckoutPlanKey, params, "verified")}
              >
                Simulate verified event
              </Link>
            </div>
          </div>

          <aside className="rounded-lg border border-white/15 bg-white/[0.04] p-5 sm:p-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--brass)]">Redacted provider readiness</p>
            <h2 className="mt-3 text-2xl text-[var(--cream)]">
              Stripe test opening is {canOpenProvider ? "locally allowed" : "locked"}.
            </h2>
            <p className="mt-3 text-sm leading-6 text-[color-mix(in_srgb,var(--cream)_72%,transparent)]">
              This route only checks env shape and never prints keys, price IDs, session IDs, account IDs, webhook secrets,
              customer IDs, or raw provider payloads.
            </p>
            <div className="mt-5 grid gap-3">
              {envStatuses.map((item) => (
                <div key={item.key} className="flex items-center justify-between gap-4 rounded-md border border-white/10 p-3">
                  <span className="text-sm font-semibold text-[var(--cream)]">{item.planKey}</span>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] ${
                      item.status === "present"
                        ? "bg-[color-mix(in_srgb,var(--primary-lighter)_22%,transparent)] text-[var(--primary-lighter)]"
                        : "bg-[color-mix(in_srgb,var(--brass)_16%,transparent)] text-[var(--brass)]"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </aside>
        </section>

        <section className="rounded-lg border border-white/15 bg-white/[0.04] p-5 sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--brass)]">Referral handoff</p>
              <h2 className="mt-3 text-2xl text-[var(--cream)]">Attribution is snapshotted before provider handoff.</h2>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-[color-mix(in_srgb,var(--cream)_72%,transparent)]">
                URL parameters are captured into a GatewayPort-owned attribution snapshot. Stripe would receive only
                compact reconciliation ids; partner payout decisions stay outside provider metadata.
              </p>
            </div>
            <span className="w-fit rounded-full border border-white/20 px-3 py-1 text-sm font-semibold text-[var(--cream)]">
              {preview.attribution.commissionCandidate ? "ref present" : "direct visit"}
            </span>
          </div>
          <dl className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Ref code", preview.attribution.refCode ?? "none"],
              ["Touch", preview.attribution.attributionTouchId],
              ["Referral", preview.attribution.referralAttributionId ?? "none"],
              ["Partner resolved", preview.attribution.partnerResolved ? "yes" : "no"],
              ["UTM source", preview.attribution.utmSource ?? "none"],
              ["UTM medium", preview.attribution.utmMedium ?? "none"],
              ["UTM campaign", preview.attribution.utmCampaign ?? "none"],
              ["Provider metadata", preview.providerReconciliationMetadata.referralAttributionId ?? "none"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-md border border-white/10 bg-black/20 p-3">
                <dt className="text-xs uppercase tracking-[0.16em] text-[color-mix(in_srgb,var(--cream)_58%,transparent)]">
                  {label}
                </dt>
                <dd className="mt-2 break-words text-sm font-semibold text-[var(--cream)]">{value}</dd>
              </div>
            ))}
          </dl>
        </section>

        {verifiedFixture ? (
          <section className="rounded-lg border border-[var(--brass)] bg-[color-mix(in_srgb,var(--brass)_12%,transparent)] p-5 sm:p-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--brass)]">Fixture-only provider event</p>
            <h2 className="mt-3 text-2xl text-[var(--cream)]">Payment confirmation moves to setup, not active WhatsApp.</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-[color-mix(in_srgb,var(--cream)_58%,transparent)]">Event</p>
                <p className="mt-2 break-words text-sm font-semibold text-[var(--cream)]">{verifiedFixture.providerEventId}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-[color-mix(in_srgb,var(--cream)_58%,transparent)]">Entitlement</p>
                <p className="mt-2 text-sm font-semibold text-[var(--cream)]">{verifiedFixture.nextEntitlementState}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-[color-mix(in_srgb,var(--cream)_58%,transparent)]">Dashboard</p>
                <p className="mt-2 text-sm font-semibold text-[var(--cream)]">{verifiedFixture.nextDashboardState}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-[color-mix(in_srgb,var(--cream)_58%,transparent)]">WhatsApp access</p>
                <p className="mt-2 text-sm font-semibold text-[var(--cream)]">
                  {verifiedFixture.grantsActiveWhatsApp ? "granted" : "not granted"}
                </p>
              </div>
            </div>
          </section>
        ) : null}
      </section>
    </main>
  );
}
