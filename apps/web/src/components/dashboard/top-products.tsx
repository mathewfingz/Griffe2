'use client'

export function TopProducts() {
  return (
    <div className="rounded-lg border bg-card p-6">
      <h3 className="text-lg font-semibold mb-4">Productos Más Vendidos</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Camiseta Básica</p>
            <p className="text-sm text-muted-foreground">123 vendidas</p>
          </div>
          <span className="text-sm font-medium">$1,234</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Jeans Clásicos</p>
            <p className="text-sm text-muted-foreground">89 vendidos</p>
          </div>
          <span className="text-sm font-medium">$2,345</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Zapatos Deportivos</p>
            <p className="text-sm text-muted-foreground">67 vendidos</p>
          </div>
          <span className="text-sm font-medium">$3,456</span>
        </div>
      </div>
    </div>
  )
}