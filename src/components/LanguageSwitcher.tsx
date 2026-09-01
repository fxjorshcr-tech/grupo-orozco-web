"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { BANDERAS } from "./Flags";
import { HOME_PATH, LOCALES, LOCALE_LABEL, type Locale } from "@/lib/i18n";

export default function LanguageSwitcher({
  lang,
  etiqueta,
  className = "",
}: {
  lang: Locale;
  etiqueta: string;
  className?: string;
}) {
  const [abierto, setAbierto] = useState(false);
  const contenedor = useRef<HTMLDivElement>(null);
  const BanderaActual = BANDERAS[lang];

  // Cerrar al hacer clic fuera o con Escape.
  useEffect(() => {
    if (!abierto) return;

    const onClick = (e: MouseEvent) => {
      if (!contenedor.current?.contains(e.target as Node)) setAbierto(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setAbierto(false);

    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [abierto]);

  return (
    <div ref={contenedor} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setAbierto((v) => !v)}
        aria-expanded={abierto}
        aria-haspopup="menu"
        aria-label={etiqueta}
        className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold tracking-wide text-white/85 transition-colors hover:border-white/30 hover:text-white"
      >
        <span className="overflow-hidden rounded-[2px] ring-1 ring-white/20">
          <BanderaActual className="block h-3 w-[1.125rem]" />
        </span>
        {LOCALE_LABEL[lang].corto}
        <svg
          className={`h-3 w-3 text-white/50 transition-transform duration-200 ${
            abierto ? "rotate-180" : ""
          }`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      <div
        role="menu"
        hidden={!abierto}
        className="absolute right-0 z-50 mt-2 min-w-[10rem] overflow-hidden rounded-xl border border-white/10 bg-surface-2 py-1 shadow-2xl shadow-black/60"
      >
        {LOCALES.map((codigo) => {
          const Bandera = BANDERAS[codigo];
          const activo = codigo === lang;
          return (
            <Link
              key={codigo}
              href={HOME_PATH[codigo]}
              hrefLang={codigo}
              role="menuitem"
              aria-current={activo ? "true" : undefined}
              onClick={() => setAbierto(false)}
              className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-white/5 ${
                activo ? "font-semibold text-gold-light" : "text-white/75"
              }`}
            >
              <span className="overflow-hidden rounded-[2px] ring-1 ring-white/20">
                <Bandera className="block h-3.5 w-5" />
              </span>
              {LOCALE_LABEL[codigo].largo}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
