'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// URLs de Supabase
const SUPABASE_IMAGES = {
  background: "https://jrphapxnjpcepsecfsoe.supabase.co/storage/v1/object/sign/fotos/_BBB3750.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jNDJiMjQ5Yy00YjhhLTQ5ZDAtOTJmMC1iNjlkMmI2MjFhODUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmb3Rvcy9fQkJCMzc1MC53ZWJwIiwiaWF0IjoxNzY0ODY5MDMxLCJleHAiOjE3OTY0MDUwMzF9.0FEkoFt-EQMTou1bOrtPZdukelI4D21oGgEephrGw_g",
  mainLogo: "https://jrphapxnjpcepsecfsoe.supabase.co/storage/v1/object/sign/fotos/grupo-oroz-logo.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jNDJiMjQ5Yy00YjhhLTQ5ZDAtOTJmMC1iNjlkMmI2MjFhODUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmb3Rvcy9ncnVwby1vcm96LWxvZ28uanBnIiwiaWF0IjoxNzY0OTU2NTU3LCJleHAiOjE3OTY0OTI1NTd9.2dcI2ZZTFqcNCQdAQRoyFdPv47K9w50vTHc8eSnZwLg",
  ecoglide: "https://jrphapxnjpcepsecfsoe.supabase.co/storage/v1/object/sign/fotos/logo-ecoglide-arenal-park.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jNDJiMjQ5Yy00YjhhLTQ5ZDAtOTJmMC1iNjlkMmI2MjFhODUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmb3Rvcy9sb2dvLWVjb2dsaWRlLWFyZW5hbC1wYXJrLndlYnAiLCJpYXQiOjE3NjQ4NjkwNDksImV4cCI6MTc5NjQwNTA0OX0.JbTaJxokTytMoYCxzzhR0VN9BNiMTCgRPMVBRRBuMwY",
  poas: "https://jrphapxnjpcepsecfsoe.supabase.co/storage/v1/object/sign/fotos/poas-adventure-park.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jNDJiMjQ5Yy00YjhhLTQ5ZDAtOTJmMC1iNjlkMmI2MjFhODUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmb3Rvcy9wb2FzLWFkdmVudHVyZS1wYXJrLndlYnAiLCJpYXQiOjE3NjQ5NTU4MzYsImV4cCI6MTc5NjQ5MTgzNn0.tfroBG9kBFLb6R7224gqDhd5xVhOo3Y4jdsF4OPM6M0",
  skyline: "https://jrphapxnjpcepsecfsoe.supabase.co/storage/v1/object/sign/fotos/logo-skyline-adventure-park.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jNDJiMjQ5Yy00YjhhLTQ5ZDAtOTJmMC1iNjlkMmI2MjFhODUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmb3Rvcy9sb2dvLXNreWxpbmUtYWR2ZW50dXJlLXBhcmsud2VicCIsImlhdCI6MTc2NDg2OTEwMCwiZXhwIjoxNzk2NDA1MTAwfQ.bkcOng4Ys_mC3HpAK4594-7mMuu4y5ENYc2xsLytgtU",
  orostudios: "https://jrphapxnjpcepsecfsoe.supabase.co/storage/v1/object/sign/fotos/Orostudios%20CR%20Logo.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jNDJiMjQ5Yy00YjhhLTQ5ZDAtOTJmMC1iNjlkMmI2MjFhODUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmb3Rvcy9Pcm9zdHVkaW9zIENSIExvZ28ud2VicCIsImlhdCI6MTc2NDg2OTExMywiZXhwIjoxNzk2NDA1MTEzfQ.30JfBaXmaeZ0HCECt4Nq-b6AEgNF_0dEqVaIXoDWvBc",
  // Fotos de oficinas
  oficinaEcoglide: "https://jrphapxnjpcepsecfsoe.supabase.co/storage/v1/object/sign/fotos/ecoglide-oficina.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jNDJiMjQ5Yy00YjhhLTQ5ZDAtOTJmMC1iNjlkMmI2MjFhODUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmb3Rvcy9lY29nbGlkZS1vZmljaW5hLnBuZyIsImlhdCI6MTc2NDg3MjIyNywiZXhwIjoxNzk2NDA4MjI3fQ.KIfP-37WDz31tsRryPXcOPJt2jBE1j91-HRTxzPalyw",
  oficinaSkyline: "https://jrphapxnjpcepsecfsoe.supabase.co/storage/v1/object/sign/fotos/skyline-oficina.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jNDJiMjQ5Yy00YjhhLTQ5ZDAtOTJmMC1iNjlkMmI2MjFhODUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmb3Rvcy9za3lsaW5lLW9maWNpbmEud2VicCIsImlhdCI6MTc2NDg3MjI0MCwiZXhwIjoxNzk2NDA4MjQwfQ.ttqWKE6sjS3og01L4hPl9kZTpdfA03fizFmn-sM6P3c",
  oficinaAMA: "https://jrphapxnjpcepsecfsoe.supabase.co/storage/v1/object/sign/fotos/ama-oficina.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jNDJiMjQ5Yy00YjhhLTQ5ZDAtOTJmMC1iNjlkMmI2MjFhODUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmb3Rvcy9hbWEtb2ZpY2luYS53ZWJwIiwiaWF0IjoxNzY0ODcyMjE4LCJleHAiOjE3OTY0MDgyMTh9.bquypJ16I5U-XRfh6njGbzT2Sxy4pZtZ3ZX2cj-QOBI",
};

