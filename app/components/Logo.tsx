import { cn } from '../lib/cn'

export function Logo({
  size = 'md',
  tone = 'light',
  className
}: {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  tone?: 'light' | 'dark' | 'gold'
  className?: string
}) {
  const dims = {
    sm: { box: 56, ring: 26, lc: 22, sub: 8, gap: 4 },
    md: { box: 88, ring: 40, lc: 34, sub: 9, gap: 6 },
    lg: { box: 128, ring: 56, lc: 50, sub: 11, gap: 8 },
    xl: { box: 168, ring: 74, lc: 66, sub: 12, gap: 10 }
  }[size]

  const colors = {
    light: { stroke: '#fff7ee', text: '#fff7ee', sub: '#f8eadf' },
    dark: { stroke: '#8e6a3b', text: '#2b1c1b', sub: '#8a675f' },
    gold: { stroke: '#b48b52', text: '#8e6a3b', sub: '#b48b52' }
  }[tone]

  return (
    <div className={cn('inline-flex flex-col items-center', className)}>
      <div className="relative" style={{ width: dims.box, height: dims.box }}>
        <span
          className="absolute inset-0 rounded-full border"
          style={{ borderColor: colors.stroke, opacity: 0.85 }}
        />
        <span
          className="absolute font-display italic"
          style={{
            fontSize: dims.lc,
            color: colors.text,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -56%)',
            lineHeight: 1
          }}
        >
          Lc
        </span>
      </div>
      <div
        className="font-sans font-medium"
        style={{
          marginTop: dims.gap,
          fontSize: dims.sub,
          letterSpacing: '0.42em',
          color: colors.sub
        }}
      >
        LUCIENNE
      </div>
      <div
        className="font-sans"
        style={{
          marginTop: 2,
          fontSize: dims.sub - 1,
          letterSpacing: '0.4em',
          color: colors.sub,
          opacity: 0.85
        }}
      >
        BEAUTY SPA
      </div>
    </div>
  )
}
