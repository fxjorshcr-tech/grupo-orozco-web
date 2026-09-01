import { Instrument_Serif, Inter_Tight } from "next/font/google";

import { getDictionary } from "@/lib/dictionaries";
import { HTML_LANG, type Locale } from "@/lib/i18n";
import { organizationJsonLd } from "@/lib/metadata";

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

/**
 * Documento base compartido. Existe un layout raíz por idioma para que el
 * atributo `lang` de <html> sea correcto en cada versión del sitio.
 */
export default function RootShell({
  lang,
  children,
}: {
  lang: Locale;
  children: React.ReactNode;
}) {
  const t = getDictionary(lang);

  return (
    <html lang={HTML_LANG[lang]} className={`${display.variable} ${sans.variable}`}>
      <body className="antialiased">
        <a href="#contenido" className="skip-link">
          {t.a11y.saltarContenido}
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd(lang)) }}
        />
      </body>
    </html>
  );
}
