import Link from 'next/link'
import { Badge, Card, EmptyState, formatMXN, KPI, PageHeader } from './_components/AdminUI'
import { getDashboardData } from '../lib/admin-data'

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  const data = await getDashboardData()
  return (
    <div className="admin-page">
      <PageHeader eyebrow="Operación en vivo" title="Hoy en Lucienne" description="Agenda, caja y alertas con información directa de Neon." actions={<Link href="/admin/reservas" className="admin-primary-button">Abrir agenda</Link>} />

      <div className="admin-grid admin-grid--kpis">
        <KPI label="Citas de hoy" value={data.reservasHoy} meta="No canceladas" />
        <KPI label="Caja del mes" value={data.ingresosMes == null ? '—' : formatMXN(data.ingresosMes)} meta={data.ingresosMes == null ? 'Activa el módulo de caja' : 'Movimientos registrados'} />
        <KPI label="Clientas activas" value={data.clientasActivas} meta="Últimos 30 días" />
        <KPI label="Membresías" value={data.membresiasActivas} meta="Marcadas en CRM" />
      </div>

      <div className="admin-grid admin-grid--main" style={{ marginTop: 14 }}>
        <Card title="Agenda de hoy" subtitle="Orden cronológico" action={<Link href="/admin/reservas" className="admin-text-button">Ver agenda completa</Link>}>
          {data.agenda.length ? <div className="admin-list">{data.agenda.map((item) => (
            <div className="admin-list-row" key={item.id}>
              <span className="admin-list-row__time">{item.hora}</span>
              <div className="admin-list-row__main"><strong>{item.clienta}</strong><span>{item.tratamiento} · {item.duracion} min{item.terapeuta ? ` · ${item.terapeuta}` : ''}</span></div>
              <Badge status={item.estado} />
            </div>
          ))}</div> : <EmptyState title="La agenda de hoy está libre" description="Las citas creadas por clientas o por recepción aparecerán aquí de inmediato." />}
        </Card>

        <div className="admin-grid">
          <Card title="Preparación operativa" subtitle="Recursos para atender la agenda">
            {data.operations ? <div className="admin-list">
              <div className="admin-list-row"><div className="admin-list-row__main"><strong>{data.operations.staff} integrantes activos</strong><span>Equipo disponible en el sistema</span></div></div>
              <div className="admin-list-row"><div className="admin-list-row__main"><strong>{data.operations.rooms} cabinas activas</strong><span>Recursos configurados</span></div></div>
              <div className="admin-list-row"><div className="admin-list-row__main"><strong>{data.operations.unassignedStaff + data.operations.unassignedRoom} citas por completar</strong><span>Sin terapeuta o cabina asignada</span></div>{data.operations.unassignedStaff + data.operations.unassignedRoom ? <Badge status="pendiente"/> : <Badge status="activo"/>}</div>
            </div> : <EmptyState title="Configura equipo y cabinas" description="Cuando registres los recursos del spa podremos detectar cruces y calcular ocupación real." />}
          </Card>
          <Card title="Señales para dirección" subtitle="Acciones que no conviene dejar pasar">
            <div className="admin-list">
              <div className="admin-list-row"><div className="admin-list-row__main"><strong>{data.clientsToRecover} clientas por recuperar</strong><span>Con historial, sin visita en 90 días</span></div><Link href="/admin/clientas" className="admin-text-button">Abrir CRM</Link></div>
              <div className="admin-list-row"><div className="admin-list-row__main"><strong>{data.inventory.length} alertas de inventario</strong><span>Stock igual o menor al mínimo</span></div><Link href="/admin/inventario" className="admin-text-button">Revisar</Link></div>
              <div className="admin-list-row"><div className="admin-list-row__main"><strong>{data.serviciosActivos} servicios activos</strong><span>Catálogo disponible para reservar</span></div><Link href="/admin/servicios" className="admin-text-button">Catálogo</Link></div>
            </div>
          </Card>
        </div>
      </div>

      {data.inventory.length ? <Card title="Inventario por reabastecer" subtitle="Prioridad según stock mínimo" className="admin-dashboard-stock">
        <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Producto</th><th>Existencia</th><th>Mínimo</th></tr></thead><tbody>{data.inventory.map((item) => <tr key={item.id}><td><strong>{item.nombre}</strong></td><td className="admin-number">{item.stock}</td><td className="admin-number">{item.minimo}</td></tr>)}</tbody></table></div>
      </Card> : null}
    </div>
  )
}
