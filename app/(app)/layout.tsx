'use client'
import { TopBar } from '../components/TopBar'
import { BottomNav } from '../components/BottomNav'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: '100dvh', background: 'var(--ivory)' }}>
      <TopBar />
      <main style={{ paddingBottom: 'calc(72px + env(safe-area-inset-bottom))' }}>
        {children}
      </main>
      <BottomNav />
    </div>
  )
}
