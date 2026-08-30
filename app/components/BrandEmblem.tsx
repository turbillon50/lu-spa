import Image from 'next/image'
import type { CSSProperties } from 'react'
import { cn } from '../lib/cn'

type BrandEmblemProps = {
  size?: number | string
  className?: string
  priority?: boolean
  decorative?: boolean
  glow?: 'soft' | 'strong' | false
}

export function BrandEmblem({
  size = 88,
  className,
  priority = false,
  decorative = false,
  glow = 'soft',
}: BrandEmblemProps) {
  const dimension = typeof size === 'number' ? `${size}px` : size
  const responsiveSizes = typeof size === 'number' ? `${size}px` : '(max-width: 640px) 58vw, 284px'

  return (
    <span
      className={cn('brand-emblem', glow && `brand-emblem--${glow}`, className)}
      style={{ '--brand-emblem-size': dimension } as CSSProperties}
      role={decorative ? undefined : 'img'}
      aria-label={decorative ? undefined : 'Lucienne Beauty Spa'}
      aria-hidden={decorative || undefined}
    >
      <span className="brand-emblem__ambient" aria-hidden="true" />
      <Image
        src="/img/brand/logo-oficial.jpg"
        alt=""
        fill
        priority={priority}
        sizes={responsiveSizes}
        className="brand-emblem__image"
      />
      <span className="brand-emblem__shine" aria-hidden="true" />
    </span>
  )
}
