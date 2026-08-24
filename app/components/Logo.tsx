import { cn } from '../lib/cn'

const SIZES = {
  sm: 56,
  md: 88,
  lg: 128,
  xl: 168,
}

export function Logo({
  size = 'md',
  className,
}: {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  tone?: 'light' | 'dark' | 'gold'
  className?: string
}) {
  const dim = SIZES[size]

  return (
    <div className={cn('inline-flex flex-col items-center', className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/img/brand/logo-oficial.jpg"
        alt="Lucienne Beauty Spa"
        width={dim}
        height={dim}
        style={{
          width: dim,
          height: dim,
          objectFit: 'cover',
          objectPosition: 'center',
          borderRadius: '50%',
          display: 'block',
        }}
      />
    </div>
  )
}
