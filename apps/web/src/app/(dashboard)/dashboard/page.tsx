import { Suspense } from 'react'
import { Metadata } from 'next'
import { DashboardStats } from '@/components/dashboard/stats'
import { RevenueChart } from '@/components/dashboard/revenue-chart'
import { RecentOrders } from '@/components/dashboard/recent-orders'
import { TopProducts } from '@/components/dashboard/top-products'
import { AIInsights } from '@/components/dashboard/ai-insights'
import { QuickActions } from '@/components/dashboard/quick-actions'
import { DashboardSkeleton } from '@/components/ui/skeletons'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Panel de control del vendedor',
}

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Bienvenido de vuelta. Aquí tienes un resumen de tu negocio.
          </p>
        </div>
        <QuickActions />
      </div>

      {/* Stats cards */}
      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardStats />
      </Suspense>

      {/* Charts and insights */}
      <div className="grid gap-6 lg:grid-cols-7">
        <div className="lg:col-span-4">
          <Suspense fallback={<div className="h-[400px] skeleton rounded-lg" />}>
            <RevenueChart />
          </Suspense>
        </div>
        <div className="lg:col-span-3">
          <Suspense fallback={<div className="h-[400px] skeleton rounded-lg" />}>
            <AIInsights />
          </Suspense>
        </div>
      </div>

      {/* Recent activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Suspense fallback={<div className="h-[300px] skeleton rounded-lg" />}>
          <RecentOrders />
        </Suspense>
        <Suspense fallback={<div className="h-[300px] skeleton rounded-lg" />}>
          <TopProducts />
        </Suspense>
      </div>
    </div>
  )
}

export function Loading() {
  return <DashboardSkeleton />
}