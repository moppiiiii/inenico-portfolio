import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { EnhancedBackground } from "@/components/enhanced-background";
import { PageTransition } from "@/components/page-transition";
import { RotatingText } from "@/components/rotating-text";
import { SiteNav } from "@/components/site-nav";
import { StaticBackground } from "@/components/static-background";

export default function HomePage() {
  return (
    <PageTransition>
      <main className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <StaticBackground />
        <EnhancedBackground />
        <SiteNav />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Text content */}
            <div>
              <div className="inline-flex items-center gap-2 backdrop-blur-2xl bg-card/30 border border-border/50 rounded-full px-4 py-2 mb-8 motion-safe:opacity-0 motion-safe:animate-[inenico-fade-in-up_400ms_ease-out_both] motion-safe:[animation-delay:200ms]">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-xs text-muted-foreground">
                  Available for work
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 leading-[0.9]">
                <RotatingText />
                <span className="block text-primary">
                  {"Frontend Developer"}
                </span>
              </h1>

              <p className="text-lg text-muted-foreground mb-10 max-w-md leading-relaxed motion-safe:opacity-0 motion-safe:animate-[inenico-fade-in-up_400ms_ease-out_both] motion-safe:[animation-delay:100ms]">
                ゆるく、でも真剣に。
              </p>

              <div className="flex flex-wrap gap-4 motion-safe:opacity-0 motion-safe:animate-[inenico-fade-in-up_400ms_ease-out_both] motion-safe:[animation-delay:200ms]">
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
              </div>
            </div>

            {/* Right - Character */}
            <div className="pointer-events-none relative flex justify-center lg:justify-end">
              <div className="relative motion-safe:animate-[inenico-float_6s_ease-in-out_infinite]">
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
                  fetchPriority="high"
                />

                {/* Decorative ring */}
                <div className="absolute -inset-16 border border-primary/20 rounded-full motion-safe:animate-[spin_20s_linear_infinite]" />
                <div className="absolute -inset-24 border border-primary/10 rounded-full motion-safe:animate-[spin_30s_linear_infinite] motion-safe:[animation-direction:reverse]" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </PageTransition>
  );
}
