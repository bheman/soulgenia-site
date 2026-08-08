import Image from "next/image";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import LandingAnalytics from "@/components/analytics/LandingAnalytics";
import TrackedCtaLink from "@/components/analytics/TrackedCtaLink";
import PricingTierViewTracker from "@/components/marketing/PricingTierViewTracker";
import WhatsAppChatMockup, {
  type ChatMockupMessage,
} from "@/components/marketing/WhatsAppChatMockup";
import FloatingCta from "./FloatingCta";

import "./tokens.css";

// Variante meianoite (design-factory G2): estrutura NewByte — navy profundo,
// Plus Jakarta Sans, uma única cor de ação — mas o azul deles trocado pelo
// teal da própria Gênia (teste de continuidade de marca).
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
});

const whatsappHref = process.env.NEXT_PUBLIC_WHATSAPP_URL?.trim() || "/trial";
const hasWhatsapp = whatsappHref.startsWith("http");

const planDest = process.env.NEXT_PUBLIC_DESK_SIGNUP_URL?.trim() || "/trial";
const planDestination: "desk_signup" | "trial" = planDest.startsWith("http")
  ? "desk_signup"
  : "trial";
const trialReassurance = "Garantia de 7 dias. Não gostou, devolvemos tudo.";

// Fatos de venda VERBATIM da página-base (/genia).
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

// Conversa da base (dayMoments 11:20 + 15:10, verbatim) para o mockup do hero.
const heroChat: ChatMockupMessage[] = [
  { from: "user", text: "Consegue resumir o grupo pra mim?" },
  {
    from: "genia",
    text: "Resumo pronto: as decisões, as datas combinadas e o que ainda espera a sua resposta.",
    meta: "11:20",
  },
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
];

// Antes / Com a Gênia — por momento da vida de quem atende (adaptação NewByte).
const moments = [
  {
    label: "À noite",
    before: {
      title: "Cliente chama às 22h.",
      body: "Você só vê de manhã. A conversa esfriou e a resposta chega tarde.",
    },
    after: {
      title: "Resposta em segundos.",
      body: "A Gênia prepara a resposta na hora — e envia depois da sua aprovação.",
    },
  },
  {
    label: "No almoço",
    before: {
      title: "14 conversas acumuladas.",
      body: "Grupos, áudios e perguntas esperando você largar o prato para responder.",
    },
    after: {
      title: "Triadas e respondidas.",
      body: "Ela separa decisão, data, valor e pergunta — e deixa as respostas prontas para o seu ok.",
    },
  },
  {
    label: "Fim do mês",
    before: {
      title: "Follow-up esquecido.",
      body: "Aquele retorno importante ficou para depois — e depois nunca chegou.",
    },
    after: {
      title: "Feito sem você lembrar.",
      body: "Ela puxa o follow-up sozinha, prepara a mensagem e você só aprova o envio.",
    },
  },
];

const faqs = [
  {
    question: "Como a Gênia é ativada?",
    answer:
      "Você escolhe um plano e o começo é uma conversa, não uma configuração. No onboarding acompanhado ela aprende sua rotina, suas pessoas importantes e seus limites.",
  },
  {
    question: "Preciso trocar de número?",
    answer:
      "Não. A Gênia conversa com você no seu WhatsApp de sempre. Sem app novo, sem número novo, sem instalação.",
  },
  {
    question: "Em quanto tempo ela está rodando?",
    answer:
      "Você já conversa com ela no primeiro dia. O valor cresce nas primeiras semanas, conforme você ensina rotina, contatos e preferências.",
  },
  {
    question: "Tem fidelidade?",
    answer:
      "Não. O plano é mensal e você cancela quando quiser. E nos primeiros 7 dias, se não gostar, devolvemos tudo.",
  },
  {
    question: "Quem aprova o que ela envia?",
    answer:
      "Você. Nenhuma mensagem sai sem a sua aprovação: ela prepara, agenda e espera o seu toque antes de enviar.",
  },
  {
    question: "E os meus dados? (LGPD)",
    answer:
      "Suas conversas são usadas apenas para a Gênia trabalhar para você. Não vendemos dados, seguimos a LGPD e você pode pedir a exclusão dos seus dados quando quiser.",
  },
];

