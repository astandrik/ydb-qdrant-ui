"use client";

import Script from "next/script";
import {
  YANDEX_METRIKA_ID,
  getYandexMetrikaInlineScript,
} from "@/shared/utils/metricsManager";

const YandexMetrika = () => {
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
