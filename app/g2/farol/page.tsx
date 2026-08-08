import Image from "next/image";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import LandingAnalytics from "@/components/analytics/LandingAnalytics";
import TrackedCtaLink from "@/components/analytics/TrackedCtaLink";
import PricingTierViewTracker from "@/components/marketing/PricingTierViewTracker";

import "./tokens.css";

// Variante g2/farol — padrão NewByte pleno: uma fonte (Plus Jakarta Sans),
// um navy (#03142C), um azul de ação (#015EEA), hero escuro com feixe aurora,
// ritmo claro/escuro e Antes/Com a Gênia por momento do dia.
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700", "800"],
});

const whatsappHref = process.env.NEXT_PUBLIC_WHATSAPP_URL?.trim() || "/trial";
const hasWhatsapp = whatsappHref.startsWith("http");

const planDest = process.env.NEXT_PUBLIC_DESK_SIGNUP_URL?.trim() || "/trial";
const planDestination: "desk_signup" | "trial" = planDest.startsWith("http")
  ? "desk_signup"
  : "trial";
const trialReassurance = "Garantia de 7 dias. Não gostou, devolvemos tudo.";

const navLinks = [
  { href: "#virada", label: "A virada" },
  { href: "#organiza", label: "O que ela faz" },
  { href: "#funciona", label: "Como funciona" },
  { href: "#planos", label: "Planos" },
  { href: "#faq", label: "Perguntas" },
];

// FATOS DE VENDA TRAVADOS — copiados verbatim de app/genia/page.tsx.
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

// Conversa do hero — mensagens que a página-base já usa no mockup dela
// (cena das 15:10, mensagem agendada + aprovação).
const heroChat: FarolChatMessage[] = [
  { from: "user", text: "Deixa esse recado agendado para as 16:00?" },
  {
    from: "genia",
    text: "Pronto. Fica agendado e só sai depois do seu ok.",
    meta: "15:10",
  },
];
const heroApproval = { question: "Aprovar e enviar às 16:00?" };

const promiseCards = [
  {
    icon: "whatsapp",
    pill: "Sem app novo",
    title: "Você conversa pelo WhatsApp.",
    body: "A Gênia vive nos canais que você já usa: WhatsApp, email e calendário.",
  },
  {
    icon: "approve",
    pill: "Com aprovação",
    title: "Nada sai no automático sem você.",
    body: "Ela prepara, lembra e agenda, mas pede confirmação antes de enviar mensagens.",
  },
  {
    icon: "notebook",
    pill: "Aprende com você",
    title: "Quanto mais contexto, melhor a ajuda.",
    body: "Você ensina contas, rotinas, pessoas importantes, tom de voz e preferências.",
  },
];

