'use client'

export function RecentOrders() {
  return (
    <div className="rounded-lg border bg-card p-6">
      <h3 className="text-lg font-semibold mb-4">Pedidos Recientes</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">#12345</p>
            <p className="text-sm text-muted-foreground">Juan Pérez</p>
          </div>
          <span className="text-sm font-medium">$123.45</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">#12346</p>
            <p className="text-sm text-muted-foreground">María García</p>
          </div>
          <span className="text-sm font-medium">$67.89</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">#12347</p>
            <p className="text-sm text-muted-foreground">Carlos López</p>
          </div>
          <span className="text-sm font-medium">$234.56</span>
        </div>
      </div>
    </div>
  )
}