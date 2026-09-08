const fs = require("fs");
const path = "C:\\Users\\mohamed\\.gemini\\antigravity-ide\\brain\\0547898f-81ed-45c6-bd9f-d1b34f21b480\\.system_generated\\logs\\transcript_full.jsonl";
const content = fs.readFileSync(path, "utf8");

// Search for r.jina.ai
const idx = content.indexOf("https://r.jina.ai/https://claude.ai/public/artifacts/6adb05af-a25e-4a2b-93e3-a580c99ea5d8");
if (idx !== -1) {
  console.log("Found jina URL at char", idx);
  const snippet = content.substring(idx, idx + 8000);
  fs.writeFileSync("C:\\Users\\mohamed\\.gemini\\antigravity-ide\\brain\\0547898f-81ed-45c6-bd9f-d1b34f21b480\\jina_snippet.txt", snippet);
  console.log("Written jina_snippet.txt");
} else {
  console.log("Not found");
}
