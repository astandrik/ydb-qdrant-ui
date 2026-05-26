export const CODE_INDEXER_BACKEND_URL = "https://code-indexer.ydb-qdrant.tech";
export const CODE_INDEXER_INSTALL_URL =
  "https://github.com/apps/ydb-qdrant-code-indexer/installations/new";
export const CODE_INDEXER_DASHBOARD_PATH = "/code-indexer/dashboard/";

export function buildCodeIndexerLoginUrl(
  returnPath = CODE_INDEXER_DASHBOARD_PATH,
) {
  return `${CODE_INDEXER_BACKEND_URL}/github/oauth/start?return_to=${encodeURIComponent(
    returnPath,
  )}`;
}
