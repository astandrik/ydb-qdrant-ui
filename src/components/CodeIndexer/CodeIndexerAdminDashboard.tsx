"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ChangeEvent } from "react";
import { Button, Icon, TextInput } from "@gravity-ui/uikit";
import {
  ArrowRotateRight,
  CircleCheck,
  CircleExclamation,
  CircleInfo,
  Magnifier,
} from "@gravity-ui/icons";
import {
  buildCodeIndexerLoginUrl,
  CODE_INDEXER_BACKEND_URL,
} from "./CodeIndexerLanding";
import {
  formatDate,
  parseJsonBody,
  progressPercent,
  readApiError,
  shortSha,
} from "./utils";
import "./CodeIndexer.scss";

const ADMIN_RETURN_PATH = "/code-indexer/admin/";
const ADMIN_SEARCH_DEBOUNCE_MS = 300;

type GitHubUser = {
  githubUserId: string;
  login: string;
};

type AdminJob = {
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
  owner: string;
  phase: string;
  processedChunks: number;
  processedFiles: number;
  prNumber?: number;
  repo: string;
  repoId: string;
  startedAt?: string;
  status: "pending" | "running" | "completed" | "failed";
  totalChunks?: number;
  totalFiles?: number;
  updatedAt: string;
};

type AdminRepository = {
  accountLogin: string;
  accountType: string;
  activeJob?: AdminJob;
  activeJobs?: AdminJob[];
  chunkCount?: number;
  defaultBranch: string;
  installationId: string;
  installationStatus: string;
  lastError?: string;
  lastIndexedAt?: string;
  lastIndexedSha?: string;
  owner: string;
  repo: string;
  repoId: string;
  status: "queued" | "indexing" | "ready" | "failed" | "deleted";
};

type AdminOverview = {
  generatedAt: string;
  recentJobs: AdminJob[];
  totals: {
    activeJobs: number;
    apiTokens: number;
    failedJobs: number;
    indexedChunks: number;
    installations: number;
    repositories: number;
    repositoriesByStatus: Record<string, number>;
    revokedApiTokens: number;
    users: number;
  };
};

type AuthState =
  | "checking"
  | "authenticated"
  | "error"
  | "forbidden"
  | "unauthenticated";

class AdminApiError extends Error {
  readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "AdminApiError";
    this.status = status;
  }
}

