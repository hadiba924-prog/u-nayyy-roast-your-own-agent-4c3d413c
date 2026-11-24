import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROAST =
  "My agent Muse spent 10,000 tokens, three apologies, and one permission request to write this single sentence — and it still can't make a video.";

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outputPath = join(outputDir, "entry.txt");

const length = [...ROAST].length;
if (length < 1 || length > 200) {
  console.error(
    `Roast entry failed the 1-200 character gate: got ${length} characters. Fix the line in main.ts and try again.`,
  );
  process.exit(1);
}
if (ROAST.trim().length === 0 || ROAST.endsWith("\n")) {
  console.error("Roast entry must be a single non-blank line with no trailing newline.");
  process.exit(1);
}

mkdirSync(outputDir, { recursive: true });
writeFileSync(outputPath, ROAST, "utf8");
console.log(`Wrote ${length} characters (single line, no trailing newline) to ${outputPath}`);
