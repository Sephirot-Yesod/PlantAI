import Image, { type StaticImageData } from "next/image";

// An iPhone 15 Pro drawn in CSS around a real app screen (cropped from the App Store
// screenshots). Geometry lives in globals.css (.phone*), in units of the phone's own
// width, so the frame looks the same at every size.
export function Phone({
  src,
  alt,
  className = "",
  preload = false,
  sizes = "(min-width: 768px) 300px, 55vw",
}: {
  src: StaticImageData;
  alt: string;
  className?: string;
  preload?: boolean;
  sizes?: string;
}) {
  return (
    <div className={`phone ${className}`}>
      <div className="phone-body">
        {/* Action button, volume up, volume down, side button. Positions as % of device height. */}
        <span aria-hidden="true" className="phone-btn phone-btn-l top-[17.5%] h-[3.6%]" />
        <span aria-hidden="true" className="phone-btn phone-btn-l top-[24%] h-[7%]" />
        <span aria-hidden="true" className="phone-btn phone-btn-l top-[32.5%] h-[7%]" />
        <span aria-hidden="true" className="phone-btn phone-btn-r top-[26%] h-[11%]" />
        <div className="phone-bezel">
          <div className="phone-screen">
            <Image
              src={src}
              alt={alt}
              sizes={sizes}
              preload={preload}
              placeholder="blur"
              className="block h-auto w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
