import { INDEXNOW_KEY } from "@/lib/site";

// The IndexNow key file. It proves to Bing and the other IndexNow search engines that pings
// about plantalk.ai pages come from us. The folder name must match INDEXNOW_KEY.
export const dynamic = "force-static";

export function GET() {
  return new Response(INDEXNOW_KEY, { headers: { "content-type": "text/plain; charset=utf-8" } });
}
