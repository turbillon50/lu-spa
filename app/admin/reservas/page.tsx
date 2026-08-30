import { createReservation, updateReservation } from '../actions'
import { Badge, Card, EmptyState, formatMXN, PageHeader } from '../_components/AdminUI'
import { getAgenda, getClients, getServices, getStaffAndRooms } from '../../lib/admin-data'

export const dynamic = 'force-dynamic'

export default async function AgendaPage({ searchParams }: { searchParams?: { fecha?: string } }) {
  const date = searchParams?.fecha && /^\d{4}-\d{2}-\d{2}$/.test(searchParams.fecha) ? searchParams.fecha : new Date().toLocaleDateString('en-CA', { timeZone: 'America/Mexico_City' })
  const [agenda, clients, services, resources] = await Promise.all([getAgenda(date), getClients(), getServices(), getStaffAndRooms()])
  return <div className="admin-page">
    <PageHeader eyebrow="Recepción" title="Agenda" description="Citas, asignación de terapeuta y cabina en una sola línea de trabajo." actions={<form className="admin-toolbar"><input type="date" name="fecha" defaultValue={date}/><button className="admin-secondary-button">Ir a fecha</button></form>} />

    <Card title="Nueva cita" subtitle="Alta manual desde recepción">
      <details>
        <summary className="admin-primary-button" style={{ width: 'fit-content', cursor: 'pointer' }}>Crear cita</summary>
        <form action={createReservation} className="admin-form admin-form--2" style={{ marginTop: 18 }}>
          <label>Clienta<select name="clienteId" required defaultValue=""><option value="" disabled>Selecciona</option>{clients.map((item) => <option key={item.id} value={item.id}>{item.nombre}</option>)}</select></label>
          <label>Servicio<select name="tratamientoId" required defaultValue=""><option value="" disabled>Selecciona</option>{services.filter((item) => item.activo).map((item) => <option key={item.id} value={item.id}>{item.nombre} · {item.duracion} min</option>)}</select></label>
          <label>Fecha<input name="fecha" type="date" required defaultValue={date}/></label>
          <label>Hora<input name="hora" type="time" required/></label>
          <label>Terapeuta<select name="staffId" defaultValue=""><option value="">Sin asignar</option>{resources.staff.filter((item) => item.activo).map((item) => <option key={item.id} value={item.id}>{item.nombre}</option>)}</select></label>
          <label>Cabina<select name="roomId" defaultValue=""><option value="">Sin asignar</option>{resources.rooms.filter((item) => item.activa).map((item) => <option key={item.id} value={item.id}>{item.nombre}</option>)}</select></label>
          <label style={{ gridColumn: '1 / -1' }}>Notas<textarea name="notas" placeholder="Preferencias, preparación o contexto para el equipo"/></label>
          <button className="admin-primary-button" type="submit">Guardar cita</button>
        </form>
      </details>
    </Card>

    <Card title={new Intl.DateTimeFormat('es-MX', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'America/Mexico_City' }).format(new Date(`${date}T12:00:00-06:00`))} subtitle={`${agenda.length} citas registradas`} className="admin-agenda-card">
      {agenda.length ? <div className="admin-list">{agenda.map((item) => <form action={updateReservation} className="admin-list-row admin-agenda-row" key={item.id}>
        <input type="hidden" name="id" value={item.id}/>
        <span className="admin-list-row__time">{item.hora}</span>
        <div className="admin-list-row__main"><strong>{item.clienta}</strong><span>{item.tratamiento} · {item.duracion} min · {formatMXN(item.precio)}</span></div>
        <select name="staffId" defaultValue={item.staffId || ''} aria-label="Terapeuta"><option value="">Sin terapeuta</option>{resources.staff.filter((member) => member.activo).map((member) => <option key={member.id} value={member.id}>{member.nombre}</option>)}</select>
        <select name="roomId" defaultValue={item.cabinaId || ''} aria-label="Cabina"><option value="">Sin cabina</option>{resources.rooms.filter((room) => room.activa).map((room) => <option key={room.id} value={room.id}>{room.nombre}</option>)}</select>
        <select name="estado" defaultValue={item.estado} aria-label="Estado"><option value="pendiente">Pendiente</option><option value="confirmada">Confirmada</option><option value="en-curso">En curso</option><option value="completada">Completada</option><option value="cancelada">Cancelada</option><option value="no-show">No asistió</option></select>
        <Badge status={item.estado}/><button className="admin-secondary-button" type="submit">Guardar</button>
      </form>)}</div> : <EmptyState title="Sin citas para esta fecha" description="Puedes crear una cita manual o esperar una reserva desde la app de Lucienne." />}
    </Card>
  </div>
}
