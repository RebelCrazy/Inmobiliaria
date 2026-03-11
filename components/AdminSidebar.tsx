'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, Home, Key, BookOpen, LogOut, Settings, BarChart3 } from 'lucide-react'

const navItems = [
  { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/admin/propiedades', icon: Home, label: 'Propiedades' },
  { href: '/admin/blog', icon: BookOpen, label: 'Blog' },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    await fetch('/api/auth', { method: 'DELETE' })
    router.push('/admin')
    router.refresh()
  }

  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-100 flex flex-col shadow-sm">
      {/* Logo */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center">
            <span className="text-white font-bold text-lg" style={{ fontFamily: 'Playfair Display, serif' }}>E</span>
          </div>
          <div>
            <div className="font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>Elite</div>
            <div className="text-xs text-purple-600 font-medium">Admin Panel</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest px-4 mb-3">Menú</p>
        {navItems.map(({ href, icon: Icon, label }) => (
          <Link
            key={href}
            href={href}
            className={`admin-sidebar-link ${pathname.startsWith(href) ? 'active' : 'text-gray-600'}`}
          >
            <Icon size={18} />
            {label}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-100">
        <Link href="/" target="_blank" className="admin-sidebar-link text-gray-600 mb-1">
          <BarChart3 size={18} />
          Ver sitio web
        </Link>
        <button
          onClick={handleLogout}
          className="admin-sidebar-link text-red-500 hover:bg-red-50 hover:text-red-600 w-full text-left"
        >
          <LogOut size={18} />
          Cerrar sesión
        </button>
      </div>
    </aside>
  )
}
