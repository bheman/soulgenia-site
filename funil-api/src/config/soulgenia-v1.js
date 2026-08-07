export const soulgeniaV1Config = {
  slug: "soulgenia-v1",
  client: "Soul Genia / Auria",
  version: 1,
  routePath: "/diagnostico",
  scoringVersion: "soulgenia-v1-2026-06-23",
  account: "@soulgenia",
  questions: [
    {
      id: "profession",
      label: "Qual e sua atividade profissional?",
      type: "single_choice",
      required: true,
      options: [
        { value: "clinic_owner", label: "Clinica ou consultorio" },
        { value: "service_provider", label: "Prestador(a) de servico" },
        { value: "retail_owner", label: "Loja ou comercio" },
        { value: "course_creator", label: "Cursos, mentorias ou aulas" },
        { value: "real_estate", label: "Imoveis ou hospedagem" },
        { value: "other", label: "Outro" }
      ],
      allowOtherText: true
    },
    {
      id: "message_volume",
      label: "Quantas mensagens de trabalho chegam no WhatsApp por dia?",
      type: "single_choice",
      required: true,
      options: [
        { value: "0-5", label: "0 a 5" },
        { value: "6-15", label: "6 a 15" },
        { value: "16-40", label: "16 a 40" },
        { value: "40+", label: "Mais de 40" }
      ]
    },
    {
      id: "main_pain",
      label: "O que mais se perde hoje?",
      type: "single_choice",
      required: true,
      options: [
        { value: "lead", label: "Novo lead" },
        { value: "follow_up", label: "Follow-up" },
        { value: "scheduling", label: "Agendamento" },
        { value: "payment", label: "Pagamento" },
        { value: "post_sale", label: "Pos-venda" },
        { value: "reminders", label: "Lembretes e organizacao" },
        { value: "curiosity", label: "So quero entender melhor" },
        { value: "other", label: "Outro" }
      ],
      allowOtherText: true
    },
    {
      id: "whatsapp_business",
      label: "Voce usa WhatsApp Business nesse numero?",
      type: "single_choice",
      required: true,
      options: [
        { value: "yes", label: "Sim" },
        { value: "not_yet", label: "Ainda nao, mas posso adaptar" },
        { value: "no", label: "Nao" }
      ]
    },
    {
      id: "guided_setup",
      label: "Voce topa um setup guiado, com aprovacao humana antes de mensagens externas?",
      type: "single_choice",
      required: true,
      options: [
        { value: "yes", label: "Sim" },
        { value: "open", label: "Tenho duvidas, mas topo conversar" },
        { value: "self_service_only", label: "Quero so self-service/autonomo" },
        { value: "no", label: "Nao" }
      ]
    },
    {
      id: "workflow_this_week",
      label: "Qual fluxo real a Soul Genia poderia ajudar ainda esta semana?",
      type: "text",
      required: true,
      minLength: 12
    },
    {
      id: "contact",
      label: "Contato",
      type: "contact",
      required: true,
      fields: ["name", "whatsapp", "consent_contact", "privacy_ack"]
    }
  ],
  results: {
    qualified_trial: {
      title: "Seu diagnostico indica encaixe para o teste guiado.",
      body: "A Soul Genia pode ajudar a cuidar da rotina de WhatsApp com acompanhamento humano e aprovacoes antes de qualquer envio externo.",
      cta: "Conversar sobre meu teste"
    },
    nurture: {
      title: "Existe dor, mas o melhor proximo passo e mais leve.",
      body: "Vamos te mandar exemplos e conteudos praticos antes de propor um setup. Assim voce entende onde a secretaria inteligente entra sem pressa.",
      cta: "Receber exemplos"
    },
    waitlist_poor_fit: {
      title: "Talvez nao seja o momento ideal para o teste guiado.",
      body: "A Soul Genia funciona melhor quando existe uma rotina clara de atendimento no WhatsApp e um fluxo real para testar agora.",
      cta: "Entrar na lista"
    },
    hard_disqualified: {
      title: "Nao conseguimos seguir com esse tipo de uso.",
      body: "A Soul Genia nao apoia spam, disparos frios em massa, coleta irregular de contatos ou automacoes sem aprovacao humana.",
      cta: "Entendi"
    }
  },
  events: [
    "view",
    "quiz_start",
    "question_step",
    "quiz_complete",
    "route_assigned",
    "whatsapp_handoff_click"
  ]
};
