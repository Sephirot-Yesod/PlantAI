import Image, { type StaticImageData } from "next/image";

// A crisp piece of the real app UI (cropped from the App Store screenshots),
// shown as a floating card. Used instead of repeating whole phone mockups.
export function Fragment({
  src,
  alt,
  width,
  className = "",
  fade = false,
}: {
  src: StaticImageData;
  alt: string;
  width: number;
  className?: string;
  fade?: boolean;
}) {
  return (
    <div
      style={{ width }}
      className={`max-w-full overflow-hidden rounded-[20px] bg-white shadow-[0_28px_50px_-26px_rgb(20_30_15/0.45),0_3px_10px_-2px_rgb(20_30_15/0.08)] ring-1 ring-black/[0.06] ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        sizes={`${width}px`}
        placeholder="blur"
        className={`block h-auto w-full ${fade ? "[mask-image:linear-gradient(to_bottom,black_70%,transparent)]" : ""}`}
      />
    </div>
  );
}
