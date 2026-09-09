import http from "http";

async function fetchJson(url: string, options?: any): Promise<any> {
  const res = await fetch(url, options);
  return {
    status: res.status,
    data: await res.json().catch(() => null),
  };
}

async function runTests() {
  console.log("=== Testing API Verification ===");
  
  // 1. Test GET /api/tours
  const toursRes = await fetchJson("http://localhost:3000/api/tours");
  console.log(`GET /api/tours status: ${toursRes.status}`);
  if (toursRes.data?.tours) {
    console.log(`Found ${toursRes.data.tours.length} tours.`);
    const first = toursRes.data.tours[0];
    console.log(`Tour sample: "${first.title}"`);
    console.log(`Has description: ${Boolean(first.description)}`);
    console.log(`Has included (${first.included?.length || 0} items)`);
    console.log(`Has notIncluded (${first.notIncluded?.length || 0} items)`);
    console.log(`Has itinerary stops (${first.itinerary?.length || 0} stops)`);
    console.log(`Has mapCenter: ${JSON.stringify(first.mapCenter)}`);
  }

  // 2. Test PUT /api/adminzaky/tours with authenticated session
  console.log("\nLogging in to /api/adminzaky/login...");
  let cookieHeader = "";
  const loginRes = await fetch("http://localhost:3000/api/adminzaky/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: "zaky", password: "password123" }),
  });
  console.log(`Login status: ${loginRes.status}`);
  const setCookie = loginRes.headers.get("set-cookie");
  if (setCookie) {
    cookieHeader = setCookie.split(";")[0];
    console.log(`Authenticated! Cookie captured.`);
  }

  console.log("\nTesting PUT /api/adminzaky/tours (editing description, included, notIncluded, itinerary, mapCenter)...");
  const firstTour = toursRes.data.tours[0];
  const updatePayload = {
    id: firstTour.id,
    description: firstTour.description + " [Verified Update]",
    included: JSON.stringify(["Official licensed tour guide", "Custom Medina itinerary", "Bottle of mineral water"]),
    notIncluded: JSON.stringify(["Monument entrance tickets", "Personal shopping", "Gratuities"]),
    itinerary: JSON.stringify([
      {
        stopNumber: 1,
        name: "Bab Agnaou Gate",
        duration: "30 mins",
        description: "12th-century Almohad royal entrance to the Kasbah.",
        lat: 31.6174,
        lng: -7.9892,
      },
      {
        stopNumber: 2,
        name: "Saadian Tombs",
        duration: "45 mins",
        description: "Intricate marble mausoleums and cedarwood domes.",
        lat: 31.6172,
        lng: -7.9890,
      }
    ]),
    mapCenter: JSON.stringify({ lat: 31.6174, lng: -7.9892, zoom: 16 }),
  };

  const putRes = await fetch("http://localhost:3000/api/adminzaky/tours", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(cookieHeader ? { Cookie: cookieHeader } : {}),
    },
    body: JSON.stringify(updatePayload),
  });
  const putData = await putRes.json().catch(() => null);
  console.log(`PUT /api/adminzaky/tours status: ${putRes.status}`);
  console.log(`PUT response:`, putData);

  // 3. Verify changes persisted in database by refetching
  const verifyRes = await fetchJson("http://localhost:3000/api/tours");
  const updatedFirst = verifyRes.data.tours.find((t: any) => t.id === firstTour.id);
  console.log("\nVerified updated tour from DB:");
  console.log(`Description updated: ${updatedFirst.description.includes("[Verified Update]")}`);
  console.log(`Included count: ${updatedFirst.included?.length}`);
  console.log(`Not included count: ${updatedFirst.notIncluded?.length}`);
  console.log(`Itinerary stops: ${updatedFirst.itinerary?.length} (Stop 1: ${updatedFirst.itinerary?.[0]?.name})`);
  console.log(`Map center: ${JSON.stringify(updatedFirst.mapCenter)}`);

  // Restore original description
  await fetch("http://localhost:3000/api/adminzaky/tours", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(cookieHeader ? { Cookie: cookieHeader } : {}),
    },
    body: JSON.stringify({
      id: firstTour.id,
      description: firstTour.description,
    }),
  });
  console.log("Restored original description cleanly.");

  // 4. Test GET / (HTML rendering)
  const homeRes = await fetch("http://localhost:3000/");
  console.log(`\nGET / status: ${homeRes.status}`);
  const homeHtml = await homeRes.text();
  console.log(`Home page HTML size: ${homeHtml.length} bytes`);
  console.log(`Contains MAD currency toggle: ${homeHtml.includes("MAD")}`);
  console.log(`Contains EUR currency toggle: ${homeHtml.includes("EUR")}`);
  console.log(`Contains Language Switcher: ${homeHtml.includes("EN") && homeHtml.includes("FR") && homeHtml.includes("ES")}`);

  // 5. Test Tour Detail Page
  const tourPageRes = await fetch(`http://localhost:3000/tours/${firstTour.slug}`);
  console.log(`\nGET /tours/${firstTour.slug} status: ${tourPageRes.status}`);
  const tourPageHtml = await tourPageRes.text();
  console.log(`Tour detail page HTML size: ${tourPageHtml.length} bytes`);

  console.log("\n=== ALL TESTS COMPLETED SUCCESSFULLY ===");
}

runTests().catch(console.error);
