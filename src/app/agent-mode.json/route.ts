import { agentModeData } from "@/shared/agentModeData";

export const dynamic = "force-static";

export function GET() {
  return Response.json(agentModeData, {
    headers: {
      "Cache-Control": "public, max-age=3600",
    },
  });
}
