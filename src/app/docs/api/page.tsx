import type { Metadata } from "next";
import { AgentResourcePage } from "@/components/AgentResourcePage";

export const metadata: Metadata = {
  title: "YDB-Qdrant REST API Reference",
  description:
    "Human-readable reference for the YDB-Qdrant Qdrant-compatible REST API, including collections, points, search, query, and delete endpoints.",
  alternates: {
    canonical: "/docs/api/",
  },
};

export default function ApiDocsPage() {
  return (
    <AgentResourcePage
      eyebrow="REST API"
      title="YDB-Qdrant REST API reference"
      lead={
        <p>
          YDB-Qdrant implements a focused Qdrant-compatible REST subset for
          collection metadata, point storage, exact top-k vector search, query
          compatibility, and point deletion.
        </p>
      }
      actions={[
        {
          href: "/openapi.json",
          label: "OpenAPI JSON",
          view: "action",
        },
        {
          href: "/docs/auth/",
          label: "Auth docs",
        },
      ]}
      sections={[
        {
          title: "Base URLs and headers",
          body: (
            <>
              <p>
                Use <code>https://ydb-qdrant.tech</code> for public HTTPS API
                routes such as <code>/health</code> and{" "}
                <code>/collections/...</code>,{" "}
                <code>http://ydb-qdrant.tech:8080</code> for the public demo
                Qdrant base URL, or{" "}
                <code>http://localhost:8080</code> for a self-hosted server.
              </p>
              <pre>{`Content-Type: application/json
api-key: my-stable-namespace-key
X-Tenant-Id: optional-workspace`}</pre>
            </>
          ),
        },
        {
          title: "Service endpoints",
          items: [
            <span key="root">
              <code>GET /</code>: returns service title and version on
              self-hosted servers. The public HTTPS root serves the static site.
            </span>,
            <span key="health">
              <code>GET /health</code>: returns{" "}
              <code>{'{"status":"ok"}'}</code> when the app and YDB probe are
              ready.
            </span>,
          ],
        },
        {
          title: "Collection endpoints",
          items: [
            <span key="create">
              <code>PUT /collections/{"{collection}"}</code>: create or confirm
              a collection with <code>vectors.size</code>,{" "}
              <code>vectors.distance</code>, and optional{" "}
              <code>vectors.data_type</code>.
            </span>,
            <span key="get">
              <code>GET /collections/{"{collection}"}</code>: return status,
              point count, and vector configuration.
            </span>,
            <span key="delete">
              <code>DELETE /collections/{"{collection}"}</code>: delete a
              collection and associated points for the namespace.
            </span>,
            <span key="index">
              <code>PUT /collections/{"{collection}"}/index</code>: acknowledge
              Qdrant payload-index compatibility calls without building a
              separate index.
            </span>,
          ],
        },
        {
          title: "Point endpoints",
          items: [
            <span key="retrieve">
              <code>POST /collections/{"{collection}"}/points</code>: retrieve
              points by ids.
            </span>,
            <span key="upsert-put">
              <code>PUT /collections/{"{collection}"}/points</code>: upsert
              points.
            </span>,
            <span key="upsert-post">
              <code>POST /collections/{"{collection}"}/points/upsert</code>:
              upsert points with POST.
            </span>,
            <span key="search">
              <code>POST /collections/{"{collection}"}/points/search</code>:
              exact top-k vector search.
            </span>,
            <span key="query">
              <code>POST /collections/{"{collection}"}/points/query</code>:
              query compatibility endpoint that accepts loose nested vector
              shapes.
            </span>,
            <span key="delete">
              <code>POST /collections/{"{collection}"}/points/delete</code>:
              delete by ids, empty filter, or supported{" "}
              <code>pathSegments.N</code> filters.
            </span>,
          ],
        },
        {
          title: "JSON error responses",
          body: (
            <pre>{`{
  "status": "error",
  "error": "collection not found",
  "code": "COLLECTION_NOT_FOUND",
  "message": "collection not found",
  "resolution": "Create the collection first, or check the collection name, api-key, and X-Tenant-Id namespace.",
  "request_id": "req-123"
}`}</pre>
          ),
          items: [
            "Every API error response is application/json rather than an HTML error page.",
            "The error field remains a string for Qdrant-compatible clients.",
            "Agents can use code, message, resolution, and request_id for recovery and support workflows.",
          ],
        },
        {
          title: "Example",
          body: (
            <pre>{`curl -X PUT http://localhost:8080/collections/documents \\
  -H 'Content-Type: application/json' \\
  -H 'api-key: demo-key' \\
  -d '{"vectors":{"size":3,"distance":"Cosine","data_type":"float"}}'

curl -X POST http://localhost:8080/collections/documents/points/upsert \\
  -H 'Content-Type: application/json' \\
  -H 'api-key: demo-key' \\
  -d '{"points":[{"id":"doc-1","vector":[0.1,0.2,0.3],"payload":{"title":"Doc 1"}}]}'

curl -X POST http://localhost:8080/collections/documents/points/search \\
  -H 'Content-Type: application/json' \\
  -H 'api-key: demo-key' \\
  -d '{"vector":[0.1,0.2,0.3],"top":10,"with_payload":true}'`}</pre>
          ),
        },
      ]}
    />
  );
}
