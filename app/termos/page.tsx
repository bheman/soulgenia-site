import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description:
    "Termos de uso iniciais da Soul Genia para a fase de onboarding assistido.",
};

const sections = [
  {
    title: "1. Natureza do MVP",
    body: "A Soul Genia está em fase de onboarding assistido. A oferta atual não deve ser interpretada como um software self-service finalizado ou como promessa de automação completa.",
  },
  {
    title: "2. Uso permitido",
    body: "O teste deve ser usado para organizar rotina pessoal e profissional, lembretes, mensagens, grupos, calendário, email, resumos e combinados. O usuário continua responsável pelas decisões finais, mensagens sensíveis e relação com terceiros.",
  },
  {
    title: "3. Limites da Soul Genia",
    body: "A Soul Genia pode sugerir respostas, lembretes e próximos passos, mas não substitui julgamento profissional, consultoria jurídica, atendimento médico, orientação financeira regulada ou decisões que exijam responsabilidade técnica humana.",
  },
  {
    title: "4. WhatsApp e terceiros",
    body: "O uso do WhatsApp, email, calendário, ferramentas de pagamento ou outros serviços depende das regras e disponibilidade de cada plataforma. A Soul Genia pode alterar integrações e fluxos conforme necessidade técnica.",
  },
  {
    title: "5. Teste gratuito",
    body: "O teste gratuito é qualificado e assistido. Ele pode ser limitado por prazo, escopo, disponibilidade operacional e adequação do caso. A continuidade paga exige confirmação explícita do usuário.",
  },
  {
    title: "6. Conduta",
    body: "Não é permitido usar a Soul Genia para spam, envio sem consentimento, fraude, abuso, conteúdo ilegal, violação de privacidade ou qualquer uso que prejudique terceiros.",
  },
  {
    title: "7. Pagamento futuro",
    body: "Planos, recorrência, setup, formas de pagamento e regras de cancelamento serão definidos antes da conversão paga. Nenhuma cobrança recorrente acontece sem confirmação prévia.",
  },
  {
    title: "8. Mudanças",
    body: "Estes termos são iniciais e poderão ser atualizados conforme a Soul Genia evoluir do MVP para uma operação comercial completa.",
  },
];

export default function TermsPage() {
  return (
    <main className="bg-[#f7f3ea] px-5 py-16 text-[#1f211c] sm:px-8">
      <article className="mx-auto max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7a5a1f]">
          Soul Genia
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[#171813] sm:text-5xl">
          Termos de Uso
        </h1>
        <p className="mt-5 text-base leading-7 text-[#5f584b]">
          Versão inicial para o MVP da Soul Genia. Última atualização: 12/06/2026.
        </p>

        <div className="mt-12 space-y-9">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-xl font-semibold text-[#171813]">
                {section.title}
              </h2>
              <p className="mt-3 text-base leading-7 text-[#5f584b]">
                {section.body}
              </p>
            </section>
          ))}
        </div>

        <div className="mt-12 border-t border-[#d8cdb9] pt-8">
          <p className="text-base leading-7 text-[#5f584b]">
            Para dúvidas sobre estes termos, escreva para{" "}
            <a
              href="mailto:soulgenia@gmail.com"
              className="font-semibold text-[#171813] underline"
            >
              soulgenia@gmail.com
            </a>
            .
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex h-11 items-center justify-center rounded-md border border-[#b9aa91] px-5 text-sm font-semibold text-[#2d2b25] transition hover:border-[#8d7855] hover:bg-[#efe7d8]"
          >
            Voltar para a Soul Genia
          </Link>
        </div>
      </article>
    </main>
  );
}
