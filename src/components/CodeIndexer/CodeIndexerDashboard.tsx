"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Button, Icon, TextInput } from "@gravity-ui/uikit";
import {
  ArrowRotateRight,
  CircleCheck,
  CircleExclamation,
  CircleInfo,
  CircleXmark,
  Copy,
  Key,
  Plus,
  TrashBin,
} from "@gravity-ui/icons";
import type { IconData } from "@gravity-ui/uikit";
import {
  buildCodeIndexerLoginUrl,
  CODE_INDEXER_BACKEND_URL,
  CODE_INDEXER_INSTALL_URL,
} from "./CodeIndexerLanding";
import { trackGoal } from "@/shared/utils/metricsManager";
import {
  formatDate,
  parseJsonBody,
  progressPercent,
  readApiError,
  shortSha,
} from "./utils";
import "./CodeIndexer.scss";

const MCP_AGENT_USAGE_PROMPT = `Use ydb-qdrant-code-indexer as searchable project memory for indexed GitHub repositories.
If owner/repo is unknown, call list_repositories.
In a local checkout, infer owner/repo from git remote, then call list_repository_indexes.
Use the default branch index for general repository questions.
For pull requests, pass prNumber to search_code.
Call search_code with concise natural-language or code-oriented queries before answering repository-specific questions.`;

function trackCodeIndexerDashboardGoal(goal: string, source: string) {
  trackGoal(goal, {
    product: "code-indexer",
    page: "/code-indexer/dashboard/",
    source,
  });
}

type GitHubUser = {
  githubUserId: string;
  login: string;
};

type Installation = {
  accountLogin: string;
  accountType: string;
  installationId: string;
  status: string;
};

type RepositoryStatus = "queued" | "indexing" | "ready" | "failed" | "deleted";

type ActiveJob = {
  createdAt: string;
  currentPath?: string;
  finishedAt?: string;
  jobId: string;
  jobKind:
    | "full-index"
    | "incremental-push"
    | "delete-repo-index"
    | "pr-index"
    | "delete-pr-index";
  lastError?: string;
  message?: string;
  phase: string;
  processedChunks: number;
  processedFiles: number;
  prNumber?: number;
  startedAt?: string;
  status: "pending" | "running" | "completed" | "failed";
  totalChunks?: number;
  totalFiles?: number;
  updatedAt: string;
};

type QueuedIndexingJob = Pick<ActiveJob, "jobId" | "phase" | "status">;

type Repository = {
  activeJob?: ActiveJob;
  activeJobs?: ActiveJob[];
  chunkCount?: number;
  defaultBranch: string;
  installationId: string;
  lastError?: string;
  lastIndexedAt?: string;
  lastIndexedSha?: string;
  owner: string;
  repo: string;
  repoId: string;
  status: RepositoryStatus;
};

type ApiToken = {
  githubUserId: string;
  name: string;
  revoked: boolean;
  tokenId: string;
};

type CreatedToken = {
  name: string;
  plaintextToken: string;
  tokenId: string;
};

type AuthState = "checking" | "authenticated" | "error" | "unauthenticated";
type LoadRepositoriesOptions = {
  silent?: boolean;
};

class DashboardApiError extends Error {
  readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "DashboardApiError";
    this.status = status;
  }
}

function isUnauthorizedError(err: unknown) {
  return err instanceof DashboardApiError && err.status === 401;
}

async function apiRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers);
  if (options.body && !headers.has("content-type")) {
    headers.set("content-type", "application/json");
  }

  const response = await fetch(`${CODE_INDEXER_BACKEND_URL}${path}`, {
    ...options,
    credentials: "include",
    headers,
  });
  const text = await response.text();
  const body = parseJsonBody(text);

  if (!response.ok) {
    throw new DashboardApiError(
      response.status,
      readApiError(body, response.statusText || "request failed")
    );
  }

  return body as T;
}

function statusIcon(status: RepositoryStatus): IconData {
  if (status === "ready") {
    return CircleCheck;
  }
  if (status === "failed") {
    return CircleExclamation;
  }
  if (status === "deleted") {
    return CircleXmark;
  }
  return CircleInfo;
}

function statusLabel(status: RepositoryStatus) {
  if (status === "queued") {
    return "Queued";
  }
  if (status === "indexing") {
    return "Indexing";
  }
  if (status === "ready") {
    return "Ready";
  }
  if (status === "failed") {
    return "Failed";
  }
  return "Deleted";
}

