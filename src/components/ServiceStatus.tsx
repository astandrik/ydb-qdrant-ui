"use client";

import { useEffect, useState } from "react";
import { DEMO_URL_HTTPS } from "@/shared/constants";
import "./ServiceStatus.scss";

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
        const res = await fetch(`${DEMO_URL_HTTPS}/health`);
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
      className={`service-status service-status--${status}`}
      aria-live="polite"
    >
      <span className="service-status__indicator" aria-hidden="true" />
      <span className="service-status__text">{label}</span>
    </span>
  );
}



