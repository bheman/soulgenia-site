// components/hero/HeroBase.tsx
// Shared layout shell for all Hero variants.
// Recebe chip, headline, subheadline, CTAs e visualSlot — sem JS no bundle.

import type { ReactNode } from "react";

export interface CtaProps {
  label: string;
  href: string;
  microcopy?: string;
}

export interface HeroBaseProps {
  chip: string;
  /** Permite quebra de linha customizada com spans ou <br /> */
  headline: ReactNode;
  subheadline: string;
  ctaPrimary: CtaProps;
  ctaSecondary?: CtaProps;
  /** Ilustração / visual placeholder específico da variante */
  visualSlot: ReactNode;
}

export default function HeroBase({
  chip,
  headline,
  subheadline,
  ctaPrimary,
  ctaSecondary,
  visualSlot,
}: HeroBaseProps) {
  return (
    <section
      aria-label="Hero"
      className="bg-zinc-50 py-16 lg:py-24"
    >
      {/* Container 1280px centrado com padding lateral responsivo */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">

          {/* ── Coluna de texto (60% desktop) ─────────────────────────── */}
          <div className="flex min-w-0 flex-1 flex-col gap-6 lg:basis-[60%]">

            {/* Chip / badge */}
            <div className="hero-animate-chip">
              <span
                className="inline-flex items-center rounded-full bg-zinc-100 px-3 py-1 text-sm font-medium text-zinc-700"
                aria-label={`Contexto: ${chip}`}
              >
                {chip}
              </span>
            </div>

            {/* Headline principal */}
            <div className="hero-animate-headline">
              <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl">
                {headline}
              </h1>
            </div>

            {/* Subheadline */}
            <div className="hero-animate-sub">
              <p className="max-w-prose text-lg leading-relaxed text-zinc-600 lg:text-xl">
                {subheadline}
              </p>
            </div>

            {/* CTAs */}
            <div className="hero-animate-cta flex flex-col gap-4 sm:flex-row sm:items-start">
              <div className="flex flex-col gap-2">
                <a
                  href={ctaPrimary.href}
                  className="inline-flex items-center justify-center rounded-lg bg-zinc-900 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-slate-600"
                  aria-label={ctaPrimary.label}
                >
                  {ctaPrimary.label}
                </a>
                {ctaPrimary.microcopy && (
                  <p className="text-sm text-zinc-500">{ctaPrimary.microcopy}</p>
                )}
              </div>

              {ctaSecondary && (
                <div className="flex flex-col gap-2">
                  <a
                    href={ctaSecondary.href}
                    className="inline-flex items-center justify-center rounded-lg border border-zinc-300 bg-transparent px-6 py-3 text-base font-medium text-zinc-800 transition-colors hover:border-zinc-400 hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-slate-600"
                    aria-label={ctaSecondary.label}
                  >
                    {ctaSecondary.label}
                  </a>
                  {ctaSecondary.microcopy && (
                    <p className="text-sm text-zinc-500">{ctaSecondary.microcopy}</p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* ── Coluna visual (40% desktop) ───────────────────────────── */}
          <div
            className="hero-animate-visual flex w-full justify-center lg:basis-[40%]"
            aria-hidden="true"
          >
            {visualSlot}
          </div>

        </div>
      </div>
    </section>
  );
}
