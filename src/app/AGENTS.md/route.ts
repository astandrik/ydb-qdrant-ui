import { readFile } from "node:fs/promises";
import path from "node:path";

export const dynamic = "force-static";

export async function GET() {
  const content = await readFile(
    path.join(process.cwd(), "public", "agents.md"),
    "utf8",
  );

  return new Response(content, {
    headers: {
      "content-type": "text/markdown; charset=utf-8",
    },
  });
}
