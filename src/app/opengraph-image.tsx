import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Plantalk AI: your AI plant care companion. Free on iPhone, iPad and Android.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const asset = (p: string) => readFile(join(process.cwd(), "src/assets", p));

export default async function OpengraphImage() {
  const [bold, medium, icon, screen, emoji, emoji2, squiggle] = await Promise.all([
    asset("fonts/Poppins-Bold.ttf"),
    asset("fonts/Poppins-Medium.ttf"),
    asset("og/icon.png"),
    asset("og/screen.png"),
    asset("og/emoji.png"),
    asset("og/emoji-2.png"),
    asset("og/squiggle.png"),
  ]);
  const src = (buf: Buffer) => `data:image/png;base64,${buf.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#ffffff",
          fontFamily: "Poppins",
          color: "#000000",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", left: 0, top: 0, right: 0, height: 14, background: "#c2f277" }} />
        <svg width="620" height="620" viewBox="0 0 600 600" style={{ position: "absolute", right: -40, top: 20 }}>
          <path
            d="M318 18c98 6 196 52 238 140 40 84 30 190-20 274-52 88-152 150-256 148C176 578 76 520 34 432-8 344-6 228 52 146 108 66 210 12 318 18z"
            fill="#c2f277"
          />
        </svg>
        <div style={{ display: "flex", flexDirection: "column", padding: "78px 0 0 80px", width: 680 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <img src={src(icon)} width={84} height={84} style={{ borderRadius: 22 }} alt="" />
            <div style={{ fontSize: 40, fontWeight: 700 }}>Plantalk AI</div>
          </div>
          <div style={{ fontSize: 74, fontWeight: 700, lineHeight: 1.06, marginTop: 44, letterSpacing: -2 }}>
            Your AI plant care companion
          </div>
          <div style={{ fontSize: 30, fontWeight: 500, marginTop: 26, color: "#242526" }}>
            Free on iPhone, iPad &amp; Android
          </div>
        </div>
        <img src={src(squiggle)} width={92} height={119} style={{ position: "absolute", left: 640, top: 60 }} alt="" />
        <div
          style={{
            position: "absolute",
            right: 150,
            top: 70,
            display: "flex",
            padding: 12,
            background: "#101010",
            borderRadius: 52,
            transform: "rotate(4deg)",
          }}
        >
          <img src={src(screen)} width={280} height={607} style={{ borderRadius: 42 }} alt="" />
        </div>
        <img src={src(emoji)} width={130} height={130} style={{ position: "absolute", right: 40, top: 60 }} alt="" />
        <img src={src(emoji2)} width={100} height={100} style={{ position: "absolute", right: 430, bottom: 40 }} alt="" />
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Poppins", data: bold, weight: 700, style: "normal" },
        { name: "Poppins", data: medium, weight: 500, style: "normal" },
      ],
    },
  );
}
