'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus, Pencil, Trash2, Search, Home, RefreshCw } from 'lucide-react'
import type { Propiedad } from '@/lib/storage'

export default function AdminPropiedadesPage() {
  const [propiedades, setPropiedades] = useState<Propiedad[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filtroTipo, setFiltroTipo] = useState('todos')

  const fetchPropiedades = async () => {
    setLoading(true)
    const res = await fetch('/api/propiedades')
    const data = await res.json()
    setPropiedades(data)
    setLoading(false)
  }

  useEffect(() => { fetchPropiedades() }, [])

  const handleDelete = async (id: string, titulo: string) => {
    if (!confirm(`¿Eliminar "${titulo}"? Esta acción no se puede deshacer.`)) return
    await fetch(`/api/propiedades/${id}`, { method: 'DELETE' })
    fetchPropiedades()
  }

  const filtered = propiedades.filter(p => {
    const matchSearch = p.titulo.toLowerCase().includes(search.toLowerCase()) ||
      p.ciudad.toLowerCase().includes(search.toLowerCase())
    const matchTipo = filtroTipo === 'todos' || p.tipo === filtroTipo
    return matchSearch && matchTipo
  })

  return (
    <div className="p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>
            Propiedades
          </h1>
          <p className="text-gray-500 text-sm mt-1">{propiedades.length} propiedades en total</p>
        </div>
        <Link href="/admin/propiedades/nueva" className="btn-primary">
          <Plus size={18} /> Nueva propiedad
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm mb-6 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por nombre o ciudad..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
          />
        </div>
        <select
          value={filtroTipo}
          onChange={e => setFiltroTipo(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm bg-white"
        >
          <option value="todos">Todos los tipos</option>
          <option value="venta">Venta</option>
          <option value="renta">Renta</option>
        </select>
        <button onClick={fetchPropiedades} className="p-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors text-gray-500">
          <RefreshCw size={16} />
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-48">
            <div className="w-8 h-8 border-3 border-purple-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <Home size={40} className="text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No se encontraron propiedades</p>
            <Link href="/admin/propiedades/nueva" className="mt-4 inline-flex items-center gap-2 text-purple-600 text-sm font-medium">
              <Plus size={14} /> Agregar la primera propiedad
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Propiedad</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Tipo</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Precio</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Ciudad</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Destacada</th>
                  <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map(p => (
                  <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                          {p.imagen && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={p.imagen} alt={p.titulo} className="w-full h-full object-cover" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 text-sm">{p.titulo}</p>
                          <p className="text-xs text-gray-400">{p.categoria} · {p.superficie}m²</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        p.tipo === 'venta'
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-emerald-100 text-emerald-700'
                      }`}>
                        {p.tipo === 'venta' ? 'Venta' : 'Renta'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-gray-900">
                        ${p.precio.toLocaleString('es-MX')}
                        {p.tipo === 'renta' && <span className="text-gray-400 font-normal">/mes</span>}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">{p.ciudad}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`w-2 h-2 rounded-full inline-block ${p.destacada ? 'bg-amber-400' : 'bg-gray-300'}`} />
                      <span className="text-xs text-gray-500 ml-2">{p.destacada ? 'Sí' : 'No'}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/propiedades/${p.id}/editar`}
                          className="p-2 rounded-lg text-gray-500 hover:text-purple-700 hover:bg-purple-50 transition-all"
                          title="Editar"
                        >
                          <Pencil size={15} />
                        </Link>
                        <button
                          onClick={() => handleDelete(p.id, p.titulo)}
                          className="p-2 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 transition-all"
                          title="Eliminar"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
