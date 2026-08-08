import Image from "next/image";
import type { Metadata } from "next";
import LandingAnalytics from "@/components/analytics/LandingAnalytics";
import TrackedCtaLink from "@/components/analytics/TrackedCtaLink";
import ApprovalPanelCard from "@/components/marketing/ApprovalPanelCard";
import PricingTierViewTracker from "@/components/marketing/PricingTierViewTracker";
import WhatsAppChatMockup, {
  type ChatMockupMessage,
} from "@/components/marketing/WhatsAppChatMockup";

// O mockup de chat depende de --v3-aprova-glow; a base importa o mesmo arquivo.
import "../../v3/v3-tokens.css";
import "./tokens.css";

const whatsappHref = process.env.NEXT_PUBLIC_WHATSAPP_URL?.trim() || "/trial";
const hasWhatsapp = whatsappHref.startsWith("http");

const planDest = process.env.NEXT_PUBLIC_DESK_SIGNUP_URL?.trim() || "/trial";
const planDestination: "desk_signup" | "trial" = planDest.startsWith("http")
  ? "desk_signup"
  : "trial";
const trialReassurance = "Garantia de 7 dias. Não gostou, devolvemos tudo.";

const navLinks = [
  { href: "#beneficios", label: "Benefícios" },
  { href: "#rotina", label: "Na prática" },
  { href: "#antes", label: "Antes e depois" },
  { href: "#planos", label: "Planos" },
  { href: "#faq", label: "Dúvidas" },
];

const plans = [
  {
    id: "starter",
    tier: "essencial" as const,
    name: "Essencial",
    price: "297",
    pitch: "Sua rotina de email e agenda organizada, com aprovação em tudo.",
    bullets: [
      "Conexão Google: email + agenda",
      "Briefing matinal",
      "Lembretes vivos",
      "Rascunhos de resposta com aprovação",
      "Memória da rotina",
    ],
    highlighted: false,
  },
  {
    id: "pro",
    tier: "pro" as const,
    name: "Pro",
    price: "497",
    pitch: "Tudo do Essencial, com o WhatsApp sob controle no dia a dia.",
    bullets: [
      "Tudo do Essencial",
      "WhatsApp: resumos de grupos e áudios",
      "Mensagens agendadas com aprovação antes do envio",
      "Follow-ups proativos",
      "Fechamento do dia e relatório semanal",
    ],
    highlighted: true,
  },
  {
    id: "scale",
    tier: "premium" as const,
    name: "Premium",
    price: "897",
    pitch: "Tudo do Pro, com acompanhamento dedicado e personalização avançada.",
    bullets: [
      "Tudo do Pro",
      "Onboarding dedicado e acompanhado",
      "Personalização avançada de tom, limites e rotinas",
      "Prioridade de processamento",
      "Acesso antecipado a novas conexões",
    ],
    highlighted: false,
  },
];

const heroChat: ChatMockupMessage[] = [
  {
    from: "genia",
    text: "Chegou mensagem de um cliente agora, 22h04. A resposta já está pronta — só falta o seu ok.",
    meta: "22:04",
  },
  { from: "user", text: "Perfeito. Pode enviar." },
];

const promiseCards = [
  {
    icon: "whatsapp",
    label: "Sem app novo",
    title: "Você conversa pelo WhatsApp.",
    body: "A Gênia vive nos canais que você já usa: WhatsApp, email e calendário.",
  },
  {
    icon: "approve",
    label: "Com aprovação",
    title: "Nada sai no automático sem você.",
    body: "Ela prepara, lembra e agenda, mas pede confirmação antes de enviar mensagens.",
  },
  {
    icon: "notebook",
    label: "Aprende com você",
    title: "Quanto mais contexto, melhor a ajuda.",
    body: "Você ensina contas, rotinas, pessoas importantes, tom de voz e preferências.",
  },
];

const benefitTags = ["Pessoal", "Profissional", "Família", "Saúde", "Financeiro"];

const userBenefits = [
  {
    icon: "calendar",
    label: "Clareza logo cedo",
    title: "Você começa o dia sabendo o que importa.",
    body: "Briefing matinal com agenda, contas, remédios, mensagens pendentes e prioridades antes da rotina te atropelar.",
    result: "Menos tempo procurando o que era urgente.",
    initial: "01",
  },
  {
    icon: "group",
    label: "WhatsApp sob controle",
    title: "Grupos, áudios e combinados viram próximos passos.",
    body: "Ela resume o que aconteceu, separa decisões, datas, valores e perguntas que precisam de resposta.",
    result: "Menos pendência mental e menos coisa perdida.",
    initial: "02",
  },
  {
    icon: "send",
    label: "Recados no horário certo",
    title: "Mensagens ficam prontas, agendadas e passam por você.",
    body: "Você dita agora, escolhe quando quer enviar e recebe aprovação antes de qualquer mensagem sair.",
    result: "Mais presença sem perder o controle.",
    initial: "03",
  },
];

const benefitFlow = [
  {
    time: "07:30",
    title: "Briefing do dia",
    body: "Agenda, contas, remédios e prioridades chegam organizados.",
  },
  {
    time: "14:50",
    title: "Aprovação antes do envio",
    body: "A mensagem agendada aparece para você confirmar.",
  },
  {
    time: "21:00",
    title: "Fechamento leve",
    body: "Pendências abertas, retornos e amanhã ficam claros.",
  },
];

