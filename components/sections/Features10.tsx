import Section from "@/components/ui/Section";

interface Feature {
  title: string;
  description: string;
  badge?: string;
}

const features: Feature[] = [
  {
    title: "Triagem de cliente novo",
    description:
      "Quando alguém manda mensagem pela primeira vez, a {PRODUTO} pergunta o que ele precisa, coleta nome, tipo de atendimento e como conheceu você. Você recebe um resumo antes de qualquer contato humano.",
  },
  {
    title: "Agendamento automático com sua agenda",
    description:
      "A {PRODUTO} mostra horários disponíveis, confirma a escolha do cliente e adiciona o evento no seu Google Calendar.",
  },
  {
    title: "Briefing pré-consulta no seu WhatsApp 1h antes",
    description:
      "Uma hora antes de cada atendimento, você recebe um resumo de quem é o cliente, há quantas consultas está, histórico recente. Você entra preparado.",
  },
  {
    title: "Lembrete de horário (D-1 e D-0)",
    description:
      "Cliente recebe confirmação no dia anterior e na manhã do atendimento. No-show cai de forma mensurável nos primeiros 30 dias.",
  },
  {
    title: "Follow-up 24h depois",
    description:
      "Mensagem curta de agradecimento + pergunta como está + sugestão de próximo agendamento se aplicável.",
  },
  {
    title: "Cobrança recorrente via integração de pagamento",
    description:
      "Lembretes de vencimento, link de pagamento e cobrança educada em caso de atraso — sem você precisar ter essa conversa desconfortável.",
  },
  {
    title: "Reativação de cliente sumido",
    description:
      "Se um cliente não agenda há mais de 30 dias (ou intervalo que você definir), a {PRODUTO} manda mensagem de retorno. Muitos voltam só porque alguém lembrou.",
  },
  {
    title: "Voz clonada — {PRODUTO} manda áudios na SUA voz",
    description:
      "No plano Premium, a {PRODUTO} pode mandar áudios usando clonagem da sua voz.",
    badge: "Premium",
  },
  {
    title: "Relatório semanal toda sexta",
    description:
      "Resumo da semana: clientes novos, taxa de confirmação, horários perdidos, mensagens respondidas, cobranças enviadas.",
  },
  {
    title: "Detecção de cliente em risco de churn",
    description:
      "Se um cliente que agendava regularmente começa a cancelar ou sumir, a {PRODUTO} avisa antes de ele desaparecer.",
  },
];

function FeatureIcon() {
  return (
    <div
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100"
      aria-hidden="true"
    >
      <svg
        className="h-5 w-5 text-slate-700"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 13l4 4L19 7"
        />
      </svg>
    </div>
  );
}

export default function Features10() {
  return (
    <Section bg="zinc" id="funcionalidades">
      <div className="mb-12 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-slate-600">
          O que está incluso
        </p>
        <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
          O que a {"{PRODUTO}"} faz por você
        </h2>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" role="list">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="flex gap-4 rounded-2xl border border-zinc-200 bg-white p-5"
            role="listitem"
          >
            <FeatureIcon />
            <div>
              <div className="mb-1 flex items-center gap-2">
                <h3 className="text-sm font-semibold text-zinc-900">
                  {feature.title}
                </h3>
                {feature.badge && (
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700">
                    {feature.badge}
                  </span>
                )}
              </div>
              <p className="text-sm leading-relaxed text-zinc-600">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
