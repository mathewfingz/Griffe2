import { SignUp } from '@clerk/nextjs'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Registrarse',
  description: 'Crea tu cuenta de vendedor',
}

export default function SignUpPage() {
  return (
    <div className="flex flex-col space-y-2 text-center">
      <h1 className="text-2xl font-semibold tracking-tight">
        Crear cuenta
      </h1>
      <p className="text-sm text-muted-foreground">
        Únete a miles de vendedores que confían en nuestra plataforma
      </p>
      <div className="mt-6">
        <SignUp 
          appearance={{
            elements: {
              formButtonPrimary: 
                'bg-primary hover:bg-primary/90 text-primary-foreground',
              card: 'shadow-none border-0',
              headerTitle: 'hidden',
              headerSubtitle: 'hidden',
              socialButtonsBlockButton: 
                'border-input hover:bg-accent hover:text-accent-foreground',
              formFieldInput: 
                'border-input focus:border-ring',
            },
          }}
          redirectUrl="/registro"
          signInUrl="/sign-in"
        />
      </div>
    </div>
  )
}