'use client'

import { DollarSign, TrendingUp, Package, Users } from 'lucide-react'

const stats = [
  {
    name: 'Ingresos (30d)',
    value: '$12,345',
    change: '+12.5%',
    icon: DollarSign,
    trend: 'up' as const,
  },
  {
    name: 'Pedidos',
    value: '1,234',
    change: '+5.2%',
    icon: TrendingUp,
    trend: 'up' as const,
  },
  {
    name: 'Productos',
    value: '567',
    change: '+2.1%',
    icon: Package,
    trend: 'up' as const,
  },
  {
    name: 'Clientes',
    value: '890',
    change: '+8.7%',
    icon: Users,
    trend: 'up' as const,
  },
]

export function DashboardStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.name} className="rounded-lg border bg-card p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">
              {stat.name}
            </p>
            <stat.icon className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="mt-4">
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-sm text-green-600">
              {stat.change} desde el mes pasado
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}