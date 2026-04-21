"use client";

import { useEffect, useState } from "react";
import { SiNpm } from "@icons-pack/react-simple-icons";
import { trackGoal } from "@/shared/utils/metricsManager";
import "./HeaderIcons.scss";

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

const NpmPackageIcon = () => {
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

  return (
    <a
      id="npm-package-icon"
      className={`header-icon header-icon--npm${version ? " header-icon--npm-pill" : ""}`}
      href="https://www.npmjs.com/package/ydb-qdrant"
      aria-label={
        version
          ? `ydb-qdrant npm package, current version ${version}`
          : "npm package ydb-qdrant"
      }
      target="_blank"
      rel="noopener"
      onClick={() => trackGoal("npm_click", { target: "icon" })}
    >
      <SiNpm size={18} className="header-icon__icon" />
      {version && <span className="header-icon__version">v{version}</span>}
    </a>
  );
};

export default NpmPackageIcon;
