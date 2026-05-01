'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useStore } from '../../lib/providers'

export default function SplashPage() {
  const router = useRouter()
  const { user, hydrated } = useStore()

  useEffect(() => {
    if (!hydrated) return
    const t = setTimeout(() => {
      router.replace(user ? '/home' : '/login')
    }, 2000)
    return () => clearTimeout(t)
  }, [hydrated, user, router])

  return (
    <section className="relative flex flex-1 items-end justify-center overflow-hidden bg-rose-100">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/lucienne-logo.jpg"
        alt="Lucienne Beauty Spa"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="relative pb-12">
        <div className="h-1 w-24 overflow-hidden rounded-full bg-white/40">
          <div className="h-full w-1/2 animate-pulse bg-white/85" />
        </div>
      </div>
    </section>
  )
}
