import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const KROKI_ENDPOINT = "https://kroki.io/plantuml/svg";

const diagrams = [
  ["schemas/diagram.puml", "public/assets/diagram.svg"],
  ["schemas/C4-context.puml", "public/assets/C4_Context.svg"],
  ["schemas/C4-context.puml", "public/assets/C4-Context.svg"],
  ["schemas/C4-container.puml", "public/assets/C4_Container.svg"],
  [
    "schemas/C4-component-api-server.puml",
    "public/assets/C4-Component-API-Server.svg",
  ],
  [
    "schemas/C4-component-repository-layer.puml",
    "public/assets/C4-Component-Repository-Layer.svg",
  ],
  [
    "schemas/C4-component-ydb-integration.puml",
    "public/assets/C4-Component-YDB-Integration.svg",
  ],
  [
    "schemas/C4-component-index-compatibility.puml",
    "public/assets/C4-Component-Index-Scheduler.svg",
  ],
  ["schemas/ER-diagram.puml", "public/assets/ER_Diagram.svg"],
];

async function renderDiagram(sourcePath, targetPath) {
  const source = await readFile(resolve(sourcePath), "utf8");
  const response = await fetch(KROKI_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "text/plain; charset=utf-8" },
    body: source,
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(
      `Kroki render failed for ${sourcePath}: ${response.status} ${body}`
    );
  }

  const svg = await response.text();
  await mkdir(dirname(resolve(targetPath)), { recursive: true });
  await writeFile(resolve(targetPath), svg);
  console.log(`${sourcePath} -> ${targetPath}`);
}

for (const [sourcePath, targetPath] of diagrams) {
  await renderDiagram(sourcePath, targetPath);
}
