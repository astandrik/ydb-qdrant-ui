"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import {
  YANDEX_METRIKA_ID,
  getYandexMetrikaInlineScript,
} from "@/shared/utils/metricsManager";

const YandexMetrika = () => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Prevent Yandex Metrika from running in development or localhost
    const isProduction = process.env.NODE_ENV === "production";
    const isLocalhost =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1";

    if (isProduction && !isLocalhost) {
      setEnabled(true);
    }
  }, []);

  if (!enabled) {
    return null;
  }

  return (
    <>
      <Script id="yandex-metrika" strategy="afterInteractive">
        {getYandexMetrikaInlineScript()}
      </Script>
      <noscript>
        <div>
          <img
            src={`https://mc.yandex.ru/watch/${YANDEX_METRIKA_ID}`}
            style={{ position: "absolute", left: "-9999px" }}
            alt=""
          />
        </div>
      </noscript>
    </>
  );
};

export default YandexMetrika;
