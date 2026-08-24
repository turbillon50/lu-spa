'use client'
import Link from 'next/link'
import { treatments } from '../../data/treatments'

const faciales = treatments.filter((t) => t.category === 'faciales')

export default function RenuevePage() {
  return (
    <div style={{ background: 'var(--ivory)' }}>

      {/* Hero */}
      <div style={{ position: 'relative', height: 260, background: '#F0E2DA', overflow: 'hidden' }}>
        <img src="/img/renueva-1.jpg" alt="Faciales Lucienne" loading="eager"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(26,18,9,0.08) 0%, rgba(26,18,9,0.62) 100%)' }} />
        <div style={{ position: 'absolute', bottom: 24, left: 24, right: 24 }}>
          <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 9, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(201,160,140,0.85)', fontWeight: 500, marginBottom: 6 }}>Faciales y diagnóstico</p>
          <h1 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 38, color: '#FEFCF8', fontWeight: 300, lineHeight: 1.05 }}>Renueva</h1>
        </div>
      </div>

      <div style={{ padding: '28px 22px 8px' }}>
        <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 14, color: 'var(--taupe)', lineHeight: 1.75 }}>
          Tu piel merece atención personalizada. Empezamos por entenderla antes de tratarla.
        </p>
      </div>

      {/* Scanner IA Teaser */}
      <section style={{ padding: '20px 22px 32px' }}>
        <div style={{ borderRadius: 18, overflow: 'hidden', background: 'var(--espresso)', padding: '0' }}>
          <div style={{ height: 160, position: 'relative', background: '#EFE1D9' }}>
            <img src="/img/renueva-scanner.jpg" alt="Facial Scanner IA" loading="lazy"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(26,18,9,0.35)' }} />
          </div>
          <div style={{ padding: '20px 20px 22px' }}>
            <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(201,160,140,0.8)', fontWeight: 600, marginBottom: 8 }}>Diagnóstico Facial Scanner IA</p>
            <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 24, color: '#FEFCF8', fontWeight: 300, lineHeight: 1.2, marginBottom: 10 }}>Primero entendemos tu piel. Después diseñamos tu experiencia.</h2>
            <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 12, color: 'rgba(250,245,240,0.6)', lineHeight: 1.65, marginBottom: 16 }}>
              Análisis profundo con tecnología de mapeo facial que detecta hidratación, manchas, poros, líneas y más.
            </p>
            <Link href="/reservar?t=scanner-facial&name=Diagnóstico%20Facial%20Scanner&price=800&duration=30" style={{ display: 'inline-flex', background: '#E07560', color: '#FEFCF8', padding: '10px 20px', borderRadius: 22, textDecoration: 'none', fontFamily: 'var(--font-montserrat)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>
              Descubre qué necesita tu piel
            </Link>
          </div>
        </div>
      </section>

      {/* Faciales */}
      <section style={{ padding: '0 22px 60px' }}>
        <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 9, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 500, marginBottom: 6 }}>Tratamientos faciales</p>
        <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 24, color: 'var(--espresso)', marginBottom: 20 }}>Para tu piel</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {faciales.map((t) => (
            <div key={t.id} style={{ borderRadius: 16, overflow: 'hidden', background: 'rgba(237,230,217,0.4)', border: '1px solid rgba(201,160,140,0.12)' }}>
              <div style={{ height: 150, background: '#F0E2DA', position: 'relative' }}>
                <img src={t.image} alt={t.name} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '16px 16px 14px' }}>
                <h3 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 21, color: 'var(--espresso)', fontWeight: 500, marginBottom: 6 }}>{t.name}</h3>
                <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 12, color: 'var(--taupe)', lineHeight: 1.65, marginBottom: 10 }}>{t.description}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
                  {t.benefits.map((b) => (
                    <span key={b} style={{ fontFamily: 'var(--font-montserrat)', fontSize: 10, color: 'var(--taupe)', background: 'rgba(201,160,140,0.1)', border: '1px solid rgba(201,160,140,0.2)', borderRadius: 20, padding: '3px 10px' }}>{b}</span>
                  ))}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 11, color: 'var(--taupe)', marginBottom: 2 }}>{t.duration} min</p>
                    <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: 22, color: 'var(--espresso)', fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>${t.price.toLocaleString('es-MX')}</p>
                  </div>
                  <Link href={`/reservar?t=${t.id}&name=${encodeURIComponent(t.name)}&price=${t.price}&duration=${t.duration}`} style={{ background: '#E07560', color: '#FEFCF8', padding: '11px 18px', borderRadius: 22, textDecoration: 'none', fontFamily: 'var(--font-montserrat)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600 }}>
                    Reservar
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
