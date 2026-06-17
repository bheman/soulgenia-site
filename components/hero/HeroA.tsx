// components/hero/HeroA.tsx
// Variante "Exausto" — dor direta, tensão + alívio.
// Headline grita a dor; CTA promete o fim dela.

import HeroBase from "@/components/hero/HeroBase";

// ── Visual: Antes/Depois — caos vs ordem ───────────────────────────────────
// Dois painéis lado a lado simulando telas de celular.
// Esquerda: WhatsApp lotado (23h47, N mensagens não lidas, estresse visual).
// Direita: profissional em consulta + {PRODUTO} respondendo no lugar dele.
function VisualBeforeAfter() {
  return (
    <div className="flex w-full max-w-sm gap-3 sm:max-w-md">

      {/* ── Painel ANTES: WhatsApp caótico ───────────────────────────── */}
      <div className="relative flex-1 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-md">
        {/* Barra de status do celular */}
        <div className="flex items-center justify-between bg-zinc-900 px-3 py-1.5">
          <span className="text-[10px] font-medium text-zinc-300">23:47</span>
          <span className="text-[10px] text-zinc-400">●●●</span>
        </div>

        {/* Header WhatsApp */}
        <div className="flex items-center gap-2 bg-slate-700 px-3 py-2">
          <div className="h-6 w-6 rounded-full bg-zinc-400" />
          <span className="text-xs font-semibold text-white">WhatsApp</span>
        </div>

        {/* Lista de conversas com badges de não lidos */}
        <div className="divide-y divide-zinc-100 bg-white">
          {[
            { name: "Ana Lima", msg: "Tem horário amanhã?", count: 4, time: "23:45" },
            { name: "Carlos M.", msg: "Qual o valor da sessão?", count: 7, time: "23:31" },
            { name: "Fernanda", msg: "Posso remarcar pra sexta?", count: 2, time: "22:58" },
            { name: "Grupo Pacientes", msg: "Alguém sabe o endereço?", count: 12, time: "22:40" },
            { name: "Roberto S.", msg: "Ainda aceita convênio?", count: 3, time: "21:55" },
          ].map((chat) => (
            <div key={chat.name} className="flex items-center gap-2 px-3 py-2">
              <div className="h-7 w-7 shrink-0 rounded-full bg-zinc-200" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[11px] font-semibold text-zinc-800">{chat.name}</p>
                <p className="truncate text-[10px] text-zinc-400">{chat.msg}</p>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-1">
                <span className="text-[9px] text-zinc-400">{chat.time}</span>
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-green-500 text-[9px] font-bold text-white">
                  {chat.count}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Label ANTES */}
        <div className="absolute bottom-2 left-0 right-0 flex justify-center">
          <span className="rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-semibold text-red-600">
            Antes
          </span>
        </div>
      </div>

      {/* ── Painel DEPOIS: {PRODUTO} respondendo ─────────────────────── */}
      <div className="relative flex-1 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-md">
        {/* Barra de status */}
        <div className="flex items-center justify-between bg-zinc-900 px-3 py-1.5">
          <span className="text-[10px] font-medium text-zinc-300">09:12</span>
          <span className="text-[10px] text-zinc-400">●●●</span>
        </div>

        {/* Header conversa com IA */}
        <div className="flex items-center gap-2 bg-slate-700 px-3 py-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white">
            <span className="text-[10px] font-bold text-slate-700">{"{P}"}</span>
          </div>
          <div>
            <span className="block text-[11px] font-semibold text-white">{"{"+"PRODUTO"+"}"}</span>
            <span className="text-[9px] text-green-300">online agora</span>
          </div>
        </div>

        {/* Conversa simulada */}
        <div className="flex flex-col gap-1.5 bg-zinc-50 px-2 py-2">
          {/* Mensagem do paciente */}
          <div className="self-start rounded-lg rounded-tl-sm bg-white px-2 py-1.5 shadow-sm">
            <p className="text-[10px] text-zinc-700">Tem horário amanhã?</p>
            <p className="mt-0.5 text-right text-[8px] text-zinc-400">09:10</p>
          </div>

          {/* Resposta da IA */}
          <div className="self-end rounded-lg rounded-tr-sm bg-slate-700 px-2 py-1.5">
            <p className="text-[10px] text-white">
              Olá Ana! Tenho horário amanhã às 14h e às 17h. Qual prefere?
            </p>
            <p className="mt-0.5 text-right text-[8px] text-green-300">09:11 ✓✓</p>
          </div>

          {/* Paciente confirma */}
          <div className="self-start rounded-lg rounded-tl-sm bg-white px-2 py-1.5 shadow-sm">
            <p className="text-[10px] text-zinc-700">14h perfeito!</p>
          </div>

          {/* IA agenda */}
          <div className="self-end rounded-lg rounded-tr-sm bg-slate-700 px-2 py-1.5">
            <p className="text-[10px] text-white">
              Confirmado! Agendei amanhã às 14h. Até lá! 📅
            </p>
          </div>
        </div>

        {/* Indicador "{PRODUTO} respondeu" */}
        <div className="border-t border-zinc-100 bg-white px-3 py-1.5">
          <p className="text-center text-[9px] text-zinc-400">
            <span className="font-semibold text-slate-600">{"{"+"PRODUTO"+"}"}</span> respondeu enquanto você atendia
          </p>
        </div>

        {/* Label DEPOIS */}
        <div className="absolute bottom-2 left-0 right-0 flex justify-center">
          <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-semibold text-green-700">
            Depois
          </span>
        </div>
      </div>

    </div>
  );
}

// ── Componente principal ───────────────────────────────────────────────────
export default function HeroA() {
  return (
    <HeroBase
      chip="Para profissionais autônomos BR"
      headline={
        <>
          Você gasta{" "}
          <span className="text-slate-700">3 horas por dia</span>{" "}
          no WhatsApp.{" "}
          <span className="block">Isso tem que parar.</span>
        </>
      }
      subheadline="{PRODUTO} conecta no seu WhatsApp Business, aprende como você atende e cuida de tudo — triagem, agendamento, cobrança, follow-up — enquanto você trabalha."
      ctaPrimary={{
        label: "Quero minha {PRODUTO} agora",
        href: "/trial",
        microcopy:
          "Começa em 30 minutos. Sem cartão nos primeiros 7 dias. Cancela quando quiser.",
      }}
      visualSlot={<VisualBeforeAfter />}
    />
  );
}
