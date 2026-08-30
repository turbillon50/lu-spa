import { createRoom, createStaff } from '../actions'
import { Badge, Card, EmptyState, PageHeader } from '../_components/AdminUI'
import { getStaffAndRooms } from '../../lib/admin-data'

export const dynamic = 'force-dynamic'

export default async function TeamPage() {
  const data = await getStaffAndRooms()
  return <div className="admin-page">
    <PageHeader eyebrow="Recursos del spa" title="Equipo y cabinas" description="La base para asignar citas, evitar cruces y calcular capacidad." />
    <div className="admin-grid admin-grid--2">
      <Card title="Equipo" subtitle={`${data.staff.filter((item) => item.activo).length} personas activas`}>
        {data.staff.length ? <div className="admin-list">{data.staff.map((member) => <div className="admin-list-row" key={member.id}><div className="admin-list-row__main"><strong>{member.nombre}</strong><span>{member.rol}{member.especialidades.length ? ` · ${member.especialidades.join(', ')}` : ''}</span></div><Badge status={member.activo ? 'Activo' : 'Inactiva'}/></div>)}</div> : <EmptyState title="Registra al equipo" description="Agrega terapeutas, recepción y especialistas para poder asignar la agenda." />}
        <div className="admin-divider"/><details><summary className="admin-secondary-button" style={{ width: 'fit-content' }}>Agregar persona</summary><form action={createStaff} className="admin-form" style={{ marginTop: 16 }}><label>Nombre<input name="nombre" required/></label><label>Rol<select name="rol"><option value="terapeuta">Terapeuta</option><option value="recepcion">Recepción</option><option value="especialista">Especialista</option><option value="direccion">Dirección</option></select></label><label>Especialidades<input name="especialidades" placeholder="Faciales, masaje, aparatología"/></label><label>Teléfono<input name="telefono"/></label><label>Correo<input name="email" type="email"/></label><button className="admin-primary-button">Guardar integrante</button></form></details>
      </Card>
      <Card title="Cabinas" subtitle={`${data.rooms.filter((item) => item.activa).length} espacios activos`}>
        {data.rooms.length ? <div className="admin-list">{data.rooms.map((room) => <div className="admin-list-row" key={room.id}><div className="admin-list-row__main"><strong>{room.nombre}</strong><span>{room.tipo || 'Sin tipo'} · Capacidad {room.capacidad}</span></div><Badge status={room.activa ? 'Activa' : 'Inactiva'}/></div>)}</div> : <EmptyState title="Registra las cabinas" description="Las cabinas permiten detectar empalmes y medir ocupación sin estimaciones." />}
        <div className="admin-divider"/><details><summary className="admin-secondary-button" style={{ width: 'fit-content' }}>Agregar cabina</summary><form action={createRoom} className="admin-form" style={{ marginTop: 16 }}><label>Nombre<input name="nombre" required/></label><label>Tipo<input name="tipo" placeholder="Facial, masaje, doble…"/></label><label>Capacidad<input name="capacidad" type="number" min="1" defaultValue="1"/></label><label>Notas<textarea name="notas"/></label><button className="admin-primary-button">Guardar cabina</button></form></details>
      </Card>
    </div>
  </div>
}