export const metadata: Metadata = {
  title: { absolute: "Gênia — a secretária de IA que responde no seu WhatsApp" },
  description:
    "Ela responde, resume e faz follow-up pelo WhatsApp que você já usa. Nada sai sem a sua aprovação. Planos a partir de R$ 297/mês, com garantia de 7 dias.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function GeniaMeianoitePage() {
  return (
    <main
      className={`${jakarta.className} g2-meianoite bg-white text-[var(--mn-ink)]`}
    >
      <LandingAnalytics page="genia_g2_meianoite" />

      {/* ===== HERO — navy profundo, feixe aurora teal→ciano ===== */}
      <section
        id="mn-hero"
        className="relative overflow-hidden bg-[var(--mn-navy)] text-white"
      >
        <div className="mn-aurora" aria-hidden="true" />

        <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
          <a href="/genia" className="flex items-center gap-3" aria-label="Gênia">
            <Image
              src="/images/soul-genia-profile-mark.png"
              alt=""
              width={36}
              height={36}
              className="h-9 w-9 rounded-xl"
            />
            <span className="text-lg font-extrabold tracking-tight text-white">
              Gênia
            </span>
          </a>
          <TrackedCtaLink
            href={whatsappHref}
            position="top_nav"
            destination={hasWhatsapp ? "whatsapp" : "trial"}
            target={hasWhatsapp ? "_blank" : undefined}
            rel={hasWhatsapp ? "noreferrer" : undefined}
            className="inline-flex min-h-10 items-center whitespace-nowrap rounded-full bg-[var(--mn-teal)] px-5 py-2 text-sm font-bold text-[var(--mn-navy-deep)] shadow-[0_10px_36px_-12px_rgba(13,170,191,0.7)] transition hover:bg-[var(--mn-teal-bright)]"
          >
            Falar com a Gênia
          </TrackedCtaLink>
        </header>

        <div className="relative z-10 mx-auto max-w-6xl px-5 pb-20 pt-12 text-center sm:px-8 md:pt-20">
          <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-[rgba(13,170,191,0.4)] bg-white/[0.06] px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[var(--mn-teal-bright)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--mn-teal-bright)]" />
            Secretária de IA no WhatsApp
          </p>

          <h1 className="mx-auto mt-6 max-w-4xl text-[clamp(2.6rem,10.5vw,4.75rem)] font-extrabold leading-[1.05] tracking-[-0.04em] text-white">
            Você aprova.
            <br />
            Ela <span className="text-[var(--mn-teal-bright)]">executa.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/72 sm:text-lg sm:leading-8">
            A Gênia prepara respostas, agenda recados e organiza compromissos,
            contas e lembretes pelo WhatsApp que você já usa. Cada mensagem fica
            pronta, esperando um toque seu.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <TrackedCtaLink
              href={whatsappHref}
              position="hero_primary"
              destination={hasWhatsapp ? "whatsapp" : "trial"}
              target={hasWhatsapp ? "_blank" : undefined}
              rel={hasWhatsapp ? "noreferrer" : undefined}
              className="inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-xl bg-[var(--mn-teal)] px-8 py-4 text-base font-bold text-[var(--mn-navy-deep)] shadow-[0_14px_44px_-12px_rgba(13,170,191,0.75)] transition hover:bg-[var(--mn-teal-bright)] sm:w-auto"
            >
              <Icon name="whatsapp" solid />
              Falar com a Gênia
            </TrackedCtaLink>
            <TrackedCtaLink
              href="#planos"
              position="hero_secondary"
              destination="planos"
              className="inline-flex min-h-14 w-full items-center justify-center rounded-xl border border-white/24 bg-white/[0.07] px-8 py-4 text-base font-semibold text-white backdrop-blur transition hover:bg-white/[0.14] sm:w-auto"
            >
              Ver planos
            </TrackedCtaLink>
          </div>

          <p className="mt-4 text-sm font-medium text-white/56">
            {trialReassurance}
          </p>

          <ul className="mx-auto mt-8 flex max-w-2xl flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {[
              "Mensagens prontas para aprovar",
              "Recados agendados no horário certo",
              "Nada sai no automático",
            ].map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 text-sm font-semibold text-white/68"
              >
                <Check className="text-[var(--mn-teal-bright)]" />
                {item}
              </li>
            ))}
          </ul>

          <div className="mx-auto mt-12 max-w-sm text-left">
            <WhatsAppChatMockup messages={heroChat} approval={heroApproval} />
          </div>
        </div>
      </section>

      {/* ===== POR QUE ELA É DIFERENTE — branco ===== */}
      <section className="bg-white px-5 py-16 sm:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--mn-teal-ink)]">
              Por que ela é diferente
            </p>
            <h2 className="mt-4 text-[clamp(2rem,6.3vw,3.05rem)] font-extrabold leading-[1.12] tracking-[-0.03em] text-[var(--mn-ink)]">
              Uma secretária que trabalha,{" "}
              <span className="text-[var(--mn-teal-ink)]">não</span> mais um app
              para configurar.
            </h2>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {promiseCards.map((card) => (
              <article
                key={card.label}
                className="rounded-2xl border border-[var(--mn-line)] bg-white p-6 shadow-[0_18px_50px_-40px_rgba(6,20,38,0.45)] transition hover:border-[var(--mn-teal)]"
              >
                <div className="mb-5 flex items-center justify-between gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--mn-teal-wash)] text-[var(--mn-teal-ink)]">
                    <Icon name={card.icon} />
                  </div>
                  <span className="rounded-full bg-[var(--mn-teal-wash)] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--mn-teal-ink)]">
                    {card.label}
                  </span>
                </div>
                <h3 className="text-xl font-extrabold leading-snug tracking-[-0.02em] text-[var(--mn-ink)]">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[var(--mn-ink-soft)]">
                  {card.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== O QUE ELA ORGANIZA — cinza-azulado frio (quebra 3 claras) ===== */}
      <section className="bg-[var(--mn-cloud-cold)] px-5 py-16 sm:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--mn-teal-ink)]">
              O que ela organiza
            </p>
            <h2 className="mt-4 text-[clamp(2rem,6.3vw,3.05rem)] font-extrabold leading-[1.12] tracking-[-0.03em] text-[var(--mn-ink)]">
              O dia fica menos espalhado quando alguém acompanha os{" "}
              <span className="text-[var(--mn-teal-ink)]">detalhes</span>.
            </h2>
            <ul className="mt-6 flex flex-col gap-2.5">
              {[
                "Conversas, áudios e emails viram resumo e próximo passo",
                "Lembretes e contas param de morar na sua cabeça",
                "Mensagens saem no horário certo, sempre com o seu ok",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-[15px] font-medium leading-6 text-[var(--mn-ink)]"
                >
                  <Check className="mt-1 text-[var(--mn-teal-ink)]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-[var(--mn-line)] bg-white p-5 transition hover:border-[var(--mn-teal)]"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--mn-navy)] text-[var(--mn-teal-bright)]">
                  <Icon name={item.icon} />
                </div>
                <h3 className="text-base font-bold leading-snug text-[var(--mn-ink)]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[var(--mn-ink-soft)]">
                  {item.body}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-start justify-between gap-5 rounded-2xl border border-[var(--mn-line)] bg-white p-6 sm:flex-row sm:items-center">
            <p className="text-lg font-extrabold tracking-[-0.02em] text-[var(--mn-ink)]">
              Quer ver como isso fica na sua rotina?
            </p>
            <TrackedCtaLink
              href={whatsappHref}
              position="capabilities_section"
              destination={hasWhatsapp ? "whatsapp" : "trial"}
              target={hasWhatsapp ? "_blank" : undefined}
              rel={hasWhatsapp ? "noreferrer" : undefined}
              className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-[var(--mn-teal)] px-6 py-3 text-sm font-bold text-[var(--mn-navy-deep)] shadow-[0_10px_36px_-14px_rgba(13,170,191,0.7)] transition hover:bg-[var(--mn-teal-bright)]"
            >
              <Icon name="whatsapp" solid />
              Falar com a Gênia
            </TrackedCtaLink>
          </div>
        </div>
      </section>

      {/* ===== ANTES / COM A GÊNIA — por momento ===== */}
      <section className="bg-white px-5 py-16 sm:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--mn-teal-ink)]">
              Antes / Com a Gênia
            </p>
            <h2 className="mt-4 text-[clamp(2rem,6.3vw,3.05rem)] font-extrabold leading-[1.12] tracking-[-0.03em] text-[var(--mn-ink)]">
              Os momentos em que a rotina te{" "}
              <span className="text-[var(--mn-teal-ink)]">atropela</span>.
            </h2>
          </div>

          <div className="mt-12 flex flex-col gap-10">
            {moments.map((moment) => (
              <div key={moment.label}>
                <p className="mb-4 text-center text-xs font-bold uppercase tracking-[0.2em] text-[var(--mn-teal-ink)]">
                  {moment.label}
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                  <article className="rounded-2xl border border-[var(--mn-line)] bg-[#eef1f5] p-6">
                    <div className="mb-4 flex items-center gap-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#dfe4ea] text-[#6b7686]">
                        <Warn />
                      </span>
                      <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#6b7686]">
                        Antes
                      </span>
                    </div>
                    <h3 className="text-xl font-extrabold leading-snug tracking-[-0.02em] text-[#4a5568]">
                      {moment.before.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-[#6b7686]">
                      {moment.before.body}
                    </p>
                  </article>

                  <article className="rounded-2xl border-2 border-[var(--mn-teal)] bg-white p-6 shadow-[0_24px_60px_-44px_rgba(13,170,191,0.75)]">
                    <div className="mb-4 flex items-center justify-between gap-2">
                      <span className="flex items-center gap-2">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--mn-teal-wash)] text-[var(--mn-teal-ink)]">
                          <Check />
                        </span>
                        <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--mn-teal-ink)]">
                          Com a Gênia
                        </span>
                      </span>
                      <span className="rounded-full bg-[var(--mn-teal-wash)] px-3 py-1 text-[11px] font-bold text-[var(--mn-teal-ink)]">
                        Gênia
                      </span>
                    </div>
                    <h3 className="text-xl font-extrabold leading-snug tracking-[-0.02em] text-[var(--mn-ink)]">
                      {moment.after.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-[var(--mn-ink-soft)]">
                      {moment.after.body}
                    </p>
                  </article>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <TrackedCtaLink
              href="#planos"
              position="momentos_section"
              destination="planos"
              className="inline-flex min-h-13 items-center justify-center rounded-xl bg-[var(--mn-teal)] px-8 py-3.5 text-sm font-bold text-[var(--mn-navy-deep)] shadow-[0_12px_40px_-14px_rgba(13,170,191,0.7)] transition hover:bg-[var(--mn-teal-bright)]"
            >
              Quero a Gênia na minha rotina
            </TrackedCtaLink>
          </div>
        </div>
      </section>

      {/* ===== PLANOS — navy profundo ===== */}
      <section
        id="planos"
        className="relative overflow-hidden bg-[var(--mn-navy)] px-5 py-16 text-white sm:px-8 md:py-24"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-44 left-1/2 h-[26rem] w-[42rem] -translate-x-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(13,170,191,0.16), transparent)",
          }}
        />

        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--mn-teal-bright)]">
              Planos
            </p>
            <h2 className="mt-4 text-[clamp(2rem,6.3vw,3.05rem)] font-extrabold leading-[1.12] tracking-[-0.03em] text-white">
              Escolha como a Gênia entra na sua{" "}
              <span className="text-[var(--mn-teal-bright)]">rotina</span>.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-white/64">
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
                  className={`relative flex h-full flex-col rounded-2xl p-6 sm:p-7 ${
                    plan.highlighted
                      ? "border border-[rgba(13,170,191,0.55)] bg-white/[0.08] shadow-[0_28px_90px_-48px_rgba(13,170,191,0.85)]"
                      : "border border-white/12 bg-white/[0.04] transition hover:border-[rgba(13,170,191,0.4)]"
                  }`}
                >
                  {plan.highlighted ? (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[var(--mn-teal)] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[var(--mn-navy-deep)] shadow-[0_10px_30px_-10px_rgba(13,170,191,0.8)]">
                      Mais escolhido
                    </span>
                  ) : null}

                  <h3 className="text-2xl font-extrabold tracking-[-0.02em] text-white">
                    {plan.name}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-white/60">
                    {plan.pitch}
                  </p>

                  <p className="mt-6 flex items-baseline gap-1.5">
                    <span className="text-5xl font-extrabold leading-none tracking-[-0.03em] text-white">
                      R$ {plan.price}
                    </span>
                    <span className="text-sm font-semibold text-white/52">
                      /mês
                    </span>
                  </p>

                  <ul className="mt-7 flex flex-col gap-3">
                    {plan.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-2.5 text-sm leading-6 text-white/76"
                      >
                        <Check className="mt-1 text-[var(--mn-teal-bright)]" />
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
                      className={`inline-flex min-h-13 w-full items-center justify-center rounded-xl px-6 py-3 text-sm font-bold transition ${
                        plan.highlighted
                          ? "bg-[var(--mn-teal)] text-[var(--mn-navy-deep)] shadow-[0_10px_40px_-12px_rgba(13,170,191,0.75)] hover:bg-[var(--mn-teal-bright)]"
                          : "border border-white/24 bg-white/[0.07] text-white hover:bg-white/[0.14]"
                      }`}
                    >
                      Assinar agora
                    </TrackedCtaLink>
                    <p className="mt-3 text-center text-xs leading-5 text-white/52">
                      {trialReassurance}
                    </p>
                  </div>
                </article>
              </PricingTierViewTracker>
            ))}
          </div>

          <p className="mt-12 text-center text-base leading-7 text-white/64">
            Prefere conversar antes de escolher?{" "}
            <TrackedCtaLink
              href={whatsappHref}
              position="pricing_secondary"
              destination={hasWhatsapp ? "whatsapp" : "trial"}
              target={hasWhatsapp ? "_blank" : undefined}
              rel={hasWhatsapp ? "noreferrer" : undefined}
              className="font-bold text-[var(--mn-teal-bright)] underline underline-offset-4 hover:text-white"
            >
              Fale com a Gênia no WhatsApp.
            </TrackedCtaLink>
          </p>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="bg-white px-5 py-16 sm:px-8 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--mn-teal-ink)]">
              Perguntas frequentes
            </p>
            <h2 className="mt-4 text-[clamp(2rem,6.3vw,3.05rem)] font-extrabold leading-[1.12] tracking-[-0.03em] text-[var(--mn-ink)]">
              Tudo que normalmente fica para depois,{" "}
              <span className="text-[var(--mn-teal-ink)]">adiantado</span> aqui.
            </h2>
          </div>
          <div className="grid content-start gap-3">
            {faqs.map((faq, index) => (
              <details
                key={faq.question}
                open={index === 0}
                className="group rounded-2xl border border-[var(--mn-line)] bg-[var(--mn-cloud)] transition hover:border-[var(--mn-teal)]"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 p-5 text-base font-bold text-[var(--mn-ink)]">
                  {faq.question}
                  <svg
                    className="h-5 w-5 shrink-0 text-[var(--mn-teal-ink)] transition-transform duration-200 group-open:rotate-180"
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
                <p className="px-5 pb-5 text-sm leading-6 text-[var(--mn-ink-soft)]">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA FINAL — navy ===== */}
      <section
        id="mn-final"
        className="relative overflow-hidden bg-[var(--mn-navy)] px-5 py-16 text-white sm:px-8 md:py-24"
      >
        <div className="mn-aurora" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--mn-teal-bright)]">
            Próximo passo
          </p>
          <h2 className="mt-4 text-[clamp(2.1rem,7.35vw,3.35rem)] font-extrabold leading-[1.1] tracking-[-0.04em] text-white">
            Comece com uma{" "}
            <span className="text-[var(--mn-teal-bright)]">conversa</span>, não
            com configuração.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-white/68">
            Conte o que está espalhado na sua rotina e veja como a Gênia
            transforma WhatsApp, email e calendário em um dia mais leve.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <TrackedCtaLink
              href={whatsappHref}
              position="final_cta"
              destination={hasWhatsapp ? "whatsapp" : "trial"}
              target={hasWhatsapp ? "_blank" : undefined}
              rel={hasWhatsapp ? "noreferrer" : undefined}
              className="inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-xl bg-[var(--mn-teal)] px-8 py-4 text-base font-bold text-[var(--mn-navy-deep)] shadow-[0_14px_44px_-12px_rgba(13,170,191,0.75)] transition hover:bg-[var(--mn-teal-bright)] sm:w-auto"
            >
              <Icon name="whatsapp" solid />
              Falar com a Gênia
            </TrackedCtaLink>
            <TrackedCtaLink
              href="#planos"
              position="final_cta_planos"
              destination="planos"
              className="inline-flex min-h-14 w-full items-center justify-center rounded-xl border border-white/24 bg-white/[0.07] px-8 py-4 text-base font-semibold text-white backdrop-blur transition hover:bg-white/[0.14] sm:w-auto"
            >
              Ver planos e assinar
            </TrackedCtaLink>
          </div>
          <p className="mt-4 text-sm font-medium text-white/56">
            {trialReassurance}
          </p>
        </div>

        <footer className="relative z-10 mx-auto mt-16 flex max-w-6xl flex-col items-center justify-between gap-3 border-t border-white/10 px-1 pt-6 text-xs text-white/44 sm:flex-row">
          <span className="flex items-center gap-2">
            <Image
              src="/images/soul-genia-profile-mark.png"
              alt=""
              width={20}
              height={20}
              className="h-5 w-5 rounded-md"
            />
            Gênia — Soul Genia
          </span>
          <span>Nada sai no automático sem a sua aprovação.</span>
        </footer>
      </section>

      {/* ===== Widget flutuante — só entre hero e CTA final ===== */}
      <FloatingCta href={whatsappHref} external={hasWhatsapp} />
    </main>
  );
}

/* ===== Ícones locais (copiados inline — contrato da fábrica: não variar
   componente compartilhado fora dos arquivos desta variante) ===== */

function Check({ className }: { className?: string }) {
  return (
    <svg
      className={`h-4 w-4 shrink-0 ${className ?? ""}`}
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
  );
}

function Warn() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 4 2.8 20h18.4L12 4Z"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 10v4M12 17.2v.1"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </svg>
  );
}

function Icon({ name, solid = false }: { name: string; solid?: boolean }) {
  if (name === "whatsapp") {
    return (
      <svg
        className={`${solid ? "h-5 w-5 fill-current" : "h-6 w-6 fill-current"}`}
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.016 1.04-1.016 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884M20.463 3.488A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
      </svg>
    );
  }

  const baseProps = {
    className: "h-5 w-5",
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

  /* notebook (default) */
  return (
    <svg {...baseProps}>
      <path d="M7 3.5h10a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H7a3 3 0 0 1-3-3v-11a3 3 0 0 1 3-3Z" {...strokeProps} />
      <path d="M8 3.5v17M11 8h4M11 12h3" {...strokeProps} />
    </svg>
  );
}
