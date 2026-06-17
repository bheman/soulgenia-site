import Section from "@/components/ui/Section";
import Link from "next/link";

interface ComparisonItem {
  label: string;
  monthly: string;
  detail: string;
  variant: "bad" | "neutral" | "good";
}

const items: ComparisonItem[] = [
  {
    label: "Secretária CLT contratada",
    monthly: "R$3.800–6.500/mês",
    detail:
      "Salário R$2.500-4.500 + 13º + férias + FGTS + INSS patronal. Sem contar treinamento, substituição em férias, rotatividade.",
    variant: "bad",
  },
  {
    label: "Você mesmo respondendo",
    monthly: "≈R$20.000/mês perdido",
    detail:
      "Se cobra R$300/hora e gasta 3 horas/dia, são R$900/dia que poderia ter faturado. 22 dias úteis = quase R$20.000/mês de hora profissional gasta em tarefa administrativa.",
    variant: "neutral",
  },
  {
    label: "{PRODUTO} Pro",
    monthly: "R$497/mês",
    detail:
      "Setup único R$697. No segundo mês, você está no positivo comparado a qualquer alternativa.",
    variant: "good",
  },
];

const variantStyles = {
  bad: {
    border: "border-red-200",
    badge: "bg-red-50 text-red-700",
    label: "bg-red-50",
  },
  neutral: {
    border: "border-yellow-200",
    badge: "bg-yellow-50 text-yellow-800",
    label: "bg-yellow-50",
  },
  good: {
    border: "border-green-300 ring-2 ring-green-200",
    badge: "bg-green-700 text-white",
    label: "bg-green-50",
  },
};

export default function CalculadoraMental() {
  return (
    <Section bg="white" id="calculadora">
      <div className="mb-12 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-slate-600">
          A conta que importa
        </p>
        <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
          Calculadora mental
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-zinc-600">
          Você tem três opções. Só uma delas escala sem custo fixo crescente.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {items.map((item) => {
          const styles = variantStyles[item.variant];
          return (
            <div
              key={item.label}
              className={`rounded-2xl border ${styles.border} bg-white p-6`}
            >
              <div className={`mb-4 rounded-lg ${styles.label} p-3`}>
                <p className="text-sm font-medium text-zinc-700">{item.label}</p>
              </div>
              <p
                className={`mb-3 inline-block rounded-full px-3 py-1 text-sm font-bold ${styles.badge}`}
              >
                {item.monthly}
              </p>
              <p className="text-sm leading-relaxed text-zinc-600">
                {item.detail}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center">
        <p className="mx-auto max-w-xl text-lg font-medium text-zinc-800">
          O que você faz com as 3 horas que vai ganhar de volta? Essa é a conta que importa.
        </p>
        <div className="mt-6">
          <Link
            href="/trial"
            className="inline-flex items-center justify-center rounded-xl bg-slate-800 px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-slate-700 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-slate-600"
            aria-label="Começar teste gratuito"
          >
            Começar meu teste gratuito de 7 dias
          </Link>
          <p className="mt-3 text-sm text-zinc-500">
            Sem cartão de crédito. Cancela quando quiser.
          </p>
        </div>
      </div>
    </Section>
  );
}
