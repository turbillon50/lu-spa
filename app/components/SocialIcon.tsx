import { cn } from '../lib/cn'

export function SocialIcon({ provider, className }: { provider: 'google' | 'apple' | 'facebook'; className?: string }) {
  return (
    <span
      className={cn(
        'grid h-12 w-12 place-items-center rounded-full bg-white/85 shadow-soft text-ink-900 font-display italic text-lg',
        className
      )}
      aria-label={provider}
    >
      {provider === 'google' && <span className="text-rose-600">G</span>}
      {provider === 'apple' && <span></span>}
      {provider === 'facebook' && <span className="text-[#3b5998]">f</span>}
    </span>
  )
}
