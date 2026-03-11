'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/ventas', label: 'Ventas' },
  { href: '/rentas', label: 'Rentas' },
  { href: '/servicios', label: 'Servicios' },
  { href: '/blog', label: 'Blog' },
  { href: '/contacto', label: 'Contacto' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isHome = pathname === '/'

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || !isHome
          ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-purple-100/50'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg" style={{ fontFamily: 'Playfair Display, serif' }}>E</span>
            </div>
            <div>
              <div
                className={`font-bold text-xl leading-tight transition-colors ${
                  scrolled || !isHome ? 'text-gray-900' : 'text-white'
                }`}
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Elite
              </div>
              <div className={`text-xs font-medium tracking-widest uppercase transition-colors ${
                scrolled || !isHome ? 'text-purple-600' : 'text-purple-300'
              }`}>
                Inmobiliaria
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  pathname === href
                    ? 'bg-purple-700 text-white'
                    : scrolled || !isHome
                    ? 'text-gray-700 hover:text-purple-700 hover:bg-purple-50'
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+525512345678"
              className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                scrolled || !isHome ? 'text-gray-700 hover:text-purple-700' : 'text-white/80 hover:text-white'
              }`}
            >
              <Phone size={14} />
              +52 55 1234 5678
            </a>
            <Link href="/contacto" className="btn-primary text-sm py-2 px-5">
              Asesoría Gratis
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              scrolled || !isHome ? 'text-gray-700' : 'text-white'
            }`}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-purple-100 shadow-xl">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  pathname === href
                    ? 'bg-purple-700 text-white'
                    : 'text-gray-700 hover:bg-purple-50 hover:text-purple-700'
                }`}
              >
                {label}
              </Link>
            ))}
            <div className="pt-2 border-t border-purple-100">
              <Link href="/contacto" onClick={() => setIsOpen(false)} className="btn-primary w-full justify-center text-sm">
                Asesoría Gratis
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
