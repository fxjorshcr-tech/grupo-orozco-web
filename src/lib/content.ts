import { SUPABASE_IMAGES } from "./assets";

/**
 * Datos estructurales del sitio: los que no cambian con el idioma
 * (logotipos, enlaces, ubicaciones, cifras). Todo el texto traducible
 * vive en `dictionaries.ts`, enlazado por el campo `id`.
 */

export const CONTACTO = {
  email: "gabrielorozco@grupooroz.com",
  telefono: "+506 6098 2244",
  telefonoHref: "+50660982244",
  whatsapp: "https://wa.me/50660982244",
  ciudad: "San José, Costa Rica",
} as const;

export const NAV_IDS = [
  "grupo",
  "parques",
  "agencias",
  "servicios",
  "orostudios",
  "bienesraices",
  "contacto",
] as const;
export type NavId = (typeof NAV_IDS)[number];

export const PILAR_IDS = ["operacion", "seguridad", "mantenimiento", "experiencia"] as const;
export type PilarId = (typeof PILAR_IDS)[number];

export const AREAS_APOYO = [
  { id: "fotografia", empresa: "OrostudiosCR" },
  { id: "transporte", empresa: "Can't Wait Travel" },
  { id: "tecnologia", empresa: "MaxDigital & Ruby" },
  { id: "construccion", empresa: "Adventures Designer" },
] as const;
export type AreaId = (typeof AREAS_APOYO)[number]["id"];

export type Parque = {
  id: "skyline" | "ecoglide" | "poas";
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
    id: "skyline",
    nombre: "Skyline Canopy Tour",
    logo: SUPABASE_IMAGES.skyline,
    ubicacion: "Santa Cruz, Guanacaste",
    url: "https://www.skylinecanopytour.com",
  },
  {
    id: "ecoglide",
    nombre: "Ecoglide Arenal Park",
    logo: SUPABASE_IMAGES.ecoglide,
    ubicacion: "La Fortuna, San Carlos",
    url: "https://www.arenalecoglide.com",
  },
  {
    id: "poas",
    nombre: "Poás Adventure Park",
    logo: SUPABASE_IMAGES.poas,
    ubicacion: "Poás, Alajuela",
    url: null,
    apertura: "2026",
  },
];

export const INDICADOR_IDS = ["experiencia", "parques", "acct", "mantenimiento"] as const;
export type IndicadorId = (typeof INDICADOR_IDS)[number];

export const INDICADOR_VALORES: Record<IndicadorId, string> = {
  experiencia: "+20",
  parques: "3",
  acct: "ACCT",
  mantenimiento: "24/7",
};

export const AGENCIAS = [
  { id: "crdoing", nombre: "CR Doing", logo: SUPABASE_IMAGES.crDoing },
  { id: "crparadise", nombre: "CR Paradise", logo: SUPABASE_IMAGES.crParadise },
  { id: "gtt", nombre: "GTT Tours", logo: SUPABASE_IMAGES.gttTours },
] as const;
export type AgenciaId = (typeof AGENCIAS)[number]["id"];

export const OROSTUDIOS_METRICAS = [
  { id: "leads", valor: "+3500" },
  { id: "ganancia", valor: "+50%" },
  { id: "seguidores", valor: "+1600" },
] as const;
export type MetricaId = (typeof OROSTUDIOS_METRICAS)[number]["id"];

/**
 * Oficinas fotográficas de OrostudiosCR dentro de los parques.
 * Estas cinco están abiertas y operando hoy.
 */
export const OFICINAS_ACTIVAS = [
  {
    id: "ama",
    nombre: "Arenal Mundo Aventura",
    ubicacion: "La Fortuna de San Carlos",
    foto: SUPABASE_IMAGES.oficinaAMA,
  },
  {
    id: "ecoglide",
    nombre: "Ecoglide Arenal Park",
    ubicacion: "La Fortuna de San Carlos",
    foto: SUPABASE_IMAGES.oficinaEcoglide,
  },
  {
    id: "skyline",
    nombre: "Skyline Canopy Tour",
    ubicacion: "Santa Cruz, Guanacaste",
    foto: SUPABASE_IMAGES.oficinaSkyline,
  },
  {
    id: "blackstallion",
    nombre: "Black Stallion",
    ubicacion: "Tamarindo, Guanacaste",
    foto: SUPABASE_IMAGES.oficinaBlackStallion,
  },
  {
    id: "attica",
    nombre: "Attica Canopy Tour",
    ubicacion: "La Fortuna de San Carlos",
    foto: SUPABASE_IMAGES.oficinaAttica,
  },
] as const;
export type OficinaId = (typeof OFICINAS_ACTIVAS)[number]["id"];

export type OficinaProxima = {
  nombre: string;
  ubicacion: string;
  /** `null` cuando todavía no tenemos el logotipo del parque. */
  logo: string | null;
};

export const OFICINAS_PROXIMAS: readonly OficinaProxima[] = [
  { nombre: "Poas Adventure Park", ubicacion: "Poás, Alajuela", logo: SUPABASE_IMAGES.poas },
  { nombre: "Brisas de la Jungla", ubicacion: "Limón", logo: null },
];

/**
 * Oroz Real Estate: los asesores inmobiliarios del grupo.
 * Datos tomados de orozrealestate.com.
 */
export const REAL_ESTATE = {
  nombre: "Oroz Real Estate",
  url: "https://orozrealestate.com",
  dominio: "orozrealestate.com",
  logo: SUPABASE_IMAGES.orozRealEstate,
  director: "Lic. Gabriel Orozco",
  telefono: "+506 6000 3218",
  telefonoHref: "+50660003218",
  whatsapp: "https://wa.me/50660003218",
  email: "gabrielorozco@orozrealestate.com",
} as const;

export const VENTAJA_IDS = ["juridica", "extranjeros", "plusvalia", "acompanamiento"] as const;
export type VentajaId = (typeof VENTAJA_IDS)[number];

export const TIPO_PROPIEDAD_IDS = ["casas", "lotes", "fincas"] as const;
export type TipoPropiedadId = (typeof TIPO_PROPIEDAD_IDS)[number];

export const ENLACES_PARQUES = [
  { nombre: "Skyline Canopy Tour", url: "https://www.skylinecanopytour.com" },
  { nombre: "Ecoglide Arenal Park", url: "https://www.arenalecoglide.com" },
] as const;

export const ENLACES_SERVICIOS = [
  "Can't Wait Travel",
  "MaxDigital & Ruby",
  "Adventures Designer",
] as const;
