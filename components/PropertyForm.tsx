'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Save, ArrowLeft, Plus, X } from 'lucide-react'
import type { Propiedad } from '@/lib/storage'

type FormData = Omit<Propiedad, 'id' | 'createdAt' | 'updatedAt'>

const defaultForm: FormData = {
  titulo: '',
  descripcion: '',
  precio: 0,
  tipo: 'venta',
  categoria: 'departamento',
  habitaciones: 1,
  banos: 1,
  superficie: 0,
  estacionamientos: 1,
  direccion: '',
  ciudad: 'Ciudad de México',
  estado: 'CDMX',
  imagen: '',
  imagenes: [],
  amenidades: [],
  destacada: false,
}

interface PropertyFormProps {
  initialData?: Propiedad
  mode: 'create' | 'edit'
}

export default function PropertyForm({ initialData, mode }: PropertyFormProps) {
  const router = useRouter()
  const [form, setForm] = useState<FormData>(initialData ? {
    titulo: initialData.titulo,
    descripcion: initialData.descripcion,
    precio: initialData.precio,
    tipo: initialData.tipo,
    categoria: initialData.categoria,
    habitaciones: initialData.habitaciones,
    banos: initialData.banos,
    superficie: initialData.superficie,
    estacionamientos: initialData.estacionamientos,
    direccion: initialData.direccion,
    ciudad: initialData.ciudad,
    estado: initialData.estado,
    imagen: initialData.imagen,
    imagenes: initialData.imagenes,
    amenidades: initialData.amenidades,
    destacada: initialData.destacada,
  } : defaultForm)
  const [newAmenidad, setNewAmenidad] = useState('')
  const [newImagen, setNewImagen] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      let res
      if (mode === 'create') {
        res = await fetch('/api/propiedades', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        })
      } else {
        res = await fetch(`/api/propiedades/${initialData!.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        })
      }
      if (res.ok) {
        router.push('/admin/(panel)/propiedades')
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

  const addAmenidad = () => {
    if (newAmenidad.trim() && !form.amenidades.includes(newAmenidad.trim())) {
      setForm({ ...form, amenidades: [...form.amenidades, newAmenidad.trim()] })
      setNewAmenidad('')
    }
  }

  const removeAmenidad = (a: string) => {
    setForm({ ...form, amenidades: form.amenidades.filter(x => x !== a) })
  }

  const addImagen = () => {
    if (newImagen.trim() && !form.imagenes.includes(newImagen.trim())) {
      const updated = [...form.imagenes, newImagen.trim()]
      setForm({ ...form, imagenes: updated, imagen: form.imagen || newImagen.trim() })
      setNewImagen('')
    }
  }

  const removeImagen = (url: string) => {
    const updated = form.imagenes.filter(x => x !== url)
    setForm({ ...form, imagenes: updated, imagen: updated[0] || '' })
  }

  return (
    <form onSubmit={handleSubmit} className="p-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <button type="button" onClick={() => router.back()} className="flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm mb-2 transition-colors">
            <ArrowLeft size={16} /> Volver
          </button>
          <h1 className="text-3xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>
            {mode === 'create' ? 'Nueva propiedad' : 'Editar propiedad'}
          </h1>
        </div>
        <button type="submit" disabled={saving} className="btn-primary disabled:opacity-50">
          <Save size={18} /> {saving ? 'Guardando...' : 'Guardar'}
        </button>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 mb-6 text-sm">{error}</div>}

      <div className="space-y-6">
        {/* Basic info */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h2 className="font-semibold text-gray-900 mb-5">Información básica</h2>
          <div className="grid gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Título *</label>
              <input
                type="text"
                required
                value={form.titulo}
                onChange={e => setForm({ ...form, titulo: e.target.value })}
                className="form-input"
                placeholder="Ej: Penthouse de Lujo en Polanco"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Descripción *</label>
              <textarea
                required
                rows={4}
                value={form.descripcion}
                onChange={e => setForm({ ...form, descripcion: e.target.value })}
                className="form-input resize-none"
                placeholder="Describe detalladamente la propiedad..."
              />
            </div>
            <div className="grid sm:grid-cols-3 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Tipo *</label>
                <select value={form.tipo} onChange={e => setForm({ ...form, tipo: e.target.value as 'venta' | 'renta' })} className="form-input">
                  <option value="venta">Venta</option>
                  <option value="renta">Renta</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Categoría *</label>
                <select value={form.categoria} onChange={e => setForm({ ...form, categoria: e.target.value as Propiedad['categoria'] })} className="form-input">
                  <option value="casa">Casa</option>
                  <option value="departamento">Departamento</option>
                  <option value="penthouse">Penthouse</option>
                  <option value="terreno">Terreno</option>
                  <option value="local">Local Comercial</option>
                  <option value="oficina">Oficina</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Precio (MXN) *</label>
                <input
                  type="number"
                  required
                  value={form.precio}
                  onChange={e => setForm({ ...form, precio: Number(e.target.value) })}
                  className="form-input"
                  placeholder="0"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h2 className="font-semibold text-gray-900 mb-5">Características</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            {[
              { label: 'Habitaciones', key: 'habitaciones' },
              { label: 'Baños', key: 'banos' },
              { label: 'Superficie (m²)', key: 'superficie' },
              { label: 'Estacionamientos', key: 'estacionamientos' },
            ].map(({ label, key }) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
                <input
                  type="number"
                  min="0"
                  value={form[key as keyof FormData] as number}
                  onChange={e => setForm({ ...form, [key]: Number(e.target.value) })}
                  className="form-input"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Location */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h2 className="font-semibold text-gray-900 mb-5">Ubicación</h2>
          <div className="grid gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Dirección *</label>
              <input type="text" required value={form.direccion} onChange={e => setForm({ ...form, direccion: e.target.value })} className="form-input" placeholder="Calle, número y colonia" />
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Ciudad</label>
                <input type="text" value={form.ciudad} onChange={e => setForm({ ...form, ciudad: e.target.value })} className="form-input" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Estado</label>
                <input type="text" value={form.estado} onChange={e => setForm({ ...form, estado: e.target.value })} className="form-input" />
              </div>
            </div>
          </div>
        </div>

        {/* Images */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h2 className="font-semibold text-gray-900 mb-5">Imágenes</h2>
          <div className="flex gap-2 mb-4">
            <input
              type="url"
              value={newImagen}
              onChange={e => setNewImagen(e.target.value)}
              className="form-input flex-1"
              placeholder="https://... (URL de imagen)"
              onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addImagen())}
            />
            <button type="button" onClick={addImagen} className="btn-primary py-2.5">
              <Plus size={16} /> Agregar
            </button>
          </div>
          {form.imagenes.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {form.imagenes.map((url, i) => (
                <div key={url} className="relative group rounded-xl overflow-hidden border-2 border-gray-100 h-28">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={url} alt={`Imagen ${i+1}`} className="w-full h-full object-cover" />
                  {i === 0 && <span className="absolute top-2 left-2 bg-purple-600 text-white text-xs px-2 py-0.5 rounded-full">Principal</span>}
                  <button
                    type="button"
                    onClick={() => removeImagen(url)}
                    className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Amenities */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h2 className="font-semibold text-gray-900 mb-5">Amenidades</h2>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newAmenidad}
              onChange={e => setNewAmenidad(e.target.value)}
              className="form-input flex-1"
              placeholder="Ej: Alberca, Gym, Seguridad 24/7"
              onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addAmenidad())}
            />
            <button type="button" onClick={addAmenidad} className="btn-primary py-2.5">
              <Plus size={16} /> Agregar
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {form.amenidades.map(a => (
              <span key={a} className="inline-flex items-center gap-1.5 bg-purple-100 text-purple-700 px-3 py-1.5 rounded-full text-sm font-medium">
                {a}
                <button type="button" onClick={() => removeAmenidad(a)} className="hover:text-red-600 transition-colors">
                  <X size={13} />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Options */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h2 className="font-semibold text-gray-900 mb-5">Opciones</h2>
          <label className="flex items-center gap-3 cursor-pointer group">
            <div className={`w-12 h-6 rounded-full transition-colors ${form.destacada ? 'bg-purple-600' : 'bg-gray-300'}`} onClick={() => setForm({ ...form, destacada: !form.destacada })}>
              <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform mt-0.5 ml-0.5 ${form.destacada ? 'translate-x-6' : ''}`} />
            </div>
            <div>
              <span className="font-medium text-gray-900 text-sm">Propiedad destacada</span>
              <p className="text-xs text-gray-400">Aparecerá en la sección de propiedades destacadas en la página de inicio</p>
            </div>
          </label>
        </div>
      </div>

      <div className="mt-8 flex gap-3">
        <button type="submit" disabled={saving} className="btn-primary disabled:opacity-50">
          <Save size={18} /> {saving ? 'Guardando...' : 'Guardar propiedad'}
        </button>
        <button type="button" onClick={() => router.back()} className="btn-secondary">
          Cancelar
        </button>
      </div>
    </form>
  )
}
