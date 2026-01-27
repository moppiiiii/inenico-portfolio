import { CreativeNav } from "@/components/creative-nav";

export function SiteNav() {
  const currentYear = new Date().getFullYear();
  return <CreativeNav currentYear={currentYear} />;
}