function activeJobLabel(job: ActiveJob) {
  let target = "Default branch reindex";
  if (job.jobKind === "pr-index") {
    target =
      job.prNumber === undefined
        ? "Pull request index"
        : `Pull request #${job.prNumber} index`;
  } else if (job.jobKind === "delete-pr-index") {
    target =
      job.prNumber === undefined
        ? "Pull request cleanup"
        : `Pull request #${job.prNumber} cleanup`;
  } else if (job.jobKind === "incremental-push") {
    target = "Default branch update";
  } else if (job.jobKind === "delete-repo-index") {
    target = "Repository cleanup";
  }

  if (job.status === "pending") {
    return `${target} queued`;
  }
  if (job.status === "completed") {
    return `${target} completed`;
  }
  if (job.status === "failed") {
    return `${target} failed`;
  }
  return `${target} · ${job.phase.replaceAll("_", " ")}`;
}

function formatProgressCount(processed: number, total?: number) {
  return `${processed}/${total ?? "?"}`;
}

function formatElapsed(startedAt?: string) {
  if (!startedAt) {
    return "unknown";
  }
  const started = Date.parse(startedAt);
  if (Number.isNaN(started)) {
    return "unknown";
  }
  const seconds = Math.max(0, Math.floor((Date.now() - started) / 1000));
  if (seconds < 60) {
    return `${seconds}s`;
  }
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes}m ${seconds % 60}s`;
  }
  const hours = Math.floor(minutes / 60);
  return `${hours}h ${minutes % 60}m`;
}

function isJobStale(job: ActiveJob) {
  const updatedAt = Date.parse(job.updatedAt);
  if (Number.isNaN(updatedAt)) {
    return false;
  }
  return Date.now() - updatedAt > 5 * 60 * 1000;
}

function repositoryActiveJobs(repository: Repository) {
  if (repository.activeJobs && repository.activeJobs.length > 0) {
    return repository.activeJobs;
  }
  return repository.activeJob ? [repository.activeJob] : [];
}

function hasActiveDefaultBranchJob(repository: Repository) {
  return repositoryActiveJobs(repository).some(
    (job) =>
      job.jobKind === "full-index" ||
      job.jobKind === "incremental-push" ||
      job.jobKind === "delete-repo-index"
  );
}

export function CodeIndexerDashboard() {
  const repositoriesRequestId = useRef(0);
  const repositoriesLoadingRequestId = useRef(0);
  const repositoriesPollInFlight = useRef(false);
  const repositoriesPollErrorRef = useRef("");
  const selectedInstallationIdRef = useRef("");
  const [authState, setAuthState] = useState<AuthState>("checking");
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [installations, setInstallations] = useState<Installation[]>([]);
  const [selectedInstallationId, setSelectedInstallationId] = useState("");
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [tokens, setTokens] = useState<ApiToken[]>([]);
  const [createdToken, setCreatedToken] = useState<CreatedToken | null>(null);
  const [tokenName, setTokenName] = useState("Local coding agent");
  const [loading, setLoading] = useState(true);
  const [repositoriesLoading, setRepositoriesLoading] = useState(false);
  const [reindexingRepoIds, setReindexingRepoIds] = useState<Set<string>>(
    () => new Set()
  );
  const [actionMessage, setActionMessage] = useState("");
  const [error, setError] = useState("");

  const resetSession = useCallback((message = "") => {
    repositoriesRequestId.current += 1;
    repositoriesLoadingRequestId.current = 0;
    repositoriesPollInFlight.current = false;
    repositoriesPollErrorRef.current = "";
    selectedInstallationIdRef.current = "";
    setAuthState("unauthenticated");
    setUser(null);
    setInstallations([]);
    setSelectedInstallationId("");
    setRepositories([]);
    setTokens([]);
    setCreatedToken(null);
    setReindexingRepoIds(new Set());
    setActionMessage("");
    setRepositoriesLoading(false);
    setError(message);
  }, []);

  const loadRepositories = useCallback(
    async (
      installationId: string,
      options: LoadRepositoriesOptions = {}
    ) => {
      if (!installationId) {
        repositoriesRequestId.current += 1;
        repositoriesLoadingRequestId.current = 0;
        setRepositories([]);
        setRepositoriesLoading(false);
        return;
      }
      const requestId = repositoriesRequestId.current + 1;
      repositoriesRequestId.current = requestId;
      if (!options.silent) {
        repositoriesLoadingRequestId.current = requestId;
        setRepositoriesLoading(true);
      }
      try {
        const data = await apiRequest<{
          repositories: Repository[];
          status: "ok";
        }>(
          `/api/repositories?installationId=${encodeURIComponent(
            installationId
          )}`
        );
        if (requestId !== repositoriesRequestId.current) {
          return;
        }
        setRepositories(data.repositories);
        setReindexingRepoIds((current) => {
          const repositoriesById = new Map(
            data.repositories.map((repository) => [
              repository.repoId,
              repository,
            ])
          );
          const next = new Set(current);
          for (const repoId of Array.from(next)) {
            const repository = repositoriesById.get(repoId);
            if (
              !repository ||
              repository.status !== "queued" &&
                repository.status !== "indexing" &&
                !hasActiveDefaultBranchJob(repository)
            ) {
              next.delete(repoId);
            }
          }
          return next;
        });
      } catch (err: unknown) {
        if (requestId === repositoriesRequestId.current) {
          throw err;
        }
      } finally {
        if (
          !options.silent &&
          requestId === repositoriesLoadingRequestId.current
        ) {
          setRepositoriesLoading(false);
        }
      }
    },
    []
  );

  const loadTokens = useCallback(async () => {
    const data = await apiRequest<{ status: "ok"; tokens: ApiToken[] }>("/api/tokens");
    setTokens(data.tokens);
  }, []);

  const initialize = useCallback(async () => {
    setLoading(true);
    setError("");
    setActionMessage("");
    try {
      const me = await apiRequest<{ status: "ok"; user: GitHubUser }>("/api/me");
      const installationsData = await apiRequest<{
        installations: Installation[];
        status: "ok";
      }>("/api/installations");
      await loadTokens();

      const activeInstallations = installationsData.installations.filter(
        (installation) => installation.status !== "deleted"
      );
      const firstInstallationId = activeInstallations[0]?.installationId ?? "";

      setUser(me.user);
      setInstallations(installationsData.installations);
      selectedInstallationIdRef.current = firstInstallationId;
      setSelectedInstallationId(firstInstallationId);
      setAuthState("authenticated");
      if (firstInstallationId) {
        await loadRepositories(firstInstallationId);
      } else {
        setRepositories([]);
      }
    } catch (err: unknown) {
      if (isUnauthorizedError(err)) {
        resetSession();
      } else {
        setAuthState("error");
        setError(err instanceof Error ? err.message : String(err));
      }
    } finally {
      setLoading(false);
    }
  }, [loadRepositories, loadTokens, resetSession]);

  useEffect(() => {
    void initialize();
  }, [initialize]);

  const hasActiveIndexingJob = repositories.some(
    (repository) =>
      repositoryActiveJobs(repository).length > 0 ||
      repository.status === "queued" ||
      repository.status === "indexing"
  );
  const shouldPollRepositories =
    authState === "authenticated" &&
    Boolean(selectedInstallationId) &&
    (hasActiveIndexingJob || reindexingRepoIds.size > 0);

  useEffect(() => {
    if (!shouldPollRepositories) {
      return undefined;
    }
    const intervalId = window.setInterval(() => {
      if (repositoriesPollInFlight.current) {
        return;
      }
      const installationId = selectedInstallationIdRef.current;
      if (!installationId) {
        return;
      }
      repositoriesPollInFlight.current = true;
      void loadRepositories(installationId, { silent: true })
        .then(() => {
          const pollingError = repositoriesPollErrorRef.current;
          if (!pollingError) {
            return;
          }
          repositoriesPollErrorRef.current = "";
          setError((current) => (current === pollingError ? "" : current));
        })
        .catch((err: unknown) => {
          if (isUnauthorizedError(err)) {
            resetSession("Session expired. Sign in again.");
            return;
          }
          const message = err instanceof Error ? err.message : String(err);
          repositoriesPollErrorRef.current = message;
          setError(message);
        })
        .finally(() => {
          repositoriesPollInFlight.current = false;
        });
    }, 3000);
    return () => window.clearInterval(intervalId);
  }, [loadRepositories, resetSession, shouldPollRepositories]);

  const tokenForConfig = createdToken?.plaintextToken ?? "<token>";
  const mcpConfig = useMemo(
    () =>
      JSON.stringify(
        {
          mcpServers: {
            "ydb-qdrant-code-indexer": {
              headers: {
                Authorization: `Bearer ${tokenForConfig}`,
              },
              url: `${CODE_INDEXER_BACKEND_URL}/mcp`,
            },
          },
        },
        null,
        2
      ),
    [tokenForConfig]
  );

  const copyText = async (value: string, message: string) => {
    setError("");
    if (!navigator.clipboard?.writeText) {
      setActionMessage("");
      setError("Clipboard copy is unavailable in this browser context.");
      return;
    }
    try {
      await navigator.clipboard.writeText(value);
      setActionMessage(message);
    } catch {
      setActionMessage("");
      setError("Could not copy to clipboard. Select and copy the text manually.");
    }
  };

  const handleInstallationChange = async (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    const installationId = event.target.value;
    selectedInstallationIdRef.current = installationId;
    setSelectedInstallationId(installationId);
    setError("");
    setActionMessage("");
    setRepositories([]);
    setReindexingRepoIds(new Set());
    try {
      await loadRepositories(installationId);
    } catch (err: unknown) {
      if (isUnauthorizedError(err)) {
        resetSession("Session expired. Sign in again.");
        return;
      }
      setError(err instanceof Error ? err.message : String(err));
    }
  };

  const handleCreateToken = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setActionMessage("");
    const tokenCreatedMessage =
      "Token created. Copy it now; it will not be shown again.";
    try {
      const data = await apiRequest<{ status: "ok"; token: CreatedToken }>(
        "/api/tokens",
        {
          body: JSON.stringify({ name: tokenName }),
          method: "POST",
        }
      );
      setCreatedToken(data.token);
      setActionMessage(tokenCreatedMessage);
      trackCodeIndexerDashboardGoal("mcp_token_created", "dashboard");
    } catch (err: unknown) {
      if (isUnauthorizedError(err)) {
        resetSession("Session expired. Sign in again.");
        return;
      }
      setError(err instanceof Error ? err.message : String(err));
      return;
    }

    try {
      await loadTokens();
    } catch (err: unknown) {
      if (isUnauthorizedError(err)) {
        resetSession("Session expired. Sign in again.");
        return;
      }
      setActionMessage(
        `${tokenCreatedMessage} Token list could not refresh; reload the dashboard to update it.`
      );
    }
  };

  const handleReindex = async (repoId: string) => {
    setError("");
    setActionMessage("");
    setReindexingRepoIds((current) => new Set(current).add(repoId));
    try {
      const data = await apiRequest<{
        job: QueuedIndexingJob;
        status: "ok";
      }>(`/api/repositories/${encodeURIComponent(repoId)}/reindex`, {
        method: "POST",
      });
      setActionMessage(
        `Reindex job ${data.job.jobId} queued. Refreshing status automatically.`
      );
    } catch (err: unknown) {
      if (isUnauthorizedError(err)) {
        resetSession("Session expired. Sign in again.");
        return;
      }
      setReindexingRepoIds((current) => {
        const next = new Set(current);
        next.delete(repoId);
        return next;
      });
      setError(err instanceof Error ? err.message : String(err));
      return;
    }

    try {
      const installationId = selectedInstallationIdRef.current;
      if (installationId) {
        await loadRepositories(installationId, { silent: true });
      }
    } catch (err: unknown) {
      if (isUnauthorizedError(err)) {
        resetSession("Session expired. Sign in again.");
      }
    }
  };

  const handleRevokeToken = async (tokenId: string) => {
    setError("");
    setActionMessage("");
    const tokenRevokedMessage = "Token revoked.";
    try {
      await apiRequest<null>(`/api/tokens/${encodeURIComponent(tokenId)}`, {
        method: "DELETE",
      });
      setActionMessage(tokenRevokedMessage);
    } catch (err: unknown) {
      if (isUnauthorizedError(err)) {
        resetSession("Session expired. Sign in again.");
        return;
      }
      setError(err instanceof Error ? err.message : String(err));
      return;
    }

    try {
      await loadTokens();
    } catch (err: unknown) {
      if (isUnauthorizedError(err)) {
        resetSession("Session expired. Sign in again.");
        return;
      }
      setActionMessage(
        `${tokenRevokedMessage} Token list could not refresh; reload the dashboard to update it.`
      );
    }
  };

  const handleLogout = async () => {
    setError("");
    try {
      await apiRequest<null>("/api/logout", { method: "POST" });
      resetSession();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    }
  };

  const handleDeleteMyData = async () => {
    if (
      !window.confirm(
        "Delete sessions, tokens, linked installations, repository rows, and indexed data where eligible?"
      )
    ) {
      return;
    }
    setError("");
    setActionMessage("");
    try {
      await apiRequest<{
        deletedInstallations: number;
        deletedRepositories: number;
        status: "ok";
      }>("/api/privacy/delete-my-data", { method: "POST" });
      resetSession();
    } catch (err: unknown) {
      if (isUnauthorizedError(err)) {
        resetSession("Session expired. Sign in again.");
        return;
      }
      setError(err instanceof Error ? err.message : String(err));
    }
  };

  if (loading || authState === "checking") {
    return (
      <main className="code-indexer code-indexer-dashboard">
        <section className="code-indexer-dashboard__panel">
          <p className="code-indexer__eyebrow">Dashboard</p>
          <h1>Loading Code Indexer</h1>
          <p className="code-indexer__lead">Checking your GitHub session.</p>
        </section>
      </main>
    );
  }

  if (authState === "unauthenticated") {
    return (
      <main className="code-indexer code-indexer-dashboard">
        <section className="code-indexer-dashboard__panel">
          <p className="code-indexer__eyebrow">Dashboard</p>
          <h1>Sign in with GitHub</h1>
          <p className="code-indexer__lead">
            Authorize the GitHub App to view repositories you installed it on,
            then manage indexing status and hosted MCP tokens here.
          </p>
          {error && (
            <div
              className="code-indexer-dashboard__notice code-indexer-dashboard__notice--error"
              role="status"
            >
              {error}
            </div>
          )}
          <div className="code-indexer__actions">
            <Button
              href={buildCodeIndexerLoginUrl()}
              size="xl"
              view="action"
              onClick={() =>
                trackCodeIndexerDashboardGoal(
                  "dashboard_oauth_start",
                  "sign_in_panel"
                )
              }
            >
              Sign in
            </Button>
            <Button
              href={CODE_INDEXER_INSTALL_URL}
              target="_blank"
              rel="noopener noreferrer"
              size="xl"
              view="outlined"
              onClick={() =>
                trackCodeIndexerDashboardGoal(
                  "github_app_install_click",
                  "sign_in_panel"
                )
              }
            >
              Install GitHub App
            </Button>
          </div>
        </section>
      </main>
    );
  }

  if (authState === "error") {
    return (
      <main className="code-indexer code-indexer-dashboard">
        <section className="code-indexer-dashboard__panel">
          <p className="code-indexer__eyebrow">Dashboard</p>
          <h1>Dashboard unavailable</h1>
          <p className="code-indexer__lead">
            {error || "The Code Indexer backend did not return dashboard data."}
          </p>
          <Button onClick={() => void initialize()} size="xl" view="outlined">
            Try again
          </Button>
        </section>
      </main>
    );
  }

  return (
    <main className="code-indexer code-indexer-dashboard">
      <section className="code-indexer-dashboard__header">
        <div>
          <p className="code-indexer__eyebrow">Dashboard</p>
          <h1>Code Indexer</h1>
          <p className="code-indexer__lead">
            Signed in as <strong>{user?.login}</strong>. Manage repository
            indexing and MCP access for coding agents.
          </p>
        </div>
        <div className="code-indexer-dashboard__header-actions">
          <Button
            href={CODE_INDEXER_INSTALL_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackCodeIndexerDashboardGoal(
                "github_app_install_click",
                "dashboard_header"
              )
            }
          >
            Install on more repositories
          </Button>
          <Button onClick={handleLogout} view="outlined">
            Logout
          </Button>
        </div>
      </section>

      {(error || actionMessage) && (
        <div
          className={`code-indexer-dashboard__notice ${
            error ? "code-indexer-dashboard__notice--error" : ""
          }`}
          role="status"
        >
          {error || actionMessage}
        </div>
      )}

      <section className="code-indexer-dashboard__grid">
        <div className="code-indexer-dashboard__panel">
          <div className="code-indexer-dashboard__panel-heading">
            <div>
              <p className="code-indexer__eyebrow">Repositories</p>
              <h2>Index status</h2>
            </div>
            <select
              className="code-indexer-dashboard__select"
              value={selectedInstallationId}
              onChange={handleInstallationChange}
              aria-label="GitHub App installation"
            >
              {installations.length === 0 && (
                <option value="">No installations</option>
              )}
              {installations.map((installation) => (
                <option
                  key={installation.installationId}
                  value={installation.installationId}
                >
                  {installation.accountLogin} ({installation.status})
                </option>
              ))}
            </select>
          </div>

          {repositoriesLoading ? (
            <p className="code-indexer-dashboard__empty">Loading repositories.</p>
          ) : repositories.length === 0 ? (
            <div className="code-indexer-dashboard__empty">
              <p>No repositories are linked yet.</p>
              <Button
                href={CODE_INDEXER_INSTALL_URL}
                target="_blank"
                rel="noopener noreferrer"
                view="outlined"
                onClick={() =>
                  trackCodeIndexerDashboardGoal(
                    "github_app_install_click",
                    "empty_repositories"
                  )
                }
              >
                Select repositories
              </Button>
            </div>
          ) : (
            <div className="code-indexer-dashboard__repo-list">
              {shouldPollRepositories && (
                <p className="code-indexer-dashboard__polling">
                  Indexing is active. Repository status refreshes automatically.
                </p>
              )}
              {repositories.map((repository) => {
                const activeJobs = repositoryActiveJobs(repository);
                const defaultBranchJobActive =
                  hasActiveDefaultBranchJob(repository);
                return (
                  <article
                    className="code-indexer-dashboard__repo"
                    key={repository.repoId}
                  >
                    <div className="code-indexer-dashboard__repo-main">
                      <div>
                        <h3>
                          {repository.owner}/{repository.repo}
                        </h3>
                        <p>
                          Default branch {repository.defaultBranch} · SHA{" "}
                          {shortSha(repository.lastIndexedSha)}
                        </p>
                      </div>
                      <span
                        className={`code-indexer-dashboard__status code-indexer-dashboard__status--${repository.status}`}
                      >
                        <Icon data={statusIcon(repository.status)} size={16} />
                        {statusLabel(repository.status)}
                      </span>
                    </div>
                    <dl className="code-indexer-dashboard__repo-meta">
                      <div>
                        <dt>Default branch chunks</dt>
                        <dd>{repository.chunkCount ?? 0}</dd>
                      </div>
                      <div>
                        <dt>Default branch indexed</dt>
                        <dd>{formatDate(repository.lastIndexedAt)}</dd>
                      </div>
                      {repository.lastError && (
                        <div>
                          <dt>Default branch error</dt>
                          <dd>{repository.lastError}</dd>
                        </div>
                      )}
                    </dl>
                    {activeJobs.length > 0 && (
                      <div className="code-indexer-dashboard__job-list">
                        {activeJobs.map((job) => (
                          <div className="code-indexer-progress" key={job.jobId}>
                            <div className="code-indexer-progress__heading">
                              <strong>{activeJobLabel(job)}</strong>
                              <span>{job.jobId}</span>
                            </div>
                            <div
                              className="code-indexer-progress__bar"
                              aria-label="Indexing progress"
                            >
                              <span
                                className="code-indexer-progress__bar-fill"
                                style={{
                                  width: `${progressPercent(job)}%`,
                                }}
                              />
                            </div>
                            <div className="code-indexer-progress__meta">
                              <span>
                                Files{" "}
                                {formatProgressCount(
                                  job.processedFiles,
                                  job.totalFiles
                                )}
                              </span>
                              <span>
                                Chunks{" "}
                                {formatProgressCount(
                                  job.processedChunks,
                                  job.totalChunks
                                )}
                              </span>
                              <span>
                                Elapsed{" "}
                                {formatElapsed(job.startedAt ?? job.createdAt)}
                              </span>
                            </div>
                            {job.currentPath && (
                              <p className="code-indexer-progress__path">
                                {job.currentPath}
                              </p>
                            )}
                            {job.message && (
                              <p className="code-indexer-progress__message">
                                {job.message}
                              </p>
                            )}
                            {isJobStale(job) && (
                              <p className="code-indexer-progress__warning">
                                No progress update for more than 5 minutes.
                              </p>
                            )}
                            {job.lastError && (
                              <p className="code-indexer-progress__error">
                                {job.lastError}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                    <Button
                      onClick={() => void handleReindex(repository.repoId)}
                      view="outlined"
                      disabled={
                        repository.status === "deleted" ||
                        repository.status === "queued" ||
                        repository.status === "indexing" ||
                        defaultBranchJobActive ||
                        reindexingRepoIds.has(repository.repoId)
                      }
                    >
                      <Icon data={ArrowRotateRight} size={16} />
                      {reindexingRepoIds.has(repository.repoId)
                        ? "Reindex queued"
                        : "Reindex default branch"}
                    </Button>
                  </article>
                );
              })}
            </div>
          )}
        </div>

        <aside className="code-indexer-dashboard__side">
          <section className="code-indexer-dashboard__panel">
            <div className="code-indexer-dashboard__panel-heading">
              <div>
                <p className="code-indexer__eyebrow">MCP tokens</p>
                <h2>Agent access</h2>
              </div>
              <Icon data={Key} size={22} />
            </div>
            <form
              className="code-indexer-dashboard__token-form"
              onSubmit={handleCreateToken}
            >
              <TextInput
                aria-label="Token name"
                value={tokenName}
                onUpdate={setTokenName}
                size="l"
              />
              <Button type="submit" view="action" size="l">
                <Icon data={Plus} size={16} />
                Create
              </Button>
            </form>

            {createdToken && (
              <div className="code-indexer-dashboard__created-token">
                <p>New token</p>
                <code>{createdToken.plaintextToken}</code>
                <Button
                  onClick={() =>
                    void copyText(createdToken.plaintextToken, "Token copied.")
                  }
                  view="outlined"
                >
                  <Icon data={Copy} size={16} />
                  Copy token
                </Button>
              </div>
            )}

            <div className="code-indexer-dashboard__token-list">
              {tokens.length === 0 ? (
                <p className="code-indexer-dashboard__empty">
                  Create a token before connecting an agent.
                </p>
              ) : (
                tokens.map((token) => (
                  <div
                    className="code-indexer-dashboard__token"
                    key={token.tokenId}
                  >
                    <div>
                      <strong>{token.name}</strong>
                      <span>{token.revoked ? "Revoked" : "Active"}</span>
                    </div>
                    <Button
                      onClick={() => void handleRevokeToken(token.tokenId)}
                      view="outlined-danger"
                      disabled={token.revoked}
                    >
                      <Icon data={TrashBin} size={16} />
                    </Button>
                  </div>
                ))
              )}
            </div>
          </section>

          <section className="code-indexer-dashboard__panel">
            <p className="code-indexer__eyebrow">MCP config</p>
            <h2>Use in coding agents</h2>
            <pre className="code-indexer-dashboard__config">{mcpConfig}</pre>
            <Button
              onClick={() => void copyText(mcpConfig, "MCP config copied.")}
              view="outlined"
            >
              <Icon data={Copy} size={16} />
              Copy config
            </Button>
            <div className="code-indexer-dashboard__agent-prompt">
              <h3>Agent prompt</h3>
              <p>
                Add this to your agent instructions if the MCP client does not
                show server instructions clearly.
              </p>
              <pre>{MCP_AGENT_USAGE_PROMPT}</pre>
              <Button
                onClick={() =>
                  void copyText(MCP_AGENT_USAGE_PROMPT, "Agent prompt copied.")
                }
                view="outlined"
              >
                <Icon data={Copy} size={16} />
                Copy prompt
              </Button>
            </div>
          </section>

          <section className="code-indexer-dashboard__panel code-indexer-dashboard__panel--danger">
            <p className="code-indexer__eyebrow">Privacy</p>
            <h2>Delete my data</h2>
            <p>
              Removes sessions, tokens, GitHub user data, linked installations,
              repository rows, and indexed collections where eligible.
            </p>
            <Button onClick={handleDeleteMyData} view="outlined-danger">
              Delete my data
            </Button>
          </section>
        </aside>
      </section>
    </main>
  );
}
