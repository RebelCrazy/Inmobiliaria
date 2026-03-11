import { getPropiedades } from '@/lib/storage'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PropertyCard from '@/components/PropertyCard'
import { Key, CheckCircle } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Propiedades en Renta',
  description: 'Encuentra el departamento, casa o penthouse ideal para rentar en Ciudad de México. Propiedades de lujo con amenidades exclusivas.',
}

export default async function RentasPage() {
  const propiedades = await getPropiedades().filter(p => p.tipo === 'renta')

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-20 overflow-hidden" style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #2d1b69 50%, #5b21b6 100%)' }}>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute bottom-10 left-20 w-72 h-72 rounded-full bg-emerald-400 blur-3xl" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-emerald-400/10 border border-emerald-400/30 rounded-full px-4 py-2 mb-6">
              <Key size={14} className="text-emerald-400" />
              <span className="text-white/80 text-sm">{propiedades.length} propiedades en renta</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              Propiedades en Renta
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Vive en los mejores espacios de la ciudad. Departamentos amueblados, casas con jardín y penthouses con vista panorámica.
            </p>
          </div>
        </section>

        {/* Benefits */}
        <section className="bg-emerald-600 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                'Contratos de arrendamiento seguros y con asesoría legal',
                'Propiedades auditadas y con servicios al corriente',
                'Gestión integral: mantenimiento y administración',
              ].map(text => (
                <div key={text} className="flex items-center gap-3 text-white/90">
                  <CheckCircle size={18} className="text-emerald-200 flex-shrink-0" />
                  <span className="text-sm">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Properties grid */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {propiedades.length === 0 ? (
              <div className="text-center py-20">
                <Key size={48} className="text-purple-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-600">No hay propiedades en renta disponibles</h3>
                <p className="text-gray-400 mt-2">Pronto agregaremos nuevas propiedades</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {propiedades.map(p => (
                  <PropertyCard key={p.id} propiedad={p} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
