import Image, { getImageProps } from "next/image";
import type { Metadata } from "next";
import LandingAnalytics from "@/components/analytics/LandingAnalytics";
import TrackedCtaLink from "@/components/analytics/TrackedCtaLink";

import "../v3-tokens.css";

const whatsappHref = process.env.NEXT_PUBLIC_WHATSAPP_URL?.trim() || "/trial";
const hasWhatsapp = whatsappHref.startsWith("http");

const navLinks = [
  { href: "#beneficios", label: "Benefícios" },
  { href: "#organiza", label: "O que organiza" },
  { href: "#rotina", label: "Na prática" },
  { href: "#funciona", label: "Como funciona" },
  { href: "#comecar", label: "Começar" },
];

const promiseCards = [
  {
    icon: "whatsapp",
    label: "Sem app novo",
    title: "Você conversa pelo WhatsApp.",
    body: "A Soul Genia vive nos canais que você já usa: WhatsApp, email e calendário.",
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
    body: "Organiza vencimentos, recorrências e registros, sem prometer pagamento automático.",
  },
  {
    icon: "image",
    title: "Pesquisa e imagens",
    body: "Pesquisa, compara opções, resume links e ajuda a criar ou analisar imagens.",
  },
];

const dayMoments = [
  {
    time: "07:30",
    title: "Bom dia sem abrir cinco apps",
    body: "Agenda, contas, remédios, mensagens importantes e o que precisa de resposta.",
  },
  {
    time: "11:20",
    title: "Grupo movimentado vira resumo",
    body: "Ela separa decisão, data, valor, tarefa e pergunta pendente em poucos segundos.",
  },
  {
    time: "15:10",
    title: "Mensagem pronta para mais tarde",
    body: "Você dita agora, agenda o envio e aprova antes da Soul Genia mandar.",
  },
  {
    time: "21:00",
    title: "Fechamento do dia",
    body: "O que ficou aberto, quem precisa de retorno e quais compromissos chegam amanhã.",
  },
];

const resultCategories = ["Rotina", "WhatsApp", "Família", "Saúde", "Financeiro"];

