import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Elite Inmobiliaria | Propiedades de Lujo',
    template: '%s | Elite Inmobiliaria',
  },
  description: 'Encontramos la propiedad perfecta para ti. Especialistas en propiedades de lujo en Ciudad de México. Venta y renta de casas, departamentos y penthouses.',
  keywords: ['inmobiliaria', 'propiedades de lujo', 'casas en venta CDMX', 'departamentos en renta', 'bienes raíces México'],
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    siteName: 'Elite Inmobiliaria',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
