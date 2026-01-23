"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Home", num: "01" },
  { href: "/about", label: "About", num: "02" },
  { href: "/works", label: "Works", num: "03" },
  { href: "/contact", label: "Contact", num: "04" },
];

export function CreativeNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const currentIndex = navItems.findIndex((item) => item.href === pathname);

  return (
    <>
      {/* Menu Toggle Button - Fixed position */}
      <motion.button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 right-6 z-[100] w-14 h-14 backdrop-blur-2xl bg-card/40 border border-border/50 rounded-full flex items-center justify-center hover:bg-card/60 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-5 h-5" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Menu className="w-5 h-5" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Logo */}
      <motion.div
        className="fixed top-6 left-6 z-[100]"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Link
          href="/"
          className="backdrop-blur-2xl bg-card/40 border border-border/50 rounded-full px-5 py-3 text-sm font-bold tracking-tight hover:bg-card/60 transition-colors inline-block"
        >
          いねにこ
        </Link>
      </motion.div>

      {/* Page indicator */}
      <motion.div
        className="fixed bottom-6 left-6 z-[100] hidden md:block"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="backdrop-blur-2xl bg-card/40 border border-border/50 rounded-full px-5 py-3">
          <span className="font-mono text-sm">
            <span className="text-primary font-bold">
              {String(currentIndex + 1).padStart(2, "0")}
            </span>
            <span className="text-muted-foreground mx-2">/</span>
            <span className="text-muted-foreground">
              {String(navItems.length).padStart(2, "0")}
            </span>
          </span>
        </div>
      </motion.div>

      {/* Side dots navigation */}
      <motion.nav
        className="fixed right-6 top-1/2 -translate-y-1/2 z-[90] hidden md:flex flex-col gap-3"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group flex items-center justify-end gap-3"
          >
            <span className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
              {item.label}
            </span>
            <motion.div
              className={`w-3 h-3 rounded-full border-2 transition-colors ${
                pathname === item.href
                  ? "bg-primary border-primary"
                  : "bg-transparent border-muted-foreground/50 group-hover:border-primary"
              }`}
              whileHover={{ scale: 1.3 }}
            />
          </Link>
        ))}
      </motion.nav>

      {/* Full screen menu overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[95]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 backdrop-blur-2xl bg-background/90"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Menu content */}
            <div className="relative h-full flex items-center justify-center">
              <nav className="flex flex-col items-center gap-2">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="group relative block py-4 px-8"
                    >
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 text-xs text-muted-foreground font-mono opacity-50">
                        {item.num}
                      </span>
                      <motion.span
                        className={`text-5xl md:text-7xl font-bold tracking-tight transition-colors ${
                          pathname === item.href
                            ? "text-primary"
                            : "text-foreground/20 group-hover:text-foreground"
                        }`}
                        whileHover={{ x: 20 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {item.label}
                      </motion.span>
                      {pathname === item.href && (
                        <motion.div
                          className="absolute -left-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary"
                          layoutId="activeNav"
                        />
                      )}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Decorative elements */}
              <motion.div
                className="absolute bottom-12 left-12 text-muted-foreground/30 text-sm font-mono"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Portfolio 2026
              </motion.div>
              <motion.div
                className="absolute bottom-12 right-12 text-muted-foreground/30 text-sm font-mono"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                Creative Developer
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
