import { SUPABASE_IMAGES } from "./assets";

export const CONTACTO = {
  email: "gabrielorozco@grupooroz.com",
  telefono: "+506 6098 2244",
  telefonoHref: "+50660982244",
  whatsapp: "https://wa.me/50660982244",
} as const;

export const NAV = [
  { label: "Grupo", href: "#grupo" },
  { label: "Parques", href: "#parques" },
  { label: "Agencias", href: "#agencias" },
  { label: "Servicios", href: "#servicios" },
  { label: "OrostudiosCR", href: "#orostudios" },
  { label: "Contacto", href: "#contacto" },
] as const;

export const PILARES = [
  {
    titulo: "Operación diaria",
    desc: "Gestión completa de la operación, el personal y los horarios de cada parque.",
  },
  {
    titulo: "Seguridad certificada",
    desc: "Estándares ACCT, inspección de líneas y protocolos revisados de forma constante.",
  },
  {
    titulo: "Mantenimiento",
    desc: "Revisión y mantenimiento continuo de cables, plataformas y equipo de protección.",
  },
  {
    titulo: "Experiencia del visitante",
    desc: "Atención cuidada de principio a fin, desde la reserva hasta el último tour.",
  },
] as const;

export const AREAS_APOYO = [
  {
    area: "Fotografía y video",
    empresa: "OrostudiosCR",
    desc: "Fotografía y graba a los visitantes, y produce el contenido de cada parque.",
  },
  {
    area: "Transporte",
    empresa: "Can't Wait Travel",
    desc: "Lleva a los turistas hasta la entrada de cada parque, desde cualquier punto del país.",
  },
  {
    area: "Tecnología",
    empresa: "MaxDigital y Ruby",
    desc: "Manejan las reservas, los pagos y todo el día a día digital de la operación.",
  },
  {
    area: "Construcción",
    empresa: "Adventures Designer",
    desc: "Diseña y levanta los parques nuevos, línea por línea.",
  },
] as const;

type Parque = {
  nombre: string;
  logo: string;
  ubicacion: string;
  /** `null` cuando el parque aún no tiene sitio web público. */
  url: string | null;
  /** Año de apertura, sólo para parques que todavía no abren. */
  apertura?: string;
};

export const PARQUES: readonly Parque[] = [
  {
    nombre: "Skyline Canopy Tour",
    logo: SUPABASE_IMAGES.skyline,
    ubicacion: "Santa Cruz, Guanacaste",
    url: "https://www.skylinecanopytour.com",
  },
  {
    nombre: "Ecoglide Arenal Park",
    logo: SUPABASE_IMAGES.ecoglide,
    ubicacion: "La Fortuna, San Carlos",
    url: "https://www.arenalecoglide.com",
  },
  {
    nombre: "Poás Adventure Park",
    logo: SUPABASE_IMAGES.poas,
    ubicacion: "Poás, Alajuela",
    url: null,
    apertura: "2026",
  },
];

export const INDICADORES = [
  { value: "+20", label: "Años de experiencia" },
  { value: "3", label: "Parques administrados" },
  { value: "ACCT", label: "Certificación internacional" },
  { value: "24/7", label: "Mantenimiento continuo" },
] as const;

export const AGENCIAS = [
  { nombre: "CR Doing", logo: SUPABASE_IMAGES.crDoing, desc: "Tours a la medida de cada viajero" },
  { nombre: "CR Paradise", logo: SUPABASE_IMAGES.crParadise, desc: "Paquetes y experiencias por todo el país" },
  { nombre: "GTT Tours", logo: SUPABASE_IMAGES.gttTours, desc: "Tours guiados con acompañamiento local" },
] as const;

/**
 * Oficinas fotográficas de OrostudiosCR dentro de los parques.
 * `activa: true` = oficina abierta y operando hoy.
 */
export const OFICINAS_ACTIVAS = [
  {
    nombre: "Arenal Mundo Aventura",
    ubicacion: "La Fortuna de San Carlos",
    foto: SUPABASE_IMAGES.oficinaAMA,
    desc: "La naturaleza y la aventura se fusionan en cada toma. Revive tu recorrido por los cañones y cascadas con fotografías profesionales.",
  },
  {
    nombre: "Ecoglide Arenal Park",
    ubicacion: "La Fortuna de San Carlos",
    foto: SUPABASE_IMAGES.oficinaEcoglide,
    desc: "Capturamos la emoción pura del canopy entre el verde intenso del Volcán Arenal.",
  },
  {
    nombre: "Skyline Canopy Tour",
    ubicacion: "Santa Cruz, Guanacaste",
    foto: SUPABASE_IMAGES.oficinaSkyline,
    desc: "Altura, velocidad y paisajes impresionantes. Nuestro equipo captura cada salto y cada sonrisa.",
  },
  {
    nombre: "Black Stallion",
    ubicacion: "Tamarindo, Guanacaste",
    foto: SUPABASE_IMAGES.oficinaBlackStallion,
    desc: "Cabalgatas y aventura entre las playas y el bosque seco de Guanacaste, con servicio fotográfico en sitio.",
  },
  {
    nombre: "Attica Canopy Tour",
    ubicacion: "La Fortuna de San Carlos",
    foto: SUPABASE_IMAGES.oficinaAttica,
    desc: "Canopy sobre el bosque de La Fortuna. Oficina equipada para entregar tus fotos el mismo día.",
  },
] as const;

type OficinaProxima = {
  nombre: string;
  ubicacion: string;
  /** `null` cuando todavía no tenemos el logotipo del parque. */
  logo: string | null;
};

export const OFICINAS_PROXIMAS: readonly OficinaProxima[] = [
  { nombre: "Poas Adventure Park", ubicacion: "Poás, Alajuela", logo: SUPABASE_IMAGES.poas },
  { nombre: "Brisas de la Jungla", ubicacion: "Limón", logo: null },
];

export const OFICINA_BENEFICIOS = ["Recuerdos de calidad", "Servicio confiable"] as const;