// Componente de cámara decorativa sutil
const CameraIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 15.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Z"/>
    <path d="M9 2 7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9Zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5Z"/>
  </svg>
);

// Componente de tirolesa/persona en canopy decorativa
const ZiplineIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 60" fill="currentColor">
    {/* Cable de tirolesa */}
    <line x1="0" y1="10" x2="100" y2="40" stroke="currentColor" strokeWidth="2" fill="none"/>
    {/* Persona en tirolesa */}
    <circle cx="45" cy="22" r="5"/> {/* Cabeza */}
    <path d="M45 27 L45 40 M45 32 L38 38 M45 32 L52 38 M45 40 L40 52 M45 40 L50 52"/> {/* Cuerpo */}
    {/* Polea */}
    <circle cx="45" cy="18" r="3" fill="none" stroke="currentColor" strokeWidth="1.5"/>
    <line x1="45" y1="21" x2="45" y2="27" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const parquesAdministrados = [
    {
      nombre: "Skyline Canopy Tour",
      descripcion: "Experimenta la emoción de volar entre las copas de los árboles en Santa Cruz, Guanacaste. Con más de 20 años de experiencia, ofrecemos el canopy tour más emocionante y seguro de la región.",
      ubicacion: "Santa Cruz, Guanacaste",
      logo: SUPABASE_IMAGES.skyline,
      url: "https://www.skylinecanopytour.com",
      categoria: "Parque de Aventura"
    },
    {
      nombre: "Ecoglide Arenal Park",
      descripcion: "Descubre la majestuosidad del Volcán Arenal con nuestras aventuras ecológicas. Tours de canopy, puentes colgantes y experiencias que te conectan con la naturaleza en su máxima expresión.",
      ubicacion: "La Fortuna, San Carlos",
      logo: SUPABASE_IMAGES.ecoglide,
      url: "https://www.arenalecoglide.com",
      categoria: "Parque de Aventura"
    },
    {
      nombre: "Poás Adventure Park",
      descripcion: "¡Próximamente en 2026! Vive la aventura cerca del imponente Volcán Poás. Actividades emocionantes en un entorno natural único, perfecto para familias y amantes de la adrenalina.",
      ubicacion: "Poás, Alajuela",
      logo: SUPABASE_IMAGES.poas,
      url: "#",
      categoria: "En Desarrollo",
      proximamente: true
    }
  ];

  const oficinasOrostudios = [
    {
      nombre: "Ecoglide Arenal Park",
      ubicacion: "La Fortuna, San Carlos",
      foto: SUPABASE_IMAGES.oficinaEcoglide,
      activa: true
    },
    {
      nombre: "Skyline Canopy Tour",
      ubicacion: "Santa Cruz, Guanacaste",
      foto: SUPABASE_IMAGES.oficinaSkyline,
      activa: true
    },
    {
      nombre: "Arenal Mundo Aventura",
      ubicacion: "La Fortuna, San Carlos",
      foto: SUPABASE_IMAGES.oficinaAMA,
      activa: true
    },
    {
      nombre: "Poás Adventure Park",
      ubicacion: "Poás, Alajuela",
      foto: null,
      activa: false,
      proximamente: true
    }
  ];

  return (
    <main className="min-h-screen overflow-hidden relative">
      {/* Fixed background image with strong overlay */}
      <div className="fixed inset-0 z-0">
        <Image
          src={SUPABASE_IMAGES.background}
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        {/* Strong dark overlay */}
        <div className="absolute inset-0 bg-black/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70" />
      </div>

      {/* Subtle gold glow elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-[1]">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#C9A227]/5 rounded-full blur-3xl" />
        <div className="absolute top-3/4 -right-32 w-80 h-80 bg-[#E6BE4D]/5 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className={`fixed w-full top-0 z-50 transition-all duration-500 ${scrolled ? 'bg-slate-950/80 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'}`}>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0">
              {/* Logo con contorno blanco */}
              <div className="relative h-14 w-32 bg-white rounded-lg p-1 shadow-lg">
                <Image
                  src={SUPABASE_IMAGES.mainLogo}
                  alt="Grupo Oroz CR"
                  fill
                  className="object-contain p-1"
                />
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-1">
              {['Inicio', 'Parques', 'OrostudiosCR', 'Nosotros', 'Contacto'].map((item, i) => (
                <a
                  key={i}
                  href={`#${item.toLowerCase().replace('orostudioscr', 'orostudios').replace('nosotros', 'sobre')}`}
                  className="px-4 py-2 text-white/80 hover:text-[#E6BE4D] hover:bg-white/10 rounded-full transition-all duration-300 text-sm font-semibold tracking-wide"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="inicio" className="relative z-10 min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="relative z-10 text-center max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#C9A227]/20 text-[#E6BE4D] border border-[#C9A227]/30 rounded-full mb-8">
            <span className="w-2 h-2 bg-[#E6BE4D] rounded-full animate-pulse" />
            <span className="text-[#E6BE4D] text-sm font-semibold tracking-widest uppercase">Costa Rica</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-tight tracking-tight">
            Grupo{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A227] via-[#E6BE4D] to-[#FFD966]">
              Oroz
            </span>{' '}
            CR
          </h1>
          
          <p className="text-xl md:text-2xl text-white/70 mb-4 font-light max-w-3xl mx-auto tracking-wide">
            Expertos en administración de parques de aventura y contenido fotográfico profesional
          </p>
          
          <p className="text-lg text-[#E6BE4D]/80 mb-12 font-medium tracking-wider">
            +20 años creando experiencias inolvidables
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#parques"
              className="bg-gradient-to-r from-[#996515] via-[#C9A227] to-[#E6BE4D] hover:shadow-lg hover:shadow-[#C9A227]/40 group inline-flex items-center justify-center gap-2 px-8 py-4 text-slate-950 font-bold rounded-2xl tracking-wide transition-all duration-300 hover:scale-105"
            >
              Nuestros Parques
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="#orostudios"
              className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-2xl border border-[#C9A227]/30 hover:bg-[#C9A227]/10 hover:border-[#C9A227]/50 transition-all duration-300 tracking-wide hover:scale-105"
            >
              OrostudiosCR
            </a>
          </div>
        </div>

        {/* Scroll indicator - positioned at very bottom of viewport */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
          <div className="border-[#C9A227]/40 w-6 h-10 border-2 rounded-full flex justify-center">
            <div className="bg-[#C9A227] w-1.5 h-3 rounded-full mt-2 animate-bounce" />
          </div>
        </div>
      </section>

      {/* Nuestras Ramas */}
      <section className="relative z-10 py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="bg-[#C9A227]/20 text-[#E6BE4D] border border-[#C9A227]/30 inline-block px-4 py-1.5 rounded-full text-sm font-semibold tracking-widest uppercase mb-4">
              Lo que hacemos
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
              Dos Ramas, Una Visión
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto tracking-wide">
              Operamos en dos sectores complementarios que crean experiencias completas
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Card Parques */}
            <div className="group relative p-8 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 hover:border-[#C9A227]/50 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-[#C9A227]/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="bg-gradient-to-br from-[#996515] via-[#C9A227] to-[#E6BE4D] w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ">
                  <svg className="w-8 h-8 text-slate-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">Parques de Aventura</h3>
                <p className="text-white/60 leading-relaxed">
                  Administración experta de parques con canopy tours, puentes colgantes y experiencias ecológicas en las mejores ubicaciones de Costa Rica.
                </p>
              </div>
            </div>

            {/* Card Fotografía */}
            <div className="group relative p-8 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 hover:border-[#C9A227]/50 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-[#E6BE4D]/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="bg-gradient-to-br from-[#996515] via-[#C9A227] to-[#E6BE4D] w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ">
                  <svg className="w-8 h-8 text-slate-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">Contenido Fotográfico</h3>
                <p className="text-white/60 leading-relaxed">
                  OrostudiosCR captura momentos inolvidables, generando contenido profesional para visitantes y socios comerciales.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Parques Administrados */}
      <section id="parques" className="relative z-10 py-32 px-4 overflow-hidden">
        {/* Decorative zipline silhouettes */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <ZiplineIcon className="absolute top-20 -left-10 w-40 h-24 text-[#C9A227]/[0.03] rotate-12" />
          <ZiplineIcon className="absolute top-40 right-10 w-32 h-20 text-[#E6BE4D]/[0.03] -rotate-6" />
          <ZiplineIcon className="absolute bottom-32 left-1/4 w-36 h-22 text-[#C9A227]/[0.03] rotate-3" />
          <ZiplineIcon className="absolute bottom-20 right-1/3 w-28 h-18 text-[#E6BE4D]/[0.03] -rotate-12" />
        </div>

        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-16">
            <span className="bg-[#C9A227]/20 text-[#E6BE4D] border border-[#C9A227]/30 inline-block px-4 py-1.5 rounded-full text-sm font-semibold tracking-widest uppercase mb-4">
              Administración
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
              Parques Administrados
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto tracking-wide">
              Operamos directamente estos parques de aventura en Costa Rica
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {parquesAdministrados.map((parque, index) => (
              <div
                key={index}
                className="group relative bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden hover:border-[#C9A227]/50 hover:-translate-y-2 transition-all duration-500"
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#C9A227]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Logo area con fondo blanco */}
                <div className="relative h-44 bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center p-6">
                  {parque.proximamente && (
                    <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-[#996515] via-[#C9A227] to-[#E6BE4D] text-slate-950 text-xs font-bold rounded-full z-10">
                      2026
                    </div>
                  )}
                  {/* Contenedor blanco para el logo */}
                  <div className="relative h-28 w-40 bg-white rounded-xl p-3 shadow-lg">
                    <Image
                      src={parque.logo}
                      alt={`Logo ${parque.nombre}`}
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="relative p-6">
                  <span className="bg-[#C9A227]/20 text-[#E6BE4D] border border-[#C9A227]/30 inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full mb-3">
                    {parque.categoria}
                  </span>
                  <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
                    {parque.nombre}
                  </h3>
                  <p className="text-white/50 text-sm mb-4 leading-relaxed line-clamp-3">
                    {parque.descripcion}
                  </p>
                  <div className="flex items-center text-sm text-white/40 mb-4">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    {parque.ubicacion}
                  </div>
                  {!parque.proximamente ? (
                    <Link
                      href={parque.url}
                      target="_blank"
                      className="text-[#E6BE4D] hover:text-[#FFD966] inline-flex items-center font-semibold group/link tracking-wide"
                    >
                      Visitar sitio web
                      <svg className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  ) : (
                    <span className="inline-flex items-center text-white/40 font-medium">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      En desarrollo
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OrostudiosCR Section */}
      <section id="orostudios" className="relative z-10 py-32 px-4 overflow-hidden">
        {/* Background accent */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#C9A227]/5 to-transparent" />
        
        {/* Decorative camera silhouettes */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <CameraIcon className="absolute top-16 left-10 w-20 h-20 text-[#C9A227]/[0.04] rotate-12" />
          <CameraIcon className="absolute top-32 right-20 w-16 h-16 text-[#E6BE4D]/[0.03] -rotate-6" />
          <CameraIcon className="absolute bottom-40 left-1/4 w-24 h-24 text-[#C9A227]/[0.03] rotate-6" />
          <CameraIcon className="absolute bottom-24 right-10 w-18 h-18 text-[#E6BE4D]/[0.04] -rotate-12" />
          <CameraIcon className="absolute top-1/2 left-5 w-14 h-14 text-[#C9A227]/[0.03] rotate-3" />
          <CameraIcon className="absolute top-2/3 right-1/4 w-20 h-20 text-[#E6BE4D]/[0.03] -rotate-3" />
        </div>
        
        <div className="relative max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            {/* Content */}
            <div>
              <span className="bg-[#C9A227]/20 text-[#E6BE4D] border border-[#C9A227]/30 inline-block px-4 py-1.5 rounded-full text-sm font-semibold tracking-widest uppercase mb-4">
                Contenido Fotográfico
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
                OrostudiosCR
              </h2>
              <p className="text-lg text-white/60 mb-8 leading-relaxed">
                Con más de 20 años de experiencia, somos la rama especializada en fotografía y video para parques de aventura. Hemos trabajado con más de 18 parques en Costa Rica.
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { value: '+3500', label: 'Nuevos Leads' },
                  { value: '+50%', label: 'Ganancia Anual' },
                  { value: '+1600', label: 'Seguidores' }
                ].map((stat, i) => (
                  <div key={i} className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                    <div className="text-[#E6BE4D] text-2xl md:text-3xl font-black tracking-tight">
                      {stat.value}
                    </div>
                    <div className="text-xs text-white/50 uppercase tracking-widest mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {[
                  'Oficinas permanentes en principales parques',
                  'Personal capacitado con equipos propios',
                  'Contenido para redes sociales incluido',
                  'Entrega en máximo 24 horas'
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-white/70">
                    <div className="bg-gradient-to-r from-[#996515] to-[#E6BE4D] w-5 h-5 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <svg className="w-3 h-3 text-slate-950" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                href="https://www.orostudioscr.com"
                target="_blank"
                className="bg-gradient-to-r from-[#996515] via-[#C9A227] to-[#E6BE4D] hover:shadow-lg hover:shadow-[#C9A227]/40 inline-flex items-center gap-2 px-6 py-3 text-slate-950 font-bold rounded-xl tracking-wide transition-all duration-300 hover:scale-105"
              >
                Conocer más
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            {/* Logo con fondo blanco */}
            <div className="relative">
              <div className="relative h-80 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 flex items-center justify-center p-8 overflow-hidden hover:border-[#C9A227]/50 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-[#C9A227]/10 via-transparent to-[#E6BE4D]/10" />
                {/* Contenedor blanco para el logo */}
                <div className="relative h-48 w-64 bg-white rounded-2xl p-4 shadow-lg">
                  <Image
                    src={SUPABASE_IMAGES.orostudios}
                    alt="OrostudiosCR Logo"
                    fill
                    className="object-contain p-3"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Oficinas Activas */}
          <div>
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-black text-white mb-3 tracking-tight">
                Oficinas Activas
              </h3>
              <p className="text-white/50 tracking-wide">
                Presencia permanente en parques de aventura de Costa Rica
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {oficinasOrostudios.map((oficina, index) => (
                <div
                  key={index}
                  className={`group relative bg-white/5 backdrop-blur-xl rounded-3xl overflow-hidden border-2 transition-all duration-500 ${
                    oficina.activa 
                      ? 'border-[#C9A227]/50 hover:border-[#E6BE4D] hover:-translate-y-2 hover:shadow-lg hover:shadow-[#C9A227]/20' 
                      : 'border-white/10 opacity-70'
                  }`}
                >
                  {/* Foto */}
                  <div className="relative h-48 bg-gradient-to-br from-white/10 to-white/5 overflow-hidden">
                    {oficina.foto ? (
                      <>
                        <Image
                          src={oficina.foto}
                          alt={`Oficina ${oficina.nombre}`}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
                      </>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <svg className="w-12 h-12 text-white/20 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          <span className="text-[#E6BE4D] text-sm font-semibold">Próximamente</span>
                        </div>
                      </div>
                    )}
                    {oficina.proximamente && (
                      <div className="absolute top-3 right-3 px-3 py-1.5 bg-gradient-to-r from-[#996515] via-[#C9A227] to-[#E6BE4D] text-slate-950 text-xs font-bold rounded-full">
                        2026
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-5">
                    <h4 className="text-white font-bold text-base mb-2 tracking-tight">{oficina.nombre}</h4>
                    <div className="flex items-center text-sm text-white/50">
                      <svg className="w-4 h-4 mr-2 text-[#E6BE4D]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      {oficina.ubicacion}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sobre Nosotros */}
      <section id="sobre" className="relative z-10 py-32 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="bg-[#C9A227]/20 text-[#E6BE4D] border border-[#C9A227]/30 inline-block px-4 py-1.5 rounded-full text-sm font-semibold tracking-widest uppercase mb-4">
              Nuestra Historia
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
              Sobre Grupo Oroz CR
            </h2>
          </div>
          
          <div className="relative p-8 md:p-12 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 hover:border-[#C9A227]/50 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-[#C9A227]/5 to-[#E6BE4D]/5 rounded-3xl" />
            <div className="relative space-y-6 text-lg text-white/70 leading-relaxed">
              <p>
                Somos un grupo empresarial costarricense con <span className="text-white font-bold">más de 20 años de experiencia</span>, especializado en la administración de parques de aventura y contenido fotográfico profesional para el sector turístico.
              </p>
              <p>
                Nuestro portafolio incluye operaciones en ubicaciones estratégicas como <span className="text-[#E6BE4D] font-semibold">La Fortuna</span> y <span className="text-[#E6BE4D] font-semibold">Santa Cruz</span>, donde miles de visitantes experimentan la emoción del canopy tour. Para 2026, inauguraremos nuestro tercer parque cerca del Volcán Poás.
              </p>
              <p>
                A través de <span className="text-white font-bold">OrostudiosCR</span>, hemos revolucionado la fotografía turística en Costa Rica con un modelo único que beneficia tanto a los parques como a sus visitantes.
              </p>
              <p>
                Nuestro compromiso: crear <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A227] to-[#E6BE4D] font-bold">valor sostenible</span> para nuestras comunidades, preservar el medio ambiente y superar las expectativas de cada cliente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contacto" className="relative z-10 border-t border-white/10 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-xl font-black text-white mb-4 tracking-tight">
                Grupo <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A227] to-[#E6BE4D]">Oroz</span> CR
              </h3>
              <p className="text-white/50 text-sm">
                Quesada, Alajuela<br />
                Costa Rica
              </p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-4">Contacto</h3>
              <p className="text-white/50 text-sm mb-2">
                gabrielorozco@grupooroz.com
              </p>
              <p className="text-white/50 text-sm">
                +506 6098 2244
              </p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-4">Empresas</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="https://www.skylinecanopytour.com" target="_blank" className="text-[#E6BE4D] hover:text-[#FFD966] font-medium transition-colors">
                    Skyline Canopy Tour
                  </a>
                </li>
                <li>
                  <a href="https://www.arenalecoglide.com" target="_blank" className="text-[#E6BE4D] hover:text-[#FFD966] font-medium transition-colors">
                    Ecoglide Arenal Park
                  </a>
                </li>
                <li>
                  <span className="text-white/30">Poás Adventure Park (2026)</span>
                </li>
                <li>
                  <a href="https://www.orostudioscr.com" target="_blank" className="text-[#E6BE4D] hover:text-[#FFD966] font-medium transition-colors">
                    OrostudiosCR
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-4">Ubicaciones</h3>
              <ul className="space-y-2 text-white/50 text-sm">
                <li>La Fortuna, San Carlos</li>
                <li>Santa Cruz, Guanacaste</li>
                <li>Poás, Alajuela (2026)</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-white/40 text-sm">
            <p>&copy; 2024 Grupo Oroz CR. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}