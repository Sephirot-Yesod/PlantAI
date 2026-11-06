import { NextResponse, type NextRequest } from "next/server";
import { APP_STORE_URL, PLAY_URL } from "@/lib/site";

// plantalk.ai/download sends phones to the right store, so one link or QR code
// works for everyone. Desktop browsers land on the download section.
export function GET(request: NextRequest) {
  const ua = request.headers.get("user-agent") ?? "";
  if (/android/i.test(ua)) return NextResponse.redirect(PLAY_URL, 302);
  if (/iphone|ipad|ipod/i.test(ua)) return NextResponse.redirect(APP_STORE_URL, 302);
  // Relative Location: behind Cloud Run, request.url carries the internal host (0.0.0.0:8080).
  return new Response(null, { status: 302, headers: { Location: "/#download" } });
}
