import Image from 'next/image'
import Link from 'next/link'
import { ThemeToggle } from '@/components/theme-toggle'

interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="absolute right-4 top-4 md:right-8 md:top-8">
        <ThemeToggle />
      </div>
      
      {/* Left side - Branding */}
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-info" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <div className="mr-2 h-6 w-6 rounded-sm bg-white/10 backdrop-blur" />
          SaaS Platform
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              "Esta plataforma multivendedor ha transformado completamente nuestro negocio. 
              El asistente AI y las herramientas de análisis son increíbles."
            </p>
            <footer className="text-sm opacity-80">Sofia Rodriguez, CEO de TechStore</footer>
          </blockquote>
        </div>
      </div>
      
      {/* Right side - Auth forms */}
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <Link 
              href="/" 
              className="mx-auto mb-6 flex items-center text-lg font-medium lg:hidden"
            >
              <div className="mr-2 h-6 w-6 rounded-sm bg-primary/10" />
              SaaS Platform
            </Link>
          </div>
          {children}
          <p className="px-8 text-center text-sm text-muted-foreground">
            Al continuar, aceptas nuestros{' '}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Términos de Servicio
            </Link>{' '}
            y{' '}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Política de Privacidad
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}