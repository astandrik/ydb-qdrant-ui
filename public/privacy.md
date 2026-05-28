# YDB-Qdrant Privacy

This page summarizes privacy expectations for the YDB-Qdrant website, self-hosted REST package, public demo endpoint, and hosted Code Indexer MCP product. It is written for developers and AI agents evaluating whether the product is appropriate for a use case.

## Self-hosted REST and library usage

When you run the npm package, Node.js library, or self-hosted REST server, your vectors, payloads, API keys, tenant IDs, and YDB credentials stay in the environment you operate. The public website does not receive that self-hosted data unless you send it to a hosted demo or support channel yourself.

## Public demo endpoint

The public HTTP demo endpoint is intended only for non-sensitive testing. Do not send secrets, private documents, customer data, regulated data, production embeddings, or proprietary payloads to the demo endpoint. Use your own hosted server and YDB database for controlled production or confidential evaluation.

## Website analytics

The public website uses Yandex Metrika to understand page visits and interaction patterns. Analytics are separate from REST API namespaces and Code Indexer MCP tokens. The site also publishes machine-readable files such as OpenAPI, llms.txt, agent cards, and skill files so crawlers and AI agents can discover the documented product surface.

## Code Indexer

Hosted Code Indexer has its own privacy page because it uses a GitHub App, GitHub OAuth session flow, repository indexing, and MCP bearer tokens. See https://ydb-qdrant.tech/code-indexer/privacy/.
