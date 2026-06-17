// components/hero/HeroC.tsx
// Variante "Conta" — contraste econômico, ROI-driven.
// Headline é uma equação; CTA é uma decisão financeira.

import HeroBase from "@/components/hero/HeroBase";

// ── Visual: Tabela comparativa minimalista ────────────────────────────────
// 3 colunas: Secretária CLT / Você mesmo / {PRODUTO}
// Coluna {PRODUTO} destacada em verde — a resposta óbvia.
function VisualComparisonTable() {
  type CheckStatus = "yes" | "no" | "partial";

  interface Row {
    feature: string;
    clt: CheckStatus;
    voce: CheckStatus;
    produto: CheckStatus;
  }

  const rows: Row[] = [
    { feature: "Triagem de mensagens", clt: "yes", voce: "partial", produto: "yes" },
    { feature: "Agendamento automático", clt: "yes", voce: "no", produto: "yes" },
    { feature: "Cobrança e follow-up", clt: "yes", voce: "no", produto: "yes" },
    { feature: "Disponível 24h/dia", clt: "no", voce: "no", produto: "yes" },
    { feature: "Aprende seu jeito de atender", clt: "partial", voce: "yes", produto: "yes" },
    { feature: "Sem encargos trabalhistas", clt: "no", voce: "yes", produto: "yes" },
    { feature: "Setup em 30 minutos", clt: "no", voce: "yes", produto: "yes" },
  ];

  const columns = [
    { key: "clt" as const, label: "Secretária CLT", cost: "R$3.500/mês", highlight: false },
    { key: "voce" as const, label: "Você responde", cost: "3h/dia = R$6.000*", highlight: false },
    { key: "produto" as const, label: "{PRODUTO}", cost: "R$497/mês", highlight: true },
  ];

  function CheckIcon({ status }: { status: CheckStatus }) {
    if (status === "yes") {
      return (
        <svg viewBox="0 0 16 16" fill="none" className="mx-auto h-4 w-4" aria-label="Sim">
          <circle cx="8" cy="8" r="7" fill="#16a34a" />
          <path d="M5 8l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    }
    if (status === "no") {
      return (
        <svg viewBox="0 0 16 16" fill="none" className="mx-auto h-4 w-4" aria-label="Não">
          <circle cx="8" cy="8" r="7" fill="#e4e4e7" />
          <path d="M5.5 10.5l5-5M10.5 10.5l-5-5" stroke="#a1a1aa" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    }
    // partial
    return (
      <svg viewBox="0 0 16 16" fill="none" className="mx-auto h-4 w-4" aria-label="Parcial">
        <circle cx="8" cy="8" r="7" fill="#fef08a" />
        <path d="M5 8h6" stroke="#854d0e" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <div className="w-full max-w-sm rounded-2xl border border-zinc-200 bg-white shadow-md sm:max-w-lg">

      {/* Cabeçalho da tabela */}
      <div className="grid grid-cols-4 overflow-hidden rounded-t-2xl">
        {/* Coluna de features */}
        <div className="bg-zinc-50 px-3 py-3">
          <p className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wide">Função</p>
        </div>

        {/* 3 colunas de opções */}
        {columns.map((col) => (
          <div
            key={col.key}
            className={[
              "px-2 py-3 text-center",
              col.highlight
                ? "bg-green-700 text-white"
                : "bg-zinc-100 text-zinc-700",
            ].join(" ")}
          >
            <p
              className={[
                "text-[11px] font-bold leading-tight",
                col.highlight ? "text-white" : "text-zinc-800",
              ].join(" ")}
            >
              {col.label}
            </p>
          </div>
        ))}
      </div>

      {/* Linhas de feature */}
      {rows.map((row, i) => (
        <div
          key={row.feature}
          className={[
            "grid grid-cols-4 border-t border-zinc-100",
            i % 2 === 0 ? "bg-white" : "bg-zinc-50/50",
          ].join(" ")}
        >
          <div className="px-3 py-2">
            <p className="text-[11px] text-zinc-700 leading-tight">{row.feature}</p>
          </div>
          {columns.map((col) => (
            <div
              key={col.key}
              className={[
                "flex items-center justify-center py-2",
                col.highlight ? "bg-green-50" : "",
              ].join(" ")}
            >
              <CheckIcon status={row[col.key]} />
            </div>
          ))}
        </div>
      ))}

      {/* Rodapé com custo */}
      <div className="grid grid-cols-4 overflow-hidden rounded-b-2xl border-t-2 border-zinc-200">
        <div className="bg-zinc-100 px-3 py-3">
          <p className="text-[10px] font-semibold uppercase text-zinc-500">Custo</p>
        </div>
        {columns.map((col) => (
          <div
            key={col.key}
            className={[
              "px-2 py-3 text-center",
              col.highlight ? "bg-green-700" : "bg-zinc-100",
            ].join(" ")}
          >
            <p
              className={[
                "text-[11px] font-bold",
                col.highlight ? "text-white" : "text-zinc-800",
              ].join(" ")}
            >
              {col.cost}
            </p>
          </div>
        ))}
      </div>

      {/* Nota de rodapé */}
      <div className="rounded-b-2xl border-t border-zinc-100 bg-zinc-50 px-3 py-2">
        <p className="text-[10px] text-zinc-400">
          * Estimativa: 3h/dia × R$100/h × 20 dias úteis. Tempo que você poderia usar atendendo.
        </p>
      </div>
    </div>
  );
}

// ── Componente principal ───────────────────────────────────────────────────
export default function HeroC() {
  return (
    <HeroBase
      chip="Calculadora real: R$36.000/ano de economia"
      headline={
        <>
          Secretária boa custa{" "}
          <span className="text-zinc-500 line-through decoration-2">R$3.500</span>{" "}
          por mês.{" "}
          <span className="block text-slate-700">{"{"+"PRODUTO"+"}"} custa R$497.</span>
        </>
      }
      subheadline="Mesma função: triagem, agendamento, follow-up, cobrança. Sem encargos, sem 13º, sem rotatividade. Setup em 30 minutos no seu próprio WhatsApp Business."
      ctaPrimary={{
        label: "Quero economizar R$3.000/mês",
        href: "/trial",
        microcopy: "Trial gratuito de 7 dias. Sem cartão de crédito.",
      }}
      visualSlot={<VisualComparisonTable />}
    />
  );
}
