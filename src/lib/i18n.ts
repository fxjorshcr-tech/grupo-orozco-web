export const LOCALES = ["es", "en"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "es";

/** Ruta de la portada en cada idioma. El español vive en la raíz. */
export const HOME_PATH: Record<Locale, string> = {
  es: "/",
  en: "/en",
};

export const LOCALE_LABEL: Record<Locale, { corto: string; largo: string }> = {
  es: { corto: "ES", largo: "Español" },
  en: { corto: "EN", largo: "English" },
};

/** Etiqueta BCP 47 para el atributo lang y los metadatos. */
export const HTML_LANG: Record<Locale, string> = {
  es: "es-CR",
  en: "en",
};
