'use client'
import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react'

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    servicio: '',
    mensaje: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        setStatus('success')
        setFormData({ nombre: '', email: '', telefono: '', servicio: '', mensaje: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-16 hero-gradient overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-1/4 w-64 h-64 rounded-full bg-purple-300 blur-3xl" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              Contáctanos
            </h1>
            <p className="text-white/70 text-lg max-w-xl mx-auto">
              Estamos aquí para ayudarte. Cuéntanos qué buscas y un asesor especializado te contactará en menos de 24 horas.
            </p>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-5 gap-16">
              {/* Contact info */}
              <div className="lg:col-span-2">
                <h2 className="text-3xl font-bold text-gray-900 mb-8" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Información de contacto
                </h2>
                <div className="space-y-6 mb-10">
                  {[
                    { icon: MapPin, label: 'Visítanos', value: 'Av. Presidente Masaryk 111,\nPolanco, CDMX, CP 11560' },
                    { icon: Phone, label: 'Llámanos', value: '+52 55 1234 5678\n+52 55 9876 5432' },
                    { icon: Mail, label: 'Escríbenos', value: 'hola@eliteinmobiliaria.mx\nventas@eliteinmobiliaria.mx' },
                    { icon: Clock, label: 'Horarios', value: 'Lun–Vie: 9:00am – 7:00pm\nSábado: 10:00am – 3:00pm' },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex gap-4">
                      <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center flex-shrink-0">
                        <Icon size={20} className="text-purple-700" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 mb-0.5">{label}</p>
                        <p className="text-gray-500 text-sm whitespace-pre-line">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Map placeholder */}
                <div className="rounded-2xl overflow-hidden bg-purple-50 border border-purple-100 h-56 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin size={40} className="text-purple-400 mx-auto mb-2" />
                    <p className="text-purple-600 text-sm font-medium">Polanco, Ciudad de México</p>
                    <p className="text-gray-400 text-xs mt-1">Av. Presidente Masaryk 111</p>
                  </div>
                </div>
              </div>

              {/* Contact form */}
              <div className="lg:col-span-3">
                <div className="bg-gray-50 rounded-3xl p-8 lg:p-10 border border-gray-100">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                    Envíanos un mensaje
                  </h2>
                  <p className="text-gray-500 text-sm mb-8">Te respondemos en menos de 24 horas hábiles</p>

                  {status === 'success' ? (
                    <div className="text-center py-16">
                      <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle size={36} className="text-emerald-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">¡Mensaje enviado!</h3>
                      <p className="text-gray-500">Un asesor te contactará pronto. ¡Gracias por contactarnos!</p>
                      <button onClick={() => setStatus('idle')} className="mt-6 text-purple-600 text-sm font-medium hover:underline">
                        Enviar otro mensaje
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">Nombre completo *</label>
                          <input
                            type="text"
                            required
                            value={formData.nombre}
                            onChange={e => setFormData({ ...formData, nombre: e.target.value })}
                            className="form-input"
                            placeholder="Tu nombre"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">Correo electrónico *</label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                            className="form-input"
                            placeholder="tu@correo.com"
                          />
                        </div>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">Teléfono</label>
                          <input
                            type="tel"
                            value={formData.telefono}
                            onChange={e => setFormData({ ...formData, telefono: e.target.value })}
                            className="form-input"
                            placeholder="+52 55 0000 0000"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">¿En qué te podemos ayudar?</label>
                          <select
                            value={formData.servicio}
                            onChange={e => setFormData({ ...formData, servicio: e.target.value })}
                            className="form-input"
                          >
                            <option value="">Selecciona una opción</option>
                            <option value="compra">Comprar propiedad</option>
                            <option value="renta">Rentar propiedad</option>
                            <option value="vender">Vender mi propiedad</option>
                            <option value="avaluo">Avalúo</option>
                            <option value="inversion">Inversión inmobiliaria</option>
                            <option value="otro">Otro</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Mensaje *</label>
                        <textarea
                          required
                          rows={5}
                          value={formData.mensaje}
                          onChange={e => setFormData({ ...formData, mensaje: e.target.value })}
                          className="form-input resize-none"
                          placeholder="Cuéntanos qué estás buscando, zona de interés, presupuesto, características..."
                        />
                      </div>
                      {status === 'error' && (
                        <p className="text-red-500 text-sm">Hubo un error al enviar. Por favor intenta de nuevo.</p>
                      )}
                      <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="btn-primary w-full justify-center py-4 disabled:opacity-50"
                      >
                        {status === 'loading' ? 'Enviando...' : (
                          <><Send size={18} /> Enviar mensaje</>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
