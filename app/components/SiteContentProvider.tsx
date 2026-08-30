'use client'

import { createContext, useContext } from 'react'
import type { SiteContent } from '../lib/site-content'

const SiteContentContext = createContext<SiteContent | null>(null)

export function SiteContentProvider({ content, children }: { content: SiteContent; children: React.ReactNode }) {
  return <SiteContentContext.Provider value={content}>{children}</SiteContentContext.Provider>
}

export function useSiteContent() {
  const value = useContext(SiteContentContext)
  if (!value) throw new Error('useSiteContent debe usarse dentro de SiteContentProvider')
  return value
}
