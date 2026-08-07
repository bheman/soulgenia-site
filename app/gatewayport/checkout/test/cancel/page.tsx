import type { Metadata } from "next";
import Link from "next/link";
import { resolveTestCheckoutProviderReturn } from "@/lib/gatewayport/test-checkout-ui";

export const metadata: Metadata = {
  title: "GatewayPort checkout cancelled",
  robots: {
    index: false,
    follow: false,
  },
};

export default function GatewayPortTestCheckoutCancelPage() {
  const resolution = resolveTestCheckoutProviderReturn("cancel");

  return (
    <main className="min-h-screen bg-[var(--ink)] px-5 py-8 text-[var(--cream)] sm:px-8">
      <section className="mx-auto flex max-w-3xl flex-col gap-6 rounded-lg border border-white/15 bg-white/[0.04] p-6 sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--brass)]">Browser cancel return</p>
        <h1 className="text-4xl leading-tight text-[var(--cream)]">No checkout entitlement was granted.</h1>
        <p className="text-base leading-7 text-[color-mix(in_srgb,var(--cream)_76%,transparent)]">
          This cancellation route closes the local attempt preview only. GatewayPort keeps WhatsApp provisioning, token
          reveal, API access, media tools, sends, and scheduled actions unavailable.
        </p>
        <dl className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-md border border-white/10 bg-black/20 p-3">
            <dt className="text-xs uppercase tracking-[0.16em] text-[color-mix(in_srgb,var(--cream)_58%,transparent)]">
              Attempt status
            </dt>
            <dd className="mt-2 font-semibold">{resolution.nextAttemptStatus}</dd>
          </div>
          <div className="rounded-md border border-white/10 bg-black/20 p-3">
            <dt className="text-xs uppercase tracking-[0.16em] text-[color-mix(in_srgb,var(--cream)_58%,transparent)]">
              Displayed entitlement
            </dt>
            <dd className="mt-2 font-semibold">{resolution.displayedEntitlementState}</dd>
          </div>
          <div className="rounded-md border border-white/10 bg-black/20 p-3">
            <dt className="text-xs uppercase tracking-[0.16em] text-[color-mix(in_srgb,var(--cream)_58%,transparent)]">
              Dashboard state
            </dt>
            <dd className="mt-2 font-semibold">{resolution.displayedDashboardState}</dd>
          </div>
          <div className="rounded-md border border-white/10 bg-black/20 p-3">
            <dt className="text-xs uppercase tracking-[0.16em] text-[color-mix(in_srgb,var(--cream)_58%,transparent)]">
              Reason
            </dt>
            <dd className="mt-2 font-semibold">{resolution.reason}</dd>
          </div>
        </dl>
        <Link
          className="w-fit rounded-md bg-[var(--brass)] px-4 py-3 text-sm font-bold text-[var(--ink)] hover:bg-[var(--cream)]"
          href="/gatewayport/checkout/test"
        >
          Back to test checkout
        </Link>
      </section>
    </main>
  );
}
