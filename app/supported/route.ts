import { handleFacilitator } from "../../lib/http";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET(req: Request): Promise<Response> {
  return handleFacilitator(req, "supported");
}
