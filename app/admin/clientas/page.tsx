import { updateClient } from '../actions'
import { Badge, Card, EmptyState, formatMXN, PageHeader } from '../_components/AdminUI'
import { getClients } from '../../lib/admin-data'

export const dynamic = 'force-dynamic'

export default async function ClientsPage() {
  const clients = await getClients()
  return <div className="admin-page">
    <PageHeader eyebrow="CRM y expediente" title="Clientas" description="Historial, valor, membresía y notas privadas del equipo." />
    <Card title="Directorio" subtitle={`${clients.length} registros reales`}>
      {clients.length ? <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Clienta</th><th>Contacto</th><th>Membresía</th><th>Visitas</th><th>Última visita</th><th>Valor</th><th>Expediente</th></tr></thead><tbody>{clients.map((client) => <tr key={client.id}>
        <td><strong>{client.nombre}</strong></td>
        <td>{client.email || client.telefono || 'Sin contacto'}</td>
        <td><Badge status={client.membresia || 'Sin membresía'}/></td>
        <td className="admin-number">{client.visitas}</td>
        <td>{client.ultimaVisita ? new Intl.DateTimeFormat('es-MX', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(`${client.ultimaVisita}T12:00:00`)) : '—'}</td>
        <td className="admin-money">{client.gasto ? formatMXN(client.gasto) : '—'}</td>
        <td><details className="admin-inline-details"><summary>Ver / editar</summary><form action={updateClient} className="admin-form"><input type="hidden" name="id" value={client.id}/><label>Teléfono<input name="telefono" defaultValue={client.telefono || ''}/></label><label>Alergias y contraindicaciones<textarea name="alergias"/></label><label>Preferencias<textarea name="preferencias"/></label><label>Notas internas<textarea name="notas" defaultValue={client.notas || ''}/></label><button className="admin-primary-button">Guardar expediente</button></form></details></td>
      </tr>)}</tbody></table></div> : <EmptyState title="Todavía no hay clientas" description="Las cuentas creadas con Clerk y las reservas reales alimentarán este CRM automáticamente." />}
    </Card>
  </div>
}
