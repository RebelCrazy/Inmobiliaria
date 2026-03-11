import Link from 'next/link'
import Image from 'next/image'
import { getPropiedades, getBlogPosts } from '@/lib/storage'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PropertyCard from '@/components/PropertyCard'
import { ArrowRight, Shield, Award, Clock, TrendingUp, Star, ChevronRight } from 'lucide-react'

export default async function HomePage() {
  const propiedades = await getPropiedades()
  const destacadas = propiedades.filter(p => p.destacada).slice(0, 3)
  const blogPosts = await getBlogPosts(true)
  const blogRecientes = blogPosts.slice(0, 3)

  return (
    <>
      <Navbar />
      <main>
        {/* ── Hero ── */}
        <section className="relative min-h-screen flex items-center hero-gradient overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-96 h-96 rounded-full bg-purple-400 blur-3xl" />
            <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-purple-600 blur-3xl" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-8">
                  <Star size={14} className="text-amber-400 fill-amber-400" />
                  <span className="text-white/90 text-sm font-medium">+500 Propiedades Exclusivas</span>
                </div>
                <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Encuentra tu{' '}<span className="italic text-purple-300">hogar</span>{' '}ideal
                </h1>
                <p className="text-white/70 text-lg leading-relaxed mb-10 max-w-md">
                  Especialistas en propiedades de lujo en Ciudad de México. Te acompañamos en cada paso hasta que encuentres el espacio perfecto.
                </p>
                <div className="flex flex-wrap gap-4 mb-14">
                  <Link href="/ventas" className="bg-white text-purple-700 hover:bg-purple-50 font-semibold px-8 py-4 rounded-xl transition-all duration-200 flex items-center gap-2 shadow-xl">
                    Ver Propiedades <ArrowRight size={18} />
                  </Link>
                  <Link href="/contacto" className="border-2 border-white/30 text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-xl transition-all duration-200">
                    Asesoría Gratuita
                  </Link>
                </div>
                <div className="grid grid-cols-3 gap-8">
                  {[
                    { value: '15+', label: 'Años de experiencia' },
                    { value: '500+', label: 'Propiedades vendidas' },
                    { value: '98%', label: 'Clientes satisfechos' },
                  ].map(s => (
                    <div key={s.label}>
                      <div className="text-3xl font-bold text-white mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>{s.value}</div>
                      <div className="text-white/50 text-xs">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="hidden lg:grid grid-cols-2 gap-4 h-[600px]">
                <div className="flex flex-col gap-4">
                  <div className="relative rounded-2xl overflow-hidden flex-1">
                    <Image src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600" alt="Propiedad de lujo" fill className="object-cover" />
                  </div>
                  <div className="relative rounded-2xl overflow-hidden h-40">
                    <Image src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600" alt="Residencia exclusiva" fill className="object-cover" />
                  </div>
                </div>
                <div className="flex flex-col gap-4 pt-10">
                  <div className="relative rounded-2xl overflow-hidden h-40">
                    <Image src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600" alt="Interior de lujo" fill className="object-cover" />
                  </div>
                  <div className="relative rounded-2xl overflow-hidden flex-1">
                    <Image src="https://images.unsplash.com/photo-1613977257363-707ba9348227?w=600" alt="Penthouse" fill className="object-cover" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Why Us ── */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <p className="text-purple-600 font-medium text-sm tracking-widest uppercase mb-4">¿Por qué elegirnos?</p>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>Experiencia que marca la diferencia</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: Shield, title: 'Seguridad Garantizada', desc: 'Verificamos cada propiedad y asesoramos legalmente en todo el proceso.', color: 'bg-purple-100 text-purple-700' },
                { icon: Award, title: 'Propiedades Premium', desc: 'Portafolio exclusivo en las mejores zonas de la ciudad.', color: 'bg-amber-100 text-amber-700' },
                { icon: Clock, title: 'Atención Personalizada', desc: 'Un asesor dedicado disponible cuando lo necesites.', color: 'bg-emerald-100 text-emerald-700' },
                { icon: TrendingUp, title: 'Mejor Inversión', desc: 'Identificamos propiedades con mayor potencial de plusvalía.', color: 'bg-blue-100 text-blue-700' },
              ].map(({ icon: Icon, title, desc, color }) => (
                <div key={title} className="group p-8 rounded-2xl border border-gray-100 hover:border-purple-200 hover:shadow-xl hover:shadow-purple-100/30 transition-all duration-300">
                  <div className={`w-14 h-14 rounded-xl ${color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon size={24} />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-3">{title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Featured Properties ── */}
        {destacadas.length > 0 && (
          <section className="py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
                <div>
                  <p className="text-purple-600 font-medium text-sm tracking-widest uppercase mb-4">Propiedades</p>
                  <h2 className="text-4xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>Selección destacada</h2>
                </div>
                <Link href="/ventas" className="mt-4 sm:mt-0 flex items-center gap-2 text-purple-700 font-medium hover:gap-3 transition-all">
                  Ver todas <ChevronRight size={18} />
                </Link>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {destacadas.map(propiedad => <PropertyCard key={propiedad.id} propiedad={propiedad} />)}
              </div>
            </div>
          </section>
        )}

        {/* ── CTA ── */}
        <section className="py-24 bg-purple-700 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white blur-3xl" />
          </div>
          <div className="relative max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>¿Listo para encontrar tu propiedad perfecta?</h2>
            <p className="text-purple-200 text-lg mb-10">Agenda una cita con uno de nuestros asesores especializados.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contacto" className="bg-white text-purple-700 hover:bg-purple-50 font-semibold px-8 py-4 rounded-xl transition-all flex items-center gap-2 shadow-xl">
                Agenda tu cita <ArrowRight size={18} />
              </Link>
              <Link href="/ventas" className="border-2 border-white/40 text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-xl transition-all">
                Explorar propiedades
              </Link>
            </div>
          </div>
        </section>

        {/* ── Blog ── */}
        {blogRecientes.length > 0 && (
          <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
                <div>
                  <p className="text-purple-600 font-medium text-sm tracking-widest uppercase mb-4">Conocimiento</p>
                  <h2 className="text-4xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>Blog Inmobiliario</h2>
                </div>
                <Link href="/blog" className="mt-4 sm:mt-0 flex items-center gap-2 text-purple-700 font-medium hover:gap-3 transition-all">
                  Ver todos <ChevronRight size={18} />
                </Link>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {blogRecientes.map(post => (
                  <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
                    <div className="card-hover rounded-2xl overflow-hidden border border-gray-100">
                      <div className="relative h-48 overflow-hidden">
                        <Image src={post.imagen} alt={post.titulo} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute top-3 left-3">
                          <span className="bg-purple-700 text-white text-xs font-medium px-3 py-1 rounded-full">{post.categoria}</span>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-700 transition-colors">{post.titulo}</h3>
                        <p className="text-gray-500 text-sm line-clamp-2 mb-4">{post.resumen}</p>
                        <div className="flex items-center justify-between text-xs text-gray-400">
                          <span>{post.autor}</span>
                          <span>{new Date(post.createdAt).toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Testimonios ── */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <p className="text-purple-600 font-medium text-sm tracking-widest uppercase mb-4">Testimonios</p>
              <h2 className="text-4xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>Lo que dicen nuestros clientes</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: 'María González', role: 'Compradora en Polanco', text: 'El equipo de Elite nos ayudó a encontrar el penthouse de nuestros sueños. El proceso fue transparente y muy profesional desde el inicio.' },
                { name: 'Roberto Martínez', role: 'Inversionista', text: 'Gracias a su asesoría, invertimos en tres propiedades que hoy tienen una plusvalía del 35%. Sin duda los mejores en el mercado de lujo.' },
                { name: 'Ana Soto', role: 'Arrendataria en Condesa', text: 'Encontré mi departamento ideal en menos de dos semanas. El acompañamiento fue excelente y el proceso de renta muy sencillo.' },
              ].map(t => (
                <div key={t.name} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => <Star key={i} size={16} className="text-amber-400 fill-amber-400" />)}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">&ldquo;{t.text}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center text-white font-bold text-sm">{t.name[0]}</div>
                    <div>
                      <div className="font-medium text-gray-900 text-sm">{t.name}</div>
                      <div className="text-gray-400 text-xs">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
