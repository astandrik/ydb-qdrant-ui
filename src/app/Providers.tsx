"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "@gravity-ui/uikit";

const THEME = "dark" as const;

export function Providers({ children }: { children: ReactNode }) {
  return <ThemeProvider theme={THEME}>{children}</ThemeProvider>;
}
