'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Bot, X, MessageCircle } from 'lucide-react'
import { useAIAssistant } from '@/lib/providers/ai-assistant-provider'

export function FloatingAIChat() {
  const { isOpen, setIsOpen } = useAIAssistant()

  return (
    <>
      {/* Floating button */}
      <Button
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg hover:shadow-xl z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </Button>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-background border rounded-lg shadow-xl z-40 flex flex-col">
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center space-x-2">
              <Bot className="h-5 w-5 text-primary" />
              <span className="font-semibold">Asistente IA</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-4">
              <div className="flex items-start space-x-2">
                <Bot className="h-6 w-6 text-primary mt-0.5" />
                <div className="bg-primary/10 rounded-lg p-3 flex-1">
                  <p className="text-sm">
                    ¡Hola! 👋 Soy tu asistente de IA. Puedo ayudarte con:
                  </p>
                  <ul className="text-sm mt-2 space-y-1">
                    <li>• Análisis de ventas</li>
                    <li>• Gestión de inventario</li>
                    <li>• Recomendaciones de marketing</li>
                    <li>• Crear contenido SEO</li>
                  </ul>
                  <p className="text-sm mt-2">
                    Prueba comandos como: <code>/resumen-ventas</code>
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-4 border-t">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Pregúntame algo..."
                className="flex-1 h-9 rounded-md border border-input bg-background px-3 text-sm ring-offset-background placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              />
              <Button size="sm">Enviar</Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}