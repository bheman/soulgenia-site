import type { Metadata } from "next";
import LandingAnalytics from "@/components/analytics/LandingAnalytics";
import SoulGeniaDiagnostic from "@/components/funil/SoulGeniaDiagnostic";

// Copy: copy-deck-diagnostico-ia.md §1 (deck aprovado em 2026-08-31).
export const metadata: Metadata = {
  // `absolute` porque o layout raiz aplica o template "%s | Soul Genia"; sem
  // ele o título do deck sairia com DOIS pipes.
  title: {
    absolute: "Diagnóstico de IA | Onde sua empresa perde 5 horas por semana",
  },
  description:
    "Em 2 minutos, descubra quantas horas e quanto dinheiro sua equipe gasta por mês respondendo cliente. Diagnóstico com garantia: encontramos pelo menos 5 horas por semana ou você não paga.",
  robots: {
    index: process.env.NEXT_PUBLIC_STAGING_NO_INDEX !== "true",
    follow: process.env.NEXT_PUBLIC_STAGING_NO_INDEX !== "true",
  },
};

// Deck §7. `lead` em negrito, `rest` na mesma linha — um passo por item.
const COMO_FUNCIONA = [
  {
    lead: "1. Você calcula.",
    rest: "Seis perguntas, dois minutos, e o número que o seu atendimento custa por mês.",
  },
  {
    lead: "2. A gente conversa 20 minutos.",
    rest: "Gratuito, para entender onde essas horas estão indo de verdade.",
  },
  {
    lead: "3. A entrevista de 45 minutos.",
    rest: "Gravada, com um consultor sênior, mapeando a rotina de quem atende.",
  },
  {
    lead: "4. O relatório em até 3 dias úteis.",
    rest: "De 5 a 7 ferramentas, cada uma com o custo por mês, o tempo de setup e as horas por semana que devolve. Mais uma call de 30 minutos para passar tudo junto.",
  },
];

// Deck §9. O id="garantia" desta seção é o destino do link secundário da tela
// de resultado (§6.1) — não renomear sem trocar o `guaranteeLink` do funil.
const FAQ = [
  {
    q: "Por que eu pago antes da entrevista?",
    a: "Porque o diagnóstico é trabalho feito antes da entrega. A garantia é o que torna isso justo: se não encontrarmos as 5 horas, você recebe tudo de volta.",
  },
  {
    q: "As 5 horas são minhas ou da equipe?",
    a: "Da equipe somada. Se cinco pessoas recuperam uma hora por semana cada, a garantia está cumprida.",
  },
  {
    q: "Como peço o reembolso?",
    a: "Por e-mail ou WhatsApp, em até 7 dias corridos depois da call de revisão. Sem justificativa, basta pedir. A devolução sai em até 5 dias úteis.",
  },
  {
    q: "E se eu quiser que vocês implementem depois?",
    a: "O valor do diagnóstico é abatido integralmente de uma implantação contratada em até 90 dias.",
  },
  {
    q: "Preciso ser gravado?",
    a: "Sim, e pedimos seu ok no começo. A gravação é o que alimenta a análise. Se preferir não ser gravado, o diagnóstico não roda e o valor é devolvido integral.",
  },
];

export default function DiagnosticoIaPage() {
  return (
    <>
      <LandingAnalytics page="diagnostico_ia" />
      <SoulGeniaDiagnostic slug="diagnostico-ia-v1" />

      {/* Deck §7 — como funciona, abaixo do quiz. */}
      <section
        id="como-funciona"
        className="scroll-mt-20 bg-[var(--cream)] px-5 py-16 sm:px-8 md:py-24"
      >
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
            Como funciona
          </p>
          <ol className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {COMO_FUNCIONA.map((step) => (
              <li
                key={step.lead}
                className="rounded-xl border border-[#d8d0bd] bg-white/70 p-6 text-[#405052]"
              >
                <p className="text-base leading-7">
                  <strong className="font-display text-lg leading-tight text-primary">
                    {step.lead}
                  </strong>{" "}
                  {step.rest}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Deck §8 — a independência do relatório. */}
      <section className="bg-primary px-5 py-16 text-white sm:px-8 md:py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-3xl leading-tight sm:text-4xl">
            No máximo uma das recomendações é produto nosso.
          </h2>
          <p className="mt-6 text-lg leading-8 text-white/74">
            E só quando o gargalo for exatamente aquele. As outras cinco ou seis
            são ferramentas de terceiros pelas quais não recebemos nada. Um
            relatório que só recomenda o que a gente vende não é diagnóstico, é
            call de vendas com preço.
          </p>
        </div>
      </section>

      {/* Deck §9 — FAQ. Destino da âncora #garantia da tela de resultado. */}
      <section
        id="garantia"
        className="scroll-mt-20 bg-background px-5 py-16 sm:px-8 md:py-24"
      >
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
            Perguntas frequentes
          </p>
          <dl className="mt-8 grid gap-5">
            {FAQ.map((item) => (
              <div
                key={item.q}
                className="rounded-xl border border-border bg-white p-6"
              >
                <dt className="font-display text-xl leading-tight text-primary">
                  {item.q}
                </dt>
                <dd className="mt-3 text-base leading-7 text-[#405052]">
                  {item.a}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
