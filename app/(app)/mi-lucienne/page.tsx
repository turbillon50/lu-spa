'use client'
import Link from 'next/link'
import { useMode } from '../../lib/mode'
import { useStore } from '../../lib/providers'
import { mockUser } from '../../data/mockUser'
import { membershipTiers } from '../../data/membership'

function fmt(dateStr: string) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('es-MX', { weekday: 'short', day: 'numeric', month: 'long' })
}

export default function MiLuciennePage() {
  const { mode } = useMode()
  const { appointments, cancelAppointment } = useStore()

  if (mode !== 'client') {
    return (
      <div style={{ background: 'var(--ivory)', minHeight: '70dvh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', textAlign: 'center' }}>
        <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'rgba(237,230,217,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--taupe)" strokeWidth="1.5">
            <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
          </svg>
        </div>
        <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 26, color: 'var(--espresso)', marginBottom: 10 }}>Mi Lucienne</h2>
        <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 14, color: 'var(--taupe)', lineHeight: 1.7, marginBottom: 24, maxWidth: 280 }}>
          Esta sección es para clientas registradas. Usa el selector de cuenta para ver la experiencia de Mariana Reyes.
        </p>
        <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 11, color: 'var(--gold)', letterSpacing: '0.08em' }}>Toca el avatar en la esquina superior derecha →</p>
      </div>
    )
  }

  const membership = membershipTiers.find((t) => t.id === 'signature')!
  const upcoming = appointments.filter((a) => a.status === 'confirmed').slice(0, 2)
  const history = appointments.filter((a) => a.status === 'completed')

  return (
    <div style={{ background: 'var(--ivory)' }}>

      {/* Header */}
      <div style={{ background: 'var(--espresso)', padding: '32px 22px 28px' }}>
        <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 9, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(201,169,107,0.6)', fontWeight: 500, marginBottom: 10 }}>Mi Lucienne</p>
        <h1 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 32, color: '#FEFCF8', fontWeight: 300, marginBottom: 6 }}>Hola, {mockUser.firstName}</h1>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(201,169,107,0.15)', border: '1px solid rgba(201,169,107,0.3)', borderRadius: 20, padding: '4px 12px' }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#C9A96B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2.7 10.3L12 22l9.3-11.7L17 3H7L2.7 10.3z"/><path d="M7 3l5 7.3L17 3M2.7 10.3h18.6"/>
          </svg>
          <span style={{ fontFamily: 'var(--font-montserrat)', fontSize: 10, letterSpacing: '0.12em', color: '#C9A96B', fontWeight: 600 }}>SIGNATURE</span>
        </div>
      </div>

      {/* Próxima reserva */}
      {upcoming[0] && (
        <section style={{ padding: '24px 22px 0' }}>
          <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 9, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 500, marginBottom: 12 }}>Próxima experiencia</p>
          <div style={{ background: 'rgba(237,230,217,0.5)', border: '1px solid rgba(201,169,107,0.18)', borderRadius: 16, padding: '18px 18px', marginBottom: 8 }}>
            <h3 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 22, color: 'var(--espresso)', marginBottom: 6 }}>{upcoming[0].treatmentName}</h3>
            <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 13, color: 'var(--taupe)', marginBottom: 4 }}>{fmt(upcoming[0].date)} · {upcoming[0].time}</p>
            <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 12, color: 'var(--sand)', marginBottom: 14 }}>{upcoming[0].cabin}</p>
            <button onClick={() => cancelAppointment(upcoming[0].id)} style={{ fontFamily: 'var(--font-montserrat)', fontSize: 11, color: 'var(--taupe)', background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '0.06em', textDecoration: 'underline' }}>
              Cancelar reserva
            </button>
          </div>
        </section>
      )}

      {/* Membresía */}
      <section style={{ padding: '24px 22px 0' }}>
        <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 9, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 500, marginBottom: 12 }}>Mi membresía</p>
        <div style={{ background: 'var(--espresso)', borderRadius: 18, padding: '20px 20px', boxShadow: 'inset 0 1px 0 rgba(201,169,107,0.2)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: 26, color: '#FEFCF8', marginBottom: 4 }}>Signature</p>
              <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 11, color: 'rgba(254,252,248,0.5)' }}>Vigente hasta sep 2026</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 10, color: 'rgba(201,169,107,0.6)', letterSpacing: '0.1em', marginBottom: 4 }}>SESIONES ESTE MES</p>
              <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: 28, color: '#C9A96B', fontVariantNumeric: 'tabular-nums' }}>1/2</p>
            </div>
          </div>
          <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid rgba(201,169,107,0.12)' }}>
            <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 11, color: 'rgba(254,252,248,0.5)', marginBottom: 8 }}>Beneficios activos</p>
            {['2 sesiones de 60 min', '15% de descuento', 'Prioridad de agenda'].map((b) => (
              <div key={b} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#C9A96B', flexShrink: 0 }} />
                <span style={{ fontFamily: 'var(--font-montserrat)', fontSize: 12, color: 'rgba(254,252,248,0.65)' }}>{b}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reservas */}
      {upcoming.length > 0 && (
        <section style={{ padding: '24px 22px 0' }}>
          <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 9, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 500, marginBottom: 12 }}>Mis próximas reservas</p>
          {upcoming.map((a) => (
            <div key={a.id} style={{ borderBottom: '1px solid rgba(201,169,107,0.12)', padding: '14px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: 17, color: 'var(--espresso)', marginBottom: 3 }}>{a.treatmentName}</p>
                <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 12, color: 'var(--taupe)' }}>{fmt(a.date)} · {a.time}</p>
              </div>
              <span style={{ fontFamily: 'var(--font-montserrat)', fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#2C1F17', background: 'rgba(201,169,107,0.15)', border: '1px solid rgba(201,169,107,0.3)', borderRadius: 20, padding: '3px 10px', fontWeight: 600 }}>Confirmada</span>
            </div>
          ))}
        </section>
      )}

      {/* Gift Cards */}
      <section style={{ padding: '24px 22px 0' }}>
        <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 9, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 500, marginBottom: 12 }}>Mis gift cards</p>
        {mockUser.giftCards.map((gc) => (
          <div key={gc.id} style={{ background: gc.status === 'active' ? 'rgba(201,169,107,0.08)' : 'rgba(237,230,217,0.3)', border: `1px solid ${gc.status === 'active' ? 'rgba(201,169,107,0.25)' : 'rgba(201,169,107,0.1)'}`, borderRadius: 14, padding: '16px', marginBottom: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: 17, color: gc.status === 'active' ? 'var(--espresso)' : 'var(--taupe)', marginBottom: 3 }}>{gc.experience}</p>
                <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 11, color: 'var(--taupe)', marginBottom: 3 }}>De: {gc.purchasedBy}</p>
                <p style={{ fontFamily: 'monospace', fontSize: 10, color: 'var(--sand)', letterSpacing: '0.12em' }}>{gc.code}</p>
              </div>
              <span style={{ fontFamily: 'var(--font-montserrat)', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: gc.status === 'active' ? '#C9A96B' : 'var(--taupe)', fontWeight: 700, background: gc.status === 'active' ? 'rgba(201,169,107,0.12)' : 'rgba(140,122,107,0.12)', borderRadius: 20, padding: '3px 10px' }}>
                {gc.status === 'active' ? 'Vigente' : 'Usada'}
              </span>
            </div>
          </div>
        ))}
      </section>

      {/* Historial */}
      {history.length > 0 && (
        <section style={{ padding: '24px 22px 0' }}>
          <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 9, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 500, marginBottom: 12 }}>Historial</p>
          {history.map((a) => (
            <div key={a.id} style={{ borderBottom: '1px solid rgba(201,169,107,0.1)', padding: '12px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: 16, color: 'var(--taupe)', marginBottom: 2 }}>{a.treatmentName}</p>
                <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 11, color: 'var(--sand)' }}>{fmt(a.date)}</p>
              </div>
              <span style={{ fontFamily: 'var(--font-montserrat)', fontSize: 10, color: 'var(--sand)', letterSpacing: '0.08em' }}>Completada</span>
            </div>
          ))}
        </section>
      )}

      <div style={{ padding: '24px 22px 60px' }}>
        <Link href="/reservar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--espresso)', color: '#FEFCF8', padding: '15px', borderRadius: 22, textDecoration: 'none', fontFamily: 'var(--font-montserrat)', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, marginTop: 16 }}>
          Nueva reserva
        </Link>
      </div>
    </div>
  )
}
