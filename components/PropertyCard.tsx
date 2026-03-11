import Link from 'next/link'
import Image from 'next/image'
import { Bed, Bath, Car, Maximize2, MapPin, Tag } from 'lucide-react'
import { Propiedad } from '@/lib/storage'

interface PropertyCardProps {
  propiedad: Propiedad
}

function formatPrice(precio: number, tipo: string) {
  if (tipo === 'renta') {
    return `$${precio.toLocaleString('es-MX')}/mes`
  }
  if (precio >= 1000000) {
    return `$${(precio / 1000000).toFixed(1)}M`
  }
  return `$${precio.toLocaleString('es-MX')}`
}

const categoriaLabel: Record<string, string> = {
  casa: 'Casa',
  departamento: 'Departamento',
  penthouse: 'Penthouse',
  terreno: 'Terreno',
  local: 'Local Comercial',
  oficina: 'Oficina',
}

export default function PropertyCard({ propiedad }: PropertyCardProps) {
  return (
    <Link href={`/propiedad/${propiedad.id}`} className="group block">
      <div className="card-hover bg-white rounded-2xl overflow-hidden border border-purple-100/50 shadow-sm">
        {/* Image */}
        <div className="relative h-56 overflow-hidden">
          <Image
            src={propiedad.imagen}
            alt={propiedad.titulo}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
              propiedad.tipo === 'venta'
                ? 'bg-purple-700 text-white'
                : 'bg-emerald-500 text-white'
            }`}>
              {propiedad.tipo === 'venta' ? 'Venta' : 'Renta'}
            </span>
            {propiedad.destacada && (
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-amber-400 text-amber-900">
                Destacada
              </span>
            )}
          </div>

          {/* Category */}
          <div className="absolute bottom-3 left-3">
            <span className="flex items-center gap-1 text-white/90 text-xs font-medium">
              <Tag size={11} />
              {categoriaLabel[propiedad.categoria] || propiedad.categoria}
            </span>
          </div>

          {/* Price */}
          <div className="absolute bottom-3 right-3">
            <span className="bg-white/95 text-purple-700 font-bold text-sm px-3 py-1.5 rounded-lg">
              {formatPrice(propiedad.precio, propiedad.tipo)}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-700 transition-colors">
            {propiedad.titulo}
          </h3>

          <div className="flex items-center gap-1.5 text-gray-500 text-xs mb-4">
            <MapPin size={12} />
            <span className="truncate">{propiedad.direccion}</span>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
            {propiedad.habitaciones > 0 && (
              <div className="flex items-center gap-1.5 text-gray-600 text-xs">
                <Bed size={14} className="text-purple-500" />
                <span>{propiedad.habitaciones} hab.</span>
              </div>
            )}
            <div className="flex items-center gap-1.5 text-gray-600 text-xs">
              <Bath size={14} className="text-purple-500" />
              <span>{propiedad.banos} baños</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-600 text-xs">
              <Maximize2 size={14} className="text-purple-500" />
              <span>{propiedad.superficie} m²</span>
            </div>
            {propiedad.estacionamientos > 0 && (
              <div className="flex items-center gap-1.5 text-gray-600 text-xs ml-auto">
                <Car size={14} className="text-purple-500" />
                <span>{propiedad.estacionamientos}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
