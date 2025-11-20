import type { ApiAtAGlanceBaseProps } from "./ApiAtAGlanceSection";

export const apiAtAGlanceSectionEnProps: ApiAtAGlanceBaseProps = {
  title: "API at a glance",
  purposeTitle: "Purpose",
  purposeBody: "Use as a Qdrant base URL for IDE agents or apps; vectors persist in YDB.",
  featuresTitle: "Key features",
  features: [
    "Qdrant‑compatible endpoints",
    "Single‑phase top‑k using YDB vector index (auto‑built); table‑scan fallback",
    "Per‑tenant isolation",
    "Self‑host or demo",
  ],
  codeBlock: `curl -X PUT http://localhost:8080/collections/mycol \\
  -H 'Content-Type: application/json' \\
  -d '{"vectors":{"size":384,"distance":"Cosine","data_type":"float"}}'

curl -X POST http://localhost:8080/collections/mycol/points/upsert \\
  -H 'Content-Type: application/json' \\
  -d '{"points":[{"id":"1","vector":[0.1,0.2,...384 vals...]}]}'

curl -X POST http://localhost:8080/collections/mycol/points/search \\
  -H 'Content-Type: application/json' \\
  -d '{"vector":[0.1,0.2,...],"limit":5,"with_payload":true}'`,
  healthText: `Health: GET /health → {"status":"ok"}`,
};

export const apiAtAGlanceSectionRuProps: ApiAtAGlanceBaseProps = {
  title: "API кратко",
  purposeTitle: "Назначение",
  purposeBody: "Используйте как базовый URL Qdrant для IDE‑агентов или приложений; векторы хранятся в YDB.",
  featuresTitle: "Особенности",
  features: [
    "Совместимые с Qdrant эндпоинты",
    "Однофазный top‑k с векторным индексом YDB (авто); фоллбек — скан таблицы",
    "Разделение данных по арендаторам",
    "Самохостинг или hosted endpoint для IDE",
  ],
  codeBlock: `curl -X PUT http://localhost:8080/collections/mycol \\
  -H 'Content-Type: application/json' \\
  -d '{"vectors":{"size":384,"distance":"Cosine","data_type":"float"}}'

curl -X POST http://localhost:8080/collections/mycol/points/upsert \\
  -H 'Content-Type: application/json' \\
  -d '{"points":[{"id":"1","vector":[0.1,0.2,...384 vals...]}]}'

curl -X POST http://localhost:8080/collections/mycol/points/search \\
  -H 'Content-Type: application/json' \\
  -d '{"vector":[0.1,0.2,...],"limit":5,"with_payload":true}'`,
  healthText: `Проверка состояния: GET /health → {"status":"ok"}`,
};

