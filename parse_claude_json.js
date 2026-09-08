const fs = require("fs");
const raw = fs.readFileSync("C:\\Users\\mohamed\\.gemini\\antigravity-ide\\brain\\0547898f-81ed-45c6-bd9f-d1b34f21b480\\claude_api_curl.json", "utf8").replace(/^\uFEFF/, "");
console.log("Raw length:", raw.length);
try {
  const data = JSON.parse(raw);
  console.log("Keys:", Object.keys(data));
  console.log("Title:", data.title);
  console.log("Type:", data.type);
  console.log("Language:", data.language);
  if (data.content) {
    console.log("Content length:", data.content.length);
    fs.writeFileSync("C:\\Users\\mohamed\\.gemini\\antigravity-ide\\brain\\0547898f-81ed-45c6-bd9f-d1b34f21b480\\claude_artifact_content.html", data.content);
    console.log("Content saved to claude_artifact_content.html");
  }
} catch (e) {
  console.error("JSON parse error:", e.message);
  console.log("First 500 chars:", raw.substring(0, 500));
}
