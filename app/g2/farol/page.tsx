import { Fragment } from "react";
import Image from "next/image";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import LandingAnalytics from "@/components/analytics/LandingAnalytics";
import FarolFx from "./FarolFx";
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
  { href: "#frentes", label: "Frentes" },
  { href: "#virada", label: "A virada" },
  { href: "#pratica", label: "Na prática" },
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

// Tira de integrações — equivalente honesto da tira de logos da NewByte:
// canais e formatos que a Gênia já entende. Zero logo de cliente.
const integrations = [
  { icon: "whatsapp", label: "WhatsApp" },
  { icon: "briefcase", label: "WhatsApp Business" },
  { icon: "mail", label: "Gmail" },
  { icon: "calendar", label: "Google Agenda" },
  { icon: "audio", label: "Áudios" },
  { icon: "image", label: "PDF e fotos" },
];

// 4 frentes — cabeçalho em gradiente que ESCURECE na sequência (benchmark §2:
// azul-claro → azul → azul-escuro → quase-preto). Pills = futuros SKUs.
const fronts = [
  {
    pill: "Atende",
    icon: "chat",
    gradient: "linear-gradient(135deg, #6db3ff, #3b8bff)",
    title: "Cliente respondido no seu tom.",
    body: "Respostas prontas em segundos, com aprovação no que importa.",
  },
  {
    pill: "Agenda",
    icon: "send",
    gradient: "linear-gradient(135deg, #3b8bff, #015eea)",
    title: "Recados e compromissos na hora certa.",
    body: "Você dita agora, ela agenda — e espera o seu ok para enviar.",
  },
  {
    pill: "Lembra",
    icon: "clock",
    gradient: "linear-gradient(135deg, #015eea, #0a3d8f)",
    title: "Follow-ups e contas antes do prazo.",
    body: "Retornos, vencimentos e promessas param de escapar da cabeça.",
  },
  {
    pill: "Fecha o dia",
    icon: "notebook",
    gradient: "linear-gradient(135deg, #0a3d8f, #03142c)",
    title: "O dia abre e fecha organizado.",
    body: "Briefing de manhã, fechamento à noite, pendências claras.",
  },
];

// Banda de métricas — qualitativas-factuais. NUNCA percentual nem contagem
// de clientes (regra da casa: só número que conseguimos defender).
const metrics = [
  { value: "Segundos", label: "para uma resposta pronta" },
  { value: "24/7", label: "de plantão no seu WhatsApp" },
  { value: "1 toque", label: "para aprovar o que sai" },
];

