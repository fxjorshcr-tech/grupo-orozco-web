import type { Metadata } from "next";

import HomePage from "@/components/HomePage";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata("en");

export default function Page() {
  return <HomePage lang="en" />;
}
