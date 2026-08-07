CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS funil_configs (
  slug TEXT PRIMARY KEY,
  client TEXT NOT NULL,
  version INT NOT NULL,
  scoring_version TEXT NOT NULL,
  config JSONB NOT NULL,
  is_active BOOLEAN DEFAULT true,
  bucket TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS lead_quiz_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  funil_slug TEXT NOT NULL,
  funil_version INT NOT NULL,
  scoring_version TEXT NOT NULL,
  bucket TEXT,
  answers JSONB NOT NULL,
  contact JSONB NOT NULL,
  consent JSONB NOT NULL DEFAULT '{}'::jsonb,
  score INT NOT NULL,
  route TEXT NOT NULL,
  routing_target TEXT,
  hard_disqualifiers JSONB NOT NULL DEFAULT '[]'::jsonb,
  utm JSONB,
  user_agent TEXT,
  ip_hash TEXT,
  meta_capi_mode TEXT NOT NULL DEFAULT 'disabled',
  meta_capi_sent BOOLEAN DEFAULT false,
  meta_capi_event_id UUID,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_lead_quiz_responses_slug_created
  ON lead_quiz_responses (funil_slug, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_lead_quiz_responses_route_created
  ON lead_quiz_responses (route, created_at DESC);

CREATE TABLE IF NOT EXISTS lead_waitlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  funil_slug TEXT NOT NULL,
  contact JSONB NOT NULL,
  reason TEXT,
  source_response_id UUID,
  created_at TIMESTAMPTZ DEFAULT now()
);
