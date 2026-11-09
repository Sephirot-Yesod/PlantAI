import data from "./android-apk.json";

// The Android app file (APK) offered at /android, written by `npm run apk -- add <file.apk>`
// (scripts/android-apk.mjs). null means no direct download: /android is a 404 and nothing links
// to it. The file itself sits in downloads/, outside git, and /downloads/<file> serves it.
export type AndroidApk = {
  /** File name in downloads/ and in the download URL, such as plantalk-ai-1.0.6.apk. */
  file: string;
  version: string;
  versionCode: number;
  bytes: number;
  /** SHA-256 of the whole file, lowercase hex. */
  sha256: string;
  /** SHA-256 of the signing certificate, as Play Console shows it (AB:CD:…). */
  certSha256: string;
  minSdk: number;
  /** Native code in the file (its lib/<abi>/ folders). arm64-v8a alone means 64-bit phones only. */
  abis: string[];
  /**
   * Whether Google Play signs its copy with the same key, so the two can update each other.
   * null until PLAY_SIGNING_CERT in scripts/android-apk.mjs is filled in; the page then says
   * neither.
   */
  sameKeyAsPlay: boolean | null;
  /** When this file went on the site (YYYY-MM-DD). */
  updated: string;
};

export const ANDROID_APK = data as AndroidApk | null;

export const ANDROID_PATH = "/android";
export const apkUrl = (apk: AndroidApk) => `/downloads/${apk.file}`;

const ANDROID_VERSIONS: Record<number, string> = {
  21: "5.0", 22: "5.1", 23: "6.0", 24: "7.0", 25: "7.1", 26: "8.0", 27: "8.1", 28: "9",
  29: "10", 30: "11", 31: "12", 32: "12L", 33: "13", 34: "14", 35: "15", 36: "16",
};

/** True when the file has no 32-bit code, so phones running 32-bit Android can't install it. */
export const only64Bit = (apk: AndroidApk) =>
  apk.abis.length > 0 && !apk.abis.some((abi) => abi === "armeabi-v7a" || abi === "x86");

/** "Android 7.0 or later" for minSdk 24: the app's own minimum, the same on Google Play. */
export const androidVersion = (apk: AndroidApk) => `Android ${ANDROID_VERSIONS[apk.minSdk] ?? `API ${apk.minSdk}`} or later`;

/** What this file needs: the minimum version, plus "(64-bit)" when the file has no 32-bit code. */
export const androidRequirement = (apk: AndroidApk) => `${androidVersion(apk)}${only64Bit(apk) ? " (64-bit)" : ""}`;

/** Megabytes as Android's Files app counts them (1 MB = 1,000,000 bytes). */
export const apkSize = (apk: AndroidApk) => `${Math.round(apk.bytes / 1e6)} MB`;
