"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import Image from "next/image";
import { AnimatedBackground } from "@/components/animated-background";
import { CreativeNav } from "@/components/creative-nav";
import { PageTransition } from "@/components/page-transition";
import { XIcon } from "@/components/x-icon";

const socials = [
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com",
    handle: "@inenico",
  },
  {
    icon: XIcon,
    label: "X",
    href: "https://twitter.com",
    handle: "@inenico",
  },
];

export default function ContactPage() {
  return (
    <PageTransition>
      <main className="relative min-h-screen overflow-hidden">
        <AnimatedBackground />
        <CreativeNav />

        <div className="relative z-10 min-h-screen flex items-center py-24 px-6">
          <div className="max-w-6xl mx-auto w-full">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left - Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <motion.span
                  className="inline-block backdrop-blur-2xl bg-card/30 border border-border/50 rounded-full px-4 py-2 text-xs text-muted-foreground mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  Get In Touch
                </motion.span>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                  <span className="text-foreground">{"Let's work"}</span>
                  <br />
                  <span className="text-primary">together</span>
                </h1>

                <p className="text-lg text-muted-foreground mb-12 max-w-md leading-relaxed">
                  プロジェクトのご相談やお仕事のご依頼など、
                  お気軽にご連絡ください。新しいアイデアを一緒に形にしましょう。
                </p>

                {/* Social links */}
                <div className="space-y-4">
                  {socials.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-4 backdrop-blur-2xl bg-card/30 border border-border/50 rounded-2xl p-4 hover:bg-card/50 transition-colors"
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1 + index * 0.1 }}
                      whileHover={{ x: 10 }}
                    >
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <social.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <span className="block text-sm font-medium text-foreground">
                          {social.label}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {social.handle}
                        </span>
                      </div>
                      <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              {/* Right - Character & CTA */}
              <motion.div
                className="relative flex flex-col items-center"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
              >
                <motion.div
                  className="relative mb-12"
                  animate={{ y: [0, -15, 0] }}
                  transition={{
                    duration: 5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  <div className="backdrop-blur-2xl bg-card/30 border border-border/50 rounded-[3rem] p-10 rounded-full">
                    <Image
                      src="/images/inenico-phone.png"
                      alt="いねにこ contact"
                      width={250}
                      height={250}
                      className="relative z-10 rounded-full"
                    />
                  </div>

                  {/* Speech bubble */}
                  <motion.div
                    className="absolute -top-4 -right-4 backdrop-blur-2xl bg-primary text-primary-foreground rounded-2xl rounded-br-none px-4 py-2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.3, type: "spring" }}
                  >
                    <span className="text-sm font-medium">Hi!</span>
                  </motion.div>
                </motion.div>

                {/* Footer */}
                <motion.p
                  className="mt-12 text-sm text-muted-foreground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                >
                  &copy; 2026 いねにこ. All rights reserved.
                </motion.p>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </PageTransition>
  );
}
