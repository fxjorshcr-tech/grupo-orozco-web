import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter_Tight } from "next/font/google";
import "./globals.css";

/** Serif editorial de alto contraste — sólo para titulares. */
const display = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-display-src",
  display: "swap",
});

/** Grotesca compacta — interfaz, cuerpo de texto y cifras. */
const sans = Inter_Tight({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans-src",
  display: "swap",
});

const SITE_URL = "https://www.grupooroz.com";
const DESCRIPTION =
  "Grupo de capital costarricense dedicado a operar y administrar parques de aventura. Turismo, fotografía, transporte, tecnología y construcción, todo bajo un mismo grupo.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Grupo Oroz — Operación y administración de parques de aventura en Costa Rica",
    template: "%s · Grupo Oroz",
  },
  description: DESCRIPTION,
  keywords: [
    "parques de aventura Costa Rica",
    "canopy Costa Rica",
    "administración de parques",
    "Grupo Oroz",
    "OrostudiosCR",
    "certificación ACCT",
  ],
  authors: [{ name: "Grupo Oroz" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_CR",
    url: SITE_URL,
    siteName: "Grupo Oroz",
    title: "Grupo Oroz — Parques de aventura en Costa Rica",
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Grupo Oroz — Parques de aventura en Costa Rica",
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0B0B0C",
  colorScheme: "dark",
};

const ORG_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Grupo Oroz",
  url: SITE_URL,
  description: DESCRIPTION,
  address: { "@type": "PostalAddress", addressCountry: "CR" },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+506-6098-2244",
    email: "gabrielorozco@grupooroz.com",
    contactType: "customer service",
    availableLanguage: ["Spanish", "English"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${display.variable} ${sans.variable}`}>
      <body className="antialiased">
        <a href="#contenido" className="skip-link">
          Saltar al contenido
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSONLD) }}
        />
      </body>
    </html>
  );
}
