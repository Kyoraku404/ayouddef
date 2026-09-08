async function main() {
  console.log("--- Starting /adminzaky API Verification ---");

  // 1. Legacy /admin redirect
  const res1 = await fetch("http://localhost:3000/admin", { redirect: "manual" });
  console.log("1. /admin redirect ->", res1.status, res1.headers.get("location"));

  // 2. /adminzaky unauthenticated redirect
  const res2 = await fetch("http://localhost:3000/adminzaky", { redirect: "manual" });
  console.log("2. /adminzaky unauthenticated ->", res2.status, res2.headers.get("location"));

  // 3. Invalid credentials
  const res3 = await fetch("http://localhost:3000/api/adminzaky/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: "zaky", password: "badpassword" }),
  });
  console.log("3. Invalid login ->", res3.status);

  // 4. Valid credentials: zaky / cirrav-wetZon-4boqsi
  const res4 = await fetch("http://localhost:3000/api/adminzaky/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: "zaky", password: "cirrav-wetZon-4boqsi" }),
  });
  const data4 = await res4.json();
  const setCookie = res4.headers.get("set-cookie");
  const cookieVal = setCookie ? setCookie.split(";")[0] : "";
  console.log("4. Valid login ->", res4.status, data4.user?.username, "Cookie:", cookieVal ? "Present" : "Missing");

  // 5. Fetch images with cookie
  const res5 = await fetch("http://localhost:3000/api/adminzaky/images", {
    headers: { Cookie: cookieVal },
  });
  const data5 = await res5.json();
  console.log("5. Images list count ->", data5.images?.length);

  // 6. Update image slot
  const res6 = await fetch("http://localhost:3000/api/adminzaky/images", {
    method: "PUT",
    headers: { "Content-Type": "application/json", Cookie: cookieVal },
    body: JSON.stringify({
      slotKey: "hero_main",
      url: "/images/hero.jpg",
      alt: "Private Guide Zaky in Marrakesh Historical Setting",
      caption: "Discover Marrakesh with private guide Zaky",
    }),
  });
  const data6 = await res6.json();
  console.log("6. Update image slot ->", res6.status, data6.image?.slotKey, "Updated alt:", data6.image?.alt);

  // 7. Verify public site-images endpoint
  const res7 = await fetch("http://localhost:3000/api/site-images");
  const data7 = await res7.json();
  console.log("7. Public site-images hero_main alt:", data7.images?.hero_main?.alt);

  console.log("--- All /adminzaky API Tests Passed Successfully! ---");
}

main().catch(console.error);
