"use client";

import { useEffect } from "react";
import {
  YANDEX_METRIKA_ID,
  getYandexMetrikaInlineScript,
} from "@/shared/utils/metricsManager";

const YandexMetrika = () => {
  useEffect(() => {

    const script = document.createElement("script");
    script.innerHTML = getYandexMetrikaInlineScript();
    document.head.appendChild(script);

    const noscript = document.createElement("noscript");
    const div = document.createElement("div");
    const img = document.createElement("img");
    img.src = `https://mc.yandex.ru/watch/${YANDEX_METRIKA_ID}`;
    img.style.position = "absolute";
    img.style.left = "-9999px";
    img.alt = "";
    div.appendChild(img);
    noscript.appendChild(div);
    document.body.appendChild(noscript);

    return () => {
      try {
        document.head.removeChild(script);
        document.body.removeChild(noscript);
      } catch (e) {
        console.error(e);
      }
    };
  }, []);

  return null;
};

export default YandexMetrika;