const capabilities = [
  {
    icon: "group",
    title: "WhatsApp e grupos",
    body: "Resume conversas, encontra combinados e separa o que pede resposta.",
  },
  {
    icon: "audio",
    title: "Áudios longos",
    body: "Escuta, resume e transforma áudio em pendência, decisão ou próximo passo.",
  },
  {
    icon: "calendar",
    title: "Briefing matinal",
    body: "Te entrega agenda, lembretes, contas, mensagens pendentes e prioridades do dia.",
  },
  {
    icon: "clock",
    title: "Lembretes vivos",
    body: "Lembra remédio, vencimento, retorno, parabéns e tarefas que não podem sumir.",
  },
  {
    icon: "send",
    title: "Mensagens agendadas",
    body: "Prepara recados para o horário certo e deixa você aprovar antes de enviar.",
  },
  {
    icon: "mail",
    title: "Email e calendário",
    body: "Resume emails, cruza compromissos e avisa quando algo importante aparece.",
  },
  {
    icon: "money",
    title: "Contas e financeiro",
    body: "Organiza vencimentos, recorrências e registros. O pagamento continua com você.",
  },
  {
    icon: "image",
    title: "Pesquisa e imagens",
    body: "Pesquisa, compara opções, resume links e ajuda a criar ou analisar imagens.",
  },
];

const dayMoments: {
  time: string;
  title: string;
  body: string;
  chat: ChatMockupMessage[];
  approval?: { question: string };
}[] = [
  {
    time: "07:30",
    title: "Bom dia sem abrir cinco apps",
    body: "Agenda, contas, remédios, mensagens importantes e o que precisa de resposta.",
    chat: [
      {
        from: "genia",
        text: "Bom dia! Sua agenda, as contas que vencem e o remédio da manhã já estão organizados aqui.",
        meta: "07:30",
      },
      { from: "user", text: "Perfeito. O que vem primeiro?" },
    ],
  },
  {
    time: "11:20",
    title: "Grupo movimentado vira resumo",
    body: "Ela separa decisão, data, valor, tarefa e pergunta pendente em poucos segundos.",
    chat: [
      { from: "user", text: "Consegue resumir o grupo pra mim?" },
      {
        from: "genia",
        text: "Resumo pronto: as decisões, as datas combinadas e o que ainda espera a sua resposta.",
        meta: "11:20",
      },
    ],
  },
  {
    time: "15:10",
    title: "Mensagem pronta para mais tarde",
    body: "Você dita agora, agenda o envio e aprova antes da Gênia mandar.",
    chat: [
      { from: "user", text: "Deixa esse recado agendado para as 16:00?" },
      {
        from: "genia",
        text: "Pronto. Fica agendado e só sai depois do seu ok.",
        meta: "15:10",
      },
    ],
    approval: { question: "Aprovar e enviar às 16:00?" },
  },
  {
    time: "21:00",
    title: "Fechamento do dia",
    body: "O que ficou aberto, quem precisa de retorno e quais compromissos chegam amanhã.",
    chat: [
      {
        from: "genia",
        text: "Fechando o dia: o que ficou aberto, quem espera retorno e o que chega amanhã.",
        meta: "21:00",
      },
      { from: "user", text: "Obrigado. Me lembra do retorno logo cedo." },
    ],
  },
];

const beforeAfterMoments = [
  {
    label: "À noite",
    time: "22h04",
    before: "Um cliente chama às 22h. Você só vê de manhã — e a conversa já esfriou.",
    after: "Resposta pronta em segundos. Você aprova com um toque, e só então ela envia.",
  },
  {
    label: "No almoço",
    time: "13h40",
    before: "Você volta e encontra 14 conversas acumuladas, sem saber por onde começar.",
    after: "As conversas chegam triadas: o que é urgente, o que pode esperar e o que já tem resposta preparada.",
  },
  {
    label: "Fim do mês",
    time: "dia 28",
    before: "Aquele follow-up que você prometeu ficou esquecido no meio de tudo.",
    after: "Follow-up feito no dia certo — preparado pela Gênia, aprovado por você.",
  },
];

const routineResults = [
  {
    label: "Briefing pronto",
    metric: "Manhã sem abrir cinco apps",
    quote:
      "Em vez de procurar o que era urgente, a Gênia entrega compromissos, contas, remédios e mensagens que pedem resposta.",
  },
  {
    label: "Envio com aprovação",
    metric: "Recados no horário certo",
    quote:
      "Você dita a mensagem, escolhe quando ela deve sair e recebe uma confirmação antes do envio. Sai do improviso sem perder controle.",
  },
  {
    label: "Menos ruído",
    metric: "Grupos viram próximos passos",
    quote:
      "Conversas longas, áudios e combinados deixam de virar tarefa mental. A Gênia separa decisões, datas, valores e pendências.",
  },
];

const learningSteps = [
  {
    step: "01",
    icon: "chat",
    title: "Você mostra o que está espalhado",
    body: "Começa com uma conversa simples sobre mensagens, agenda, contas, grupos e lembretes.",
  },
  {
    step: "02",
    icon: "notebook",
    title: "A gente ajuda a ensinar a Gênia",
    body: "O onboarding é acompanhado para ela entender prioridades, pessoas importantes, tom e limites.",
  },
  {
    step: "03",
    icon: "approve",
    title: "Ela organiza e propõe próximos passos",
    body: "Conversas, áudios, email e calendário viram resumo, lembrete, tarefa ou mensagem pronta.",
  },
  {
    step: "04",
    icon: "spark",
    title: "Você aprova antes de qualquer envio",
    body: "Toda mensagem passa por você antes de sair. Ações sensíveis também.",
  },
];

const comparisonRows = [
  {
    topic: "Como começa",
    common: "Você baixa mais uma ferramenta e precisa alimentar tudo manualmente.",
    soul: "Você começa conversando no WhatsApp e ensina a rotina aos poucos.",
  },
  {
    topic: "Esforço no dia a dia",
    common: "O app vira mais uma tarefa para lembrar, abrir e atualizar.",
    soul: "A Gênia te chama, resume, lembra e organiza no canal que você já usa.",
  },
  {
    topic: "Contexto",
    common: "Listas comuns não entendem grupos, áudios, email, calendário e combinados.",
    soul: "Ela junta conversas, agenda, lembretes e preferências para propor o próximo passo.",
  },
  {
    topic: "Mensagens",
    common: "Você precisa lembrar o horário, escrever de novo e enviar por conta própria.",
    soul: "Você pode deixar o recado preparado e aprovar antes do envio.",
  },
  {
    topic: "Aprendizado",
    common: "A configuração fica igual até você parar para ajustar.",
    soul: "Ela melhora com uso, correção e acompanhamento no onboarding.",
  },
];

