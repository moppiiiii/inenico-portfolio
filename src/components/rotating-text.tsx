"use client";

import { AnimatePresence, domAnimation, LazyMotion, m } from "framer-motion";
import { useEffect, useState } from "react";

const texts = ["いねにこ", "inenico", "inenico.dev"] as const;

const INTERVAL_MS = 3000;
const LETTER_DELAY = 0.03;

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: LETTER_DELAY,
    },
  },
  exit: {
    transition: {
      staggerChildren: LETTER_DELAY,
      staggerDirection: -1,
    },
  },
};

const easeOut = [0.22, 1, 0.36, 1] as const;

const letterVariants = {
  hidden: {
    y: "100%",
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: easeOut,
    },
  },
  exit: {
    y: "-100%",
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: easeOut,
    },
  },
};

export function RotatingText() {
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, INTERVAL_MS);

    return () => clearInterval(timer);
  }, []);

  const currentText = texts[index];

  if (!mounted) {
    return (
      <span className="relative block h-[1.1em] overflow-hidden">
        <span className="flex text-foreground">{texts[0]}</span>
      </span>
    );
  }

  return (
    <LazyMotion features={domAnimation}>
      <span className="relative block h-[1.1em] overflow-hidden">
        <AnimatePresence mode="wait">
          <m.span
            key={currentText}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex text-foreground"
          >
            {[...currentText].map((char, i) => (
              <m.span
                key={`${i}-${char}`}
                variants={letterVariants}
                className="inline-block"
                style={{ whiteSpace: "pre" }}
              >
                {char}
              </m.span>
            ))}
          </m.span>
        </AnimatePresence>
      </span>
    </LazyMotion>
  );
}
