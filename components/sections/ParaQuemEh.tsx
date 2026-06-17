import Section from "@/components/ui/Section";

const profiles = [
  {
    icon: "🩺",
    title: "Médico, dentista ou psicólogo com consultório próprio",
    description:
      "Você tem agenda cheia, mas perde tempo precioso toda vez que sai da sala para checar mensagens.",
  },
  {
    icon: "⚖️",
    title: "Advogado ou contador trabalhando solo ou em sociedade pequena",
    description:
      "Cada hora triando mensagens é uma hora a menos de trabalho técnico — e é o trabalho técnico que pagam pra ter.",
  },
  {
    icon: "🎯",
    title: "Coach ou consultor cobrando R$500+ por sessão",
    description:
      "Sessão cancelada sem reagendamento é perda real e imediata.",
  },
  {
    icon: "✏️",
    title: "Designer, arquiteto ou freelancer de projeto",
    description:
      "Seu trabalho exige blocos longos de concentração. Interrupções quebram o fluxo.",
  },
  {
    icon: "💪",
    title: "Personal trainer, esteticista ou professor particular premium",
    description:
      "Lembretes automáticos, confirmações e cobranças educadas aumentam comparecimento.",
  },
];

export default function ParaQuemEh() {
  return (
    <Section bg="zinc" id="para-quem">
      <div className="mb-12 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-slate-600">
          Seu perfil
        </p>
        <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
          Para quem é a {"{PRODUTO}"}
        </h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" role="list">
        {profiles.map((profile) => (
          <div
            key={profile.title}
            className="flex items-start gap-4 rounded-2xl border border-zinc-200 bg-white p-5"
            role="listitem"
          >
            <span className="text-2xl" aria-hidden="true" role="img">
              {profile.icon}
            </span>
            <div>
              <h3 className="mb-1 text-sm font-semibold text-zinc-900">
                {profile.title}
              </h3>
              <p className="text-sm leading-relaxed text-zinc-600">
                {profile.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
