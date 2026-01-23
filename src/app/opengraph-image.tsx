import Image from "next/image";
import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <Image
        src="/images/inenico-waving.png"
        alt="inenico"
        width={1200}
        height={630}
      />
    </div>,
    { ...size },
  );
}
