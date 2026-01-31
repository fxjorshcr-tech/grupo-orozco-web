'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// URLs de Supabase
const SUPABASE_IMAGES = {
  background: "https://jrphapxnjpcepsecfsoe.supabase.co/storage/v1/object/sign/fotos/_BBB3750.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jNDJiMjQ5Yy00YjhhLTQ5ZDAtOTJmMC1iNjlkMmI2MjFhODUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmb3Rvcy9fQkJCMzc1MC53ZWJwIiwiaWF0IjoxNzY0ODY5MDMxLCJleHAiOjE3OTY0MDUwMzF9.0FEkoFt-EQMTou1bOrtPZdukelI4D21oGgEephrGw_g",
  mainLogo: "https://mmlbslwljvmscbgsqkkq.supabase.co/storage/v1/object/sign/logos-oroz/GRUPO%20OROZO%20LOGO%20trans.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9iZmNkZjM3My00NzkzLTRhYjQtYmRhOC04OWY1ZmNiMjdhMzciLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJsb2dvcy1vcm96L0dSVVBPIE9ST1pPIExPR08gdHJhbnMucG5nIiwiaWF0IjoxNzY5ODgzNDkwLCJleHAiOjI0MDA2MDM0OTB9.2QYmS_p1Efzo4eJqt1e4TdwS7gXdGbAkyq0oDNaDTtw",
  ecoglide: "https://jrphapxnjpcepsecfsoe.supabase.co/storage/v1/object/sign/fotos/logo-ecoglide-arenal-park.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jNDJiMjQ5Yy00YjhhLTQ5ZDAtOTJmMC1iNjlkMmI2MjFhODUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmb3Rvcy9sb2dvLWVjb2dsaWRlLWFyZW5hbC1wYXJrLndlYnAiLCJpYXQiOjE3NjQ4NjkwNDksImV4cCI6MTc5NjQwNTA0OX0.JbTaJxokTytMoYCxzzhR0VN9BNiMTCgRPMVBRRBuMwY",
  poas: "https://jrphapxnjpcepsecfsoe.supabase.co/storage/v1/object/sign/fotos/poas-adventure-park.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jNDJiMjQ5Yy00YjhhLTQ5ZDAtOTJmMC1iNjlkMmI2MjFhODUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmb3Rvcy9wb2FzLWFkdmVudHVyZS1wYXJrLndlYnAiLCJpYXQiOjE3NjQ5NTU4MzYsImV4cCI6MTc5NjQ5MTgzNn0.tfroBG9kBFLb6R7224gqDhd5xVhOo3Y4jdsF4OPM6M0",
  skyline: "https://mmlbslwljvmscbgsqkkq.supabase.co/storage/v1/object/sign/logos-oroz/skyline-logo.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9iZmNkZjM3My00NzkzLTRhYjQtYmRhOC04OWY1ZmNiMjdhMzciLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJsb2dvcy1vcm96L3NreWxpbmUtbG9nby5qcGVnIiwiaWF0IjoxNzY5ODc4OTM3LCJleHAiOjI0MDA1OTg5Mzd9.zM1xj5pVR_-QJEUwy3jRGkCzDg77aL3hcICSTGItSmU",
  orostudios: "https://jrphapxnjpcepsecfsoe.supabase.co/storage/v1/object/sign/fotos/Orostudios%20CR%20Logo.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jNDJiMjQ5Yy00YjhhLTQ5ZDAtOTJmMC1iNjlkMmI2MjFhODUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmb3Rvcy9Pcm9zdHVkaW9zIENSIExvZ28ud2VicCIsImlhdCI6MTc2NDg2OTExMywiZXhwIjoxNzk2NDA1MTEzfQ.30JfBaXmaeZ0HCECt4Nq-b6AEgNF_0dEqVaIXoDWvBc",
  crDoing: "https://mmlbslwljvmscbgsqkkq.supabase.co/storage/v1/object/sign/logos-oroz/CR%20DOING.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9iZmNkZjM3My00NzkzLTRhYjQtYmRhOC04OWY1ZmNiMjdhMzciLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJsb2dvcy1vcm96L0NSIERPSU5HLnBuZyIsImlhdCI6MTc2OTg3ODczNSwiZXhwIjoyNDAwNTk4NzM1fQ.LBtlZM3DjLOMMwhOv74hqYMnXDtEAWZ0zTZy2ZmYdgY",
  crParadise: "https://mmlbslwljvmscbgsqkkq.supabase.co/storage/v1/object/sign/logos-oroz/crparadise.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9iZmNkZjM3My00NzkzLTRhYjQtYmRhOC04OWY1ZmNiMjdhMzciLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJsb2dvcy1vcm96L2NycGFyYWRpc2UucG5nIiwiaWF0IjoxNzY5ODc4NzU3LCJleHAiOjI0MDA1OTg3NTd9.SCb7nhvqLxL5W5AF3QsVcScWPPn4VYYmzWu-oMTMlos",
  gttTours: "https://mmlbslwljvmscbgsqkkq.supabase.co/storage/v1/object/sign/logos-oroz/gtt-logo.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9iZmNkZjM3My00NzkzLTRhYjQtYmRhOC04OWY1ZmNiMjdhMzciLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJsb2dvcy1vcm96L2d0dC1sb2dvLmpwZWciLCJpYXQiOjE3Njk4Nzg4MDcsImV4cCI6MjQwMDU5ODgwN30.SyTuEXOtJ1UWdj2YIn6RpWVTXs1Sw8F-nXuTpVVEw5Y",
  cantWaitTravel: "https://mmlbslwljvmscbgsqkkq.supabase.co/storage/v1/object/sign/logos-oroz/Logo%20CWT%20Costa%20Rica-FINAL-01.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9iZmNkZjM3My00NzkzLTRhYjQtYmRhOC04OWY1ZmNiMjdhMzciLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJsb2dvcy1vcm96L0xvZ28gQ1dUIENvc3RhIFJpY2EtRklOQUwtMDEucG5nIiwiaWF0IjoxNzY5ODc4ODIyLCJleHAiOjI0MDA1OTg4MjJ9.jJtdDXJ-YOCiBnzd1bnRgJqGsJd4F2SEldsjl5ukt7k",
  maxDigital: "https://mmlbslwljvmscbgsqkkq.supabase.co/storage/v1/object/sign/logos-oroz/logo-max-transparente.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9iZmNkZjM3My00NzkzLTRhYjQtYmRhOC04OWY1ZmNiMjdhMzciLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJsb2dvcy1vcm96L2xvZ28tbWF4LXRyYW5zcGFyZW50ZS5wbmciLCJpYXQiOjE3Njk4Nzg4MzQsImV4cCI6MjQwMDU5ODgzNH0.tS1Ndtr8JFpp7aQb33TrvyPtazyviBIEH_sM6VIT3_8",
  ruby: "https://mmlbslwljvmscbgsqkkq.supabase.co/storage/v1/object/sign/PRUEBAS/ruby-logo-Photoroom.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9iZmNkZjM3My00NzkzLTRhYjQtYmRhOC04OWY1ZmNiMjdhMzciLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJQUlVFQkFTL3J1YnktbG9nby1QaG90b3Jvb20ucG5nIiwiaWF0IjoxNzY5ODgzMTk0LCJleHAiOjI0MDA2MDMxOTR9.DfWIJT0wMtNecq7jvuRPvnwzZ2hBneAUHyRr8OnKhM0",
  adventuresDesigner: "https://mmlbslwljvmscbgsqkkq.supabase.co/storage/v1/object/sign/PRUEBAS/WhatsApp%20Image%202026-01-17%20at%2010.14.43%20AM.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9iZmNkZjM3My00NzkzLTRhYjQtYmRhOC04OWY1ZmNiMjdhMzciLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJQUlVFQkFTL1doYXRzQXBwIEltYWdlIDIwMjYtMDEtMTcgYXQgMTAuMTQuNDMgQU0ucG5nIiwiaWF0IjoxNzY5ODc5MDI4LCJleHAiOjI0MDA1OTkwMjh9.wR32bSgfOXbfsKy754LjFO3K7H7cAyyNb5ElTNhVAu8",
  oficinaEcoglide: "https://jrphapxnjpcepsecfsoe.supabase.co/storage/v1/object/sign/fotos/ecoglide-oficina.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jNDJiMjQ5Yy00YjhhLTQ5ZDAtOTJmMC1iNjlkMmI2MjFhODUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmb3Rvcy9lY29nbGlkZS1vZmljaW5hLnBuZyIsImlhdCI6MTc2NDg3MjIyNywiZXhwIjoxNzk2NDA4MjI3fQ.KIfP-37WDz31tsRryPXcOPJt2jBE1j91-HRTxzPalyw",
  oficinaSkyline: "https://jrphapxnjpcepsecfsoe.supabase.co/storage/v1/object/sign/fotos/skyline-oficina.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jNDJiMjQ5Yy00YjhhLTQ5ZDAtOTJmMC1iNjlkMmI2MjFhODUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmb3Rvcy9za3lsaW5lLW9maWNpbmEud2VicCIsImlhdCI6MTc2NDg3MjI0MCwiZXhwIjoxNzk2NDA4MjQwfQ.ttqWKE6sjS3og01L4hPl9kZTpdfA03fizFmn-sM6P3c",
  oficinaAMA: "https://jrphapxnjpcepsecfsoe.supabase.co/storage/v1/object/sign/fotos/ama-oficina.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jNDJiMjQ5Yy00YjhhLTQ5ZDAtOTJmMC1iNjlkMmI2MjFhODUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmb3Rvcy9hbWEtb2ZpY2luYS53ZWJwIiwiaWF0IjoxNzY0ODcyMjE4LCJleHAiOjE3OTY0MDgyMTh9.bquypJ16I5U-XRfh6njGbzT2Sxy4pZtZ3ZX2cj-QOBI",
};

