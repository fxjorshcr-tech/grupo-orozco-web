import type { Metadata } from "next";

import { getDictionary } from "./dictionaries";
import { HOME_PATH, HTML_LANG, LOCALES, type Locale } from "./i18n";

export const SITE_URL = "https://www.grupooroz.com";

/** Mapa hreflang: cada idioma apunta a su portada, más x-default al español. */
const languages = Object.fromEntries([
  ...LOCALES.map((l) => [HTML_LANG[l], HOME_PATH[l]]),
  ["x-default", HOME_PATH.es],
]);

export function buildMetadata(lang: Locale): Metadata {
  const t = getDictionary(lang);

  return {
    metadataBase: new URL(SITE_URL),
    title: t.meta.title,
    description: t.meta.description,
    alternates: {
      canonical: HOME_PATH[lang],
      languages,
    },
    openGraph: {
      type: "website",
      locale: lang === "es" ? "es_CR" : "en_US",
      url: `${SITE_URL}${HOME_PATH[lang]}`,
      siteName: "Grupo Oroz",
      title: t.meta.ogTitle,
      description: t.meta.description,
    },
    twitter: {
      card: "summary_large_image",
      title: t.meta.ogTitle,
      description: t.meta.description,
    },
    robots: { index: true, follow: true },
  };
}

export function organizationJsonLd(lang: Locale) {
  const t = getDictionary(lang);
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Grupo Oroz",
    url: SITE_URL,
    description: t.meta.description,
    address: { "@type": "PostalAddress", addressCountry: "CR" },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+506-6098-2244",
      email: "gabrielorozco@grupooroz.com",
      contactType: "customer service",
      availableLanguage: ["Spanish", "English"],
    },
  };
}
