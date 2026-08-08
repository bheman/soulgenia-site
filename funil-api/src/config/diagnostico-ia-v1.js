// Funil "Diagnóstico de IA" — qualifica pelo TAMANHO da operação de
// atendimento e devolve a calculadora (horas/mês e custo/mês do atendimento
// manual). Plano: specs/2026-08-07-consultoria-diagnostico-ia-plan.html.
//
// D2 (nome público) segue ABERTO — os textos abaixo usam o literal
// "Diagnóstico de IA"; trocar cópia é barato, trocar slug não. Não renomear o
// slug depois do primeiro lead gravado.

export const diagnosticoIaV1Config = {
  slug: "diagnostico-ia-v1",
  client: "Soul Genia / Consultoria de IA",
  version: 1,
  routePath: "/diagnostico-ia",
  scoringVersion: "diagnostico-ia-v1-2026-08-08",
  account: "@soulgenia",
  questions: [
    {
      id: "attendants",
      label: "Quantas pessoas passam o dia respondendo cliente na sua empresa?",
      type: "single_choice",
      required: true,
      options: [
        { value: "1", label: "So eu" },
        { value: "2-3", label: "2 a 3 pessoas" },
        { value: "4-10", label: "4 a 10 pessoas" },
        { value: "10+", label: "Mais de 10" }
      ]
    },
    {
      id: "hours_per_day",
      label: "Quantas horas por dia cada uma gasta respondendo?",
      type: "single_choice",
      required: true,
      options: [
        { value: "1-2", label: "1 a 2 horas" },
        { value: "3-4", label: "3 a 4 horas" },
        { value: "5-6", label: "5 a 6 horas" },
        { value: "7+", label: "O dia inteiro (7h ou mais)" }
      ]
    },
    {
      id: "avg_cost",
      label: "Quanto custa em media cada pessoa do atendimento (salario + encargos)?",
      type: "single_choice",
      required: true,
      options: [
        { value: "ate-1800", label: "Ate R$ 1.800" },
        { value: "1800-2500", label: "R$ 1.800 a R$ 2.500" },
        { value: "2500-4000", label: "R$ 2.500 a R$ 4.000" },
        { value: "4000+", label: "Acima de R$ 4.000" }
      ]
    },
    {
      id: "client_value",
      label: "Quanto vale um cliente novo para voce?",
      type: "single_choice",
      required: true,
      options: [
        { value: "ate-200", label: "Ate R$ 200" },
        { value: "200-1000", label: "R$ 200 a R$ 1.000" },
        { value: "1000-5000", label: "R$ 1.000 a R$ 5.000" },
        { value: "5000+", label: "Acima de R$ 5.000" }
      ]
    },
    {
      id: "ai_today",
      label: "Voce ja usa alguma IA no dia a dia da empresa?",
      type: "single_choice",
      required: true,
      options: [
        { value: "no", label: "Nao" },
        { value: "chatgpt_pontual", label: "ChatGPT de vez em quando" },
        { value: "tools", label: "Algumas ferramentas com IA" },
        { value: "advanced", label: "Sim, bastante coisa" }
      ]
    },
    {
      id: "contact",
      label: "Contato",
      type: "contact",
      required: true,
      fields: ["name", "whatsapp", "email", "consent_contact", "privacy_ack"]
    }
  ],
  results: {
    agendar_diagnostico: {
      title: "sua equipe gasta cerca de {{horas_mes}} horas por mes respondendo cliente.",
      body:
        "{{? Isso custa por volta de {{custo_mes}} todo mes em folha — so de atendimento manual. ?}} " +
        "Numa conversa gratuita de 20 minutos a gente olha sua operacao e te diz " +
        "onde a IA devolve essas horas primeiro. Sem compromisso e sem instalar nada.",
      cta: "Agendar conversa de 20 min"
    },
    self_serve_genia: {
      title: "voce gasta cerca de {{horas_mes}} horas por mes respondendo cliente sozinho(a).",
      body:
        "Para quem atende sozinho, o caminho mais rapido nao e consultoria — e uma " +
        "secretaria de IA no seu proprio WhatsApp, que voce testa hoje. Conheca a Genia.",
      cta: "Conhecer a Genia"
    },
    nurture: {
      title: "faltou sinal para calcular sua operacao.",
      body:
        "Sem saber quantas pessoas atendem e por quantas horas, o diagnostico nao tem " +
        "o que medir. Vamos te mandar por e-mail exemplos praticos de onde a IA entra " +
        "num atendimento como o seu.",
      cta: "Receber exemplos"
    },
    hard_disqualified: {
      title: "nao conseguimos seguir com esse tipo de uso.",
      body:
        "A Soul Genia nao apoia spam, disparos frios em massa, coleta irregular de " +
        "contatos ou automacoes sem aprovacao humana.",
      cta: "Entendi"
    }
  },
  events: [
    "view",
    "quiz_start",
    "question_step",
    "quiz_complete",
    "route_assigned",
    "calculator_shown",
    "schedule_click",
    "whatsapp_handoff_click"
  ]
};
