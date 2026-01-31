'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// URLs de Supabase
const SUPABASE_IMAGES = {
  background: "https://jrphapxnjpcepsecfsoe.supabase.co/storage/v1/object/sign/fotos/_BBB3750.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jNDJiMjQ5Yy00YjhhLTQ5ZDAtOTJmMC1iNjlkMmI2MjFhODUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmb3Rvcy9fQkJCMzc1MC53ZWJwIiwiaWF0IjoxNzY0ODY5MDMxLCJleHAiOjE3OTY0MDUwMzF9.0FEkoFt-EQMTou1bOrtPZdukelI4D21oGgEephrGw_g",
  // Logo principal del Grupo (transparente - se usa sin fondo blanco)
  mainLogo: "https://mmlbslwljvmscbgsqkkq.supabase.co/storage/v1/object/sign/logos-oroz/GRUPO%20OROZO%20LOGO.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9iZmNkZjM3My00NzkzLTRhYjQtYmRhOC04OWY1ZmNiMjdhMzciLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJsb2dvcy1vcm96L0dSVVBPIE9ST1pPIExPR08uanBlZyIsImlhdCI6MTc2OTg3ODY4MywiZXhwIjoyNDAwNTk4NjgzfQ.8tFKBh9D8ekC9IKQmEYhljEZn8_GhJLXRQIKWZpG3WQ",
  // Parques de aventura
  ecoglide: "https://jrphapxnjpcepsecfsoe.supabase.co/storage/v1/object/sign/fotos/logo-ecoglide-arenal-park.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jNDJiMjQ5Yy00YjhhLTQ5ZDAtOTJmMC1iNjlkMmI2MjFhODUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmb3Rvcy9sb2dvLWVjb2dsaWRlLWFyZW5hbC1wYXJrLndlYnAiLCJpYXQiOjE3NjQ4NjkwNDksImV4cCI6MTc5NjQwNTA0OX0.JbTaJxokTytMoYCxzzhR0VN9BNiMTCgRPMVBRRBuMwY",
  poas: "https://jrphapxnjpcepsecfsoe.supabase.co/storage/v1/object/sign/fotos/poas-adventure-park.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jNDJiMjQ5Yy00YjhhLTQ5ZDAtOTJmMC1iNjlkMmI2MjFhODUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmb3Rvcy9wb2FzLWFkdmVudHVyZS1wYXJrLndlYnAiLCJpYXQiOjE3NjQ5NTU4MzYsImV4cCI6MTc5NjQ5MTgzNn0.tfroBG9kBFLb6R7224gqDhd5xVhOo3Y4jdsF4OPM6M0",
  skyline: "https://mmlbslwljvmscbgsqkkq.supabase.co/storage/v1/object/sign/logos-oroz/skyline-logo.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9iZmNkZjM3My00NzkzLTRhYjQtYmRhOC04OWY1ZmNiMjdhMzciLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJsb2dvcy1vcm96L3NreWxpbmUtbG9nby5qcGVnIiwiaWF0IjoxNzY5ODc4OTM3LCJleHAiOjI0MDA1OTg5Mzd9.zM1xj5pVR_-QJEUwy3jRGkCzDg77aL3hcICSTGItSmU",
  orostudios: "https://jrphapxnjpcepsecfsoe.supabase.co/storage/v1/object/sign/fotos/Orostudios%20CR%20Logo.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jNDJiMjQ5Yy00YjhhLTQ5ZDAtOTJmMC1iNjlkMmI2MjFhODUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmb3Rvcy9Pcm9zdHVkaW9zIENSIExvZ28ud2VicCIsImlhdCI6MTc2NDg2OTExMywiZXhwIjoxNzk2NDA1MTEzfQ.30JfBaXmaeZ0HCECt4Nq-b6AEgNF_0dEqVaIXoDWvBc",
  // Agencias de viajes
  crDoing: "https://mmlbslwljvmscbgsqkkq.supabase.co/storage/v1/object/sign/logos-oroz/CR%20DOING.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9iZmNkZjM3My00NzkzLTRhYjQtYmRhOC04OWY1ZmNiMjdhMzciLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJsb2dvcy1vcm96L0NSIERPSU5HLnBuZyIsImlhdCI6MTc2OTg3ODczNSwiZXhwIjoyNDAwNTk4NzM1fQ.LBtlZM3DjLOMMwhOv74hqYMnXDtEAWZ0zTZy2ZmYdgY",
  crParadise: "https://mmlbslwljvmscbgsqkkq.supabase.co/storage/v1/object/sign/logos-oroz/crparadise.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9iZmNkZjM3My00NzkzLTRhYjQtYmRhOC04OWY1ZmNiMjdhMzciLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJsb2dvcy1vcm96L2NycGFyYWRpc2UucG5nIiwiaWF0IjoxNzY5ODc4NzU3LCJleHAiOjI0MDA1OTg3NTd9.SCb7nhvqLxL5W5AF3QsVcScWPPn4VYYmzWu-oMTMlos",
  gttTours: "https://mmlbslwljvmscbgsqkkq.supabase.co/storage/v1/object/sign/logos-oroz/gtt-logo.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9iZmNkZjM3My00NzkzLTRhYjQtYmRhOC04OWY1ZmNiMjdhMzciLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJsb2dvcy1vcm96L2d0dC1sb2dvLmpwZWciLCJpYXQiOjE3Njk4Nzg4MDcsImV4cCI6MjQwMDU5ODgwN30.SyTuEXOtJ1UWdj2YIn6RpWVTXs1Sw8F-nXuTpVVEw5Y",
  // Transporte
  cantWaitTravel: "https://mmlbslwljvmscbgsqkkq.supabase.co/storage/v1/object/sign/logos-oroz/Logo%20CWT%20Costa%20Rica-FINAL-01.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9iZmNkZjM3My00NzkzLTRhYjQtYmRhOC04OWY1ZmNiMjdhMzciLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJsb2dvcy1vcm96L0xvZ28gQ1dUIENvc3RhIFJpY2EtRklOQUwtMDEucG5nIiwiaWF0IjoxNzY5ODc4ODIyLCJleHAiOjI0MDA1OTg4MjJ9.jJtdDXJ-YOCiBnzd1bnRgJqGsJd4F2SEldsjl5ukt7k",
  // Tecnología
  maxDigital: "https://mmlbslwljvmscbgsqkkq.supabase.co/storage/v1/object/sign/logos-oroz/logo-max-transparente.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9iZmNkZjM3My00NzkzLTRhYjQtYmRhOC04OWY1ZmNiMjdhMzciLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJsb2dvcy1vcm96L2xvZ28tbWF4LXRyYW5zcGFyZW50ZS5wbmciLCJpYXQiOjE3Njk4Nzg4MzQsImV4cCI6MjQwMDU5ODgzNH0.tS1Ndtr8JFpp7aQb33TrvyPtazyviBIEH_sM6VIT3_8",
  ruby: "https://mmlbslwljvmscbgsqkkq.supabase.co/storage/v1/object/sign/PRUEBAS/ruby-logo-Photoroom.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9iZmNkZjM3My00NzkzLTRhYjQtYmRhOC04OWY1ZmNiMjdhMzciLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJQUlVFQkFTL3J1YnktbG9nby1QaG90b3Jvb20ucG5nIiwiaWF0IjoxNzY5ODgzMTk0LCJleHAiOjI0MDA2MDMxOTR9.DfWIJT0wMtNecq7jvuRPvnwzZ2hBneAUHyRr8OnKhM0",
  // Construcción de parques
  adventuresDesigner: "https://mmlbslwljvmscbgsqkkq.supabase.co/storage/v1/object/sign/PRUEBAS/WhatsApp%20Image%202026-01-17%20at%2010.14.43%20AM.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9iZmNkZjM3My00NzkzLTRhYjQtYmRhOC04OWY1ZmNiMjdhMzciLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJQUlVFQkFTL1doYXRzQXBwIEltYWdlIDIwMjYtMDEtMTcgYXQgMTAuMTQuNDMgQU0ucG5nIiwiaWF0IjoxNzY5ODc5MDI4LCJleHAiOjI0MDA1OTkwMjh9.wR32bSgfOXbfsKy754LjFO3K7H7cAyyNb5ElTNhVAu8",
  // Fotos de oficinas
  oficinaEcoglide: "https://jrphapxnjpcepsecfsoe.supabase.co/storage/v1/object/sign/fotos/ecoglide-oficina.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jNDJiMjQ5Yy00YjhhLTQ5ZDAtOTJmMC1iNjlkMmI2MjFhODUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmb3Rvcy9lY29nbGlkZS1vZmljaW5hLnBuZyIsImlhdCI6MTc2NDg3MjIyNywiZXhwIjoxNzk2NDA4MjI3fQ.KIfP-37WDz31tsRryPXcOPJt2jBE1j91-HRTxzPalyw",
  oficinaSkyline: "https://jrphapxnjpcepsecfsoe.supabase.co/storage/v1/object/sign/fotos/skyline-oficina.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jNDJiMjQ5Yy00YjhhLTQ5ZDAtOTJmMC1iNjlkMmI2MjFhODUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmb3Rvcy9za3lsaW5lLW9maWNpbmEud2VicCIsImlhdCI6MTc2NDg3MjI0MCwiZXhwIjoxNzk2NDA4MjQwfQ.ttqWKE6sjS3og01L4hPl9kZTpdfA03fizFmn-sM6P3c",
  oficinaAMA: "https://jrphapxnjpcepsecfsoe.supabase.co/storage/v1/object/sign/fotos/ama-oficina.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jNDJiMjQ5Yy00YjhhLTQ5ZDAtOTJmMC1iNjlkMmI2MjFhODUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmb3Rvcy9hbWEtb2ZpY2luYS53ZWJwIiwiaWF0IjoxNzY0ODcyMjE4LCJleHAiOjE3OTY0MDgyMTh9.bquypJ16I5U-XRfh6njGbzT2Sxy4pZtZ3ZX2cj-QOBI",
};

