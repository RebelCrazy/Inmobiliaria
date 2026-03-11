import { getPropiedades, getBlogPosts } from '@/lib/storage'
import Link from 'next/link'
import { Home, BookOpen, TrendingUp, Users, Plus, ArrowRight, Eye } from 'lucide-react'

export default async function DashboardPage() {
  const propiedades = await getPropiedades()
  const blogPosts = await getBlogPosts()

  const enVenta = propiedades.filter(p => p.tipo === 'venta').length
  const enRenta = propiedades.filter(p => p.tipo === 'renta').length
  const postsPublicados = blogPosts.filter(p => p.publicado).length

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
          Dashboard
        </h1>
        <p className="text-gray-500">Bienvenido al panel de administración de Elite Inmobiliaria</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          { label: 'Total Propiedades', value: propiedades.length, icon: Home, color: 'bg-purple-100 text-purple-700', change: 'Activas en el sistema' },
          { label: 'En Venta', value: enVenta, icon: TrendingUp, color: 'bg-blue-100 text-blue-700', change: 'Propiedades en venta' },
          { label: 'En Renta', value: enRenta, icon: Users, color: 'bg-emerald-100 text-emerald-700', change: 'Propiedades en renta' },
          { label: 'Artículos Blog', value: blogPosts.length, icon: BookOpen, color: 'bg-amber-100 text-amber-700', change: `${postsPublicados} publicados` },
        ].map(({ label, value, icon: Icon, color, change }) => (
          <div key={label} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center mb-4`}>
              <Icon size={22} />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>{value}</div>
            <div className="text-sm font-medium text-gray-600">{label}</div>
            <div className="text-xs text-gray-400 mt-1">{change}</div>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid lg:grid-cols-2 gap-8 mb-10">
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>Propiedades recientes</h2>
            <Link href="/admin/propiedades" className="text-purple-600 text-sm hover:text-purple-800 flex items-center gap-1">
              Ver todas <ArrowRight size={14} />
            </Link>
          </div>
          <div className="space-y-3">
            {propiedades.slice(0, 5).map(p => (
              <div key={p.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${p.tipo === 'venta' ? 'bg-purple-500' : 'bg-emerald-500'}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{p.titulo}</p>
                  <p className="text-xs text-gray-400">{p.tipo === 'venta' ? 'Venta' : 'Renta'} · {p.ciudad}</p>
                </div>
                <span className="text-xs font-medium text-gray-600 flex-shrink-0">
                  ${p.precio.toLocaleString('es-MX')}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>Artículos del blog</h2>
            <Link href="/admin/blog" className="text-purple-600 text-sm hover:text-purple-800 flex items-center gap-1">
              Ver todos <ArrowRight size={14} />
            </Link>
          </div>
          <div className="space-y-3">
            {blogPosts.slice(0, 4).map(post => (
              <div key={post.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${post.publicado ? 'bg-emerald-500' : 'bg-gray-300'}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{post.titulo}</p>
                  <p className="text-xs text-gray-400">{post.categoria} · {post.publicado ? 'Publicado' : 'Borrador'}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick actions buttons */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Link href="/admin/propiedades/nueva" className="btn-primary justify-center py-4">
          <Plus size={18} /> Nueva propiedad
        </Link>
        <Link href="/admin/blog/nuevo" className="btn-secondary justify-center py-4">
          <Plus size={18} /> Nuevo artículo
        </Link>
        <Link href="/" target="_blank" className="flex items-center gap-2 justify-center py-4 border-2 border-gray-200 text-gray-600 hover:border-gray-300 rounded-xl transition-all font-medium">
          <Eye size={18} /> Ver sitio web
        </Link>
      </div>
    </div>
  )
}
