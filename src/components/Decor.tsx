import Image from "next/image";
import emojiRow from "@/assets/brand/emoji-row.webp";
import content from "@/assets/brand/emoji-content.webp";
import squiggle from "@/assets/brand/squiggle.webp";
import blue from "@/assets/faces/blue.webp";
import green from "@/assets/faces/green.webp";
import orange from "@/assets/faces/orange.webp";
import purple from "@/assets/faces/purple.webp";
import sleepy from "@/assets/faces/sleepy.webp";
import teal from "@/assets/faces/teal.webp";
import yellow from "@/assets/faces/yellow.webp";

// Painted emoji faces from the new Plantiemoji site design, plus the flat smiling
// face used as its favicon ("content"). Decorative unless a caller gives them meaning.
const FACES = { teal, orange, purple, blue, sleepy, yellow, green, content };
export type Face = keyof typeof FACES;

export function Emoji({
  face,
  size = 56,
  className = "",
  alt = "",
}: {
  face: Face;
  size?: number;
  className?: string;
  alt?: string;
}) {
  return (
    <Image
      src={FACES[face]}
      alt={alt}
      width={size}
      height={size}
      sizes={`${size}px`}
      className={`pointer-events-none select-none ${className}`}
    />
  );
}

// The big row of faces under the footer, as on the store design.
export function EmojiRowStrip({ className = "" }: { className?: string }) {
  return (
    <Image
      src={emojiRow}
      alt=""
      sizes="(min-width: 1440px) 1280px, 92vw"
      className={`pointer-events-none h-auto w-full select-none ${className}`}
    />
  );
}

export function Squiggle({ className = "", width = 64 }: { className?: string; width?: number }) {
  return (
    <Image
      src={squiggle}
      alt=""
      width={width}
      height={Math.round((width * 337) / 260)}
      sizes={`${width}px`}
      className={`pointer-events-none select-none ${className}`}
    />
  );
}
