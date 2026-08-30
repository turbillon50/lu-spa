import { toggleService, updateService } from '../actions'
import { Badge, Card, EmptyState, formatMXN, PageHeader } from '../_components/AdminUI'
import { getServices } from '../../lib/admin-data'

export const dynamic = 'force-dynamic'

export default async function ServicesPage() {
  const services = await getServices()
  return <div className="admin-page">
    <PageHeader eyebrow="Catálogo operativo" title="Servicios" description="Precios, duración y disponibilidad conectados con las reservas." />
    <Card title="Tratamientos" subtitle={`${services.filter((item) => item.activo).length} activos de ${services.length}`}>
      {services.length ? <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Servicio</th><th>Categoría</th><th>Duración</th><th>Precio</th><th>Estado</th><th>Gestión</th></tr></thead><tbody>{services.map((service) => <tr key={service.id}>
        <td><strong>{service.nombre}</strong><br/><small>{service.slug}</small></td><td>{service.categoria}</td><td className="admin-number">{service.duracion} min</td><td className="admin-money">{formatMXN(service.precio)}</td><td><Badge status={service.activo ? 'Activo' : 'Inactiva'}/></td><td><div className="admin-toolbar"><form action={toggleService}><input type="hidden" name="id" value={service.id}/><button className="admin-secondary-button">{service.activo ? 'Pausar' : 'Activar'}</button></form><details className="admin-inline-details"><summary>Editar</summary><form action={updateService} className="admin-form admin-form--2"><input type="hidden" name="id" value={service.id}/><label>Nombre<input name="nombre" defaultValue={service.nombre}/></label><label>Categoría<input name="categoria" defaultValue={service.categoria}/></label><label>Duración<input name="duracion" type="number" min="5" step="5" defaultValue={service.duracion}/></label><label>Precio<input name="precio" type="number" min="0" step="1" defaultValue={service.precio}/></label><button className="admin-primary-button">Guardar</button></form></details></div></td>
      </tr>)}</tbody></table></div> : <EmptyState title="Catálogo vacío" description="Aún no hay tratamientos cargados en Neon." />}
    </Card>
  </div>
}
