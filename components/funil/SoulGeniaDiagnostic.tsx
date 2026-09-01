"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { captureUtm, getStoredUtm } from "@/lib/utm";
import type {
  FunnelAnswers,
  FunnelConfig,
  FunnelContact,
  FunnelQuestion,
  FunnelSubmitResult,
} from "@/lib/funil/types";

type LoadState =
  | { status: "loading" }
  | { status: "ready"; config: FunnelConfig }
  | { status: "error"; message: string };

const BASE_PATH = normalizeBasePath(process.env.NEXT_PUBLIC_BASE_PATH);

const resultTone: Record<
  FunnelSubmitResult["route"],
  { label: string; detail: string }
> = {
  qualified_trial: {
    label: "Teste guiado recomendado",
    detail:
      "O proximo passo abre uma conversa no WhatsApp com o contexto do seu diagnostico.",
  },
  nurture: {
    label: "Caminho de aprendizado",
    detail:
      "Existe dor real, mas a melhor entrada agora e receber exemplos antes do setup.",
  },
  waitlist_poor_fit: {
    label: "Lista de interesse",
    detail:
      "Quando sua rotina tiver um fluxo mais claro para testar, o diagnostico pode ser refeito.",
  },
  hard_disqualified: {
    label: "Uso fora do escopo",
    detail:
      "A Soul Genia trabalha com aprovacao humana e nao apoia disparos frios ou automacoes sensiveis sem controle.",
  },
  // diagnostico-ia-v1 (rotas exclusivas deste funil — acentuadas):
  // Esta rota recebe 1 E 2 pessoas (corte do degrau pago >= 3). Deck §6.2:
  // nenhuma string aqui pode presumir quantidade — "sozinho" saiu por isso.
  self_serve_genia: {
    label: "Caminho self-serve",
    detail:
      "O próximo passo é conhecer a Gênia — a secretária de IA no seu próprio WhatsApp.",
  },
  agendar_diagnostico: {
    label: "Conversa de 20 minutos",
    detail:
      "O próximo passo é uma conversa gratuita de 20 minutos sobre a sua operação de atendimento. Sem compromisso.",
  },
};

/**
 * Copy do SHELL por FUNIL. O componente e' compartilhado entre /diagnostico
 * (soulgenia-v1) e /diagnostico-ia (diagnostico-ia-v1) — sem esta chave por
 * slug, corrigir a promessa de um funil reescreveria o outro em silencio.
 *
 * O recorte diagnostico-ia-v1 vem do deck aprovado em 2026-08-31:
 * workspaces/business/products/soul-genia/commercial/copy-deck-diagnostico-ia.md
 */
type ShellCopy = {
  /** Olho do estado "quiz aberto". */
  eyebrow: string;
  loadingLabel: string;
  errorLabel: string;
  resultLabel: string;
  headline: string;
  subheadline: string;
  /** Mostrada enquanto a config nao chegou (cold start medido > 15s). */
  loadingSubheadline: string;
  /**
   * Subheadline do shell NA TELA DE RESULTADO. Separada porque a subheadline da
   * dobra (§2) diz "na sua equipe" — verdade para o degrau pago (>=3), mentira
   * em cima do card de `self_serve_genia`, que atende 1 E 2 pessoas (deck §6.2).
   * `undefined` = o shell nao renderiza subheadline nenhuma na tela de resultado.
   */
  resultSubheadline?: string;
  /** Linha de honestidade sob a promessa (opcional). */
  note?: string;
  /** Microcopy sob a dobra (opcional). */
  microcopy?: string;
  sidebarNotes: string[];
  submittingLabel: string;
  contactLabel: string;
  contactHelper: string;
  /**
   * Classe de tamanho da h1. Literal COMPLETO dos dois lados — o scanner do
   * Tailwind so' gera a regra se enxergar a string inteira no fonte.
   */
  headlineClass: string;
  /**
   * Link secundario da tela `agendar_diagnostico`. Deck §6.1 pede "Ver os
   * termos da garantia"; como nao existe pagina de termos da garantia nem
   * campo de link no schema do config, e' ancora para o FAQ desta pagina.
   */
  guaranteeLink?: { label: string; href: string };
};

