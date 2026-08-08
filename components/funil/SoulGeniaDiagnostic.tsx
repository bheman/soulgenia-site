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
  // diagnostico-ia-v1:
  self_serve_genia: {
    label: "Caminho self-serve",
    detail:
      "Para quem atende sozinho, o proximo passo e conhecer a Genia — a secretaria de IA no seu proprio WhatsApp.",
  },
  agendar_diagnostico: {
    label: "Conversa de 20 minutos",
    detail:
      "O proximo passo e uma conversa gratuita de 20 minutos sobre a sua operacao de atendimento. Sem compromisso.",
  },
};

// O componente serve QUALQUER funil registrado no funil-api — o slug decide
// perguntas, pontuacao e telas. Default preserva a pagina /diagnostico atual.
export default function SoulGeniaDiagnostic({
  slug = "soulgenia-v1",
}: {
  slug?: string;
} = {}) {
  const FUNNEL_SLUG = slug;
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
    return <DiagnosticShell stateLabel="Carregando diagnostico..." />;
  }

  if (loadState.status === "error") {
    return (
      <DiagnosticShell stateLabel="Diagnostico local indisponivel">
        <p className="mt-4 max-w-xl text-base leading-7 text-white/72">
          {loadState.message}
        </p>
      </DiagnosticShell>
    );
  }

  if (result) {
    return <DiagnosticResult result={result} contact={contact} />;
  }

  return (
    <DiagnosticShell stateLabel="Diagnostico Soul Genia">
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
            <p>Sem promessa de autonomia total.</p>
            <p>Aprovacao humana antes de mensagens externas.</p>
            <p>Dados usados apenas para orientar o primeiro contato.</p>
          </div>
        </aside>

        <section className="rounded-xl border border-white/14 bg-[#fbfdfc] p-5 text-[#081314] shadow-[0_28px_90px_-62px_rgba(0,0,0,0.9)] sm:p-7">
          <QuestionRenderer
            question={currentQuestion}
            answers={answers}
            contact={contact}
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
                ? "Enviando diagnostico..."
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
  children,
}: {
  stateLabel: string;
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
            <h1 className="mt-4 text-[clamp(2.4rem,8vw,5.6rem)] font-display leading-[0.98] text-white">
              Descubra onde uma secretaria inteligente pode aliviar sua rotina.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/74">
              Responda algumas perguntas sobre WhatsApp, volume de mensagens e
              um fluxo real desta semana. O resultado orienta o melhor proximo
              passo: teste guiado, conteudo de preparo ou lista de interesse.
            </p>
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
  onAnswer,
  onContact,
}: {
  question: FunnelQuestion;
  answers: FunnelAnswers;
  contact: FunnelContact;
  onAnswer: (question: FunnelQuestion, value: string) => void;
  onContact: (field: keyof FunnelContact, value: string | boolean) => void;
}) {
  if (question.type === "contact") {
    return (
      <div>
        <QuestionHeader
          label="Como a Soul Genia pode falar com voce?"
          helper="Esse contato fica ligado ao diagnostico e nao autoriza disparos automaticos."
        />

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
}: {
  result: FunnelSubmitResult;
  contact: FunnelContact;
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
    <DiagnosticShell stateLabel={tone.label}>
      <section className="mt-10 rounded-xl border border-white/14 bg-[#fbfdfc] p-5 text-[#081314] shadow-[0_28px_90px_-62px_rgba(0,0,0,0.9)] sm:p-8">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
            Resultado do diagnostico
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
                  por mes respondendo cliente
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
                    de folha so em atendimento manual (estimativa)
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
