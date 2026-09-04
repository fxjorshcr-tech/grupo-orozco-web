import Image from "next/image";
import Link from "next/link";

import LanguageSwitcher from "@/components/LanguageSwitcher";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import SiteHeader from "@/components/SiteHeader";
import { SUPABASE_IMAGES } from "@/lib/assets";
import {
  AGENCIAS,
  AREAS_APOYO,
  CONTACTO,
  ENLACES_PARQUES,
  ENLACES_SERVICIOS,
  INDICADOR_IDS,
  INDICADOR_VALORES,
  OFICINAS_ACTIVAS,
  OFICINAS_PROXIMAS,
  OROSTUDIOS_METRICAS,
  PARQUES,
  PILAR_IDS,
  REAL_ESTATE,
  TIPO_PROPIEDAD_IDS,
  VENTAJA_IDS,
} from "@/lib/content";
import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";

/* ---------- Iconos ---------- */

function IconPin({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function IconCheck({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function IconArrow({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

/* ---------- Piezas reutilizables ---------- */

function LogoPlaca({
  src,
  alt,
  className = "h-40",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div className={`relative w-full rounded-xl bg-white ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 90vw, 380px"
        className="object-contain p-6"
      />
    </div>
  );
}

function Tarjeta({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-white/8 bg-surface/80 backdrop-blur-sm transition-colors duration-300 hover:border-white/15 ${className}`}
    >
      {children}
    </div>
  );
}

/* ---------- Página ---------- */

export default function HomePage({ lang }: { lang: Locale }) {
  const t = getDictionary(lang);

  return (
    <>
      <SiteHeader lang={lang} t={t} />

      <main id="contenido" className="relative">
        {/* Fondo fijo */}
        <div className="fixed inset-0 z-0">
          <Image
            src={SUPABASE_IMAGES.background}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-ink/85" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/40 to-ink" />
        </div>

        {/* ==================== HERO ==================== */}
        <section
          id="inicio"
          className="relative z-10 flex min-h-screen items-center justify-center px-5 py-32"
        >
          {/* Logotipo como marca de agua, a gran escala */}
          <div
            className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
            aria-hidden="true"
          >
            <div className="relative aspect-[1080/472] w-[190vw] max-w-none opacity-[0.055] sm:w-[150vw] lg:w-[115vw]">
              <Image
                src={SUPABASE_IMAGES.mainLogo}
                alt=""
                fill
                sizes="150vw"
                className="object-contain grayscale"
                priority
              />
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-4xl text-center">
            <p className="eyebrow mb-10 text-white/40">{t.hero.eyebrow}</p>

            {/* El logotipo es el titular */}
            <h1 className="mx-auto mb-10 w-full max-w-2xl">
              <span className="relative block aspect-[1080/472] w-full">
                <Image
                  src={SUPABASE_IMAGES.mainLogo}
                  alt="Grupo Oroz"
                  fill
                  sizes="(max-width: 768px) 88vw, 672px"
                  className="object-contain drop-shadow-[0_10px_40px_rgba(0,0,0,0.6)]"
                  priority
                />
              </span>
            </h1>

            <div className="mx-auto mb-10 h-px w-24 rule-gold" aria-hidden="true" />

            <p className="mx-auto max-w-2xl font-display text-2xl leading-snug text-champagne sm:text-3xl text-balance">
              {t.hero.lema}
            </p>

            <p className="mx-auto mt-6 max-w-xl leading-relaxed text-white/55 text-pretty">
              {t.hero.apoyo}
            </p>

            <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="#parques"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-champagne px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-white"
              >
                {t.hero.ctaParques}
                <IconArrow className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#grupo"
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-7 py-3.5 text-sm font-medium text-white/85 transition-colors hover:border-white/40 hover:text-white"
              >
                {t.hero.ctaGrupo}
              </a>
            </div>
          </div>
        </section>

        {/* ==================== QUIÉNES SOMOS ==================== */}
        <section id="nosotros" className="relative z-10 px-5 py-28 sm:px-8 lg:py-36">
          <div className="mx-auto max-w-7xl">
            <div className="grid items-start gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
              <Reveal>
                <SectionHeading
                  numero="01"
                  eyebrow={t.nosotros.eyebrow}
                  titulo={
                    <>
                      {t.nosotros.titulo[0]}
                      <em className="text-gold-light">{t.nosotros.titulo[1]}</em>
                    </>
                  }
                />
                <div className="mt-8 space-y-5 text-lg leading-relaxed text-white/60 text-pretty">
                  {t.nosotros.parrafos.map((parrafo) => (
                    <p key={parrafo}>{parrafo}</p>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={100}>
                <dl className="grid gap-px overflow-hidden rounded-2xl border border-white/8 bg-white/8 sm:grid-cols-2">
                  {PILAR_IDS.map((id, i) => (
                    <div key={id} className="bg-ink p-8">
                      <span className="tabular mb-5 block text-xs font-semibold text-gold">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <dt className="mb-2.5 text-lg font-semibold text-white">
                        {t.nosotros.pilares[id].titulo}
                      </dt>
                      <dd className="leading-relaxed text-white/55 text-pretty">
                        {t.nosotros.pilares[id].desc}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ==================== TRABAJO INTEGRAL ==================== */}
        <section id="grupo" className="relative z-10 px-5 py-28 sm:px-8 lg:py-36">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <SectionHeading
                numero="02"
                eyebrow={t.integral.eyebrow}
                align="center"
                titulo={
                  <>
                    {t.integral.titulo[0]}
                    <em className="text-gold-light">{t.integral.titulo[1]}</em>
                  </>
                }
                descripcion={t.integral.descripcion}
              />
            </Reveal>

            <div className="mt-16 grid items-stretch gap-6 lg:grid-cols-3">
              <Reveal className="lg:row-span-2">
                <div className="flex h-full flex-col justify-center rounded-2xl border border-gold/25 bg-gradient-to-b from-gold-deep/25 to-transparent p-10">
                  <span className="eyebrow mb-4 text-gold">{t.integral.ejeEyebrow}</span>
                  <h3 className="font-display mb-5 text-4xl text-white">
                    {t.integral.ejeTitulo}
                  </h3>
                  <p className="text-lg leading-relaxed text-white/65 text-pretty">
                    {t.integral.ejeTexto}
                  </p>
                </div>
              </Reveal>

              {AREAS_APOYO.map((item, i) => (
                <Reveal key={item.id} delay={60 * (i + 1)}>
                  <Tarjeta className="h-full p-8">
                    <div className="mb-3 flex items-baseline justify-between gap-4">
                      <h3 className="text-lg font-semibold text-white">
                        {t.integral.areas[item.id].area}
                      </h3>
                      <span className="whitespace-nowrap text-sm text-gold-light">
                        {item.empresa}
                      </span>
                    </div>
                    <p className="leading-relaxed text-white/55 text-pretty">
                      {t.integral.areas[item.id].desc}
                    </p>
                  </Tarjeta>
                </Reveal>
              ))}
            </div>

            <Reveal>
              <p className="mx-auto mt-14 max-w-2xl text-center font-display text-2xl leading-snug text-white/70 text-balance">
                {t.integral.cierre}
              </p>
            </Reveal>
          </div>
        </section>

        {/* ==================== CAPITAL COSTARRICENSE ==================== */}
        <section className="relative z-10 px-5 py-20 sm:px-8">
          <Reveal>
            <div className="mx-auto max-w-5xl rounded-2xl border border-white/8 bg-surface/70 px-8 py-14 text-center backdrop-blur-sm sm:px-14">
              <span className="eyebrow text-gold">{t.capital.eyebrow}</span>
              <h2 className="font-display mt-5 text-3xl text-white sm:text-4xl text-balance">
                {t.capital.titulo[0]}
                <em className="text-gold-light">{t.capital.titulo[1]}</em>
              </h2>
              <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-white/60 text-pretty">
                {t.capital.texto}
              </p>
            </div>
          </Reveal>
        </section>

        {/* ==================== PARQUES ==================== */}
        <section id="parques" className="relative z-10 px-5 py-28 sm:px-8 lg:py-36">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <SectionHeading
                numero="03"
                eyebrow={t.parques.eyebrow}
                align="center"
                titulo={t.parques.titulo}
                descripcion={t.parques.descripcion}
              />
            </Reveal>

            <div className="mt-16 grid gap-6 md:grid-cols-3">
              {PARQUES.map((parque, i) => (
                <Reveal key={parque.id} delay={80 * i}>
                  <Tarjeta className="group h-full overflow-hidden p-7">
                    <div className="relative">
                      <LogoPlaca src={parque.logo} alt={parque.nombre} className="h-44" />
                      {parque.apertura && (
                        <span className="absolute right-3 top-3 rounded-full bg-ink/85 px-3 py-1 text-xs font-semibold tracking-wide text-gold-light">
                          {parque.apertura}
                        </span>
                      )}
                    </div>

                    <h3 className="mt-7 text-xl font-semibold text-white">
                      {parque.nombre}
                    </h3>
                    <p className="mt-2 flex items-center gap-1.5 text-sm text-white/45">
                      <IconPin className="h-4 w-4 text-gold/70" />
                      {parque.ubicacion}
                    </p>

                    <div className="mt-6 border-t border-white/8 pt-5">
                      {parque.url ? (
                        <Link
                          href={parque.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-medium text-gold-light transition-colors hover:text-champagne"
                        >
                          {t.parques.visitar}
                          <IconArrow className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </Link>
                      ) : (
                        <span className="text-sm text-white/35">
                          {t.parques.proximaApertura}
                        </span>
                      )}
                    </div>
                  </Tarjeta>
                </Reveal>
              ))}
            </div>

            <Reveal>
              <dl className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/8 bg-white/8 md:grid-cols-4">
                {INDICADOR_IDS.map((id) => (
                  <div key={id} className="bg-ink px-6 py-10 text-center">
                    <dt className="sr-only">{t.parques.indicadores[id]}</dt>
                    <dd>
                      <span className="tabular font-display block text-4xl text-champagne sm:text-5xl">
                        {INDICADOR_VALORES[id]}
                      </span>
                      <span className="mt-3 block text-sm text-white/45">
                        {t.parques.indicadores[id]}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </section>

        {/* ==================== AGENCIAS ==================== */}
        <section id="agencias" className="relative z-10 px-5 py-28 sm:px-8 lg:py-36">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <SectionHeading
                numero="04"
                eyebrow={t.agencias.eyebrow}
                align="center"
                titulo={t.agencias.titulo}
                descripcion={t.agencias.descripcion}
              />
            </Reveal>

            <div className="mt-16 grid gap-6 md:grid-cols-3">
              {AGENCIAS.map((agencia, i) => (
                <Reveal key={agencia.id} delay={80 * i}>
                  <Tarjeta className="h-full p-7 text-center">
                    <LogoPlaca src={agencia.logo} alt={agencia.nombre} className="h-40" />
                    <h3 className="mt-7 text-xl font-semibold text-white">
                      {agencia.nombre}
                    </h3>
                    <p className="mt-2 text-white/50">{t.agencias.items[agencia.id]}</p>
                  </Tarjeta>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== SERVICIOS ==================== */}
        <section id="servicios" className="relative z-10 px-5 py-28 sm:px-8 lg:py-36">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <SectionHeading
                numero="05"
                eyebrow={t.servicios.eyebrow}
                align="center"
                titulo={t.servicios.titulo}
                descripcion={t.servicios.descripcion}
              />
            </Reveal>

            <div className="mt-16 grid gap-6 lg:grid-cols-3">
              <Reveal>
                <Tarjeta className="flex h-full flex-col p-8">
                  <span className="eyebrow text-gold">{t.servicios.transporte.eyebrow}</span>
                  <h3 className="font-display mt-4 text-3xl text-white">
                    Can&apos;t Wait Travel
                  </h3>
                  <p className="mt-4 mb-8 leading-relaxed text-white/55 text-pretty">
                    {t.servicios.transporte.texto}
                  </p>
                  <div className="mt-auto">
                    <LogoPlaca
                      src={SUPABASE_IMAGES.cantWaitTravel}
                      alt="Can't Wait Travel"
                      className="h-32"
                    />
                  </div>
                </Tarjeta>
              </Reveal>

              <Reveal delay={80}>
                <Tarjeta className="flex h-full flex-col p-8">
                  <span className="eyebrow text-gold">{t.servicios.tecnologia.eyebrow}</span>
                  <h3 className="font-display mt-4 text-3xl text-white">MaxDigital &amp; Ruby</h3>
                  <p className="mt-4 mb-8 leading-relaxed text-white/55 text-pretty">
                    {t.servicios.tecnologia.texto}
                  </p>
                  <div className="mt-auto grid grid-cols-2 gap-4">
                    <LogoPlaca
                      src={SUPABASE_IMAGES.maxDigital}
                      alt="MaxDigital"
                      className="h-32"
                    />
                    <LogoPlaca src={SUPABASE_IMAGES.ruby} alt="Ruby" className="h-32" />
                  </div>
                </Tarjeta>
              </Reveal>

              <Reveal delay={160}>
                <Tarjeta className="flex h-full flex-col p-8">
                  <span className="eyebrow text-gold">{t.servicios.construccion.eyebrow}</span>
                  <h3 className="font-display mt-4 text-3xl text-white">
                    Adventures Designer
                  </h3>
                  <p className="mt-4 mb-8 leading-relaxed text-white/55 text-pretty">
                    {t.servicios.construccion.texto}
                  </p>
                  <div className="mt-auto">
                    <LogoPlaca
                      src={SUPABASE_IMAGES.adventuresDesigner}
                      alt="Adventures Designer"
                      className="h-32"
                    />
                  </div>
                </Tarjeta>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ==================== OROSTUDIOSCR ==================== */}
        <section id="orostudios" className="relative z-10 px-5 py-28 sm:px-8 lg:py-36">
          <div className="mx-auto max-w-7xl">
            <div className="grid items-center gap-16 lg:grid-cols-[1.15fr_1fr] lg:gap-24">
              <Reveal>
                <SectionHeading
                  numero="06"
                  eyebrow={t.orostudios.eyebrow}
                  titulo="OrostudiosCR"
                />
                <p className="mt-8 text-lg leading-relaxed text-white/60 text-pretty">
                  {t.orostudios.texto}
                </p>

                <dl className="mt-10 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-white/8 bg-white/8">
                  {OROSTUDIOS_METRICAS.map((metrica) => (
                    <div key={metrica.id} className="bg-ink px-4 py-7 text-center">
                      <dt className="sr-only">{t.orostudios.metricas[metrica.id]}</dt>
                      <dd>
                        <span className="tabular font-display block text-3xl text-champagne sm:text-4xl">
                          {metrica.valor}
                        </span>
                        <span className="mt-2 block text-xs text-white/45">
                          {t.orostudios.metricas[metrica.id]}
                        </span>
                      </dd>
                    </div>
                  ))}
                </dl>

                <Link
                  href="https://www.orostudioscr.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-10 inline-flex items-center gap-2 rounded-full border border-gold/40 px-7 py-3.5 text-sm font-semibold text-gold-light transition-colors hover:border-gold hover:bg-gold/10"
                >
                  {t.orostudios.cta}
                  <IconArrow className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Reveal>

              <Reveal delay={100}>
                <div className="rounded-2xl border border-white/8 bg-surface/70 p-10 backdrop-blur-sm">
                  <LogoPlaca
                    src={SUPABASE_IMAGES.orostudios}
                    alt="OrostudiosCR"
                    className="h-56"
                  />
                </div>
              </Reveal>
            </div>

            {/* ---------- Oficinas en operación ---------- */}
            <div className="mt-28">
              <Reveal>
                <div className="text-center">
                  <span className="eyebrow inline-flex items-center gap-2 text-gold">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
                    {t.orostudios.oficinas.badge}
                  </span>
                  <h3 className="font-display mt-5 text-3xl text-white sm:text-4xl">
                    {t.orostudios.oficinas.titulo}
                  </h3>
                  <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-white/50 text-pretty">
                    {t.orostudios.oficinas.descripcion}
                  </p>
                </div>
              </Reveal>

              <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {OFICINAS_ACTIVAS.map((oficina, i) => (
                  <Reveal key={oficina.id} delay={70 * i} className="h-full">
                    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/8 bg-surface/80 backdrop-blur-sm transition-colors duration-300 hover:border-gold/40">
                      <div className="relative aspect-[4/3] overflow-hidden bg-ink">
                        <Image
                          src={oficina.foto}
                          alt={`Oficina de OrostudiosCR en ${oficina.nombre}`}
                          fill
                          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 31vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        />
                        <div
                          className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent"
                          aria-hidden="true"
                        />
                        <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/95 px-2.5 py-1 text-[11px] font-semibold text-emerald-950">
                          <span
                            className="h-1.5 w-1.5 rounded-full bg-emerald-950"
                            aria-hidden="true"
                          />
                          {t.orostudios.oficinas.badge}
                        </span>
                      </div>

                      <div className="flex flex-1 flex-col p-6">
                        <h4 className="text-lg font-semibold text-white">{oficina.nombre}</h4>
                        <p className="mt-2 flex items-center gap-1.5 text-sm text-white/45">
                          <IconPin className="h-4 w-4 text-gold/70" />
                          {oficina.ubicacion}
                        </p>
                        <p className="mt-4 leading-relaxed text-white/55 text-pretty">
                          {t.orostudios.oficinas.descripciones[oficina.id]}
                        </p>

                        <ul className="mt-auto flex flex-wrap gap-x-5 gap-y-2 border-t border-white/8 pt-5">
                          {t.orostudios.oficinas.beneficios.map((beneficio) => (
                            <li
                              key={beneficio}
                              className="flex items-center gap-1.5 text-sm text-white/45"
                            >
                              <IconCheck className="h-3.5 w-3.5 text-gold" />
                              {beneficio}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </article>
                  </Reveal>
                ))}
              </div>

              {/* ---------- Próximas aperturas ---------- */}
              <Reveal>
                <div className="mt-20">
                  <div className="mb-10 flex items-center gap-5">
                    <span className="h-px flex-1 bg-white/8" aria-hidden="true" />
                    <span className="eyebrow whitespace-nowrap text-gold">
                      {t.orostudios.proximas.eyebrow}
                    </span>
                    <span className="h-px flex-1 bg-white/8" aria-hidden="true" />
                  </div>

                  <div className="text-center">
                    <h4 className="font-display text-3xl text-white">
                      {t.orostudios.proximas.titulo}
                    </h4>
                    <p className="mx-auto mt-4 max-w-xl text-white/50 text-pretty">
                      {t.orostudios.proximas.descripcion}
                    </p>
                  </div>

                  <ul className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-2">
                    {OFICINAS_PROXIMAS.map((oficina) => (
                      <li
                        key={oficina.nombre}
                        className="flex items-center gap-5 rounded-2xl border border-white/8 bg-surface/60 p-5 backdrop-blur-sm"
                      >
                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-white/8 bg-ink">
                          {oficina.logo ? (
                            <Image
                              src={oficina.logo}
                              alt={oficina.nombre}
                              fill
                              sizes="64px"
                              className="object-contain p-2 opacity-70"
                            />
                          ) : (
                            <span className="flex h-full w-full items-center justify-center text-gold/60">
                              <IconPin className="h-6 w-6" />
                            </span>
                          )}
                        </div>
                        <div className="min-w-0">
                          <span className="inline-block rounded-full border border-gold/40 px-2.5 py-0.5 text-[10px] font-semibold tracking-[0.14em] text-gold-light uppercase">
                            {t.orostudios.proximas.badge}
                          </span>
                          <p className="mt-2 truncate font-semibold text-white">
                            {oficina.nombre}
                          </p>
                          <p className="mt-1 flex items-center gap-1.5 text-sm text-white/40">
                            <IconPin className="h-3.5 w-3.5 text-gold/60" />
                            {oficina.ubicacion}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ==================== BIENES RAÍCES ==================== */}
        <section id="bienesraices" className="relative z-10 px-5 py-28 sm:px-8 lg:py-36">
          <div className="mx-auto max-w-7xl">
            <div className="grid items-center gap-16 lg:grid-cols-[1fr_1.15fr] lg:gap-24">
              {/* Logotipo: dorado sobre fondo oscuro, como la marca del grupo */}
              <Reveal className="order-last lg:order-first">
                <a
                  href={REAL_ESTATE.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${REAL_ESTATE.nombre} — ${REAL_ESTATE.dominio}`}
                  className="group relative block overflow-hidden rounded-2xl border border-gold/25 bg-gradient-to-b from-gold-deep/20 via-surface/80 to-surface/80 p-10 backdrop-blur-sm transition-colors duration-300 hover:border-gold/50 sm:p-14"
                >
                  <div
                    className="pointer-events-none absolute inset-x-0 top-0 h-2/3 bg-[radial-gradient(ellipse_at_top,rgba(201,162,39,0.22),transparent_65%)]"
                    aria-hidden="true"
                  />
                  <div className="relative aspect-[3/2] w-full">
                    <Image
                      src={REAL_ESTATE.logo}
                      alt={REAL_ESTATE.nombre}
                      fill
                      sizes="(max-width: 1024px) 88vw, 520px"
                      className="object-contain drop-shadow-[0_8px_30px_rgba(201,162,39,0.25)] transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="relative mt-8 flex items-center justify-between gap-4 border-t border-white/8 pt-6 text-sm">
                    <span className="text-white/45">{t.bienesRaices.empresaGrupo}</span>
                    <span className="inline-flex items-center gap-2 font-medium text-gold-light transition-colors group-hover:text-champagne">
                      {REAL_ESTATE.dominio}
                      <IconArrow className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </a>
              </Reveal>

              <Reveal delay={100}>
                <SectionHeading
                  numero="07"
                  eyebrow={t.bienesRaices.eyebrow}
                  titulo={
                    <>
                      {t.bienesRaices.titulo[0]}
                      <em className="text-gold-light">{t.bienesRaices.titulo[1]}</em>
                    </>
                  }
                />
                <p className="mt-8 font-display text-2xl leading-snug text-champagne text-balance">
                  {t.bienesRaices.lema}
                </p>
                <p className="mt-5 text-lg leading-relaxed text-white/60 text-pretty">
                  {t.bienesRaices.texto}
                </p>

                {/* Tipos de propiedad y cobertura */}
                <div className="mt-8 flex flex-wrap items-center gap-2">
                  <span className="sr-only">{t.bienesRaices.tiposTitulo}</span>
                  {TIPO_PROPIEDAD_IDS.map((id) => (
                    <span
                      key={id}
                      className="rounded-full border border-gold/40 px-3.5 py-1 text-xs font-semibold tracking-[0.12em] text-gold-light uppercase"
                    >
                      {t.bienesRaices.tipos[id]}
                    </span>
                  ))}
                  <span className="ml-1 inline-flex items-center gap-1.5 text-sm text-white/45">
                    <IconPin className="h-4 w-4 text-gold/70" />
                    {t.bienesRaices.cobertura}
                  </span>
                </div>

                <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href={REAL_ESTATE.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-champagne px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-white"
                  >
                    {t.bienesRaices.cta}
                    <IconArrow className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                  <a
                    href={REAL_ESTATE.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full border border-white/20 px-7 py-3.5 text-sm font-medium text-white/85 transition-colors hover:border-white/40 hover:text-white"
                  >
                    {t.bienesRaices.ctaWhatsapp}
                  </a>
                </div>

                <p className="mt-6 text-sm text-white/40">
                  <span className="text-white/60">{REAL_ESTATE.director}</span>
                  <span className="mx-2 text-white/20">·</span>
                  {t.bienesRaices.director}
                  <span className="mx-2 text-white/20">·</span>
                  <a href={`tel:${REAL_ESTATE.telefonoHref}`} className="hover:text-white/70">
                    {REAL_ESTATE.telefono}
                  </a>
                </p>
              </Reveal>
            </div>

            {/* ---------- Ventajas de comprar en Costa Rica ---------- */}
            <Reveal>
              <dl className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-white/8 bg-white/8 sm:grid-cols-2 lg:grid-cols-4">
                {VENTAJA_IDS.map((id, i) => (
                  <div key={id} className="bg-ink p-8">
                    <span className="tabular mb-5 block text-xs font-semibold text-gold">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <dt className="mb-2.5 text-lg font-semibold text-white">
                      {t.bienesRaices.ventajas[id].titulo}
                    </dt>
                    <dd className="leading-relaxed text-white/55 text-pretty">
                      {t.bienesRaices.ventajas[id].desc}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </section>

        {/* ==================== CONTACTO ==================== */}
        <section id="contacto" className="relative z-10 px-5 py-28 sm:px-8">
          <Reveal>
            <div className="mx-auto max-w-5xl rounded-2xl border border-white/8 bg-surface/70 px-8 py-16 text-center backdrop-blur-sm sm:px-14">
              <span className="eyebrow text-gold">{t.contacto.eyebrow}</span>
              <h2 className="font-display mt-5 text-3xl text-white sm:text-5xl text-balance">
                {t.contacto.titulo[0]}
                <em className="text-gold-light">{t.contacto.titulo[1]}</em>?
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/60 text-pretty">
                {t.contacto.texto}
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href={`mailto:${CONTACTO.email}`}
                  className="inline-flex items-center justify-center rounded-full bg-champagne px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-white"
                >
                  {t.contacto.ctaCorreo}
                </a>
                <a
                  href={CONTACTO.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 px-7 py-3.5 text-sm font-medium text-white/85 transition-colors hover:border-white/40 hover:text-white"
                >
                  {t.contacto.ctaWhatsapp}
                </a>
              </div>

              <p className="mt-8 text-sm text-white/40">
                <a href={`mailto:${CONTACTO.email}`} className="hover:text-white/70">
                  {CONTACTO.email}
                </a>
                <span className="mx-3 text-white/20">·</span>
                <a href={`tel:${CONTACTO.telefonoHref}`} className="hover:text-white/70">
                  {CONTACTO.telefono}
                </a>
              </p>
            </div>
          </Reveal>
        </section>

        {/* ==================== FOOTER ==================== */}
        <footer className="relative z-10 border-t border-white/8 px-5 py-16 sm:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.7fr_1fr_1fr_1fr_1fr]">
              <div className="md:col-span-2 lg:col-span-1 lg:pr-8">
                <div className="relative h-14 w-40">
                  <Image
                    src={SUPABASE_IMAGES.mainLogo}
                    alt="Grupo Oroz"
                    fill
                    sizes="160px"
                    className="object-contain object-left"
                  />
                </div>
                <p className="mt-6 leading-relaxed text-white/45 text-pretty">
                  {t.footer.descripcion}
                </p>
                <p className="mt-6 space-x-3 text-sm">
                  <a
                    href={`mailto:${CONTACTO.email}`}
                    className="text-white/60 transition-colors hover:text-champagne"
                  >
                    {CONTACTO.email}
                  </a>
                </p>
                <p className="mt-1 text-sm">
                  <a
                    href={`tel:${CONTACTO.telefonoHref}`}
                    className="text-white/60 transition-colors hover:text-champagne"
                  >
                    {CONTACTO.telefono}
                  </a>
                </p>
              </div>

              <div>
                <h3 className="eyebrow mb-5 text-white/40">{t.footer.parques}</h3>
                <ul className="space-y-3 text-white/60">
                  {ENLACES_PARQUES.map((parque) => (
                    <li key={parque.nombre}>
                      <a
                        href={parque.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors hover:text-champagne"
                      >
                        {parque.nombre}
                      </a>
                    </li>
                  ))}
                  <li className="text-white/30">{t.footer.poas}</li>
                </ul>
              </div>

              <div>
                <h3 className="eyebrow mb-5 text-white/40">{t.footer.agencias}</h3>
                <ul className="space-y-3 text-white/60">
                  {AGENCIAS.map((a) => (
                    <li key={a.id}>{a.nombre}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="eyebrow mb-5 text-white/40">{t.footer.servicios}</h3>
                <ul className="space-y-3 text-white/60">
                  {ENLACES_SERVICIOS.map((servicio) => (
                    <li key={servicio}>{servicio}</li>
                  ))}
                  <li>
                    <a
                      href="https://www.orostudioscr.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-champagne"
                    >
                      OrostudiosCR
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="eyebrow mb-5 text-white/40">{t.footer.bienesRaices}</h3>
                <ul className="space-y-3 text-white/60">
                  <li>
                    <a
                      href={REAL_ESTATE.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-champagne"
                    >
                      {REAL_ESTATE.nombre}
                    </a>
                  </li>
                  <li>
                    <a
                      href={`mailto:${REAL_ESTATE.email}`}
                      className="text-sm transition-colors hover:text-champagne"
                    >
                      {REAL_ESTATE.email}
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-14 flex flex-col items-center justify-between gap-5 border-t border-white/8 pt-8 text-sm text-white/35 sm:flex-row">
              <p>
                &copy; {new Date().getFullYear()} Grupo Oroz. {t.footer.derechos}
              </p>
              <div className="flex items-center gap-5">
                <p>{CONTACTO.ciudad}</p>
                <LanguageSwitcher lang={lang} etiqueta={t.a11y.cambiarIdioma} />
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
