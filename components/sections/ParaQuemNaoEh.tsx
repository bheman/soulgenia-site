import Section from "@/components/ui/Section";

const exclusions = [
  {
    condition: "Se você fatura menos de R$5.000/mês",
    reason: "O ROI provavelmente não justifica agora.",
  },
  {
    condition: "Se você prefere atender cada cliente pessoalmente em todo contato",
    reason: "A {PRODUTO} vai parecer uma interferência.",
  },
  {
    condition: "Se você não tem WhatsApp Business ativo",
    reason:
      "O produto não funciona. A troca é gratuita e leva 5 minutos, mas precisa ser feita antes.",
  },
];

export default function ParaQuemNaoEh() {
  return (
    <Section bg="white" id="para-quem-nao">
      <div className="mx-auto max-w-2xl">
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-zinc-500">
            Honestidade antes de vender
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
            Para quem NÃO é
          </h2>
          <p className="mt-4 text-zinc-600">
            A {"{PRODUTO}"} não é para todos. Se algum item abaixo se encaixa
            no seu caso, provavelmente não é o momento certo.
          </p>
        </div>

        <ul className="space-y-4" role="list">
          {exclusions.map((item) => (
            <li
              key={item.condition}
              className="flex items-start gap-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-5"
            >
              <span
                className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-zinc-200 text-xs font-bold text-zinc-600"
                aria-hidden="true"
              >
                ✕
              </span>
              <div>
                <p className="font-semibold text-zinc-900">{item.condition}</p>
                <p className="mt-1 text-sm text-zinc-600">{item.reason}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
