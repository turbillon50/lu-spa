import { cn } from '../lib/cn'

const SIZES = {
  sm: 56,
  md: 88,
  lg: 128,
  xl: 168,
}

// Tamanos chicos (header/avatar) usan el glifo "Lc" recortado en cerrado del
// MISMO archivo oficial -- el lockup completo (anillo + LUCIENNE BEAUTY SPA)
// se vuelve ilegible por debajo de ~100px. Nada inventado, solo un crop mas
// cerrado de la pieza real para que se lea a tamano chico.
const TIGHT_SIZES: Array<keyof typeof SIZES> = ['sm', 'md']

export function Logo({
  size = 'md',
  className,
}: {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  tone?: 'light' | 'dark' | 'gold'
  className?: string
}) {
  const dim = SIZES[size]
  const src = TIGHT_SIZES.includes(size)
    ? '/img/brand/logo-mark.png'
    : '/img/brand/logo-oficial.jpg'

  return (
    <div className={cn('inline-flex flex-col items-center', className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
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