// Antes / Com a Gênia — por MOMENTO do dia (coração do benchmark NewByte).
const momentPairs = [
  {
    moment: "À noite",
    before: {
      title: "Cliente chama às 22h.",
      body: "Você só vê de manhã — e ele já comprou de outro.",
    },
    after: {
      title: "Resposta em segundos.",
      body: "No seu tom, com aprovação no que importa.",
    },
  },
  {
    moment: "No almoço",
    before: {
      title: "14 conversas acumuladas.",
      body: "Você volta e responde no susto, fora de ordem, com pressa.",
    },
    after: {
      title: "Triadas e respondidas.",
      body: "O urgente separado do resto, resumo pronto e respostas esperando só o seu ok.",
    },
  },
  {
    moment: "Fim do mês",
    before: {
      title: "O follow-up ficou para depois.",
      body: "O orçamento que você prometeu responder morreu na lista de amanhã.",
    },
    after: {
      title: "Pronto para o seu ok.",
      body: "A Gênia prepara o retorno na hora certa — e você só aprova o envio.",
    },
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

const learningSteps = [
  {
    step: "01",
    title: "Você mostra o que está espalhado",
    body: "Começa com uma conversa simples sobre mensagens, agenda, contas, grupos e lembretes.",
  },
  {
    step: "02",
    title: "A gente ajuda a ensinar a Gênia",
    body: "O onboarding é acompanhado para ela entender prioridades, pessoas importantes, tom e limites.",
  },
  {
    step: "03",
    title: "Ela organiza e propõe próximos passos",
    body: "Conversas, áudios, email e calendário viram resumo, lembrete, tarefa ou mensagem pronta.",
  },
  {
    step: "04",
    title: "Você aprova antes de qualquer envio",
    body: "Toda mensagem passa por você antes de sair. Ações sensíveis também.",
  },
];

// FAQ "tudo que você perguntaria na reunião" — respostas curtas e honestas,
// coerentes com a página-base (aprovação sempre, onboarding acompanhado,
// garantia de 7 dias, planos mensais).
const faqs = [
  {
    question: "Como funciona a ativação?",
    answer:
      "Você começa com uma conversa no WhatsApp, sem instalar nada. O onboarding é acompanhado: a gente ajuda você a ensinar sua rotina, suas prioridades e seu tom para a Gênia.",
  },
  {
    question: "Preciso trocar de número?",
    answer:
      "Não. A Gênia tem o número dela e você fala com ela como fala com qualquer contato. Seu número e seu WhatsApp continuam exatamente como estão.",
  },
  {
    question: "Em quanto tempo está rodando?",
    answer:
      "Os primeiros briefings e lembretes saem já nos primeiros dias. O valor cresce com o uso: quanto mais contexto você ensina, melhor ela ajuda.",
  },
  {
    question: "Tem fidelidade?",
    answer:
      "Não. Os planos são mensais e todo plano tem garantia de 7 dias: se não for para você, devolvemos o valor integral, sem perguntas.",
  },
  {
    question: "Quem aprova o que sai?",
    answer:
      "Você. A Gênia prepara, resume e agenda, mas nenhuma mensagem é enviada sem a sua aprovação — e ela não faz pagamento automático.",
  },
  {
    question: "Meus dados ficam onde?",
    answer:
      "Com você no controle. O que você ensina serve só para organizar a sua rotina, e nada sai sem o seu ok. Os detalhes estão na nossa página de privacidade, em /privacidade.",
  },
];

export const metadata: Metadata = {
  title: { absolute: "Gênia — sua secretária de IA no WhatsApp" },
  description:
    "A Gênia responde, lembra e organiza sua rotina pelo WhatsApp. Cada mensagem espera o seu ok: você aprova, e só então ela envia.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function GeniaG2FarolPage() {
  return (
    <main className={`g2-farol ${jakarta.variable}`}>
      <LandingAnalytics page="genia_g2_farol" />

      {/* ============ HERO ESCURO (navy + feixe aurora) ============ */}
      <section
        id="g2-hero"
        className="relative overflow-hidden bg-[var(--g2-navy)] text-white"
      >
        <div aria-hidden="true" className="g2-aurora" />

        {/* Nav */}
        <div className="relative z-20 mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
          <a href="/genia" className="flex items-center gap-3" aria-label="Gênia">
            <Image
              src="/images/soul-genia-profile-mark.png"
              alt=""
              width={40}
              height={40}
              className="h-10 w-10 rounded-xl"
            />
            <div>
              <p className="text-lg font-extrabold leading-none tracking-tight text-white">
                Gênia
              </p>
              <p className="mt-1 hidden whitespace-nowrap text-xs font-medium text-white/60 sm:block">
                Secretária de IA no WhatsApp
              </p>
            </div>
          </a>

          <nav
            className="hidden items-center gap-7 text-sm font-semibold text-white/80 lg:flex"
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
            className="motion-press inline-flex min-h-10 shrink-0 items-center whitespace-nowrap rounded-xl bg-[var(--g2-blue)] px-4 py-2 text-sm font-semibold text-white shadow-[0_12px_36px_-14px_rgba(1,94,234,0.9)] hover:bg-[var(--g2-blue-deep)]"
          >
            Testar a Gênia
          </TrackedCtaLink>
        </div>

        {/* Copy central */}
        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-5 pb-10 pt-12 text-center sm:px-8 md:pt-20">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/8 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[var(--g2-blue-bright)] ring-1 ring-white/12 backdrop-blur">
            <span className="aura-dot h-1.5 w-1.5 rounded-full bg-[var(--g2-cyan)]" />
            Secretária de IA no WhatsApp
          </p>

          <h1 className="mt-6 text-[clamp(2.25rem,9vw,4rem)] font-extrabold leading-[1.06] tracking-[-0.04em] text-white">
            Ela cuida do seu WhatsApp.
            <br />
            Você só{" "}
            <span className="text-[var(--g2-h1-blue)]">aprova</span>.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-[var(--g2-blue-soft)] sm:text-lg sm:leading-8">
            A Gênia prepara respostas, agenda recados e organiza compromissos,
            contas e lembretes pelo WhatsApp. Cada mensagem espera um toque seu
            — e nada sai no automático.
          </p>

          <div className="mt-8 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
            <TrackedCtaLink
              href={whatsappHref}
              position="hero_primary"
              destination={hasWhatsapp ? "whatsapp" : "trial"}
              target={hasWhatsapp ? "_blank" : undefined}
              rel={hasWhatsapp ? "noreferrer" : undefined}
              className="motion-press shine-pass inline-flex min-h-14 items-center justify-center gap-2 rounded-xl bg-[var(--g2-blue)] px-8 py-4 text-base font-semibold text-white shadow-[0_18px_50px_-18px_rgba(1,94,234,0.95)] hover:bg-[var(--g2-blue-deep)]"
            >
              <Icon name="whatsapp" solid />
              Testar a Gênia agora
            </TrackedCtaLink>
            <TrackedCtaLink
              href="#planos"
              position="hero_secondary"
              destination="planos"
              className="motion-press inline-flex min-h-14 items-center justify-center rounded-xl bg-white/10 px-8 py-4 text-base font-semibold text-white ring-1 ring-white/20 backdrop-blur hover:bg-white/16"
            >
              Ver planos
            </TrackedCtaLink>
          </div>

          <p className="mt-5 text-sm font-medium text-white/60">
            {trialReassurance}
          </p>

          {/* Mockup de conversa real */}
          <div className="relative z-10 mt-10 w-full max-w-sm md:mt-12">
            <FarolChatMockup messages={heroChat} approval={heroApproval} />
          </div>
        </div>

        {/* Respiro extra no mobile sob o mockup (widget flutuante). */}
        <div className="h-20 md:h-14" />
      </section>

      {/* ============ PROMESSA (branca) ============ */}
      <section className="relative bg-white px-5 py-16 sm:px-8 md:py-24">
        <div aria-hidden="true" className="g2-soft-shapes" />
        <div className="relative mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--g2-blue)]">
              Por que funciona
            </p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-[-0.03em] text-[var(--g2-navy)] sm:text-4xl">
              Uma secretária, não mais um app.
            </h2>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {promiseCards.map((card) => (
              <article
                key={card.pill}
                className="motion-card rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_20px_60px_-48px_rgba(3,20,44,0.5)] hover:border-[var(--g2-border-soft)]"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--g2-pill-bg)] text-[var(--g2-blue)]">
                    <Icon name={card.icon} />
                  </div>
                  <span className="rounded-full bg-[var(--g2-pill-bg)] px-3 py-1 text-xs font-bold text-[var(--g2-blue)]">
                    {card.pill}
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-extrabold leading-snug tracking-[-0.02em] text-[var(--g2-navy)]">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-500">
                  {card.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ ANTES / COM A GÊNIA (off-white) ============ */}
      <section
        id="virada"
        className="bg-[var(--g2-offwhite)] px-5 py-16 sm:px-8 md:py-24"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--g2-blue)]">
              A virada
            </p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-[-0.03em] text-[var(--g2-navy)] sm:text-4xl">
              O mesmo dia, antes e com a{" "}
              <span className="text-[var(--g2-blue)]">Gênia</span>.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-500">
              Não é sobre ter mais uma ferramenta. É sobre o que muda nos
              momentos em que a rotina costuma escapar.
            </p>
          </div>

          <div className="mt-12 flex flex-col gap-10">
            {momentPairs.map((pair) => (
              <div key={pair.moment}>
                <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-[var(--g2-pill-bg)] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-[var(--g2-blue)]">
                  <Icon name="clock" small />
                  {pair.moment}
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                  {/* Antes — apagado */}
                  <article className="rounded-2xl border border-slate-200 bg-[var(--g2-before-bg)] p-6">
                    <div className="flex items-center gap-2">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-200 text-slate-500">
                        <WarnIcon />
                      </span>
                      <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
                        Antes
                      </p>
                    </div>
                    <h3 className="mt-4 text-xl font-extrabold leading-snug tracking-[-0.02em] text-slate-500">
                      {pair.before.title}
                    </h3>
                    <p className="mt-2 leading-7 text-slate-400">
                      {pair.before.body}
                    </p>
                  </article>

                  {/* Com a Gênia — vivo */}
                  <article className="motion-card rounded-2xl border border-[var(--g2-border-soft)] bg-white p-6 shadow-[0_24px_70px_-48px_rgba(1,94,234,0.55)]">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--g2-blue)] text-white">
                          <CheckIcon />
                        </span>
                        <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--g2-blue)]">
                          Com a Gênia
                        </p>
                      </div>
                      <span className="rounded-full bg-[var(--g2-pill-bg)] px-3 py-1 text-xs font-bold text-[var(--g2-blue)]">
                        Gênia
                      </span>
                    </div>
                    <h3 className="mt-4 text-xl font-extrabold leading-snug tracking-[-0.02em] text-[var(--g2-navy)]">
                      {pair.after.title}
                    </h3>
                    <p className="mt-2 leading-7 text-slate-500">
                      {pair.after.body}
                    </p>
                  </article>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-center gap-4">
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {[
                "Nada sai sem a sua aprovação",
                "Sem app novo para instalar",
                "Onboarding acompanhado",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-sm font-semibold text-[var(--g2-navy)]"
                >
                  <span className="text-[var(--g2-blue)]">
                    <CheckIcon />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <TrackedCtaLink
              href={whatsappHref}
              position="virada_section"
              destination={hasWhatsapp ? "whatsapp" : "trial"}
              target={hasWhatsapp ? "_blank" : undefined}
              rel={hasWhatsapp ? "noreferrer" : undefined}
              className="motion-press shine-pass inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[var(--g2-blue)] px-7 py-3 text-sm font-semibold text-white shadow-[0_18px_50px_-20px_rgba(1,94,234,0.9)] hover:bg-[var(--g2-blue-deep)]"
            >
              <Icon name="whatsapp" solid />
              Quero viver o depois
            </TrackedCtaLink>
          </div>
        </div>
      </section>

      {/* ============ O QUE ELA ORGANIZA (branca) ============ */}
      <section id="organiza" className="bg-white px-5 py-16 sm:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--g2-blue)]">
                Na prática
              </p>
              <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-[-0.03em] text-[var(--g2-navy)] sm:text-4xl">
                O que a Gênia tira da sua cabeça todo dia.
              </h2>
            </div>
            <p className="max-w-xl leading-7 text-slate-500">
              Ela não vira um painel para você alimentar. Conversas, áudios,
              emails, calendário e combinados viram resumo, lembrete, mensagem
              agendada e próximo passo.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-5 xl:grid-cols-4">
            {capabilities.map((item) => (
              <article
                key={item.title}
                className="motion-card rounded-2xl border border-slate-200 bg-white p-4 hover:border-[var(--g2-border-soft)] sm:p-6"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--g2-pill-bg)] text-[var(--g2-blue)] sm:h-11 sm:w-11">
                  <Icon name={item.icon} />
                </div>
                <h3 className="text-base font-extrabold leading-snug tracking-[-0.01em] text-[var(--g2-navy)] sm:text-lg">
                  {item.title}
                </h3>
                <p className="mt-2 text-[13px] leading-5 text-slate-500 sm:text-sm sm:leading-6">
                  {item.body}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-start justify-between gap-5 rounded-2xl bg-[var(--g2-offwhite)] p-6 ring-1 ring-slate-200 sm:flex-row sm:items-center">
            <p className="text-lg font-extrabold tracking-[-0.02em] text-[var(--g2-navy)]">
              Quer ver como isso fica na sua rotina?
            </p>
            <TrackedCtaLink
              href={whatsappHref}
              position="capabilities_section"
              destination={hasWhatsapp ? "whatsapp" : "trial"}
              target={hasWhatsapp ? "_blank" : undefined}
              rel={hasWhatsapp ? "noreferrer" : undefined}
              className="motion-press inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-[var(--g2-blue)] px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_50px_-20px_rgba(1,94,234,0.9)] hover:bg-[var(--g2-blue-deep)]"
            >
              <Icon name="whatsapp" solid />
              Falar com a Gênia
            </TrackedCtaLink>
          </div>
        </div>
      </section>

      {/* ============ COMO FUNCIONA (navy — quebra o miolo claro) ============ */}
      <section
        id="funciona"
        className="bg-[var(--g2-navy)] px-5 py-16 text-white sm:px-8 md:py-24"
      >
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--g2-blue-bright)]">
              Como funciona
            </p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-[-0.03em] text-white sm:text-4xl">
              Você não configura mais um app. Você ensina uma profissional.
            </h2>
            <p className="mt-4 max-w-xl leading-7 text-[var(--g2-blue-soft)]">
              O começo é assistido. A Gênia aprende sua rotina, entende seus
              limites e só ganha mais iniciativa conforme você corrige, aprova
              e ensina o que importa.
            </p>
            <ul className="mt-6 flex flex-col gap-2.5">
              {[
                "Onboarding acompanhado, não manual de instruções",
                "Aprovação antes de qualquer envio",
                "Melhora com o uso, semana após semana",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-sm font-semibold text-white"
                >
                  <span className="text-[var(--g2-blue-bright)]">
                    <CheckIcon />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-4">
            {learningSteps.map((item) => (
              <article
                key={item.step}
                className="motion-card grid gap-4 rounded-2xl border border-white/12 bg-white/[0.06] p-5 hover:border-[rgba(77,159,255,0.35)] sm:grid-cols-[3.25rem_1fr]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--g2-blue)] text-sm font-extrabold text-white">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-lg font-extrabold leading-snug tracking-[-0.01em] text-white">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-6 text-white/65">
                    {item.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PLANOS (ESCURA — momento de decisão) ============ */}
      <section
        id="planos"
        className="relative overflow-hidden border-t border-white/10 bg-[var(--g2-navy-2)] px-5 py-16 text-white sm:px-8 md:py-24"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-44 left-1/2 h-[26rem] w-[44rem] -translate-x-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(1,94,234,0.32), transparent)",
          }}
        />

        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--g2-blue-bright)]">
              Planos
            </p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-[-0.03em] text-white sm:text-4xl">
              Escolha como a Gênia entra na sua rotina.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl leading-7 text-[var(--g2-blue-soft)]">
              Todo plano tem garantia de 7 dias. Se não for para você,
              devolvemos o valor integral.
            </p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3 lg:items-stretch">
            {plans.map((plan) => (
              <PricingTierViewTracker
                key={plan.id}
                tier={plan.tier}
                className={`h-full ${plan.highlighted ? "lg:scale-[1.03]" : ""}`}
              >
                <article
                  className={`motion-card relative flex h-full flex-col rounded-2xl p-6 sm:p-7 ${
                    plan.highlighted
                      ? "border border-[rgba(77,159,255,0.5)] bg-white/[0.09] shadow-[0_30px_90px_-46px_rgba(1,94,234,0.9)]"
                      : "border border-white/[0.14] bg-white/[0.07] hover:border-[rgba(77,159,255,0.4)]"
                  }`}
                >
                  {plan.highlighted ? (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[var(--g2-blue)] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-white shadow-[0_12px_32px_-12px_rgba(1,94,234,1)]">
                      Mais escolhido
                    </span>
                  ) : null}

                  <h3 className="text-2xl font-extrabold leading-snug tracking-[-0.02em] text-white">
                    {plan.name}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-white/64">
                    {plan.pitch}
                  </p>

                  <p className="mt-6 flex items-baseline gap-1.5">
                    <span className="text-5xl font-extrabold leading-none tracking-[-0.03em] text-white">
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
                        className="flex items-start gap-2.5 text-sm leading-6 text-white/80"
                      >
                        <span className="mt-1 text-[var(--g2-blue-bright)]">
                          <CheckIcon />
                        </span>
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
                      className={`motion-press inline-flex min-h-13 w-full items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold ${
                        plan.highlighted
                          ? "shine-pass bg-[var(--g2-blue)] text-white shadow-[0_18px_50px_-18px_rgba(1,94,234,0.95)] hover:bg-[var(--g2-blue-deep)]"
                          : "bg-white/8 text-white ring-1 ring-white/24 hover:bg-white/14"
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

          <p className="mt-10 text-center leading-7 text-[var(--g2-blue-soft)]">
            Prefere conversar antes de escolher?{" "}
            <TrackedCtaLink
              href={whatsappHref}
              position="pricing_secondary"
              destination={hasWhatsapp ? "whatsapp" : "trial"}
              target={hasWhatsapp ? "_blank" : undefined}
              rel={hasWhatsapp ? "noreferrer" : undefined}
              className="font-semibold text-[var(--g2-blue-bright)] underline underline-offset-4 hover:text-white"
            >
              Fale com a Gênia no WhatsApp.
            </TrackedCtaLink>
          </p>
        </div>
      </section>

      {/* ============ FAQ (branca) ============ */}
      <section id="faq" className="bg-white px-5 py-16 sm:px-8 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--g2-blue)]">
              Sem letra miúda
            </p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-[-0.03em] text-[var(--g2-navy)] sm:text-4xl">
              Tudo que você perguntaria na reunião — adiantado aqui.
            </h2>
            <p className="mt-4 max-w-md leading-7 text-slate-500">
              Se sobrar alguma dúvida, é só chamar. Quem responde é a própria
              Gênia.
            </p>
          </div>
          <div className="grid gap-3">
            {faqs.map((faq, index) => (
              <details
                key={faq.question}
                open={index === 0}
                className="motion-card group rounded-2xl border border-slate-200 bg-[var(--g2-offwhite)] hover:border-[var(--g2-border-soft)]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-base font-extrabold tracking-[-0.01em] text-[var(--g2-navy)] sm:text-lg [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <svg
                    className="h-5 w-5 shrink-0 text-[var(--g2-blue)] transition-transform duration-200 group-open:rotate-180"
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
                <p className="px-5 pb-5 text-sm leading-6 text-slate-500 sm:text-base sm:leading-7">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CHAMADA FINAL (escura, faz papel de footer escuro) ============ */}
      <section
        id="g2-final"
        className="relative overflow-hidden bg-[var(--g2-navy)] px-5 py-16 text-white sm:px-8 md:py-24"
      >
        <div aria-hidden="true" className="g2-aurora opacity-60" />
        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
          <h2 className="text-3xl font-extrabold leading-tight tracking-[-0.03em] text-white sm:text-4xl">
            Comece com uma conversa,
            <br className="hidden sm:block" /> não com configuração.
          </h2>
          <p className="mt-4 max-w-2xl leading-7 text-[var(--g2-blue-soft)]">
            Conte o que está espalhado na sua rotina e veja como a Gênia
            transforma WhatsApp, email e calendário em um dia mais leve.
          </p>
          <div className="mt-8 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
            <TrackedCtaLink
              href={whatsappHref}
              position="final_cta"
              destination={hasWhatsapp ? "whatsapp" : "trial"}
              target={hasWhatsapp ? "_blank" : undefined}
              rel={hasWhatsapp ? "noreferrer" : undefined}
              className="motion-press shine-pass inline-flex min-h-14 items-center justify-center gap-2 rounded-xl bg-[var(--g2-blue)] px-8 py-4 text-base font-semibold text-white shadow-[0_18px_50px_-18px_rgba(1,94,234,0.95)] hover:bg-[var(--g2-blue-deep)]"
            >
              <Icon name="whatsapp" solid />
              Falar com a Gênia
            </TrackedCtaLink>
            <TrackedCtaLink
              href="#planos"
              position="final_cta_planos"
              destination="planos"
              className="motion-press inline-flex min-h-14 items-center justify-center rounded-xl bg-white/10 px-8 py-4 text-base font-semibold text-white ring-1 ring-white/20 backdrop-blur hover:bg-white/16"
            >
              Ver planos e assinar
            </TrackedCtaLink>
          </div>
          <p className="mt-5 text-sm font-medium text-white/60">
            {trialReassurance}
          </p>
        </div>
      </section>

      {/* ============ WIDGET FLUTUANTE wa.me ============ */}
      {/* Escondido por padrão (.g2-float); o script inline abaixo o mostra
          quando o hero sai do viewport e o esconde quando a chamada final ou
          o footer global entram — evita cobrir o mockup e duplicar o CTA. */}
      <div id="g2-float" className="g2-float fixed bottom-5 right-5 z-50">
        <TrackedCtaLink
          href={whatsappHref}
          position="floating_whatsapp"
          destination={hasWhatsapp ? "whatsapp" : "trial"}
          target={hasWhatsapp ? "_blank" : undefined}
          rel={hasWhatsapp ? "noreferrer" : undefined}
          className="motion-press flex items-center gap-2.5 rounded-full bg-[var(--g2-blue)] py-3 pl-4 pr-5 text-sm font-semibold text-white shadow-[0_20px_50px_-16px_rgba(1,94,234,0.95)] ring-1 ring-white/20 hover:bg-[var(--g2-blue-deep)]"
        >
          <Icon name="whatsapp" solid />
          <span className="hidden sm:inline">Fala com a Gênia agora</span>
          <span className="sm:hidden">Fala com a Gênia</span>
        </TrackedCtaLink>
      </div>

      {/* Visibilidade do widget flutuante. Um client component exigiria
          "use client" num 3º arquivo (esta página exporta metadata), então a
          mesma lógica de IntersectionObserver vai como script inline vanilla. */}
      <script
        dangerouslySetInnerHTML={{
          __html:
            '(function(){var w=document.getElementById("g2-float");var hero=document.getElementById("g2-hero");var end=document.getElementById("g2-final");var foot=document.querySelector("footer");if(!w||!hero||!("IntersectionObserver" in window))return;var heroOut=false,endIn=false,footIn=false;function sync(){w.classList.toggle("g2-float-visible",heroOut&&!endIn&&!footIn);}new IntersectionObserver(function(e){heroOut=!e[0].isIntersecting;sync();},{threshold:0}).observe(hero);if(end){new IntersectionObserver(function(e){endIn=e[0].isIntersecting;sync();},{threshold:0.15}).observe(end);}if(foot){new IntersectionObserver(function(e){footIn=e[0].isIntersecting;sync();},{threshold:0.05}).observe(foot);}})();',
        }}
      />
    </main>
  );
}

/* ============ Mockup de conversa (cópia inline do WhatsAppChatMockup,
   repintado nos tokens farol — a versão compartilhada depende de
   --v3-aprova-glow do v3-tokens.css, que esta variante não importa) ============ */

type FarolChatMessage = {
  from: "genia" | "user";
  text: string;
  meta?: string;
};

function FarolChatMockup({
  messages,
  approval,
  className,
}: {
  messages: FarolChatMessage[];
  approval?: { question: string };
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`rounded-2xl bg-[var(--g2-panel)] p-3.5 text-left shadow-[0_30px_80px_-40px_rgba(1,94,234,0.7)] ring-1 ring-white/12 ${className ?? ""}`}
    >
      <div className="mb-3 flex items-center gap-2">
        <Image
          src="/images/soul-genia-profile-mark.png"
          alt=""
          width={20}
          height={20}
          className="h-5 w-5 rounded-md"
        />
        <span className="text-[11px] font-bold tracking-wide text-[var(--g2-blue-bright)]">
          Gênia
        </span>
        <span className="ml-auto flex items-center gap-1.5 text-[10px] font-semibold text-white/45">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          online
        </span>
      </div>

      <div className="flex flex-col gap-2">
        {messages.map((message, index) => (
          <div
            key={index}
            className={
              message.from === "genia"
                ? "max-w-[88%] rounded-2xl rounded-tl-md border border-[rgba(77,159,255,0.28)] bg-white/[0.08] px-3 py-2"
                : "ml-auto max-w-[88%] rounded-2xl rounded-tr-md bg-[rgba(1,94,234,0.32)] px-3 py-2"
            }
          >
            <p
              className={`text-xs leading-5 ${
                message.from === "genia" ? "text-white/85" : "text-white/90"
              }`}
            >
              {message.text}
            </p>
            {message.meta ? (
              <p className="mt-1 text-right text-[10px] font-medium text-white/40">
                {message.meta}
              </p>
            ) : null}
          </div>
        ))}
      </div>

      {approval ? (
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-[rgba(77,159,255,0.3)] bg-white/[0.05] px-3 py-2.5">
          <p className="text-[11px] font-semibold text-white/80">
            {approval.question}
          </p>
          <div className="flex items-center gap-1.5">
            <span className="rounded-full bg-[var(--g2-blue)] px-3 py-1 text-[10px] font-bold text-white">
              Aprovar
            </span>
            <span className="rounded-full border border-white/25 px-3 py-1 text-[10px] font-semibold text-white/75">
              Editar
            </span>
          </div>
        </div>
      ) : null}
    </div>
  );
}

/* ============ Ícones (cópia inline da página-base) ============ */

function CheckIcon() {
  return (
    <svg
      className="h-4 w-4 shrink-0"
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
  );
}

function WarnIcon() {
  return (
    <svg
      className="h-4 w-4 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 4 2.8 19.6h18.4L12 4Z"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 10v4M12 16.8v.2"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </svg>
  );
}

function Icon({
  name,
  solid = false,
  small = false,
}: {
  name: string;
  solid?: boolean;
  small?: boolean;
}) {
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
    className: small ? "h-4 w-4" : "h-6 w-6",
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

  return (
    <svg {...baseProps}>
      <path d="M7 3.5h10a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H7a3 3 0 0 1-3-3v-11a3 3 0 0 1 3-3Z" {...strokeProps} />
      <path d="M8 3.5v17M11 8h4M11 12h3" {...strokeProps} />
    </svg>
  );
}
