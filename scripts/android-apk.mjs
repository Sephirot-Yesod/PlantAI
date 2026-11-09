// The Android app file (APK) that plantalk.ai/android offers as a direct download.
//
//   npm run apk -- info <file.apk>    show what's inside the file; changes nothing
//   npm run apk -- add <file.apk>     check the file, copy it to downloads/ and update src/lib/android-apk.json
//   npm run apk -- remove             take the direct download off the site
//   npm run apk -- check              runs before every build: the file must match the JSON
//
// Use the "Signed, universal APK" from Play Console (App bundle explorer › your release ›
// Downloads). Google Play signs it with the same key as the app it installs, so a copy from
// this site and a copy from Google Play can update each other, and it already counts as
// registered for Android's developer verification.
//
// downloads/*.apk is kept out of git (the file is large and Play Console can always produce it
// again) but is uploaded with `gcloud run deploy --source .`, because .gcloudignore doesn't list it.

import { createHash, X509Certificate } from "node:crypto";
import { chmodSync, copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { inflateRawSync } from "node:zlib";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const DIR = path.join(ROOT, "downloads");
const JSON_PATH = path.join(ROOT, "src/lib/android-apk.json");
const PACKAGE = "plantalk.ai.app"; // PLAY_PACKAGE in src/lib/site.ts
// SHA-256 of the key Google Play signs the app with: Play Console › Test and release › App
// integrity › Play app signing › App signing key certificate. While it's null, the site doesn't
// say whether its file and the Google Play copy can update each other.
const PLAY_SIGNING_CERT = null;

// ---- ZIP: an APK is a ZIP file ----

function readZip(buf) {
  let eocd = -1;
  for (let i = buf.length - 22; i >= Math.max(0, buf.length - 22 - 0xffff); i--) {
    if (buf.readUInt32LE(i) === 0x06054b50) {
      eocd = i;
      break;
    }
  }
  if (eocd < 0) throw new Error("this isn't an APK (no ZIP directory found)");
  const count = buf.readUInt16LE(eocd + 10);
  const cdOffset = buf.readUInt32LE(eocd + 16);
  const entries = new Map();
  for (let i = 0, p = cdOffset; i < count; i++) {
    if (buf.readUInt32LE(p) !== 0x02014b50) throw new Error("the APK's ZIP directory is damaged");
    const nameLen = buf.readUInt16LE(p + 28);
    entries.set(buf.toString("utf8", p + 46, p + 46 + nameLen), {
      method: buf.readUInt16LE(p + 10),
      size: buf.readUInt32LE(p + 20),
      local: buf.readUInt32LE(p + 42),
    });
    p += 46 + nameLen + buf.readUInt16LE(p + 30) + buf.readUInt16LE(p + 32);
  }
  const read = (name) => {
    const e = entries.get(name);
    if (!e) return null;
    const start = e.local + 30 + buf.readUInt16LE(e.local + 26) + buf.readUInt16LE(e.local + 28);
    const data = buf.subarray(start, start + e.size);
    if (e.method === 0) return data;
    if (e.method === 8) return inflateRawSync(data);
    throw new Error(`${name} uses an unknown compression method`);
  };
  return { names: [...entries.keys()], read, cdOffset };
}

// ---- Signing certificates (APK Signature Scheme v2 and v3) ----

const SCHEMES = { 0x7109871a: "v2", 0xf05368c0: "v3", 0x1b93ad61: "v3.1" };

// One length-prefixed (uint32) value at p, and where the next one starts.
function lp(b, p) {
  const len = b.readUInt32LE(p);
  return [b.subarray(p + 4, p + 4 + len), p + 4 + len];
}

// Every signature scheme block in the file, each with its signer's certificate.
function signatures(buf, cdOffset) {
  if (buf.toString("latin1", cdOffset - 16, cdOffset) !== "APK Sig Block 42") return [];
  const size = Number(buf.readBigUInt64LE(cdOffset - 24));
  const found = [];
  // The pairs run from just after the block's leading size field to its trailing size field.
  for (let p = cdOffset - size; p < cdOffset - 24; ) {
    const len = Number(buf.readBigUInt64LE(p));
    const scheme = SCHEMES[buf.readUInt32LE(p + 8)];
    if (scheme) {
      // signers › first signer › signed data › (digests, certificates) › first certificate
      const value = buf.subarray(p + 12, p + 8 + len);
      const [signers] = lp(value, 0);
      const [signer] = lp(signers, 0);
      const [signedData] = lp(signer, 0);
      const [, afterDigests] = lp(signedData, 0);
      const [certs] = lp(signedData, afterDigests);
      const [der] = lp(certs, 0);
      found.push({ scheme, cert: new X509Certificate(der) });
    }
    p += 8 + len;
  }
  return found;
}

// ---- AndroidManifest.xml, which an APK stores as binary XML ----

function stringPool(buf, p) {
  const count = buf.readUInt32LE(p + 8);
  const utf8 = (buf.readUInt32LE(p + 16) & 0x100) !== 0;
  const base = p + buf.readUInt32LE(p + 20);
  const offsets = p + buf.readUInt16LE(p + 2);
  const out = [];
  for (let i = 0; i < count; i++) {
    let s = base + buf.readUInt32LE(offsets + i * 4);
    if (utf8) {
      s += buf[s] & 0x80 ? 2 : 1; // length in UTF-16 units, which UTF-8 doesn't need
      let len = buf[s];
      if (len & 0x80) {
        len = ((len & 0x7f) << 8) | buf[s + 1];
        s += 2;
      } else s += 1;
      out.push(buf.toString("utf8", s, s + len));
    } else {
      let len = buf.readUInt16LE(s);
      if (len & 0x8000) {
        len = ((len & 0x7fff) << 16) | buf.readUInt16LE(s + 2);
        s += 4;
      } else s += 2;
      out.push(buf.toString("utf16le", s, s + len * 2));
    }
  }
  return out;
}

function parseManifest(buf) {
  if (buf.readUInt16LE(0) !== 0x0003) throw new Error("AndroidManifest.xml isn't binary XML");
  let strings = [];
  const resIds = [];
  const elements = [];
  for (let p = buf.readUInt16LE(2); p + 8 <= buf.length; ) {
    const type = buf.readUInt16LE(p);
    const headerSize = buf.readUInt16LE(p + 2);
    const size = buf.readUInt32LE(p + 4);
    if (size < 8) break;
    if (type === 0x0001) strings = stringPool(buf, p);
    else if (type === 0x0180) for (let i = p + headerSize; i < p + size; i += 4) resIds.push(buf.readUInt32LE(i));
    else if (type === 0x0102) {
      const ext = p + headerSize;
      const attrStart = buf.readUInt16LE(ext + 8);
      const attrSize = buf.readUInt16LE(ext + 10);
      const attrs = [];
      for (let i = 0, n = buf.readUInt16LE(ext + 12); i < n; i++) {
        const a = ext + attrStart + i * attrSize;
        const nameIdx = buf.readUInt32LE(a + 4);
        const dataType = buf[a + 15];
        const data = buf.readUInt32LE(a + 16);
        let value = data;
        if (dataType === 0x03) value = strings[data];
        else if (dataType === 0x12) value = data !== 0;
        else if (dataType === 0x01) value = { ref: data };
        attrs.push({ name: strings[nameIdx] ?? "", resId: resIds[nameIdx], value });
      }
      elements.push({ name: strings[buf.readUInt32LE(ext + 4)], attrs });
    }
    p += size;
  }
  return elements;
}

// Android attribute resource IDs, which still work when a build strips attribute names.
const ATTR = {
  name: 0x01010003,
  value: 0x01010024,
  debuggable: 0x0101000f,
  minSdkVersion: 0x0101020c,
  versionCode: 0x0101021b,
  versionName: 0x0101021c,
  targetSdkVersion: 0x01010270,
  testOnly: 0x01010272,
  isSplitRequired: 0x01010591,
};

function attr(el, name) {
  if (!el) return undefined;
  const id = ATTR[name];
  return (el.attrs.find((a) => id && a.resId === id) ?? el.attrs.find((a) => a.name === name))?.value;
}

// ---- What the site needs to know about a file ----

const ANDROID_VERSIONS = {
  21: "5.0", 22: "5.1", 23: "6.0", 24: "7.0", 25: "7.1", 26: "8.0", 27: "8.1", 28: "9",
  29: "10", 30: "11", 31: "12", 32: "12L", 33: "13", 34: "14", 35: "15", 36: "16",
};

const sha256 = (buf) => createHash("sha256").update(buf).digest("hex");

function inspect(file) {
  const buf = readFileSync(file);
  const zip = readZip(buf);
  const manifestXml = zip.read("AndroidManifest.xml");
  if (!manifestXml) throw new Error("there's no AndroidManifest.xml inside, so this isn't an APK");
  const els = parseManifest(manifestXml);
  const first = (name) => els.find((e) => e.name === name);
  const manifest = first("manifest");
  const application = first("application");
  const names = (tag) => els.filter((e) => e.name === tag).map((e) => attr(e, "name")).filter(Boolean);
  const components = ["activity", "service", "receiver", "provider"].flatMap(names);
  const metaRequiresSplits = els.some(
    (e) => e.name === "meta-data" && attr(e, "name") === "com.android.vending.splits.required" && attr(e, "value") === true,
  );
  const sigs = signatures(buf, zip.cdOffset);
  const versionName = attr(manifest, "versionName");
  return {
    file,
    bytes: buf.length,
    sha256: sha256(buf),
    package: attr(manifest, "package"),
    split: attr(manifest, "split"),
    versionName: typeof versionName === "string" ? versionName : null,
    versionCode: attr(manifest, "versionCode"),
    minSdk: attr(first("uses-sdk"), "minSdkVersion"),
    targetSdk: attr(first("uses-sdk"), "targetSdkVersion"),
    debuggable: attr(application, "debuggable") === true,
    testOnly: attr(application, "testOnly") === true,
    needsSplits: attr(application, "isSplitRequired") === true || metaRequiresSplits,
    permissions: names("uses-permission"),
    abis: [...new Set(zip.names.filter((n) => n.startsWith("lib/")).map((n) => n.split("/")[1]))].sort(),
    google: {
      "Play Billing (in-app purchases)": names("uses-permission").includes("com.android.vending.BILLING"),
      "Firebase Cloud Messaging (notifications)": components.some((c) => c.includes("firebase.messaging")),
      "Google Sign-In": components.some((c) => c.includes("auth.api.signin")),
      "Google Play services": els.some((e) => e.name === "meta-data" && attr(e, "name") === "com.google.android.gms.version"),
    },
    // Newest scheme first: after a key rotation, v3 and v3.1 carry the current key.
    signatures: sigs
      .map((s) => ({ scheme: s.scheme, subject: s.cert.subject.replace(/\n/g, ", "), sha256: s.cert.fingerprint256 }))
      .sort((a, b) => b.scheme.localeCompare(a.scheme)),
  };
}

// Reasons this file can't go on the site. Empty means it can.
function problems(info) {
  const out = [];
  if (info.package !== PACKAGE) out.push(`its package is ${info.package}, not ${PACKAGE} (the app on Google Play)`);
  if (info.split) out.push(`it's one part ("${info.split}") of a split install, not a complete app`);
  if (info.needsSplits) out.push("it needs other APK parts to install; use the signed, universal APK instead");
  if (info.testOnly) out.push("it's a test-only build, which phones won't install from a download");
  if (info.debuggable) out.push("it's a debug build");
  if (!info.signatures.length) out.push("it isn't signed with APK Signature Scheme v2 or v3");
  if (info.signatures.some((s) => /CN=Android Debug/.test(s.subject))) out.push("it's signed with a debug key");
  if (!info.versionName) out.push("its versionName isn't plain text; add --version <x.y.z>");
  if (typeof info.minSdk !== "number") out.push("it has no minimum Android version (minSdkVersion)");
  return out;
}

function report(info) {
  const mb = (info.bytes / 1e6).toFixed(1);
  const google = Object.entries(info.google).filter(([, on]) => on).map(([k]) => k);
  console.log(`File:         ${path.basename(info.file)}`);
  console.log(`Package:      ${info.package}`);
  console.log(`Version:      ${info.versionName ?? "?"} (version code ${info.versionCode})`);
  console.log(`Android:      ${ANDROID_VERSIONS[info.minSdk] ?? "?"} or later (minSdk ${info.minSdk}), targets SDK ${info.targetSdk}`);
  console.log(`Size:         ${mb} MB (${info.bytes.toLocaleString("en-US")} bytes)`);
  console.log(`SHA-256:      ${info.sha256}`);
  for (const s of info.signatures) console.log(`Signed (${s.scheme}):  ${s.subject}\n  cert SHA-256 ${s.sha256}`);
  console.log(`Native code:  ${info.abis.join(", ") || "none"}`);
  if (PLAY_SIGNING_CERT) {
    const same = info.signatures[0]?.sha256 === PLAY_SIGNING_CERT;
    console.log(`Google Play:  ${same ? "signed with the same key, so the two copies update each other" : "signed with a DIFFERENT key than Google Play's copy"}`);
  }
  console.log(`Uses Google:  ${google.join("; ") || "nothing detected"}`);
  if (new Set(info.signatures.map((s) => s.sha256)).size > 1) {
    console.log("Note:         the signature schemes use different keys (a key rotation); the site shows the newest.");
  }
  console.log(`Permissions:  ${info.permissions.join(", ")}`);
  console.log(
    PLAY_SIGNING_CERT
      ? ""
      : "\nCompare the cert SHA-256 with Play Console › App integrity › Play app signing › App signing key certificate.",
  );
}

function readJson() {
  return JSON.parse(readFileSync(JSON_PATH, "utf8"));
}

function writeJson(value) {
  writeFileSync(JSON_PATH, `${JSON.stringify(value, null, 2)}\n`);
}

const apksInDir = () => (existsSync(DIR) ? readdirSync(DIR).filter((f) => f.endsWith(".apk")) : []);

function localDate() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

// ---- Commands ----

const [command, file, ...rest] = process.argv.slice(2);
const option = (name) => {
  const i = rest.indexOf(name);
  return i >= 0 ? rest[i + 1] : undefined;
};

try {
  if (command === "info" || command === "add") {
    if (!file) throw new Error(`usage: npm run apk -- ${command} <file.apk>`);
    const info = inspect(path.resolve(file));
    if (option("--version")) info.versionName = option("--version");
    report(info);
    const issues = problems(info);
    if (issues.length) {
      console.error(`\nThis file can't go on the site:\n${issues.map((s) => `- ${s}`).join("\n")}`);
      process.exit(1);
    }
    if (command === "info") {
      console.log("\nThis file can go on the site: npm run apk -- add <file.apk>");
    } else {
      if (!/^[0-9A-Za-z.+_-]+$/.test(info.versionName)) throw new Error(`unexpected characters in version "${info.versionName}"`);
      const name = `plantalk-ai-${info.versionName}.apk`;
      mkdirSync(DIR, { recursive: true });
      for (const old of apksInDir()) if (old !== name) rmSync(path.join(DIR, old));
      copyFileSync(info.file, path.join(DIR, name));
      chmodSync(path.join(DIR, name), 0o644); // files from chat apps can arrive read-only
      const updated = option("--date") ?? localDate();
      writeJson({
        file: name,
        version: info.versionName,
        versionCode: info.versionCode,
        bytes: info.bytes,
        sha256: info.sha256,
        certSha256: info.signatures[0].sha256,
        minSdk: info.minSdk,
        abis: info.abis,
        sameKeyAsPlay: PLAY_SIGNING_CERT ? info.signatures[0].sha256 === PLAY_SIGNING_CERT : null,
        updated,
      });
      console.log(`\nAdded downloads/${name} and updated src/lib/android-apk.json (updated ${updated}).`);
      console.log("Build, commit the JSON (not the APK) and deploy to put it live.");
    }
  } else if (command === "remove") {
    for (const old of apksInDir()) rmSync(path.join(DIR, old));
    writeJson(null);
    console.log("The direct download is off: src/lib/android-apk.json is null and downloads/ has no APK.");
  } else if (command === "check") {
    const apk = readJson();
    if (!apk) {
      console.log("Android APK: none offered (src/lib/android-apk.json is null).");
    } else {
      const target = path.join(DIR, apk.file);
      if (!existsSync(target)) {
        throw new Error(
          `downloads/${apk.file} is missing, and plantalk.ai/android offers it. Put the file back with ` +
            "`npm run apk -- add <file.apk>` (Play Console › App bundle explorer › Downloads › Signed, universal APK), " +
            "or take the download off the site with `npm run apk -- remove`.",
        );
      }
      const buf = readFileSync(target);
      if (buf.length !== apk.bytes || sha256(buf) !== apk.sha256) {
        throw new Error(`downloads/${apk.file} doesn't match src/lib/android-apk.json. Run \`npm run apk -- add <file.apk>\` again.`);
      }
      console.log(`Android APK: downloads/${apk.file} matches (${(apk.bytes / 1e6).toFixed(1)} MB).`);
    }
  } else {
    console.log("usage: npm run apk -- info|add <file.apk> [--version x.y.z] [--date YYYY-MM-DD]\n       npm run apk -- remove|check");
    process.exit(command ? 1 : 0);
  }
} catch (error) {
  console.error(`Android APK: ${error.message}`);
  process.exit(1);
}
