"use client";

import { useEffect, useActionState } from "react";
import { useFormStatus } from "react-dom";
import { captureUtm, getStoredUtm } from "@/lib/utm";
import { trackEvent } from "@/lib/analytics";

interface FormState {
  status: "idle" | "success" | "error";
  errors?: Record<string, string[]>;
  message?: string;
}

async function submitLead(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const payload = {
    email: formData.get("email"),
    nome: formData.get("nome"),
    whatsapp: formData.get("whatsapp"),
    vertical: formData.get("vertical"),
    landing_variant: formData.get("landing_variant"),
    utm_source: formData.get("utm_source"),
    utm_medium: formData.get("utm_medium"),
    utm_campaign: formData.get("utm_campaign"),
    utm_content: formData.get("utm_content"),
    referrer: formData.get("referrer"),
  };

  const res = await fetch("/api/lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (res.ok) {
    return { status: "success" };
  }

  const data = (await res.json()) as {
    error?: string;
    details?: Record<string, string[]>;
  };

  if (res.status === 422 && data.details) {
    return { status: "error", errors: data.details };
  }

  return {
    status: "error",
    message: data.error ?? "Erro inesperado. Tente novamente.",
  };
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-md bg-[#151713] py-3.5 text-base font-semibold text-[#f7f3ea] transition hover:bg-[#303229] focus-visible:outline-[#a87d2a] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Enviando..." : "Começar com a Soul Genia"}
    </button>
  );
}

function FieldError({ id, errors }: { id: string; errors?: string[] }) {
  if (!errors?.length) return null;
  return (
    <p id={id} className="mt-1 text-xs text-red-700" role="alert">
      {errors[0]}
    </p>
  );
}

const verticalOptions = [
  { value: "", label: "O que você quer organizar primeiro?" },
  { value: "saude", label: "Vida pessoal, saúde, remédios e compromissos" },
  { value: "juridico", label: "Contas, documentos e rotina financeira" },
  { value: "coach", label: "Trabalho, clientes, agenda e retornos" },
  { value: "criativo", label: "Família, casa, grupos e recados" },
  {
    value: "servico_premium",
    label: "Tudo misturado: quero organizar minha rotina inteira",
  },
];

const initialState: FormState = { status: "idle" };

export default function TrialSignupForm() {
  const [state, formAction] = useActionState(submitLead, initialState);

  useEffect(() => {
    captureUtm();
    trackEvent("trial_form_viewed");
  }, []);

  useEffect(() => {
    if (state.status === "success") {
      trackEvent("trial_form_submitted");
      window.location.href = "/trial/obrigado";
    }
    if (state.status === "error") {
      trackEvent("trial_form_error");
    }
  }, [state.status]);

  const utm = getStoredUtm();

  return (
    <form action={formAction} noValidate aria-label="Formulário de cadastro trial">
      {state.status === "error" && state.message && (
        <div
          className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700"
          role="alert"
        >
          {state.message}
        </div>
      )}

      <div className="space-y-5">
        <div>
          <label
            htmlFor="nome"
            className="mb-1.5 block text-sm font-medium text-[#413d34]"
          >
            Nome completo <span aria-hidden="true" className="text-red-700">*</span>
          </label>
          <input
            id="nome"
            name="nome"
            type="text"
            required
            autoComplete="name"
            placeholder="Felipe Mendes"
            className="w-full rounded-md border border-[#cdbfa5] bg-white px-4 py-3 text-base text-[#171813] placeholder:text-[#9a907f] focus:border-[#a87d2a] focus:outline-none focus:ring-2 focus:ring-[#eadcbf]"
            aria-describedby={state.errors?.nome ? "nome-error" : undefined}
          />
          <FieldError id="nome-error" errors={state.errors?.nome} />
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-1.5 block text-sm font-medium text-[#413d34]"
          >
            Email <span aria-hidden="true" className="text-red-700">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="voce@email.com"
            className="w-full rounded-md border border-[#cdbfa5] bg-white px-4 py-3 text-base text-[#171813] placeholder:text-[#9a907f] focus:border-[#a87d2a] focus:outline-none focus:ring-2 focus:ring-[#eadcbf]"
            aria-describedby={state.errors?.email ? "email-error" : undefined}
          />
          <FieldError id="email-error" errors={state.errors?.email} />
        </div>

        <div>
          <label
            htmlFor="whatsapp"
            className="mb-1.5 block text-sm font-medium text-[#413d34]"
          >
            WhatsApp <span className="text-xs text-[#766e60]">(com DDD)</span>
          </label>
          <input
            id="whatsapp"
            name="whatsapp"
            type="tel"
            autoComplete="tel"
            placeholder="48999998888"
            className="w-full rounded-md border border-[#cdbfa5] bg-white px-4 py-3 text-base text-[#171813] placeholder:text-[#9a907f] focus:border-[#a87d2a] focus:outline-none focus:ring-2 focus:ring-[#eadcbf]"
            aria-describedby={state.errors?.whatsapp ? "whatsapp-error" : undefined}
          />
          <FieldError id="whatsapp-error" errors={state.errors?.whatsapp} />
        </div>

        <div>
          <label
            htmlFor="vertical"
            className="mb-1.5 block text-sm font-medium text-[#413d34]"
          >
            Primeira prioridade
          </label>
          <select
            id="vertical"
            name="vertical"
            className="w-full rounded-md border border-[#cdbfa5] bg-white px-4 py-3 text-base text-[#171813] focus:border-[#a87d2a] focus:outline-none focus:ring-2 focus:ring-[#eadcbf]"
          >
            {verticalOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <FieldError id="vertical-error" errors={state.errors?.vertical} />
        </div>
      </div>

      <input type="hidden" name="landing_variant" value="default" />
      <input type="hidden" name="utm_source" value={utm.utm_source ?? ""} />
      <input type="hidden" name="utm_medium" value={utm.utm_medium ?? ""} />
      <input type="hidden" name="utm_campaign" value={utm.utm_campaign ?? ""} />
      <input type="hidden" name="utm_content" value={utm.utm_content ?? ""} />
      <input type="hidden" name="referrer" value={utm.referrer ?? ""} />

      <p className="mt-5 text-sm leading-6 text-[#6b6253]">
        A resposta inicial será feita pela equipe Soul Genia. Primeiro vamos
        entender sua rotina; depois configuramos os lembretes, resumos e
        mensagens agendadas com você.
      </p>

      <div className="mt-7">
        <SubmitButton />
      </div>
    </form>
  );
}
