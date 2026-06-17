import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Política de privacidade inicial da Soul Genia para a fase de onboarding assistido.",
};

const sections = [
  {
    title: "1. Escopo",
    body: "Esta política descreve como a Soul Genia trata dados enviados por pessoas interessadas em usar uma secretária pessoal pelo WhatsApp.",
  },
  {
    title: "2. Dados coletados",
    body: "Podemos coletar nome, email, telefone ou WhatsApp, área de atuação, origem da visita e informações que você nos enviar voluntariamente durante o contato comercial ou teste assistido.",
  },
  {
    title: "3. Uso dos dados",
    body: "Usamos esses dados para responder seu interesse, entender sua rotina, configurar o onboarding assistido, acompanhar resultados, prestar suporte e melhorar a oferta.",
  },
  {
    title: "4. Compartilhamento",
    body: "Não vendemos dados pessoais. Podemos usar fornecedores técnicos para hospedagem, email, analytics, WhatsApp, automação e operação do produto, sempre limitados ao necessário para prestar o serviço.",
  },
  {
    title: "5. WhatsApp e conteúdo das conversas",
    body: "Durante o uso assistido, a Soul Genia pode analisar mensagens e contexto fornecidos pelo usuário para sugerir respostas, lembretes, mensagens agendadas, resumos e próximos passos. A configuração inicial é acompanhada de forma assistida.",
  },
  {
    title: "6. Direitos do titular",
    body: "Você pode pedir acesso, correção, exclusão ou interrupção do contato comercial pelo email soulgenia@gmail.com. Atenderemos conforme a legislação aplicável.",
  },
  {
    title: "7. Retenção",
    body: "Mantemos os dados pelo tempo necessário para operar o teste, cumprir obrigações legais, preservar histórico comercial mínimo e melhorar a experiência. Dados de leads sem relação ativa podem ser removidos mediante solicitação.",
  },
  {
    title: "8. Atualizações",
    body: "Esta política é inicial e será refinada antes de uma operação comercial em escala, especialmente quando houver pagamento recorrente, área logada ou integrações adicionais.",
  },
];

export default function PrivacyPage() {
  return (
    <main className="bg-[#f7f3ea] px-5 py-16 text-[#1f211c] sm:px-8">
      <article className="mx-auto max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7a5a1f]">
          Soul Genia
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[#171813] sm:text-5xl">
          Política de Privacidade
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
            Para dúvidas sobre privacidade, escreva para{" "}
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
