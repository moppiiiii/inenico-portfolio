"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

function useIsCoarsePointer() {
  const [isCoarsePointer, setIsCoarsePointer] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: none), (pointer: coarse)");
    const update = () => setIsCoarsePointer(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return isCoarsePointer;
}

function FloatingOrb({
  size,
  color,
  initialX,
  initialY,
  duration,
  blurClassName,
}: {
  size: number;
  color: string;
  initialX: string;
  initialY: string;
  duration: number;
  blurClassName: string;
}) {
  return (
    <motion.div
      className={`absolute rounded-full ${blurClassName}`}
      style={{
        width: size,
        height: size,
        background: color,
        left: initialX,
        top: initialY,
      }}
      animate={{
        x: [0, 150, -100, 50, 0],
        y: [0, -100, 50, -50, 0],
        scale: [1, 1.3, 0.8, 1.1, 1],
        opacity: [0.35, 0.55, 0.3, 0.45, 0.35],
      }}
      transition={{
        duration,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
    />
  );
}

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

function FloatingParticles({ count }: { count: number }) {
  const particles = useMemo(() => {
    // Hydration-safe: deterministic values (no runtime randomness).
    const random = (seed: number) => {
      let t = seed + 0x6d2b79f5;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };

    return Array.from({ length: count }, (_, i) => {
      const s = i * 5;
      return {
        id: i,
        x: random(s + 1) * 100,
        y: random(s + 2) * 100,
        size: random(s + 3) * 4 + 1,
        duration: random(s + 4) * 10 + 15,
        delay: random(s + 5) * 5,
      };
    });
  }, [count]);

  return (
    <>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-primary/30"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Number.POSITIVE_INFINITY,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );
}

function MouseFollower({ disabled }: { disabled: boolean }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 45, damping: 22 });
  const springY = useSpring(mouseY, { stiffness: 45, damping: 22 });

  useEffect(() => {
    if (disabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 200);
      mouseY.set(e.clientY - 200);
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [disabled, mouseX, mouseY]);

  if (disabled) {
    return null;
  }

  return (
    <motion.div
      className="pointer-events-none fixed h-[400px] w-[400px] rounded-full opacity-15 blur-[100px]"
      style={{
        x: springX,
        y: springY,
        background:
          "radial-gradient(circle, oklch(0.7 0.15 180) 0%, transparent 70%)",
      }}
    />
  );
}

type WavePathConfig = {
  baseY: number;
  amplitude: number;
  frequency: number;
  speed: number;
  opacity: number;
  strokeWidth: number;
};

type ColorWaveEffectProps = {
  pathCount: number;
  segments: number;
  maxFps: number;
  opacityScale: number;
  disabled: boolean;
};

// SVG Color Wave Effect - Flowing colored waves across the screen using useRef for seamless animation
function ColorWaveEffect({
  pathCount,
  segments,
  maxFps,
  opacityScale,
  disabled,
}: ColorWaveEffectProps) {
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const lastFrameTimeRef = useRef<number>(0);
  const frameInterval = 1000 / maxFps;

  const colors = [
    "oklch(0.7 0.15 180)",
    "oklch(0.6 0.12 200)",
    "oklch(0.5 0.1 220)",
    "oklch(0.55 0.13 190)",
    "oklch(0.65 0.14 175)",
    "oklch(0.45 0.08 240)",
    "oklch(0.6 0.11 185)",
    "oklch(0.5 0.09 210)",
  ];

  const pathConfigs = useMemo<WavePathConfig[]>(() => {
    return Array.from({ length: pathCount }, (_, index) => ({
      baseY: 20 + index * 10,
      amplitude: 8 + index * 2,
      frequency: 0.02 + index * 0.003,
      speed: 0.0003 + index * 0.00005,
      opacity: (0.5 - index * 0.04) * opacityScale,
      strokeWidth: (0.12 + index * 0.015) * opacityScale,
    }));
  }, [opacityScale, pathCount]);

  // Generate smooth bezier curve path based on time
  const generatePath = useCallback(
    (config: WavePathConfig, time: number) => {
      const phase = time * config.speed;
      const points: string[] = [];

      for (let i = 0; i <= segments; i++) {
        const x = (i / segments) * 100;
        const y =
          config.baseY +
          Math.sin(x * config.frequency * Math.PI + phase) * config.amplitude +
          Math.sin(x * config.frequency * Math.PI * 0.5 + phase * 1.3) *
            (config.amplitude * 0.5);

        if (i === 0) {
          points.push(`M ${x} ${y}`);
        } else {
          const prevX = ((i - 1) / segments) * 100;
          const prevY =
            config.baseY +
            Math.sin(prevX * config.frequency * Math.PI + phase) *
              config.amplitude +
            Math.sin(prevX * config.frequency * Math.PI * 0.5 + phase * 1.3) *
              (config.amplitude * 0.5);
          const cpX1 = prevX + (100 / segments) * 0.4;
          const cpX2 = x - (100 / segments) * 0.4;
          points.push(`C ${cpX1} ${prevY}, ${cpX2} ${y}, ${x} ${y}`);
        }
      }

      return points.join(" ");
    },
    [segments],
  );

  useEffect(() => {
    if (disabled) return;

    const animate = (now: number) => {
      if (startTimeRef.current === 0) {
        startTimeRef.current = now;
        lastFrameTimeRef.current = now;
      }

      if (now - lastFrameTimeRef.current < frameInterval) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      lastFrameTimeRef.current = now;
      const elapsed = now - startTimeRef.current;

      pathRefs.current.forEach((path, index) => {
        const config = pathConfigs[index];
        if (!path || !config) return;
        path.setAttribute("d", generatePath(config, elapsed));
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      startTimeRef.current = 0;
      lastFrameTimeRef.current = 0;
    };
  }, [disabled, frameInterval, generatePath, pathConfigs]);

  if (disabled) {
    return null;
  }

  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <title>Color Wave Effect</title>
      <defs>
        {pathConfigs.map((_, i) => (
          <linearGradient
            key={`gradient-${i.toString()}`}
            id={`wave-gradient-${i.toString()}`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor={colors[i]} stopOpacity="0.1" />
            <stop
              offset="50%"
              stopColor={colors[(i + 2) % colors.length]}
              stopOpacity="0.6"
            />
            <stop
              offset="100%"
              stopColor={colors[(i + 4) % colors.length]}
              stopOpacity="0.1"
            />
          </linearGradient>
        ))}

        <filter id="wave-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur
            stdDeviation={opacityScale < 1 ? 0.2 : 0.3}
            result="blur"
          />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {pathConfigs.map((config, i) => (
        <path
          key={i.toString()}
          ref={(el) => {
            pathRefs.current[i] = el;
          }}
          fill="none"
          stroke={`url(#wave-gradient-${i})`}
          strokeWidth={config.strokeWidth}
          strokeLinecap="round"
          filter="url(#wave-glow)"
          opacity={config.opacity}
        />
      ))}
    </svg>
  );
}

// Pulsing ring effect
function PulsingRings({ scale }: { scale: number }) {
  const rings = [
    { x: "20%", y: "30%", delay: 0 },
    { x: "70%", y: "60%", delay: 2 },
    { x: "50%", y: "80%", delay: 4 },
  ];

  const maxSize = 500 * scale;
  const midSize = 300 * scale;

  return (
    <>
      {rings.map((ring, i) => (
        <motion.div
          key={i.toString()}
          className="absolute rounded-full border border-primary/20"
          style={{
            left: ring.x,
            top: ring.y,
            transform: "translate(-50%, -50%)",
          }}
          initial={{ width: 0, height: 0, opacity: 0.45 }}
          animate={{
            width: [0, midSize, maxSize],
            height: [0, midSize, maxSize],
            opacity: [0.35, 0.18, 0],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            delay: ring.delay,
            ease: "easeOut",
          }}
        />
      ))}
    </>
  );
}

// Aurora-like gradient bands
function AuroraBands({ blurClassName }: { blurClassName: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className={`absolute -left-[50%] top-[10%] h-[40%] w-[200%] ${blurClassName}`}
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, oklch(0.5 0.15 180 / 0.1) 20%, oklch(0.6 0.12 200 / 0.15) 40%, oklch(0.5 0.1 220 / 0.1) 60%, oklch(0.4 0.15 190 / 0.08) 80%, transparent 100%)",
        }}
        animate={{
          x: ["-25%", "25%", "-25%"],
          skewX: [-5, 5, -5],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className={`absolute -left-[50%] top-[50%] h-[30%] w-[200%] ${blurClassName}`}
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, oklch(0.4 0.12 200 / 0.08) 30%, oklch(0.5 0.15 175 / 0.12) 50%, oklch(0.45 0.1 210 / 0.08) 70%, transparent 100%)",
        }}
        animate={{
          x: ["25%", "-25%", "25%"],
          skewX: [5, -5, 5],
        }}
        transition={{
          duration: 25,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

// Morphing blob shapes
function MorphingBlobs({ scale }: { scale: number }) {
  const blobPaths = [
    "M44.5,-76.3C57.8,-69.5,68.7,-57.5,76.5,-43.5C84.3,-29.6,89,-13.8,88.2,1.5C87.4,16.9,81.1,31.8,71.8,44.4C62.5,57,50.2,67.3,36.2,74.1C22.2,80.9,6.4,84.2,-9.1,82.6C-24.6,81,-39.9,74.6,-52.7,65C-65.5,55.4,-75.8,42.7,-81.2,28C-86.6,13.3,-87.1,-3.4,-82.8,-18.5C-78.5,-33.6,-69.4,-47.2,-57.2,-54.5C-45,-61.8,-29.7,-62.9,-15.6,-67.5C-1.5,-72.1,11.4,-80.2,24.8,-81.1C38.2,-82,52.1,-75.7,44.5,-76.3Z",
    "M39.9,-68.1C52.5,-61.8,64,-52.4,72.2,-40.3C80.4,-28.2,85.3,-13.3,84.5,1.1C83.7,15.5,77.2,29.5,68.4,41.8C59.6,54.1,48.5,64.7,35.5,71.1C22.5,77.5,7.6,79.7,-7.1,78.6C-21.8,77.5,-36.3,73.1,-48.5,65C-60.7,56.9,-70.6,45.1,-76.4,31.4C-82.2,17.7,-83.9,2.1,-81.1,-12.5C-78.3,-27.1,-71,-40.7,-60.4,-51.1C-49.8,-61.5,-35.9,-68.7,-22,-73.4C-8.1,-78.1,5.8,-80.3,19.5,-78.3C33.2,-76.3,46.7,-70.1,39.9,-68.1Z",
    "M47.7,-79.5C61.5,-72.7,72.5,-59.5,79.4,-44.7C86.3,-29.9,89.1,-13.5,87.3,2.1C85.5,17.7,79.1,32.4,70,45C60.9,57.6,49.1,68.1,35.4,74.5C21.7,80.9,6.1,83.2,-9.3,81.4C-24.7,79.6,-39.9,73.7,-52.5,64.5C-65.1,55.3,-75.1,42.8,-80.6,28.4C-86.1,14,-87.1,-2.3,-83,-17.1C-78.9,-31.9,-69.7,-45.2,-57.6,-52.9C-45.5,-60.6,-30.5,-62.7,-16.7,-67.6C-2.9,-72.5,9.7,-80.2,23.1,-81.7C36.5,-83.2,50.7,-78.5,47.7,-79.5Z",
  ];

  const leftSize = Math.round(600 * scale);
  const leftOffset = Math.round(200 * scale);
  const rightSize = Math.round(500 * scale);
  const rightOffsetX = Math.round(150 * scale);
  const rightOffsetY = Math.round(100 * scale);

  return (
    <div className="absolute inset-0 overflow-hidden opacity-30">
      <motion.svg
        viewBox="0 0 200 200"
        className="absolute"
        style={{
          width: leftSize,
          height: leftSize,
          left: -leftOffset,
          top: -leftOffset,
        }}
      >
        <title>Morphing Blobs</title>
        <motion.path
          fill="oklch(0.5 0.12 180 / 0.3)"
          animate={{
            d: blobPaths,
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          style={{ transform: "translate(100px, 100px)" }}
        />
      </motion.svg>

      <motion.svg
        viewBox="0 0 200 200"
        className="absolute"
        style={{
          width: rightSize,
          height: rightSize,
          right: -rightOffsetX,
          bottom: -rightOffsetY,
        }}
      >
        <title>Morphing Blobs</title>
        <motion.path
          fill="oklch(0.45 0.1 200 / 0.25)"
          animate={{
            d: [...blobPaths].reverse(),
          }}
          transition={{
            duration: 18,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          style={{ transform: "translate(100px, 100px)" }}
        />
      </motion.svg>
    </div>
  );
}

export function AnimatedBackground() {
  const reducedMotion = useReducedMotion();
  const isCoarsePointer = useIsCoarsePointer();

  const profile = useMemo(() => {
    if (reducedMotion) {
      return {
        variant: "reduced" as const,
        particles: 0,
        wavePathCount: 0,
        waveSegments: 0,
        waveMaxFps: 0,
        waveOpacityScale: 1,
        orbBlur: "blur-[90px]",
        bandBlur: "blur-[36px]",
        gridOpacity: "opacity-[0.03]",
        blobScale: 1,
        ringScale: 1,
        showMouseFollower: false,
      };
    }

    if (isCoarsePointer) {
      return {
        variant: "coarse" as const,
        particles: 12,
        wavePathCount: 4,
        waveSegments: 6,
        waveMaxFps: 24,
        waveOpacityScale: 0.75,
        orbBlur: "blur-[72px]",
        bandBlur: "blur-[32px]",
        gridOpacity: "opacity-[0.02]",
        blobScale: 0.82,
        ringScale: 0.75,
        showMouseFollower: false,
      };
    }

    return {
      variant: "default" as const,
      particles: 24,
      wavePathCount: 8,
      waveSegments: 8,
      waveMaxFps: 36,
      waveOpacityScale: 1,
      orbBlur: "blur-[100px]",
      bandBlur: "blur-[44px]",
      gridOpacity: "opacity-[0.03]",
      blobScale: 1,
      ringScale: 1,
      showMouseFollower: true,
    };
  }, [isCoarsePointer, reducedMotion]);

  if (profile.variant === "reduced") {
    return (
      <div className="fixed inset-0 -z-10 overflow-hidden bg-background">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 20% 30%, oklch(0.55 0.12 200 / 0.18), transparent 55%), radial-gradient(circle at 80% 70%, oklch(0.55 0.12 180 / 0.14), transparent 55%)",
          }}
        />
        <GridLines opacityClassName={profile.gridOpacity} />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 0%, oklch(0.13 0.02 250 / 0.55) 100%)",
          }}
        />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-background">
      {/* Aurora bands */}
      <AuroraBands blurClassName={profile.bandBlur} />

      {/* Morphing blobs */}
      <MorphingBlobs scale={profile.blobScale} />

      {/* Large gradient orbs */}
      <FloatingOrb
        size={Math.round(600 * profile.blobScale)}
        color="radial-gradient(circle, oklch(0.45 0.15 200) 0%, transparent 70%)"
        initialX="10%"
        initialY="20%"
        duration={25}
        blurClassName={profile.orbBlur}
      />
      <FloatingOrb
        size={Math.round(500 * profile.blobScale)}
        color="radial-gradient(circle, oklch(0.5 0.12 280) 0%, transparent 70%)"
        initialX="60%"
        initialY="50%"
        duration={30}
        blurClassName={profile.orbBlur}
      />
      <FloatingOrb
        size={Math.round(400 * profile.blobScale)}
        color="radial-gradient(circle, oklch(0.4 0.1 160) 0%, transparent 70%)"
        initialX="30%"
        initialY="70%"
        duration={20}
        blurClassName={profile.orbBlur}
      />

      {/* SVG Color Wave Effect */}
      <ColorWaveEffect
        pathCount={profile.wavePathCount}
        segments={profile.waveSegments}
        maxFps={profile.waveMaxFps}
        opacityScale={profile.waveOpacityScale}
        disabled={profile.wavePathCount === 0}
      />

      {/* Pulsing rings */}
      <PulsingRings scale={profile.ringScale} />

      {/* Grid pattern */}
      <GridLines opacityClassName={profile.gridOpacity} />

      {/* Floating particles */}
      <FloatingParticles count={profile.particles} />

      {/* Mouse follower glow */}
      <MouseFollower disabled={!profile.showMouseFollower} />

      {/* Noise texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Vignette effect */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, oklch(0.13 0.02 250 / 0.6) 100%)",
        }}
      />
    </div>
  );
}
