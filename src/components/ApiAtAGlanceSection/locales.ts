import type { ApiAtAGlanceBaseProps } from "./ApiAtAGlanceSection";

export const apiAtAGlanceSectionEnProps: ApiAtAGlanceBaseProps = {
  title: "API at a glance",
  purposeTitle: "Purpose",
  purposeBody:
    "Use as a Qdrant base URL for IDE agents or apps; vectors persist in YDB.",
  featuresTitle: "Key features",
  features: [
    "Qdrant‑compatible endpoints (collections, points, search/query aliases)",
    "Exact top‑k search over serialized vectors in YDB",
    "Batch upserts and batch deletes for bulk operations",
    "Million‑vector collections on YDB with deployment‑level capacity tuning",
    "Namespace isolation via api-key with optional X‑Tenant‑Id suffix",
    "pathSegments.* filters for search, query, and delete paths",
    "Collection last access tracking for tenant management",
    "Self‑host or use public demo endpoint",
    "Also available as Node.js library (createYdbQdrantClient)",
  ],
  serverTitle: "Use as HTTP server",
  serverLanguage: "bash",
  serverCodeBlock: `curl -X PUT http://localhost:8080/collections/mycol \\
  -H 'Content-Type: application/json' \\
  -H 'api-key: demo-key' \\
  -d '{"vectors":{"size":384,"distance":"Cosine","data_type":"float"}}'

curl -X POST http://localhost:8080/collections/mycol/points/upsert \\
  -H 'Content-Type: application/json' \\
  -H 'api-key: demo-key' \\
  -d '{"points":[{"id":"1","vector":[0.1,0.2,...384 vals...]}]}'

curl -X POST http://localhost:8080/collections/mycol/points/search \\
  -H 'Content-Type: application/json' \\
  -H 'api-key: demo-key' \\
  -d '{"vector":[0.1,0.2,...],"top":10,"with_payload":true,"score_threshold":0.4}'`,
  packageTitle: "Use as Node.js library",
  packageLanguage: "ts",
  packageCodeBlock: `// Install: npm install ydb-qdrant
import { createYdbQdrantClient } from "ydb-qdrant";

async function main() {
  const client = await createYdbQdrantClient({
    apiKey: "my-stable-namespace-key",
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
    "Совместимые с Qdrant эндпоинты (коллекции, точки, search/query aliases)",
    "Точный top‑k поиск по сериализованным векторам в YDB",
    "Пакетные upsert и delete для массовых операций",
    "Коллекции на миллионы векторов в YDB при настройке ресурсов deployment",
    "Изоляция namespace через api-key с опциональным суффиксом X‑Tenant‑Id",
    "Фильтры pathSegments.* для search, query и delete",
    "Отслеживание последнего доступа к коллекциям для управления тенантами",
    "Самохостинг или публичный demo‑endpoint",
    "Также доступен как Node.js‑библиотека (createYdbQdrantClient)",
  ],
  serverTitle: "Использование как HTTP‑сервис",
  serverLanguage: "bash",
  serverCodeBlock: `curl -X PUT http://localhost:8080/collections/mycol \\
  -H 'Content-Type: application/json' \\
  -H 'api-key: demo-key' \\
  -d '{"vectors":{"size":384,"distance":"Cosine","data_type":"float"}}'

curl -X POST http://localhost:8080/collections/mycol/points/upsert \\
  -H 'Content-Type: application/json' \\
  -H 'api-key: demo-key' \\
  -d '{"points":[{"id":"1","vector":[0.1,0.2,...384 vals...]}]}'

curl -X POST http://localhost:8080/collections/mycol/points/search \\
  -H 'Content-Type: application/json' \\
  -H 'api-key: demo-key' \\
  -d '{"vector":[0.1,0.2,...],"top":10,"with_payload":true,"score_threshold":0.4}'`,
  packageTitle: "Использование как Node.js‑пакет",
  packageLanguage: "ts",
  packageCodeBlock: `// Установка: npm install ydb-qdrant
import { createYdbQdrantClient } from "ydb-qdrant";

async function main() {
  const client = await createYdbQdrantClient({
    apiKey: "my-stable-namespace-key",
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
