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
    vertical: "servico_premium",
    landing_variant: "default",
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
    message: data.error ?? "Something went wrong. Please try again.",
  };
}

function FieldError({ id, errors }: { id: string; errors?: string[] }) {
  if (!errors?.length) return null;

  return (
    <p id={id} className="mt-1 text-xs text-red-700" role="alert">
      {errors[0]}
    </p>
  );
}

const initialState: FormState = { status: "idle" };

type GatewayPortFormLocale = "en" | "pt";

const formCopy = {
  en: {
    aria: "GatewayPort early access form",
    success:
      "Your GatewayPort Starter request is in. We will reply with onboarding steps, expected WhatsApp volume, connector requirements and the right connection path for your use case.",
    name: "Name",
    email: "Work email",
    whatsapp: "WhatsApp volume",
    whatsappHint: "(number or short note)",
    namePlaceholder: "Alex Morgan",
    emailPlaceholder: "you@company.com",
    whatsappPlaceholder: "+1 555 0100 / 2k messages per month",
    helper:
      "Tell us your agent stack, WhatsApp volume, media needs and whether you need lab mode or an official WhatsApp Business path. Starter begins with a 14-day no-card trial and approval-first sends.",
    submit: "Request Starter access",
    sending: "Sending...",
  },
  pt: {
    aria: "Formulario de early access GatewayPort",
    success:
      "Seu pedido do GatewayPort Starter entrou. Vamos responder com os passos de onboarding, volume esperado de WhatsApp, requisitos de conector e o melhor caminho de conexao para seu caso.",
    name: "Nome",
    email: "Email de trabalho",
    whatsapp: "Volume de WhatsApp",
    whatsappHint: "(numero ou nota curta)",
    namePlaceholder: "Alex Silva",
    emailPlaceholder: "voce@empresa.com",
    whatsappPlaceholder: "+55 11 99999-0000 / 2 mil mensagens por mes",
    helper:
      "Conte qual stack de agente voce usa, volume de WhatsApp, necessidade de midia e se precisa de modo laboratorio ou caminho oficial do WhatsApp Business. O Starter comeca com teste de 14 dias sem cartao e envios com aprovacao.",
    submit: "Pedir acesso Starter",
    sending: "Enviando...",
  },
};

function SubmitButton({ locale }: { locale: GatewayPortFormLocale }) {
  const { pending } = useFormStatus();
  const form = formCopy[locale];

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-md bg-[#151713] py-3.5 text-base font-semibold text-[#f7f3ea] transition hover:bg-[#303229] focus-visible:outline-[#a87d2a] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? form.sending : form.submit}
    </button>
  );
}

export default function GatewayPortWaitlistForm({
  locale = "en",
}: {
  locale?: GatewayPortFormLocale;
}) {
  const [state, formAction] = useActionState(submitLead, initialState);
  const form = formCopy[locale];

  useEffect(() => {
    captureUtm();
    trackEvent("trial_form_viewed", { page: "gatewayport" });
  }, []);

  useEffect(() => {
    if (state.status === "success") {
      trackEvent("trial_form_submitted", { page: "gatewayport" });
    }
    if (state.status === "error") {
      trackEvent("trial_form_error", { page: "gatewayport" });
    }
  }, [state.status]);

  const utm = getStoredUtm();

  if (state.status === "success") {
    return (
      <div
        className="rounded-lg border border-[#c8dcbf] bg-[#f1f8ef] p-5 text-sm leading-6 text-[#173b2b]"
        role="status"
      >
        {form.success}
      </div>
    );
  }

  return (
    <form action={formAction} noValidate aria-label={form.aria}>
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
            {form.name}{" "}
            <span aria-hidden="true" className="text-red-700">*</span>
          </label>
          <input
            id="nome"
            name="nome"
            type="text"
            required
            autoComplete="name"
            placeholder={form.namePlaceholder}
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
            {form.email}{" "}
            <span aria-hidden="true" className="text-red-700">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder={form.emailPlaceholder}
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
            {form.whatsapp}{" "}
            <span className="text-xs text-[#766e60]">
              {form.whatsappHint}
            </span>
          </label>
          <input
            id="whatsapp"
            name="whatsapp"
            type="text"
            placeholder={form.whatsappPlaceholder}
            className="w-full rounded-md border border-[#cdbfa5] bg-white px-4 py-3 text-base text-[#171813] placeholder:text-[#9a907f] focus:border-[#a87d2a] focus:outline-none focus:ring-2 focus:ring-[#eadcbf]"
            aria-describedby={
              state.errors?.whatsapp ? "whatsapp-error" : undefined
            }
          />
          <FieldError id="whatsapp-error" errors={state.errors?.whatsapp} />
        </div>
      </div>

      <input type="hidden" name="utm_source" value={utm.utm_source ?? ""} />
      <input type="hidden" name="utm_medium" value={utm.utm_medium ?? ""} />
      <input type="hidden" name="utm_campaign" value={utm.utm_campaign ?? ""} />
      <input type="hidden" name="utm_content" value={utm.utm_content ?? ""} />
      <input type="hidden" name="referrer" value={utm.referrer ?? ""} />

      <p className="mt-5 text-sm leading-6 text-[#6b6253]">{form.helper}</p>

      <div className="mt-7">
        <SubmitButton locale={locale} />
      </div>
    </form>
  );
}
