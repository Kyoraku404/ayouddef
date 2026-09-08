const fs = require("fs");
const text = fs.readFileSync("C:\\Users\\mohamed\\.gemini\\antigravity-ide\\brain\\0547898f-81ed-45c6-bd9f-d1b34f21b480\\.system_generated\\steps\\432\\content.md", "utf8");

let pos = 0;
while ((pos = text.toLowerCase().indexOf("zaky", pos)) !== -1) {
  console.log("Match at", pos, ":", text.substring(Math.max(0, pos - 60), Math.min(text.length, pos + 120)));
  pos += 4;
}
