import { cn } from '../lib/cn'
import { BrandEmblem } from './BrandEmblem'

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
      <BrandEmblem size={dim} glow={size === 'lg' || size === 'xl' ? 'strong' : 'soft'} />
    </div>
  )
}
