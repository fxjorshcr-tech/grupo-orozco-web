import Image from "next/image";
import Link from "next/link";

import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import SiteHeader from "@/components/SiteHeader";
import { SUPABASE_IMAGES } from "@/lib/assets";
import {
  AGENCIAS,
  AREAS_APOYO,
  CONTACTO,
  INDICADORES,
  OFICINAS_ACTIVAS,
  OFICINAS_PROXIMAS,
  OFICINA_BENEFICIOS,
  PARQUES,
  PILARES,
} from "@/lib/content";

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

export default function Home() {
  return (
    <>
      <SiteHeader />

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
            <p className="eyebrow mb-10 text-white/40">Costa Rica · desde 2004</p>

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
              Operamos y administramos parques de aventura en Costa Rica.
            </p>

            <p className="mx-auto mt-6 max-w-xl leading-relaxed text-white/55 text-pretty">
              Nos ocupamos de todo lo que hay detrás: la seguridad, el mantenimiento, la
              gente y cada visitante que llega.
            </p>

            <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="#parques"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-champagne px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-white"
              >
                Ver nuestros parques
                <IconArrow className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#grupo"
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-7 py-3.5 text-sm font-medium text-white/85 transition-colors hover:border-white/40 hover:text-white"
              >
                Conocer el grupo
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
                  eyebrow="Quiénes somos"
                  titulo={
                    <>
                      Sabemos lo que cuesta mantener{" "}
                      <em className="text-gold-light">un parque en pie</em>
                    </>
                  }
                />
                <div className="mt-8 space-y-5 text-lg leading-relaxed text-white/60 text-pretty">
                  <p>
                    Un parque de aventura no se sostiene solo con abrir las puertas. Detrás
                    hay líneas que revisar, equipo que mantener, gente que capacitar y
                    cientos de visitantes que atender bien cada día.
                  </p>
                  <p>
                    Llevamos más de 20 años en eso. Lo conocemos desde adentro porque
                    operamos nuestros propios parques, y esa experiencia es la que ponemos a
                    trabajar en cada proyecto del grupo.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={100}>
                <dl className="grid gap-px overflow-hidden rounded-2xl border border-white/8 bg-white/8 sm:grid-cols-2">
                  {PILARES.map((pilar, i) => (
                    <div key={pilar.titulo} className="bg-ink p-8">
                      <span className="tabular mb-5 block text-xs font-semibold text-gold">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <dt className="mb-2.5 text-lg font-semibold text-white">
                        {pilar.titulo}
                      </dt>
                      <dd className="leading-relaxed text-white/55 text-pretty">
                        {pilar.desc}
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
                eyebrow="Trabajo integral"
                align="center"
                titulo={
                  <>
                    Todo lo que un parque necesita,{" "}
                    <em className="text-gold-light">bajo un mismo techo</em>
                  </>
                }
                descripcion="Operamos parques de aventura, pero también nos encargamos de lo que gira alrededor de ellos: la fotografía, el transporte, las reservas y hasta la construcción de los parques nuevos. Al tenerlo todo dentro del grupo, no dependemos de nadie más."
              />
            </Reveal>

            <div className="mt-16 grid items-stretch gap-6 lg:grid-cols-3">
              <Reveal className="lg:row-span-2">
                <div className="flex h-full flex-col justify-center rounded-2xl border border-gold/25 bg-gradient-to-b from-gold-deep/25 to-transparent p-10">
                  <span className="eyebrow mb-4 text-gold">El centro de todo</span>
                  <h3 className="font-display mb-5 text-4xl text-white">Los parques</h3>
                  <p className="text-lg leading-relaxed text-white/65 text-pretty">
                    Nuestros canopy y parques de aventura. Todo lo demás existe para que
                    funcionen bien y para que el visitante se lleve una gran experiencia.
                  </p>
                </div>
              </Reveal>

              {AREAS_APOYO.map((item, i) => (
                <Reveal key={item.area} delay={60 * (i + 1)}>
                  <Tarjeta className="h-full p-8">
                    <div className="mb-3 flex items-baseline justify-between gap-4">
                      <h3 className="text-lg font-semibold text-white">{item.area}</h3>
                      <span className="whitespace-nowrap text-sm text-gold-light">
                        {item.empresa}
                      </span>
                    </div>
                    <p className="leading-relaxed text-white/55 text-pretty">{item.desc}</p>
                  </Tarjeta>
                </Reveal>
              ))}
            </div>

            <Reveal>
              <p className="mx-auto mt-14 max-w-2xl text-center font-display text-2xl leading-snug text-white/70 text-balance">
                La ventaja de trabajar así es simple: la calidad la cuidamos nosotros, de
                principio a fin.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ==================== CAPITAL COSTARRICENSE ==================== */}
        <section className="relative z-10 px-5 py-20 sm:px-8">
          <Reveal>
            <div className="mx-auto max-w-5xl rounded-2xl border border-white/8 bg-surface/70 px-8 py-14 text-center backdrop-blur-sm sm:px-14">
              <span className="eyebrow text-gold">Hecho en Costa Rica</span>
              <h2 className="font-display mt-5 text-3xl text-white sm:text-4xl text-balance">
                Capital <em className="text-gold-light">100% costarricense</em>
              </h2>
              <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-white/60 text-pretty">
                Grupo Oroz es una empresa de capital costarricense, con raíces locales y
                equipos formados en el país. Generamos empleo en las comunidades donde
                operamos y reinvertimos en el turismo de Costa Rica. Lo que construimos, lo
                construimos aquí.
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
                eyebrow="Administración de parques"
                align="center"
                titulo="Parques de aventura"
                descripcion="Los parques que operamos y administramos directamente en Costa Rica, cada uno con estándares de seguridad ACCT y mantenimiento constante."
              />
            </Reveal>

            <div className="mt-16 grid gap-6 md:grid-cols-3">
              {PARQUES.map((parque, i) => (
                <Reveal key={parque.nombre} delay={80 * i}>
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
                          Visitar sitio web
                          <IconArrow className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </Link>
                      ) : (
                        <span className="text-sm text-white/35">Próxima apertura</span>
                      )}
                    </div>
                  </Tarjeta>
                </Reveal>
              ))}
            </div>

            <Reveal>
              <dl className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/8 bg-white/8 md:grid-cols-4">
                {INDICADORES.map((stat) => (
                  <div key={stat.label} className="bg-ink px-6 py-10 text-center">
                    <dt className="sr-only">{stat.label}</dt>
                    <dd>
                      <span className="tabular font-display block text-4xl text-champagne sm:text-5xl">
                        {stat.value}
                      </span>
                      <span className="mt-3 block text-sm text-white/45">{stat.label}</span>
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
                eyebrow="Turismo y viajes"
                align="center"
                titulo="Agencias de viajes"
                descripcion="Nuestras agencias arman los recorridos y conectan a los viajeros con cada destino de Costa Rica."
              />
            </Reveal>

            <div className="mt-16 grid gap-6 md:grid-cols-3">
              {AGENCIAS.map((agencia, i) => (
                <Reveal key={agencia.nombre} delay={80 * i}>
                  <Tarjeta className="h-full p-7 text-center">
                    <LogoPlaca src={agencia.logo} alt={agencia.nombre} className="h-40" />
                    <h3 className="mt-7 text-xl font-semibold text-white">
                      {agencia.nombre}
                    </h3>
                    <p className="mt-2 text-white/50">{agencia.desc}</p>
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
                eyebrow="Ecosistema empresarial"
                align="center"
                titulo="Más servicios"
                descripcion="Las empresas de transporte, tecnología y construcción que sostienen la operación del grupo."
              />
            </Reveal>

            <div className="mt-16 grid gap-6 lg:grid-cols-3">
              <Reveal>
                <Tarjeta className="flex h-full flex-col p-8">
                  <span className="eyebrow text-gold">Transporte</span>
                  <h3 className="font-display mt-4 text-3xl text-white">
                    Can&apos;t Wait Travel
                  </h3>
                  <p className="mt-4 mb-8 leading-relaxed text-white/55 text-pretty">
                    Transporte turístico para trasladar a los visitantes hacia cada parque y
                    destino del país.
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
                  <span className="eyebrow text-gold">Tecnología</span>
                  <h3 className="font-display mt-4 text-3xl text-white">MaxDigital y Ruby</h3>
                  <p className="mt-4 mb-8 leading-relaxed text-white/55 text-pretty">
                    Plataformas de reservas, pagos y gestión que mantienen la operación
                    funcionando cada día.
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
                  <span className="eyebrow text-gold">Construcción</span>
                  <h3 className="font-display mt-4 text-3xl text-white">
                    Adventures Designer
                  </h3>
                  <p className="mt-4 mb-8 leading-relaxed text-white/55 text-pretty">
                    Diseño, construcción y certificación de canopy, desde la primera línea
                    hasta la apertura del parque.
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
                  eyebrow="Contenido fotográfico"
                  titulo="OrostudiosCR"
                />
                <p className="mt-8 text-lg leading-relaxed text-white/60 text-pretty">
                  Es la rama del grupo dedicada a fotografía y video en parques de aventura.
                  En más de 20 años ha trabajado con más de 18 parques en Costa Rica,
                  capturando la experiencia de cada visitante y generando el contenido de
                  cada marca.
                </p>

                <dl className="mt-10 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-white/8 bg-white/8">
                  {[
                    { value: "+3500", label: "Nuevos leads" },
                    { value: "+50%", label: "Ganancia anual" },
                    { value: "+1600", label: "Seguidores" },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-ink px-4 py-7 text-center">
                      <dt className="sr-only">{stat.label}</dt>
                      <dd>
                        <span className="tabular font-display block text-3xl text-champagne sm:text-4xl">
                          {stat.value}
                        </span>
                        <span className="mt-2 block text-xs text-white/45">{stat.label}</span>
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
                  Conocer OrostudiosCR
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
                    En operación
                  </span>
                  <h3 className="font-display mt-5 text-3xl text-white sm:text-4xl">
                    Nuestras oficinas
                  </h3>
                  <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-white/50 text-pretty">
                    Oficinas fotográficas de OrostudiosCR instaladas dentro de los parques,
                    atendidas por nuestro propio equipo.
                  </p>
                </div>
              </Reveal>

              <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {OFICINAS_ACTIVAS.map((oficina, i) => (
                  <Reveal key={oficina.nombre} delay={70 * i} className="h-full">
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
                          En operación
                        </span>
                      </div>

                      <div className="flex flex-1 flex-col p-6">
                        <h4 className="text-lg font-semibold text-white">{oficina.nombre}</h4>
                        <p className="mt-2 flex items-center gap-1.5 text-sm text-white/45">
                          <IconPin className="h-4 w-4 text-gold/70" />
                          {oficina.ubicacion}
                        </p>
                        <p className="mt-4 leading-relaxed text-white/55 text-pretty">
                          {oficina.desc}
                        </p>

                        <ul className="mt-auto flex flex-wrap gap-x-5 gap-y-2 border-t border-white/8 pt-5">
                          {OFICINA_BENEFICIOS.map((beneficio) => (
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
                      Próximamente
                    </span>
                    <span className="h-px flex-1 bg-white/8" aria-hidden="true" />
                  </div>

                  <div className="text-center">
                    <h4 className="font-display text-3xl text-white">Próximas aperturas</h4>
                    <p className="mx-auto mt-4 max-w-xl text-white/50 text-pretty">
                      Parques donde ya estamos preparando la instalación de nuestra oficina
                      fotográfica.
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
                            Próximamente
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

        {/* ==================== CONTACTO ==================== */}
        <section id="contacto" className="relative z-10 px-5 py-28 sm:px-8">
          <Reveal>
            <div className="mx-auto max-w-5xl rounded-2xl border border-white/8 bg-surface/70 px-8 py-16 text-center backdrop-blur-sm sm:px-14">
              <span className="eyebrow text-gold">Hablemos</span>
              <h2 className="font-display mt-5 text-3xl text-white sm:text-5xl text-balance">
                ¿Tiene un parque que necesita <em className="text-gold-light">buena mano</em>?
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/60 text-pretty">
                Operación, seguridad, mantenimiento, fotografía o construcción. Cuéntenos
                qué necesita y le respondemos con una propuesta concreta.
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href={`mailto:${CONTACTO.email}`}
                  className="inline-flex items-center justify-center rounded-full bg-champagne px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-white"
                >
                  Escribir un correo
                </a>
                <a
                  href={CONTACTO.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 px-7 py-3.5 text-sm font-medium text-white/85 transition-colors hover:border-white/40 hover:text-white"
                >
                  Escribir por WhatsApp
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
            <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
              <div className="lg:pr-8">
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
                  Grupo de capital costarricense dedicado a operar y administrar parques de
                  aventura en Costa Rica.
                </p>
              </div>

              <div>
                <h3 className="eyebrow mb-5 text-white/40">Parques</h3>
                <ul className="space-y-3 text-white/60">
                  <li>
                    <a
                      href="https://www.skylinecanopytour.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-champagne"
                    >
                      Skyline Canopy Tour
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.arenalecoglide.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-champagne"
                    >
                      Ecoglide Arenal Park
                    </a>
                  </li>
                  <li className="text-white/30">Poás Adventure Park (2026)</li>
                </ul>
              </div>

              <div>
                <h3 className="eyebrow mb-5 text-white/40">Agencias</h3>
                <ul className="space-y-3 text-white/60">
                  {AGENCIAS.map((a) => (
                    <li key={a.nombre}>{a.nombre}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="eyebrow mb-5 text-white/40">Servicios</h3>
                <ul className="space-y-3 text-white/60">
                  <li>Can&apos;t Wait Travel</li>
                  <li>MaxDigital y Ruby</li>
                  <li>Adventures Designer</li>
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
            </div>

            <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/8 pt-8 text-sm text-white/35 sm:flex-row">
              <p>&copy; {new Date().getFullYear()} Grupo Oroz. Todos los derechos reservados.</p>
              <p>San José, Costa Rica</p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