const boundaries = [
  "Não é mais um aplicativo para configurar.",
  "Não é CRM, chatbot de vendas ou painel de atendimento.",
  "Não faz pagamento automático.",
  "Não envia nenhuma mensagem sem a sua aprovação.",
];

// FAQ no padrão benchmark: adianta o que normalmente fica para a conversa.
const faqs = [
  {
    question: "Como funciona a ativação?",
    answer:
      "Começa com uma conversa no WhatsApp, sem instalação. O onboarding é acompanhado: você mostra o que está espalhado (agenda, grupos, contas, lembretes) e a gente ajuda a ensinar a Gênia no seu ritmo.",
  },
  {
    question: "Preciso trocar de número?",
    answer:
      "Não. Você continua com o seu número e o seu WhatsApp de sempre, sem instalar app novo. A Gênia entra na sua rotina como uma conversa a mais.",
  },
  {
    question: "Em quanto tempo ela começa a ajudar?",
    answer:
      "A organização começa na primeira conversa. Mas ela não entende tudo no primeiro dia: o valor cresce com contexto — quanto mais você ensina a rotina, melhor ela lembra, resume e prepara.",
  },
  {
    question: "Tem fidelidade?",
    answer:
      "Os planos são mensais. E todo plano tem garantia de 7 dias: se não for para você, devolvemos o valor integral, sem perguntas.",
  },
  {
    question: "Quem aprova o que ela envia?",
    answer:
      "Você. A Gênia prepara e agenda mensagens, mas nada sai no automático: toda mensagem espera a sua aprovação antes do envio. Ações sensíveis também.",
  },
  {
    question: "E os meus dados?",
    answer:
      "Suas conversas e contextos servem para um único fim: organizar a sua rotina. Você decide o que ensina à Gênia, e ações sensíveis — mensagens, dinheiro, compromissos — sempre passam pela sua aprovação.",
  },
];

