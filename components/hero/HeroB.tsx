// components/hero/HeroB.tsx
// Variante "Escala" — aspiração, status, calmaria.
// Headline promete um estado; CTA convida pra ver antes de comprometer.

import HeroBase from "@/components/hero/HeroBase";

// ── Visual: Agenda lotada com sucesso ─────────────────────────────────────
// Grid de calendário com células preenchidas e ícone de confirmação.
// Sensação de produtividade máxima sem esforço manual.
function VisualCalendar() {
  // Simula um mês com 28 slots de horários — maioria ocupado
  const slots: Array<{ label: string; status: "occupied" | "free" | "break" }> = [
    { label: "08:00", status: "occupied" },
    { label: "09:00", status: "occupied" },
    { label: "10:00", status: "occupied" },
    { label: "11:00", status: "break" },
    { label: "13:00", status: "occupied" },
    { label: "14:00", status: "occupied" },
    { label: "15:00", status: "occupied" },
    { label: "16:00", status: "free" },
    { label: "17:00", status: "occupied" },
    { label: "18:00", status: "occupied" },
    { label: "08:00", status: "occupied" },
    { label: "09:00", status: "occupied" },
    { label: "10:00", status: "free" },
    { label: "11:00", status: "occupied" },
    { label: "13:00", status: "occupied" },
    { label: "14:00", status: "occupied" },
    { label: "15:00", status: "occupied" },
    { label: "16:00", status: "occupied" },
    { label: "17:00", status: "break" },
    { label: "18:00", status: "occupied" },
    { label: "08:00", status: "occupied" },
    { label: "09:00", status: "occupied" },
    { label: "10:00", status: "occupied" },
    { label: "11:00", status: "occupied" },
  ];

  const days = ["Seg", "Ter", "Qua", "Qui", "Sex"];
  const hours = ["08h", "09h", "10h", "11h", "13h", "14h", "15h", "16h", "17h", "18h"];

  // Matriz 5 dias × 10 horários com status simulado
  // Mais de 80% ocupado para transmitir agenda cheia
  const matrix: Array<Array<"occupied" | "free" | "break">> = [
    ["occupied","occupied","occupied","break","occupied","occupied","occupied","free","occupied","occupied"],
    ["occupied","occupied","free","occupied","occupied","occupied","occupied","occupied","break","occupied"],
    ["occupied","occupied","occupied","occupied","break","occupied","occupied","occupied","occupied","free"],
    ["free","occupied","occupied","occupied","occupied","occupied","break","occupied","occupied","occupied"],
    ["occupied","occupied","occupied","break","occupied","free","occupied","occupied","occupied","occupied"],
  ];

  return (
    <div className="w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-4 shadow-md sm:max-w-md">

      {/* Header do card */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-zinc-900">Junho 2025</p>
          <p className="text-xs text-zinc-400">Agenda preenchida por {"{"+"PRODUTO"+"}"}</p>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100">
          {/* Ícone de calendar */}
          <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5" aria-hidden="true">
            <rect x="2" y="3" width="16" height="15" rx="2" stroke="#16a34a" strokeWidth="1.5" />
            <path d="M2 7h16" stroke="#16a34a" strokeWidth="1.5" />
            <path d="M6 2v2M14 2v2" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M5.5 10.5h2v2h-2zM9.5 10.5h2v2h-2zM13.5 10.5h2v2h-2z" fill="#16a34a" />
          </svg>
        </div>
      </div>

      {/* Grid de agenda */}
      <div className="overflow-hidden rounded-lg border border-zinc-100">

        {/* Cabeçalho dias */}
        <div className="grid grid-cols-6 border-b border-zinc-100 bg-zinc-50">
          <div className="py-1.5 text-center text-[10px] font-semibold text-zinc-400">Hora</div>
          {days.map((d) => (
            <div key={d} className="py-1.5 text-center text-[10px] font-semibold text-zinc-600">
              {d}
            </div>
          ))}
        </div>

        {/* Linhas de horário */}
        {hours.map((hour, hi) => (
          <div key={hour} className="grid grid-cols-6 border-b border-zinc-50 last:border-0">
            <div className="flex items-center justify-center py-1 text-[9px] text-zinc-400">
              {hour}
            </div>
            {matrix.map((dayCol, di) => {
              const status = dayCol[hi];
              return (
                <div
                  key={di}
                  className={[
                    "mx-0.5 my-0.5 flex items-center justify-center rounded py-1.5 text-[9px] font-medium",
                    status === "occupied"
                      ? "bg-slate-700 text-white"
                      : status === "break"
                      ? "bg-zinc-100 text-zinc-400"
                      : "border border-dashed border-zinc-200 text-zinc-300",
                  ].join(" ")}
                >
                  {status === "occupied" && (
                    <svg viewBox="0 0 8 8" fill="none" className="h-2 w-2" aria-hidden="true">
                      <path d="M1.5 4L3 5.5L6.5 2.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                  {status === "break" && <span className="text-[8px]">–</span>}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Rodapé com métricas */}
      <div className="mt-3 flex items-center justify-between rounded-lg bg-green-50 px-3 py-2">
        <div className="text-center">
          <p className="text-base font-bold text-green-700">38</p>
          <p className="text-[10px] text-green-600">consultas</p>
        </div>
        <div className="h-8 w-px bg-green-200" />
        <div className="text-center">
          <p className="text-base font-bold text-green-700">0</p>
          <p className="text-[10px] text-green-600">mensagens respondidas por você</p>
        </div>
        <div className="h-8 w-px bg-green-200" />
        <div className="text-center">
          <p className="text-base font-bold text-green-700">12h</p>
          <p className="text-[10px] text-green-600">economizadas</p>
        </div>
      </div>
    </div>
  );
}

// ── Componente principal ───────────────────────────────────────────────────
export default function HeroB() {
  return (
    <HeroBase
      chip="+R$2.000/mês recuperados em horas de trabalho"
      headline={
        <>
          Sua agenda lotada.{" "}
          <span className="block text-slate-700">
            Sem você ter que responder nada.
          </span>
        </>
      }
      subheadline="Médicos, advogados, psicólogos e coaches estão usando {PRODUTO} para escalar atendimento sem contratar secretária. Sua IA atende WhatsApp, agenda no Google Calendar e cobra automaticamente."
      ctaPrimary={{
        label: "Ver demo de 90 segundos",
        href: "/demo",
      }}
      ctaSecondary={{
        label: "Começar trial grátis",
        href: "/trial",
        microcopy: "Sem cartão. Sem compromisso. 7 dias completos para testar.",
      }}
      visualSlot={<VisualCalendar />}
    />
  );
}
