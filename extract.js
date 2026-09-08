const fs = require("fs");
const path = "C:\\Users\\mohamed\\.gemini\\antigravity-ide\\brain\\0547898f-81ed-45c6-bd9f-d1b34f21b480\\.system_generated\\logs\\transcript_full.jsonl";
const content = fs.readFileSync(path, "utf8");
const lines = content.split("\n");

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes("r.jina.ai/https://claude.ai/api/published_artifacts")) {
    console.log("Found URL at line:", i);
    for (let j = i + 1; j < Math.min(i + 20, lines.length); j++) {
      if (lines[j].includes("browser_get_dom") || lines[j].includes("TOOL_RESPONSE") || lines[j].includes("published_artifacts")) {
        console.log("Saving line", j, "len:", lines[j].length);
        fs.writeFileSync("C:\\Users\\mohamed\\.gemini\\antigravity-ide\\brain\\0547898f-81ed-45c6-bd9f-d1b34f21b480\\api_dom_response.txt", lines[j]);
        break;
      }
    }
    break;
  }
}
