import { auth, currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import { DashboardSkeleton } from '@/components/ui/skeletons'

export default async function Home() {
  const { userId } = auth()
  
  if (!userId) {
    redirect('/sign-in')
  }

  // Redirect authenticated users to dashboard
  redirect('/dashboard')
}

export function Loading() {
  return <DashboardSkeleton />
}