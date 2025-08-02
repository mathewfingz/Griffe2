'use client'

import { Button } from '@/components/ui/button'
import { Plus, Upload, Download } from 'lucide-react'

export function QuickActions() {
  return (
    <div className="flex items-center space-x-2">
      <Button variant="outline" size="sm">
        <Download className="mr-2 h-4 w-4" />
        Exportar
      </Button>
      <Button variant="outline" size="sm">
        <Upload className="mr-2 h-4 w-4" />
        Importar
      </Button>
      <Button size="sm">
        <Plus className="mr-2 h-4 w-4" />
        Nuevo Producto
      </Button>
    </div>
  )
}