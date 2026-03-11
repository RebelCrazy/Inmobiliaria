import { getPropiedadById, getPropiedades } from '@/lib/storage'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PropertyCard from '@/components/PropertyCard'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Bed, Bath, Car, Maximize2, MapPin, CheckCircle, ArrowLeft, Phone, Mail } from 'lucide-react'
import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const p = await getPropiedadById(params.id)
  if (!p) return { title: 'Propiedad no encontrada' }
  return { title: p.titulo, description: p.descripcion.slice(0, 160) }
}

function formatPrice(precio: number, tipo: string) {
  if (tipo === 'renta') return `$${precio.toLocaleString('es-MX')}/mes`
  if (precio >= 1000000) return `$${(precio / 1000000).toFixed(1)}M MXN`
  return `$${precio.toLocaleString('es-MX')} MXN`
}

export default async function PropiedadPage({ params }: { params: { id: string } }) {
  const propiedad = await getPropiedadById(params.id)
  if (!propiedad) notFound()

  const todas = await getPropiedades()
  const similares = todas.filter(p => p.id !== propiedad.id && p.tipo === propiedad.tipo).slice(0, 3)

  return (
    <>
      <Navbar />
      <main className="pt-20">
        <div className="relative h-[60vh] bg-gray-900">
          <Image src={propiedad.imagen} alt={propiedad.titulo} fill className="object-cover opacity-90" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40" />
          <div className="absolute top-6 left-6">
            <Link href={propiedad.tipo === 'venta' ? '/ventas' : '/rentas'} className="flex items-center gap-2 text-white bg-black/30 backdrop-blur-sm px-4 py-2 rounded-xl text-sm hover:bg-black/50 transition-all">
              <ArrowLeft size={16} /> Volver a {propiedad.tipo === 'venta' ? 'ventas' : 'rentas'}
            </Link>
          </div>
          <div className="absolute bottom-6 left-6 flex gap-2">
            <span className={`px-4 py-2 rounded-full text-sm font-bold uppercase ${propiedad.tipo === 'venta' ? 'bg-purple-700 text-white' : 'bg-emerald-500 text-white'}`}>
              {propiedad.tipo === 'venta' ? 'En Venta' : 'En Renta'}
            </span>
            {propiedad.destacada && <span className="px-4 py-2 rounded-full text-sm font-bold uppercase bg-amber-400 text-amber-900">Destacada</span>}
          </div>
        </div>

        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
                  <div>
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>{propiedad.titulo}</h1>
                    <div className="flex items-center gap-1.5 text-gray-500 mt-2">
                      <MapPin size={16} className="text-purple-600" />
                      <span>{propiedad.direccion}, {propiedad.ciudad}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-purple-700" style={{ fontFamily: 'Playfair Display, serif' }}>{formatPrice(propiedad.precio, propiedad.tipo)}</div>
                    {propiedad.tipo === 'renta' && <p className="text-gray-400 text-sm">+ servicios</p>}
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
                  {[
                    { icon: Bed, label: 'Habitaciones', value: propiedad.habitaciones },
                    { icon: Bath, label: 'Baños', value: propiedad.banos },
                    { icon: Maximize2, label: 'Superficie', value: `${propiedad.superficie} m²` },
                    { icon: Car, label: 'Estacionamientos', value: propiedad.estacionamientos },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="bg-purple-50 rounded-2xl p-5 text-center">
                      <Icon size={24} className="text-purple-600 mx-auto mb-2" />
                      <div className="font-bold text-gray-900 text-lg">{value}</div>
                      <div className="text-gray-500 text-xs">{label}</div>
                    </div>
                  ))}
                </div>

                <div className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>Descripción</h2>
                  <p className="text-gray-600 leading-relaxed text-[1.05rem]">{propiedad.descripcion}</p>
                </div>

                {propiedad.amenidades.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>Amenidades</h2>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {propiedad.amenidades.map(a => (
                        <div key={a} className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
                          <CheckCircle size={18} className="text-purple-600 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">{a}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="lg:col-span-1">
                <div className="sticky top-28">
                  <div className="bg-white rounded-3xl border-2 border-purple-100 shadow-xl p-8">
                    <div className="text-center mb-6">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center mx-auto mb-3 text-white text-2xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>E</div>
                      <h3 className="font-bold text-gray-900">Asesor Elite</h3>
                      <p className="text-gray-500 text-sm">Especialista en propiedades</p>
                    </div>
                    <div className="space-y-3 mb-6">
                      <a href="tel:+525512345678" className="flex items-center gap-3 p-3 rounded-xl bg-purple-50 hover:bg-purple-100 transition-colors">
                        <Phone size={18} className="text-purple-600" />
                        <span className="text-sm font-medium text-gray-700">+52 55 1234 5678</span>
                      </a>
                      <a href="mailto:hola@eliteinmobiliaria.mx" className="flex items-center gap-3 p-3 rounded-xl bg-purple-50 hover:bg-purple-100 transition-colors">
                        <Mail size={18} className="text-purple-600" />
                        <span className="text-sm font-medium text-gray-700 truncate">hola@eliteinmobiliaria.mx</span>
                      </a>
                    </div>
                    <Link href={`/contacto?propiedad=${encodeURIComponent(propiedad.titulo)}`} className="btn-primary w-full justify-center py-4">
                      Solicitar información
                    </Link>
                    <p className="text-center text-xs text-gray-400 mt-4">Te respondemos en menos de 2 horas</p>
                  </div>
                  <div className="mt-4 bg-purple-700 rounded-2xl p-5 text-center">
                    <p className="text-white/80 text-sm mb-1">¿Necesitas financiamiento?</p>
                    <p className="text-white font-medium text-sm">Te ayudamos con tu crédito hipotecario</p>
                    <Link href="/contacto" className="mt-3 inline-block text-purple-200 hover:text-white text-xs underline transition-colors">Calcular mensualidad</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {similares.length > 0 && (
          <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-10" style={{ fontFamily: 'Playfair Display, serif' }}>Propiedades similares</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {similares.map(p => <PropertyCard key={p.id} propiedad={p} />)}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  )
}
