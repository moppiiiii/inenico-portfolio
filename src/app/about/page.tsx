"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { AnimatedBackground } from "@/components/animated-background";
import { CreativeNav } from "@/components/creative-nav";
import { PageTransition } from "@/components/page-transition";

const skills = [
  { name: "Frontend Development", level: 90 },
  { name: "UI/UX Design", level: 85 },
  { name: "Backend Development", level: 75 },
  { name: "3D / Motion Design", level: 70 },
];

const experiences = [
  { year: "2025 - now", role: "Frontend Dev Lead", company: "???" },
  { year: "2023 - 2025", role: "Frontend Dev Lead", company: "YUMEMI Inc." },
  {
    year: "2020 - 2023",
    role: "Frontend Dev / Lead",
    company: "Sky Co., Ltd.",
  },
];

export default function AboutPage() {
  return (
    <PageTransition>
      <main className="relative min-h-screen overflow-hidden">
        <AnimatedBackground />
        <CreativeNav />

        <div className="relative z-10 min-h-screen flex items-center py-24 px-6">
          <div className="max-w-6xl mx-auto w-full">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left - Character & Stats */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <div className="relative flex justify-center rounded-full">
                  <motion.div
                    className="relative"
                    animate={{ y: [0, -15, 0] }}
                    transition={{
                      duration: 5,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  >
                    <div className="backdrop-blur-2xl bg-card/30 border border-border/50 rounded-3xl p-8 rounded-full">
                      <Image
                        src="/images/inenico-laptop.png"
                        alt="いねにこ working"
                        width={300}
                        height={300}
                        className="relative z-10 rounded-full"
                      />
                    </div>

                    {/* Floating stats */}
                    <motion.div
                      className="absolute -top-6 -right-6 backdrop-blur-2xl bg-card/50 border border-border/50 rounded-2xl px-5 py-3"
                      animate={{ y: [0, -10, 0] }}
                      transition={{
                        duration: 4,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                    >
                      <span className="text-3xl font-bold text-primary">
                        5+
                      </span>
                      <span className="text-sm text-muted-foreground ml-2">
                        Years
                      </span>
                    </motion.div>

                    <motion.div
                      className="absolute -bottom-6 -left-6 backdrop-blur-2xl bg-card/50 border border-border/50 rounded-2xl px-5 py-3"
                      animate={{ y: [0, 10, 0] }}
                      transition={{
                        duration: 4.5,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                    >
                      <span className="text-3xl font-bold text-primary">
                        50+
                      </span>
                      <span className="text-sm text-muted-foreground ml-2">
                        Projects
                      </span>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Right - Content */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
              >
                <motion.span
                  className="inline-block backdrop-blur-2xl bg-card/30 border border-border/50 rounded-full px-4 py-2 text-xs text-muted-foreground mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                >
                  About Me
                </motion.span>

                <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                  <span className="text-foreground">ものづくりが</span>
                  <br />
                  <span className="text-primary">好きです</span>
                </h1>

                <p className="text-muted-foreground mb-10 leading-relaxed">
                  フロントエンド開発を中心に、個人開発ではバックエンドまで幅広く手がけています。
                  ユーザーが触れて楽しいと感じるインターフェースを作ることが目標です。
                  ゆるいキャラクターですが、仕事は真剣に取り組んでいます。
                </p>

                {/* Skills */}
                <div className="space-y-4 mb-10">
                  <h3 className="text-sm font-medium text-foreground mb-4">
                    Skills
                  </h3>
                  {skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.1 + index * 0.1 }}
                    >
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-foreground">{skill.name}</span>
                        <span className="text-muted-foreground">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="h-1 bg-card/50 rounded-full overflow-hidden backdrop-blur-xl border border-border/30">
                        <motion.div
                          className="h-full bg-primary rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: 1.2 + index * 0.1 }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Experience */}
                <div>
                  <h3 className="text-sm font-medium text-foreground mb-4">
                    Experience
                  </h3>
                  <div className="space-y-3">
                    {experiences.map((exp, index) => (
                      <motion.div
                        key={exp.year}
                        className="flex items-center gap-4 text-sm"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.5 + index * 0.1 }}
                      >
                        <span className="text-muted-foreground font-mono w-28">
                          {exp.year}
                        </span>
                        <span className="text-foreground">{exp.role}</span>
                        <span className="text-muted-foreground">
                          @ {exp.company}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </PageTransition>
  );
}
