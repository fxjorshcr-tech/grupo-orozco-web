import type { Metadata } from "next";

import HomePage from "@/components/HomePage";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata("es");

export default function Page() {
  return <HomePage lang="es" />;
}
