type ProgressJob = {
  processedChunks: number;
  processedFiles: number;
  status: "pending" | "running" | "completed" | "failed";
  totalChunks?: number;
  totalFiles?: number;
};

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function parseJsonBody(text: string): unknown {
  const trimmed = text.trim();
  if (!trimmed) {
    return null;
  }
  try {
    return JSON.parse(trimmed) as unknown;
  } catch {
    return null;
  }
}

export function readApiError(value: unknown, fallback = "request failed") {
  if (isRecord(value) && typeof value.error === "string") {
    return value.error;
  }
  return fallback;
}

export function formatDate(value?: string) {
  if (!value) {
    return "Never";
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return date.toLocaleString("en-US", {
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function shortSha(value?: string) {
  return value ? value.slice(0, 12) : "n/a";
}

export function progressPercent(job: ProgressJob) {
  let total = 0;
  let processed = 0;
  if (job.totalFiles && job.totalFiles > 0) {
    total = job.totalFiles;
    processed = job.processedFiles;
  } else if (job.totalChunks && job.totalChunks > 0) {
    total = job.totalChunks;
    processed = job.processedChunks;
  }

  if (job.status === "completed") {
    return 100;
  }
  if (total <= 0) {
    return job.status === "running" ? 12 : 0;
  }
  return Math.max(2, Math.min(100, Math.round((processed / total) * 100)));
}
