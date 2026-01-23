"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { AnimatedBackground } from "@/components/animated-background";
import { CreativeNav } from "@/components/creative-nav";
import { PageTransition } from "@/components/page-transition";

export default function HomePage() {
  return (
    <PageTransition>
      <main className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <AnimatedBackground />
        <CreativeNav />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Text content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <motion.div
                className="inline-flex items-center gap-2 backdrop-blur-2xl bg-card/30 border border-border/50 rounded-full px-4 py-2 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-xs text-muted-foreground">
                  Available for work
                </span>
              </motion.div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 leading-[0.9]">
                <motion.span
                  className="block text-foreground"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 }}
                >
                  いねにこ
                </motion.span>
                <motion.span
                  className="block text-primary"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                >
                  {"Frontend Developer"}
                </motion.span>
              </h1>

              <motion.p
                className="text-lg text-muted-foreground mb-10 max-w-md leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3 }}
              >
                ゆるく、でも真剣に。
                <br />
                デザインとコードで世界をちょっと楽しくする。
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
              >
                <Link
                  href="/works"
                  className="group inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full text-sm font-medium hover:opacity-90 transition-all"
                >
                  View Works
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/contact"
                  className="backdrop-blur-2xl bg-card/30 border border-border/50 px-6 py-3 rounded-full text-sm font-medium hover:bg-card/50 transition-colors"
                >
                  Contact
                </Link>
              </motion.div>
            </motion.div>

            {/* Right - Character */}
            <motion.div
              className="relative flex justify-center lg:justify-end"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <motion.div
                className="relative"
                animate={{ y: [0, -20, 0] }}
                transition={{
                  duration: 6,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                {/* Glass card behind */}
                <div className="absolute -inset-8 backdrop-blur-2xl bg-card/20 border border-border/30 rounded-full -rotate-3" />
                <div className="absolute -inset-8 backdrop-blur-2xl bg-card/10 border border-border/20 rounded-full rotate-3" />

                <Image
                  src="/images/inenico-waving.png"
                  alt="いねにこ"
                  width={350}
                  height={350}
                  className="relative z-10 drop-shadow-2xl rounded-full"
                  priority
                />

                {/* Decorative ring */}
                <motion.div
                  className="absolute -inset-16 border border-primary/20 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                />
                <motion.div
                  className="absolute -inset-24 border border-primary/10 rounded-full"
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: 30,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </main>
    </PageTransition>
  );
}
