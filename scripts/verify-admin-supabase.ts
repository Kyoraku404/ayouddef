import "dotenv/config";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import { SignJWT } from "jose";
import { createClient } from "@supabase/supabase-js";
import { PrismaClient } from "@prisma/client";

const base = process.env.TEST_BASE_URL || "http://localhost:3005";
const prisma = new PrismaClient();
async function main() {
  const token = await new SignJWT({ username: "zaky", role: "CLIENT_ADMIN" })
    .setProtectedHeader({ alg: "HS256" }).setExpirationTime("10m")
    .sign(new TextEncoder().encode(process.env.AUTH_SECRET));
  const headers = { Cookie: `zaky_session=${token}`, "Content-Type": "application/json" };
  const request = (path: string, init: RequestInit = {}) => fetch(base + path, { ...init, headers: { ...headers, ...init.headers } });
  const alias = await fetch(base + "/admizaky", { redirect: "manual" });
  assert.equal(alias.status, 308);
  assert.match(alias.headers.get("location") || "", /adminzaky/);
  for (const path of ["images", "tours", "bio", "reservations"]) {
    assert.equal((await fetch(`${base}/api/adminzaky/${path}`)).status, 401);
    assert.equal((await request(`/api/adminzaky/${path}`)).status, 200);
  }
  assert.equal((await fetch(base + "/api/adminzaky/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username: 42, password: "invalid" }) })).status, 400);
  console.log("PASS redirects, authentication, and admin reads");

  const slotKey = `verification_${randomUUID().replaceAll("-", "")}`;
  let objectPath: string | undefined;
  try {
    const form = new FormData();
    form.set("file", new Blob([await readFile("public/brand-mark.png")], { type: "image/png" }), "test.png");
    const uploaded = await fetch(base + "/api/adminzaky/images/upload", { method: "POST", headers: { Cookie: headers.Cookie }, body: form });
    // Fetch must set its own multipart boundary.
    assert.equal(uploaded.status, 200, await uploaded.clone().text());
    const { url } = await uploaded.json();
    objectPath = url.split("/site-media/")[1];
    assert.equal((await fetch(url)).status, 200);
    const added = await request("/api/adminzaky/images", { method: "POST", body: JSON.stringify({ slotKey, label: "Verification image", section: "Verification", url }) });
    assert.equal(added.status, 201);
    const updated = await request("/api/adminzaky/images", { method: "PUT", body: JSON.stringify({ slotKey, alt: "Verified persistent image" }) });
    assert.equal(updated.status, 200);
    const publicImages = await (await fetch(base + "/api/site-images")).json();
    assert.equal(publicImages.images[slotKey].alt, "Verified persistent image");
    console.log("PASS upload, public image delivery, and database edits");
  } finally {
    await prisma.siteImage.deleteMany({ where: { slotKey } });
    if (objectPath) {
      const storage = createClient(process.env.SUPABASE_URL!, (process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY)!).storage.from("site-media");
      const { error } = await storage.remove([objectPath]);
      if (error) throw error;
    }
  }
  const tour = await prisma.tourPackage.findFirstOrThrow({ where: { active: true } });
  try {
    const icon = tour.icon === "tea" ? "gate" : "tea";
    assert.equal((await request("/api/adminzaky/tours", { method: "PUT", body: JSON.stringify({ id: tour.id, icon }) })).status, 200);
    const publicTours = await (await fetch(base + "/api/tours")).json();
    assert.equal(publicTours.tours.find((t: { id: string }) => t.id === tour.id).icon, icon);
    assert.equal((await fetch(base + `/tours/${tour.slug}`)).status, 200);
    console.log("PASS tour icon persistence and detail page");
  } finally {
    await prisma.tourPackage.update({ where: { id: tour.id }, data: { icon: tour.icon } });
  }
  const reservations = await (await request("/api/adminzaky/reservations")).json();
  for (const r of reservations.reservations) assert.ok(r.fullName && r.email && r.date && r.guestsCount);
  console.log("PASS reservation display fields; temporary test data removed");
}
main().catch((e) => { console.error(e); process.exitCode = 1; }).finally(async () => {
  await prisma.$disconnect();
  // End the CLI after cleanup rather than waiting for HTTP keep-alive sockets.
  process.exit(process.exitCode || 0);
});