const DEFAULT_SHELL_COPY: ShellCopy = {
  eyebrow: "Diagnostico Soul Genia",
  loadingLabel: "Carregando diagnostico...",
  errorLabel: "Diagnostico local indisponivel",
  resultLabel: "Resultado do diagnostico",
  headline: "Descubra onde uma secretaria inteligente pode aliviar sua rotina.",
  subheadline:
    "Responda algumas perguntas sobre WhatsApp, volume de mensagens e um fluxo real desta semana. O resultado orienta o melhor proximo passo: teste guiado, conteudo de preparo ou lista de interesse.",
  loadingSubheadline:
    "Responda algumas perguntas sobre WhatsApp, volume de mensagens e um fluxo real desta semana. O resultado orienta o melhor proximo passo: teste guiado, conteudo de preparo ou lista de interesse.",
  // O funil antigo ja' mostrava esta subheadline na tela de resultado: mantida.
  resultSubheadline:
    "Responda algumas perguntas sobre WhatsApp, volume de mensagens e um fluxo real desta semana. O resultado orienta o melhor proximo passo: teste guiado, conteudo de preparo ou lista de interesse.",
  sidebarNotes: [
    "Sem promessa de autonomia total.",
    "Aprovacao humana antes de mensagens externas.",
    "Dados usados apenas para orientar o primeiro contato.",
  ],
  submittingLabel: "Enviando diagnostico...",
  contactLabel: "Como a Soul Genia pode falar com voce?",
  contactHelper:
    "Esse contato fica ligado ao diagnostico e nao autoriza disparos automaticos.",
  headlineClass: "text-[clamp(2.4rem,8vw,5.6rem)]",
};

const SHELL_COPY_BY_SLUG: Record<string, ShellCopy> = {
  "diagnostico-ia-v1": {
    eyebrow: "Diagnóstico de Produtividade com IA",
    loadingLabel: "Carregando seu diagnóstico",
    errorLabel: "Diagnóstico local indisponível",
    resultLabel: "Resultado do diagnóstico",
    // A MESMA headline no carregamento e na dobra: durante o cold start o
    // visitante lia a promessa do funil ANTIGO.
    headline:
      "Descubra onde sua empresa pode liberar pelo menos 5 horas por semana com IA — ou receba seu dinheiro de volta.",
    subheadline:
      "Uma entrevista de 45 minutos com um consultor sênior, um relatório priorizado em até 3 dias úteis, e uma call de revisão. Se não encontrarmos e documentarmos pelo menos 5 horas por semana na sua equipe, devolvemos 100% do valor.",
    loadingSubheadline:
      "6 perguntas sobre o seu atendimento. No fim, o número que sua operação custa por mês.",
    // Sem subheadline na tela de resultado: a da dobra fala "na sua equipe" e
    // ficaria em cima do card de quem declarou 1 ou 2 pessoas. O card ja' traz
    // a mensagem inteira. `undefined` de proposito.
    resultSubheadline: undefined,
    note: "O que garantimos é encontrar e documentar a oportunidade. Não garantimos que você vá economizar as horas, porque isso depende da implementação, e essa parte não está na nossa mão.",
    microcopy: "6 perguntas, 2 minutos. O cálculo é gratuito.",
    sidebarNotes: [
      "O cálculo usa só o que você responder.",
      "Nada é enviado a ninguém sem você pedir.",
      "Seus dados servem para esta conversa, e nada mais.",
    ],
    submittingLabel: "Enviando…",
    contactLabel: "Para onde mandamos o seu resultado?",
    contactHelper:
      "Esse contato fica ligado ao diagnóstico e não autoriza disparos automáticos.",
    // Menor que o default: com a headline longa da §2, o clamp antigo empurrava
    // o quiz inteiro para baixo da dobra no desktop — e a pagina existe para a
    // pessoa COMECAR a responder.
    headlineClass: "text-[clamp(1.85rem,4vw,3.1rem)]",
    guaranteeLink: { label: "Ver os termos da garantia", href: "#garantia" },
  },
};

function shellCopyFor(slug: string): ShellCopy {
  return SHELL_COPY_BY_SLUG[slug] ?? DEFAULT_SHELL_COPY;
}

