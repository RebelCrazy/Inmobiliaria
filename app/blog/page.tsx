import { getBlogPosts } from '@/lib/storage'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Image from 'next/image'
import { BookOpen, Clock, Tag } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog Inmobiliario',
  description: 'Artículos, guías y noticias sobre el mercado inmobiliario en México. Consejos de inversión, tendencias y más.',
}

export default async function BlogPage() {
  const posts = await getBlogPosts(true)

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-20 hero-gradient overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 right-1/4 w-72 h-72 rounded-full bg-purple-300 blur-3xl" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-6">
              <BookOpen size={14} className="text-purple-300" />
              <span className="text-white/80 text-sm">{posts.length} artículos disponibles</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              Blog Inmobiliario
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Insights, guías y análisis del mercado inmobiliario de lujo en México escritos por nuestros expertos.
            </p>
          </div>
        </section>

        {/* Blog grid */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {posts.length === 0 ? (
              <div className="text-center py-20">
                <BookOpen size={48} className="text-purple-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-600">No hay artículos publicados aún</h3>
              </div>
            ) : (
              <>
                {/* Featured post */}
                {posts[0] && (
                  <div className="mb-16">
                    <p className="text-purple-600 font-medium text-sm tracking-widest uppercase mb-8">Artículo destacado</p>
                    <Link href={`/blog/${posts[0].slug}`} className="group block">
                      <div className="grid lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-xl card-hover">
                        <div className="relative h-72 lg:h-auto">
                          <Image
                            src={posts[0].imagen}
                            alt={posts[0].titulo}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="bg-gray-900 p-10 lg:p-14 flex flex-col justify-center">
                          <span className="inline-block bg-purple-600 text-white text-xs font-medium px-3 py-1 rounded-full mb-4 w-fit">
                            {posts[0].categoria}
                          </span>
                          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors" style={{ fontFamily: 'Playfair Display, serif' }}>
                            {posts[0].titulo}
                          </h2>
                          <p className="text-gray-400 text-sm leading-relaxed mb-6">{posts[0].resumen}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span className="flex items-center gap-1.5"><Tag size={12} />{posts[0].autor}</span>
                            <span className="flex items-center gap-1.5">
                              <Clock size={12} />
                              {new Date(posts[0].createdAt).toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' })}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                )}

                {/* Rest of posts */}
                {posts.length > 1 && (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.slice(1).map(post => (
                      <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
                        <div className="card-hover rounded-2xl overflow-hidden border border-gray-100 bg-white">
                          <div className="relative h-52 overflow-hidden">
                            <Image
                              src={post.imagen}
                              alt={post.titulo}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute top-3 left-3">
                              <span className="bg-purple-700 text-white text-xs font-medium px-3 py-1 rounded-full">
                                {post.categoria}
                              </span>
                            </div>
                          </div>
                          <div className="p-6">
                            <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-700 transition-colors" style={{ fontFamily: 'Playfair Display, serif' }}>
                              {post.titulo}
                            </h3>
                            <p className="text-gray-500 text-sm line-clamp-3 mb-4">{post.resumen}</p>
                            <div className="flex items-center justify-between text-xs text-gray-400 border-t border-gray-100 pt-4">
                              <span>{post.autor}</span>
                              <span className="flex items-center gap-1"><Clock size={11} />{new Date(post.createdAt).toLocaleDateString('es-MX', { month: 'short', year: 'numeric' })}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
