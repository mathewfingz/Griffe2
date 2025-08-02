'use client'

import { Bot, Lightbulb } from 'lucide-react'

export function AIInsights() {
  return (
    <div className="rounded-lg border bg-card p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Bot className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Insights de IA</h3>
      </div>
      <div className="space-y-4">
        <div className="flex items-start space-x-3 p-3 rounded-lg bg-primary/5">
          <Lightbulb className="h-4 w-4 text-primary mt-0.5" />
          <div>
            <p className="text-sm font-medium">Recomendación de Stock</p>
            <p className="text-sm text-muted-foreground">
              Considera reabastecer "Camiseta Básica" - se agotará en ~3 días
            </p>
          </div>
        </div>
        
        <div className="flex items-start space-x-3 p-3 rounded-lg bg-success/5">
          <Lightbulb className="h-4 w-4 text-success mt-0.5" />
          <div>
            <p className="text-sm font-medium">Oportunidad de Marketing</p>
            <p className="text-sm text-muted-foreground">
              Lanza una promoción de "Zapatos" - alta demanda detectada
            </p>
          </div>
        </div>
        
        <div className="flex items-start space-x-3 p-3 rounded-lg bg-info/5">
          <Lightbulb className="h-4 w-4 text-info mt-0.5" />
          <div>
            <p className="text-sm font-medium">Análisis de Tendencia</p>
            <p className="text-sm text-muted-foreground">
              Tus ventas de fin de semana han aumentado 15% este mes
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}