// O componente serve QUALQUER funil registrado no funil-api — o slug decide
// perguntas, pontuacao e telas. Default preserva a pagina /diagnostico atual.
export default function SoulGeniaDiagnostic({
  slug = "soulgenia-v1",
}: {
  slug?: string;
} = {}) {
  const FUNNEL_SLUG = slug;
  const copy = shellCopyFor(FUNNEL_SLUG);
  const [loadState, setLoadState] = useState<LoadState>({ status: "loading" });
  const [answers, setAnswers] = useState<FunnelAnswers>({});
  const [contact, setContact] = useState<FunnelContact>({
    name: "",
    whatsapp: "",
    email: "",
    consent_contact: false,
    privacy_ack: false,
  });
  const [stepIndex, setStepIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [result, setResult] = useState<FunnelSubmitResult | null>(null);

  useEffect(() => {
    captureUtm();
    trackEvent("quiz_view", {
      page: "soul_genia_diagnostic",
      path: window.location.pathname,
      ...getStoredUtm(),
    });

    let active = true;
    fetch(localPath(`/api/funil/${FUNNEL_SLUG}/config`), { cache: "no-store" })
      .then(async (response) => {
        const body = await response.json();
        if (!response.ok) {
          throw new Error(body?.message || "Diagnostico indisponivel.");
        }
        return body.config as FunnelConfig;
      })
      .then((config) => {
        if (active) setLoadState({ status: "ready", config });
      })
      .catch((error) => {
        if (active) {
          setLoadState({
            status: "error",
            message:
              error instanceof Error
                ? error.message
                : "Diagnostico indisponivel.",
          });
        }
      });

    return () => {
      active = false;
    };
  }, [FUNNEL_SLUG]);

  const questions = loadState.status === "ready" ? loadState.config.questions : [];
  const currentQuestion = questions[stepIndex];
  const progress = questions.length
    ? Math.round(((stepIndex + 1) / questions.length) * 100)
    : 0;
  const isLastStep = stepIndex === questions.length - 1;

  const currentStepValid = useMemo(() => {
    if (!currentQuestion) return false;
    return isQuestionValid(currentQuestion, answers, contact);
  }, [answers, contact, currentQuestion]);

  const markStarted = useCallback(() => {
    if (started) return;
    setStarted(true);
    trackEvent("quiz_started", {
      page: "soul_genia_diagnostic",
      path: window.location.pathname,
      ...getStoredUtm(),
    });
  }, [started]);

  const handleAnswer = useCallback(
    (question: FunnelQuestion, value: string) => {
      markStarted();
      setAnswers((previous) => ({ ...previous, [question.id]: value }));
      setSubmitError(null);
    },
    [markStarted]
  );

  const handleContact = useCallback(
    (field: keyof FunnelContact, value: string | boolean) => {
      markStarted();
      setContact((previous) => ({ ...previous, [field]: value }));
      setSubmitError(null);
    },
    [markStarted]
  );

  const goBack = useCallback(() => {
    setStepIndex((current) => Math.max(0, current - 1));
    setSubmitError(null);
  }, []);

  const goNext = useCallback(async () => {
    if (loadState.status !== "ready" || !currentQuestion || !currentStepValid) {
      return;
    }

    trackEvent("quiz_step_completed", {
      page: "soul_genia_diagnostic",
      step: stepIndex + 1,
      question_id: currentQuestion.id,
      path: window.location.pathname,
      ...getStoredUtm(),
    });

    if (!isLastStep) {
      setStepIndex((current) => current + 1);
      return;
    }

    setSubmitting(true);
    setSubmitError(null);
    trackEvent("quiz_submitted", {
      page: "soul_genia_diagnostic",
      path: window.location.pathname,
      ...getStoredUtm(),
    });

    try {
      const response = await fetch(localPath(`/api/funil/${FUNNEL_SLUG}/submit`), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers,
          contact,
          utm: getStoredUtm(),
        }),
      });
      const body = await response.json();

      if (!response.ok) {
        throw new Error(
          body?.message || "Nao foi possivel concluir o diagnostico agora."
        );
      }

      setResult(body as FunnelSubmitResult);
      trackEvent("quiz_result_viewed", {
        page: "soul_genia_diagnostic",
        route: body.route,
        score: body.score,
        path: window.location.pathname,
        ...getStoredUtm(),
      });
      if (body.computed?.horas_mes != null) {
        trackEvent("calculator_shown", {
          page: "soul_genia_diagnostic",
          route: body.route,
          horas_mes: body.computed.horas_mes,
          custo_mes: body.computed.custo_mes,
          path: window.location.pathname,
          ...getStoredUtm(),
        });
      }
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Nao foi possivel concluir o diagnostico agora."
      );
    } finally {
      setSubmitting(false);
    }
  }, [
    answers,
    contact,
    currentQuestion,
    currentStepValid,
    isLastStep,
    loadState.status,
    stepIndex,
  ]);

  if (loadState.status === "loading") {
    return (
      <DiagnosticShell
        stateLabel={copy.loadingLabel}
        headline={copy.headline}
        headlineClass={copy.headlineClass}
        subheadline={copy.loadingSubheadline}
        // A `note` TEM de vir junto com a headline. A headline promete
        // "ou receba seu dinheiro de volta"; a note e' o que diz que a garantia
        // cobre ACHAR e documentar, nao a economia realizada. Sem ela, durante o
        // cold start (medido acima de 15s) o visitante le a promessa forte sem a
        // ressalva que a torna honesta — exatamente ao contrario do desenho.
        note={copy.note}
      />
    );
  }

  if (loadState.status === "error") {
    return (
      <DiagnosticShell
        stateLabel={copy.errorLabel}
        headline={copy.headline}
        headlineClass={copy.headlineClass}
        subheadline={copy.loadingSubheadline}
      >
        <p className="mt-4 max-w-xl text-base leading-7 text-white/72">
          {loadState.message}
        </p>
      </DiagnosticShell>
    );
  }

  if (result) {
    return <DiagnosticResult result={result} contact={contact} copy={copy} />;
  }

  return (
    <DiagnosticShell
      stateLabel={copy.eyebrow}
      headline={copy.headline}
      headlineClass={copy.headlineClass}
      subheadline={copy.subheadline}
      note={copy.note}
      microcopy={copy.microcopy}
    >
      <div className="mt-8 grid gap-8 lg:grid-cols-[0.7fr_1fr] lg:items-start">
        <aside className="rounded-xl border border-white/12 bg-white/[0.06] p-5 text-white">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary-light">
            Progresso
          </p>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/12">
            <div
              className="h-full rounded-full bg-primary-light transition-[width] duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-3 text-sm font-semibold text-white/76">
            Pergunta {stepIndex + 1} de {questions.length}
          </p>
          <div className="mt-7 grid gap-3 text-sm text-white/68">
            {copy.sidebarNotes.map((note) => (
              <p key={note}>{note}</p>
            ))}
          </div>
        </aside>

        <section className="rounded-xl border border-white/14 bg-[#fbfdfc] p-5 text-[#081314] shadow-[0_28px_90px_-62px_rgba(0,0,0,0.9)] sm:p-7">
          <QuestionRenderer
            question={currentQuestion}
            answers={answers}
            contact={contact}
            copy={copy}
            onAnswer={handleAnswer}
            onContact={handleContact}
          />

          {submitError && (
            <p
              role="alert"
              className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold leading-6 text-red-700"
            >
              {submitError}
            </p>
          )}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {stepIndex > 0 && (
              <button
                type="button"
                onClick={goBack}
                disabled={submitting}
                className="motion-press min-h-12 rounded-lg border border-[#cfdada] px-5 py-3 text-sm font-bold text-primary hover:border-primary-light disabled:opacity-45"
              >
                Voltar
              </button>
            )}
            <button
              type="button"
              onClick={goNext}
              disabled={!currentStepValid || submitting}
              className="motion-press min-h-12 flex-1 rounded-lg bg-primary px-6 py-3 text-sm font-bold text-white shadow-[0_14px_46px_-24px_rgba(5,64,72,0.75)] hover:bg-[#073038] disabled:cursor-not-allowed disabled:opacity-45"
            >
              {submitting
                ? copy.submittingLabel
                : isLastStep
                  ? "Ver meu resultado"
                  : "Continuar"}
            </button>
          </div>
        </section>
      </div>
    </DiagnosticShell>
  );
}

