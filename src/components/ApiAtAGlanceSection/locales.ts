import type { ApiAtAGlanceBaseProps } from "./ApiAtAGlanceSection";

export const apiAtAGlanceSectionEnProps: ApiAtAGlanceBaseProps = {
  title: "API at a glance",
  purposeTitle: "Purpose",
  purposeBody:
    "Use as a Qdrant base URL for IDE agents or apps; vectors persist in YDB.",
  featuresTitle: "Key features",
  features: [
    "Qdrant‑compatible endpoints",
    "Single‑phase top‑k using YDB vector index (auto‑built); table‑scan fallback",
    "Per‑tenant isolation",
    "Self‑host or demo",
    "Programmatic Node.js client (createYdbQdrantClient)",
  ],
  serverTitle: "Use as HTTP server",
  serverLanguage: "bash",
  serverCodeBlock: `curl -X PUT http://localhost:8080/collections/mycol \\
  -H 'Content-Type: application/json' \\
  -d '{"vectors":{"size":384,"distance":"Cosine","data_type":"float"}}'

curl -X POST http://localhost:8080/collections/mycol/points/upsert \\
  -H 'Content-Type: application/json' \\
  -d '{"points":[{"id":"1","vector":[0.1,0.2,...384 vals...]}]}'

curl -X POST http://localhost:8080/collections/mycol/points/search \\
  -H 'Content-Type: application/json' \\
  -d '{"vector":[0.1,0.2,...],"limit":5,"with_payload":true}'`,
  packageTitle: "Use as Node.js library",
  packageLanguage: "ts",
  packageCodeBlock: `// Install: npm install ydb-qdrant
import { createYdbQdrantClient } from "ydb-qdrant";

async function main() {
  // defaultTenant is optional; defaults to "default"
  const client = await createYdbQdrantClient({
    defaultTenant: "myapp",
    endpoint: "grpcs://lb.etn01g9tcilcon2mrt3h.ydb.mdb.yandexcloud.net:2135",
    database: "/ru-central1/b1ge4v9r1l3h1q4njclp/etn01g9tcilcon2mrt3h",
  });

  await client.createCollection("documents", {
    vectors: {
      size: 1536,
      distance: "Cosine",
      data_type: "float",
    },
  });

  await client.upsertPoints("documents", {
    points: [
      { id: "doc-1", vector: [/* embedding */], payload: { title: "Doc 1" } },
    ],
  });

  const result = await client.searchPoints("documents", {
    vector: [/* query embedding */],
    top: 10,
    with_payload: true,
  });

  console.log(result.points);
}
`,
  healthText: `Health: GET /health → {"status":"ok"}`,
};

export const apiAtAGlanceSectionRuProps: ApiAtAGlanceBaseProps = {
  title: "API кратко",
  purposeTitle: "Назначение",
  purposeBody:
    "Используйте как базовый URL Qdrant для IDE‑агентов или приложений; векторы хранятся в YDB.",
  featuresTitle: "Особенности",
  features: [
    "Совместимые с Qdrant эндпоинты",
    "Однофазный top‑k с векторным индексом YDB (авто); фоллбек — скан таблицы",
    "Разделение данных по арендаторам",
    "Самохостинг или hosted endpoint для IDE",
    "Программный Node.js‑клиент (createYdbQdrantClient)",
  ],
  serverTitle: "Использование как HTTP‑сервис",
  serverLanguage: "bash",
  serverCodeBlock: `curl -X PUT http://localhost:8080/collections/mycol \\
  -H 'Content-Type: application/json' \\
  -d '{"vectors":{"size":384,"distance":"Cosine","data_type":"float"}}'

curl -X POST http://localhost:8080/collections/mycol/points/upsert \\
  -H 'Content-Type: application/json' \\
  -d '{"points":[{"id":"1","vector":[0.1,0.2,...384 vals...]}]}'

curl -X POST http://localhost:8080/collections/mycol/points/search \\
  -H 'Content-Type: application/json' \\
  -d '{"vector":[0.1,0.2,...],"limit":5,"with_payload":true}'`,
  packageTitle: "Использование как Node.js‑пакет",
  packageLanguage: "ts",
  packageCodeBlock: `// Установка: npm install ydb-qdrant
import { createYdbQdrantClient } from "ydb-qdrant";

async function main() {
  // defaultTenant опционален; по умолчанию "default"
  const client = await createYdbQdrantClient({
    defaultTenant: "myapp",
    endpoint: "grpcs://lb.etn01g9tcilcon2mrt3h.ydb.mdb.yandexcloud.net:2135",
    database: "/ru-central1/b1ge4v9r1l3h1q4njclp/etn01g9tcilcon2mrt3h",
  });

  await client.createCollection("documents", {
    vectors: {
      size: 1536,
      distance: "Cosine",
      data_type: "float",
    },
  });

  await client.upsertPoints("documents", {
    points: [
      { id: "doc-1", vector: [/* embedding */], payload: { title: "Doc 1" } },
    ],
  });

  const result = await client.searchPoints("documents", {
    vector: [/* query embedding */],
    top: 10,
    with_payload: true,
  });

  console.log(result.points);
}
`,
  healthText: `Проверка состояния: GET /health → {"status":"ok"}`,
};
