"use client";

import { useSyncExternalStore } from "react";
import Script from "next/script";
import {
  YANDEX_METRIKA_ID,
  getYandexMetrikaInlineScript,
} from "@/shared/utils/metricsManager";

const emptySubscribe = () => () => {};

function useIsProductionClient() {
  return useSyncExternalStore(
    emptySubscribe,
    () => {
      const isProduction = process.env.NODE_ENV === "production";
      const isLocalhost =
        window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1";
      return isProduction && !isLocalhost;
    },
    () => false
  );
}

const YandexMetrika = () => {
  const shouldRender = useIsProductionClient();

  if (!shouldRender) {
    return null;
  }

  return (
    <>
      <Script id="yandex-metrika" strategy="afterInteractive">
        {getYandexMetrikaInlineScript()}
      </Script>
      <noscript>
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
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
