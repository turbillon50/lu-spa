'use client'
import Link from 'next/link'
import { treatments } from '../../data/treatments'

const masajes = treatments.filter((t) => t.category === 'masajes')
const corporales = treatments.filter((t) => t.category === 'corporales')

export default function RelajatePage() {
  return (
    <div className="page-enter" style={{ background: 'var(--ivory)' }}>

      {/* Hero */}
      <div style={{ position: 'relative', height: 340, background: '#EDE6D9', overflow: 'hidden' }}>
        <img src="/img/relajate-2.jpg" alt="Masajes Lucienne" loading="eager"
          className="photo-warm"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(26,18,9,0.06) 0%, rgba(26,18,9,0.68) 100%)' }} />
        <div style={{ position: 'absolute', bottom: 30, left: 26, right: 26 }}>
          <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(201,169,107,0.85)', fontWeight: 500, marginBottom: 8 }}>Masajes y rituales</p>
          <h1 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(42px, 9vw, 64px)', color: '#FEFCF8', fontWeight: 300, lineHeight: 1.02, letterSpacing: '-0.01em' }}>Relajate</h1>
        </div>
      </div>

      <div style={{ padding: '28px 22px 8px' }}>
        <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 14, color: 'var(--taupe)', lineHeight: 1.75 }}>
          Deja ir el peso del día. Cada masaje en Lucienne está diseñado para trabajar cuerpo, mente y sistema nervioso.
        </p>
      </div>

      {/* Masajes */}
      <section style={{ padding: '24px 22px 40px' }}>
        <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 9, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 500, marginBottom: 6 }}>Masajes</p>
        <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 24, color: 'var(--espresso)', marginBottom: 20 }}>Para tu descanso</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {masajes.map((t) => (
            <TreatmentCard key={t.id} treatment={t} />
          ))}
        </div>
      </section>

      {/* Corporales */}
      <section style={{ padding: '0 22px 60px' }}>
        <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 9, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 500, marginBottom: 6 }}>Tratamientos corporales</p>
        <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 24, color: 'var(--espresso)', marginBottom: 20 }}>Para tu cuerpo</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {corporales.map((t) => (
            <TreatmentCard key={t.id} treatment={t} />
          ))}
        </div>
      </section>

      {/* Para dos teaser */}
      <section style={{ padding: '0 22px 60px' }}>
        <Link href="/para-dos" style={{ textDecoration: 'none' }}>
          <div style={{ borderRadius: 18, overflow: 'hidden', height: 180, position: 'relative', background: '#EDE6D9' }}>
            <img src="/img/parados.jpg" alt="Experiencia para dos" loading="lazy"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(26,18,9,0.45)' }} />
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 24px' }}>
              <p style={{ fontFamily: 'var(--font-pinyon)', fontSize: 26, color: 'rgba(232,213,168,0.9)', marginBottom: 6 }}>¿Para dos?</p>
              <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 12, color: 'rgba(254,252,248,0.75)' }}>Suite privada, masaje sincronizado, champagne →</p>
            </div>
          </div>
        </Link>
      </section>
    </div>
  )
}

function TreatmentCard({ treatment: t }: { treatment: typeof treatments[0] }) {
  return (
    <div style={{ borderRadius: 16, overflow: 'hidden', background: 'rgba(237,230,217,0.4)', border: '1px solid rgba(201,169,107,0.12)' }}>
      <div style={{ height: 160, background: '#EDE6D9', position: 'relative' }}>
        <img src={t.image} alt={t.name} loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
      <div style={{ padding: '18px 18px 14px' }}>
        <h3 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 22, color: 'var(--espresso)', fontWeight: 500, marginBottom: 6 }}>{t.name}</h3>
        <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 12, color: 'var(--taupe)', lineHeight: 1.65, marginBottom: 10 }}>{t.description}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
          {t.benefits.map((b) => (
            <span key={b} style={{ fontFamily: 'var(--font-montserrat)', fontSize: 10, color: 'var(--taupe)', background: 'rgba(201,169,107,0.1)', border: '1px solid rgba(201,169,107,0.2)', borderRadius: 20, padding: '3px 10px' }}>{b}</span>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 11, color: 'var(--taupe)', marginBottom: 2 }}>{t.duration} min</p>
            <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: 22, color: 'var(--espresso)', fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>${t.price.toLocaleString('es-MX')}</p>
          </div>
          <Link href={`/reservar?t=${t.id}&name=${encodeURIComponent(t.name)}&price=${t.price}&duration=${t.duration}`} style={{ background: 'var(--espresso)', color: '#FEFCF8', padding: '11px 20px', borderRadius: 22, textDecoration: 'none', fontFamily: 'var(--font-montserrat)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600 }}>
            Reservar
          </Link>
        </div>
      </div>
    </div>
  )
}
