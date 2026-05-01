'use client'
import { useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '../lib/cn'

const WEEK = ['D', 'L', 'M', 'M', 'J', 'V', 'S']

const monthName = (d: Date) =>
  d.toLocaleDateString('es-MX', { month: 'long', year: 'numeric' })

function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1)
}

function buildGrid(view: Date) {
  const first = startOfMonth(view)
  const offset = first.getDay()
  const daysInMonth = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate()
  const cells: Array<{ key: string; date: Date | null }> = []
  for (let i = 0; i < offset; i++) cells.push({ key: `pad-${i}`, date: null })
  for (let i = 1; i <= daysInMonth; i++) {
    const d = new Date(view.getFullYear(), view.getMonth(), i)
    cells.push({ key: d.toISOString(), date: d })
  }
  while (cells.length % 7 !== 0) cells.push({ key: `tail-${cells.length}`, date: null })
  return cells
}

const sameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()

export function Calendar({
  value,
  onChange,
  minDate
}: {
  value?: string
  onChange: (iso: string) => void
  minDate?: Date
}) {
  const today = useMemo(() => new Date(), [])
  const min = minDate ?? today
  const initial = value ? new Date(value) : today
  const [view, setView] = useState(new Date(initial.getFullYear(), initial.getMonth(), 1))
  const cells = useMemo(() => buildGrid(view), [view])

  const isPast = (d: Date) => {
    const a = new Date(d)
    a.setHours(0, 0, 0, 0)
    const b = new Date(min)
    b.setHours(0, 0, 0, 0)
    return a < b
  }

  return (
    <div className="card-soft">
      <div className="mb-3 flex items-center justify-between">
        <button
          aria-label="Mes anterior"
          onClick={() => setView((v) => new Date(v.getFullYear(), v.getMonth() - 1, 1))}
          className="grid h-9 w-9 place-items-center rounded-full bg-white/70 text-ink-700"
        >
          <ChevronLeft size={18} />
        </button>
        <p className="font-display text-[18px] capitalize text-ink-900">{monthName(view)}</p>
        <button
          aria-label="Mes siguiente"
          onClick={() => setView((v) => new Date(v.getFullYear(), v.getMonth() + 1, 1))}
          className="grid h-9 w-9 place-items-center rounded-full bg-white/70 text-ink-700"
        >
          <ChevronRight size={18} />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-medium uppercase tracking-widest text-ink-500">
        {WEEK.map((w, i) => (
          <span key={`${w}-${i}`} className="py-1">
            {w}
          </span>
        ))}
      </div>
      <div className="mt-1 grid grid-cols-7 gap-1">
        {cells.map((c) => {
          if (!c.date) return <span key={c.key} />
          const iso = c.date.toISOString().slice(0, 10)
          const selected = value === iso
          const past = isPast(c.date)
          const isToday = sameDay(c.date, today)
          return (
            <button
              key={c.key}
              disabled={past}
              onClick={() => onChange(iso)}
              className={cn(
                'aspect-square rounded-xl text-[13px] transition',
                past && 'text-ink-500/40',
                !past && !selected && 'text-ink-900 hover:bg-rose-100/70',
                selected && 'bg-rose-300 text-white shadow-soft',
                !selected && isToday && 'ring-1 ring-gold-400'
              )}
            >
              {c.date.getDate()}
            </button>
          )
        })}
      </div>
    </div>
  )
}
