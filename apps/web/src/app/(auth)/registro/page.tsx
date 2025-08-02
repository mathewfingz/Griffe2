import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { Metadata } from 'next'
import { VendorRegistrationForm } from '@/components/auth/vendor-registration-form'

export const metadata: Metadata = {
  title: 'Registro de Vendedor',
  description: 'Completa tu perfil de vendedor',
}

export default async function RegistroPage() {
  const user = await currentUser()
  
  if (!user) {
    redirect('/sign-up')
  }

  return (
    <div className="container max-w-2xl mx-auto py-8">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            ¡Bienvenido a SaaS Platform! 👋
          </h1>
          <p className="text-muted-foreground">
            Completa tu perfil de vendedor para comenzar a usar todas las funcionalidades
          </p>
        </div>
        
        <div className="bg-card rounded-lg border p-6">
          <VendorRegistrationForm user={user} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="space-y-2">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              📊
            </div>
            <h3 className="font-medium">Analytics Avanzados</h3>
            <p className="text-sm text-muted-foreground">
              KPIs en tiempo real y predicciones con IA
            </p>
          </div>
          <div className="space-y-2">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              🤖
            </div>
            <h3 className="font-medium">Asistente AI</h3>
            <p className="text-sm text-muted-foreground">
              Chat inteligente para soporte y automatización
            </p>
          </div>
          <div className="space-y-2">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              📈
            </div>
            <h3 className="font-medium">Gestión Completa</h3>
            <p className="text-sm text-muted-foreground">
              Productos, pedidos, clientes y más
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}