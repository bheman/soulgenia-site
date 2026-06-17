import postgres from "postgres";
import fs from "fs";
import path from "path";

type SqlClient = ReturnType<typeof postgres>;

let cachedSql: SqlClient | undefined;

function getSql(): SqlClient {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL environment variable is required");
  }

  cachedSql ??= postgres(databaseUrl, {
    max: 10,
    idle_timeout: 30,
    connect_timeout: 10,
    ssl: shouldUseDatabaseSsl() ? { rejectUnauthorized: false } : false,
  });

  return cachedSql;
}

function shouldUseDatabaseSsl(): boolean {
  const value = process.env.DATABASE_SSL?.trim().toLowerCase();
  return value === "1" || value === "true" || value === "require";
}

const sql = new Proxy(
  ((...args: unknown[]) => {
    const connection = getSql() as unknown as (
      ...callArgs: unknown[]
    ) => unknown;
    return connection(...args);
  }) as unknown as SqlClient,
  {
    get(_target, prop, receiver) {
      if (prop === "then") return undefined;
      const connection = getSql();
      const value = Reflect.get(connection as object, prop, receiver);
      return typeof value === "function" ? value.bind(connection) : value;
    },
  }
);

export default sql;

export async function runMigrations(): Promise<void> {
  const migrationsDir = path.join(process.cwd(), "db", "migrations");
  const files = fs
    .readdirSync(migrationsDir)
    .filter((f) => f.endsWith(".sql"))
    .sort();

  for (const file of files) {
    const migrationSql = fs.readFileSync(path.join(migrationsDir, file), "utf-8");
    console.log(`Running migration: ${file}`);
    await sql.unsafe(migrationSql);
    console.log(`Done: ${file}`);
  }
}
