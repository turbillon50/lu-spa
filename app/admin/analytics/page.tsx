import { Card, EmptyState, formatMXN, KPI, PageHeader } from '../_components/AdminUI'
import { getAnalytics } from '../../lib/admin-data'

export const dynamic = 'force-dynamic'

export default async function AnalyticsPage() {
  const data = await getAnalytics()
  const total = data.payments ? Number(data.payments.neto || 0) : null
  const series = data.series.map((row) => ({ date: String(row.fecha).slice(0,10), value: Number(row.total || 0) }))
  const max = Math.max(1, ...series.map((item) => Math.abs(item.value)))
  const maxSessions = Math.max(1, ...data.top.map((row) => Number(row.sesiones || 0)))
  return <div className="admin-page">
    <PageHeader eyebrow="Dirección" title="Analytics" description="Treinta días de reservas, clientas y movimientos reales." />
    <div className="admin-grid admin-grid--kpis">
      <KPI label="Neto 30 días" value={total == null ? '—' : formatMXN(total)} meta="Caja registrada"/>
      <KPI label="Movimientos" value={data.payments ? Number(data.payments.movimientos || 0) : '—'} meta="Ingresos, egresos y reembolsos"/>
      <KPI label="Clientas totales" value={Number(data.clients.total || 0)} meta="Cuentas en CRM"/>
      <KPI label="Nuevas clientas" value={Number(data.clients.nuevas || 0)} meta="Últimos 30 días"/>
    </div>
    <div className="admin-grid admin-grid--2" style={{ marginTop: 14 }}>
      <Card title="Caja diaria" subtitle="Neto por día, sin proyecciones">
        {series.some((item) => item.value !== 0) ? <div className="admin-chart-bars" aria-label="Caja diaria de los últimos 30 días">{series.map((item) => <div key={item.date} title={`${item.date}: ${formatMXN(item.value)}`}><span style={{ height: `${Math.max(3, Math.abs(item.value) / max * 100)}%` }} className={item.value < 0 ? 'is-negative' : ''}/></div>)}</div> : <EmptyState title="Sin movimientos en el periodo" description="Cuando caja tenga registros, la tendencia aparecerá aquí." />}
      </Card>
      <Card title="Servicios más reservados" subtitle="Sesiones no canceladas en 30 días">
        {data.top.length ? <div className="admin-ranking">{data.top.map((row, index) => <div key={String(row.nombre)}><span>{index + 1}</span><div><strong>{String(row.nombre)}</strong><i><b style={{ width: `${Number(row.sesiones) / maxSessions * 100}%` }}/></i></div><em>{Number(row.sesiones)}</em></div>)}</div> : <EmptyState title="Sin reservas en el periodo" description="El ranking se construye sólo con sesiones reales." />}
      </Card>
    </div>
  </div>
}