function DiagnosticShell({
  stateLabel,
  headline,
  headlineClass,
  subheadline,
  note,
  microcopy,
  children,
}: {
  stateLabel: string;
  headline: string;
  headlineClass: string;
  subheadline?: string;
  note?: string;
  microcopy?: string;
  children?: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-primary text-white">
      <section className="v21-hero-grid relative overflow-hidden px-5 py-8 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <a
            href={localPath("/")}
            className="inline-flex items-center rounded-full border border-white/18 bg-white/8 px-4 py-2 text-sm font-semibold text-white/84 hover:text-white"
          >
            Soul Genia
          </a>

          <div className="mt-14 max-w-4xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary-light">
              {stateLabel}
            </p>
            <h1
              className={`mt-4 ${headlineClass} font-display leading-[0.98] text-white`}
            >
              {headline}
            </h1>
            {subheadline ? (
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/74">
                {subheadline}
              </p>
            ) : null}
            {note ? (
              <p className="mt-5 max-w-2xl text-sm leading-6 text-white/60">
                {note}
              </p>
            ) : null}
            {microcopy ? (
              <p className="mt-5 text-sm font-semibold text-white/72">
                {microcopy}
              </p>
            ) : null}
          </div>

          {children}
        </div>
      </section>
    </main>
  );
}