const CameraDecor = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 15.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Z"/>
    <path d="M9 2 7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9Zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5Z"/>
  </svg>
);

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
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        <div className="absolute inset-0 bg-black/75" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
      </div>

      {/* Gold glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-[1]">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#C9A227]/8 rounded-full blur-3xl" />
        <div className="absolute top-3/4 -right-32 w-80 h-80 bg-[#E6BE4D]/8 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className={`fixed w-full top-0 z-50 transition-all duration-500 ${scrolled ? 'bg-slate-950/90 backdrop-blur-xl border-b border-[#C9A227]/20' : 'bg-transparent'}`}>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            <div className="flex-shrink-0">
              <div className="relative h-20 w-48">
                <Image src={SUPABASE_IMAGES.mainLogo} alt="Grupo Oroz CR" fill className="object-contain" />
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-2">
              {['Inicio', 'Parques', 'Agencias', 'Servicios', 'OrostudiosCR', 'Contacto'].map((item, i) => (
                <a key={i} href={`#${item.toLowerCase().replace('orostudioscr', 'orostudios')}`}
                   className="px-5 py-2.5 text-white/80 hover:text-[#E6BE4D] hover:bg-white/5 rounded-full transition-all duration-300 text-sm font-bold">
                  {item}
                </a>
              ))}
            </div>
          </div>
        </nav>
      </header>

      {/* ==================== HERO ==================== */}
      <section id="inicio" className="relative z-10 min-h-screen flex items-center justify-center px-4 pt-24">
        <div className="text-center max-w-6xl mx-auto">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-[#C9A227]/20 border border-[#C9A227]/40 rounded-full mb-10">
            <span className="w-3 h-3 bg-[#E6BE4D] rounded-full animate-pulse" />
            <span className="text-[#E6BE4D] text-base font-bold tracking-widest">COSTA RICA</span>
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-8 leading-none tracking-tight">
            Grupo <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A227] via-[#E6BE4D] to-[#FFD966]">Oroz</span> CR
          </h1>

          <p className="text-2xl md:text-3xl text-white/80 mb-6 font-medium max-w-4xl mx-auto leading-relaxed">
            Administradores expertos de parques de aventura con <span className="text-[#E6BE4D] font-bold">cobertura total</span> en Costa Rica
          </p>

          <p className="text-xl text-white/60 mb-8 max-w-3xl mx-auto">
            Más de 20 años garantizando excelencia operativa, seguridad certificada y experiencias inolvidables
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {['Turismo', 'Tecnología', 'Transporte', 'Construcción'].map((item, i) => (
              <span key={i} className="px-5 py-2 bg-[#C9A227]/10 border border-[#C9A227]/30 rounded-full text-[#E6BE4D] font-bold text-sm">
                {item}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <a href="#parques" className="bg-gradient-to-r from-[#996515] via-[#C9A227] to-[#E6BE4D] hover:shadow-xl hover:shadow-[#C9A227]/30 group inline-flex items-center justify-center gap-3 px-10 py-5 text-slate-950 font-black text-lg rounded-2xl transition-all duration-300 hover:scale-105">
              Nuestros Parques
              <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a href="#agencias" className="px-10 py-5 bg-white/10 backdrop-blur-sm text-white font-bold text-lg rounded-2xl border-2 border-[#C9A227]/50 hover:bg-[#C9A227]/20 hover:border-[#C9A227] transition-all duration-300 hover:scale-105">
              Ver Todos los Servicios
            </a>
          </div>
        </div>
      </section>

      {/* ==================== PARQUES DE AVENTURA ==================== */}
      <section id="parques" className="relative z-10 py-40 px-4 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <ZiplineDecor className="absolute top-20 left-10 w-72 h-32 text-[#C9A227]/20 rotate-6" />
          <ZiplineDecor className="absolute bottom-32 right-16 w-64 h-28 text-[#E6BE4D]/20 -rotate-6" />
        </div>

        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-20">
            <span className="bg-gradient-to-r from-[#996515] to-[#E6BE4D] text-slate-950 px-6 py-2 rounded-full text-sm font-black tracking-wider inline-block mb-6">
              ADMINISTRACIÓN DE PARQUES
            </span>
            <h2 className="text-5xl md:text-7xl font-black text-white mb-6">
              Parques de <span className="text-[#E6BE4D]">Aventura</span>
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
              Líderes en gestión integral con <span className="text-[#E6BE4D] font-bold">cobertura total</span>: operaciones, seguridad ACCT, mantenimiento 24/7 y experiencia al cliente de clase mundial.
            </p>
          </div>

          {/* Logos de parques GRANDES */}
          <div className="grid md:grid-cols-3 gap-10 mb-16">
            {[
              { nombre: "Skyline Canopy Tour", logo: SUPABASE_IMAGES.skyline, ubicacion: "Santa Cruz, Guanacaste", url: "https://www.skylinecanopytour.com" },
              { nombre: "Ecoglide Arenal Park", logo: SUPABASE_IMAGES.ecoglide, ubicacion: "La Fortuna, San Carlos", url: "https://www.arenalecoglide.com" },
              { nombre: "Poás Adventure Park", logo: SUPABASE_IMAGES.poas, ubicacion: "Poás, Alajuela", url: "#", proximamente: true }
            ].map((parque, i) => (
              <div key={i} className="group">
                <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-[2rem] border-2 border-white/10 hover:border-[#C9A227]/60 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-[#C9A227]/20 overflow-hidden">
                  {parque.proximamente && (
                    <div className="absolute top-6 right-6 px-4 py-2 bg-gradient-to-r from-[#996515] to-[#E6BE4D] text-slate-950 text-sm font-black rounded-full z-10">
                      2026
                    </div>
                  )}
                  <div className="p-10">
                    <div className="relative h-48 w-full bg-white rounded-2xl shadow-xl mb-8">
                      <Image src={parque.logo} alt={parque.nombre} fill className="object-contain p-6" />
                    </div>
                    <h3 className="text-2xl font-black text-white mb-3">{parque.nombre}</h3>
                    <div className="flex items-center text-white/50 mb-6">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      {parque.ubicacion}
                    </div>
                    {!parque.proximamente ? (
                      <Link href={parque.url} target="_blank" className="inline-flex items-center gap-2 text-[#E6BE4D] hover:text-[#FFD966] font-bold text-lg group/link">
                        Visitar sitio web
                        <svg className="w-5 h-5 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    ) : (
                      <span className="text-white/40 font-bold">Próximamente</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "+20", label: "Años de Experiencia" },
              { value: "3", label: "Parques Administrados" },
              { value: "ACCT", label: "Certificación Internacional" },
              { value: "24/7", label: "Mantenimiento Continuo" }
            ].map((stat, i) => (
              <div key={i} className="text-center p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                <div className="text-4xl md:text-5xl font-black text-[#E6BE4D] mb-2">{stat.value}</div>
                <div className="text-white/60 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== AGENCIAS DE VIAJES ==================== */}
      <section id="agencias" className="relative z-10 py-40 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="bg-gradient-to-r from-[#996515] to-[#E6BE4D] text-slate-950 px-6 py-2 rounded-full text-sm font-black tracking-wider inline-block mb-6">
              TURISMO Y VIAJES
            </span>
            <h2 className="text-5xl md:text-7xl font-black text-white mb-6">
              Agencias de <span className="text-[#E6BE4D]">Viajes</span>
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
              Tres agencias especializadas que cubren todas las necesidades del turista: desde aventuras extremas hasta experiencias culturales auténticas. Con más de 15 años de experiencia combinada, garantizamos viajes inolvidables.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-10">
            {/* CR DOING */}
            <div className="group">
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-[2rem] border-2 border-white/10 hover:border-[#C9A227]/60 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-[#C9A227]/20 p-10">
                <div className="relative h-52 w-full bg-white rounded-2xl shadow-xl mb-8">
                  <Image src={SUPABASE_IMAGES.crDoing} alt="CR Doing" fill className="object-contain p-6" />
                </div>
                <h3 className="text-3xl font-black text-white mb-4 text-center">CR Doing</h3>
                <p className="text-white/70 text-center text-lg mb-6 leading-relaxed">
                  Agencia especializada en tours de aventura y experiencias personalizadas para grupos pequeños y familias.
                </p>
                <div className="space-y-3 mb-8">
                  <h4 className="text-[#E6BE4D] font-bold text-sm uppercase tracking-wider">Servicios Destacados</h4>
                  <ul className="space-y-2">
                    {['Tours de aventura extrema', 'Caminatas en volcanes', 'Rafting y kayak', 'Tours nocturnos', 'Experiencias gastronómicas'].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-white/60">
                        <svg className="w-5 h-5 text-[#E6BE4D] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center justify-between pt-6 border-t border-white/10">
                  <div>
                    <p className="text-white/40 text-sm">Desde</p>
                    <p className="text-[#E6BE4D] font-black text-2xl">$45 USD</p>
                  </div>
                  <a href="#contacto" className="px-6 py-3 bg-[#C9A227]/20 hover:bg-[#C9A227]/40 text-[#E6BE4D] font-bold rounded-xl transition-all">
                    Consultar
                  </a>
                </div>
              </div>
            </div>

            {/* CR PARADISE */}
            <div className="group">
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-[2rem] border-2 border-white/10 hover:border-[#C9A227]/60 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-[#C9A227]/20 p-10">
                <div className="absolute top-6 right-6 px-4 py-2 bg-gradient-to-r from-[#996515] to-[#E6BE4D] text-slate-950 text-sm font-black rounded-full">
                  MÁS POPULAR
                </div>
                <div className="relative h-52 w-full bg-white rounded-2xl shadow-xl mb-8">
                  <Image src={SUPABASE_IMAGES.crParadise} alt="CR Paradise" fill className="object-contain p-6" />
                </div>
                <h3 className="text-3xl font-black text-white mb-4 text-center">CR Paradise</h3>
                <p className="text-white/70 text-center text-lg mb-6 leading-relaxed">
                  Tu conexión directa con el paraíso costarricense. Paquetes completos que incluyen hospedaje, transporte y actividades.
                </p>
                <div className="space-y-3 mb-8">
                  <h4 className="text-[#E6BE4D] font-bold text-sm uppercase tracking-wider">Servicios Destacados</h4>
                  <ul className="space-y-2">
                    {['Paquetes todo incluido', 'Hoteles seleccionados', 'Transporte privado', 'Guías bilingües', 'Asistencia 24/7'].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-white/60">
                        <svg className="w-5 h-5 text-[#E6BE4D] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center justify-between pt-6 border-t border-white/10">
                  <div>
                    <p className="text-white/40 text-sm">Desde</p>
                    <p className="text-[#E6BE4D] font-black text-2xl">$199 USD</p>
                  </div>
                  <a href="#contacto" className="px-6 py-3 bg-gradient-to-r from-[#996515] to-[#E6BE4D] text-slate-950 font-bold rounded-xl transition-all hover:scale-105">
                    Reservar
                  </a>
                </div>
              </div>
            </div>

            {/* GTT TOURS */}
            <div className="group">
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-[2rem] border-2 border-white/10 hover:border-[#C9A227]/60 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-[#C9A227]/20 p-10">
                <div className="relative h-52 w-full bg-white rounded-2xl shadow-xl mb-8">
                  <Image src={SUPABASE_IMAGES.gttTours} alt="GTT Tours" fill className="object-contain p-6" />
                </div>
                <h3 className="text-3xl font-black text-white mb-4 text-center">GTT Tours</h3>
                <p className="text-white/70 text-center text-lg mb-6 leading-relaxed">
                  Guanacaste Top Tours - Especialistas en la zona de Guanacaste con tours premium y experiencias exclusivas.
                </p>
                <div className="space-y-3 mb-8">
                  <h4 className="text-[#E6BE4D] font-bold text-sm uppercase tracking-wider">Servicios Destacados</h4>
                  <ul className="space-y-2">
                    {['Tours en Guanacaste', 'Playas paradisíacas', 'Snorkeling y buceo', 'Avistamiento de fauna', 'Tours en catamarán'].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-white/60">
                        <svg className="w-5 h-5 text-[#E6BE4D] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center justify-between pt-6 border-t border-white/10">
                  <div>
                    <p className="text-white/40 text-sm">Desde</p>
                    <p className="text-[#E6BE4D] font-black text-2xl">$65 USD</p>
                  </div>
                  <a href="#contacto" className="px-6 py-3 bg-[#C9A227]/20 hover:bg-[#C9A227]/40 text-[#E6BE4D] font-bold rounded-xl transition-all">
                    Consultar
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Stats de agencias */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
            {[
              { value: "+5,000", label: "Clientes Satisfechos" },
              { value: "15+", label: "Años de Experiencia" },
              { value: "50+", label: "Destinos Disponibles" },
              { value: "4.9/5", label: "Calificación Promedio" }
            ].map((stat, i) => (
              <div key={i} className="text-center p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                <div className="text-4xl md:text-5xl font-black text-[#E6BE4D] mb-2">{stat.value}</div>
                <div className="text-white/60 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== SERVICIOS: TRANSPORTE, TECNOLOGÍA, CONSTRUCCIÓN ==================== */}
      <section id="servicios" className="relative z-10 py-40 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="bg-gradient-to-r from-[#996515] to-[#E6BE4D] text-slate-950 px-6 py-2 rounded-full text-sm font-black tracking-wider inline-block mb-6">
              ECOSISTEMA EMPRESARIAL
            </span>
            <h2 className="text-5xl md:text-7xl font-black text-white mb-6">
              Más <span className="text-[#E6BE4D]">Servicios</span>
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
              Un portafolio diversificado que complementa nuestra oferta turística. Cada empresa está diseñada para ofrecer soluciones integrales en su área de especialización.
            </p>
          </div>

          {/* TRANSPORTE - Sección completa */}
          <div className="mb-20">
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-[2rem] border-2 border-white/10 p-10 lg:p-16">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="bg-gradient-to-br from-[#996515] to-[#E6BE4D] w-20 h-20 rounded-2xl flex items-center justify-center mb-8">
                    <svg className="w-10 h-10 text-slate-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 17h8M8 17a2 2 0 11-4 0 2 2 0 014 0zm8 0a2 2 0 104 0 2 2 0 00-4 0zm-8 0H5a2 2 0 01-2-2V6a2 2 0 012-2h9l5 5v6a2 2 0 01-2 2h-1" />
                    </svg>
                  </div>
                  <h3 className="text-4xl font-black text-white mb-6">Transporte Turístico</h3>
                  <p className="text-white/70 text-xl mb-8 leading-relaxed">
                    Can&apos;t Wait Travel ofrece servicios de transporte privado y compartido para turistas que desean explorar Costa Rica con comodidad y seguridad. Conectamos todos los destinos principales del país.
                  </p>

                  <div className="grid sm:grid-cols-2 gap-6 mb-8">
                    <div className="space-y-4">
                      <h4 className="text-[#E6BE4D] font-bold uppercase tracking-wider">Servicios</h4>
                      <ul className="space-y-3">
                        {['Traslados aeropuerto', 'Transporte privado', 'Shuttle compartido', 'Tours con transporte'].map((item, i) => (
                          <li key={i} className="flex items-center gap-3 text-white/60">
                            <svg className="w-5 h-5 text-[#E6BE4D] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-[#E6BE4D] font-bold uppercase tracking-wider">Destinos</h4>
                      <ul className="space-y-3">
                        {['La Fortuna / Arenal', 'Manuel Antonio', 'Guanacaste', 'Monteverde'].map((item, i) => (
                          <li key={i} className="flex items-center gap-3 text-white/60">
                            <svg className="w-5 h-5 text-[#E6BE4D] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <a href="#contacto" className="px-8 py-4 bg-gradient-to-r from-[#996515] to-[#E6BE4D] text-slate-950 font-bold rounded-xl transition-all hover:scale-105">
                      Solicitar Cotización
                    </a>
                    <div className="px-6 py-4 bg-white/10 rounded-xl">
                      <p className="text-white/40 text-sm">Flota de</p>
                      <p className="text-[#E6BE4D] font-black text-xl">+15 Vehículos</p>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="relative h-64 bg-white rounded-2xl shadow-2xl">
                    <Image src={SUPABASE_IMAGES.cantWaitTravel} alt="Can't Wait Travel" fill className="object-contain p-8" />
                  </div>
                  <div className="grid grid-cols-3 gap-4 mt-6">
                    {[
                      { value: "24/7", label: "Disponibilidad" },
                      { value: "100%", label: "Puntualidad" },
                      { value: "A/C", label: "Climatizado" }
                    ].map((stat, i) => (
                      <div key={i} className="text-center p-4 bg-white/5 rounded-xl">
                        <div className="text-2xl font-black text-[#E6BE4D]">{stat.value}</div>
                        <div className="text-white/50 text-sm">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* TECNOLOGÍA - Sección completa */}
          <div className="mb-20">
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-[2rem] border-2 border-white/10 p-10 lg:p-16">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-6">
                      <div className="relative h-44 bg-white rounded-2xl shadow-2xl">
                        <Image src={SUPABASE_IMAGES.maxDigital} alt="MaxDigital" fill className="object-contain p-6" />
                      </div>
                      <div className="text-center p-6 bg-white/5 rounded-xl border border-white/10">
                        <h5 className="text-white font-bold mb-2">MaxDigital</h5>
                        <p className="text-white/50 text-sm">Desarrollo web y apps móviles</p>
                      </div>
                    </div>
                    <div className="space-y-6 mt-8">
                      <div className="relative h-44 bg-white rounded-2xl shadow-2xl">
                        <Image src={SUPABASE_IMAGES.ruby} alt="Ruby" fill className="object-contain p-6" />
                      </div>
                      <div className="text-center p-6 bg-white/5 rounded-xl border border-white/10">
                        <h5 className="text-white font-bold mb-2">Ruby</h5>
                        <p className="text-white/50 text-sm">Sistemas de gestión turística</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="order-1 lg:order-2">
                  <div className="bg-gradient-to-br from-[#996515] to-[#E6BE4D] w-20 h-20 rounded-2xl flex items-center justify-center mb-8">
                    <svg className="w-10 h-10 text-slate-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                  <h3 className="text-4xl font-black text-white mb-6">Tecnología e Innovación</h3>
                  <p className="text-white/70 text-xl mb-8 leading-relaxed">
                    Dos empresas tecnológicas que desarrollan soluciones digitales para el sector turístico: desde sistemas de reservas hasta aplicaciones móviles y plataformas de gestión empresarial.
                  </p>

                  <div className="space-y-4 mb-8">
                    <h4 className="text-[#E6BE4D] font-bold uppercase tracking-wider">Soluciones que Ofrecemos</h4>
                    <ul className="space-y-3">
                      {[
                        'Sistemas de reservas online',
                        'Aplicaciones móviles para parques',
                        'Plataformas de gestión de tours',
                        'Integración con pasarelas de pago',
                        'Dashboards de análisis de datos',
                        'Sitios web optimizados para turismo'
                      ].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-white/60">
                          <svg className="w-5 h-5 text-[#E6BE4D] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { value: "+30", label: "Proyectos" },
                      { value: "99.9%", label: "Uptime" },
                      { value: "5", label: "Países" }
                    ].map((stat, i) => (
                      <div key={i} className="text-center p-4 bg-white/5 rounded-xl">
                        <div className="text-2xl font-black text-[#E6BE4D]">{stat.value}</div>
                        <div className="text-white/50 text-sm">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CONSTRUCCIÓN - Sección completa */}
          <div>
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-[2rem] border-2 border-white/10 p-10 lg:p-16">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="bg-gradient-to-br from-[#996515] to-[#E6BE4D] w-20 h-20 rounded-2xl flex items-center justify-center mb-8">
                    <svg className="w-10 h-10 text-slate-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="text-4xl font-black text-white mb-6">Construcción de Parques de Aventura</h3>
                  <p className="text-white/70 text-xl mb-8 leading-relaxed">
                    Adventures Designer es nuestra división especializada en diseño, construcción, instalación y certificación de parques de aventura y canopy tours. Cumplimos con los más altos estándares internacionales de seguridad.
                  </p>

                  <div className="grid sm:grid-cols-2 gap-6 mb-8">
                    <div className="space-y-4">
                      <h4 className="text-[#E6BE4D] font-bold uppercase tracking-wider">Servicios</h4>
                      <ul className="space-y-3">
                        {['Diseño de canopy tours', 'Construcción de plataformas', 'Instalación de cables', 'Certificación ACCT'].map((item, i) => (
                          <li key={i} className="flex items-center gap-3 text-white/60">
                            <svg className="w-5 h-5 text-[#E6BE4D] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-[#E6BE4D] font-bold uppercase tracking-wider">Certificaciones</h4>
                      <ul className="space-y-3">
                        {['ACCT (Asociación)', 'ASTM F24', 'EN 15567-1', 'ISO 9001'].map((item, i) => (
                          <li key={i} className="flex items-center gap-3 text-white/60">
                            <svg className="w-5 h-5 text-[#E6BE4D] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <a href="#contacto" className="px-8 py-4 bg-gradient-to-r from-[#996515] to-[#E6BE4D] text-slate-950 font-bold rounded-xl transition-all hover:scale-105">
                      Solicitar Proyecto
                    </a>
                  </div>
                </div>

                <div className="relative">
                  <div className="relative h-72 bg-white rounded-2xl shadow-2xl">
                    <Image src={SUPABASE_IMAGES.adventuresDesigner} alt="Adventures Designer" fill className="object-contain p-8" />
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    {[
                      { value: "+20", label: "Parques Construidos" },
                      { value: "100%", label: "Seguridad Garantizada" },
                      { value: "5", label: "Países" },
                      { value: "24/7", label: "Soporte Técnico" }
                    ].map((stat, i) => (
                      <div key={i} className="text-center p-4 bg-white/5 rounded-xl">
                        <div className="text-2xl font-black text-[#E6BE4D]">{stat.value}</div>
                        <div className="text-white/50 text-sm">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== OROSTUDIOSCR ==================== */}
      <section id="orostudios" className="relative z-10 py-40 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#C9A227]/5 via-transparent to-[#C9A227]/5" />
        <div className="absolute inset-0 pointer-events-none">
          <CameraDecor className="absolute top-20 left-12 w-40 h-40 text-[#C9A227]/20 rotate-12" />
          <CameraDecor className="absolute bottom-32 right-16 w-32 h-32 text-[#E6BE4D]/20 -rotate-12" />
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center mb-24">
            <div>
              <span className="bg-gradient-to-r from-[#996515] to-[#E6BE4D] text-slate-950 px-6 py-2 rounded-full text-sm font-black tracking-wider inline-block mb-6">
                CONTENIDO FOTOGRÁFICO
              </span>
              <h2 className="text-5xl md:text-7xl font-black text-white mb-8">
                Orostudios<span className="text-[#E6BE4D]">CR</span>
              </h2>
              <p className="text-xl text-white/60 mb-10 leading-relaxed">
                Con más de 20 años de experiencia, somos la rama especializada en fotografía y video para parques de aventura. Hemos trabajado con más de 18 parques en Costa Rica.
              </p>

              <div className="grid grid-cols-3 gap-6 mb-10">
                {[
                  { value: '+3500', label: 'Nuevos Leads' },
                  { value: '+50%', label: 'Ganancia Anual' },
                  { value: '+1600', label: 'Seguidores' }
                ].map((stat, i) => (
                  <div key={i} className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                    <div className="text-3xl md:text-4xl font-black text-[#E6BE4D]">{stat.value}</div>
                    <div className="text-sm text-white/50 mt-2 font-bold uppercase tracking-wide">{stat.label}</div>
                  </div>
                ))}
              </div>

              <Link href="https://www.orostudioscr.com" target="_blank"
                    className="bg-gradient-to-r from-[#996515] via-[#C9A227] to-[#E6BE4D] hover:shadow-xl hover:shadow-[#C9A227]/30 inline-flex items-center gap-3 px-8 py-4 text-slate-950 font-black text-lg rounded-2xl transition-all duration-300 hover:scale-105">
                Conocer más
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            <div className="relative">
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-[2rem] border-2 border-white/10 p-12">
                <div className="relative h-64 w-full bg-white rounded-2xl shadow-xl">
                  <Image src={SUPABASE_IMAGES.orostudios} alt="OrostudiosCR Logo" fill className="object-contain p-6" />
                </div>
              </div>
            </div>
          </div>

          {/* Oficinas */}
          <div>
            <h3 className="text-3xl md:text-4xl font-black text-white text-center mb-12">Oficinas Activas</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {oficinasOrostudios.map((oficina, index) => (
                <div key={index}
                     className={`relative bg-white/5 backdrop-blur-xl rounded-2xl overflow-hidden border-2 transition-all duration-500 ${
                       oficina.activa ? 'border-[#C9A227]/50 hover:border-[#E6BE4D] hover:-translate-y-2' : 'border-white/10 opacity-60'
                     }`}>
                  <div className="relative h-40 bg-gradient-to-br from-white/10 to-white/5 overflow-hidden">
                    {oficina.foto ? (
                      <>
                        <Image src={oficina.foto} alt={oficina.nombre} fill className="object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
                      </>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-[#E6BE4D] font-bold">Próximamente</span>
                      </div>
                    )}
                    {oficina.proximamente && (
                      <div className="absolute top-3 right-3 px-3 py-1 bg-gradient-to-r from-[#996515] to-[#E6BE4D] text-slate-950 text-xs font-black rounded-full">2026</div>
                    )}
                  </div>
                  <div className="p-5">
                    <h4 className="text-white font-black mb-2">{oficina.nombre}</h4>
                    <p className="text-white/50 text-sm">{oficina.ubicacion}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer id="contacto" className="relative z-10 border-t border-white/10 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div>
              <div className="relative h-20 w-52 mb-6">
                <Image src={SUPABASE_IMAGES.mainLogo} alt="Grupo Oroz CR" fill className="object-contain" />
              </div>
              <p className="text-white/50 mb-6 leading-relaxed">
                Administradores expertos de parques de aventura con cobertura total en Costa Rica.
              </p>
              <p className="text-white/70 font-bold">gabrielorozco@grupooroz.com</p>
              <p className="text-[#E6BE4D] font-black text-xl">+506 6098 2244</p>
            </div>
            <div>
              <h3 className="text-white font-black uppercase tracking-wider mb-6">Parques</h3>
              <ul className="space-y-3">
                <li><a href="https://www.skylinecanopytour.com" target="_blank" className="text-[#E6BE4D] hover:text-[#FFD966] font-bold">Skyline Canopy Tour</a></li>
                <li><a href="https://www.arenalecoglide.com" target="_blank" className="text-[#E6BE4D] hover:text-[#FFD966] font-bold">Ecoglide Arenal Park</a></li>
                <li><span className="text-white/30">Poás Adventure Park (2026)</span></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-black uppercase tracking-wider mb-6">Agencias</h3>
              <ul className="space-y-3 text-white/50">
                <li>CR Doing</li>
                <li>CR Paradise</li>
                <li>GTT Tours</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-black uppercase tracking-wider mb-6">Servicios</h3>
              <ul className="space-y-3">
                <li className="text-white/50">Can&apos;t Wait Travel</li>
                <li className="text-white/50">MaxDigital & Ruby</li>
                <li className="text-white/50">Adventures Designer</li>
                <li><a href="https://www.orostudioscr.com" target="_blank" className="text-[#E6BE4D] hover:text-[#FFD966] font-bold">OrostudiosCR</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-white/40">
            <p>&copy; 2025 Grupo Oroz CR. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
