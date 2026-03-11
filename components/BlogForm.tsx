'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Save, ArrowLeft } from 'lucide-react'
import type { BlogPost } from '@/lib/storage'

type FormData = Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>

const defaultForm: FormData = {
  slug: '',
  titulo: '',
  resumen: '',
  contenido: '',
  autor: '',
  categoria: 'Inversión',
  imagen: '',
  tags: [],
  publicado: false,
}

interface BlogFormProps {
  initialData?: BlogPost
  mode: 'create' | 'edit'
}

export default function BlogForm({ initialData, mode }: BlogFormProps) {
  const router = useRouter()
  const [form, setForm] = useState<FormData>(initialData ? {
    slug: initialData.slug,
    titulo: initialData.titulo,
    resumen: initialData.resumen,
    contenido: initialData.contenido,
    autor: initialData.autor,
    categoria: initialData.categoria,
    imagen: initialData.imagen,
    tags: initialData.tags,
    publicado: initialData.publicado,
  } : defaultForm)
  const [tagInput, setTagInput] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const generateSlug = (titulo: string) => {
    return titulo
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  const handleTituloChange = (titulo: string) => {
    setForm({ ...form, titulo, slug: mode === 'create' ? generateSlug(titulo) : form.slug })
  }

  const addTag = () => {
    if (tagInput.trim() && !form.tags.includes(tagInput.trim())) {
      setForm({ ...form, tags: [...form.tags, tagInput.trim()] })
      setTagInput('')
    }
  }

  const removeTag = (tag: string) => {
    setForm({ ...form, tags: form.tags.filter(t => t !== tag) })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      let res
      if (mode === 'create') {
        res = await fetch('/api/blog', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        })
      } else {
        res = await fetch(`/api/blog?id=${initialData!.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        })
      }
      if (res.ok) {
        router.push('/admin/(panel)/blog')
        router.refresh()
      } else {
        setError('Error al guardar. Intenta de nuevo.')
      }
    } catch {
      setError('Error de conexión.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-8 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <button type="button" onClick={() => router.back()} className="flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm mb-2 transition-colors">
            <ArrowLeft size={16} /> Volver
          </button>
          <h1 className="text-3xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>
            {mode === 'create' ? 'Nuevo artículo' : 'Editar artículo'}
          </h1>
        </div>
        <div className="flex gap-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <div className={`w-10 h-5 rounded-full transition-colors ${form.publicado ? 'bg-emerald-500' : 'bg-gray-300'}`} onClick={() => setForm({ ...form, publicado: !form.publicado })}>
              <div className={`w-4 h-4 bg-white rounded-full shadow transition-transform mt-0.5 ml-0.5 ${form.publicado ? 'translate-x-5' : ''}`} />
            </div>
            <span className="text-sm font-medium text-gray-700">{form.publicado ? 'Publicado' : 'Borrador'}</span>
          </label>
          <button type="submit" disabled={saving} className="btn-primary disabled:opacity-50">
            <Save size={18} /> {saving ? 'Guardando...' : 'Guardar'}
          </button>
        </div>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 mb-6 text-sm">{error}</div>}

      <div className="space-y-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h2 className="font-semibold text-gray-900 mb-5">Información del artículo</h2>
          <div className="grid gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Título *</label>
              <input type="text" required value={form.titulo} onChange={e => handleTituloChange(e.target.value)} className="form-input" placeholder="Título del artículo" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Slug (URL) *</label>
              <input type="text" required value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} className="form-input font-mono text-sm" placeholder="titulo-del-articulo" />
              <p className="text-xs text-gray-400 mt-1">URL: /blog/{form.slug || 'slug-del-articulo'}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Resumen / Descripción SEO *</label>
              <textarea rows={2} required value={form.resumen} onChange={e => setForm({ ...form, resumen: e.target.value })} className="form-input resize-none" placeholder="Breve descripción del artículo (aparece en listas y SEO)" />
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Autor *</label>
                <input type="text" required value={form.autor} onChange={e => setForm({ ...form, autor: e.target.value })} className="form-input" placeholder="Nombre del autor" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Categoría</label>
                <select value={form.categoria} onChange={e => setForm({ ...form, categoria: e.target.value })} className="form-input">
                  {['Inversión', 'Diseño', 'Legal', 'Mercado', 'Consejos', 'Noticias'].map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Imagen de portada (URL)</label>
              <input type="url" value={form.imagen} onChange={e => setForm({ ...form, imagen: e.target.value })} className="form-input" placeholder="https://images.unsplash.com/..." />
              {form.imagen && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={form.imagen} alt="Preview" className="mt-3 h-32 rounded-xl object-cover w-full" />
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h2 className="font-semibold text-gray-900 mb-2">Contenido del artículo</h2>
          <p className="text-xs text-gray-400 mb-4">Usa ## para subtítulos (ej: ## Mi subtítulo). Separa párrafos con una línea en blanco.</p>
          <textarea
            required
            rows={18}
            value={form.contenido}
            onChange={e => setForm({ ...form, contenido: e.target.value })}
            className="form-input resize-y font-mono text-sm leading-relaxed"
            placeholder="## Introducción&#10;&#10;Escribe el contenido aquí...&#10;&#10;## Sección 2&#10;&#10;Más contenido..."
          />
        </div>

        {/* Tags */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h2 className="font-semibold text-gray-900 mb-5">Tags / Etiquetas</h2>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={tagInput}
              onChange={e => setTagInput(e.target.value)}
              className="form-input flex-1"
              placeholder="Ej: inversión, bienes raíces"
              onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())}
            />
            <button type="button" onClick={addTag} className="btn-primary py-2.5">Agregar</button>
          </div>
          <div className="flex flex-wrap gap-2">
            {form.tags.map(tag => (
              <span key={tag} className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full text-sm">
                #{tag}
                <button type="button" onClick={() => removeTag(tag)} className="hover:text-red-500 transition-colors">×</button>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 flex gap-3">
        <button type="submit" disabled={saving} className="btn-primary disabled:opacity-50">
          <Save size={18} /> {saving ? 'Guardando...' : 'Guardar artículo'}
        </button>
        <button type="button" onClick={() => router.back()} className="btn-secondary">Cancelar</button>
      </div>
    </form>
  )
}