function QuestionRenderer({
  question,
  answers,
  contact,
  copy,
  onAnswer,
  onContact,
}: {
  question: FunnelQuestion;
  answers: FunnelAnswers;
  contact: FunnelContact;
  copy: ShellCopy;
  onAnswer: (question: FunnelQuestion, value: string) => void;
  onContact: (field: keyof FunnelContact, value: string | boolean) => void;
}) {
  if (question.type === "contact") {
    return (
      <div>
        <QuestionHeader label={copy.contactLabel} helper={copy.contactHelper} />

        <div className="mt-6 grid gap-4">
          <label className="grid gap-2 text-sm font-bold text-[#253d40]">
            Nome
            <input
              value={contact.name}
              onChange={(event) => onContact("name", event.target.value)}
              autoComplete="given-name"
              className="min-h-12 rounded-lg border border-[#cfdada] bg-white px-4 text-base font-semibold outline-none focus:border-primary-light focus:ring-2 focus:ring-primary-light/30"
              placeholder="Como podemos te chamar?"
            />
          </label>
          <label className="grid gap-2 text-sm font-bold text-[#253d40]">
            WhatsApp com DDD
            <input
              value={contact.whatsapp}
              onChange={(event) => onContact("whatsapp", event.target.value)}
              autoComplete="tel"
              inputMode="tel"
              className="min-h-12 rounded-lg border border-[#cfdada] bg-white px-4 text-base font-semibold outline-none focus:border-primary-light focus:ring-2 focus:ring-primary-light/30"
              placeholder="(48) 99999-9999"
            />
          </label>

          <label className="grid gap-2 text-sm font-bold text-[#253d40]">
            E-mail
            <input
              value={contact.email}
              onChange={(event) => onContact("email", event.target.value)}
              autoComplete="email"
              inputMode="email"
              type="email"
              className="min-h-12 rounded-lg border border-[#cfdada] bg-white px-4 text-base font-semibold outline-none focus:border-primary-light focus:ring-2 focus:ring-primary-light/30"
              placeholder="voce@exemplo.com"
            />
            <span className="text-xs font-semibold text-[#607174]">
              E para onde mandamos o resultado e os exemplos — nao entra em lista de disparo.
            </span>
          </label>

          <ConsentCheckbox
            checked={contact.consent_contact}
            onChange={(checked) => onContact("consent_contact", checked)}
          >
            Autorizo contato da Soul Genia sobre este diagnostico.
          </ConsentCheckbox>
          <ConsentCheckbox
            checked={contact.privacy_ack}
            onChange={(checked) => onContact("privacy_ack", checked)}
          >
            Entendo que meus dados serao usados para avaliar o encaixe e
            orientar o primeiro atendimento.
          </ConsentCheckbox>
        </div>
      </div>
    );
  }

  if (question.type === "text") {
    return (
      <div>
        <QuestionHeader
          label={question.label}
          helper="Use um exemplo concreto: retorno para leads, agenda, pagamento, lembrete, pos-venda ou outra rotina real."
        />
        <textarea
          value={String(answers[question.id] || "")}
          onChange={(event) => onAnswer(question, event.target.value)}
          rows={5}
          className="mt-6 w-full rounded-lg border border-[#cfdada] bg-white px-4 py-3 text-base font-semibold leading-7 outline-none focus:border-primary-light focus:ring-2 focus:ring-primary-light/30"
          placeholder="Ex.: organizar os retornos de clientes que pediram preco e ainda nao responderam"
        />
      </div>
    );
  }

  return (
    <div>
      <QuestionHeader label={question.label} />
      <div className="mt-6 grid gap-3">
        {(question.options || []).map((option) => {
          const selected = answers[question.id] === option.value;
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={selected}
              onClick={() => onAnswer(question, option.value)}
              className={`motion-press flex min-h-14 items-center justify-between gap-4 rounded-lg border px-4 py-3 text-left text-sm font-bold leading-6 ${
                selected
                  ? "border-primary bg-primary text-white"
                  : "border-[#d9e4e2] bg-white text-[#253d40] hover:border-primary-light"
              }`}
            >
              <span>{option.label}</span>
              <span
                className={`h-4 w-4 rounded-full border ${
                  selected
                    ? "border-primary-light bg-primary-light"
                    : "border-[#8da0a0]"
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}

function QuestionHeader({
  label,
  helper,
}: {
  label: string;
  helper?: string;
}) {
  return (
    <div>
      <h2 className="text-2xl font-display leading-tight text-primary sm:text-3xl">
        {label}
      </h2>
      {helper && (
        <p className="mt-3 max-w-2xl text-sm font-medium leading-6 text-[#5b6d70]">
          {helper}
        </p>
      )}
    </div>
  );
}

function ConsentCheckbox({
  checked,
  onChange,
  children,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <label className="flex gap-3 rounded-lg border border-[#d9e4e2] bg-[#f5f9f7] p-4 text-sm font-semibold leading-6 text-[#253d40]">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="mt-1 h-4 w-4 shrink-0 accent-primary"
      />
      <span>{children}</span>
    </label>
  );
}

function DiagnosticResult({
  result,
  contact,
  copy,
}: {
  result: FunnelSubmitResult;
  contact: FunnelContact;
  copy: ShellCopy;
}) {
  const tone = resultTone[result.route];
  const firstName = contact.name.trim().split(/\s+/)[0] || "Pronto";
  const canOpenWhatsApp = result.route === "qualified_trial" && result.routing_target;
  // diagnostico-ia-v1: rotas com destino proprio (Genia / agenda) e a tela de numero.
  const ctaTarget =
    (result.route === "self_serve_genia" || result.route === "agendar_diagnostico") &&
    result.routing_target
      ? result.routing_target
      : null;
  const computed = result.computed ?? null;

  return (
    <DiagnosticShell
      stateLabel={tone.label}
      headline={copy.headline}
      headlineClass={copy.headlineClass}
      subheadline={copy.resultSubheadline}
    >
      <section className="mt-10 rounded-xl border border-white/14 bg-[#fbfdfc] p-5 text-[#081314] shadow-[0_28px_90px_-62px_rgba(0,0,0,0.9)] sm:p-8">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
            {copy.resultLabel}
          </p>
          <h2 className="mt-4 text-3xl font-display leading-tight text-primary sm:text-5xl">
            {firstName}, {result.result.title}
          </h2>
          {computed?.horas_mes != null ? (
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <div className="rounded-xl border border-[#d9e4e2] bg-[#f5f9f7] px-6 py-4">
                <p className="text-4xl font-display leading-none text-primary sm:text-5xl">
                  {new Intl.NumberFormat("pt-BR").format(computed.horas_mes)}h
                </p>
                <p className="mt-2 text-sm font-semibold text-[#607174]">
                  por mês respondendo cliente
                </p>
              </div>
              {computed.custo_mes != null ? (
                <div className="rounded-xl border border-[#d9e4e2] bg-[#f5f9f7] px-6 py-4">
                  <p className="text-4xl font-display leading-none text-primary sm:text-5xl">
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                      maximumFractionDigits: 0,
                    }).format(computed.custo_mes)}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-[#607174]">
                    de folha só em atendimento manual (estimativa)
                  </p>
                </div>
              ) : null}
            </div>
          ) : null}
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#405052]">
            {result.result.body}
          </p>
          <p className="mt-4 max-w-2xl text-sm font-semibold leading-6 text-[#607174]">
            {tone.detail}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {ctaTarget ? (
              <a
                href={ctaTarget}
                target={result.route === "agendar_diagnostico" ? "_blank" : undefined}
                rel={result.route === "agendar_diagnostico" ? "noreferrer" : undefined}
                onClick={() =>
                  trackEvent(
                    result.route === "agendar_diagnostico"
                      ? "schedule_click"
                      : "quiz_cta_clicked",
                    {
                      page: "soul_genia_diagnostic",
                      route: result.route,
                      destination:
                        result.route === "agendar_diagnostico" ? "schedule" : "genia",
                      path: window.location.pathname,
                      ...getStoredUtm(),
                    }
                  )
                }
                className="motion-press shine-pass inline-flex min-h-13 items-center justify-center rounded-lg bg-primary-light px-6 py-3 text-sm font-bold text-white shadow-[0_14px_46px_-24px_rgba(13,170,191,0.78)] hover:bg-primary-lighter"
              >
                {result.result.cta}
              </a>
            ) : canOpenWhatsApp ? (
              <a
                href={result.routing_target || "#"}
                target="_blank"
                rel="noreferrer"
                onClick={() =>
                  trackEvent("quiz_cta_clicked", {
                    page: "soul_genia_diagnostic",
                    route: result.route,
                    destination: "whatsapp",
                    path: window.location.pathname,
                    ...getStoredUtm(),
                  })
                }
                className="motion-press shine-pass inline-flex min-h-13 items-center justify-center rounded-lg bg-primary-light px-6 py-3 text-sm font-bold text-white shadow-[0_14px_46px_-24px_rgba(13,170,191,0.78)] hover:bg-primary-lighter"
              >
                {result.result.cta}
              </a>
            ) : (
              <a
                href={localPath("/")}
                onClick={() =>
                  trackEvent("quiz_cta_clicked", {
                    page: "soul_genia_diagnostic",
                    route: result.route,
                    destination: "landing",
                    path: window.location.pathname,
                    ...getStoredUtm(),
                  })
                }
                className="motion-press inline-flex min-h-13 items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-bold text-white hover:bg-[#073038]"
              >
                Voltar para a Soul Genia
              </a>
            )}

            {/* Deck §6.1, link secundario. Sem pagina de termos da garantia e
                sem campo de link no schema do config: e' ancora para o FAQ
                desta mesma pagina (§9, id="garantia"). */}
            {copy.guaranteeLink && result.route === "agendar_diagnostico" ? (
              <a
                href={copy.guaranteeLink.href}
                onClick={() =>
                  trackEvent("quiz_cta_clicked", {
                    page: "soul_genia_diagnostic",
                    route: result.route,
                    destination: "garantia",
                    path: window.location.pathname,
                    ...getStoredUtm(),
                  })
                }
                className="motion-press inline-flex min-h-13 items-center justify-center rounded-lg border border-[#cfdada] px-6 py-3 text-sm font-bold text-primary hover:border-primary-light"
              >
                {copy.guaranteeLink.label}
              </a>
            ) : null}
          </div>
        </div>
      </section>
    </DiagnosticShell>
  );
}

function isQuestionValid(
  question: FunnelQuestion,
  answers: FunnelAnswers,
  contact: FunnelContact
): boolean {
  if (question.type === "single_choice") {
    return typeof answers[question.id] === "string";
  }

  if (question.type === "text") {
    const value = String(answers[question.id] || "").trim();
    return value.length >= (question.minLength || 1);
  }

  const digits = contact.whatsapp.replace(/\D/g, "");
  return (
    contact.name.trim().length >= 2 &&
    digits.length >= 10 &&
    digits.length <= 13 &&
    isLikelyEmail(contact.email) &&
    contact.consent_contact &&
    contact.privacy_ack
  );
}

/**
 * Validacao deliberadamente FROUXA: forma basica, sem tentar adivinhar dominio
 * valido. Regex agressiva de e-mail rejeita endereco legitimo (dominio novo,
 * TLD longo, `+tag`) e o custo disso e perder um lead — pior que aceitar um
 * digitado errado, que o bounce revela depois.
 */
function isLikelyEmail(value: string): boolean {
  const v = String(value || "").trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
}

function localPath(path: string): string {
  return `${BASE_PATH}${path.startsWith("/") ? path : `/${path}`}`;
}

function normalizeBasePath(value: string | undefined): string {
  if (!value) return "";
  const trimmed = value.trim().replace(/\/+$/, "");
  if (!trimmed || trimmed === "/") return "";
  return trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
}
