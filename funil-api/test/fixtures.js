export const qualifiedFixture = {
  answers: {
    profession: "clinic_owner",
    message_volume: "16-40",
    main_pain: "follow_up",
    whatsapp_business: "yes",
    guided_setup: "yes",
    workflow_this_week: "Follow up with leads who asked for pricing this week"
  },
  contact: {
    name: "Lead Qualificado",
    whatsapp: "48999999999",
    email: "lead.qualificado@exemplo.com",
    consent_contact: true,
    privacy_ack: true
  },
  utm: {
    utm_source: "local",
    utm_medium: "test",
    utm_campaign: "voc_171"
  }
};

export const nurtureFixture = {
  answers: {
    profession: "service_provider",
    message_volume: "6-15",
    main_pain: "reminders",
    whatsapp_business: "not_yet",
    guided_setup: "open",
    workflow_this_week: "Organize reminders for return messages"
  },
  contact: {
    name: "Lead Nurture",
    whatsapp: "48988888888",
    email: "lead.nurture@exemplo.com",
    consent_contact: true,
    privacy_ack: true
  }
};

export const waitlistFixture = {
  answers: {
    profession: "other",
    message_volume: "0-5",
    main_pain: "curiosity",
    whatsapp_business: "no",
    guided_setup: "no",
    workflow_this_week: "Quero apenas entender"
  },
  contact: {
    name: "Lead Waitlist",
    whatsapp: "48977777777",
    email: "lead.waitlist@exemplo.com",
    consent_contact: true,
    privacy_ack: true
  }
};

export const hardDisqualifierFixture = {
  answers: {
    profession: "other",
    message_volume: "40+",
    main_pain: "lead",
    whatsapp_business: "yes",
    guided_setup: "self_service_only",
    workflow_this_week: "Quero disparos em massa sem aprovacao para comprar lista fria"
  },
  contact: {
    name: "Lead Bloqueado",
    whatsapp: "48966666666",
    email: "lead.bloqueado@exemplo.com",
    consent_contact: true,
    privacy_ack: true
  }
};
