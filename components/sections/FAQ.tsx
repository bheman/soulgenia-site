"use client";

import { useState } from "react";
import Section from "@/components/ui/Section";

interface FAQItem {
  question: string;
  answer: string;
}

const items: FAQItem[] = [
  {
    question: "Meus clientes vão saber que é IA?",
    answer:
      "Depende de como você quiser. Por padrão, a {PRODUTO} se apresenta com o nome e o estilo que você define — pode ser \"Mariana, assistente do consultório do Dr. Felipe\" ou simplesmente o nome da sua clínica. Ela não se identifica como IA a menos que o cliente pergunte diretamente, momento em que responde com honestidade. A maioria dos clientes não percebe a diferença porque a {PRODUTO} escreve de forma natural, não robótica. No plano Premium, com voz clonada, o áudio soa como você.",
  },
  {
    question: "E se a {PRODUTO} responder errado?",
    answer:
      "A {PRODUTO} foi treinada para os fluxos mais comuns de atendimento profissional e opera dentro de limites claros. Ela não improvisa em temas sensíveis, não dá orientações clínicas, não faz promessas que você não autorizou. Quando uma mensagem sai do padrão ou exige julgamento humano, ela pausa e manda um alerta para você decidir.",
  },
  {
    question: "Posso usar meu próprio número de WhatsApp?",
    answer:
      "Sim, desde que seja um número com WhatsApp Business ativo. Você não precisa trocar de número nem avisar seus clientes de nada. A {PRODUTO} opera pelo mesmo número que você já usa.",
  },
  {
    question: "Funciona com minha agenda atual?",
    answer:
      "A integração padrão é com Google Calendar. Integrações com outras plataformas (Calendly, Doctoralia, telemedicina) estão no roadmap.",
  },
  {
    question: "E se eu cancelar?",
    answer:
      "Você pode cancelar a qualquer momento no plano mensal, sem justificativa e sem multa. Seus dados ficam disponíveis para exportação por 30 dias. O setup não é reembolsável.",
  },
  {
    question: "Como funciona a cobrança dos meus clientes?",
    answer:
      "A {PRODUTO} não cobra seus clientes diretamente — ela envia lembretes e links de pagamento usando a plataforma que você já usa (Asaas, Pagar.me, PIX). Você continua titular de todos os recebimentos.",
  },
  {
    question: "Meus dados estão seguros? E a LGPD?",
    answer:
      "Todos os dados ficam em servidores no Brasil. Mensagens são processadas para operar o fluxo de atendimento e não são usadas para treinar nenhum modelo externo. Você é o controlador dos dados dos seus clientes; nós somos operador. O contrato de serviço inclui as cláusulas LGPD exigidas.",
  },
  {
    question: "Posso testar antes de pagar?",
    answer:
      "Sim. 7 dias de acesso ao plano Pro sem cobrança. Conecta seu WhatsApp Business, sua agenda e vê funcionando de verdade. Se não quiser continuar, cancela sem pagar nada. Setup não é cobrado no período de teste.",
  },
];

function FAQItem({ item }: { item: FAQItem }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-zinc-200 last:border-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-start justify-between gap-4 py-5 text-left focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-slate-600"
        aria-expanded={open}
      >
        <span className="text-base font-medium text-zinc-900">
          {item.question}
        </span>
        <span
          className={`mt-0.5 shrink-0 text-slate-600 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        >
          <svg
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </button>

      {open && (
        <div className="pb-5">
          <p className="text-sm leading-relaxed text-zinc-600">{item.answer}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  return (
    <Section bg="white" id="faq">
      <div className="mx-auto max-w-2xl">
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-slate-600">
            Perguntas frequentes
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
            Dúvidas comuns
          </h2>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white px-6">
          {items.map((item) => (
            <FAQItem key={item.question} item={item} />
          ))}
        </div>
      </div>
    </Section>
  );
}
