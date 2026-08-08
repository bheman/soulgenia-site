export type FunnelQuestionOption = {
  value: string;
  label: string;
};

export type FunnelQuestion = {
  id: string;
  label: string;
  type: "single_choice" | "text" | "contact";
  required?: boolean;
  minLength?: number;
  allowOtherText?: boolean;
  fields?: string[];
  options?: FunnelQuestionOption[];
};

export type FunnelConfig = {
  slug: string;
  client: string;
  version: number;
  routePath: string;
  scoringVersion: string;
  account: string;
  questions: FunnelQuestion[];
  results: Record<string, FunnelResultCopy>;
};

export type FunnelResultCopy = {
  title: string;
  body: string;
  cta: string;
};

export type FunnelAnswerValue = string | boolean;

export type FunnelAnswers = Record<string, FunnelAnswerValue>;

export type FunnelContact = {
  name: string;
  whatsapp: string;
  /**
   * Obrigatório. Sem e-mail o ramo `nurture` não tem como entregar nada — e é
   * justamente o ramo onde a pessoa NÃO recebe botão de WhatsApp. A tela promete
   * "receber exemplos"; sem este campo a promessa não tem lastro.
   */
  email: string;
  consent_contact: boolean;
  privacy_ack: boolean;
};

export type FunnelSubmitResult = {
  response_id: string;
  scoring_version: string;
  score: number;
  score_breakdown: Record<string, number>;
  route:
    | "qualified_trial"
    | "nurture"
    | "waitlist_poor_fit"
    | "hard_disqualified"
    // diagnostico-ia-v1:
    | "self_serve_genia"
    | "agendar_diagnostico";
  crm_status: string;
  hard_disqualifiers: string[];
  routing_target: string | null;
  result: FunnelResultCopy;
  /**
   * Calculadora do diagnostico-ia-v1: horas/mes e custo/mes estimados do
   * atendimento manual. `null` nos funis sem calculadora — a tela de numero
   * so aparece quando isto vem preenchido.
   */
  computed?: { horas_mes: number; custo_mes: number | null } | null;
  capi: {
    mode: string;
    sent: boolean;
    event_id?: string;
    reason?: string;
  };
};
