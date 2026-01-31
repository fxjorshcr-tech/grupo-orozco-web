import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Grupo Oroz CR - Holding Empresarial Costarricense",
  description: "Grupo empresarial líder en turismo, tecnología y servicios en Costa Rica. Parques de aventura, agencias de viajes, transporte, tecnología y más.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