// Cámara decorativa
const CameraDecor = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 15.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Z"/>
    <path d="M9 2 7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9Zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5Z"/>
  </svg>
);

// Tirolesa decorativa
const ZiplineDecor = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 140 60" fill="currentColor">
    <line x1="0" y1="12" x2="140" y2="45" stroke="currentColor" strokeWidth="2.5" fill="none"/>
    <circle cx="65" cy="24" r="5" fill="currentColor"/>
    <ellipse cx="65" cy="38" rx="4" ry="4"/>
    <ellipse cx="78" cy="40" rx="12" ry="5"/>
    <line x1="68" y1="36" x2="65" y2="28" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
    <line x1="72" y1="35" x2="68" y2="28" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
    <line x1="88" y1="42" x2="100" y2="48" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
    <line x1="88" y1="38" x2="100" y2="42" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
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

  // Parques Administrados
  const parquesAdministrados = [
    {
      nombre: "Skyline Canopy Tour",
      descripcion: "El canopy tour más emocionante de Guanacaste. Con cables que atraviesan el bosque tropical seco, ofrecemos una experiencia única con los más altos estándares de seguridad internacional.",
      ubicacion: "Santa Cruz, Guanacaste",
      logo: SUPABASE_IMAGES.skyline,
      url: "https://www.skylinecanopytour.com"
    },
    {
      nombre: "Ecoglide Arenal Park",
      descripcion: "Aventura ecológica con vistas al majestuoso Volcán Arenal. Canopy tours, puentes colgantes y experiencias que conectan con la naturaleza en su máxima expresión.",
      ubicacion: "La Fortuna, San Carlos",
      logo: SUPABASE_IMAGES.ecoglide,
      url: "https://www.arenalecoglide.com"
    },
    {
      nombre: "Poás Adventure Park",
      descripcion: "Próximamente en 2026. Un nuevo destino de aventura cerca del imponente Volcán Poás con actividades para toda la familia.",
      ubicacion: "Poás, Alajuela",
      logo: SUPABASE_IMAGES.poas,
      url: "#",
      proximamente: true
    }
  ];

  // Agencias de Viajes
  const agenciasViajes = [
    { nombre: "CR Doing", logo: SUPABASE_IMAGES.crDoing, descripcion: "Experiencias turísticas personalizadas" },
    { nombre: "CR Paradise", logo: SUPABASE_IMAGES.crParadise, descripcion: "Tu paraíso costarricense" },
    { nombre: "GTT Tours", logo: SUPABASE_IMAGES.gttTours, descripcion: "Tours guiados de calidad" }
  ];

  // Oficinas OrostudiosCR
  const oficinasOrostudios = [
    { nombre: "Ecoglide Arenal Park", ubicacion: "La Fortuna, San Carlos", foto: SUPABASE_IMAGES.oficinaEcoglide, activa: true },
    { nombre: "Skyline Canopy Tour", ubicacion: "Santa Cruz, Guanacaste", foto: SUPABASE_IMAGES.oficinaSkyline, activa: true },
    { nombre: "Arenal Mundo Aventura", ubicacion: "La Fortuna, San Carlos", foto: SUPABASE_IMAGES.oficinaAMA, activa: true },
    { nombre: "Poás Adventure Park", ubicacion: "Poás, Alajuela", foto: null, activa: false, proximamente: true }
  ];

  return (
    <main className="min-h-screen overflow-hidden relative">
      {/* Fixed background */}
      <div className="fixed inset-0 z-0">
        <Image src={SUPABASE_IMAGES.background} alt="Background" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70" />
      </div>

      {/* Gold glow elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-[1]">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#C9A227]/5 rounded-full blur-3xl" />
        <div className="absolute top-3/4 -right-32 w-80 h-80 bg-[#E6BE4D]/5 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className={`fixed w-full top-0 z-50 transition-all duration-500 ${scrolled ? 'bg-slate-950/80 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'}`}>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0">
              {/* Logo transparente - sin fondo blanco - tamaño grande */}
              <div className="relative h-28 w-64">
                <Image src={SUPABASE_IMAGES.mainLogo} alt="Grupo Oroz CR" fill className="object-contain" />
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-1">
              {['Inicio', 'Parques', 'Agencias', 'Servicios', 'OrostudiosCR', 'Contacto'].map((item, i) => (
                <a
                  key={i}
                  href={`#${item.toLowerCase().replace('orostudioscr', 'orostudios')}`}
                  className="px-4 py-2 text-white/80 hover:text-[#E6BE4D] hover:bg-white/10 rounded-full transition-all duration-300 text-sm font-bold"
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
            <span className="text-[#E6BE4D] text-sm font-bold tracking-wider">Costa Rica</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-tight tracking-tight">
            Grupo{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A227] via-[#E6BE4D] to-[#FFD966]">
              Oroz
            </span>{' '}
            CR
          </h1>

          <p className="text-xl md:text-2xl text-white/70 mb-4 font-medium max-w-3xl mx-auto">
            Administradores expertos de parques de aventura con cobertura total en Costa Rica
          </p>

          <p className="text-lg text-white/60 mb-6 max-w-2xl mx-auto">
            Más de 20 años garantizando la excelente gestión operativa, seguridad certificada y experiencias inolvidables en los principales destinos turísticos del país
          </p>

          <p className="text-lg text-[#E6BE4D]/80 mb-12 font-bold">
            Turismo | Tecnología | Transporte | Construcción
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#parques"
              className="bg-gradient-to-r from-[#996515] via-[#C9A227] to-[#E6BE4D] hover:shadow-lg hover:shadow-[#C9A227]/40 group inline-flex items-center justify-center gap-2 px-8 py-4 text-slate-950 font-bold rounded-2xl transition-all duration-300 hover:scale-105"
            >
              Nuestros Parques
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="#servicios"
              className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-2xl border border-[#C9A227]/40 hover:bg-[#C9A227]/10 hover:border-[#C9A227]/60 transition-all duration-300 hover:scale-105"
            >
              Todos los Servicios
            </a>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SECCIÓN 1: ADMINISTRACIÓN DE PARQUES */}
      {/* ============================================ */}
      <section id="parques" className="relative z-10 py-32 px-4 overflow-hidden">
        {/* Tirolesas decorativas */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <ZiplineDecor className="absolute top-12 left-4 w-56 h-24 text-[#C9A227]/[0.22] rotate-6" />
          <ZiplineDecor className="absolute top-1/3 right-8 w-48 h-20 text-[#E6BE4D]/[0.25] -rotate-3" />
          <ZiplineDecor className="absolute bottom-16 right-1/4 w-44 h-18 text-[#E6BE4D]/[0.22] -rotate-6" />
        </div>

        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-8">
            <span className="bg-[#C9A227]/20 text-[#E6BE4D] border border-[#C9A227]/30 inline-block px-4 py-1.5 rounded-full text-sm font-bold mb-4">
              Nuestra Especialidad
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
              Administración de Parques de Aventura
            </h2>
            <p className="text-lg text-white/60 max-w-3xl mx-auto mb-6">
              Somos líderes en la gestión integral de parques de aventura en Costa Rica. Nuestra experiencia de más de dos décadas nos permite ofrecer una <span className="text-[#E6BE4D] font-bold">cobertura total</span> en operaciones, seguridad, mantenimiento y experiencia al cliente.
            </p>
          </div>

          {/* Características de administración */}
          <div className="grid md:grid-cols-4 gap-4 mb-16">
            {[
              { icon: "shield", title: "Seguridad Certificada", desc: "Protocolos internacionales ACCT" },
              { icon: "users", title: "Personal Capacitado", desc: "Entrenamiento continuo" },
              { icon: "wrench", title: "Mantenimiento 24/7", desc: "Equipos siempre óptimos" },
              { icon: "chart", title: "Gestión Eficiente", desc: "Maximización de resultados" }
            ].map((item, i) => (
              <div key={i} className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                <div className="bg-gradient-to-br from-[#996515] to-[#E6BE4D] w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3">
                  {item.icon === "shield" && <svg className="w-6 h-6 text-slate-950" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>}
                  {item.icon === "users" && <svg className="w-6 h-6 text-slate-950" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>}
                  {item.icon === "wrench" && <svg className="w-6 h-6 text-slate-950" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
                  {item.icon === "chart" && <svg className="w-6 h-6 text-slate-950" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
                </div>
                <h4 className="text-white font-bold mb-1">{item.title}</h4>
                <p className="text-white/50 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Grid de parques */}
          <div className="grid md:grid-cols-3 gap-6">
            {parquesAdministrados.map((parque, index) => (
              <div
                key={index}
                className="group relative bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden hover:border-[#C9A227]/50 hover:-translate-y-2 transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-[#C9A227]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative h-44 bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center p-6">
                  {parque.proximamente && (
                    <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-[#996515] via-[#C9A227] to-[#E6BE4D] text-slate-950 text-xs font-black rounded-full z-10">
                      2026
                    </div>
                  )}
                  <div className="relative h-28 w-40 bg-white rounded-xl p-3 shadow-lg">
                    <Image src={parque.logo} alt={parque.nombre} fill className="object-contain p-2" />
                  </div>
                </div>

                <div className="relative p-6">
                  <h3 className="text-xl font-black text-white mb-2">{parque.nombre}</h3>
                  <p className="text-white/50 text-sm mb-4 leading-relaxed">{parque.descripcion}</p>
                  <div className="flex items-center text-sm text-white/40 mb-4">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    {parque.ubicacion}
                  </div>
                  {!parque.proximamente ? (
                    <Link href={parque.url} target="_blank" className="text-[#E6BE4D] hover:text-[#FFD966] inline-flex items-center font-bold group/link">
                      Visitar sitio web
                      <svg className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  ) : (
                    <span className="inline-flex items-center text-white/40 font-bold">
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

      {/* ============================================ */}
      {/* SECCIÓN 2: AGENCIAS DE VIAJES */}
      {/* ============================================ */}
      <section id="agencias" className="relative z-10 py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="bg-[#C9A227]/20 text-[#E6BE4D] border border-[#C9A227]/30 inline-block px-4 py-1.5 rounded-full text-sm font-bold mb-4">
              Viajes y Turismo
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
              Agencias de Viajes
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Experiencias turísticas únicas diseñadas para descubrir lo mejor de Costa Rica. Desde tours de aventura hasta escapadas paradisíacas.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {agenciasViajes.map((agencia, index) => (
              <div key={index} className="group relative bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden hover:border-[#C9A227]/50 hover:-translate-y-2 transition-all duration-500 p-8">
                <div className="relative h-32 bg-white rounded-xl mb-6 shadow-lg">
                  <Image src={agencia.logo} alt={agencia.nombre} fill className="object-contain p-4" />
                </div>
                <h3 className="text-xl font-black text-white mb-2 text-center">{agencia.nombre}</h3>
                <p className="text-white/50 text-center">{agencia.descripcion}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SECCIÓN 3: SERVICIOS (Transporte, Tecnología, Construcción) */}
      {/* ============================================ */}
      <section id="servicios" className="relative z-10 py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="bg-[#C9A227]/20 text-[#E6BE4D] border border-[#C9A227]/30 inline-block px-4 py-1.5 rounded-full text-sm font-bold mb-4">
              Ecosistema Empresarial
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
              Más Servicios del Grupo
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Un portafolio diversificado que complementa nuestra oferta turística
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* TRANSPORTE */}
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 hover:border-[#C9A227]/50 transition-all duration-500">
              <div className="bg-gradient-to-br from-[#996515] to-[#E6BE4D] w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-slate-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 17h8M8 17a2 2 0 11-4 0 2 2 0 014 0zm8 0a2 2 0 104 0 2 2 0 00-4 0zm-8 0H5a2 2 0 01-2-2V6a2 2 0 012-2h9l5 5v6a2 2 0 01-2 2h-1" />
                </svg>
              </div>
              <h3 className="text-2xl font-black text-white mb-4">Transporte</h3>
              <p className="text-white/60 mb-6">
                Soluciones de transporte turístico confiables y cómodas para trasladar visitantes a los mejores destinos de Costa Rica.
              </p>
              <div className="relative h-24 bg-white rounded-xl shadow-lg">
                <Image src={SUPABASE_IMAGES.cantWaitTravel} alt="Can't Wait Travel" fill className="object-contain p-3" />
              </div>
              <p className="text-[#E6BE4D] font-bold mt-4 text-center">Can&apos;t Wait Travel</p>
            </div>

            {/* TECNOLOGÍA */}
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 hover:border-[#C9A227]/50 transition-all duration-500">
              <div className="bg-gradient-to-br from-[#996515] to-[#E6BE4D] w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-slate-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-2xl font-black text-white mb-4">Tecnología</h3>
              <p className="text-white/60 mb-6">
                Soluciones digitales innovadoras para optimizar operaciones turísticas y mejorar la experiencia del cliente.
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="relative h-20 bg-white rounded-xl shadow-lg">
                  <Image src={SUPABASE_IMAGES.maxDigital} alt="MaxDigital" fill className="object-contain p-3" />
                </div>
                <div className="relative h-20 bg-white rounded-xl shadow-lg">
                  <Image src={SUPABASE_IMAGES.ruby} alt="Ruby Technologies" fill className="object-contain p-3" />
                </div>
              </div>
              <p className="text-[#E6BE4D] font-bold text-center mt-4">MaxDigital & Ruby</p>
            </div>

            {/* CONSTRUCCIÓN */}
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 hover:border-[#C9A227]/50 transition-all duration-500">
              <div className="bg-gradient-to-br from-[#996515] to-[#E6BE4D] w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-slate-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-2xl font-black text-white mb-4">Construcción de Parques</h3>
              <p className="text-white/60 mb-6">
                Diseño, construcción y certificación de canopys y parques de aventura con los más altos estándares de seguridad.
              </p>
              <div className="relative h-24 bg-white rounded-xl shadow-lg">
                <Image src={SUPABASE_IMAGES.adventuresDesigner} alt="Adventures Designer" fill className="object-contain p-3" />
              </div>
              <p className="text-[#E6BE4D] font-bold mt-4 text-center">Adventures Designer</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SECCIÓN 4: OROSTUDIOSCR */}
      {/* ============================================ */}
      <section id="orostudios" className="relative z-10 py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#C9A227]/5 to-transparent" />

        {/* Cámaras decorativas */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <CameraDecor className="absolute top-16 left-8 w-28 h-28 text-[#C9A227]/[0.25] rotate-12" />
          <CameraDecor className="absolute top-32 right-12 w-24 h-24 text-[#E6BE4D]/[0.22] -rotate-6" />
          <CameraDecor className="absolute bottom-24 right-8 w-26 h-26 text-[#E6BE4D]/[0.25] -rotate-12" />
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <span className="bg-[#C9A227]/20 text-[#E6BE4D] border border-[#C9A227]/30 inline-block px-4 py-1.5 rounded-full text-sm font-bold mb-4">
                Contenido Fotográfico
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
                OrostudiosCR
              </h2>
              <p className="text-lg text-white/60 mb-8 leading-relaxed">
                Con más de 20 años de experiencia, somos la rama especializada en fotografía y video para parques de aventura. Hemos trabajado con más de 18 parques en Costa Rica, capturando momentos inolvidables.
              </p>

              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { value: '+3500', label: 'Nuevos Leads' },
                  { value: '+50%', label: 'Ganancia Anual' },
                  { value: '+1600', label: 'Seguidores' }
                ].map((stat, i) => (
                  <div key={i} className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                    <div className="text-[#E6BE4D] text-2xl md:text-3xl font-black">{stat.value}</div>
                    <div className="text-xs text-white/50 uppercase tracking-wide mt-1 font-bold">{stat.label}</div>
                  </div>
                ))}
              </div>

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
                className="bg-gradient-to-r from-[#996515] via-[#C9A227] to-[#E6BE4D] hover:shadow-lg hover:shadow-[#C9A227]/40 inline-flex items-center gap-2 px-6 py-3 text-slate-950 font-bold rounded-xl transition-all duration-300 hover:scale-105"
              >
                Conocer más
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            <div className="relative">
              <div className="relative h-80 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 flex items-center justify-center p-8 overflow-hidden hover:border-[#C9A227]/50 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-[#C9A227]/10 via-transparent to-[#E6BE4D]/10" />
                <div className="relative h-48 w-64 bg-white rounded-2xl p-4 shadow-lg">
                  <Image src={SUPABASE_IMAGES.orostudios} alt="OrostudiosCR Logo" fill className="object-contain p-3" />
                </div>
              </div>
            </div>
          </div>

          {/* Oficinas Activas */}
          <div>
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-black text-white mb-3">Oficinas Activas</h3>
              <p className="text-white/50">Presencia permanente en parques de aventura de Costa Rica</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {oficinasOrostudios.map((oficina, index) => (
                <div
                  key={index}
                  className={`group relative bg-white/5 backdrop-blur-xl rounded-3xl overflow-hidden border-2 transition-all duration-500 ${
                    oficina.activa
                      ? 'border-[#C9A227]/50 hover:border-[#E6BE4D] hover:-translate-y-2'
                      : 'border-white/10 opacity-70'
                  }`}
                >
                  <div className="relative h-48 bg-gradient-to-br from-white/10 to-white/5 overflow-hidden">
                    {oficina.foto ? (
                      <>
                        <Image src={oficina.foto} alt={`Oficina ${oficina.nombre}`} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
                      </>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-[#E6BE4D] text-sm font-bold">Próximamente</span>
                      </div>
                    )}
                    {oficina.proximamente && (
                      <div className="absolute top-3 right-3 px-3 py-1.5 bg-gradient-to-r from-[#996515] via-[#C9A227] to-[#E6BE4D] text-slate-950 text-xs font-black rounded-full">
                        2026
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h4 className="text-white font-black text-base mb-2">{oficina.nombre}</h4>
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

      {/* Footer */}
      <footer id="contacto" className="relative z-10 border-t border-white/10 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="lg:col-span-1">
              <div className="relative h-16 w-40 mb-4">
                <Image src={SUPABASE_IMAGES.mainLogo} alt="Grupo Oroz CR" fill className="object-contain" />
              </div>
              <p className="text-white/50 text-sm mb-4">
                Administradores expertos de parques de aventura con cobertura total en Costa Rica.
              </p>
              <div className="mt-4">
                <p className="text-white/70 text-sm font-bold">gabrielorozco@grupooroz.com</p>
                <p className="text-[#E6BE4D] text-sm font-bold">+506 6098 2244</p>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-black text-white uppercase tracking-wider mb-4">Parques</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="https://www.skylinecanopytour.com" target="_blank" className="text-[#E6BE4D] hover:text-[#FFD966] font-bold">Skyline Canopy Tour</a></li>
                <li><a href="https://www.arenalecoglide.com" target="_blank" className="text-[#E6BE4D] hover:text-[#FFD966] font-bold">Ecoglide Arenal Park</a></li>
                <li><span className="text-white/30">Poás Adventure Park (2026)</span></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-black text-white uppercase tracking-wider mb-4">Agencias</h3>
              <ul className="space-y-2 text-sm">
                <li><span className="text-white/50">CR Doing</span></li>
                <li><span className="text-white/50">CR Paradise</span></li>
                <li><span className="text-white/50">GTT Tours</span></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-black text-white uppercase tracking-wider mb-4">Servicios</h3>
              <ul className="space-y-2 text-sm">
                <li><span className="text-white/50">Can&apos;t Wait Travel</span></li>
                <li><span className="text-white/50">MaxDigital</span></li>
                <li><span className="text-white/50">Adventures Designer</span></li>
                <li><a href="https://www.orostudioscr.com" target="_blank" className="text-[#E6BE4D] hover:text-[#FFD966] font-bold">OrostudiosCR</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-white/40 text-sm">
            <p>&copy; 2025 Grupo Oroz CR. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
