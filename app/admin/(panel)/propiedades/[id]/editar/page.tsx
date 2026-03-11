import { getPropiedadById } from '@/lib/storage'
import PropertyForm from '@/components/PropertyForm'
import { notFound } from 'next/navigation'

export default async function EditarPropiedadPage({ params }: { params: { id: string } }) {
  const propiedad = await getPropiedadById(params.id)
  if (!propiedad) notFound()
  return <PropertyForm mode="edit" initialData={propiedad} />
}
