import { CreativeNav } from "@/components/creative-nav";

// Build-time constant - only computed once during build
const CURRENT_YEAR = new Date().getFullYear();

export function SiteNav() {
  return <CreativeNav currentYear={CURRENT_YEAR} />;
}
