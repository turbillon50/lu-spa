export function cn(...args: Array<string | false | null | undefined>) {
  return args.filter(Boolean).join(' ')
}

export function formatPrice(value: number) {
  return value.toLocaleString('es-MX', {
    style: 'currency',
    currency: 'MXN',
    maximumFractionDigits: 0
  })
}

export function formatLongDate(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString('es-MX', {
    weekday: 'long',
    day: '2-digit',
    month: 'long'
  })
}

export function formatShortDate(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString('es-MX', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })
}
