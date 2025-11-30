export const DEMO_URL = "http://ydb-qdrant.tech:8080";
export const DEMO_URL_HTTPS = "https://ydb-qdrant.tech";

export const TAB_VALUES = {
  PUBLIC_DEMO: "public-demo",
  SELF_HOSTED: "self-hosted",
  DOCKER: "docker",
  NPM: "npm",
  ALL_IN_ONE: "all-in-one",
} as const;

export type TabValue = (typeof TAB_VALUES)[keyof typeof TAB_VALUES];

export const VALID_TABS: TabValue[] = Object.values(TAB_VALUES);

export const TAB_GOAL_NAMES: Record<TabValue, string> = {
  [TAB_VALUES.PUBLIC_DEMO]: "tab_public_demo_click",
  [TAB_VALUES.SELF_HOSTED]: "tab_self_hosted_click",
  [TAB_VALUES.DOCKER]: "tab_docker_click",
  [TAB_VALUES.NPM]: "tab_npm_click",
  [TAB_VALUES.ALL_IN_ONE]: "tab_all_in_one_click",
};

export const DEFAULT_TAB: TabValue = TAB_VALUES.PUBLIC_DEMO;