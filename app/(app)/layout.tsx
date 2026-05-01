'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { BottomNav } from '../components/BottomNav'
import { useStore } from '../lib/providers'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { user, hydrated } = useStore()

  useEffect(() => {
    if (hydrated && !user) router.replace('/login')
  }, [hydrated, user, router])

  return (
    <main className="app-shell flex min-h-[100dvh] flex-col">
      <div className="scroll-area flex-1">{children}</div>
      <BottomNav />
    </main>
  )
}
