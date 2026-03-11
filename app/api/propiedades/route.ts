import { NextRequest, NextResponse } from 'next/server'
import { getPropiedades, createPropiedad } from '@/lib/storage'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const tipo = searchParams.get('tipo')
  let propiedades = await getPropiedades()
  if (tipo) propiedades = propiedades.filter(p => p.tipo === tipo)
  return NextResponse.json(propiedades)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const nueva = await createPropiedad(body)
    return NextResponse.json(nueva, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Error al crear propiedad' }, { status: 500 })
  }
}
