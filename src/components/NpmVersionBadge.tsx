"use client";

import { useEffect, useState } from "react";
import "./NpmVersionBadge.scss";

const NPM_PACKAGE_LATEST_URL = "https://registry.npmjs.org/ydb-qdrant/latest";
const VERSION_PATTERN =
  /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$/;

function readNpmVersion(payload: unknown): string | null {
  if (typeof payload !== "object" || payload === null) {
    return null;
  }

  const version = (payload as Record<string, unknown>).version;
  if (typeof version !== "string" || !VERSION_PATTERN.test(version)) {
    return null;
  }

  return version;
}

export type NpmVersionBadgeProps = {
  locale?: "en" | "ru";
};

export function NpmVersionBadge({ locale = "en" }: NpmVersionBadgeProps) {
  const [version, setVersion] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadVersion() {
      try {
        const response = await fetch(NPM_PACKAGE_LATEST_URL, {
          signal: controller.signal,
          headers: { Accept: "application/json" },
          cache: "no-store",
        });

        if (!response.ok) {
          return;
        }

        const nextVersion = readNpmVersion(await response.json());
        if (nextVersion) {
          setVersion(nextVersion);
        }
      } catch (error: unknown) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
      }
    }

    void loadVersion();

    return () => controller.abort();
  }, []);

  if (!version) {
    return null;
  }

  const label =
    locale === "ru"
      ? "Текущая версия npm-пакета ydb-qdrant"
      : "Current ydb-qdrant npm package version";

  return (
    <a
      className="npm-version"
      href="https://www.npmjs.com/package/ydb-qdrant"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
    >
      npm v{version}
    </a>
  );
}
