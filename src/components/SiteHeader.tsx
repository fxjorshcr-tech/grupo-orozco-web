"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import LanguageSwitcher from "./LanguageSwitcher";
import { SUPABASE_IMAGES } from "@/lib/assets";
import { NAV_IDS } from "@/lib/content";
import type { Dictionary } from "@/lib/dictionaries";
import { HOME_PATH, type Locale } from "@/lib/i18n";

export default function SiteHeader({ lang, t }: { lang: Locale; t: Dictionary }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Bloquea el scroll del fondo mientras el menú móvil está abierto.
  useEffect(() => {
    document.body.style.overflow = menuAbierto ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuAbierto]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuAbierto(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || menuAbierto
          ? "bg-ink/90 backdrop-blur-xl border-b border-white/10"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        {/* El logotipo protagoniza el hero; en la barra sólo aparece al hacer scroll. */}
        <a
          href={`${HOME_PATH[lang]}#inicio`}
          aria-label={t.a11y.inicio}
          className={`relative h-10 w-32 shrink-0 transition-opacity duration-500 ${
            scrolled || menuAbierto ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <Image
            src={SUPABASE_IMAGES.mainLogo}
            alt="Grupo Oroz"
            fill
            sizes="128px"
            className="object-contain object-left"
          />
        </a>

        <div className="flex items-center gap-3">
          <ul className="hidden items-center gap-1 md:flex">
            {NAV_IDS.map((id) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="rounded-full px-4 py-2 text-sm font-medium text-white/70 transition-colors hover:text-champagne"
                >
                  {t.nav[id]}
                </a>
              </li>
            ))}
          </ul>

          <LanguageSwitcher lang={lang} etiqueta={t.a11y.cambiarIdioma} />

          <button
            type="button"
            onClick={() => setMenuAbierto((v) => !v)}
            aria-expanded={menuAbierto}
            aria-controls="menu-movil"
            aria-label={menuAbierto ? t.a11y.cerrarMenu : t.a11y.abrirMenu}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white md:hidden"
          >
            <span className="relative block h-3.5 w-4">
              <span
                className={`absolute left-0 block h-px w-full bg-current transition-transform duration-300 ${
                  menuAbierto ? "top-1/2 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 block h-px w-full bg-current transition-opacity duration-200 ${
                  menuAbierto ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 block h-px w-full bg-current transition-transform duration-300 ${
                  menuAbierto ? "top-1/2 -rotate-45" : "bottom-0"
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      <div
        id="menu-movil"
        hidden={!menuAbierto}
        className="border-t border-white/10 bg-ink/95 backdrop-blur-xl md:hidden"
      >
        <ul className="mx-auto max-w-7xl px-5 py-4">
          {NAV_IDS.map((id) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={() => setMenuAbierto(false)}
                className="block border-b border-white/5 py-4 text-lg text-white/80 transition-colors hover:text-champagne"
              >
                {t.nav[id]}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
