import { getBlogPostBySlug, getBlogPosts } from '@/lib/storage'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ArrowLeft, Clock, Tag, Share2 } from 'lucide-react'
import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug)
  if (!post) return { title: 'Artículo no encontrado' }
  return { title: post.titulo, description: post.resumen, openGraph: { images: [post.imagen] } }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPostBySlug(params.slug)
  if (!post || !post.publicado) notFound()

  const allPosts = await getBlogPosts(true)
  const relacionados = allPosts.filter(p => p.id !== post.id).slice(0, 3)
  const paragraphs = post.contenido.split('\n\n').filter(Boolean)

  return (
    <>
      <Navbar />
      <main>
        <section className="relative pt-32 pb-0 overflow-hidden">
          <div className="relative h-[60vh] min-h-[400px]">
            <Image src={post.imagen} alt={post.titulo} fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-gray-950/20" />
            <div className="absolute bottom-0 left-0 right-0 max-w-4xl mx-auto px-4 sm:px-6 pb-12">
              <span className="inline-block bg-purple-600 text-white text-xs font-medium px-3 py-1 rounded-full mb-4">{post.categoria}</span>
              <h1 className="text-3xl lg:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>{post.titulo}</h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-white/60">
                <span className="flex items-center gap-1.5"><Tag size={14} />{post.autor}</span>
                <span className="flex items-center gap-1.5"><Clock size={14} />{new Date(post.createdAt).toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                <div className="flex flex-wrap gap-2 ml-2">
                  {post.tags.map(tag => <span key={tag} className="bg-white/10 text-white/70 text-xs px-2 py-0.5 rounded-full">#{tag}</span>)}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="flex justify-between items-center mb-10">
              <Link href="/blog" className="flex items-center gap-2 text-purple-600 hover:text-purple-800 text-sm font-medium transition-colors">
                <ArrowLeft size={16} /> Volver al Blog
              </Link>
              <button className="flex items-center gap-2 text-gray-500 hover:text-purple-600 text-sm transition-colors">
                <Share2 size={16} /> Compartir
              </button>
            </div>
            <div className="bg-purple-50 border-l-4 border-purple-700 rounded-r-xl p-6 mb-10">
              <p className="text-gray-700 leading-relaxed font-medium italic">{post.resumen}</p>
            </div>
            <div className="space-y-6">
              {paragraphs.map((para, i) => {
                if (para.startsWith('## ')) return <h2 key={i} className="text-2xl font-bold text-gray-900 mt-10 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>{para.replace('## ', '')}</h2>
                if (para.startsWith('# ')) return <h1 key={i} className="text-3xl font-bold text-gray-900 mt-10 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>{para.replace('# ', '')}</h1>
                return <p key={i} className="text-gray-700 leading-relaxed text-[1.05rem]">{para}</p>
              })}
            </div>
            <div className="mt-14 p-8 bg-gray-50 rounded-2xl border border-gray-100 flex items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0" style={{ fontFamily: 'Playfair Display, serif' }}>{post.autor[0]}</div>
              <div>
                <p className="font-semibold text-gray-900 mb-1">{post.autor}</p>
                <p className="text-gray-500 text-sm">Especialista en bienes raíces y mercado inmobiliario de lujo en México.</p>
              </div>
            </div>
          </div>
        </section>

        {relacionados.length > 0 && (
          <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-10" style={{ fontFamily: 'Playfair Display, serif' }}>Artículos relacionados</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {relacionados.map(p => (
                  <Link key={p.id} href={`/blog/${p.slug}`} className="group block">
                    <div className="card-hover rounded-2xl overflow-hidden bg-white border border-gray-100">
                      <div className="relative h-44">
                        <Image src={p.imagen} alt={p.titulo} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      <div className="p-5">
                        <span className="text-xs text-purple-600 font-medium">{p.categoria}</span>
                        <h3 className="font-semibold text-gray-900 mt-1 line-clamp-2 group-hover:text-purple-700 transition-colors">{p.titulo}</h3>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  )
}
