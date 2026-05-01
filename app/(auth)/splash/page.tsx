'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Logo } from '../../components/Logo'
import { useStore } from '../../lib/providers'

export default function SplashPage() {
  const router = useRouter()
  const { user, hydrated } = useStore()

  useEffect(() => {
    if (!hydrated) return
    const t = setTimeout(() => {
      router.replace(user ? '/home' : '/login')
    }, 1600)
    return () => clearTimeout(t)
  }, [hydrated, user, router])

  return (
    <section className="relative flex flex-1 items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(160deg, rgba(253,242,238,0.85) 0%, rgba(231,176,161,0.78) 45%, rgba(180,139,82,0.65) 100%), url('https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1400&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      <div className="relative flex flex-col items-center gap-6">
        <Logo size="xl" tone="light" />
        <p className="font-sans text-[11px] tracking-[0.42em] text-cream-100">TU MOMENTO · TU ESENCIA</p>
        <div className="mt-6 h-1.5 w-24 overflow-hidden rounded-full bg-white/30">
          <div className="h-full w-1/2 animate-pulse bg-white/80" />
        </div>
      </div>
    </section>
  )
}
