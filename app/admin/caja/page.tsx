import { recordPayment } from '../actions'
import { Badge, Card, EmptyState, formatMXN, KPI, PageHeader } from '../_components/AdminUI'
import { getClients, getPayments } from '../../lib/admin-data'

export const dynamic = 'force-dynamic'

export default async function CashPage() {
  const [data, clients] = await Promise.all([getPayments(), getClients()])
  return <div className="admin-page">
    <PageHeader eyebrow="Control financiero" title="Caja" description="Ingresos, egresos y reembolsos registrados. Una cifra sólo aparece si existe el movimiento." />
    <div className="admin-grid admin-grid--kpis">
      <KPI label="Entradas hoy" value={data.totals ? formatMXN(data.totals.entradas) : '—'} meta="Movimientos de ingreso"/>
      <KPI label="Salidas hoy" value={data.totals ? formatMXN(data.totals.salidas) : '—'} meta="Egresos y reembolsos"/>
      <KPI label="Balance hoy" value={data.totals ? formatMXN(data.totals.balance) : '—'} meta="Sin estimaciones"/>
      <KPI label="Movimientos" value={data.items.length} meta="Últimos 100"/>
    </div>
    <div className="admin-grid admin-grid--main" style={{ marginTop: 14 }}>
      <Card title="Movimientos" subtitle="Ordenados del más reciente al más antiguo">
        {data.items.length ? <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Fecha</th><th>Concepto</th><th>Clienta</th><th>Método</th><th>Tipo</th><th>Monto</th></tr></thead><tbody>{data.items.map((item) => <tr key={item.id}><td>{new Intl.DateTimeFormat('es-MX', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit', timeZone: 'America/Mexico_City' }).format(new Date(item.pagadoAt))}</td><td><strong>{item.concepto}</strong></td><td>{item.clienta || '—'}</td><td>{item.metodo}</td><td><Badge status={item.tipo}/></td><td className="admin-money">{item.tipo === 'ingreso' ? '+' : '−'}{formatMXN(item.monto)}</td></tr>)}</tbody></table></div> : <EmptyState title="Caja sin movimientos" description="Registra el primer cobro o egreso; el dashboard dejará de mostrar guiones y calculará con dinero real." />}
      </Card>
      <Card title="Registrar movimiento" subtitle="Trazabilidad desde recepción">
        <form action={recordPayment} className="admin-form">
          <label>Tipo<select name="tipo"><option value="ingreso">Ingreso</option><option value="egreso">Egreso</option><option value="reembolso">Reembolso</option></select></label>
          <label>Concepto<input name="concepto" required placeholder="Servicio, producto, gasto…"/></label>
          <label>Monto MXN<input name="monto" type="number" min="0.01" step="0.01" required/></label>
          <label>Método<select name="metodo"><option value="efectivo">Efectivo</option><option value="tarjeta">Tarjeta</option><option value="transferencia">Transferencia</option><option value="link">Link de pago</option></select></label>
          <label>Clienta<select name="clienteId" defaultValue=""><option value="">Sin vincular</option>{clients.map((client) => <option key={client.id} value={client.id}>{client.nombre}</option>)}</select></label>
          <label>Referencia<input name="referencia"/></label><label>Notas<textarea name="notas"/></label>
          <button className="admin-primary-button">Registrar en caja</button>
        </form>
      </Card>
    </div>
  </div>
}
