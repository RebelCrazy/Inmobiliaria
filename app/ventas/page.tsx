import { getPropiedades } from '@/lib/storage'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PropertyCard from '@/components/PropertyCard'
import { Home, TrendingUp, Shield } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Propiedades en Venta',
  description: 'Explora nuestro portafolio exclusivo de propiedades en venta en Ciudad de México. Casas, departamentos y penthouses de lujo.',
}

export default async function VentasPage() {
  const propiedades = await getPropiedades().filter(p => p.tipo === 'venta')

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-20 hero-gradient overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 right-20 w-72 h-72 rounded-full bg-purple-400 blur-3xl" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-6">
              <Home size={14} className="text-purple-300" />
              <span className="text-white/80 text-sm">{propiedades.length} propiedades disponibles</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              Propiedades en Venta
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Descubre nuestra selección exclusiva de casas, departamentos y penthouses en las mejores zonas de Ciudad de México.
            </p>
          </div>
        </section>

        {/* Benefits bar */}
        <section className="bg-purple-700 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: Shield, text: 'Propiedades verificadas y con documentación al día' },
                { icon: TrendingUp, text: 'Asesoría en financiamiento y crédito hipotecario' },
                { icon: Home, text: 'Acompañamiento legal hasta el cierre notarial' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3 text-white/90">
                  <Icon size={20} className="text-purple-300 flex-shrink-0" />
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
                <Home size={48} className="text-purple-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-600">No hay propiedades en venta disponibles</h3>
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
