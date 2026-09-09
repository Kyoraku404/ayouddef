import { prisma } from "../lib/db";
import { createZakySession, ZAKY_SESSION_COOKIE } from "../lib/auth";

async function main() {
  console.log("=== Testing Tour Packs & Prices + Guide Bio Integration ===\n");

  // 1. Generate auth cookie
  const token = await createZakySession("zaky");
  const cookieHeader = `${ZAKY_SESSION_COOKIE}=${token}`;
  console.log("1. Generated Zaky auth token.");

  const baseUrl = "http://localhost:3000";

  // 2. Fetch admin tours
  console.log("2. Fetching tours via /api/adminzaky/tours...");
  const adminToursRes = await fetch(`${baseUrl}/api/adminzaky/tours`, {
    headers: { Cookie: cookieHeader },
  });
  console.log("Admin Tours Status:", adminToursRes.status);
  const adminToursData = await adminToursRes.json();
  console.log(`Fetched ${adminToursData.tours?.length} tour packages from DB.`);
  if (!adminToursData.tours || adminToursData.tours.length === 0) {
    throw new Error("No tours returned from admin API!");
  }

  // 3. Update price of marrakesh-medina-tour to "750 MAD"
  console.log("\n3. Updating price of 'marrakesh-medina-tour' to '750 MAD'...");
  const targetTour = adminToursData.tours.find((t: any) => t.slug === "marrakesh-medina-tour");
  const updateRes = await fetch(`${baseUrl}/api/adminzaky/tours`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieHeader,
    },
    body: JSON.stringify({
      id: targetTour.id,
      price: "750 MAD",
      badge: "Most Popular",
    }),
  });
  console.log("Update Status:", updateRes.status);
  const updateData = await updateRes.json();
  console.log("Updated Tour in DB:", updateData.tour?.title, "=>", updateData.tour?.price);

  // 4. Verify public /api/tours returns the new price
  console.log("\n4. Verifying public /api/tours reflects '750 MAD'...");
  const publicToursRes = await fetch(`${baseUrl}/api/tours`);
  const publicToursData = await publicToursRes.json();
  const publicMedina = publicToursData.tours.find((t: any) => t.slug === "marrakesh-medina-tour");
  console.log("Public Tour Price:", publicMedina.price);
  if (publicMedina.price !== "750 MAD") {
    throw new Error(`Expected 750 MAD but got ${publicMedina.price}`);
  }
  console.log("✅ Public website received updated price '750 MAD'!");

  // 5. Fetch Guide Bio
  console.log("\n5. Fetching guide bio via /api/adminzaky/bio...");
  const bioRes = await fetch(`${baseUrl}/api/adminzaky/bio`, {
    headers: { Cookie: cookieHeader },
  });
  console.log("Admin Bio Status:", bioRes.status);
  const bioData = await bioRes.json();
  console.log("Current Guide Bio Name:", bioData.bio?.name, "| Exp:", bioData.bio?.experienceYears, "years");

  // 6. Update Guide Bio
  console.log("\n6. Updating guide bio via /api/adminzaky/bio...");
  const updateBioRes = await fetch(`${baseUrl}/api/adminzaky/bio`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieHeader,
    },
    body: JSON.stringify({
      name: "Zaky",
      experienceYears: "20",
      signoff: "Welcome to Marrakesh — let me show you my Morocco (Updated).",
    }),
  });
  console.log("Update Bio Status:", updateBioRes.status);
  const updateBioData = await updateBioRes.json();
  console.log("Updated Bio:", updateBioData.bio?.name, "| Exp:", updateBioData.bio?.experienceYears);

  // 7. Verify public /api/bio
  console.log("\n7. Verifying public /api/bio reflects updated bio...");
  const publicBioRes = await fetch(`${baseUrl}/api/bio`);
  const publicBioData = await publicBioRes.json();
  console.log("Public Bio Exp Years:", publicBioData.bio?.experienceYears);
  if (publicBioData.bio?.experienceYears !== "20") {
    throw new Error(`Expected experienceYears 20 but got ${publicBioData.bio?.experienceYears}`);
  }
  console.log("✅ Public website received updated guide bio!");

  // 8. Revert back to original values
  console.log("\n8. Reverting test changes back to pristine defaults...");
  await fetch(`${baseUrl}/api/adminzaky/tours`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieHeader,
    },
    body: JSON.stringify({
      id: targetTour.id,
      price: "700 MAD",
      badge: "Most Popular",
    }),
  });

  await fetch(`${baseUrl}/api/adminzaky/bio`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieHeader,
    },
    body: JSON.stringify({
      experienceYears: "19",
      signoff: "Welcome to Marrakesh — let me show you my Morocco.",
    }),
  });
  console.log("✅ Test changes reverted cleanly.");

  console.log("\n🎉 ALL TOUR PACKS & GUIDE BIO INTEGRATION TESTS PASSED!");
}

main()
  .catch((e) => {
    console.error("Test failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
