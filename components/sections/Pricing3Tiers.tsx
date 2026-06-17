import Link from "next/link";
import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";

interface PricingTier {
  id: "essencial" | "pro" | "premium";
  name: string;
  monthly: number;
  setup: number;
  popular?: boolean;
  features: string[];
  extras?: string[];
}

const tiers: PricingTier[] = [
  {
    id: "essencial",
    name: "Essencial",
    monthly: 297,
    setup: 497,
    features: [
      "Triagem de clientes novos",
      "Agendamento automático com Google Calendar",
      "Lembretes D-1 e D-0",
      "Follow-up 24h pós-consulta",
      "Relatório semanal por WhatsApp",
      "Suporte por email",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    monthly: 497,
    setup: 697,
    popular: true,
    features: [
      "Tudo do Essencial, mais:",
      "Briefing pré-consulta 1h antes",
      "Reativação de cliente sumido",
      "Cobrança recorrente e aviso de inadimplência",
      "Detecção de cliente em risco de churn",
      "Suporte prioritário por WhatsApp",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    monthly: 897,
    setup: 997,
    features: [
      "Tudo do Pro, mais:",
      "{PRODUTO} com clonagem da sua voz",
      "Personalização avançada de fluxo",
      "Onboarding dedicado com especialista (1h ao vivo)",
      "SLA de suporte em 4 horas",
    ],
  },
];

function CheckIcon() {
  return (
    <svg
      className="h-4 w-4 shrink-0 text-slate-600"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function Pricing3Tiers() {
  return (
    <Section bg="zinc" id="pricing">
      <div className="mb-12 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-slate-600">
          Transparente desde o início
        </p>
        <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
          Planos e preços
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-zinc-600">
          Plano anual: 2 meses grátis em qualquer tier. Sem fidelidade no mensal.
          Cancela quando quiser, dados exportáveis.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {tiers.map((tier) => (
          <Card
            key={tier.id}
            highlighted={tier.popular}
            className="flex flex-col"
          >
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-zinc-900">{tier.name}</h3>
                {tier.popular && (
                  <span className="rounded-full bg-slate-700 px-3 py-1 text-xs font-semibold text-white">
                    Mais escolhido
                  </span>
                )}
              </div>
              <div className="mt-4">
                <span className="text-4xl font-extrabold text-zinc-900">
                  R${tier.monthly.toLocaleString("pt-BR")}
                </span>
                <span className="text-zinc-500">/mês</span>
              </div>
              <p className="mt-1 text-sm text-zinc-500">
                + Setup único de R${tier.setup.toLocaleString("pt-BR")}
              </p>
            </div>

            {/* Features */}
            <ul className="mb-8 flex-1 space-y-3" role="list">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm text-zinc-700">
                  {feature.endsWith(":") ? (
                    <span className="font-semibold text-zinc-900">{feature}</span>
                  ) : (
                    <>
                      <CheckIcon />
                      <span>{feature}</span>
                    </>
                  )}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <Link
              href={`/trial?plan=${tier.id}`}
              className={[
                "block w-full rounded-xl py-3 text-center text-sm font-semibold transition-colors",
                "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-slate-600",
                tier.popular
                  ? "bg-slate-800 text-white hover:bg-slate-700"
                  : "border border-slate-800 text-slate-800 hover:bg-zinc-50",
              ].join(" ")}
            >
              Começar teste grátis de 7 dias
            </Link>
          </Card>
        ))}
      </div>

      {/* Annual callout */}
      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 text-center">
        <p className="text-sm text-zinc-600">
          <span className="font-semibold text-zinc-900">Plano anual disponível:</span>{" "}
          pague 10 meses e use 12 — 2 meses grátis em qualquer tier.
        </p>
      </div>
    </Section>
  );
}
