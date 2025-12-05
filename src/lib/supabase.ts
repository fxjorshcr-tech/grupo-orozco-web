import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Tipos para la tabla vendors
export interface Vendor {
  id: string;
  nombre: string;
  usuario: string;
  password: string;
  email: string | null;
  telefono: string | null;
  contacto: string | null;
  parques_acceso: string[];
  activo: boolean;
  notas: string | null;
  created_at: string;
  updated_at: string;
}

// Función para autenticar vendor
export async function authenticateVendor(usuario: string, password: string): Promise<Vendor | null> {
  const { data, error } = await supabase
    .from('vendors')
    .select('*')
    .eq('usuario', usuario)
    .eq('password', password)
    .eq('activo', true)
    .single();

  if (error || !data) {
    return null;
  }

  return data as Vendor;
}

// Función para obtener vendor por ID
export async function getVendorById(id: string): Promise<Vendor | null> {
  const { data, error } = await supabase
    .from('vendors')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    return null;
  }

  return data as Vendor;
}