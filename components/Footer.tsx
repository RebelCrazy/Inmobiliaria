import Link from 'next/link'
import { Phone, Mail, MapPin, Instagram, Facebook, Linkedin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center">
                <span className="text-white font-bold text-lg" style={{ fontFamily: 'Playfair Display, serif' }}>E</span>
              </div>
              <div>
                <div className="font-bold text-xl" style={{ fontFamily: 'Playfair Display, serif' }}>Elite</div>
                <div className="text-xs text-purple-400 tracking-widest uppercase">Inmobiliaria</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Especialistas en propiedades de lujo en Ciudad de México. Más de 15 años conectando familias con sus hogares ideales.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Instagram, href: '#' },
                { icon: Facebook, href: '#' },
                { icon: Linkedin, href: '#' },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-purple-700 flex items-center justify-center transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-widest text-purple-400 mb-5">Navegación</h4>
            <ul className="space-y-3">
              {[
                { href: '/', label: 'Inicio' },
                { href: '/ventas', label: 'Propiedades en Venta' },
                { href: '/rentas', label: 'Propiedades en Renta' },
                { href: '/servicios', label: 'Nuestros Servicios' },
                { href: '/blog', label: 'Blog Inmobiliario' },
                { href: '/contacto', label: 'Contacto' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-gray-400 hover:text-white text-sm transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-widest text-purple-400 mb-5">Servicios</h4>
            <ul className="space-y-3">
              {[
                'Asesoría de Compra',
                'Gestión de Rentas',
                'Avalúos Comerciales',
                'Asesoría Legal',
                'Administración de Inmuebles',
                'Inversión Inmobiliaria',
              ].map(s => (
                <li key={s}>
                  <Link href="/servicios" className="text-gray-400 hover:text-white text-sm transition-colors">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-widest text-purple-400 mb-5">Contacto</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-purple-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-sm">Av. Presidente Masaryk 111,<br />Polanco, CDMX</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-purple-400 flex-shrink-0" />
                <a href="tel:+525512345678" className="text-gray-400 hover:text-white text-sm transition-colors">
                  +52 55 1234 5678
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-purple-400 flex-shrink-0" />
                <a href="mailto:hola@eliteinmobiliaria.mx" className="text-gray-400 hover:text-white text-sm transition-colors">
                  hola@eliteinmobiliaria.mx
                </a>
              </li>
            </ul>
            <div className="mt-6 p-4 rounded-xl bg-purple-700/20 border border-purple-700/30">
              <p className="text-xs text-purple-300 mb-2">Horario de atención</p>
              <p className="text-sm text-white">Lun–Vie: 9am – 7pm</p>
              <p className="text-sm text-white">Sáb: 10am – 3pm</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Elite Inmobiliaria. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <Link href="/privacidad" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
              Privacidad
            </Link>
            <Link href="/terminos" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
              Términos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
