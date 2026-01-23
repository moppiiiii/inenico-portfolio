"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { AnimatedBackground } from "@/components/animated-background";
import { CreativeNav } from "@/components/creative-nav";
import { PageTransition } from "@/components/page-transition";

const works = [
  {
    id: 1,
    title: "E-Commerce Platform",
    category: "Web Development",
    description: "モダンなECサイトの設計と開発",
    image: "/images/inenico-writing.png",
    year: "2025",
  },
  {
    id: 2,
    title: "Brand Identity System",
    category: "Design",
    description: "スタートアップのブランディング",
    image: "/images/inenico-phone.png",
    year: "2025",
  },
  {
    id: 3,
    title: "Mobile Application",
    category: "App Development",
    description: "iOS/Androidアプリの開発",
    image: "/images/inenico-standing.png",
    year: "2024",
  },
  {
    id: 4,
    title: "Interactive Experience",
    category: "Creative Development",
    description: "WebGLを使ったインタラクティブ体験",
    image: "/images/inenico-waving.png",
    year: "2024",
  },
];

export default function WorksPage() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <PageTransition>
      <main className="relative min-h-screen overflow-hidden">
        <AnimatedBackground />
        <CreativeNav />

        <div className="relative z-10 min-h-screen py-24 px-6">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <motion.div
              className="mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <motion.span
                className="inline-block backdrop-blur-2xl bg-card/30 border border-border/50 rounded-full px-4 py-2 text-xs text-muted-foreground mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                Selected Works
              </motion.span>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold">
                <span className="text-foreground">Recent</span>{" "}
                <span className="text-primary">Projects</span>
              </h1>
            </motion.div>

            {/* Works Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {works.map((work, index) => (
                <motion.div
                  key={work.id}
                  className="group relative"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  onMouseEnter={() => setHoveredId(work.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <motion.div
                    className="relative aspect-[4/3] backdrop-blur-2xl bg-card/30 border border-border/50 rounded-3xl overflow-hidden cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {/* Background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />

                    {/* Image */}
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center p-12"
                      animate={{
                        scale: hoveredId === work.id ? 1.1 : 1,
                        y: hoveredId === work.id ? -10 : 0,
                      }}
                      transition={{ duration: 0.4 }}
                    >
                      <Image
                        src={work.image || "/placeholder.svg"}
                        alt={work.title}
                        width={200}
                        height={200}
                        className="object-contain drop-shadow-xl"
                      />
                    </motion.div>

                    {/* Content overlay */}
                    <div className="absolute inset-0 p-6 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <span className="backdrop-blur-xl bg-card/50 border border-border/50 rounded-full px-3 py-1 text-xs text-muted-foreground">
                          {work.category}
                        </span>
                        <span className="text-xs text-muted-foreground font-mono">
                          {work.year}
                        </span>
                      </div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{
                          opacity: hoveredId === work.id ? 1 : 0,
                          y: hoveredId === work.id ? 0 : 20,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="backdrop-blur-2xl bg-background/80 border border-border/50 rounded-2xl p-4">
                          <h3 className="text-lg font-bold text-foreground mb-1">
                            {work.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-3">
                            {work.description}
                          </p>
                          <div className="flex items-center gap-2 text-primary text-sm font-medium">
                            View Project
                            <ArrowUpRight className="w-4 h-4" />
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* View all button */}
            <motion.div
              className="text-center mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              <motion.button
                type="button"
                className="inline-flex items-center gap-2 backdrop-blur-2xl bg-card/30 border border-border/50 px-8 py-4 rounded-full text-sm font-medium hover:bg-card/50 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View All Projects
                <ArrowUpRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </main>
    </PageTransition>
  );
}
