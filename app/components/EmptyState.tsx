import type { ReactNode } from 'react'

export function EmptyState({
  title,
  body,
  action
}: {
  title: string
  body?: string
  action?: ReactNode
}) {
  return (
    <div className="card-soft flex flex-col items-center gap-3 py-10 text-center">
      <div className="grid h-14 w-14 place-items-center rounded-full bg-rose-100 text-2xl">✦</div>
      <h3 className="section-title">{title}</h3>
      {body && <p className="muted text-sm text-ink-500">{body}</p>}
      {action}
    </div>
  )
}