const routineResults = [
  {
    label: "Briefing pronto",
    metric: "Manhã sem abrir cinco apps",
    quote:
      "Em vez de procurar o que era urgente, a Soul Genia entrega compromissos, contas, remédios e mensagens que pedem resposta.",
    person: "Rotina pessoal + trabalho",
    role: "Agenda, contas e prioridades do dia",
    initial: "R",
  },
  {
    label: "Envio com aprovação",
    metric: "Recados no horário certo",
    quote:
      "Você dita a mensagem, escolhe quando ela deve sair e recebe uma confirmação antes do envio. Sai do improviso sem perder controle.",
    person: "Profissionais autônomos",
    role: "Mensagens agendadas pelo WhatsApp",
    initial: "P",
  },
  {
    label: "Menos ruído",
    metric: "Grupos viram próximos passos",
    quote:
      "Conversas longas, áudios e combinados deixam de virar tarefa mental. A Soul Genia separa decisões, datas, valores e pendências.",
    person: "Família, grupos e projetos",
    role: "Resumo de conversas e áudios",
    initial: "G",
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
    title: "A gente ajuda a ensinar a Soul Genia",
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
    body: "Mensagens agendadas e ações sensíveis passam por você antes de sair.",
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
    soul: "A Soul Genia te chama, resume, lembra e organiza no canal que você já usa.",
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
  "Não envia mensagens sensíveis sem aprovação.",
];

const faqs = [
  {
    question: "Preciso instalar um app novo?",
    answer:
      "Não. A proposta é começar pelo WhatsApp e usar email/calendário como contexto quando estiverem conectados.",
  },
  {
    question: "Ela pode mandar mensagem por mim?",
    answer:
      "Ela pode preparar e agendar mensagens, mas sempre pede aprovação antes de enviar.",
  },
  {
    question: "Ela serve para vida pessoal ou trabalho?",
    answer:
      "Para os dois. A Soul Genia foi pensada para quem mistura rotina pessoal, profissional, grupos, contas, agenda e mensagens no mesmo dia.",
  },
  {
    question: "Ela já entende tudo no primeiro dia?",
    answer:
      "Não. O valor cresce com contexto. Você ensina sua rotina e ela aprende suas preferências ao longo do uso.",
  },
];

export const metadata: Metadata = {
  title: "Você aprova. Ela executa. [v3/aprova]",
  description:
    "A Soul Genia prepara respostas, agenda recados e organiza compromissos, contas e lembretes pelo WhatsApp. Cada mensagem espera um toque seu: você aprova, e só então ela envia.",
  robots: {
    index: false,
    follow: false,
  },
};

// Hero v3/aprova — art direction: um único <img> dentro de <picture>, o
// navegador baixa só o asset do breakpoint ativo (getImageProps gera os srcSets).
const heroImageAlt =
  "Dedo tocando um painel translúcido de aprovação da Soul Genia, com o rosto dela ao fundo à direita";

const { props: heroDesktopImage } = getImageProps({
  src: "/images/heroes/v3/aprova-desktop.webp",
  alt: heroImageAlt,
  width: 1342,
  height: 941,
  priority: true,
  sizes: "60vw",
});

const { props: heroMobileImage } = getImageProps({
  src: "/images/heroes/v3/aprova-mobile.webp",
  alt: heroImageAlt,
  width: 940,
  height: 941,
  priority: true,
  sizes: "100vw",
});

export default function SoulGeniaHomePage() {
  return (
    <main className="bg-background text-foreground">
      <LandingAnalytics page="soul_genia_v3_aprova" />

      <section className="relative overflow-hidden bg-[var(--v3-aprova-bg)] text-white">
        <div className="absolute inset-x-0 top-0 z-20">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
            <a href="/" className="flex items-center gap-3" aria-label="Soul Genia">
              <Image
                src="/images/soul-genia-profile-mark.png"
                alt=""
                width={40}
                height={40}
                className="h-10 w-10 rounded-xl"
              />
              <div>
                <p className="font-display text-lg leading-none text-white">
                  Soul Genia
                </p>
                <p className="mt-1 whitespace-nowrap text-xs text-white/62">
                  Secretária no WhatsApp
                </p>
              </div>
            </a>

            <nav
              className="hidden items-center gap-7 text-sm font-medium text-white/82 lg:flex"
              aria-label="Navegacao principal"
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
              className="motion-press shine-pass hidden min-h-11 shrink-0 items-center whitespace-nowrap rounded-full bg-primary-light px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_40px_-10px_rgba(13,170,191,0.55)] hover:bg-primary-lighter md:inline-flex"
            >
              Fazer meu raio-x da rotina
            </TrackedCtaLink>
          </div>
        </div>

        <div className="relative z-0 h-[40svh] min-h-[280px] w-full lg:absolute lg:inset-y-0 lg:left-[36%] lg:right-0 lg:h-auto lg:min-h-0 lg:w-auto">
          <picture>
            <source
              media="(min-width: 1024px)"
              srcSet={heroDesktopImage.srcSet}
              sizes={heroDesktopImage.sizes}
            />
            <img
              {...heroMobileImage}
              fetchPriority="high"
              className="h-full w-full object-cover object-right lg:object-[30%_center]"
            />
          </picture>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 hidden lg:block"
            style={{
              background:
                "linear-gradient(to right, var(--v3-aprova-bg) 16%, transparent 60%), linear-gradient(to bottom, color-mix(in srgb, var(--v3-aprova-bg) 55%, transparent), transparent 18%)",
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 lg:hidden"
            style={{
              background:
                "linear-gradient(to bottom, var(--v3-aprova-bg) 0%, color-mix(in srgb, var(--v3-aprova-bg) 62%, transparent) 12%, transparent 32%, transparent 60%, var(--v3-aprova-bg) 100%)",
            }}
          />
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-32 top-1/3 z-0 hidden h-[30rem] w-[30rem] rounded-full lg:block"
          style={{
            background:
              "radial-gradient(closest-side, color-mix(in srgb, var(--v3-aprova-glow) 12%, transparent), transparent)",
          }}
        />

        <div className="relative z-10 mx-auto flex max-w-7xl flex-col px-5 pb-16 pt-8 sm:px-8 lg:min-h-[82svh] lg:justify-center lg:pb-24 lg:pt-32">
          <div className="hero-copy max-w-2xl lg:max-w-[36rem]">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[color-mix(in_srgb,var(--v3-aprova-glow)_30%,transparent)] bg-white/10 px-4 py-2 text-sm font-semibold text-white/90 backdrop-blur">
              <span className="aura-dot h-2 w-2 rounded-full bg-[var(--v3-aprova-glow)]" />
              Aprovação antes de qualquer envio
            </div>

            <h1 className="font-display text-[clamp(2.65rem,11vw,4.75rem)] leading-[0.95] tracking-tight md:text-[clamp(3rem,5.2vw,4.5rem)]">
              <span className="block text-[var(--v3-aprova-glow)]">
                Você aprova.
              </span>
              <span className="mt-1 block text-white sm:mt-2">
                Ela executa.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-white/84 sm:text-lg sm:leading-8">
              A Soul Genia prepara respostas, agenda recados e organiza
              compromissos, contas e lembretes pelo WhatsApp. Cada mensagem fica
              pronta, esperando um toque seu. Você confirma quando quiser, e só
              então ela envia.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <TrackedCtaLink
                href={whatsappHref}
                position="hero_primary"
                destination={hasWhatsapp ? "whatsapp" : "trial"}
                target={hasWhatsapp ? "_blank" : undefined}
                rel={hasWhatsapp ? "noreferrer" : undefined}
                className="motion-press shine-pass inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-primary-light px-8 py-4 text-base font-semibold text-white shadow-[0_10px_40px_-10px_rgba(13,170,191,0.6)] hover:bg-primary-lighter"
              >
                <Icon name="whatsapp" solid />
                Falar com a Soul Genia
              </TrackedCtaLink>
              <a
                href="#beneficios"
                className="motion-press inline-flex min-h-14 items-center justify-center rounded-full border border-white/32 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur hover:bg-white/20"
              >
                Ver benefícios
              </a>
            </div>

            <ul className="mt-9 flex max-w-xl flex-wrap gap-x-6 gap-y-3">
              {[
                "Mensagens prontas para aprovar",
                "Recados agendados no horário certo",
                "Nada sai no automático",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-sm font-medium text-white/74"
                >
                  <svg
                    className="h-4 w-4 shrink-0 text-[var(--v3-aprova-glow)]"
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
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="v2-texture border-b border-border px-5 py-16 sm:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          {promiseCards.map((card) => (
            <article
              key={card.label}
              className="motion-card group rounded-xl border border-border bg-background/86 p-6 shadow-[0_18px_60px_-52px_rgba(5,64,72,0.45)] hover:border-primary-light/45"
            >
              <div className="mb-5 flex items-center justify-between gap-4">
                <div className="icon-breathe flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon name={card.icon} />
                </div>
                <span className="rounded-full bg-[color-mix(in_srgb,var(--brass)_22%,transparent)] px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-primary">
                  {card.label}
                </span>
              </div>
              <h2 className="text-2xl font-display leading-snug text-primary">
                {card.title}
              </h2>
              <p className="mt-4 leading-7 text-muted-foreground">{card.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        id="beneficios"
        className="overflow-hidden bg-[#060912] px-5 py-20 text-white sm:px-8 md:py-28"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary-light/40 bg-white/8 px-4 py-2 text-sm font-semibold text-white/90">
                <Icon name="spark" />
                Benefícios para quem usa
              </div>
              <h2 className="mt-6 max-w-3xl text-4xl font-display leading-tight text-white sm:text-5xl">
                Menos coisa na cabeça. Mais rotina andando sozinha, com você no controle.
              </h2>
            </div>
            <div>
              <p className="max-w-2xl text-lg leading-8 text-white/70">
                A Soul Genia funciona como uma secretária pessoal no WhatsApp:
                ela te ajuda a lembrar, responder, priorizar e fechar pendências
                sem transformar organização em mais um trabalho.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {benefitTags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-white/12 bg-white/8 px-4 py-2 text-sm font-semibold text-white/76"
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
                className="motion-card rounded-xl border border-white/12 bg-white/[0.06] p-6 shadow-[0_24px_80px_-60px_rgba(13,170,191,0.65)] hover:border-primary-light/55"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-light text-primary">
                    <Icon name={benefit.icon} />
                  </div>
                  <span className="font-display text-3xl leading-none text-white/18">
                    {benefit.initial}
                  </span>
                </div>
                <p className="mt-6 text-xs font-bold uppercase tracking-[0.16em] text-primary-light">
                  {benefit.label}
                </p>
                <h3 className="mt-3 text-2xl font-display leading-tight text-white">
                  {benefit.title}
                </h3>
                <p className="mt-4 leading-7 text-white/66">{benefit.body}</p>
                <p className="mt-6 rounded-lg bg-white/8 px-4 py-3 text-sm font-semibold leading-6 text-white/82">
                  {benefit.result}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-8 grid gap-5 rounded-xl border border-primary-light/26 bg-[linear-gradient(135deg,rgba(13,170,191,0.18),rgba(255,255,255,0.06))] p-5 lg:grid-cols-[0.76fr_1.24fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary-light">
                Um dia mais organizado
              </p>
              <h3 className="mt-3 text-3xl font-display leading-tight text-white">
                Ela acompanha o começo, o meio e o fim do seu dia.
              </h3>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              {benefitFlow.map((item) => (
                <div
                  key={item.time}
                  className="rounded-lg border border-white/10 bg-[#07151b]/82 p-4"
                >
                  <p className="text-sm font-bold text-primary-light">
                    {item.time}
                  </p>
                  <p className="mt-2 font-semibold text-white">{item.title}</p>
                  <p className="mt-2 text-sm leading-6 text-white/60">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="organiza"
        className="overflow-hidden bg-[var(--cream)] px-5 py-20 sm:px-8 md:py-28"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                O que ela organiza
              </p>
              <h2 className="mt-4 text-4xl font-display leading-tight text-primary sm:text-5xl">
                O dia fica menos espalhado quando alguém acompanha os detalhes.
              </h2>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-[#405052]">
              A Soul Genia não tenta virar um painel. Ela transforma conversas,
              áudios, emails, calendário e combinados em lembretes, resumos,
              mensagens agendadas e próximos passos.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {capabilities.map((item) => (
              <article
                key={item.title}
                className="motion-card group rounded-xl border border-[#d8d0bd] bg-white/78 p-6 hover:border-primary-light/55"
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white">
                  <Icon name={item.icon} />
                </div>
                <h3 className="text-xl font-semibold leading-snug text-[#081314]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#4f5b5d]">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="rotina"
        className="bg-background px-5 py-20 sm:px-8 md:py-28"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                Veja na prática
              </p>
              <h2 className="mt-4 text-4xl font-display leading-tight text-primary sm:text-5xl">
                Veja a Soul Genia funcionando em um dia real.
              </h2>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
              Do briefing da manhã ao fechamento do dia, ela ajuda a tirar da
              cabeça o que ficou espalhado em grupos, áudios, agenda, contas e
              mensagens que não podem atrasar.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {dayMoments.map((scene) => (
              <article
                key={scene.time}
                className="motion-card group rounded-xl border border-border bg-muted/55 p-6 hover:border-primary-light/45"
              >
                <div className="mb-6 flex items-center justify-between">
                  <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold text-white">
                    {scene.time}
                  </span>
                  <div className="icon-breathe flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon name="clock" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold leading-snug text-[#081314]">
                  {scene.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {scene.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--cream)] px-5 py-20 sm:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-5xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              Resultados na rotina
            </p>
            <h2 className="mt-4 text-4xl font-display leading-tight text-primary sm:text-5xl">
              Exemplos de ganhos que a Soul Genia pode criar no seu dia.
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-[#405052]">
              A ideia é acompanhar resultados simples e reais do onboarding:
              menos ruído no WhatsApp, menos pendência esquecida e mais clareza
              para decidir o próximo passo.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-2">
              {resultCategories.map((category) => (
                <span
                  key={category}
                  className="rounded-full border border-[#d8d0bd] bg-white/78 px-4 py-2 text-sm font-semibold text-primary shadow-[0_12px_36px_-30px_rgba(5,64,72,0.45)]"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {routineResults.map((result) => (
              <article
                key={result.metric}
                className="motion-card rounded-xl border border-[#d8d0bd] bg-white/88 p-6 shadow-[0_24px_80px_-60px_rgba(5,64,72,0.5)] hover:border-primary-light/55"
              >
                <div className="flex items-start justify-between gap-4">
                  <p className="rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-white">
                    {result.label}
                  </p>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--cream)] font-display text-lg text-primary">
                    {result.initial}
                  </span>
                </div>
                <h3 className="mt-7 text-3xl font-display leading-tight text-primary">
                  {result.metric}
                </h3>
                <p className="mt-5 text-base leading-7 text-[#405052]">
                  {result.quote}
                </p>
                <div className="mt-7 flex items-center gap-3 border-t border-[#d8d0bd] pt-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                    {result.initial}
                  </div>
                  <div>
                    <p className="font-semibold text-[#081314]">
                      {result.person}
                    </p>
                    <p className="mt-0.5 text-sm leading-5 text-[#667274]">
                      {result.role}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 grid gap-5 rounded-xl border border-primary/12 bg-primary p-6 text-white shadow-[0_24px_80px_-58px_rgba(5,64,72,0.75)] lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="font-display text-2xl leading-snug text-white">
                Quer ver isso aplicado na sua rotina?
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
              {[
                "Onboarding acompanhado",
                "Aprovação antes de enviar",
                "Sem instalar outro app",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white/86"
                >
                  {item}
                </span>
              ))}
              </div>
            </div>
            <TrackedCtaLink
              href={whatsappHref}
              position="results_section"
              destination={hasWhatsapp ? "whatsapp" : "trial"}
              target={hasWhatsapp ? "_blank" : undefined}
              rel={hasWhatsapp ? "noreferrer" : undefined}
              className="motion-press shine-pass inline-flex min-h-13 shrink-0 items-center justify-center rounded-lg bg-primary-light px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_40px_-14px_rgba(13,170,191,0.74)] hover:bg-primary-lighter"
            >
              Fazer meu raio-x da rotina
            </TrackedCtaLink>
          </div>
        </div>
      </section>

      <section
        id="funciona"
        className="v2-texture overflow-hidden bg-primary px-5 py-20 text-white sm:px-8 md:py-28"
      >
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white">
              Como funciona
            </p>
            <h2 className="mt-4 text-4xl font-display leading-tight text-white sm:text-5xl">
              Você não configura mais um app. Você ensina uma profissional.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-white/70">
              O começo é assistido. A Soul Genia aprende sua rotina, entende
              seus limites e só ganha mais iniciativa conforme você corrige,
              aprova e ensina o que importa.
            </p>
          </div>

          <div className="v2-rail grid gap-5">
            {learningSteps.map((item) => (
              <article
                key={item.step}
                className="motion-card group relative rounded-xl border border-white/12 bg-white/[0.08] p-6 backdrop-blur-sm hover:bg-white/[0.12]"
              >
                <div className="grid gap-5 sm:grid-cols-[4rem_1fr]">
                  <div className="icon-breathe z-10 flex h-16 w-16 items-center justify-center rounded-full bg-primary-light text-primary">
                    <Icon name={item.icon} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-white">
                      {item.step}
                    </p>
                    <h3 className="mt-1 text-2xl font-semibold text-white">
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

      <section className="bg-background px-5 py-20 sm:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                Comparativo
              </p>
              <h2 className="mt-4 text-4xl font-display leading-tight text-primary sm:text-5xl">
                App de tarefas comum x Soul Genia.
              </h2>
            </div>
            <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
              A diferença não é ter mais uma lista bonita. É ter uma secretária
              que conversa com você, entende contexto e ajuda a rotina andar
              sem virar mais uma obrigação.
            </p>
          </div>

          <div className="mt-12 grid gap-4">
            {comparisonRows.map((row) => (
              <article
                key={row.topic}
                className="motion-card grid gap-5 rounded-xl border border-border bg-muted/55 p-5 hover:border-primary-light/45 md:grid-cols-[0.7fr_1fr_1fr] md:items-start"
              >
                <h3 className="font-display text-xl leading-snug text-primary">
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
                    Soul Genia
                  </p>
                  <p className="mt-2 leading-7 text-white/78">{row.soul}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="confianca"
        className="bg-[var(--cream)] px-5 py-20 sm:px-8 md:py-28"
      >
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              Confiança primeiro
            </p>
            <h2 className="mt-4 text-4xl font-display leading-tight text-primary sm:text-5xl">
              Organização sem susto, sem envio solto, sem pagamento automático.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-[#405052]">
              O poder da Soul Genia está em lembrar, preparar, resumir e
              organizar. As decisões continuam com você, principalmente quando
              envolvem mensagens, dinheiro ou compromisso sensível.
            </p>
            <TrackedCtaLink
              href={whatsappHref}
              position="trust_section"
              destination={hasWhatsapp ? "whatsapp" : "trial"}
              target={hasWhatsapp ? "_blank" : undefined}
              rel={hasWhatsapp ? "noreferrer" : undefined}
              className="motion-press shine-pass mt-8 inline-flex min-h-14 items-center justify-center gap-2 rounded-lg bg-primary-light px-8 py-4 text-base font-semibold text-white shadow-[0_10px_40px_-10px_rgba(13,170,191,0.55)] hover:bg-primary-lighter"
            >
              <Icon name="whatsapp" solid />
              Fazer meu raio-x da rotina
            </TrackedCtaLink>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {boundaries.map((item) => (
              <div
                key={item}
                className="motion-card rounded-xl border border-[#d8d0bd] bg-white/78 p-5 hover:border-primary-light/45"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon name="shield" />
                </div>
                <p className="font-semibold leading-6 text-[#081314]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="bg-background px-5 py-20 sm:px-8 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              Antes de começar
            </p>
            <h2 className="mt-4 text-4xl font-display leading-tight text-primary sm:text-5xl">
              O que precisa ficar claro desde o primeiro contato.
            </h2>
          </div>
          <div className="grid gap-4">
            {faqs.map((faq) => (
              <article
                key={faq.question}
                className="motion-card rounded-xl border border-border bg-muted/55 p-6 hover:border-primary-light/45"
              >
                <h3 className="text-xl font-semibold text-[#081314]">
                  {faq.question}
                </h3>
                <p className="mt-3 leading-7 text-muted-foreground">
                  {faq.answer}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="comecar" className="bg-primary px-5 py-20 text-white sm:px-8 md:py-28">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white">
              Próximo passo
            </p>
            <h2 className="mt-4 text-4xl font-display leading-tight text-white sm:text-5xl">
              Comece com uma conversa, não com configuração.
            </h2>
            <p className="mt-5 text-lg leading-8 text-white/70">
              Conte o que está espalhado na sua rotina e veja como a Soul Genia
              pode transformar WhatsApp, email e calendário em uma rotina mais
              leve.
            </p>
          </div>
          <TrackedCtaLink
            href={whatsappHref}
            position="final_cta"
            destination={hasWhatsapp ? "whatsapp" : "trial"}
            target={hasWhatsapp ? "_blank" : undefined}
            rel={hasWhatsapp ? "noreferrer" : undefined}
            className="motion-press shine-pass inline-flex min-h-14 shrink-0 items-center justify-center gap-2 rounded-lg bg-primary-light px-8 py-4 text-base font-semibold text-white shadow-[0_10px_40px_-10px_rgba(13,170,191,0.6)] hover:bg-primary-lighter"
          >
            <Icon name="whatsapp" solid />
            Fazer meu raio-x da rotina
          </TrackedCtaLink>
        </div>
      </section>
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
