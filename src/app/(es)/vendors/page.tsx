'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { authenticateVendor } from '@/lib/supabase';

export default function VendorsLogin() {
  const router = useRouter();
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const vendor = await authenticateVendor(usuario, password);

      if (vendor) {
        localStorage.setItem('vendor', JSON.stringify({
          id: vendor.id,
          nombre: vendor.nombre,
          usuario: vendor.usuario,
          parques_acceso: vendor.parques_acceso
        }));
        router.push('/vendors/reservas');
      } else {
        setError('Usuario o contraseña incorrectos');
      }
    } catch {
      setError('Error al conectar. Intente de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const logos = [
    {
      src: 'https://jrphapxnjpcepsecfsoe.supabase.co/storage/v1/object/sign/fotos/logo-skyline-adventure-park.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jNDJiMjQ5Yy00YjhhLTQ5ZDAtOTJmMC1iNjlkMmI2MjFhODUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmb3Rvcy9sb2dvLXNreWxpbmUtYWR2ZW50dXJlLXBhcmsud2VicCIsImlhdCI6MTc2NDM0Mjg3MiwiZXhwIjoxNzk1ODc4ODcyfQ.2eK9_W_0COo2cm-GEs1v3p909BOe6E79HnmyN9SxxwY',
      alt: 'Skyline Adventure Park'
    },
    {
      src: 'https://jrphapxnjpcepsecfsoe.supabase.co/storage/v1/object/sign/fotos/logo-ecoglide-arenal-park.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jNDJiMjQ5Yy00YjhhLTQ5ZDAtOTJmMC1iNjlkMmI2MjFhODUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmb3Rvcy9sb2dvLWVjb2dsaWRlLWFyZW5hbC1wYXJrLndlYnAiLCJpYXQiOjE3NjQzNDI4NDIsImV4cCI6MTc5NTg3ODg0Mn0.4R02pjwGtogCQK0MVImGSKT0cWXPFZFY0ueu8r9tE54',
      alt: 'Ecoglide Arenal Park'
    },
    {
      src: 'https://jrphapxnjpcepsecfsoe.supabase.co/storage/v1/object/sign/fotos/logo-poas-adventure-park.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jNDJiMjQ5Yy00YjhhLTQ5ZDAtOTJmMC1iNjlkMmI2MjFhODUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmb3Rvcy9sb2dvLXBvYXMtYWR2ZW50dXJlLXBhcmsud2VicCIsImlhdCI6MTc2NDM0Mjg2MCwiZXhwIjoxNzk1ODc4ODYwfQ.yjkRzxMM0wZJ_UxDITwHNsnHUx9VbA1rpfcFCjKWUgM',
      alt: 'Poás Adventure Park'
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Fondo con gradientes sutiles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[#C9A227]/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-[#C9A227]/3 rounded-full blur-[120px]" />
      </div>

      {/* Contenido */}
      <div className="relative z-10 w-full max-w-md">
        {/* Título */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-wider mb-1">
            GRUPO <span className="text-[#E6BE4D]">OROZ</span> CR
          </h1>
          <p className="text-white/40 text-xs tracking-widest uppercase">
            Sistema de Reservas para Partners
          </p>
        </div>

        {/* Logos en fila */}
        <div className="flex justify-center items-center gap-4 mb-10">
          {logos.map((logo, index) => (
            <div
              key={index}
              className="relative h-12 w-20 md:h-14 md:w-24 opacity-90 hover:opacity-100 transition-opacity duration-300"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                fill
                className="object-contain"
                unoptimized
              />
            </div>
          ))}
        </div>

        {/* Formulario de Login */}
        <div className="bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8">
          <h2 className="text-lg font-semibold text-white text-center mb-6">
            Iniciar Sesión
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Usuario */}
            <div>
              <label className="block text-white/50 text-xs font-medium mb-1.5">
                Usuario
              </label>
              <input
                type="text"
                required
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-white/25 focus:outline-none focus:border-[#C9A227]/50 focus:bg-white/[0.07] transition-all"
                placeholder="Ingrese su usuario"
                autoComplete="username"
              />
            </div>

            {/* Contraseña */}
            <div>
              <label className="block text-white/50 text-xs font-medium mb-1.5">
                Contraseña
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-white/25 focus:outline-none focus:border-[#C9A227]/50 focus:bg-white/[0.07] transition-all"
                placeholder="Ingrese su contraseña"
                autoComplete="current-password"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                <p className="text-red-400 text-xs text-center">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-6 rounded-lg font-semibold text-sm transition-all ${
                isLoading
                  ? 'bg-white/10 text-white/40 cursor-not-allowed'
                  : 'bg-gradient-to-r from-[#996515] via-[#C9A227] to-[#E6BE4D] text-black hover:shadow-lg hover:shadow-[#C9A227]/20 hover:-translate-y-0.5 active:translate-y-0'
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Verificando...
                </span>
              ) : (
                'Ingresar'
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-white/20 text-[10px] mt-6">
          © {new Date().getFullYear()} Grupo Oroz CR · Todos los derechos reservados
        </p>
      </div>
    </main>
  );
}