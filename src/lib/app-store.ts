import { APP_STORE_ID, FALLBACK_RELEASE } from "./site";

export type Release = { version: string; date: string; notes: string[] };

const BULLET = /^\s*(?:[•·\-*–—]|\d+[.)])\s*/;

export function parseReleaseNotes(text: string): string[] {
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !/^what['’]?s new/i.test(line))
    .map((line) => line.replace(BULLET, "").trim())
    .filter(Boolean)
    .slice(0, 6);
}

// Reads the current version and release notes from Apple's public lookup API,
// refreshed at most twice a day. Falls back to a stored copy if Apple is unreachable.
export async function getLatestRelease(): Promise<Release> {
  try {
    const res = await fetch(`https://itunes.apple.com/lookup?id=${APP_STORE_ID}&country=us`, {
      next: { revalidate: 43200 },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) throw new Error(`lookup ${res.status}`);
    const data = (await res.json()) as {
      results?: { version?: string; currentVersionReleaseDate?: string; releaseNotes?: string }[];
    };
    const app = data.results?.[0];
    const notes = app?.releaseNotes ? parseReleaseNotes(app.releaseNotes) : [];
    if (!app?.version || !app.currentVersionReleaseDate || notes.length === 0) throw new Error("incomplete");
    return { version: app.version, date: app.currentVersionReleaseDate, notes };
  } catch {
    return FALLBACK_RELEASE;
  }
}

export function formatReleaseDate(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));
}
