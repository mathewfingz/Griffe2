import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { ThemeProvider } from 'next-themes'
import { Toaster } from '@/components/ui/sonner'
import { QueryProvider } from '@/lib/providers/query-provider'
import { AIAssistantProvider } from '@/lib/providers/ai-assistant-provider'
import { FloatingAIChat } from '@/components/ai-assistant/floating-ai-chat'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: {
    default: 'SaaS Multivendor Platform',
    template: '%s | SaaS Platform',
  },
  description: 'Complete multivendor SaaS platform with AI assistant, analytics, and advanced features',
  keywords: [
    'SaaS',
    'multivendor',
    'e-commerce',
    'AI assistant',
    'analytics',
    'business intelligence',
    'inventory management',
    'order management',
  ],
  authors: [
    {
      name: 'SaaS Platform Team',
    },
  ],
  creator: 'SaaS Platform',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_APP_URL,
    title: 'SaaS Multivendor Platform',
    description: 'Complete multivendor SaaS platform with AI assistant',
    siteName: 'SaaS Platform',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SaaS Multivendor Platform',
    description: 'Complete multivendor SaaS platform with AI assistant',
    creator: '@saasplatform',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: 'hsl(221.2 83.2% 53.3%)',
          colorBackground: 'hsl(222.2 84% 4.9%)',
          colorInputBackground: 'hsl(217.2 32.6% 17.5%)',
          colorInputText: 'hsl(210 40% 98%)',
          fontFamily: '"Inter", sans-serif',
          borderRadius: '0.5rem',
        },
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
          <meta name="theme-color" content="#3b82f6" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-title" content="SaaS Platform" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        </head>
        <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <QueryProvider>
              <AIAssistantProvider>
                <div className="relative flex min-h-screen flex-col">
                  <div className="flex-1">{children}</div>
                </div>
                <FloatingAIChat />
                <Toaster 
                  position="bottom-right" 
                  closeButton
                  richColors
                  expand={false}
                  duration={4000}
                />
              </AIAssistantProvider>
            </QueryProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}