export const metadata: Metadata = {
  title: { absolute: "Gênia — sua secretária de IA no WhatsApp" },
  description:
    "A Gênia prepara respostas, agenda recados e organiza compromissos, contas e lembretes pelo WhatsApp. Cada mensagem espera um toque seu: você aprova, e só então ela envia.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function GeniaG2AuroraPage() {
  return (
    <main className="bg-background text-foreground">
      <LandingAnalytics page="genia_g2_aurora" />

      {/* ================= HERO — escuro, feixe aurora ================= */}
      <section
        id="g2a-hero"
        className="g2a-hero relative overflow-hidden px-5 pb-16 pt-5 text-white sm:px-8 md:pb-20"
      >
        <div className="g2a-aurora" aria-hidden="true">
          <div className="g2a-aurora-beam" />
        </div>

        <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between py-3">
          <a href="/" className="flex items-center gap-3" aria-label="Gênia">
            <Image
              src="/images/soul-genia-profile-mark.png"
              alt=""
              width={40}
              height={40}
              className="h-10 w-10 rounded-xl"
            />
            <div>
              <p className="g2a-heading text-lg leading-none text-white">
                Gênia
              </p>
              <p className="mt-1 hidden whitespace-nowrap text-xs text-white/60 sm:block">
                Secretária no WhatsApp
              </p>
            </div>
          </a>

          <nav
            className="hidden items-center gap-7 text-sm font-medium text-white/80 lg:flex"
            aria-label="Navegação principal"
          >
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="hover:text-white">
                {link.label}
              </a>
            ))}
          </nav>

          <TrackedCtaLink
            href={whatsappHref}
            position="top_nav"
            destination={hasWhatsapp ? "whatsapp" : "trial"}
            target={hasWhatsapp ? "_blank" : undefined}
            rel={hasWhatsapp ? "noreferrer" : undefined}
            className="motion-press inline-flex min-h-10 shrink-0 items-center whitespace-nowrap rounded-full bg-primary-light px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_40px_-10px_rgba(13,170,191,0.55)] hover:bg-primary-lighter"
          >
            <span className="sm:hidden">Falar</span>
            <span className="hidden sm:inline">Falar com a Gênia</span>
          </TrackedCtaLink>
        </header>

        <div className="hero-copy relative z-10 mx-auto flex max-w-4xl flex-col items-center pt-12 text-center md:pt-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/16 bg-white/8 px-4 py-2 text-sm font-semibold text-white/90 backdrop-blur">
            <span className="aura-dot h-2 w-2 rounded-full bg-[var(--g2a-teal-bright)]" />
            Aprovação antes de qualquer envio
          </div>

          <h1 className="g2a-heading mt-7 text-[clamp(2.6rem,10.5vw,4.75rem)] leading-[1.04] text-white">
            Você aprova.
            <br />
            Ela <span className="g2a-gradient-word">executa</span>.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-white/78 sm:text-lg sm:leading-8">
            A Gênia prepara respostas, agenda recados e organiza compromissos,
            contas e lembretes pelo WhatsApp. Cada mensagem fica pronta,
            esperando um toque seu. Você confirma quando quiser, e só então ela
            envia.
          </p>

          <div className="mt-9 flex w-full flex-col justify-center gap-4 sm:w-auto sm:flex-row">
            <TrackedCtaLink
              href={whatsappHref}
              position="hero_primary"
              destination={hasWhatsapp ? "whatsapp" : "trial"}
              target={hasWhatsapp ? "_blank" : undefined}
              rel={hasWhatsapp ? "noreferrer" : undefined}
              className="motion-press shine-pass inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-primary-light px-8 py-4 text-base font-semibold text-white shadow-[0_10px_40px_-10px_rgba(13,170,191,0.6)] hover:bg-primary-lighter"
            >
              <Icon name="whatsapp" solid />
              Falar com a Gênia
            </TrackedCtaLink>
            <TrackedCtaLink
              href="#planos"
              position="hero_secondary"
              destination="planos"
              className="motion-press inline-flex min-h-14 items-center justify-center rounded-full border border-white/28 bg-white/8 px-8 py-4 text-base font-semibold text-white backdrop-blur hover:bg-white/16"
            >
              Ver planos e assinar
            </TrackedCtaLink>
          </div>

          <p className="mt-5 flex items-center gap-2 text-sm font-medium text-white/64">
            <svg
              className="h-4 w-4 shrink-0 text-[var(--g2a-teal-bright)]"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M12 3 19 6v5c0 4.6-2.8 8-7 10-4.2-2-7-5.4-7-10V6l7-3Z"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="m9 12 2 2 4-5"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {trialReassurance}
          </p>

          <div className="relative mt-12 w-full max-w-md">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-8 rounded-[2rem] bg-[radial-gradient(closest-side,rgba(15,191,215,0.2),transparent_74%)] blur-2xl"
            />
            <WhatsAppChatMockup
              messages={heroChat}
              approval={{ question: "Aprovar e enviar agora?" }}
              className="relative ring-1 ring-white/20"
            />
          </div>
        </div>
      </section>

      {/* ================= PROMESSAS (claro, como a base) ================= */}
      <section className="border-b border-border bg-background px-5 py-16 sm:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          {promiseCards.map((card) => (
            <article
              key={card.label}
              className="motion-card group rounded-xl border border-border bg-background p-6 shadow-[0_18px_60px_-52px_rgba(5,64,72,0.45)] hover:border-primary-light/45"
            >
              <div className="mb-5 flex items-center justify-between gap-4">
                <div className="icon-breathe flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon name={card.icon} />
                </div>
                <span className="rounded-full bg-primary-light/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-primary">
                  {card.label}
                </span>
              </div>
              <h2 className="g2a-heading text-2xl leading-snug text-[var(--g2a-ink)]">
                {card.title}
              </h2>
              <p className="mt-4 leading-7 text-muted-foreground">{card.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ================= BENEFÍCIOS (claro na aurora) ================= */}
      <section
        id="beneficios"
        className="overflow-hidden bg-white px-5 py-20 sm:px-8 md:py-28"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary-light">
                Benefícios para quem usa
              </p>
              <h2 className="g2a-heading mt-5 max-w-3xl text-4xl leading-[1.08] text-[var(--g2a-ink)] sm:text-5xl">
                Menos coisa na cabeça. Mais rotina andando sozinha, com você no
                controle.
              </h2>
            </div>
            <div>
              <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
                A Gênia funciona como uma secretária pessoal no WhatsApp: ela te
                ajuda a lembrar, responder, priorizar e fechar pendências sem
                transformar organização em mais um trabalho.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {benefitTags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-border bg-muted px-4 py-2 text-sm font-semibold text-[#405052]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {userBenefits.map((benefit) => (
              <article
                key={benefit.title}
                className="motion-card rounded-xl border border-border bg-[#f7fafb] p-6 shadow-[0_24px_80px_-64px_rgba(5,64,72,0.55)] hover:border-primary-light/55"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-white">
                    <Icon name={benefit.icon} />
                  </div>
                  <span className="g2a-heading text-3xl leading-none text-[var(--g2a-ink)]/12">
                    {benefit.initial}
                  </span>
                </div>
                <p className="mt-6 text-xs font-bold uppercase tracking-[0.16em] text-primary-light">
                  {benefit.label}
                </p>
                <h3 className="g2a-heading mt-3 text-2xl leading-tight text-[var(--g2a-ink)]">
                  {benefit.title}
                </h3>
                <p className="mt-4 leading-7 text-muted-foreground">
                  {benefit.body}
                </p>
                <p className="mt-6 rounded-lg border border-primary-light/25 bg-white px-4 py-3 text-sm font-semibold leading-6 text-primary">
                  {benefit.result}
                </p>
              </article>
            ))}
          </div>

          <div
            id="organiza"
            className="mt-8 rounded-xl border border-border bg-[#f7fafb] p-6 sm:p-8"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                  O que ela organiza
                </p>
                <h3 className="g2a-heading mt-2 text-2xl leading-tight text-[var(--g2a-ink)]">
                  Ela transforma o que está espalhado em próximo passo.
                </h3>
              </div>
              <TrackedCtaLink
                href={whatsappHref}
                position="capabilities_section"
                destination={hasWhatsapp ? "whatsapp" : "trial"}
                target={hasWhatsapp ? "_blank" : undefined}
                rel={hasWhatsapp ? "noreferrer" : undefined}
                className="motion-press inline-flex min-h-11 shrink-0 items-center justify-center gap-2 self-start rounded-full bg-primary-light px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_40px_-14px_rgba(13,170,191,0.6)] hover:bg-primary-lighter sm:self-auto"
              >
                <Icon name="whatsapp" solid />
                Falar com a Gênia
              </TrackedCtaLink>
            </div>
            <ul className="mt-6 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-4">
              {capabilities.map((item) => (
                <li
                  key={item.title}
                  className="flex items-center gap-3 text-sm font-semibold text-[#243b3e]"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary [&_svg]:h-4.5 [&_svg]:w-4.5">
                    <Icon name={item.icon} />
                  </span>
                  {item.title}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 grid gap-5 rounded-xl border border-primary-light/25 bg-[linear-gradient(135deg,rgba(13,170,191,0.08),rgba(79,142,247,0.05))] p-5 lg:grid-cols-[0.76fr_1.24fr] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary-light">
                Um dia mais organizado
              </p>
              <h3 className="g2a-heading mt-3 text-3xl leading-tight text-[var(--g2a-ink)]">
                Ela acompanha o começo, o meio e o fim do seu dia.
              </h3>
            </div>
            <div className="hidden gap-3 md:grid md:grid-cols-3">
              {benefitFlow.map((item) => (
                <div
                  key={item.time}
                  className="rounded-lg border border-border bg-white p-4"
                >
                  <p className="text-sm font-bold text-primary-light">
                    {item.time}
                  </p>
                  <p className="mt-2 font-semibold text-[var(--g2a-ink)]">
                    {item.title}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= NA PRÁTICA (navy aurora — 4 mockups escuros) ================= */}
      <section
        id="rotina"
        className="relative overflow-hidden bg-[var(--g2a-hero-bg)] px-5 py-20 text-white sm:px-8 md:py-28"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 right-[-12%] h-[24rem] w-[38rem] rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, color-mix(in srgb, var(--g2a-blue) 12%, transparent), transparent)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary-light">
                Veja na prática
              </p>
              <h2 className="g2a-heading mt-4 text-4xl leading-[1.08] text-white sm:text-5xl">
                Veja a Gênia funcionando em um dia real.
              </h2>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-white/70">
              Do briefing da manhã ao fechamento do dia, ela ajuda a tirar da
              cabeça o que ficou espalhado em grupos, áudios, agenda, contas e
              mensagens que não podem atrasar.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {dayMoments.map((scene) => (
              <article
                key={scene.time}
                className="motion-card group rounded-xl border border-white/12 bg-white/[0.06] p-6 hover:border-primary-light/45"
              >
                <div className="mb-6 flex items-center justify-between">
                  <span className="rounded-full bg-primary-light px-3 py-1 text-xs font-bold text-white">
                    {scene.time}
                  </span>
                  <div className="icon-breathe flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-primary-lighter">
                    <Icon name="clock" />
                  </div>
                </div>
                <h3 className="text-xl font-bold leading-snug tracking-[-0.01em] text-white">
                  {scene.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-white/64">
                  {scene.body}
                </p>
                <WhatsAppChatMockup
                  messages={scene.chat}
                  approval={scene.approval}
                  className="mt-5 ring-1 ring-white/14"
                />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ NOVO: ANTES / COM A GÊNIA (por momento) ============ */}
      <section id="antes" className="bg-[#f4f8fa] px-5 py-20 sm:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary-light">
              Antes / Com a Gênia
            </p>
            <h2 className="g2a-heading mt-4 text-4xl leading-[1.08] text-[var(--g2a-ink)] sm:text-5xl">
              O mesmo dia, com outra rotina.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
              Três momentos que todo mundo reconhece — e o que muda quando tem
              alguém preparando o próximo passo para você aprovar.
            </p>
          </div>

          <div className="mt-14 grid gap-8">
            {beforeAfterMoments.map((moment) => (
              <article
                key={moment.label}
                className="grid gap-4 md:grid-cols-[9rem_1fr_1fr] md:items-stretch"
              >
                <div className="flex items-center gap-3 md:flex-col md:items-start md:justify-center">
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
                    {moment.label}
                  </p>
                  <p className="text-sm font-semibold text-muted-foreground">
                    {moment.time}
                  </p>
                </div>

                <div className="rounded-xl border border-[#dde3e7] bg-[#eceff1] p-6">
                  <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#7a868c]">
                    <span aria-hidden="true">⚠</span>
                    Antes
                  </p>
                  <p className="mt-3 leading-7 text-[#5a666c]">
                    {moment.before}
                  </p>
                </div>

                <div className="motion-card flex flex-col rounded-xl border-2 border-primary-light/55 bg-white p-6 shadow-[0_24px_70px_-56px_rgba(13,170,191,0.9)]">
                  <div className="flex items-center justify-between gap-3">
                    <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-primary-light">
                      <svg
                        className="h-4 w-4 shrink-0"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M20 6 9 17l-5-5"
                          stroke="currentColor"
                          strokeWidth={2.6}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Com a Gênia
                    </p>
                    <span className="rounded-full bg-primary-light/12 px-3 py-1 text-xs font-bold text-primary">
                      Gênia
                    </span>
                  </div>
                  <p className="mt-3 font-medium leading-7 text-[var(--g2a-ink)]">
                    {moment.after}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-14">
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                Ganhos que ela pode criar
              </p>
              <span className="inline-flex items-center rounded-full border border-[#dde3e7] bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#667274]">
                Exemplo ilustrativo
              </span>
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {routineResults.map((result) => (
                <article
                  key={result.metric}
                  className="motion-card rounded-xl border border-[#dde3e7] bg-white p-5 hover:border-primary-light/55"
                >
                  <p className="inline-flex rounded-full bg-primary px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-white">
                    {result.label}
                  </p>
                  <h3 className="g2a-heading mt-4 text-xl leading-tight text-[var(--g2a-ink)]">
                    {result.metric}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-[#405052]">
                    {result.quote}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-12 text-center">
            <TrackedCtaLink
              href={whatsappHref}
              position="before_after_section"
              destination={hasWhatsapp ? "whatsapp" : "trial"}
              target={hasWhatsapp ? "_blank" : undefined}
              rel={hasWhatsapp ? "noreferrer" : undefined}
              className="motion-press shine-pass inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-primary-light px-8 py-3.5 text-sm font-semibold text-white shadow-[0_10px_40px_-12px_rgba(13,170,191,0.7)] hover:bg-primary-lighter"
            >
              <Icon name="whatsapp" solid />
              Quero esse depois
            </TrackedCtaLink>
          </div>
        </div>
      </section>

      {/* ================= COMO FUNCIONA (teal, como a base) ================= */}
      <section
        id="funciona"
        className="v2-texture overflow-hidden bg-primary px-5 py-20 text-white sm:px-8 md:py-28"
      >
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/80">
              Como funciona
            </p>
            <h2 className="g2a-heading mt-4 text-4xl leading-[1.08] text-white sm:text-5xl">
              Você não configura mais um app. Você ensina uma profissional.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-white/70">
              O começo é assistido. A Gênia aprende sua rotina, entende seus
              limites e só ganha mais iniciativa conforme você corrige, aprova e
              ensina o que importa.
            </p>
          </div>

          <div className="v2-rail grid gap-5">
            {learningSteps.map((item) => (
              <article
                key={item.step}
                className="motion-card group relative rounded-xl border border-white/12 bg-white/[0.08] p-6 backdrop-blur-sm hover:bg-white/[0.12]"
              >
                <div className="grid gap-5 sm:grid-cols-[4rem_1fr]">
                  <div className="icon-breathe z-10 flex h-16 w-16 items-center justify-center rounded-full bg-primary-light text-white">
                    <Icon name={item.icon} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/80">
                      {item.step}
                    </p>
                    <h3 className="mt-1 text-2xl font-bold tracking-[-0.01em] text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 leading-7 text-white/65">{item.body}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================= COMPARATIVO (claro, como a base) ================= */}
      <section className="bg-background px-5 py-20 sm:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                Comparativo
              </p>
              <h2 className="g2a-heading mt-4 text-4xl leading-[1.08] text-[var(--g2a-ink)] sm:text-5xl">
                App de tarefas comum x Gênia.
              </h2>
            </div>
            <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
              A diferença não é ter mais uma lista bonita. É ter uma secretária
              que conversa com você, entende contexto e ajuda a rotina andar sem
              virar mais uma obrigação.
            </p>
          </div>

          <div className="mt-12 grid gap-4">
            {comparisonRows.map((row) => (
              <article
                key={row.topic}
                className="motion-card grid gap-5 rounded-xl border border-border bg-muted/55 p-5 hover:border-primary-light/45 md:grid-cols-[0.7fr_1fr_1fr] md:items-start"
              >
                <h3 className="g2a-heading text-xl leading-snug text-[var(--g2a-ink)]">
                  {row.topic}
                </h3>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
                    App comum
                  </p>
                  <p className="mt-2 leading-7 text-[#405052]">{row.common}</p>
                </div>
                <div className="rounded-xl bg-primary p-5 text-white">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary-light">
                    Gênia
                  </p>
                  <p className="mt-2 leading-7 text-white/78">{row.soul}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PLANOS (escuro — momento de decisão, navy aurora) ============ */}
      <section
        id="planos"
        className="relative overflow-hidden bg-[var(--g2a-hero-bg)] px-5 py-20 text-white sm:px-8 md:py-28"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 left-1/2 h-[26rem] w-[42rem] -translate-x-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, color-mix(in srgb, var(--g2a-teal-bright) 14%, transparent), transparent)",
          }}
        />

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary-light">
              Planos
            </p>
            <h2 className="g2a-heading mt-4 text-4xl leading-[1.08] text-white sm:text-5xl">
              Escolha como a Gênia entra na sua{" "}
              <span className="g2a-gradient-word">rotina</span>.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/70">
              Todo plano tem garantia de 7 dias. Se não for para você,
              devolvemos o valor integral.
            </p>
          </div>

          <div className="mt-14 grid gap-5 lg:grid-cols-3 lg:items-stretch">
            {plans.map((plan) => (
              <PricingTierViewTracker
                key={plan.id}
                tier={plan.tier}
                className={`h-full ${plan.highlighted ? "lg:scale-[1.03]" : ""}`}
              >
                <article
                  className={`motion-card relative flex h-full flex-col rounded-xl p-6 sm:p-7 ${
                    plan.highlighted
                      ? "border border-primary-lighter/45 bg-white/[0.09] shadow-[0_28px_90px_-48px_rgba(13,170,191,0.85)]"
                      : "border border-white/12 bg-white/[0.05] shadow-[0_24px_80px_-60px_rgba(13,170,191,0.5)] hover:border-primary-light/45"
                  }`}
                >
                  {plan.highlighted ? (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-primary-light px-4 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-white shadow-[0_10px_30px_-10px_rgba(13,170,191,0.8)]">
                      Mais escolhido
                    </span>
                  ) : null}

                  <h3 className="g2a-heading text-2xl leading-snug text-white">
                    {plan.name}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-white/64">
                    {plan.pitch}
                  </p>

                  <p className="mt-6 flex items-baseline gap-1.5">
                    <span className="g2a-heading text-5xl leading-none text-white">
                      R$ {plan.price}
                    </span>
                    <span className="text-sm font-semibold text-white/56">
                      /mês
                    </span>
                  </p>

                  <ul className="mt-7 flex flex-col gap-3">
                    {plan.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-2.5 text-sm leading-6 text-white/78"
                      >
                        <svg
                          className="mt-1 h-4 w-4 shrink-0 text-primary-lighter"
                          viewBox="0 0 24 24"
                          fill="none"
                          aria-hidden="true"
                        >
                          <path
                            d="M20 6 9 17l-5-5"
                            stroke="currentColor"
                            strokeWidth={2.4}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        {bullet}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-8">
                    <TrackedCtaLink
                      href={`${planDest}?plan=${plan.id}`}
                      position={`pricing_card_${plan.id}`}
                      destination={planDestination}
                      target={
                        planDestination === "desk_signup" ? "_blank" : undefined
                      }
                      rel={
                        planDestination === "desk_signup"
                          ? "noreferrer"
                          : undefined
                      }
                      className={`motion-press inline-flex min-h-13 w-full items-center justify-center rounded-full px-6 py-3 text-sm font-semibold ${
                        plan.highlighted
                          ? "shine-pass bg-primary-light text-white shadow-[0_10px_40px_-12px_rgba(13,170,191,0.75)] hover:bg-primary-lighter"
                          : "border border-white/28 bg-white/8 text-white hover:bg-white/16"
                      }`}
                    >
                      Assinar agora
                    </TrackedCtaLink>
                    <p className="mt-3 text-center text-xs leading-5 text-white/56">
                      {trialReassurance}
                    </p>
                  </div>
                </article>
              </PricingTierViewTracker>
            ))}
          </div>

          <p className="mt-12 text-center text-base leading-7 text-white/70">
            Prefere conversar antes de escolher?{" "}
            <TrackedCtaLink
              href={whatsappHref}
              position="pricing_secondary"
              destination={hasWhatsapp ? "whatsapp" : "trial"}
              target={hasWhatsapp ? "_blank" : undefined}
              rel={hasWhatsapp ? "noreferrer" : undefined}
              className="font-semibold text-primary-lighter underline underline-offset-4 hover:text-white"
            >
              Fale com a Gênia no WhatsApp.
            </TrackedCtaLink>
          </p>
        </div>
      </section>

      {/* ================= CONFIANÇA (cream, como a base) ================= */}
      <section
        id="confianca"
        className="bg-[var(--cream)] px-5 py-20 sm:px-8 md:py-28"
      >
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Confiança primeiro
            </p>
            <h2 className="g2a-heading mt-4 text-4xl leading-[1.08] text-[var(--g2a-ink)] sm:text-5xl">
              Organização sem susto, sem envio solto, sem pagamento automático.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-[#405052]">
              O poder da Gênia está em lembrar, preparar, resumir e organizar.
              As decisões continuam com você, principalmente quando envolvem
              mensagens, dinheiro ou compromisso sensível.
            </p>
            <TrackedCtaLink
              href="/diagnostico"
              position="trust_section"
              destination="diagnostico"
              className="motion-press shine-pass mt-8 inline-flex min-h-14 items-center justify-center rounded-full bg-primary-light px-8 py-4 text-base font-semibold text-white shadow-[0_10px_40px_-10px_rgba(13,170,191,0.55)] hover:bg-primary-lighter"
            >
              Fazer meu raio-x da rotina
            </TrackedCtaLink>
          </div>

          <div className="grid gap-4">
            <ApprovalPanelCard className="hidden md:block" />
            <div className="grid gap-4 sm:grid-cols-2">
              {boundaries.map((item) => (
                <div
                  key={item}
                  className="motion-card rounded-xl border border-[#d8d0bd] bg-white/78 p-5 hover:border-primary-light/45"
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon name="shield" />
                  </div>
                  <p className="font-semibold leading-6 text-[#081314]">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ NOVO: FAQ que adianta a conversa (6 itens) ============ */}
      <section id="faq" className="bg-background px-5 py-20 sm:px-8 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Dúvidas frequentes
            </p>
            <h2 className="g2a-heading mt-4 text-4xl leading-[1.08] text-[var(--g2a-ink)] sm:text-5xl">
              Tudo que normalmente fica para a conversa — adiantado aqui.
            </h2>
            <p className="mt-5 max-w-md text-lg leading-8 text-muted-foreground">
              Ficou algo de fora?{" "}
              <TrackedCtaLink
                href={whatsappHref}
                position="faq_section"
                destination={hasWhatsapp ? "whatsapp" : "trial"}
                target={hasWhatsapp ? "_blank" : undefined}
                rel={hasWhatsapp ? "noreferrer" : undefined}
                className="font-semibold text-primary underline underline-offset-4 hover:text-primary-light"
              >
                Pergunte direto para a Gênia.
              </TrackedCtaLink>
            </p>
          </div>
          <div className="grid gap-4">
            {faqs.map((faq, index) => (
              <details
                key={faq.question}
                open={index === 0}
                className="motion-card group rounded-xl border border-border bg-muted/55 hover:border-primary-light/45"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6 text-lg font-bold tracking-[-0.01em] text-[#081314] sm:text-xl [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <svg
                    className="h-5 w-5 shrink-0 text-primary transition-transform duration-200 group-open:rotate-180"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="m6 9 6 6 6-6"
                      stroke="currentColor"
                      strokeWidth={2.2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </summary>
                <p className="px-6 pb-6 leading-7 text-muted-foreground">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ================= COMEÇAR (teal, como a base) ================= */}
      <section
        id="comecar"
        className="relative overflow-hidden bg-primary px-5 py-20 text-white sm:px-8 md:py-28"
      >
        <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-3xl lg:max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/80">
              Próximo passo
            </p>
            <h2 className="g2a-heading mt-4 text-4xl leading-[1.08] text-white sm:text-5xl">
              Comece com uma conversa, não com configuração.
            </h2>
            <p className="mt-5 text-lg leading-8 text-white/70">
              Conte o que está espalhado na sua rotina e veja como a Gênia pode
              transformar WhatsApp, email e calendário em uma rotina mais leve.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row lg:shrink-0">
            <TrackedCtaLink
              href={whatsappHref}
              position="final_cta"
              destination={hasWhatsapp ? "whatsapp" : "trial"}
              target={hasWhatsapp ? "_blank" : undefined}
              rel={hasWhatsapp ? "noreferrer" : undefined}
              className="motion-press shine-pass inline-flex min-h-14 shrink-0 items-center justify-center gap-2 rounded-full bg-primary-light px-8 py-4 text-base font-semibold text-white shadow-[0_10px_40px_-10px_rgba(13,170,191,0.6)] hover:bg-primary-lighter"
            >
              <Icon name="whatsapp" solid />
              Falar com a Gênia
            </TrackedCtaLink>
            <TrackedCtaLink
              href="#planos"
              position="final_cta_planos"
              destination="planos"
              className="motion-press inline-flex min-h-14 shrink-0 items-center justify-center rounded-full border border-white/36 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur hover:bg-white/20"
            >
              Ver planos e assinar
            </TrackedCtaLink>
          </div>
        </div>
      </section>

      {/* ============ NOVO: widget flutuante — a própria Gênia atende.
           Invisível (CSS) até o hero sair do viewport; some quando o bloco
           final de CTA entra. Toggle via script inline abaixo. ============ */}
      <div id="g2a-widget" className="g2a-widget">
        <TrackedCtaLink
          href={whatsappHref}
          position="floating_widget"
          destination={hasWhatsapp ? "whatsapp" : "trial"}
          target={hasWhatsapp ? "_blank" : undefined}
          rel={hasWhatsapp ? "noreferrer" : undefined}
          className="motion-press inline-flex min-h-12 items-center gap-2.5 rounded-full bg-primary-light py-3 pl-4 pr-5 text-sm font-bold text-white shadow-[0_18px_50px_-14px_rgba(13,170,191,0.85)] hover:bg-primary-lighter"
        >
          <Icon name="whatsapp" solid />
          Fala com a Gênia agora
        </TrackedCtaLink>
      </div>
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){var w=document.getElementById('g2a-widget');var hero=document.getElementById('g2a-hero');var end=document.getElementById('comecar');if(!w||!hero||!end||!('IntersectionObserver'in window))return;var heroOut=false,endIn=false;function sync(){w.classList.toggle('is-visible',heroOut&&!endIn);}new IntersectionObserver(function(e){heroOut=!e[0].isIntersecting;sync();},{threshold:0}).observe(hero);new IntersectionObserver(function(e){endIn=e[0].isIntersecting;sync();},{threshold:0}).observe(end);})();`,
        }}
      />
    </main>
  );
}

function Icon({ name, solid = false }: { name: string; solid?: boolean }) {
  if (name === "whatsapp") {
    return (
      <svg
        className={`${solid ? "h-5 w-5 fill-[#25d366]" : "h-6 w-6 fill-current"}`}
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.016 1.04-1.016 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884M20.463 3.488A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
      </svg>
    );
  }

  const baseProps = {
    className: "h-6 w-6",
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": true,
  };

  const strokeProps = {
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 2,
  };

  if (name === "audio") {
    return (
      <svg {...baseProps}>
        <path d="M4 12h2M9 7v10M12 4v16M15 8v8M18 11v2M21 9v6" {...strokeProps} />
      </svg>
    );
  }

  if (name === "calendar") {
    return (
      <svg {...baseProps}>
        <path d="M7 3v3M17 3v3M4 9h16M6 5h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" {...strokeProps} />
      </svg>
    );
  }

  if (name === "clock") {
    return (
      <svg {...baseProps}>
        <circle cx="12" cy="12" r="8" {...strokeProps} />
        <path d="M12 7v5l3 2" {...strokeProps} />
      </svg>
    );
  }

  if (name === "send") {
    return (
      <svg {...baseProps}>
        <path d="M21 3 10 14M21 3l-7 18-4-7-7-4 18-7Z" {...strokeProps} />
      </svg>
    );
  }

  if (name === "mail") {
    return (
      <svg {...baseProps}>
        <path d="M4 6h16v12H4V6Z" {...strokeProps} />
        <path d="m4 7 8 6 8-6" {...strokeProps} />
      </svg>
    );
  }

  if (name === "money") {
    return (
      <svg {...baseProps}>
        <rect x="3" y="6" width="18" height="12" rx="2" {...strokeProps} />
        <circle cx="12" cy="12" r="2.5" {...strokeProps} />
        <path d="M6 9h1M17 15h1" {...strokeProps} />
      </svg>
    );
  }

  if (name === "image") {
    return (
      <svg {...baseProps}>
        <rect x="4" y="5" width="16" height="14" rx="2" {...strokeProps} />
        <circle cx="9" cy="10" r="1.5" {...strokeProps} />
        <path d="m5 17 4.5-4 3.5 3 2.5-2.5L20 17" {...strokeProps} />
      </svg>
    );
  }

  if (name === "group") {
    return (
      <svg {...baseProps}>
        <path d="M8 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM16 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3 20a5 5 0 0 1 10 0M11 20a5 5 0 0 1 10 0" {...strokeProps} />
      </svg>
    );
  }

  if (name === "approve") {
    return (
      <svg {...baseProps}>
        <path d="M20 6 9 17l-5-5" {...strokeProps} />
      </svg>
    );
  }

  if (name === "shield") {
    return (
      <svg {...baseProps}>
        <path d="M12 3 19 6v5c0 4.6-2.8 8-7 10-4.2-2-7-5.4-7-10V6l7-3Z" {...strokeProps} />
        <path d="m9 12 2 2 4-5" {...strokeProps} />
      </svg>
    );
  }

  if (name === "chat") {
    return (
      <svg {...baseProps}>
        <path d="M5 6.5A4.5 4.5 0 0 1 9.5 2h5A4.5 4.5 0 0 1 19 6.5v3A4.5 4.5 0 0 1 14.5 14H10l-4.5 3v-4.1A4.48 4.48 0 0 1 5 10.5v-4Z" {...strokeProps} />
        <path d="M9 7h6M9 10h4" {...strokeProps} />
      </svg>
    );
  }

  if (name === "spark") {
    return (
      <svg {...baseProps}>
        <path d="M12 2l1.6 6.4L20 10l-6.4 1.6L12 18l-1.6-6.4L4 10l6.4-1.6L12 2Z" {...strokeProps} />
        <path d="M19 16l.7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16Z" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg {...baseProps}>
      <path d="M7 3.5h10a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H7a3 3 0 0 1-3-3v-11a3 3 0 0 1 3-3Z" {...strokeProps} />
      <path d="M8 3.5v17M11 8h4M11 12h3" {...strokeProps} />
    </svg>
  );
}
