"use client";

import LangSwitcher from "@/components/LangSwitcher";
import { DocsPageEn } from "@/components/DocsPage";

export default function DocsPage() {
  return (
    <>
      <LangSwitcher />
      <DocsPageEn />
    </>
  );
}

