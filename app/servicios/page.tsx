import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { Home, Key, Scale, TrendingUp, Building2, HeartHandshake, ArrowRight, CheckCircle } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Servicios Inmobiliarios',
  description: 'Ofrecemos asesoría integral en compraventa, rentas, avalúos, gestión legal y administración de inmuebles en Ciudad de México.',
}

const servicios = [
  {
    icon: Home,
    titulo: 'Asesoría de Compra',
    descripcion: 'Te guiamos en todo el proceso de compra de tu propiedad ideal, desde la búsqueda hasta el cierre notarial, asegurándonos de que obtengas las mejores condiciones.',
    beneficios: [
      'Búsqueda personalizada de propiedades',
      'Análisis comparativo de mercado',
      'Negociación del precio y condiciones',
      'Acompañamiento legal y notarial',
      'Gestión de crédito hipotecario',
    ],
    color: 'from-purple-500 to-purple-700',
    bg: 'bg-purple-50',
  },
  {
    icon: Key,
    titulo: 'Gestión de Rentas',
    descripcion: 'Administramos tu propiedad en renta o te ayudamos a encontrar el espacio perfecto para vivir, con contratos seguros y respaldo legal completo.',
    beneficios: [
      'Investigación y selección de inquilinos',
      'Contratos de arrendamiento legales',
      'Administración mensual de pagos',
      'Mantenimiento preventivo y correctivo',
      'Gestión de fianza y depósitos',
    ],
    color: 'from-emerald-500 to-emerald-700',
    bg: 'bg-emerald-50',
  },
  {
    icon: TrendingUp,
    titulo: 'Avalúos Comerciales',
    descripcion: 'Valuación profesional de inmuebles para compraventa, herencias, garantías hipotecarias o trámites fiscales, emitidos por peritos valuadores certificados.',
    beneficios: [
      'Peritos valuadores certificados',
      'Avalúos para todos los propósitos',
      'Entrega en 48-72 horas',
      'Avalúo comercial y catastral',
      'Validez ante instituciones financieras',
    ],
    color: 'from-amber-500 to-amber-700',
    bg: 'bg-amber-50',
  },
  {
    icon: Scale,
    titulo: 'Asesoría Legal',
    descripcion: 'Nuestro equipo de abogados especializados en derecho inmobiliario te protege en cada transacción, revisando contratos y asegurando operaciones sin riesgos.',
    beneficios: [
      'Revisión de contratos y escrituras',
      'Due diligence legal completo',
      'Asesoría en sucesiones y herencias',
      'Regularización de propiedades',
      'Litigios inmobiliarios',
    ],
    color: 'from-blue-500 to-blue-700',
    bg: 'bg-blue-50',
  },
  {
    icon: Building2,
    titulo: 'Administración de Inmuebles',
    descripcion: 'Nos encargamos de la gestión integral de tus propiedades: cobranza, mantenimiento, contratos y reportes mensuales para maximizar tu inversión.',
    beneficios: [
      'Cobranza de rentas y cuotas',
      'Supervisión de mantenimientos',
      'Reporte mensual de gestión',
      'Renovación automática de contratos',
      'Atención a inquilinos 24/7',
    ],
    color: 'from-rose-500 to-rose-700',
    bg: 'bg-rose-50',
  },
  {
    icon: HeartHandshake,
    titulo: 'Asesoría de Inversión',
    descripcion: 'Identificamos las mejores oportunidades de inversión inmobiliaria según tu perfil, capital disponible y objetivos de rendimiento a corto y largo plazo.',
    beneficios: [
      'Análisis de retorno de inversión',
      'Portafolio de preventa exclusiva',
      'Estrategias de diversificación',
      'Análisis de zonas con alta plusvalía',
      'Seguimiento continuo de la inversión',
    ],
    color: 'from-violet-500 to-violet-700',
    bg: 'bg-violet-50',
  },
]

export default async function ServiciosPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-20 hero-gradient overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-1/3 w-72 h-72 rounded-full bg-purple-400 blur-3xl" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              Nuestros Servicios
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Más de 15 años ofreciendo servicios inmobiliarios integrales con excelencia, transparencia y resultados comprobados.
            </p>
          </div>
        </section>

        {/* Services grid */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {servicios.map(({ icon: Icon, titulo, descripcion, beneficios, color, bg }) => (
                <div key={titulo} className={`${bg} rounded-2xl p-8 border border-white hover:shadow-xl transition-all duration-300`}>
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-6 shadow-lg`}>
                    <Icon size={24} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
                    {titulo}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">{descripcion}</p>
                  <ul className="space-y-2.5 mb-8">
                    {beneficios.map(b => (
                      <li key={b} className="flex items-center gap-2.5 text-sm text-gray-700">
                        <CheckCircle size={15} className="text-purple-600 flex-shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <Link href="/contacto" className="flex items-center gap-2 text-purple-700 font-medium text-sm hover:gap-3 transition-all">
                    Solicitar servicio <ArrowRight size={16} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                Nuestro Proceso
              </h2>
              <p className="text-gray-500 max-w-xl mx-auto">Simple, transparente y orientado a tus resultados</p>
            </div>
            <div className="grid md:grid-cols-4 gap-8 relative">
              <div className="hidden md:block absolute top-10 left-1/4 right-1/4 h-0.5 bg-purple-200" />
              {[
                { step: '01', title: 'Consulta inicial', desc: 'Conversamos sobre tus necesidades, presupuesto y objetivos específicos.' },
                { step: '02', title: 'Propuesta personalizada', desc: 'Diseñamos una estrategia a la medida de tus requerimientos.' },
                { step: '03', title: 'Ejecución', desc: 'Nuestro equipo trabaja activamente para lograr tus objetivos.' },
                { step: '04', title: 'Cierre y seguimiento', desc: 'Formalizamos el resultado y te acompañamos post-cierre.' },
              ].map(({ step, title, desc }) => (
                <div key={step} className="text-center relative">
                  <div className="w-20 h-20 rounded-full bg-purple-700 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-5 shadow-lg shadow-purple-300" style={{ fontFamily: 'Playfair Display, serif' }}>
                    {step}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
                  <p className="text-gray-500 text-sm">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-purple-700">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-white mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              ¿Necesitas más información?
            </h2>
            <p className="text-purple-200 mb-10">
              Agenda una consulta gratuita con nuestros especialistas y descubre cómo podemos ayudarte.
            </p>
            <Link href="/contacto" className="bg-white text-purple-700 hover:bg-purple-50 font-semibold px-8 py-4 rounded-xl transition-all inline-flex items-center gap-2">
              Contactar ahora <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
