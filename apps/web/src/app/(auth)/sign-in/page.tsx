import { SignIn } from '@clerk/nextjs'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Iniciar Sesión',
  description: 'Accede a tu cuenta de vendedor',
}

export default function SignInPage() {
  return (
    <div className="flex flex-col space-y-2 text-center">
      <h1 className="text-2xl font-semibold tracking-tight">
        Bienvenido de vuelta
      </h1>
      <p className="text-sm text-muted-foreground">
        Ingresa tus credenciales para acceder a tu dashboard
      </p>
      <div className="mt-6">
        <SignIn 
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
          redirectUrl="/dashboard"
          signUpUrl="/sign-up"
        />
      </div>
    </div>
  )
}