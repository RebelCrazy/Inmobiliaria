import { kv } from '@vercel/kv'
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

const SEED_PROPIEDADES: Propiedad[] = [
  {
    id: 'prop-001',
    titulo: 'Penthouse de Lujo en Polanco',
    descripcion: 'Espectacular penthouse con terraza privada y vista panorámica de la ciudad. Acabados de primera con mármol italiano, cocina equipada con electrodomésticos de alta gama, sala de estar amplia con techos de doble altura y amenidades exclusivas del edificio.',
    precio: 12500000, tipo: 'venta', categoria: 'penthouse', habitaciones: 3, banos: 3, superficie: 380, estacionamientos: 2,
    direccion: 'Av. Presidente Masaryk 456, Polanco', ciudad: 'Ciudad de México', estado: 'CDMX',
    imagen: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800',
    imagenes: ['https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800'],
    amenidades: ['Terraza privada', 'Vista panorámica', 'Gym', 'Alberca', 'Seguridad 24/7', 'Concierge'],
    destacada: true, createdAt: '2024-01-15T10:00:00Z', updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 'prop-002',
    titulo: 'Casa Moderna en Las Lomas',
    descripcion: 'Hermosa residencia de diseño contemporáneo en una de las zonas más exclusivas de la ciudad. Jardín privado, alberca infinity, sala de cine y cuarto de servicio completo.',
    precio: 18900000, tipo: 'venta', categoria: 'casa', habitaciones: 5, banos: 4, superficie: 650, estacionamientos: 4,
    direccion: 'Calle Sierra Mojada 123, Lomas de Chapultepec', ciudad: 'Ciudad de México', estado: 'CDMX',
    imagen: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
    imagenes: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800'],
    amenidades: ['Jardín privado', 'Alberca infinity', 'Sala de cine', 'Cuarto de servicio'],
    destacada: true, createdAt: '2024-01-20T10:00:00Z', updatedAt: '2024-01-20T10:00:00Z',
  },
  {
    id: 'prop-003',
    titulo: 'Departamento Ejecutivo en Santa Fe',
    descripcion: 'Moderno departamento en torre ejecutiva con acabados de lujo. Vistas al bosque urbano, amenidades completas incluyendo coworking, sky lounge y spa.',
    precio: 28000, tipo: 'renta', categoria: 'departamento', habitaciones: 2, banos: 2, superficie: 120, estacionamientos: 1,
    direccion: 'Av. Santa Fe 505, Santa Fe', ciudad: 'Ciudad de México', estado: 'CDMX',
    imagen: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
    imagenes: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800'],
    amenidades: ['Sky lounge', 'Coworking', 'Spa', 'Gym', 'Alberca', 'Seguridad 24/7'],
    destacada: true, createdAt: '2024-02-01T10:00:00Z', updatedAt: '2024-02-01T10:00:00Z',
  },
  {
    id: 'prop-004',
    titulo: 'Suite Amueblada en Condesa',
    descripcion: 'Elegante suite totalmente amueblada en el corazón de la Condesa. Diseño interior por reconocida firma, balcón con vista al parque, todos los servicios incluidos.',
    precio: 35000, tipo: 'renta', categoria: 'departamento', habitaciones: 2, banos: 2, superficie: 95, estacionamientos: 1,
    direccion: 'Av. Amsterdam 78, Condesa', ciudad: 'Ciudad de México', estado: 'CDMX',
    imagen: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800',
    imagenes: ['https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800'],
    amenidades: ['Amueblado', 'Servicios incluidos', 'Balcón', 'Wifi de alta velocidad'],
    destacada: false, createdAt: '2024-03-01T10:00:00Z', updatedAt: '2024-03-01T10:00:00Z',
  },
]

const SEED_BLOG: BlogPost[] = [
  {
    id: 'blog-001', slug: 'como-invertir-en-bienes-raices-2024',
    titulo: 'Cómo Invertir en Bienes Raíces en 2024: Guía Completa',
    resumen: 'Descubre las mejores estrategias para invertir en el mercado inmobiliario mexicano, desde análisis de zonas hasta financiamiento óptimo.',
    contenido: 'El mercado inmobiliario en México sigue siendo una de las inversiones más sólidas disponibles.\n\n## ¿Por qué invertir en bienes raíces?\n\nLos bienes raíces ofrecen múltiples ventajas: protección contra la inflación, flujo de efectivo mediante rentas y plusvalía a largo plazo.\n\n## Las mejores zonas para invertir en CDMX\n\nAlgunas de las zonas con mayor potencial incluyen Roma Norte, Santa Fe, Polanco y zonas emergentes como Doctores.\n\n## Conclusión\n\nInvertir en bienes raíces requiere análisis, paciencia y asesoría profesional.',
    autor: 'Equipo Elite Inmobiliaria', categoria: 'Inversión',
    imagen: 'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=800',
    tags: ['inversión', 'bienes raíces', 'CDMX'], publicado: true,
    createdAt: '2024-01-10T10:00:00Z', updatedAt: '2024-01-10T10:00:00Z',
  },
  {
    id: 'blog-002', slug: 'tendencias-diseno-interior-residencias-lujo',
    titulo: 'Tendencias de Diseño Interior para Residencias de Lujo 2024',
    resumen: 'Los espacios de lujo en 2024 se caracterizan por la fusión de materiales naturales con tecnología de punta.',
    contenido: 'El diseño interior de las residencias de lujo está marcado por bienestar, sostenibilidad y tecnología.\n\n## Biofilia y materiales naturales\n\nLa tendencia biofílica domina el mercado premium con uso extensivo de madera, piedra natural y plantas integradas en la arquitectura.\n\n## Tecnología invisible\n\nLa domótica avanzada se integra de forma discreta: iluminación inteligente, control de temperatura y audio distribuido.',
    autor: 'Arq. Laura Mendoza', categoria: 'Diseño',
    imagen: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800',
    tags: ['diseño interior', 'lujo', 'tendencias'], publicado: true,
    createdAt: '2024-02-05T10:00:00Z', updatedAt: '2024-02-05T10:00:00Z',
  },
  {
    id: 'blog-003', slug: 'guia-proceso-compra-inmueble-mexico',
    titulo: 'Guía Paso a Paso: El Proceso de Compra de un Inmueble en México',
    resumen: 'Desde la búsqueda hasta la escritura notarial, te explicamos cada etapa del proceso de compra en México.',
    contenido: 'Comprar un inmueble es una de las decisiones financieras más importantes. En México tiene particularidades legales que debes conocer.\n\n## Paso 1: Definir tu presupuesto\n\nConsidera impuestos de adquisición (2%), honorarios notariales (1-2%) y derechos de registro.\n\n## Paso 2: Due diligence\n\nVerifica libertad de gravámenes en el Registro Público de la Propiedad.\n\n## Paso 3: El cierre notarial\n\nToda compraventa debe formalizarse ante Notario Público, quien elabora la escritura y gestiona el registro.',
    autor: 'Lic. Carlos Herrera', categoria: 'Legal',
    imagen: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800',
    tags: ['compra', 'proceso', 'legal', 'México'], publicado: true,
    createdAt: '2024-03-01T10:00:00Z', updatedAt: '2024-03-01T10:00:00Z',
  },
]

