-- Migration 003: alinha o CHECK de `event_name` com o vocabulario que o site
-- realmente emite.
--
-- POR QUE ELA EXISTE
-- O vocabulario de eventos vive em tres camadas que precisam andar juntas:
--   1. `AnalyticsEvent` em lib/analytics.ts     — o que o cliente pode emitir
--   2. o enum zod em app/api/event/route.ts     — o que a borda aceita
--   3. o CHECK abaixo                           — o que o banco grava
--
-- A camada 2 andou e a 3 nao. Em 2026-09-01 o placar era 16 / 14 / 8. Os seis
-- eventos de quiz (`quiz_view`, `quiz_started`, `quiz_step_completed`,
-- `quiz_submitted`, `quiz_result_viewed`, `quiz_cta_clicked`) passavam no zod,
-- batiam no banco, violavam este CHECK e eram ENGOLIDOS por um catch que
-- devolvia 202 { accepted: true }. Outros dois (`calculator_shown` e
-- `schedule_click`) sequer chegavam ao banco: paravam no zod com 422.
-- Resultado: um endpoint que respondia "aceito" e nao gravava nada.
--
-- Esta migration fecha a camada 3 com os 16. O catch parou de mentir no mesmo
-- commit, entao a partir daqui uma divergencia vira 500 visivel em vez de
-- silencio. Guarda automatizada: funil-api/test/analytics-event-vocabulary.test.js
--
-- ORDEM DE APLICACAO (importa): esta migration ANTES do deploy do site novo.
-- Invertida, todo evento de quiz vira 500 ate' o banco alcancar.
--
-- IDEMPOTENTE de proposito: lib/db.ts `runMigrations()` nao tem ledger — ele
-- roda TODOS os arquivos .sql a cada chamada.
--
-- ALVO (verificado em producao em 2026-09-01, nao presumido):
--   banco      soul_genia_landing        <- NAO e' o funil_prod
--   container  soul_genia_postgres
--   role       soul_genia
--   constraint viva: landing_events_event_name_check (os mesmos 8 nomes do repo)
--   estado:    256 linhas na tabela, ZERO de quiz; ultima gravacao normal em
--              2026-08-29 12:05Z (controle positivo: o endpoint escreve, os
--              eventos de quiz e' que nunca entraram).

-- O CHECK inline da migration 002 recebeu o nome automatico do Postgres
-- (`<tabela>_<coluna>_check`). Se o nome vivo nao for esse nem o novo, PARE:
-- dropar o que nao existe e' no-op silencioso, e sobraria o CHECK antigo
-- restritivo convivendo com o novo — a escrita continuaria falhando.
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conrelid = 'landing_events'::regclass
          AND conname IN (
              'landing_events_event_name_check',
              'landing_events_event_name_allowed'
          )
    ) THEN
        RAISE EXCEPTION
            'landing_events: nao achei o CHECK de event_name com o nome esperado. Rode \d+ landing_events, descubra o nome vivo e ajuste esta migration ANTES de aplicar.';
    END IF;
END
$$;

ALTER TABLE landing_events DROP CONSTRAINT IF EXISTS landing_events_event_name_check;
ALTER TABLE landing_events DROP CONSTRAINT IF EXISTS landing_events_event_name_allowed;

ALTER TABLE landing_events ADD CONSTRAINT landing_events_event_name_allowed CHECK (
    event_name IN (
        'landing_view',
        'cta_clicked',
        'trial_form_viewed',
        'trial_form_submitted',
        'trial_form_error',
        'pricing_tier_viewed',
        'faq_item_opened',
        'demo_video_played',
        'quiz_view',
        'quiz_started',
        'quiz_step_completed',
        'quiz_submitted',
        'quiz_result_viewed',
        'quiz_cta_clicked',
        'calculator_shown',
        'schedule_click'
    )
);
