"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

function FloatingOrb({
  size,
  color,
  initialX,
  initialY,
  duration,
}: {
  size: number;
  color: string;
  initialX: string;
  initialY: string;
  duration: number;
}) {
  return (
    <motion.div
      className="absolute rounded-full blur-[100px]"
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
        opacity: [0.4, 0.6, 0.3, 0.5, 0.4],
      }}
      transition={{
        duration,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
    />
  );
}

function GridLines() {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
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

function FloatingParticles() {
  const [particles] = useState(() => {
    // Hydration-safe: deterministic values (no runtime randomness).
    const random = (seed: number) => {
      let t = seed + 0x6d2b79f5;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };

    return Array.from({ length: 30 }, (_, i) => {
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
  });

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

function MouseFollower() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 200);
      mouseY.set(e.clientY - 200);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="pointer-events-none fixed w-[400px] h-[400px] rounded-full blur-[120px] opacity-20"
      style={{
        x: springX,
        y: springY,
        background:
          "radial-gradient(circle, oklch(0.7 0.15 180) 0%, transparent 70%)",
      }}
    />
  );
}

// SVG Color Wave Effect - Flowing colored waves across the screen using useRef for seamless animation
function ColorWaveEffect() {
  const pathCount = 8;
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(Date.now());

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

  // Generate smooth bezier curve path based on time
  const generatePath = useCallback((index: number, time: number) => {
    const baseY = 20 + index * 10;
    const amplitude = 8 + index * 2;
    const frequency = 0.02 + index * 0.003;
    const speed = 0.0003 + index * 0.00005;
    const phase = time * speed;
    const segments = 8;
    const points: string[] = [];

    for (let i = 0; i <= segments; i++) {
      const x = (i / segments) * 100;
      const y =
        baseY +
        Math.sin(x * frequency * Math.PI + phase) * amplitude +
        Math.sin(x * frequency * Math.PI * 0.5 + phase * 1.3) *
          (amplitude * 0.5);

      if (i === 0) {
        points.push(`M ${x} ${y}`);
      } else {
        const prevX = ((i - 1) / segments) * 100;
        const prevY =
          baseY +
          Math.sin(prevX * frequency * Math.PI + phase) * amplitude +
          Math.sin(prevX * frequency * Math.PI * 0.5 + phase * 1.3) *
            (amplitude * 0.5);
        const cpX1 = prevX + (100 / segments) * 0.4;
        const cpX2 = x - (100 / segments) * 0.4;
        points.push(`C ${cpX1} ${prevY}, ${cpX2} ${y}, ${x} ${y}`);
      }
    }

    return points.join(" ");
  }, []);

  useEffect(() => {
    const animate = () => {
      const elapsed = Date.now() - startTimeRef.current;

      pathRefs.current.forEach((path, index) => {
        if (path) {
          path.setAttribute("d", generatePath(index, elapsed));
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [generatePath]);

  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <title>Color Wave Effect</title>
      <defs>
        {Array.from({ length: pathCount }, (_, i) => (
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
          <feGaussianBlur stdDeviation="0.3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {Array.from({ length: pathCount }, (_, i) => (
        <path
          key={i.toString()}
          ref={(el) => {
            pathRefs.current[i] = el;
          }}
          fill="none"
          stroke={`url(#wave-gradient-${i})`}
          strokeWidth={0.12 + i * 0.015}
          strokeLinecap="round"
          filter="url(#wave-glow)"
          opacity={0.5 - i * 0.04}
        />
      ))}
    </svg>
  );
}

// Pulsing ring effect
function PulsingRings() {
  const rings = [
    { x: "20%", y: "30%", delay: 0 },
    { x: "70%", y: "60%", delay: 2 },
    { x: "50%", y: "80%", delay: 4 },
  ];

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
          initial={{ width: 0, height: 0, opacity: 0.5 }}
          animate={{
            width: [0, 300, 500],
            height: [0, 300, 500],
            opacity: [0.4, 0.2, 0],
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
function AuroraBands() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute w-[200%] h-[40%] -left-[50%] top-[10%]"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, oklch(0.5 0.15 180 / 0.1) 20%, oklch(0.6 0.12 200 / 0.15) 40%, oklch(0.5 0.1 220 / 0.1) 60%, oklch(0.4 0.15 190 / 0.08) 80%, transparent 100%)",
          filter: "blur(40px)",
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
        className="absolute w-[200%] h-[30%] -left-[50%] top-[50%]"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, oklch(0.4 0.12 200 / 0.08) 30%, oklch(0.5 0.15 175 / 0.12) 50%, oklch(0.45 0.1 210 / 0.08) 70%, transparent 100%)",
          filter: "blur(50px)",
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
function MorphingBlobs() {
  const blobPaths = [
    "M44.5,-76.3C57.8,-69.5,68.7,-57.5,76.5,-43.5C84.3,-29.6,89,-13.8,88.2,1.5C87.4,16.9,81.1,31.8,71.8,44.4C62.5,57,50.2,67.3,36.2,74.1C22.2,80.9,6.4,84.2,-9.1,82.6C-24.6,81,-39.9,74.6,-52.7,65C-65.5,55.4,-75.8,42.7,-81.2,28C-86.6,13.3,-87.1,-3.4,-82.8,-18.5C-78.5,-33.6,-69.4,-47.2,-57.2,-54.5C-45,-61.8,-29.7,-62.9,-15.6,-67.5C-1.5,-72.1,11.4,-80.2,24.8,-81.1C38.2,-82,52.1,-75.7,44.5,-76.3Z",
    "M39.9,-68.1C52.5,-61.8,64,-52.4,72.2,-40.3C80.4,-28.2,85.3,-13.3,84.5,1.1C83.7,15.5,77.2,29.5,68.4,41.8C59.6,54.1,48.5,64.7,35.5,71.1C22.5,77.5,7.6,79.7,-7.1,78.6C-21.8,77.5,-36.3,73.1,-48.5,65C-60.7,56.9,-70.6,45.1,-76.4,31.4C-82.2,17.7,-83.9,2.1,-81.1,-12.5C-78.3,-27.1,-71,-40.7,-60.4,-51.1C-49.8,-61.5,-35.9,-68.7,-22,-73.4C-8.1,-78.1,5.8,-80.3,19.5,-78.3C33.2,-76.3,46.7,-70.1,39.9,-68.1Z",
    "M47.7,-79.5C61.5,-72.7,72.5,-59.5,79.4,-44.7C86.3,-29.9,89.1,-13.5,87.3,2.1C85.5,17.7,79.1,32.4,70,45C60.9,57.6,49.1,68.1,35.4,74.5C21.7,80.9,6.1,83.2,-9.3,81.4C-24.7,79.6,-39.9,73.7,-52.5,64.5C-65.1,55.3,-75.1,42.8,-80.6,28.4C-86.1,14,-87.1,-2.3,-83,-17.1C-78.9,-31.9,-69.7,-45.2,-57.6,-52.9C-45.5,-60.6,-30.5,-62.7,-16.7,-67.6C-2.9,-72.5,9.7,-80.2,23.1,-81.7C36.5,-83.2,50.7,-78.5,47.7,-79.5Z",
  ];

  return (
    <div className="absolute inset-0 overflow-hidden opacity-30">
      <motion.svg
        viewBox="0 0 200 200"
        className="absolute w-[600px] h-[600px] -left-[200px] -top-[200px]"
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
        className="absolute w-[500px] h-[500px] right-[-150px] bottom-[-100px]"
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
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-background">
      {/* Aurora bands */}
      <AuroraBands />

      {/* Morphing blobs */}
      <MorphingBlobs />

      {/* Large gradient orbs */}
      <FloatingOrb
        size={600}
        color="radial-gradient(circle, oklch(0.45 0.15 200) 0%, transparent 70%)"
        initialX="10%"
        initialY="20%"
        duration={25}
      />
      <FloatingOrb
        size={500}
        color="radial-gradient(circle, oklch(0.5 0.12 280) 0%, transparent 70%)"
        initialX="60%"
        initialY="50%"
        duration={30}
      />
      <FloatingOrb
        size={400}
        color="radial-gradient(circle, oklch(0.4 0.1 160) 0%, transparent 70%)"
        initialX="30%"
        initialY="70%"
        duration={20}
      />

      {/* SVG Color Wave Effect */}
      <ColorWaveEffect />

      {/* Pulsing rings */}
      <PulsingRings />

      {/* Grid pattern */}
      <GridLines />

      {/* Floating particles */}
      <FloatingParticles />

      {/* Mouse follower glow */}
      <MouseFollower />

      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Vignette effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, oklch(0.13 0.02 250 / 0.6) 100%)",
        }}
      />
    </div>
  );
}
