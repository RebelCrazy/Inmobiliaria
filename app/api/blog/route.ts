import { NextRequest, NextResponse } from 'next/server'
import { getBlogPosts, createBlogPost, updateBlogPost, deleteBlogPost } from '@/lib/storage'

export async function GET() {
  const posts = await getBlogPosts()
  return NextResponse.json(posts)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const nuevo = await createBlogPost(body)
    return NextResponse.json(nuevo, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Error al crear post' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'ID requerido' }, { status: 400 })
    const body = await request.json()
    const updated = await updateBlogPost(id, body)
    if (!updated) return NextResponse.json({ error: 'No encontrado' }, { status: 404 })
    return NextResponse.json(updated)
  } catch {
    return NextResponse.json({ error: 'Error al actualizar' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'ID requerido' }, { status: 400 })
  const deleted = await deleteBlogPost(id)
  if (!deleted) return NextResponse.json({ error: 'No encontrado' }, { status: 404 })
  return NextResponse.json({ success: true })
}
