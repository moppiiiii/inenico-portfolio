import Image from "next/image";
import type { CSSProperties } from "react";
import { EnhancedBackground } from "@/components/enhanced-background";
import { PageTransition } from "@/components/page-transition";
import { SiteNav } from "@/components/site-nav";
import { StaticBackground } from "@/components/static-background";

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
        <StaticBackground />
        <EnhancedBackground />
        <SiteNav />

        <div className="relative z-10 min-h-screen flex items-center py-24 px-6">
          <div className="max-w-6xl mx-auto w-full">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left - Character & Stats */}
              <div className="relative motion-safe:opacity-0 motion-safe:animate-[inenico-fade-in-left_600ms_ease-out_both] motion-safe:[animation-delay:800ms]">
                <div className="relative flex justify-center rounded-full">
                  <div className="relative motion-safe:animate-[inenico-float-small_5s_ease-in-out_infinite]">
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
                    <div className="absolute -top-6 -right-6 backdrop-blur-2xl bg-card/50 border border-border/50 rounded-2xl px-5 py-3 motion-safe:animate-[inenico-float_4s_ease-in-out_infinite]">
                      <span className="text-3xl font-bold text-primary">
                        5+
                      </span>
                      <span className="text-sm text-muted-foreground ml-2">
                        Years
                      </span>
                    </div>

                    <div className="absolute -bottom-6 -left-6 backdrop-blur-2xl bg-card/50 border border-border/50 rounded-2xl px-5 py-3 motion-safe:animate-[inenico-float_4.5s_ease-in-out_infinite] motion-safe:[animation-direction:reverse]">
                      <span className="text-3xl font-bold text-primary">
                        50+
                      </span>
                      <span className="text-sm text-muted-foreground ml-2">
                        Projects
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right - Content */}
              <div className="motion-safe:opacity-0 motion-safe:animate-[inenico-fade-in-right_600ms_ease-out_both] motion-safe:[animation-delay:900ms]">
                <span className="inline-block backdrop-blur-2xl bg-card/30 border border-border/50 rounded-full px-4 py-2 text-xs text-muted-foreground mb-6 motion-safe:opacity-0 motion-safe:animate-[inenico-fade-in-up_500ms_ease-out_both] motion-safe:[animation-delay:1000ms]">
                  About Me
                </span>

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
                    <div
                      key={skill.name}
                      className="motion-safe:opacity-0 motion-safe:animate-[inenico-fade-in-right_400ms_ease-out_both]"
                      style={{ animationDelay: `${1100 + index * 100}ms` }}
                    >
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-foreground">{skill.name}</span>
                        <span className="text-muted-foreground">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="h-1 bg-card/50 rounded-full overflow-hidden backdrop-blur-xl border border-border/30">
                        <div
                          className="h-full bg-primary rounded-full motion-safe:animate-[inenico-progress_1s_ease_both]"
                          style={
                            {
                              "--inenico-progress": `${skill.level}%`,
                              width: "var(--inenico-progress)",
                              animationDelay: `${1200 + index * 100}ms`,
                            } as CSSProperties
                          }
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Experience */}
                <div>
                  <h3 className="text-sm font-medium text-foreground mb-4">
                    Experience
                  </h3>
                  <div className="space-y-3">
                    {experiences.map((exp, index) => (
                      <div
                        key={exp.year}
                        className="flex items-center gap-4 text-sm"
                      >
                        <div
                          className="motion-safe:opacity-0 motion-safe:animate-[inenico-fade-in-right_400ms_ease-out_both]"
                          style={{
                            animationDelay: `${1500 + index * 100}ms`,
                          }}
                        >
                          <span className="text-muted-foreground font-mono w-28">
                            {exp.year}
                          </span>
                          <span className="text-foreground">{exp.role}</span>
                          <span className="text-muted-foreground">
                            @ {exp.company}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </PageTransition>
  );
}
