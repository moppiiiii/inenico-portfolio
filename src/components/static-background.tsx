function GridLines({ opacityClassName }: { opacityClassName: string }) {
  return (
    <svg className={`absolute inset-0 h-full w-full ${opacityClassName}`}>
      <title>Grid Lines</title>
      <defs>
        <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
          <path
            d="M 60 0 L 0 0 0 60"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  );
}

export function StaticBackground({
  gridOpacityClassName = "opacity-[0.03]",
}: {
  gridOpacityClassName?: string;
}) {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-background">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 20% 30%, oklch(0.55 0.12 200 / 0.18), transparent 55%), radial-gradient(circle at 80% 70%, oklch(0.55 0.12 180 / 0.14), transparent 55%)",
        }}
      />

      <GridLines opacityClassName={gridOpacityClassName} />

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, oklch(0.13 0.02 250 / 0.6) 100%)",
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
