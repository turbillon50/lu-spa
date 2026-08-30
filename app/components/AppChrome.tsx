'use client'

import type { SiteContent } from '../lib/site-content'
import { BottomNav } from './BottomNav'
import { SiteContentProvider } from './SiteContentProvider'
import { TopBar } from './TopBar'

export function AppChrome({ content, children }: { content: SiteContent; children: React.ReactNode }) {
  return <SiteContentProvider content={content}>
    <div style={{ minHeight: '100dvh', background: 'var(--ivory)' }}>
      <TopBar />
      <main style={{ paddingBottom: 'calc(72px + env(safe-area-inset-bottom))' }}>{children}</main>
      <BottomNav />
    </div>
  </SiteContentProvider>
}
