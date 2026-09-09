async function run() {
  console.log("=== Testing Database Image Management (Add, Edit, Delete, Global Reflection) ===");
  const baseUrl = "http://localhost:3000";

  // 1. Authenticate as Zaky admin
  console.log("\n1. Authenticating as Zaky Admin...");
  const loginRes = await fetch(`${baseUrl}/api/adminzaky/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: "zaky", password: "cirrav-wetZon-4boqsi" }),
  });

  const cookie = loginRes.headers.get("set-cookie");
  if (!cookie) {
    throw new Error("Failed to get session cookie: " + (await loginRes.text()));
  }
  console.log("✅ Authenticated successfully, session cookie acquired.");

  // 2. Add a new global image slot
  console.log("\n2. Adding new global image slot to PostgreSQL...");
  const testSlot = {
    slotKey: "test_sunset_riad",
    label: "Golden Sunset at Traditional Riad",
    section: "Hero Section",
    url: "/images/souks.jpg",
    alt: "Golden sunset over traditional riad courtyard",
    caption: "Breathtaking sunset in the heart of Marrakesh",
    sortOrder: 10,
  };

  const createRes = await fetch(`${baseUrl}/api/adminzaky/images`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookie,
    },
    body: JSON.stringify(testSlot),
  });

  const createJson = await createRes.json();
  console.log("Create Status:", createRes.status);
  console.log("Created Record in PostgreSQL:", createJson);
  if (createRes.status !== 201 || !createJson.image) {
    throw new Error("Create failed: " + JSON.stringify(createJson));
  }
  console.log("✅ Image successfully added to database!");

  // 3. Verify public API reflects the new image globally
  console.log("\n3. Verifying public /api/site-images contains new global image...");
  const pubRes = await fetch(`${baseUrl}/api/site-images`);
  const pubJson = await pubRes.json();
  const globalImg = pubJson.images[testSlot.slotKey];
  console.log("Public API image mapped:", globalImg);
  if (!globalImg || globalImg.url !== testSlot.url) {
    throw new Error("Public API did not reflect added image!");
  }
  console.log("✅ Global website dynamically received the new image!");

  // 4. Edit the image in the database
  console.log("\n4. Editing image details in PostgreSQL...");
  const updatedData = {
    slotKey: testSlot.slotKey,
    label: "Updated Sunset at Traditional Riad (Edited)",
    section: "Hero Section",
    url: "/images/bahia.jpg",
    alt: "Updated alt text after database edit",
    caption: "Updated caption description",
    sortOrder: 15,
  };

  const updateRes = await fetch(`${baseUrl}/api/adminzaky/images`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookie,
    },
    body: JSON.stringify(updatedData),
  });

  const updateJson = await updateRes.json();
  console.log("Update Status:", updateRes.status);
  console.log("Updated Record in PostgreSQL:", updateJson);
  if (updateRes.status !== 200 || !updateJson.image) {
    throw new Error("Update failed: " + JSON.stringify(updateJson));
  }
  console.log("✅ Image successfully updated in database!");

  // 5. Verify public API reflects the updated image globally
  console.log("\n5. Verifying public /api/site-images reflects updated URL & alt...");
  const pubRes2 = await fetch(`${baseUrl}/api/site-images`);
  const pubJson2 = await pubRes2.json();
  const updatedGlobalImg = pubJson2.images[testSlot.slotKey];
  console.log("Public API updated image:", updatedGlobalImg);
  if (!updatedGlobalImg || updatedGlobalImg.url !== updatedData.url || updatedGlobalImg.alt !== updatedData.alt) {
    throw new Error("Public API did not reflect updated image!");
  }
  console.log("✅ Global website dynamically reflected the edited image!");

  // 6. Delete the test image slot
  console.log("\n6. Deleting test image slot from PostgreSQL...");
  const deleteRes = await fetch(`${baseUrl}/api/adminzaky/images?slotKey=${testSlot.slotKey}`, {
    method: "DELETE",
    headers: { Cookie: cookie },
  });

  const deleteJson = await deleteRes.json();
  console.log("Delete Status:", deleteRes.status);
  console.log("Delete Response:", deleteJson);
  if (deleteRes.status !== 200) {
    throw new Error("Delete failed: " + JSON.stringify(deleteJson));
  }
  console.log("✅ Image successfully deleted from database!");

  // 7. Verify deletion from public API
  console.log("\n7. Verifying test image is removed from public API...");
  const pubRes3 = await fetch(`${baseUrl}/api/site-images`);
  const pubJson3 = await pubRes3.json();
  if (pubJson3.images[testSlot.slotKey]) {
    throw new Error("Deleted image still exists in public map!");
  }
  console.log("✅ Verified: deleted image is no longer in global site images.");

  console.log("\n🎉 ALL DATABASE IMAGE MANAGEMENT TESTS PASSED PERFECTLY!");
}

run().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