// "Na prática" — conteúdo recuperado VERBATIM da página-base (/genia).
// Horários mantidos da base (as bolhas carregam o meta de hora por dentro).
const dayMoments: {
  time: string;
  title: string;
  body: string;
  chat: FarolChatMessage[];
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
    time: "16:40",
    title: "Cliente pergunta, resposta sai pronta",
    body: "Ela redige a confirmação no seu tom e espera o seu ok antes de enviar.",
    chat: [
      {
        from: "genia",
        text: "Um cliente perguntou se amanhã às 14h está confirmado. Preparei a resposta no seu tom — é só aprovar.",
        meta: "16:40",
      },
      { from: "user", text: "Perfeito, pode mandar." },
    ],
    approval: { question: "Aprovar e enviar a confirmação?" },
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

// Timeline da primeira semana — roteiro do onboarding, sem promessa de
// resultado; a amarra é a própria garantia de 7 dias.
const firstWeek = [
  {
    day: "Dia 1",
    title: "Conversa e conexão",
    body: "Você se apresenta, conecta email e agenda e conta como é a sua rotina.",
  },
  {
    day: "Dias 2-3",
    title: "Ela aprende com você",
    body: "Prioridades, pessoas importantes, tom e limites entram na memória dela.",
  },
  {
    day: "Dias 4-7",
    title: "O ritmo se instala",
    body: "Briefings, lembretes e aprovações acontecendo no seu horário.",
  },
];

// Faixa de confiança — reasseguros factuais, sem prova social.
const trustItems = [
  { icon: "approve", label: "Nada sai sem a sua aprovação" },
  { icon: "whatsapp", label: "Tudo acontece no seu próprio WhatsApp" },
  { icon: "shield", label: "Cancele quando quiser — garantia de 7 dias" },
];

// "O que a Gênia NÃO faz" — transparência coerente com os limites da base.
const notDoing = [
  "Não dispara mensagens em massa.",
  "Não fala com seus clientes sem você aprovar.",
  "Não exige app novo nem migração.",
  "Não te prende: plano mensal, sem fidelidade.",
];

// Comparativo curto (✓/—): apps soltos × uma conversa aprovada.
const comparisonRows = [
  {
    topic: "Onde a rotina vive",
    apps: "Agenda num app, lembrete noutro, cliente esperando no WhatsApp.",
    genia: "Tudo numa conversa só, resumido e triado.",
  },
  {
    topic: "Quem lembra",
    apps: "Você, de cabeça, no meio do dia.",
    genia: "Ela avisa antes do prazo — conta, retorno, remédio.",
  },
  {
    topic: "Quem escreve",
    apps: "Você, do zero, na pressa.",
    genia: "Resposta pronta no seu tom, esperando o seu ok.",
  },
  {
    topic: "Quem decide",
    apps: "A notificação dispara, some e se perde.",
    genia: "Sempre você: nada sai sem aprovação.",
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

          {/* Mockup rico: telefone com chrome de app + painel de briefing sobreposto */}
          <div className="relative z-10 mt-10 w-full max-w-sm md:mt-12">
            <FarolPhoneMockup messages={heroChat} approval={heroApproval} />
          </div>
        </div>

        {/* Respiro extra no mobile sob o mockup (widget flutuante). */}
        <div className="h-20 md:h-14" />
      </section>

      {/* ============ INTEGRAÇÕES (navy — tira de "logos" honesta) ============ */}
      <section className="bg-[var(--g2-navy)] px-5 pb-16 pt-2 text-white sm:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-white/55">
            <Icon name="spark" small />
            Funciona com o que você já usa
          </p>
          {/* Marquee: duas metades idênticas; a track anda -50% em 30s,
              pausa no hover; em reduced-motion vira grade estática. */}
          <div className="g2-marquee mt-6">
            <div className="g2-marquee-track">
              {[false, true].map((isDup) => (
                <ul
                  key={isDup ? "dup" : "main"}
                  aria-hidden={isDup || undefined}
                  className={`flex w-max items-center gap-3 pr-3 ${
                    isDup ? "g2-marquee-dup" : ""
                  }`}
                >
                  {integrations.map((item) => (
                    <li
                      key={item.label}
                      className="flex items-center gap-2 whitespace-nowrap rounded-full bg-white px-4 py-2 text-sm font-semibold text-[var(--g2-navy)] shadow-[0_14px_36px_-22px_rgba(0,0,0,0.9)]"
                    >
                      <span className="text-[var(--g2-blue)]">
                        <Icon name={item.icon} small />
                      </span>
                      {item.label}
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ 4 FRENTES (branca) ============ */}
      <section
        id="frentes"
        className="relative bg-white px-5 py-16 sm:px-8 md:py-24"
      >
        <div aria-hidden="true" className="g2-soft-shapes" />
        <div className="relative mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[var(--g2-blue)]">
              <Icon name="spark" small />
              As 4 frentes
            </p>
            <h2
              data-reveal
              className="mt-3 text-3xl font-extrabold leading-tight tracking-[-0.03em] text-[var(--g2-navy)] sm:text-4xl"
            >
              Uma secretária que cobre o dia em{" "}
              <span className="text-[var(--g2-blue)]">4 frentes</span>.
            </h2>
          </div>

          <div data-reveal-children className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {fronts.map((front) => (
              <article
                key={front.pill}
                className="motion-card overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_20px_60px_-48px_rgba(3,20,44,0.5)] hover:border-[var(--g2-border-soft)]"
              >
                <div
                  className="flex items-center justify-between gap-3 p-5"
                  style={{ background: front.gradient }}
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-white">
                    <Icon name={front.icon} />
                  </span>
                  <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold text-white ring-1 ring-white/25">
                    {front.pill}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-extrabold leading-snug tracking-[-0.02em] text-[var(--g2-navy)]">
                    {front.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {front.body}
                  </p>
                </div>
              </article>
            ))}
          </div>

          {/* Card de presença — retrato real da Gênia, sem bio inventada */}
          <div
            data-reveal
            className="motion-card mt-10 grid items-center gap-6 rounded-2xl border border-slate-200 bg-[var(--g2-offwhite)] p-6 sm:grid-cols-[auto_1fr] sm:p-8"
          >
            <Image
              src="/images/genia-avatar.png"
              alt="Retrato da Gênia, a secretária de IA"
              width={208}
              height={208}
              className="h-44 w-44 rounded-2xl object-cover shadow-[0_24px_60px_-32px_rgba(3,20,44,0.6)] sm:h-52 sm:w-52"
            />
            <div>
              <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[var(--g2-blue)]">
                <Icon name="chat" small />
                Quem te atende
              </p>
              <h3 className="mt-2 text-2xl font-extrabold leading-snug tracking-[-0.02em] text-[var(--g2-navy)]">
                Gênia — sua secretária de IA.
              </h3>
              <p className="mt-2 leading-7 text-slate-500">
                Clicou em falar? É ela mesma quem responde. A conversa de venda
                já é uma amostra do produto — no seu WhatsApp, com aprovação em
                tudo.
              </p>
              <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-[var(--g2-pill-bg)] px-3 py-1.5 text-xs font-bold text-[var(--g2-blue)]">
                <span className="g2-pulse-dot h-1.5 w-1.5 rounded-full bg-[var(--g2-blue)]" />
                Demonstração ao vivo, sem agendar nada
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ MÉTRICAS HONESTAS (navy pontual) ============ */}
      <section className="bg-[var(--g2-navy)] px-5 py-14 text-white sm:px-8 md:py-16">
        <div data-reveal-children className="mx-auto grid max-w-5xl gap-10 text-center sm:grid-cols-3">
          {metrics.map((metric) => (
            <div key={metric.value}>
              <p className="text-5xl font-extrabold leading-none tracking-[-0.03em] text-white sm:text-6xl">
                {metric.value}
              </p>
              <p className="mt-3 text-sm font-semibold text-[var(--g2-blue-soft)]">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ============ ANTES / COM A GÊNIA (off-white) ============ */}
      <section
        id="virada"
        className="bg-[var(--g2-offwhite)] px-5 py-16 sm:px-8 md:py-24"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[var(--g2-blue)]">
              <Icon name="clock" small />
              A virada
            </p>
            <h2
              data-reveal
              className="mt-3 text-3xl font-extrabold leading-tight tracking-[-0.03em] text-[var(--g2-navy)] sm:text-4xl"
            >
              O mesmo dia, antes e com a{" "}
              <span className="text-[var(--g2-blue)]">Gênia</span>.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-500">
              Não é sobre ter mais uma ferramenta. É sobre o que muda nos
              momentos em que a rotina costuma escapar.
            </p>
          </div>

          <div data-reveal-children className="mt-12 flex flex-col gap-10">
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

      {/* ============ NA PRÁTICA — o produto é a arte (branca, cards navy) ============ */}
      <section id="pratica" className="bg-white px-5 py-16 sm:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end">
            <div>
              <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[var(--g2-blue)]">
                <Icon name="chat" small />
                Na prática
              </p>
              <h2
                data-reveal
                className="mt-3 text-3xl font-extrabold leading-tight tracking-[-0.03em] text-[var(--g2-navy)] sm:text-4xl"
              >
                Veja a Gênia funcionando em um dia real.
              </h2>
            </div>
            <p className="max-w-xl leading-7 text-slate-500">
              Do briefing da manhã ao fechamento do dia, ela tira da sua cabeça
              o que ficou espalhado em grupos, áudios, agenda, contas e
              mensagens que não podem atrasar.
            </p>
          </div>

          <div data-reveal-children className="mt-12 grid gap-5 md:grid-cols-2">
            {dayMoments.map((scene) => (
              <article
                key={scene.time}
                className="motion-card rounded-2xl bg-[var(--g2-navy)] p-6 shadow-[0_28px_80px_-52px_rgba(3,20,44,0.9)] ring-1 ring-white/10"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-[var(--g2-blue)] px-3 py-1 text-xs font-bold text-white">
                    {scene.time}
                  </span>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-[var(--g2-blue-bright)]">
                    Gênia
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-extrabold leading-snug tracking-[-0.01em] text-white">
                  {scene.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-white/65">
                  {scene.body}
                </p>
                <FarolChatMockup
                  messages={scene.chat}
                  approval={scene.approval}
                  className="mt-5"
                />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ O QUE ELA ORGANIZA (off-white) ============ */}
      <section
        id="organiza"
        className="bg-[var(--g2-offwhite)] px-5 py-16 sm:px-8 md:py-24"
      >
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end">
            <div>
              <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[var(--g2-blue)]">
                <Icon name="notebook" small />
                O que ela organiza
              </p>
              <h2
                data-reveal
                className="mt-3 text-3xl font-extrabold leading-tight tracking-[-0.03em] text-[var(--g2-navy)] sm:text-4xl"
              >
                O que a Gênia tira da sua cabeça todo dia.
              </h2>
            </div>
            <p className="max-w-xl leading-7 text-slate-500">
              Ela não vira um painel para você alimentar. Conversas, áudios,
              emails, calendário e combinados viram resumo, lembrete, mensagem
              agendada e próximo passo.
            </p>
          </div>

          <div data-reveal-children className="mt-12 grid grid-cols-2 gap-3 sm:gap-5 xl:grid-cols-4">
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

          <div className="mt-10 flex flex-col items-start justify-between gap-5 rounded-2xl bg-white p-6 ring-1 ring-slate-200 sm:flex-row sm:items-center">
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
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[var(--g2-blue-bright)]">
              <Icon name="approve" small />
              Como funciona
            </p>
            <h2
              data-reveal
              className="mt-3 text-3xl font-extrabold leading-tight tracking-[-0.03em] text-white sm:text-4xl"
            >
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

          <div data-reveal-children className="grid gap-4">
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

      {/* ============ A PRIMEIRA SEMANA (navy — roteiro do onboarding) ============ */}
      <section className="bg-[var(--g2-navy)] px-5 py-16 text-white sm:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[var(--g2-blue-bright)]">
              <Icon name="calendar" small />
              A primeira semana
            </p>
            <h2
              data-reveal
              className="mt-3 text-3xl font-extrabold leading-tight tracking-[-0.03em] text-white sm:text-4xl"
            >
              Do &quot;oi&quot; ao ritmo instalado em 7 dias.
            </h2>
          </div>

          <div data-reveal-children className="mt-12 grid gap-5 sm:grid-cols-3">
            {firstWeek.map((step, index) => (
              <article
                key={step.day}
                className="motion-card relative rounded-2xl border border-white/12 bg-white/[0.06] p-6 hover:border-[rgba(77,159,255,0.35)]"
              >
                <span className="inline-flex rounded-full bg-[var(--g2-blue)] px-3 py-1 text-xs font-bold text-white">
                  {step.day}
                </span>
                <h3 className="mt-4 text-lg font-extrabold leading-snug tracking-[-0.01em] text-white">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-white/65">
                  {step.body}
                </p>
                {index < firstWeek.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className="absolute -right-5 top-1/2 z-10 hidden -translate-y-1/2 text-[var(--g2-blue-bright)] sm:block"
                  >
                    <span className="g2-nudge block">
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M4 12h14M13 6l6 6-6 6"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </span>
                ) : null}
              </article>
            ))}
          </div>

          <p className="mt-8 text-center text-sm font-semibold text-[var(--g2-blue-soft)]">
            A primeira semana inteira cabe na garantia — {trialReassurance}
          </p>
        </div>
      </section>

      {/* ============ PLANOS (ESCURA — momento de decisão) ============ */}
      <section
        id="planos"
        className="relative overflow-hidden border-t border-white/10 bg-[var(--g2-navy-2)] px-5 py-16 text-white sm:px-8 md:py-24"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-44 left-1/2 h-[30rem] w-[54rem] -translate-x-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(1,94,234,0.45), transparent)",
          }}
        />

        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[var(--g2-blue-bright)]">
              <Icon name="money" small />
              Planos
            </p>
            <h2
              data-reveal
              className="mt-3 text-3xl font-extrabold leading-tight tracking-[-0.03em] text-white sm:text-4xl"
            >
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

      {/* ============ COMPARATIVO (branca, ✓/—) ============ */}
      <section id="comparativo" className="bg-white px-5 py-16 sm:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[var(--g2-blue)]">
              <Icon name="group" small />
              Comparativo
            </p>
            <h2
              data-reveal
              className="mt-3 text-3xl font-extrabold leading-tight tracking-[-0.03em] text-[var(--g2-navy)] sm:text-4xl"
            >
              Apps soltos ×{" "}
              <span className="text-[var(--g2-blue)]">Gênia</span>.
            </h2>
          </div>

          <div data-reveal-children className="mt-12 grid gap-3">
            <div className="hidden grid-cols-[0.6fr_1fr_1fr] gap-4 px-5 md:grid">
              <span />
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
                Apps soltos
              </p>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--g2-blue)]">
                Gênia
              </p>
            </div>
            {comparisonRows.map((row) => (
              <article
                key={row.topic}
                className="motion-card grid gap-4 rounded-2xl border border-slate-200 bg-[var(--g2-offwhite)] p-5 hover:border-[var(--g2-border-soft)] md:grid-cols-[0.6fr_1fr_1fr] md:items-start"
              >
                <h3 className="text-base font-extrabold tracking-[-0.01em] text-[var(--g2-navy)]">
                  {row.topic}
                </h3>
                <div className="flex items-start gap-2 text-sm leading-6 text-slate-400">
                  <span className="mt-0.5 font-bold" aria-hidden="true">
                    —
                  </span>
                  {row.apps}
                </div>
                <div className="flex items-start gap-2 rounded-xl bg-[var(--g2-pill-bg)] p-3 text-sm font-medium leading-6 text-[var(--g2-navy)]">
                  <span className="mt-0.5 text-[var(--g2-blue)]">
                    <CheckIcon />
                  </span>
                  {row.genia}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FAIXA DE CONFIANÇA (off-white, compacta) ============ */}
      <section className="bg-[var(--g2-offwhite)] px-5 py-10 sm:px-8">
        <div data-reveal-children className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-3">
          {trustItems.map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--g2-pill-bg)] text-[var(--g2-blue)]">
                <Icon name={item.icon} />
              </span>
              <p className="text-sm font-bold leading-5 text-[var(--g2-navy)]">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ============ CROSS-SELL DIAGNÓSTICO (escura — padrão "só quer
          resolver o atendimento?" da NewByte; fatos verificados do
          /diagnostico-ia, preço não publicado) ============ */}
      <section className="relative overflow-hidden bg-[var(--g2-navy)] px-5 py-16 text-white sm:px-8 md:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 right-[-10%] h-[22rem] w-[36rem] rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(1,94,234,0.3), transparent)",
          }}
        />
        <div className="relative z-10 mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[var(--g2-blue-bright)]">
              <Icon name="briefcase" small />
              Para quem tem equipe
            </p>
            <h2
              data-reveal
              className="mt-3 text-3xl font-extrabold leading-tight tracking-[-0.03em] text-white sm:text-4xl"
            >
              Tem uma equipe atendendo clientes?
            </h2>
            <p className="mt-4 max-w-xl leading-7 text-[var(--g2-blue-soft)]">
              A Gênia cuida da sua rotina pessoal. Para o atendimento da sua
              empresa, comece medindo quanto o jeito atual custa — direto na
              calculadora do nosso diagnóstico de IA.
            </p>
          </div>
          <div>
            <ul className="flex flex-col gap-3">
              {[
                "Calcule em 2 minutos quanto o atendimento manual custa por mês",
                "Conversa gratuita de 20 min para quem tem equipe",
                "Diagnóstico completo com garantia: 5h/semana encontradas ou você não paga",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm font-semibold leading-6 text-white/85"
                >
                  <span className="mt-0.5 text-[var(--g2-blue-bright)]">
                    <CheckIcon />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <TrackedCtaLink
              href="/diagnostico-ia"
              position="crosssell_diagnostico"
              destination="diagnostico"
              className="motion-press shine-pass mt-7 inline-flex min-h-13 items-center justify-center rounded-xl bg-[var(--g2-blue)] px-7 py-3 text-sm font-semibold text-white shadow-[0_18px_50px_-18px_rgba(1,94,234,0.95)] hover:bg-[var(--g2-blue-deep)]"
            >
              Calcular o custo do meu atendimento
            </TrackedCtaLink>
          </div>
        </div>
      </section>

      {/* ============ FAQ (branca) ============ */}
      <section id="faq" className="bg-white px-5 py-16 sm:px-8 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[var(--g2-blue)]">
              <Icon name="mail" small />
              Sem letra miúda
            </p>
            <h2
              data-reveal
              className="mt-3 text-3xl font-extrabold leading-tight tracking-[-0.03em] text-[var(--g2-navy)] sm:text-4xl"
            >
              Tudo que você perguntaria na reunião — adiantado aqui.
            </h2>
            <p className="mt-4 max-w-md leading-7 text-slate-500">
              Se sobrar alguma dúvida, é só chamar. Quem responde é a própria
              Gênia.
            </p>
          </div>
          <div data-reveal-children className="grid gap-3">
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

        {/* Card de transparência: o que ela NÃO faz */}
        <div className="mx-auto mt-10 max-w-6xl">
          <div className="rounded-2xl border border-slate-200 bg-[var(--g2-offwhite)] p-6 sm:p-8">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[var(--g2-blue)]">
              <Icon name="shield" small />
              Transparência
            </p>
            <h3 className="mt-2 text-xl font-extrabold tracking-[-0.02em] text-[var(--g2-navy)]">
              O que a Gênia NÃO faz.
            </h3>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {notDoing.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm font-semibold leading-6 text-[var(--g2-navy)]"
                >
                  <span className="mt-0.5 text-slate-400">
                    <NoIcon />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
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
          <h2
            data-reveal
            className="text-3xl font-extrabold leading-tight tracking-[-0.03em] text-white sm:text-4xl"
          >
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
      {/* Efeitos client-side (reveals + widget) — client component com
          useEffect: roda pós-hidratação por construção, sem mismatch. */}
      <FarolFx />
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

/* Mockup rico do hero: telefone com chrome de app (barra superior com avatar
   + nome + online, área de mensagens, barra de input) e um segundo painel
   "Briefing de hoje" sobreposto com rotação sutil — padrão NewByte de
   profundidade. Conteúdo do painel é UI ilustrativa, não prova social. */
function FarolPhoneMockup({
  messages,
  approval,
}: {
  messages: FarolChatMessage[];
  approval?: { question: string };
}) {
  return (
    <div aria-hidden="true" className="relative">
      <div className="relative z-10 mx-auto w-full max-w-[21rem] overflow-hidden rounded-[1.75rem] bg-[var(--g2-panel)] text-left shadow-[0_44px_110px_-44px_rgba(1,94,234,0.8)] ring-1 ring-white/15">
        <div className="flex items-center gap-2.5 border-b border-white/10 bg-white/[0.06] px-4 py-3">
          <Image
            src="/images/genia-avatar-sm.png"
            alt=""
            width={32}
            height={32}
            className="h-8 w-8 rounded-full object-cover ring-1 ring-white/30"
          />
          <div>
            <p className="text-sm font-bold leading-none text-white">Gênia</p>
            <p className="mt-1 flex items-center gap-1 text-[10px] font-semibold text-emerald-400">
              <span className="g2-pulse-dot h-1.5 w-1.5 rounded-full bg-emerald-400" />
              online
            </p>
          </div>
          <div className="ml-auto flex items-center gap-1 text-white/35">
            <span className="h-1 w-1 rounded-full bg-current" />
            <span className="h-1 w-1 rounded-full bg-current" />
            <span className="h-1 w-1 rounded-full bg-current" />
          </div>
        </div>

        {/* g2-scene = timeline única de 10s; cada filho tem UMA animation
            infinita keyed em %, fill both (técnica NewByte). */}
        <div className="g2-scene flex flex-col gap-2 px-3.5 py-4">
          {messages.map((message, index) => (
            <Fragment key={index}>
              {message.from === "genia" ? (
                <div className="g2-anim-typing max-w-[76%]">
                  <div className="inline-flex items-end gap-1 rounded-2xl rounded-tl-md border border-[rgba(77,159,255,0.28)] bg-white/[0.08] px-3 py-2.5">
                    <span className="g2-typing-dot h-1.5 w-1.5 rounded-full bg-white/70" />
                    <span className="g2-typing-dot h-1.5 w-1.5 rounded-full bg-white/70" />
                    <span className="g2-typing-dot h-1.5 w-1.5 rounded-full bg-white/70" />
                  </div>
                </div>
              ) : null}
              <div
                className={
                  message.from === "genia"
                    ? "g2-anim-genia max-w-[76%] rounded-2xl rounded-tl-md border border-[rgba(77,159,255,0.28)] bg-white/[0.08] px-3 py-2"
                    : "g2-anim-user ml-auto max-w-[76%] rounded-2xl rounded-tr-md bg-[rgba(1,94,234,0.32)] px-3 py-2"
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
            </Fragment>
          ))}

          {approval ? (
            <div className="g2-anim-approval mt-1 rounded-xl border border-[rgba(77,159,255,0.3)] bg-white/[0.05] px-3 py-2.5">
              <div className="g2-approval-stack">
                <div className="g2-anim-approval-pending flex flex-wrap items-center justify-between gap-2">
                  <p className="text-[11px] font-semibold text-white/80">
                    {approval.question}
                  </p>
                  <div className="flex items-center gap-1.5">
                    <span className="g2-approve-chip rounded-full bg-[var(--g2-blue)] px-3 py-1 text-[10px] font-bold text-white">
                      Aprovar
                    </span>
                    <span className="rounded-full border border-white/25 px-3 py-1 text-[10px] font-semibold text-white/75">
                      Editar
                    </span>
                  </div>
                </div>
                <div className="g2-anim-approval-done flex items-center gap-2">
                  <span className="text-[var(--g2-blue-bright)]">
                    <CheckIcon />
                  </span>
                  <p className="text-[11px] font-bold text-white/90">
                    Aprovado — sai às 16:00
                  </p>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <div className="flex items-center gap-2 border-t border-white/10 bg-white/[0.04] px-4 py-3">
          <p className="flex items-center text-xs text-white/40">
            Mensagem
            <span className="g2-caret" aria-hidden="true" />
          </p>
          <span className="ml-auto flex h-7 w-7 items-center justify-center rounded-full bg-[var(--g2-blue)] text-white">
            <Icon name="send" small />
          </span>
        </div>
      </div>

      {/* sm-md: em fluxo, sobrepondo só o canto da barra de input (chrome);
          lg+: absoluto quase todo fora, cobrindo só a moldura direita —
          as bolhas ficam 100% legíveis e nada é cortado em 640-1024. */}
      <div className="g2-float-in z-20 mx-auto hidden w-56 rotate-[-3deg] rounded-2xl border border-white/12 bg-[#0a2547] p-4 text-left shadow-[0_34px_80px_-32px_rgba(0,0,0,0.85)] sm:-mt-6 sm:ml-auto sm:mr-2 sm:block lg:absolute lg:-right-52 lg:top-10 lg:mt-0 lg:w-60">
        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--g2-blue-bright)]">
          Briefing de hoje — 07:30
        </p>
        <ul className="mt-3 flex flex-col gap-2">
          {[
            "09:00 — Reunião com o contador",
            "2 retornos esperando resposta",
            "Conta de luz vence hoje",
          ].map((item) => (
            <li
              key={item}
              className="flex items-start gap-2 text-xs leading-5 text-white/80"
            >
              <span className="mt-0.5 text-[var(--g2-blue-bright)]">
                <CheckIcon />
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

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
          src="/images/genia-avatar-sm.png"
          alt=""
          width={20}
          height={20}
          className="h-5 w-5 rounded-full object-cover ring-1 ring-white/30"
        />
        <span className="text-[11px] font-bold tracking-wide text-[var(--g2-blue-bright)]">
          Gênia
        </span>
        <span className="ml-auto flex items-center gap-1.5 text-[10px] font-semibold text-white/45">
          <span className="g2-pulse-dot h-1.5 w-1.5 rounded-full bg-emerald-400" />
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

function NoIcon() {
  return (
    <svg
      className="h-4 w-4 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth={2} />
      <path
        d="M7 17 17 7"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
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
        className={
          solid
            ? "h-5 w-5 fill-[#25d366]"
            : small
              ? "h-4 w-4 fill-current"
              : "h-6 w-6 fill-current"
        }
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

  if (name === "chat") {
    return (
      <svg {...baseProps}>
        <path d="M5 6.5A4.5 4.5 0 0 1 9.5 2h5A4.5 4.5 0 0 1 19 6.5v3A4.5 4.5 0 0 1 14.5 14H10l-4.5 3v-4.1A4.48 4.48 0 0 1 5 10.5v-4Z" {...strokeProps} />
        <path d="M9 7h6M9 10h4" {...strokeProps} />
      </svg>
    );
  }

  if (name === "briefcase") {
    return (
      <svg {...baseProps}>
        <rect x="3" y="8" width="18" height="12" rx="2" {...strokeProps} />
        <path d="M9 8V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18" {...strokeProps} />
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