const KEYS = {
  propiedades: 'elite:propiedades',
  blog: 'elite:blog',
  seeded: 'elite:seeded',
}

async function ensureSeeded() {
  const seeded = await kv.get(KEYS.seeded)
  if (!seeded) {
    await kv.set(KEYS.propiedades, JSON.stringify(SEED_PROPIEDADES))
    await kv.set(KEYS.blog, JSON.stringify(SEED_BLOG))
    await kv.set(KEYS.seeded, '1')
  }
}

function parse<T>(raw: unknown): T[] {
  if (!raw) return []
  if (typeof raw === 'string') return JSON.parse(raw)
  if (Array.isArray(raw)) return raw as T[]
  return []
}

// ─── Propiedades ──────────────────────────────────────────────────────────────
export async function getPropiedades(): Promise<Propiedad[]> {
  await ensureSeeded()
  const raw = await kv.get(KEYS.propiedades)
  return parse<Propiedad>(raw)
}

export async function getPropiedadById(id: string): Promise<Propiedad | undefined> {
  const all = await getPropiedades()
  return all.find(p => p.id === id)
}

export async function createPropiedad(data: Omit<Propiedad, 'id' | 'createdAt' | 'updatedAt'>): Promise<Propiedad> {
  const all = await getPropiedades()
  const nueva: Propiedad = { ...data, id: `prop-${uuidv4().slice(0, 8)}`, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
  all.push(nueva)
  await kv.set(KEYS.propiedades, JSON.stringify(all))
  return nueva
}

export async function updatePropiedad(id: string, data: Partial<Omit<Propiedad, 'id' | 'createdAt'>>): Promise<Propiedad | null> {
  const all = await getPropiedades()
  const idx = all.findIndex(p => p.id === id)
  if (idx === -1) return null
  all[idx] = { ...all[idx], ...data, updatedAt: new Date().toISOString() }
  await kv.set(KEYS.propiedades, JSON.stringify(all))
  return all[idx]
}

export async function deletePropiedad(id: string): Promise<boolean> {
  const all = await getPropiedades()
  const filtered = all.filter(p => p.id !== id)
  if (filtered.length === all.length) return false
  await kv.set(KEYS.propiedades, JSON.stringify(filtered))
  return true
}

// ─── Blog ──────────────────────────────────────────────────────────────────────
export async function getBlogPosts(soloPublicados = false): Promise<BlogPost[]> {
  await ensureSeeded()
  const raw = await kv.get(KEYS.blog)
  const posts = parse<BlogPost>(raw)
  return soloPublicados ? posts.filter(p => p.publicado) : posts
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const all = await getBlogPosts()
  return all.find(p => p.slug === slug)
}

export async function getBlogPostById(id: string): Promise<BlogPost | undefined> {
  const all = await getBlogPosts()
  return all.find(p => p.id === id)
}

export async function createBlogPost(data: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>): Promise<BlogPost> {
  const all = await getBlogPosts()
  const nuevo: BlogPost = { ...data, id: `blog-${uuidv4().slice(0, 8)}`, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
  all.push(nuevo)
  await kv.set(KEYS.blog, JSON.stringify(all))
  return nuevo
}

export async function updateBlogPost(id: string, data: Partial<Omit<BlogPost, 'id' | 'createdAt'>>): Promise<BlogPost | null> {
  const all = await getBlogPosts()
  const idx = all.findIndex(p => p.id === id)
  if (idx === -1) return null
  all[idx] = { ...all[idx], ...data, updatedAt: new Date().toISOString() }
  await kv.set(KEYS.blog, JSON.stringify(all))
  return all[idx]
}

export async function deleteBlogPost(id: string): Promise<boolean> {
  const all = await getBlogPosts()
  const filtered = all.filter(p => p.id !== id)
  if (filtered.length === all.length) return false
  await kv.set(KEYS.blog, JSON.stringify(filtered))
  return true
}
