"use client";

import dynamic from "next/dynamic";

const AnimatedBackground = dynamic(
  () =>
    import("./animated-background").then((mod) => ({
      default: mod.AnimatedBackground,
    })),
  { ssr: false },
);

export function EnhancedBackground() {
  return <AnimatedBackground renderBase={false} />;
}
