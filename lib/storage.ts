import { supabase } from './supabase'
import { v4 as uuidv4 } from 'uuid'

export interface Propiedad {
  id: string
  titulo: string
  descripcion: string
  precio: number
  tipo: 'venta' | 'renta'
  categoria: 'casa' | 'departamento' | 'penthouse' | 'terreno' | 'local' | 'oficina'
  habitaciones: number
  banos: number
  superficie: number
  estacionamientos: number
  direccion: string
  ciudad: string
  estado: string
  imagen: string
  imagenes: string[]
  amenidades: string[]
  destacada: boolean
  createdAt: string
  updatedAt: string
}

export interface BlogPost {
  id: string
  slug: string
  titulo: string
  resumen: string
  contenido: string
  autor: string
  categoria: string
  imagen: string
  tags: string[]
  publicado: boolean
  createdAt: string
  updatedAt: string
}

// ── Mappers: Supabase snake_case → app camelCase ──────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapPropiedad(row: any): Propiedad {
  return {
    id: row.id,
    titulo: row.titulo,
    descripcion: row.descripcion,
    precio: row.precio,
    tipo: row.tipo,
    categoria: row.categoria,
    habitaciones: row.habitaciones,
    banos: row.banos,
    superficie: row.superficie,
    estacionamientos: row.estacionamientos,
    direccion: row.direccion,
    ciudad: row.ciudad,
    estado: row.estado,
    imagen: row.imagen,
    imagenes: row.imagenes ?? [],
    amenidades: row.amenidades ?? [],
    destacada: row.destacada,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapBlogPost(row: any): BlogPost {
  return {
    id: row.id,
    slug: row.slug,
    titulo: row.titulo,
    resumen: row.resumen,
    contenido: row.contenido,
    autor: row.autor,
    categoria: row.categoria,
    imagen: row.imagen,
    tags: row.tags ?? [],
    publicado: row.publicado,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

// ── Propiedades ───────────────────────────────────────────────────────────────
export async function getPropiedades(): Promise<Propiedad[]> {
  const { data, error } = await supabase
    .from('propiedades')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) { console.error('getPropiedades:', error); return [] }
  return (data ?? []).map(mapPropiedad)
}

export async function getPropiedadById(id: string): Promise<Propiedad | undefined> {
  const { data, error } = await supabase
    .from('propiedades')
    .select('*')
    .eq('id', id)
    .single()
  if (error || !data) return undefined
  return mapPropiedad(data)
}

export async function createPropiedad(
  d: Omit<Propiedad, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Propiedad> {
  const { data, error } = await supabase
    .from('propiedades')
    .insert({
      id: `prop-${uuidv4().slice(0, 8)}`,
      titulo: d.titulo, descripcion: d.descripcion, precio: d.precio,
      tipo: d.tipo, categoria: d.categoria, habitaciones: d.habitaciones,
      banos: d.banos, superficie: d.superficie, estacionamientos: d.estacionamientos,
      direccion: d.direccion, ciudad: d.ciudad, estado: d.estado,
      imagen: d.imagen, imagenes: d.imagenes, amenidades: d.amenidades,
      destacada: d.destacada,
    })
    .select()
    .single()
  if (error || !data) throw new Error(error?.message ?? 'Error al crear')
  return mapPropiedad(data)
}

export async function updatePropiedad(
  id: string,
  d: Partial<Omit<Propiedad, 'id' | 'createdAt'>>
): Promise<Propiedad | null> {
  const { data, error } = await supabase
    .from('propiedades')
    .update({
      ...(d.titulo !== undefined && { titulo: d.titulo }),
      ...(d.descripcion !== undefined && { descripcion: d.descripcion }),
      ...(d.precio !== undefined && { precio: d.precio }),
      ...(d.tipo !== undefined && { tipo: d.tipo }),
      ...(d.categoria !== undefined && { categoria: d.categoria }),
      ...(d.habitaciones !== undefined && { habitaciones: d.habitaciones }),
      ...(d.banos !== undefined && { banos: d.banos }),
      ...(d.superficie !== undefined && { superficie: d.superficie }),
      ...(d.estacionamientos !== undefined && { estacionamientos: d.estacionamientos }),
      ...(d.direccion !== undefined && { direccion: d.direccion }),
      ...(d.ciudad !== undefined && { ciudad: d.ciudad }),
      ...(d.estado !== undefined && { estado: d.estado }),
      ...(d.imagen !== undefined && { imagen: d.imagen }),
      ...(d.imagenes !== undefined && { imagenes: d.imagenes }),
      ...(d.amenidades !== undefined && { amenidades: d.amenidades }),
      ...(d.destacada !== undefined && { destacada: d.destacada }),
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single()
  if (error || !data) return null
  return mapPropiedad(data)
}

export async function deletePropiedad(id: string): Promise<boolean> {
  const { error } = await supabase.from('propiedades').delete().eq('id', id)
  return !error
}

// ── Blog ──────────────────────────────────────────────────────────────────────
export async function getBlogPosts(soloPublicados = false): Promise<BlogPost[]> {
  let query = supabase.from('blog_posts').select('*').order('created_at', { ascending: false })
  if (soloPublicados) query = query.eq('publicado', true)
  const { data, error } = await query
  if (error) { console.error('getBlogPosts:', error); return [] }
  return (data ?? []).map(mapBlogPost)
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .single()
  if (error || !data) return undefined
  return mapBlogPost(data)
}

export async function getBlogPostById(id: string): Promise<BlogPost | undefined> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('id', id)
    .single()
  if (error || !data) return undefined
  return mapBlogPost(data)
}

export async function createBlogPost(
  d: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>
): Promise<BlogPost> {
  const { data, error } = await supabase
    .from('blog_posts')
    .insert({
      id: `blog-${uuidv4().slice(0, 8)}`,
      slug: d.slug, titulo: d.titulo, resumen: d.resumen, contenido: d.contenido,
      autor: d.autor, categoria: d.categoria, imagen: d.imagen,
      tags: d.tags, publicado: d.publicado,
    })
    .select()
    .single()
  if (error || !data) throw new Error(error?.message ?? 'Error al crear')
  return mapBlogPost(data)
}

export async function updateBlogPost(
  id: string,
  d: Partial<Omit<BlogPost, 'id' | 'createdAt'>>
): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from('blog_posts')
    .update({
      ...(d.slug !== undefined && { slug: d.slug }),
      ...(d.titulo !== undefined && { titulo: d.titulo }),
      ...(d.resumen !== undefined && { resumen: d.resumen }),
      ...(d.contenido !== undefined && { contenido: d.contenido }),
      ...(d.autor !== undefined && { autor: d.autor }),
      ...(d.categoria !== undefined && { categoria: d.categoria }),
      ...(d.imagen !== undefined && { imagen: d.imagen }),
      ...(d.tags !== undefined && { tags: d.tags }),
      ...(d.publicado !== undefined && { publicado: d.publicado }),
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single()
  if (error || !data) return null
  return mapBlogPost(data)
}

export async function deleteBlogPost(id: string): Promise<boolean> {
  const { error } = await supabase.from('blog_posts').delete().eq('id', id)
  return !error
}
