import type { Viewport } from "next";

import RootShell from "@/components/RootShell";
import "../globals.css";

export const viewport: Viewport = {
  themeColor: "#0B0B0C",
  colorScheme: "dark",
};

export default function EsLayout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="es">{children}</RootShell>;
}
