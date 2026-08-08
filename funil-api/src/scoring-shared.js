// Regras de conduta COMPARTILHADAS entre todos os funis.
//
// Extraídas de scoring.js (soulgenia-v1) sem mudança de comportamento quando o
// funil do diagnóstico de IA entrou: o desqualificador duro de spam / envio
// autônomo sem aprovação / aconselhamento regulado vale para QUALQUER funil da
// casa, e duplicá-lo por slug é como ele deixaria de valer um dia.

export function findHardDisqualifiers(answers, contact) {
  const text = Object.values(answers)
    .filter((value) => typeof value === "string")
    .join(" ")
    .toLowerCase();

  const flags = [];
  const spamPattern = /\b(spam|disparo em massa|disparos em massa|scraping|raspar contatos|comprar lista|cold bulk|bulk whatsapp)\b/;
  const autonomyPattern = /\b(sem aprovacao|sem aprovação|100% autonomo|100% autônomo|mandar sozinho|enviar sozinho)\b/;
  const regulatedAdvicePattern = /\b(diagnostico medico|diagnóstico médico|consulta juridica|consulta jurídica|recomendacao financeira|recomendação financeira)\b/;

  if (spamPattern.test(text)) {
    flags.push("spam_or_scraping_intent");
  }

  if (answers.guided_setup === "self_service_only" && autonomyPattern.test(text)) {
    flags.push("autonomous_external_sending_without_approval");
  }

  if (regulatedAdvicePattern.test(text)) {
    flags.push("regulated_high_risk_advice");
  }

  if (contact.consent_contact !== true || contact.privacy_ack !== true) {
    flags.push("missing_contact_or_privacy_consent");
  }

  if (!isUsableContact(contact)) {
    flags.push("invalid_contact");
  }

  return flags;
}

export function isUsableContact(contact) {
  const nameOk = typeof contact.name === "string" && contact.name.trim().length >= 2;
  const digits = String(contact.whatsapp || "").replace(/\D/g, "");
  return nameOk && digits.length >= 10 && digits.length <= 13;
}
