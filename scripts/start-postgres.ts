import EmbeddedPostgres from "embedded-postgres";
import path from "path";

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
  } catch (err: any) {
    console.log("Initialise result:", err?.message || err);
  }

  console.log("Starting PostgreSQL server on port 5432...");
  await pg.start();
  console.log("PostgreSQL started successfully on port 5432!");

  try {
    await pg.createDatabase("marrakeshi_tours");
    console.log("Database 'marrakeshi_tours' created or already exists.");
  } catch (err: any) {
    console.log("Database create status:", err?.message || err);
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
