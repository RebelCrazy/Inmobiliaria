import { NextRequest, NextResponse } from 'next/server'
import { getPropiedadById, updatePropiedad, deletePropiedad } from '@/lib/storage'

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const propiedad = await getPropiedadById(params.id)
  if (!propiedad) return NextResponse.json({ error: 'No encontrada' }, { status: 404 })
  return NextResponse.json(propiedad)
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const updated = await updatePropiedad(params.id, body)
    if (!updated) return NextResponse.json({ error: 'No encontrada' }, { status: 404 })
    return NextResponse.json(updated)
  } catch {
    return NextResponse.json({ error: 'Error al actualizar' }, { status: 500 })
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  const deleted = await deletePropiedad(params.id)
  if (!deleted) return NextResponse.json({ error: 'No encontrada' }, { status: 404 })
  return NextResponse.json({ success: true })
}
