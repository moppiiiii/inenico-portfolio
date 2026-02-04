import { Github } from "lucide-react";
import { XIcon } from "@/components/x-icon";

export const socials = [
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
] as const;
