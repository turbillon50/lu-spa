import { ReactNode } from 'react'

export function PageHeader({ eyebrow, title, description, actions }: { eyebrow: string; title: string; description?: string; actions?: ReactNode }) {
  return <header className="admin-page-header"><div><p className="admin-eyebrow">{eyebrow}</p><h1>{title}</h1>{description ? <p>{description}</p> : null}</div>{actions ? <div className="admin-toolbar">{actions}</div> : null}</header>
}

export function Card({ title, subtitle, action, children, className = '' }: { title?: string; subtitle?: string; action?: ReactNode; children: ReactNode; className?: string }) {
  return <section className={`admin-card ${className}`}>{title ? <div className="admin-card__head"><div><h2>{title}</h2>{subtitle ? <p>{subtitle}</p> : null}</div>{action}</div> : null}<div className="admin-card__body">{children}</div></section>
}

export function KPI({ label, value, meta }: { label: string; value: ReactNode; meta: string }) {
  return <div className="admin-card admin-kpi"><span className="admin-kpi__label">{label}</span><strong className="admin-kpi__value">{value}</strong><span className="admin-kpi__meta">{meta}</span></div>
}

export function EmptyState({ title, description }: { title: string; description: string }) {
  return <div className="admin-empty"><div><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="9"/><path d="M8 12h8M12 8v8"/></svg><strong>{title}</strong><p>{description}</p></div></div>
}

export function Badge({ status }: { status: string }) {
  const normalized = status.toLowerCase()
  const className = normalized === 'confirmada' || normalized === 'completada' || normalized === 'activa' || normalized === 'activo'
    ? 'is-confirmed' : normalized === 'pendiente' || normalized === 'en-curso' ? 'is-pending' : normalized === 'cancelada' || normalized === 'inactiva' ? 'is-cancelled' : ''
  return <span className={`admin-badge ${className}`}>{status.replace('-', ' ')}</span>
}

export const formatMXN = (amount: number) => new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(amount)
