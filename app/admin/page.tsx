'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'

type Stats = {
  reservasHoy: number
  clientesActivos: number
  ingresosMes: number
  membresiasActivas: number
  topTratamientos: { nombre: string; sesiones: number }[]
  reservasDeHoy: { id: number; hora: string; estado: string; tratamiento: string; cliente_nombre: string; cliente_apellido: string }[]
  clientesRecientes: { nombre: string; apellido: string; membresia: string | null; visitas: number; ultima_visita: string | null }[]
}

function KPI({ label, value, sub, color }: { label: string; value: string; sub?: string; color?: string }) {
  return (
    <div style={{ padding: '20px 0 16px', borderBottom: '1px solid rgba(201,160,140,0.07)' }}>
      <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(201,160,140,0.5)', fontWeight: 500, marginBottom: 8 }}>{label}</p>
      <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(40px, 8vw, 52px)', color: color || '#FEFCF8', fontVariantNumeric: 'tabular-nums', lineHeight: 1, letterSpacing: '-0.01em', marginBottom: 4 }}>{value}</p>
      {sub && <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 11, color: 'rgba(250,245,240,0.3)', letterSpacing: '0.02em' }}>{sub}</p>}
    </div>
  )
}

export default function AdminDashboard() {
  const now = new Date()
  const horas = now.getHours()
  const saludo = horas < 12 ? 'Buenos días' : horas < 18 ? 'Buenas tardes' : 'Buenas noches'

  const days = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']
  const occupancy = [72, 85, 68, 91, 88, 95, 45] // ilustrativo -- no hay metrica de capacidad definida aun

  const [stats, setStats] = useState<Stats | null>(null)

  useEffect(() => {
    fetch('/api/admin/stats')
      .then((r) => r.json())
      .then(setStats)
      .catch(() => setStats(null))
  }, [])

  const topTratamientos = stats?.topTratamientos ?? []
  const reservasHoy = stats?.reservasDeHoy ?? []
  const clientasRecientes = stats?.clientesRecientes ?? []

  return (
    <div style={{ background: '#0A0814', minHeight: '100dvh', color: '#FEFCF8' }}>
      <div style={{ padding: '32px 22px 0' }}>
        <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 10, color: 'rgba(201,160,140,0.5)', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 500, marginBottom: 8 }}>{saludo} · Lucienne</p>
        <h1 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(32px, 6vw, 44px)', color: '#FEFCF8', fontWeight: 300, letterSpacing: '-0.01em', marginBottom: 28 }}>Dashboard</h1>
      </div>

      <div className="admin-dash-grid">
        {/* Left column */}
        <div>
          {/* KPIs */}
          <section style={{ padding: '0 22px 8px' }}>
            <KPI label="Reservas hoy" value={stats ? String(stats.reservasHoy) : '—'} />
            <KPI label="Ingresos este mes" value={stats ? `$${stats.ingresosMes.toLocaleString('es-MX')}` : '—'} sub="MXN" color="#C9A08C" />
            <KPI label="Clientas activas" value={stats ? String(stats.clientesActivos) : '—'} sub="Últ. 30 días" />
            <KPI label="Membresías activas" value={stats ? String(stats.membresiasActivas) : '—'} color="#C9A08C" />
          </section>

          {/* Top tratamientos */}
          <section style={{ padding: '24px 22px 0' }}>
            <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(201,160,140,0.55)', fontWeight: 500, marginBottom: 14 }}>Top tratamientos</p>
            {topTratamientos.map((t, i) => (
              <div key={t.nombre} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <span style={{ fontFamily: 'var(--font-cormorant)', fontSize: 14, color: 'rgba(201,160,140,0.4)', width: 16, textAlign: 'right', flexShrink: 0 }}>{i + 1}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontFamily: 'var(--font-montserrat)', fontSize: 12, color: '#FEFCF8' }}>{t.nombre}</span>
                    <span style={{ fontFamily: 'var(--font-montserrat)', fontSize: 11, color: 'rgba(250,245,240,0.4)', fontVariantNumeric: 'tabular-nums' }}>{t.sesiones} ses.</span>
                  </div>
                  <div style={{ height: 3, background: 'rgba(201,160,140,0.1)', borderRadius: 2, overflow: 'hidden' }}>
                    <div style={{ height: '100%', background: '#C9A08C', borderRadius: 2, width: `${(t.sesiones / (topTratamientos[0]?.sesiones || 1)) * 100}%`, opacity: 0.6 + (i === 0 ? 0.4 : 0) }} />
                  </div>
                </div>
              </div>
            ))}
          </section>
        </div>

        {/* Right column */}
        <div>
          {/* Weekly occupancy chart */}
          <section style={{ padding: '0 22px 24px' }}>
            <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(201,160,140,0.55)', fontWeight: 500, marginBottom: 14 }}>Ocupación semanal (%)</p>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 80 }}>
              {days.map((day, i) => (
                <div key={day} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <div style={{ width: '100%', background: 'rgba(201,160,140,0.1)', borderRadius: 4, overflow: 'hidden', height: 60 }}>
                    <div style={{ width: '100%', background: occupancy[i] > 85 ? '#C9A08C' : 'rgba(201,160,140,0.45)', borderRadius: 4, height: `${occupancy[i]}%`, marginTop: 'auto', transition: 'height 0.6s cubic-bezier(.22,1,.36,1)' }} />
                  </div>
                  <span style={{ fontFamily: 'var(--font-montserrat)', fontSize: 9, color: 'rgba(250,245,240,0.35)', letterSpacing: '0.04em' }}>{day}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Hoy */}
          <section style={{ padding: '0 22px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(201,160,140,0.55)', fontWeight: 500 }}>Reservas de hoy</p>
              <Link href="/admin/reservas" style={{ fontFamily: 'var(--font-montserrat)', fontSize: 11, color: '#C9A08C', textDecoration: 'none', letterSpacing: '0.06em' }}>Ver todas →</Link>
            </div>
            {reservasHoy.length === 0 && stats && (
              <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 12, color: 'rgba(250,245,240,0.4)' }}>Sin reservas para hoy.</p>
            )}
            {reservasHoy.slice(0, 4).map((r) => (
              <div key={r.id} style={{ borderBottom: '1px solid rgba(201,160,140,0.06)', padding: '12px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: 17, color: '#FEFCF8', marginBottom: 2 }}>{r.cliente_nombre} {r.cliente_apellido}</p>
                  <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 11, color: 'rgba(250,245,240,0.4)' }}>{r.tratamiento} · {r.hora?.slice(0, 5)}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontFamily: 'var(--font-montserrat)', fontSize: 10, color: r.estado === 'confirmada' ? '#C9A08C' : r.estado === 'completada' ? 'rgba(250,245,240,0.35)' : 'rgba(250,245,240,0.5)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500 }}>{r.estado}</span>
                </div>
              </div>
            ))}
          </section>

          {/* Clientas recientes */}
          <section style={{ padding: '24px 22px 30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(201,160,140,0.55)', fontWeight: 500 }}>Clientas recientes</p>
              <Link href="/admin/clientas" style={{ fontFamily: 'var(--font-montserrat)', fontSize: 11, color: '#C9A08C', textDecoration: 'none' }}>Ver todas →</Link>
            </div>
            {clientasRecientes.length === 0 && stats && (
              <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 12, color: 'rgba(250,245,240,0.4)' }}>Todavia no hay clientas registradas.</p>
            )}
            {clientasRecientes.map((c, i) => (
              <div key={`${c.nombre}-${i}`} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(201,160,140,0.06)', padding: '10px 0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(201,160,140,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontFamily: 'var(--font-cormorant)', fontSize: 14, color: '#C9A08C' }}>{(c.nombre || '?')[0]}</span>
                  </div>
                  <div>
                    <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 12, color: '#FEFCF8', fontWeight: 500 }}>{c.nombre} {c.apellido}</p>
                    <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 10, color: 'rgba(250,245,240,0.35)' }}>{c.visitas} visitas · {c.membresia || 'Sin membresía'}</p>
                  </div>
                </div>
                <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 11, color: 'rgba(250,245,240,0.3)', fontVariantNumeric: 'tabular-nums' }}>{c.ultima_visita ? new Date(c.ultima_visita).toLocaleDateString('es-MX', { day: 'numeric', month: 'short' }) : '—'}</p>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  )
}