async function adminApiRequest<T>(path: string): Promise<T> {
  const response = await fetch(`${CODE_INDEXER_BACKEND_URL}${path}`, {
    credentials: "include",
  });
  const text = await response.text();
  const body = parseJsonBody(text);
  if (!response.ok) {
    throw new AdminApiError(
      response.status,
      readApiError(body, response.statusText || "request failed")
    );
  }
  return body as T;
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

function formatJobTarget(job: AdminJob) {
  if (job.jobKind === "pr-index") {
    return job.prNumber === undefined ? "PR index" : `PR #${job.prNumber}`;
  }
  if (job.jobKind === "delete-pr-index") {
    return job.prNumber === undefined ? "PR cleanup" : `PR #${job.prNumber} cleanup`;
  }
  if (job.jobKind === "incremental-push") {
    return "Default update";
  }
  if (job.jobKind === "delete-repo-index") {
    return "Repository cleanup";
  }
  return "Default reindex";
}

function jobStatusIcon(status: AdminJob["status"]) {
  if (status === "completed") {
    return CircleCheck;
  }
  if (status === "failed") {
    return CircleExclamation;
  }
  return CircleInfo;
}

function statusClass(status: string) {
  return `code-indexer-dashboard__status code-indexer-dashboard__status--${status}`;
}

function activeJobs(repository: AdminRepository) {
  if (repository.activeJobs && repository.activeJobs.length > 0) {
    return repository.activeJobs;
  }
  return repository.activeJob ? [repository.activeJob] : [];
}

function buildAdminQuery(params: {
  limit?: number;
  q?: string;
  status?: string;
}) {
  const query = new URLSearchParams();
  if (params.limit) {
    query.set("limit", String(params.limit));
  }
  if (params.status) {
    query.set("status", params.status);
  }
  if (params.q) {
    query.set("q", params.q);
  }
  const text = query.toString();
  return text ? `?${text}` : "";
}

export function CodeIndexerAdminDashboard() {
  const adminRequestId = useRef(0);
  const adminRefreshInFlight = useRef(false);
  const [authState, setAuthState] = useState<AuthState>("checking");
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [overview, setOverview] = useState<AdminOverview | null>(null);
  const [repositories, setRepositories] = useState<AdminRepository[]>([]);
  const [jobs, setJobs] = useState<AdminJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [repositoryStatus, setRepositoryStatus] = useState("");
  const [jobStatus, setJobStatus] = useState("");
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const loadAdminData = useCallback(async (silent = false) => {
    const requestId = adminRequestId.current + 1;
    adminRequestId.current = requestId;
    if (silent) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setError("");
    try {
      const repositoryQuery = buildAdminQuery({
        limit: 500,
        q: debouncedQuery.trim(),
        status: repositoryStatus,
      });
      const jobQuery = buildAdminQuery({
        limit: 200,
        q: debouncedQuery.trim(),
        status: jobStatus,
      });
      const [overviewData, repositoriesData, jobsData] = await Promise.all([
        adminApiRequest<{
          overview: AdminOverview;
          status: "ok";
          user: GitHubUser;
        }>("/api/admin/overview"),
        adminApiRequest<{
          repositories: AdminRepository[];
          status: "ok";
        }>(`/api/admin/repositories${repositoryQuery}`),
        adminApiRequest<{ jobs: AdminJob[]; status: "ok" }>(
          `/api/admin/jobs${jobQuery}`
        ),
      ]);

      if (requestId !== adminRequestId.current) {
        return;
      }
      setAuthState("authenticated");
      setUser(overviewData.user);
      setOverview(overviewData.overview);
      setRepositories(repositoriesData.repositories);
      setJobs(jobsData.jobs);
    } catch (err: unknown) {
      if (requestId !== adminRequestId.current) {
        return;
      }
      if (err instanceof AdminApiError && err.status === 401) {
        setAuthState("unauthenticated");
      } else if (err instanceof AdminApiError && err.status === 403) {
        setAuthState("forbidden");
        setError(err.message);
      } else {
        setAuthState((current) => (current === "checking" ? "error" : current));
        setError(err instanceof Error ? err.message : String(err));
      }
    } finally {
      if (requestId === adminRequestId.current) {
        setLoading(false);
        setRefreshing(false);
      }
    }
  }, [debouncedQuery, jobStatus, repositoryStatus]);

  useEffect(() => {
    void loadAdminData();
  }, [loadAdminData]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedQuery(query);
    }, ADMIN_SEARCH_DEBOUNCE_MS);
    return () => window.clearTimeout(timeoutId);
  }, [query]);

  useEffect(() => {
    if (authState !== "authenticated" || !overview || overview.totals.activeJobs === 0) {
      return undefined;
    }
    const intervalId = window.setInterval(() => {
      if (adminRefreshInFlight.current) {
        return;
      }
      adminRefreshInFlight.current = true;
      void loadAdminData(true).finally(() => {
        adminRefreshInFlight.current = false;
      });
    }, 5000);
    return () => window.clearInterval(intervalId);
  }, [authState, loadAdminData, overview]);

  const repoStatusCounts = useMemo(
    () =>
      Object.entries(overview?.totals.repositoriesByStatus ?? {}).sort(([a], [b]) =>
        a.localeCompare(b)
      ),
    [overview]
  );

  if (loading || authState === "checking") {
    return (
      <main className="code-indexer code-indexer-dashboard code-indexer-admin">
        <section className="code-indexer-dashboard__panel">
          <p className="code-indexer__eyebrow">Admin</p>
          <h1>Loading admin dashboard</h1>
          <p className="code-indexer__lead">Checking your GitHub session.</p>
        </section>
      </main>
    );
  }

  if (authState === "unauthenticated") {
    return (
      <main className="code-indexer code-indexer-dashboard code-indexer-admin">
        <section className="code-indexer-dashboard__panel">
          <p className="code-indexer__eyebrow">Admin</p>
          <h1>Sign in with GitHub</h1>
          <p className="code-indexer__lead">
            Sign in with the operator GitHub account to view global Code Indexer
            status.
          </p>
          <Button
            href={buildCodeIndexerLoginUrl(ADMIN_RETURN_PATH)}
            size="xl"
            view="action"
          >
            Sign in
          </Button>
        </section>
      </main>
    );
  }

  if (authState === "forbidden") {
    return (
      <main className="code-indexer code-indexer-dashboard code-indexer-admin">
        <section className="code-indexer-dashboard__panel">
          <p className="code-indexer__eyebrow">Admin</p>
          <h1>Access denied</h1>
          <p className="code-indexer__lead">
            {error || "This GitHub account is not in the admin allowlist."}
          </p>
          <Button href="/code-indexer/dashboard/" view="outlined">
            Open user dashboard
          </Button>
        </section>
      </main>
    );
  }

  if (authState === "error") {
    return (
      <main className="code-indexer code-indexer-dashboard code-indexer-admin">
        <section className="code-indexer-dashboard__panel">
          <p className="code-indexer__eyebrow">Admin</p>
          <h1>Admin dashboard unavailable</h1>
          <p className="code-indexer__lead">
            {error || "The Code Indexer backend did not return admin data."}
          </p>
          <Button onClick={() => void loadAdminData()} size="xl" view="outlined">
            Try again
          </Button>
        </section>
      </main>
    );
  }

  return (
    <main className="code-indexer code-indexer-dashboard code-indexer-admin">
      <section className="code-indexer-dashboard__header code-indexer-admin__header">
        <div>
          <p className="code-indexer__eyebrow">Admin</p>
          <h1>Code Indexer Ops</h1>
          <p className="code-indexer__lead">
            Signed in as <strong>{user?.login}</strong>. Global read-only status
            for hosted repository indexing.
          </p>
        </div>
        <div className="code-indexer-dashboard__header-actions">
          <Button
            onClick={() => void loadAdminData(true)}
            view="outlined"
            disabled={refreshing}
          >
            <Icon data={ArrowRotateRight} size={16} />
            {refreshing ? "Refreshing" : "Refresh"}
          </Button>
          <Button href="/code-indexer/dashboard/" view="outlined">
            User dashboard
          </Button>
        </div>
      </section>

      {error && (
        <div
          className="code-indexer-dashboard__notice code-indexer-dashboard__notice--error"
          role="status"
        >
          {error}
        </div>
      )}

      {overview && (
        <section className="code-indexer-admin__summary">
          <div>
            <span>Users</span>
            <strong>{formatNumber(overview.totals.users)}</strong>
          </div>
          <div>
            <span>Installations</span>
            <strong>{formatNumber(overview.totals.installations)}</strong>
          </div>
          <div>
            <span>Repositories</span>
            <strong>{formatNumber(overview.totals.repositories)}</strong>
          </div>
          <div>
            <span>Indexed chunks</span>
            <strong>{formatNumber(overview.totals.indexedChunks)}</strong>
          </div>
          <div>
            <span>Active jobs</span>
            <strong>{formatNumber(overview.totals.activeJobs)}</strong>
          </div>
          <div>
            <span>Failed jobs</span>
            <strong>{formatNumber(overview.totals.failedJobs)}</strong>
          </div>
          <div>
            <span>MCP tokens</span>
            <strong>{formatNumber(overview.totals.apiTokens)}</strong>
          </div>
          <div>
            <span>Revoked tokens</span>
            <strong>{formatNumber(overview.totals.revokedApiTokens)}</strong>
          </div>
        </section>
      )}

      <section className="code-indexer-admin__filters">
        <TextInput
          aria-label="Search repositories and jobs"
          startContent={<Icon data={Magnifier} size={16} />}
          onUpdate={setQuery}
          placeholder="owner/repo or job id"
          size="l"
          value={query}
        />
        <select
          aria-label="Repository status"
          className="code-indexer-dashboard__select"
          onChange={(event: ChangeEvent<HTMLSelectElement>) =>
            setRepositoryStatus(event.target.value)
          }
          value={repositoryStatus}
        >
          <option value="">All repositories</option>
          <option value="ready">Ready</option>
          <option value="queued">Queued</option>
          <option value="indexing">Indexing</option>
          <option value="failed">Failed</option>
          <option value="deleted">Deleted</option>
        </select>
        <select
          aria-label="Job status"
          className="code-indexer-dashboard__select"
          onChange={(event: ChangeEvent<HTMLSelectElement>) =>
            setJobStatus(event.target.value)
          }
          value={jobStatus}
        >
          <option value="">All jobs</option>
          <option value="pending">Pending</option>
          <option value="running">Running</option>
          <option value="completed">Completed</option>
          <option value="failed">Failed</option>
        </select>
      </section>

      {repoStatusCounts.length > 0 && (
        <section className="code-indexer-admin__status-strip">
          {repoStatusCounts.map(([status, count]) => (
            <span key={status}>
              {status}: <strong>{formatNumber(count)}</strong>
            </span>
          ))}
          {overview && <span>Updated {formatDate(overview.generatedAt)}</span>}
        </section>
      )}

      <section className="code-indexer-admin__layout">
        <div className="code-indexer-dashboard__panel">
          <div className="code-indexer-dashboard__panel-heading">
            <div>
              <p className="code-indexer__eyebrow">Repositories</p>
              <h2>Global index status</h2>
            </div>
          </div>
          <div className="code-indexer-admin__table-wrap">
            <table className="code-indexer-admin__table">
              <thead>
                <tr>
                  <th>Repository</th>
                  <th>Installation</th>
                  <th>Status</th>
                  <th>Branch</th>
                  <th>Chunks</th>
                  <th>Last indexed</th>
                  <th>Active jobs</th>
                </tr>
              </thead>
              <tbody>
                {repositories.map((repository) => (
                  <tr key={repository.repoId}>
                    <td>
                      <strong>
                        {repository.owner}/{repository.repo}
                      </strong>
                      <span>{repository.repoId}</span>
                    </td>
                    <td>
                      <strong>{repository.accountLogin}</strong>
                      <span>
                        {repository.accountType} · {repository.installationStatus}
                      </span>
                    </td>
                    <td>
                      <span className={statusClass(repository.status)}>
                        {repository.status}
                      </span>
                    </td>
                    <td>
                      <strong>{repository.defaultBranch}</strong>
                      <span>{shortSha(repository.lastIndexedSha)}</span>
                    </td>
                    <td>{formatNumber(repository.chunkCount ?? 0)}</td>
                    <td>{formatDate(repository.lastIndexedAt)}</td>
                    <td>
                      {activeJobs(repository).length === 0 ? (
                        <span>None</span>
                      ) : (
                        <div className="code-indexer-admin__job-stack">
                          {activeJobs(repository).map((job) => (
                            <span key={job.jobId}>
                              {formatJobTarget(job)} · {job.phase}
                            </span>
                          ))}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <aside className="code-indexer-dashboard__side">
          <section className="code-indexer-dashboard__panel">
            <p className="code-indexer__eyebrow">Jobs</p>
            <h2>Recent activity</h2>
            <div className="code-indexer-admin__jobs">
              {jobs.length === 0 ? (
                <p className="code-indexer-dashboard__empty">No jobs found.</p>
              ) : (
                jobs.map((job) => (
                  <article className="code-indexer-progress" key={job.jobId}>
                    <div className="code-indexer-progress__heading">
                      <strong>
                        {job.owner}/{job.repo} · {formatJobTarget(job)}
                      </strong>
                      <span>{job.jobId}</span>
                    </div>
                    <span className={statusClass(job.status)}>
                      <Icon data={jobStatusIcon(job.status)} size={16} />
                      {job.status}
                    </span>
                    <div className="code-indexer-progress__bar">
                      <span
                        className="code-indexer-progress__bar-fill"
                        style={{ width: `${progressPercent(job)}%` }}
                      />
                    </div>
                    <div className="code-indexer-progress__meta">
                      <span>Phase {job.phase}</span>
                      <span>
                        Files {job.processedFiles}/{job.totalFiles ?? "?"}
                      </span>
                      <span>
                        Chunks {job.processedChunks}/{job.totalChunks ?? "?"}
                      </span>
                    </div>
                    {job.currentPath && (
                      <p className="code-indexer-progress__path">
                        {job.currentPath}
                      </p>
                    )}
                    <p className="code-indexer-progress__message">
                      Updated {formatDate(job.updatedAt)}
                    </p>
                    {job.lastError && (
                      <p className="code-indexer-progress__error">
                        {job.lastError}
                      </p>
                    )}
                  </article>
                ))
              )}
            </div>
          </section>
        </aside>
      </section>
    </main>
  );
}
