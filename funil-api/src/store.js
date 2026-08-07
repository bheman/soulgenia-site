import crypto from "node:crypto";
import pg from "pg";

const { Pool } = pg;

export function createRepository(env = process.env) {
  if (env.DATABASE_URL) {
    return new PostgresRepository(env.DATABASE_URL);
  }

  return new MemoryRepository();
}

export class MemoryRepository {
  constructor() {
    this.responses = [];
    this.waitlist = [];
  }

  async saveResponse(response) {
    const saved = {
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
      ...response
    };
    this.responses.push(saved);
    return saved;
  }

  async saveWaitlist(entry) {
    const saved = {
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
      ...entry
    };
    this.waitlist.push(saved);
    return saved;
  }

  async listResponses({ slug, limit = 50 }) {
    return this.responses
      .filter((response) => !slug || response.funil_slug === slug)
      .slice(-limit)
      .reverse();
  }
}

export class PostgresRepository {
  constructor(databaseUrl) {
    this.pool = new Pool({ connectionString: databaseUrl });
  }

  async saveResponse(response) {
    const result = await this.pool.query(
      `INSERT INTO lead_quiz_responses
        (funil_slug, funil_version, scoring_version, bucket, answers, contact,
         consent, score, route, routing_target, hard_disqualifiers, utm,
         user_agent, ip_hash, meta_capi_mode, meta_capi_sent, meta_capi_event_id)
       VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
       RETURNING *`,
      [
        response.funil_slug,
        response.funil_version,
        response.scoring_version,
        response.bucket || null,
        response.answers,
        response.contact,
        response.consent || {},
        response.score,
        response.route,
        response.routing_target || null,
        response.hard_disqualifiers,
        response.utm || null,
        response.user_agent || null,
        response.ip_hash || null,
        response.meta_capi_mode || "disabled",
        response.meta_capi_sent || false,
        response.meta_capi_event_id || null
      ]
    );

    return result.rows[0];
  }

  async saveWaitlist(entry) {
    const result = await this.pool.query(
      `INSERT INTO lead_waitlist (funil_slug, contact, reason, source_response_id)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [entry.funil_slug, entry.contact, entry.reason || null, entry.source_response_id || null]
    );

    return result.rows[0];
  }

  async listResponses({ slug, limit = 50 }) {
    const result = await this.pool.query(
      `SELECT id, funil_slug, scoring_version, score, route, routing_target,
              answers, contact, utm, created_at
       FROM lead_quiz_responses
       WHERE ($1::text IS NULL OR funil_slug = $1)
       ORDER BY created_at DESC
       LIMIT $2`,
      [slug || null, limit]
    );

    return result.rows;
  }
}

export function hashIp(value) {
  if (!value) {
    return null;
  }

  return crypto.createHash("sha256").update(String(value)).digest("hex");
}
