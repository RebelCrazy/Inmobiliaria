import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { nombre, email, telefono, servicio, mensaje } = body

    if (!nombre || !email || !mensaje) {
      return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 })
    }

    // En un proyecto real, aquí enviarías el email con Nodemailer, Resend, etc.
    // Por ahora, solo registramos en consola
    console.log('=== Nuevo contacto ===')
    console.log({ nombre, email, telefono, servicio, mensaje, fecha: new Date().toISOString() })

    return NextResponse.json({ success: true, message: 'Mensaje recibido correctamente' })
  } catch (error) {
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}
