-- Migration 002: landing event tracking
-- Stores first-party marketing events for the MVP funnel.

CREATE TABLE IF NOT EXISTS landing_events (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_name      TEXT NOT NULL CHECK (event_name IN (
        'landing_view',
        'cta_clicked',
        'trial_form_viewed',
        'trial_form_submitted',
        'trial_form_error',
        'pricing_tier_viewed',
        'faq_item_opened',
        'demo_video_played'
    )),
    landing_variant TEXT CHECK (landing_variant IN ('exausto','escala','conta','default')),
    page            TEXT,
    position        TEXT,
    destination     TEXT,
    href            TEXT,
    path            TEXT,
    utm_source      TEXT,
    utm_medium      TEXT,
    utm_campaign    TEXT,
    utm_content     TEXT,
    referrer        TEXT,
    properties      JSONB NOT NULL DEFAULT '{}'::jsonb,
    user_agent      TEXT,
    ip              INET,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_landing_events_created ON landing_events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_landing_events_name ON landing_events(event_name);
CREATE INDEX IF NOT EXISTS idx_landing_events_campaign ON landing_events(utm_source, utm_medium, utm_campaign);
