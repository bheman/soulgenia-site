// Funil "Diagnóstico de IA" — qualifica pelo TAMANHO da operação de
// atendimento e devolve a calculadora (horas/mês e custo/mês do atendimento
// manual). Plano: specs/2026-08-07-consultoria-diagnostico-ia-plan.html.
//
// Copy: workspaces/business/products/soul-genia/commercial/copy-deck-diagnostico-ia.md
// (deck aprovado em 2026-08-31 — fonte da verdade do texto visível). Todo texto
// abaixo é ACENTUADO de propósito: a prova é a resposta da API, não este arquivo.
// Não renomear o slug depois do primeiro lead gravado.

export const diagnosticoIaV1Config = {
  slug: "diagnostico-ia-v1",
  client: "Soul Genia / Consultoria de IA",
  version: 1,
  routePath: "/diagnostico-ia",
  // Bump 2026-08-31: a faixa "2-3" foi partida em "2" e "3-10" para o corte de
  // ICP em >= 3 atendentes ficar limpo (decisão D2 da oferta fechada).
  scoringVersion: "diagnostico-ia-v1-2026-08-31",
  account: "@soulgenia",
  questions: [
    {
      id: "attendants",
      label: "Quantas pessoas na sua empresa passam o dia respondendo cliente?",
      type: "single_choice",
      required: true,
      options: [
        { value: "1", label: "Só eu" },
        { value: "2", label: "2 pessoas" },
        { value: "3-10", label: "De 3 a 10 pessoas" },
        { value: "10+", label: "Mais de 10" }
      ]
    },
    {
      id: "hours_per_day",
      label: "Quantas horas por dia cada uma delas gasta respondendo?",
      type: "single_choice",
      required: true,
      options: [
        { value: "1-2", label: "De 1 a 2 horas" },
        { value: "3-4", label: "De 3 a 4 horas" },
        { value: "5-6", label: "De 5 a 6 horas" },
        { value: "7+", label: "O dia inteiro (7 horas ou mais)" }
      ]
    },
    {
      id: "avg_cost",
      label: "Quanto custa em média cada pessoa do atendimento (salário mais encargos)?",
      type: "single_choice",
      required: true,
      options: [
        { value: "ate-1800", label: "Até R$ 1.800" },
        { value: "1800-2500", label: "De R$ 1.800 a R$ 2.500" },
        { value: "2500-4000", label: "De R$ 2.500 a R$ 4.000" },
        { value: "4000+", label: "Acima de R$ 4.000" }
      ]
    },
    {
      id: "client_value",
      label: "Quanto vale um cliente novo para você?",
      type: "single_choice",
      required: true,
      options: [
        { value: "ate-200", label: "Até R$ 200" },
        { value: "200-1000", label: "De R$ 200 a R$ 1.000" },
        { value: "1000-5000", label: "De R$ 1.000 a R$ 5.000" },
        { value: "5000+", label: "Acima de R$ 5.000" }
      ]
    },
    {
      id: "ai_today",
      label: "Você já usa alguma IA no dia a dia da empresa?",
      type: "single_choice",
      required: true,
      options: [
        { value: "no", label: "Não" },
        { value: "chatgpt_pontual", label: "ChatGPT de vez em quando" },
        { value: "tools", label: "Algumas ferramentas com IA" },
        { value: "advanced", label: "Sim, bastante coisa" }
      ]
    },
    {
      id: "contact",
      label: "Para onde mandamos o seu resultado?",
      type: "contact",
      required: true,
      fields: ["name", "whatsapp", "email", "consent_contact", "privacy_ack"]
    }
  ],
  results: {
    // O preço R$ 497 vale enquanto durar a calibração (3 primeiros); depois vira
    // R$ 997. Ele existe em UM lugar só: esta string.
    agendar_diagnostico: {
      title: "sua equipe gasta cerca de {{horas_mes}} horas por mês respondendo cliente.",
      body:
        "{{? Isso custa por volta de {{custo_mes}} todo mês em folha, só de atendimento manual. ?}} " +
        "Esse número é uma estimativa em cima do que você respondeu. O que ele raramente " +
        "erra é a ordem de grandeza. " +
        "O próximo passo é uma conversa de 20 minutos, gratuita, para entender onde essas " +
        "horas estão indo na prática. Se fizer sentido, a partir dali existe o diagnóstico " +
        "completo: entrevista de 45 minutos, relatório priorizado em até 3 dias úteis e call " +
        "de revisão, por R$ 497. " +
        "E ele vem com garantia: se não encontrarmos e documentarmos pelo menos 5 horas por " +
        "semana na sua equipe, devolvemos 100% do valor.",
      cta: "Agendar a conversa de 20 min"
    },
    // Esta tela atende 1 E 2 pessoas (o corte do degrau pago e' >= 3). Deck §6.2,
    // corrigido em 2026-09-01: NENHUMA string aqui pode presumir quantidade de
    // pessoas — nem "sozinho", nem "sua equipe".
    self_serve_genia: {
      title: "responder cliente consome cerca de {{horas_mes}} horas por mês na sua operação.",
      body:
        "Numa operação desse tamanho, o caminho mais rápido não é consultoria. É uma " +
        "secretária de IA no seu próprio WhatsApp, que você testa hoje e não depende de " +
        "ninguém para instalar.",
      cta: "Conhecer a Gênia"
    },
    nurture: {
      title: "faltou sinal para calcular a sua operação.",
      body:
        "Sem saber quantas pessoas atendem e por quantas horas, não há o que medir. A " +
        "gente te manda por e-mail exemplos práticos de onde a IA entra num atendimento " +
        "como o seu.",
      cta: "Receber os exemplos"
    },
    hard_disqualified: {
      title: "não conseguimos seguir com esse tipo de uso.",
      body:
        "A Soul Genia não apoia spam, disparos frios em massa, coleta irregular de " +
        "contatos ou automações sem aprovação humana.",
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
