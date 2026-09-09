import EmbeddedPostgres from "embedded-postgres";
import path from "path";
import fs from "fs";

function ensureRequiredPostgresDirs(dbDir: string) {
  const dirs = [
    "pg_notify",
    "pg_tblspc",
    "pg_replslot",
    "pg_snapshots",
    "pg_commit_ts",
    "pg_twophase",
    "pg_stat",
    "pg_stat_tmp",
    "pg_dynshmem",
    "pg_serial",
    path.join("pg_logical", "snapshots"),
    path.join("pg_logical", "mappings"),
    path.join("pg_wal", "archive_status"),
    path.join("pg_wal", "summaries"),
  ];

  for (const rel of dirs) {
    const full = path.join(dbDir, rel);
    if (!fs.existsSync(full)) {
      fs.mkdirSync(full, { recursive: true });
    }
  }
}

async function main() {
  console.log("Initializing PostgreSQL cluster...");
  const dbDir = path.join(process.cwd(), ".postgres-data");

  const pg = new EmbeddedPostgres({
    databaseDir: dbDir,
    user: "postgres",
    password: "password",
    port: 5432,
    persistent: true,
  });

  try {
    await pg.initialise();
    console.log("Cluster initialised.");
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.log("Initialise result:", msg);
  }

  // Ensure all necessary Postgres directories exist (prevents FATAL startup crashes)
  ensureRequiredPostgresDirs(dbDir);

  console.log("Starting PostgreSQL server on port 5432...");
  await pg.start();
  console.log("PostgreSQL started successfully on port 5432!");

  try {
    await pg.createDatabase("marrakeshi_tours");
    console.log("Database 'marrakeshi_tours' created or already exists.");
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.log("Database create status:", msg);
  }

  console.log("Verifying connection...");
  const client = pg.getPgClient();
  await client.connect();
  const res = await client.query("SELECT version();");
  console.log("Connected to PostgreSQL! Version:", res.rows[0].version);
  await client.end();

  console.log("PostgreSQL daemon running. Keeping process alive...");
  // Keep alive
  setInterval(() => {}, 1000 * 60 * 60);
}

main().catch((err) => {
  console.error("PostgreSQL startup error:", err);
  process.exit(1);
});
