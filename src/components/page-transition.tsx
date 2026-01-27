"use client";

import { domAnimation, LazyMotion, m } from "framer-motion";
import type { ReactNode } from "react";

type PageTransitionProps = {
  children: ReactNode;
};

export function PageTransition({ children }: PageTransitionProps) {
  return (
    <LazyMotion features={domAnimation}>
      <m.div
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{
          duration: 0.35,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="min-h-screen"
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}
