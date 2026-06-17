-- Migration 001: leads table
-- Run with: psql $DATABASE_URL -f db/migrations/001_leads.sql

CREATE TABLE IF NOT EXISTS leads (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email           TEXT NOT NULL,
    nome            TEXT NOT NULL,
    whatsapp        TEXT,
    vertical        TEXT CHECK (vertical IN ('saude','juridico','coach','criativo','servico_premium')),
    landing_variant TEXT CHECK (landing_variant IN ('exausto','escala','conta','default')),
    utm_source      TEXT,
    utm_medium      TEXT,
    utm_campaign    TEXT,
    utm_content     TEXT,
    referrer        TEXT,
    user_agent      TEXT,
    ip              INET,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_leads_created ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_variant ON leads(landing_variant);
CREATE INDEX IF NOT EXISTS idx_leads_email   ON leads(email);
