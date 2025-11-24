"use client";

import { useEffect, useState } from "react";
import { YDB_QDRANT_BASE_URL } from "@/shared/config";

type ServiceStatusValue = "unknown" | "up" | "down";

type ServiceStatusProps = {
  locale?: "en" | "ru";
};

const STATUS_CHECK_INTERVAL = 30000;

export function ServiceStatus({ locale = "en" }: ServiceStatusProps) {
  const [status, setStatus] = useState<ServiceStatusValue>("unknown");

  useEffect(() => {
    let cancelled = false;

    async function fetchStatus() {
      try {
        const res = await fetch(`${YDB_QDRANT_BASE_URL}/health`);
        if (!cancelled) {
          setStatus(res.ok ? "up" : "down");
        }
      } catch {
        if (!cancelled) {
          setStatus("down");
        }
      }
    }

    void fetchStatus();

    const intervalId = window.setInterval(() => {
      void fetchStatus();
    }, STATUS_CHECK_INTERVAL);

    return () => {
      cancelled = true;
      window.clearInterval(intervalId);
    };
  }, []);

  let label: string;
  if (locale === "ru") {
    if (status === "up") {
      label = "Онлайн";
    } else if (status === "down") {
      label = "Недоступен";
    } else {
      label = "Проверяем…";
    }
  } else {
    if (status === "up") {
      label = "Online";
    } else if (status === "down") {
      label = "Offline";
    } else {
      label = "Checking…";
    }
  }

  return (
    <span
      className={`demo-status demo-status--${status}`}
      aria-live="polite"
    >
      <span className="demo-status-indicator" aria-hidden="true" />
      <span className="demo-status-text">{label}</span>
    </span>
  );
}


