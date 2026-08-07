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
    | "hard_disqualified";
  crm_status: string;
  hard_disqualifiers: string[];
  routing_target: string | null;
  result: FunnelResultCopy;
  capi: {
    mode: string;
    sent: boolean;
    event_id?: string;
    reason?: string;
  };
};
