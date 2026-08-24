'use client'
import Link from 'next/link'
import { useMode } from '../../lib/mode'
import { useStore } from '../../lib/providers'
import { mockUser } from '../../data/mockUser'
import { membershipTiers } from '../../data/membership'
import { useUser } from '@clerk/nextjs'
import { RealAccountView } from '../../components/RealAccountView'

const CLERK_KEY = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

function fmt(dateStr: string) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'long' })
}

export default function MiLuciennePage() {
  const { mode } = useMode()
  const { appointments, cancelAppointment } = useStore()
  const { isSignedIn } = useUser()

  // Sesion real de Clerk (no el selector de modo demo) -> cuenta real,
  // con seguridad/passkey real. El resto de la pagina sigue siendo la
  // experiencia demo con datos de muestra.
  if (CLERK_KEY && isSignedIn) {
    return <RealAccountView />
  }

  if (mode !== 'client') {
    return (
      <div className="page-enter" style={{
        background: 'var(--ivory)', minHeight: '70dvh',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '40px 24px', textAlign: 'center',
      }}>
        <div style={{
          width: 72, height: 72, borderRadius: '50%',
          border: '1px solid rgba(201,160,140,0.25)',
          background: 'rgba(237,230,217,0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24,
        }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--taupe)" strokeWidth="1.5">
            <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
          </svg>
        </div>
        <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 32, color: 'var(--espresso)', marginBottom: 12, fontWeight: 300 }}>
          Mi Lucienne
        </h2>
        <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 14, color: 'var(--taupe)', lineHeight: 1.75, marginBottom: 28, maxWidth: '30ch' }}>
          Esta sección es para clientas registradas. Usa el selector de cuenta para ver la experiencia de Mariana Reyes.
        </p>
        <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 11, color: 'var(--gold)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          Toca el avatar en la esquina →
        </p>
      </div>
    )
  }

  const membership = membershipTiers.find((t) => t.id === 'signature')!
  const upcoming = appointments.filter((a) => a.status === 'confirmed').slice(0, 2)
  const history = appointments.filter((a) => a.status === 'completed')

  return (
    <div className="page-enter" style={{ background: 'var(--ivory)' }}>

      {/* ─── Dark header ─── */}
      <div style={{ background: 'var(--espresso)', padding: '36px 24px 32px' }}>
        <p style={{
          fontFamily: 'var(--font-montserrat)',
          fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase',
          color: 'rgba(201,160,140,0.55)', fontWeight: 500, marginBottom: 12,
        }}>
          Mi Lucienne
        </p>
        <h1 style={{
          fontFamily: 'var(--font-cormorant)',
          fontSize: 'clamp(34px, 7vw, 48px)',
          color: '#FEFCF8', fontWeight: 300,
          letterSpacing: '-0.01em', lineHeight: 1.05,
          marginBottom: 14,
        }}>
          Hola, {mockUser.firstName}
        </h1>
        {/* Membership badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 7,
          background: 'rgba(201,160,140,0.12)',
          border: '1px solid rgba(201,160,140,0.28)',
          borderRadius: 24, padding: '5px 14px',
        }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#C9A08C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2.7 10.3L12 22l9.3-11.7L17 3H7L2.7 10.3z"/>
            <path d="M7 3l5 7.3L17 3M2.7 10.3h18.6"/>
          </svg>
          <span style={{ fontFamily: 'var(--font-montserrat)', fontSize: 10, letterSpacing: '0.14em', color: '#C9A08C', fontWeight: 700 }}>SIGNATURE</span>
        </div>
      </div>

      {/* Quick actions */}
      <div style={{ padding: '24px 24px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {[
          { label: 'Nueva reserva', href: '/reservar', icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="3"/><path d="M16 2v4M8 2v4M3 10h18"/><circle cx="12" cy="16" r="1.5" fill="currentColor"/></svg>
          )},
          { label: 'Gift cards', href: '/gift-cards', icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="3" y="8" width="18" height="13" rx="2"/><path d="M12 8V21M8 8c0-2.2 1.8-4 4-4s4 1.8 4 4"/></svg>
          )},
        ].map((a) => (
          <Link key={a.href} href={a.href} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            gap: 8, padding: '18px 12px',
            borderRadius: 16, textDecoration: 'none',
            background: 'rgba(237,230,217,0.5)',
            border: '1px solid rgba(201,160,140,0.13)',
            transition: 'all 0.2s var(--spring)',
          }}>
            <div style={{ color: 'var(--taupe)' }}>{a.icon}</div>
            <span style={{
              fontFamily: 'var(--font-montserrat)',
              fontSize: 11, color: 'var(--espresso)',
              fontWeight: 500, textAlign: 'center',
            }}>
              {a.label}
            </span>
          </Link>
        ))}
      </div>

      {/* ─── Próxima experiencia ─── */}
      {upcoming[0] && (
        <section style={{ padding: '28px 24px 0' }}>
          <p style={{
            fontFamily: 'var(--font-montserrat)',
            fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase',
            color: 'var(--gold)', fontWeight: 500, marginBottom: 14,
          }}>
            Próxima experiencia
          </p>
          <div style={{
            background: 'rgba(237,230,217,0.5)',
            border: '1px solid rgba(201,160,140,0.18)',
            borderRadius: 18, padding: '22px 22px',
          }}>
            <h3 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 24, color: 'var(--espresso)', marginBottom: 6, fontWeight: 500 }}>
              {upcoming[0].treatmentName}
            </h3>
            <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 13, color: 'var(--taupe)', marginBottom: 3, textTransform: 'capitalize' }}>
              {fmt(upcoming[0].date)}
            </p>
            <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 13, color: 'var(--taupe)', marginBottom: 3 }}>
              {upcoming[0].time} · {upcoming[0].cabin}
            </p>
            <div style={{ marginTop: 18, paddingTop: 16, borderTop: '1px solid rgba(201,160,140,0.12)', display: 'flex', gap: 14 }}>
              <Link href="/reservar" style={{ fontFamily: 'var(--font-montserrat)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, color: 'var(--espresso)', textDecoration: 'none' }}>
                Reservar de nuevo
              </Link>
              <button onClick={() => cancelAppointment(upcoming[0].id)} style={{ fontFamily: 'var(--font-montserrat)', fontSize: 11, color: 'var(--taupe)', background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '0.06em', padding: 0 }}>
                Cancelar
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ─── Membresía ─── */}
      <section style={{ padding: '28px 24px 0' }}>
        <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 500, marginBottom: 14 }}>
          Mi membresía
        </p>
        <div style={{ background: 'var(--espresso)', borderRadius: 20, padding: '24px 22px', boxShadow: 'inset 0 1px 0 rgba(201,160,140,0.18)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
            <div>
              <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: 28, color: '#FEFCF8', fontWeight: 300, marginBottom: 4 }}>Signature</p>
              <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 11, color: 'rgba(250,245,240,0.4)' }}>Vigente hasta sep 2026</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 9, color: 'rgba(201,160,140,0.55)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 4 }}>Sesiones este mes</p>
              <p className="tabular" style={{ fontFamily: 'var(--font-cormorant)', fontSize: 32, color: '#C9A08C', lineHeight: 1 }}>1<span style={{ fontSize: 18, opacity: 0.5 }}>/2</span></p>
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(201,160,140,0.1)', paddingTop: 14 }}>
            {['2 sesiones de 60 min incluidas', '15% de descuento en todos los tratamientos', 'Prioridad de agenda'].map((b) => (
              <div key={b} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#C9A08C', flexShrink: 0, opacity: 0.7 }} />
                <span style={{ fontFamily: 'var(--font-montserrat)', fontSize: 12, color: 'rgba(250,245,240,0.6)' }}>{b}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Reservas próximas ─── */}
      {upcoming.length > 0 && (
        <section style={{ padding: '28px 24px 0' }}>
          <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 500, marginBottom: 14 }}>
            Próximas reservas
          </p>
          {upcoming.map((a) => (
            <div key={a.id} style={{ borderBottom: '1px solid rgba(201,160,140,0.1)', padding: '14px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: 18, color: 'var(--espresso)', marginBottom: 3, fontWeight: 500 }}>{a.treatmentName}</p>
                <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 12, color: 'var(--taupe)', textTransform: 'capitalize' }}>{fmt(a.date)} · {a.time}</p>
              </div>
              <span style={{
                fontFamily: 'var(--font-montserrat)', fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase',
                color: '#2C1F17', background: 'rgba(201,160,140,0.15)',
                border: '1px solid rgba(201,160,140,0.28)', borderRadius: 20,
                padding: '3px 10px', fontWeight: 700,
              }}>
                Confirmada
              </span>
            </div>
          ))}
        </section>
      )}

      {/* ─── Gift Cards ─── */}
      <section style={{ padding: '28px 24px 0' }}>
        <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 500, marginBottom: 14 }}>
          Mis gift cards
        </p>
        {mockUser.giftCards.map((gc) => (
          <div key={gc.id} style={{
            background: gc.status === 'active' ? 'rgba(201,160,140,0.07)' : 'rgba(237,230,217,0.3)',
            border: `1px solid ${gc.status === 'active' ? 'rgba(201,160,140,0.22)' : 'rgba(201,160,140,0.1)'}`,
            borderRadius: 14, padding: '16px 18px', marginBottom: 10,
            display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
          }}>
            <div>
              <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: 18, color: gc.status === 'active' ? 'var(--espresso)' : 'var(--taupe)', marginBottom: 3 }}>{gc.experience}</p>
              <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 11, color: 'var(--taupe)', marginBottom: 4 }}>De: {gc.purchasedBy}</p>
              <p style={{ fontFamily: 'monospace', fontSize: 10, color: 'var(--sand)', letterSpacing: '0.14em' }}>{gc.code}</p>
            </div>
            <span style={{
              fontFamily: 'var(--font-montserrat)', fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase',
              color: gc.status === 'active' ? '#C9A08C' : 'var(--taupe)', fontWeight: 700,
              background: gc.status === 'active' ? 'rgba(201,160,140,0.1)' : 'rgba(140,122,107,0.1)',
              borderRadius: 20, padding: '3px 10px', flexShrink: 0, marginLeft: 8,
            }}>
              {gc.status === 'active' ? 'Vigente' : 'Usada'}
            </span>
          </div>
        ))}
      </section>

      {/* ─── Historial ─── */}
      {history.length > 0 && (
        <section style={{ padding: '28px 24px 0' }}>
          <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 500, marginBottom: 14 }}>
            Historial
          </p>
          {history.map((a) => (
            <div key={a.id} style={{ borderBottom: '1px solid rgba(201,160,140,0.08)', padding: '12px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: 17, color: 'var(--taupe)', marginBottom: 2 }}>{a.treatmentName}</p>
                <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 11, color: 'var(--sand)', textTransform: 'capitalize' }}>{fmt(a.date)}</p>
              </div>
              <span style={{ fontFamily: 'var(--font-montserrat)', fontSize: 10, color: 'var(--sand)', letterSpacing: '0.08em' }}>Completada</span>
            </div>
          ))}
        </section>
      )}

      <div style={{ padding: '28px 24px 40px' }}>
        <Link href="/reservar" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'var(--espresso)', color: '#FEFCF8',
          padding: '15px', borderRadius: 24, textDecoration: 'none',
          fontFamily: 'var(--font-montserrat)', fontSize: 12,
          letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600,
        }}>
          Nueva reserva
        </Link>
      </div>
    </div>
  )
}
