'use client'
import { createContext, useCallback, useContext, useEffect, useState } from 'react'

export type DemoMode = 'guest' | 'client' | 'admin'

interface ModeCtx {
  mode: DemoMode
  setMode: (m: DemoMode) => void
}

const Ctx = createContext<ModeCtx | null>(null)

export function ModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<DemoMode>('guest')

  useEffect(() => {
    try {
      const saved = localStorage.getItem('lucienne::mode') as DemoMode | null
      if (saved && ['guest', 'client', 'admin'].includes(saved)) setModeState(saved)
    } catch {}
  }, [])

  const setMode = useCallback((m: DemoMode) => {
    setModeState(m)
    try { localStorage.setItem('lucienne::mode', m) } catch {}
  }, [])

  return <Ctx.Provider value={{ mode, setMode }}>{children}</Ctx.Provider>
}

export function useMode() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useMode must be within ModeProvider')
  return ctx
}
