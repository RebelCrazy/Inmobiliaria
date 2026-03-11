import { getBlogPostById } from '@/lib/storage'
import BlogForm from '@/components/BlogForm'
import { notFound } from 'next/navigation'

export default async function EditarBlogPage({ params }: { params: { id: string } }) {
  const post = await getBlogPostById(params.id)
  if (!post) notFound()
  return <BlogForm mode="edit" initialData={post} />
}
