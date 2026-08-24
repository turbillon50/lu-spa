'use client'
import Link from 'next/link'
import { adminKPIs, reservasHoy, topTratamientos, clientasRecientes } from '../data/admin'

function KPI({ label, value, sub, color }: { label: string; value: string; sub?: string; color?: string }) {
  return (
    <div style={{ padding: '18px 0 14px', borderBottom: '1px solid rgba(201,169,107,0.08)' }}>
      <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(201,169,107,0.55)', fontWeight: 500, marginBottom: 6 }}>{label}</p>
      <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: 38, color: color || '#FEFCF8', fontVariantNumeric: 'tabular-nums', lineHeight: 1, marginBottom: 2 }}>{value}</p>
      {sub && <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 11, color: 'rgba(254,252,248,0.35)' }}>{sub}</p>}
    </div>
  )
}

export default function AdminDashboard() {
  const now = new Date()
  const horas = now.getHours()
  const saludo = horas < 12 ? 'Buenos días' : horas < 18 ? 'Buenas tardes' : 'Buenas noches'

  return (
    <div style={{ background: '#0A0814', minHeight: '100dvh', color: '#FEFCF8' }}>
      <div style={{ padding: '28px 22px 0' }}>
        <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 11, color: 'rgba(201,169,107,0.55)', letterSpacing: '0.08em', marginBottom: 4 }}>{saludo}</p>
        <h1 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 30, color: '#FEFCF8', fontWeight: 300, marginBottom: 24 }}>Dashboard</h1>
      </div>

      {/* KPIs */}
      <section style={{ padding: '0 22px 8px' }}>
        <KPI label="Reservas hoy" value={String(adminKPIs.reservasHoy)} sub="4 matutinas · 4 vespertinas" />
        <KPI label="Ingresos este mes" value={`$${adminKPIs.ingresosMes.toLocaleString('es-MX')}`} sub="MXN · +12% vs mes anterior" color="#C9A96B" />
        <KPI label="Clientas activas" value={String(adminKPIs.clientasActivas)} sub="Últ. 30 días" />
        <KPI label="Membresías activas" value={String(adminKPIs.membresiasActivas)} sub="Essentielle 12 · Signature 16 · Privé 6" color="#C9A96B" />
      </section>

      {/* Hoy */}
      <section style={{ padding: '24px 22px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(201,169,107,0.55)', fontWeight: 500 }}>Reservas de hoy</p>
          <Link href="/admin/reservas" style={{ fontFamily: 'var(--font-montserrat)', fontSize: 11, color: '#C9A96B', textDecoration: 'none', letterSpacing: '0.06em' }}>Ver todas →</Link>
        </div>
        {reservasHoy.slice(0, 4).map((r) => (
          <div key={r.id} style={{ borderBottom: '1px solid rgba(201,169,107,0.06)', padding: '12px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: 17, color: '#FEFCF8', marginBottom: 2 }}>{r.clienta}</p>
              <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 11, color: 'rgba(254,252,248,0.4)' }}>{r.tratamiento} · {r.hora}</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontFamily: 'var(--font-montserrat)', fontSize: 10, color: r.estado === 'confirmada' ? '#C9A96B' : r.estado === 'completada' ? 'rgba(254,252,248,0.35)' : 'rgba(254,252,248,0.5)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500 }}>{r.estado}</span>
            </div>
          </div>
        ))}
      </section>

      {/* Top tratamientos */}
      <section style={{ padding: '24px 22px 0' }}>
        <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(201,169,107,0.55)', fontWeight: 500, marginBottom: 14 }}>Top tratamientos</p>
        {topTratamientos.map((t, i) => (
          <div key={t.nombre} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <span style={{ fontFamily: 'var(--font-cormorant)', fontSize: 14, color: 'rgba(201,169,107,0.4)', width: 16, textAlign: 'right', flexShrink: 0 }}>{i + 1}</span>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontFamily: 'var(--font-montserrat)', fontSize: 12, color: '#FEFCF8' }}>{t.nombre}</span>
                <span style={{ fontFamily: 'var(--font-montserrat)', fontSize: 11, color: 'rgba(254,252,248,0.4)', fontVariantNumeric: 'tabular-nums' }}>{t.sesiones} ses.</span>
              </div>
              <div style={{ height: 3, background: 'rgba(201,169,107,0.1)', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{ height: '100%', background: '#C9A96B', borderRadius: 2, width: `${(t.sesiones / topTratamientos[0].sesiones) * 100}%`, opacity: 0.6 + (i === 0 ? 0.4 : 0) }} />
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Clientas recientes */}
      <section style={{ padding: '24px 22px 30px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(201,169,107,0.55)', fontWeight: 500 }}>Clientas recientes</p>
          <Link href="/admin/clientas" style={{ fontFamily: 'var(--font-montserrat)', fontSize: 11, color: '#C9A96B', textDecoration: 'none' }}>Ver todas →</Link>
        </div>
        {clientasRecientes.map((c) => (
          <div key={c.nombre} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(201,169,107,0.06)', padding: '10px 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(201,169,107,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontFamily: 'var(--font-cormorant)', fontSize: 14, color: '#C9A96B' }}>{c.nombre[0]}</span>
              </div>
              <div>
                <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 12, color: '#FEFCF8', fontWeight: 500 }}>{c.nombre}</p>
                <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 10, color: 'rgba(254,252,248,0.35)' }}>{c.visitas} visitas · {c.membresia || 'Sin membresía'}</p>
              </div>
            </div>
            <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 11, color: 'rgba(254,252,248,0.3)' }}>{c.ultimaVisita}</p>
          </div>
        ))}
      </section>
    </div>
  )
}
