import Link from 'next/link'
import { getAdminNotifications } from '../../lib/admin-data'
import { createNotification, updateNotificationStatus } from '../actions'
import { Badge, Card, EmptyState, PageHeader } from '../_components/AdminUI'

export const dynamic = 'force-dynamic'

export default async function NotificationsAdminPage() {
  const notifications = await getAdminNotifications()
  return <div className="admin-page">
    <PageHeader eyebrow="Comunicación" title="Notificaciones" description="Publica avisos, promociones y recordatorios en el centro de notificaciones de la PWA." actions={<Link className="admin-secondary-button" href="/notifications">Ver en PWA</Link>}/>
    <div className="admin-grid admin-grid--main">
      <Card title="Historial" subtitle={`${notifications.length} comunicaciones`}>
        {notifications.length ? <div className="admin-list">{notifications.map((item) => <div className="admin-list-row admin-notification" key={item.id}><div className="admin-list-row__main"><strong>{item.titulo}</strong><span>{item.cuerpo}</span><time>{item.publicarAt ? new Intl.DateTimeFormat('es-MX',{ dateStyle:'medium', timeStyle:'short', timeZone:'America/Mexico_City' }).format(new Date(item.publicarAt)) : 'Sin fecha de publicación'} · {item.audiencia}</time></div><div className="admin-toolbar"><Badge status={item.estado}/><form action={updateNotificationStatus}><input type="hidden" name="id" value={item.id}/><select name="estado" defaultValue={item.estado}><option value="borrador">Borrador</option><option value="programada">Programada</option><option value="publicada">Publicada</option><option value="archivada">Archivar</option></select><button className="admin-secondary-button">Aplicar</button></form></div></div>)}</div> : <EmptyState title="Sin notificaciones" description="Crea la primera comunicación; no se envía nada hasta que elijas Publicada o Programada."/>}
      </Card>
      <Card title="Nueva notificación" subtitle="Vista segura antes de publicar">
        <form action={createNotification} className="admin-form"><label>Título<input name="titulo" maxLength={90} required placeholder="Tu momento de bienestar"/></label><label>Mensaje<textarea name="cuerpo" maxLength={280} required placeholder="Escribe un mensaje breve y útil."/></label><div className="admin-form admin-form--2"><label>Tipo<select name="tipo" defaultValue="news"><option value="news">Novedad</option><option value="promo">Promoción</option><option value="reminder">Recordatorio</option><option value="birthday">Cumpleaños</option></select></label><label>Audiencia<select name="audiencia" defaultValue="all"><option value="all">Todas</option><option value="members">Membresías</option></select></label></div><label>Ruta de acción<input name="actionUrl" placeholder="/reservar" pattern="/(?!/).*"/></label><div className="admin-form admin-form--2"><label>Publicar el<input type="datetime-local" name="publicarAt"/></label><label>Expira el<input type="datetime-local" name="expiraAt"/></label></div><label>Estado<select name="estado" defaultValue="borrador"><option value="borrador">Guardar borrador</option><option value="programada">Programar</option><option value="publicada">Publicar ahora</option></select></label><button className="admin-primary-button">Guardar notificación</button></form>
      </Card>
    </div>
  </div>
}
