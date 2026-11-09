import { createReadStream } from "node:fs";
import path from "node:path";
import { Readable } from "node:stream";
import { ANDROID_APK, ANDROID_PATH } from "@/lib/android";

// plantalk.ai/downloads/<file>: the Android app file offered at /android. The file ships
// inside the container (next.config.ts traces downloads/*.apk into the standalone build).
//
// Cloud Run caps an HTTP/1 response at 32 MiB unless it is chunked, so a body larger than
// that goes out without a Content-Length. Range requests let a phone resume a download that
// broke off.

export const dynamic = "force-dynamic";

const DIR = path.join(process.cwd(), "downloads");
const SIZED_LIMIT = 30 * 1024 * 1024;

async function serve(request: Request, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params;
  const apk = ANDROID_APK;
  if (!apk) return new Response("Not found", { status: 404 });
  if (file !== apk.file) {
    // A link to an older version: the Android page has the current one.
    if (/^plantalk-ai-[\w.+-]+\.apk$/.test(file)) {
      return new Response(null, { status: 302, headers: { Location: ANDROID_PATH } });
    }
    return new Response("Not found", { status: 404 });
  }

  const total = apk.bytes;
  const etag = `"${apk.sha256.slice(0, 32)}"`;
  const headers: Record<string, string> = {
    "Content-Type": "application/vnd.android.package-archive",
    "Content-Disposition": `attachment; filename="${apk.file}"`,
    "Accept-Ranges": "bytes",
    ETag: etag,
    "Last-Modified": new Date(`${apk.updated}T00:00:00Z`).toUTCString(),
    "Cache-Control": "public, max-age=3600",
    "X-Robots-Tag": "noindex",
  };

  let start = 0;
  let end = total - 1;
  let status = 200;
  const range = request.headers.get("range");
  const ifRange = request.headers.get("if-range");
  // One byte range, and only if the file is still the one the client started with.
  const m = range && (!ifRange || ifRange === etag) ? /^bytes=(\d*)-(\d*)$/.exec(range.trim()) : null;
  if (m && (m[1] || m[2])) {
    if (m[1]) {
      start = Number(m[1]);
      end = m[2] ? Math.min(Number(m[2]), total - 1) : total - 1;
    } else {
      start = Math.max(0, total - Number(m[2]));
    }
    if (start >= total || start > end) {
      return new Response(null, { status: 416, headers: { "Content-Range": `bytes */${total}` } });
    }
    status = 206;
    headers["Content-Range"] = `bytes ${start}-${end}/${total}`;
  }
  const length = end - start + 1;
  if (length <= SIZED_LIMIT) headers["Content-Length"] = String(length);

  if (request.method === "HEAD") return new Response(null, { status, headers });
  const stream = Readable.toWeb(createReadStream(path.join(DIR, apk.file), { start, end }));
  return new Response(stream as unknown as ReadableStream, { status, headers });
}

export { serve as GET, serve as HEAD };
