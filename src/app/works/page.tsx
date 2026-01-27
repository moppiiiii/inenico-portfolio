import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { EnhancedBackground } from "@/components/enhanced-background";
import { PageTransition } from "@/components/page-transition";
import { SiteNav } from "@/components/site-nav";
import { StaticBackground } from "@/components/static-background";

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
  return (
    <PageTransition>
      <main className="relative min-h-screen overflow-hidden">
        <StaticBackground />
        <EnhancedBackground />
        <SiteNav />

        <div className="relative z-10 min-h-screen py-24 px-6">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-16 motion-reduce:animate-none opacity-0 animate-[inenico-fade-in-up_500ms_ease-out_both] [animation-delay:800ms]">
              <span className="inline-block backdrop-blur-2xl bg-card/30 border border-border/50 rounded-full px-4 py-2 text-xs text-muted-foreground mb-6 motion-reduce:animate-none opacity-0 animate-[inenico-fade-in-up_500ms_ease-out_both] [animation-delay:900ms]">
                Selected Works
              </span>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold">
                <span className="text-foreground">Recent</span>{" "}
                <span className="text-primary">Projects</span>
              </h1>
            </div>

            {/* Works Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {works.map((work, index) => (
                <div
                  key={work.id}
                  className="group relative motion-reduce:animate-none opacity-0 animate-[inenico-fade-in-up_500ms_ease-out_both]"
                  style={{ animationDelay: `${1000 + index * 100}ms` }}
                >
                  <div className="relative aspect-[4/3] backdrop-blur-2xl bg-card/30 border border-border/50 rounded-3xl overflow-hidden cursor-pointer transition-transform duration-300 ease-out group-hover:scale-[1.02]">
                    {/* Background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />

                    {/* Image */}
                    <div className="absolute inset-0 flex items-center justify-center p-12 transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-translate-y-2">
                      <Image
                        src={work.image || "/placeholder.svg"}
                        alt={work.title}
                        width={200}
                        height={200}
                        className="object-contain drop-shadow-xl"
                      />
                    </div>

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

                      <div className="opacity-0 translate-y-5 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-y-0">
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
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* View all button */}
            <div className="text-center mt-12 motion-reduce:animate-none opacity-0 animate-[inenico-fade-in-up_500ms_ease-out_both] [animation-delay:1500ms]">
              <button
                type="button"
                className="inline-flex items-center gap-2 backdrop-blur-2xl bg-card/30 border border-border/50 px-8 py-4 rounded-full text-sm font-medium hover:bg-card/50 transition-all hover:scale-105 active:scale-95"
              >
                View All Projects
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </PageTransition>
  );
}
