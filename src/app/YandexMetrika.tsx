"use client";

import Script from "next/script";
import {
  YANDEX_METRIKA_ID,
  getYandexMetrikaInlineScript,
} from "@/shared/utils/metricsManager";

const YandexMetrika = () => {
  // Prevent Yandex Metrika from running in development to avoid "Failed to fetch" errors
  // caused by ad blockers or network restrictions, and to avoid polluting production data.
  if (process.env.NODE_ENV !== "production") {
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
