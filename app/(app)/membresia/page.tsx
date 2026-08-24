'use client'
import Link from 'next/link'
import { useState } from 'react'
import { membershipTiers } from '../../data/membership'

export default function MembresiasPage() {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly')

  return (
    <div className="page-enter" style={{ background: 'var(--ivory)' }}>

      {/* Hero */}
      <div style={{ position: 'relative', height: 300, background: 'var(--espresso)', overflow: 'hidden' }}>
        <img src="/img/membresia.jpg" alt="Membresías Lucienne" loading="eager"
          className="photo-warm"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.45 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(26,18,9,0.6)' }} />
        <div style={{ position: 'absolute', bottom: 24, left: 24, right: 24 }}>
          <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(201,169,107,0.65)', fontWeight: 500, marginBottom: 10 }}>Club privado</p>
          <h1 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(38px, 8vw, 58px)', color: '#FEFCF8', fontWeight: 300, lineHeight: 1.02, letterSpacing: '-0.01em' }}>Lucienne<br/>Membership</h1>
        </div>
      </div>

      <div style={{ padding: '32px 22px 16px' }}>
        <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 14, color: 'var(--taupe)', lineHeight: 1.75, marginBottom: 28 }}>
          El bienestar constante cambia todo. Únete al club privado Lucienne y transforma tu relación con el cuidado personal.
        </p>

        {/* Billing toggle */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 28, background: 'rgba(237,230,217,0.4)', borderRadius: 14, padding: 4 }}>
          {[{ id: 'monthly' as const, label: 'Mensual' }, { id: 'annual' as const, label: 'Anual · 2 meses gratis' }].map((b) => (
            <button key={b.id} onClick={() => setBilling(b.id)} style={{ flex: 1, padding: '10px', borderRadius: 11, border: 'none', cursor: 'pointer', fontFamily: 'var(--font-montserrat)', fontSize: 11, fontWeight: billing === b.id ? 600 : 400, background: billing === b.id ? 'var(--espresso)' : 'transparent', color: billing === b.id ? '#FEFCF8' : 'var(--taupe)', transition: 'all 0.2s' }}>
              {b.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tiers */}
      <section className="membresia-tiers" style={{ padding: '0 22px 60px', display: 'flex', flexDirection: 'column', gap: 18 }}>
        {membershipTiers.map((tier) => (
          <div key={tier.id} style={{ borderRadius: 20, overflow: 'hidden', background: tier.bgColor, boxShadow: tier.id === 'signature' ? '0 8px 32px rgba(44,31,23,0.20)' : '0 4px 16px rgba(44,31,23,0.08)' }}>
            {tier.id === 'signature' && (
              <div style={{ background: '#C9A96B', padding: '6px 20px', textAlign: 'center' }}>
                <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#1A1209', fontWeight: 700 }}>Más elegida</p>
              </div>
            )}
            <div style={{ padding: '24px 22px' }}>
              <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 30, color: tier.textColor, fontWeight: 400, marginBottom: 4 }}>{tier.name}</h2>
              <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 12, color: tier.id === 'signature' ? 'rgba(254,252,248,0.65)' : 'var(--taupe)', marginBottom: 18, fontStyle: 'italic' }}>{tier.tagline}</p>

              <div style={{ marginBottom: 20 }}>
                <span style={{ fontFamily: 'var(--font-cormorant)', fontSize: 40, color: tier.id === 'prive' ? '#1A1209' : tier.textColor, fontVariantNumeric: 'tabular-nums', lineHeight: 1 }}>
                  ${(billing === 'monthly' ? tier.priceMonthly : Math.round(tier.priceAnnual / 12)).toLocaleString('es-MX')}
                </span>
                <span style={{ fontFamily: 'var(--font-montserrat)', fontSize: 12, color: tier.id === 'signature' ? 'rgba(254,252,248,0.5)' : 'var(--taupe)', marginLeft: 4 }}>/mes</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 22 }}>
                {tier.features.map((f) => (
                  <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={tier.accentColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: 2, flexShrink: 0 }}>
                      <path d="M20 6L9 17l-5-5"/>
                    </svg>
                    <span style={{ fontFamily: 'var(--font-montserrat)', fontSize: 13, color: tier.id === 'signature' ? 'rgba(254,252,248,0.8)' : 'var(--espresso)', lineHeight: 1.4 }}>{f}</span>
                  </div>
                ))}
              </div>

              <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 11, color: tier.id === 'signature' ? 'rgba(254,252,248,0.5)' : 'var(--taupe)', marginBottom: 16 }}>
                Regalo de bienvenida: {tier.welcomeGift}
              </p>

              <Link href={`/checkout?membership=${tier.id}&billing=${billing}`} className="btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: tier.accentColor, color: tier.id === 'signature' ? '#2C1F17' : tier.id === 'prive' ? '#FEFCF8' : '#FEFCF8', padding: '13px', borderRadius: 22, textDecoration: 'none', fontFamily: 'var(--font-montserrat)', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>
                Unirme a {tier.name}
              </Link>
            </div>
          </div>
        ))}
      </section>

      {/* FAQ */}
      <section style={{ padding: '0 22px 60px' }}>
        <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 24, color: 'var(--espresso)', marginBottom: 18 }}>Preguntas frecuentes</h2>
        {[
          ['¿Puedo cambiar de nivel?', 'Sí, puedes subir o bajar de nivel en cualquier momento. Los cambios aplican al siguiente ciclo de facturación.'],
          ['¿Qué pasa si no uso todas mis sesiones?', 'Las sesiones no se acumulan al mes siguiente, pero puedes ceder tu sesión a una persona de tu confianza.'],
          ['¿Hay contrato de permanencia?', 'No. Puedes cancelar cuando quieras sin penalización. Solo aplica para el ciclo vigente.'],
          ['¿Incluye los tratamientos de aparatología?', 'Sí, el descuento aplica a todos nuestros servicios, incluyendo tecnología estética.'],
        ].map(([q, a]) => (
          <div key={q as string} style={{ borderBottom: '1px solid rgba(201,169,107,0.12)', padding: '16px 0' }}>
            <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: 18, color: 'var(--espresso)', marginBottom: 8 }}>{q as string}</p>
            <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 13, color: 'var(--taupe)', lineHeight: 1.65 }}>{a as string}</p>
          </div>
        ))}
      </section>
    </div>
  )
}
