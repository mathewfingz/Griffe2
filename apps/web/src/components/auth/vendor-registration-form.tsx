'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

interface VendorRegistrationFormProps {
  user: any
}

export function VendorRegistrationForm({ user }: VendorRegistrationFormProps) {
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement vendor registration logic
    router.push('/dashboard')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">Nombre de la empresa</label>
          <input
            type="text"
            required
            className="mt-1 w-full h-10 rounded-md border border-input bg-background px-3 text-sm ring-offset-background placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            placeholder="Mi Tienda Online"
          />
        </div>
        
        <div>
          <label className="text-sm font-medium">Tipo de negocio</label>
          <select className="mt-1 w-full h-10 rounded-md border border-input bg-background px-3 text-sm ring-offset-background focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
            <option value="individual">Individual</option>
            <option value="company">Empresa</option>
          </select>
        </div>
        
        <div>
          <label className="text-sm font-medium">Email de contacto</label>
          <input
            type="email"
            defaultValue={user?.emailAddresses?.[0]?.emailAddress}
            required
            className="mt-1 w-full h-10 rounded-md border border-input bg-background px-3 text-sm ring-offset-background placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          />
        </div>
        
        <div>
          <label className="text-sm font-medium">Teléfono</label>
          <input
            type="tel"
            className="mt-1 w-full h-10 rounded-md border border-input bg-background px-3 text-sm ring-offset-background placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            placeholder="+34 600 000 000"
          />
        </div>
        
        <div>
          <label className="text-sm font-medium">Descripción (opcional)</label>
          <textarea
            rows={3}
            className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            placeholder="Describe tu negocio..."
          />
        </div>
      </div>
      
      <Button type="submit" className="w-full">
        Completar Registro
      </Button>
    </form>
  )
}