import { ArrowUpRight, Github } from "lucide-react";
import Image from "next/image";
import { EnhancedBackground } from "@/components/enhanced-background";
import { PageTransition } from "@/components/page-transition";
import { SiteNav } from "@/components/site-nav";
import { StaticBackground } from "@/components/static-background";
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
        <StaticBackground />
        <EnhancedBackground />
        <SiteNav />

        <div className="relative z-10 min-h-screen flex items-center py-24 px-6">
          <div className="max-w-6xl mx-auto w-full">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left - Content */}
              <div className="motion-reduce:animate-none opacity-0 animate-[inenico-fade-in-left_600ms_ease-out_both] [animation-delay:800ms]">
                <span className="inline-block backdrop-blur-2xl bg-card/30 border border-border/50 rounded-full px-4 py-2 text-xs text-muted-foreground mb-6 motion-reduce:animate-none opacity-0 animate-[inenico-fade-in-up_500ms_ease-out_both] [animation-delay:900ms]">
                  Get In Touch
                </span>

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
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-4 backdrop-blur-2xl bg-card/30 border border-border/50 rounded-2xl p-4 hover:bg-card/50 transition-all hover:translate-x-2 motion-reduce:animate-none opacity-0 animate-[inenico-fade-in-up_500ms_ease-out_both]"
                      style={{ animationDelay: `${1000 + index * 100}ms` }}
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
                    </a>
                  ))}
                </div>
              </div>

              {/* Right - Character & CTA */}
              <div className="relative flex flex-col items-center motion-reduce:animate-none opacity-0 animate-[inenico-fade-in-right_600ms_ease-out_both] [animation-delay:900ms]">
                <div className="relative mb-12 motion-reduce:animate-none animate-[inenico-float-small_5s_ease-in-out_infinite]">
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
                  <div className="absolute -top-4 -right-4 backdrop-blur-2xl bg-primary text-primary-foreground rounded-2xl rounded-br-none px-4 py-2 motion-reduce:animate-none opacity-0 animate-[inenico-scale-in_600ms_ease-out_both] [animation-delay:1300ms]">
                    <span className="text-sm font-medium">Hi!</span>
                  </div>
                </div>

                {/* Footer */}
                <p className="mt-12 text-sm text-muted-foreground motion-reduce:animate-none opacity-0 animate-[inenico-fade-in-up_500ms_ease-out_both] [animation-delay:1500ms]">
                  &copy; 2026 いねにこ. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </PageTransition>
  );
}
