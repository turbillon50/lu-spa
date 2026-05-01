'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '../lib/cn'

export function TopBar({
  title,
  back = true,
  action,
  variant = 'default',
  className
}: {
  title?: ReactNode
  back?: boolean | string
  action?: ReactNode
  variant?: 'default' | 'transparent'
  className?: string
}) {
  const router = useRouter()
  const handleBack = () => {
    if (typeof back === 'string') router.push(back)
    else router.back()
  }

  return (
    <header
      className={cn(
        'safe-top sticky top-0 z-30 flex items-center justify-between gap-3 px-5 py-3',
        variant === 'default' ? 'bg-cream-50/85 backdrop-blur-xl border-b border-rose-100/70' : 'bg-transparent',
        className
      )}
    >
      <div className="flex w-10 items-center">
        {back ? (
          typeof back === 'string' ? (
            <Link
              href={back}
              aria-label="Volver"
              className="grid h-10 w-10 place-items-center rounded-full bg-white/80 text-ink-700 shadow-soft"
            >
              <ChevronLeft size={20} />
            </Link>
          ) : (
            <button
              onClick={handleBack}
              aria-label="Volver"
              className="grid h-10 w-10 place-items-center rounded-full bg-white/80 text-ink-700 shadow-soft"
            >
              <ChevronLeft size={20} />
            </button>
          )
        ) : null}
      </div>
      <h1 className="flex-1 text-center font-display text-[18px] tracking-tight text-ink-900">
        {title}
      </h1>
      <div className="flex w-10 items-center justify-end">{action}</div>
    </header>
  )
}
