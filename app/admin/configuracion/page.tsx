import { saveConfig } from '../actions'
import { Badge, Card, PageHeader } from '../_components/AdminUI'
import { getConfig } from '../../lib/admin-data'

export const dynamic = 'force-dynamic'

export default async function SettingsPage() {
  const rows = await getConfig()
  const schedule = rows.find((row) => row.clave === 'horario')?.valor as { open?: string; close?: string; days?: string[] } | undefined
  const connections = [
    ['Neon', Boolean(process.env.DATABASE_URL)],
    ['Clerk', Boolean(process.env.CLERK_SECRET_KEY && process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY)],
    ['Sesión administrativa', Boolean(process.env.ADMIN_SESSION_SECRET && process.env.ADMIN_PASSWORD)],
  ] as const
  const days = [['lunes','Lunes'],['martes','Martes'],['miercoles','Miércoles'],['jueves','Jueves'],['viernes','Viernes'],['sabado','Sábado'],['domingo','Domingo']]
  return <div className="admin-page">
    <PageHeader eyebrow="Gobierno del sistema" title="Configuración" description="Horario operativo y salud de las conexiones, sin revelar secretos." />
    <div className="admin-grid admin-grid--2">
      <Card title="Horario del spa" subtitle="Se usa para calcular capacidad y ocupación">
        <form action={saveConfig} className="admin-form">
          <div className="admin-form admin-form--2"><label>Abre<input name="abre" type="time" defaultValue={schedule?.open || '09:00'} required/></label><label>Cierra<input name="cierra" type="time" defaultValue={schedule?.close || '20:00'} required/></label></div>
          <fieldset className="admin-days"><legend>Días de operación</legend>{days.map(([value,label]) => <label key={value}><input type="checkbox" name="dias" value={value} defaultChecked={schedule?.days ? schedule.days.includes(value) : !['domingo'].includes(value)}/><span>{label}</span></label>)}</fieldset>
          <button className="admin-primary-button">Guardar horario</button>
        </form>
      </Card>
      <Card title="Conexiones" subtitle="Comprobación por presencia de configuración">
        <div className="admin-list">{connections.map(([name,active]) => <div className="admin-list-row" key={name}><div className="admin-list-row__main"><strong>{name}</strong><span>{active ? 'Configuración detectada' : 'Falta configuración'}</span></div><Badge status={active ? 'Activo' : 'Pendiente'}/></div>)}</div>
      </Card>
    </div>
  </div>
}
