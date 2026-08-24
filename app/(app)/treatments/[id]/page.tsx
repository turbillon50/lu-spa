'use client'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { treatments } from '../../../data/treatments'

export default function TreatmentDetail() {
  const { id } = useParams<{ id: string }>()
  const treatment = treatments.find((t) => t.id === id)
  if (!treatment) {
    return (
      <div style={{ padding: '40px 24px', textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: 24, color: 'var(--espresso)' }}>Tratamiento no encontrado</p>
        <Link href="/relajate" style={{ color: 'var(--taupe)', fontFamily: 'var(--font-montserrat)', fontSize: 13 }}>Ver tratamientos →</Link>
      </div>
    )
  }
  return (
    <div style={{ background: 'var(--ivory)' }}>
      <div style={{ height: 220, background: '#EDE6D9', position: 'relative', overflow: 'hidden' }}>
        <img src={treatment.image} alt={treatment.name} loading="eager" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(26,18,9,0.5)' }} />
        <div style={{ position: 'absolute', bottom: 20, left: 22, right: 22 }}>
          <h1 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 30, color: '#FEFCF8', fontWeight: 400 }}>{treatment.name}</h1>
          <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 12, color: 'rgba(254,252,248,0.75)' }}>{treatment.duration} min · ${treatment.price.toLocaleString('es-MX')}</p>
        </div>
      </div>
      <div style={{ padding: '28px 22px 60px' }}>
        <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 14, color: 'var(--taupe)', lineHeight: 1.75, marginBottom: 20 }}>{treatment.description}</p>
        <div style={{ marginBottom: 20 }}>
          <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--taupe)', fontWeight: 500, marginBottom: 10 }}>Incluye</p>
          {treatment.includes.map((i) => (
            <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 6 }}>
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--gold)', flexShrink: 0, marginTop: 7 }} />
              <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 13, color: 'var(--espresso)' }}>{i}</p>
            </div>
          ))}
        </div>
        <div style={{ marginBottom: 28 }}>
          <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--taupe)', fontWeight: 500, marginBottom: 10 }}>Beneficios</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {treatment.benefits.map((b) => (
              <span key={b} style={{ fontFamily: 'var(--font-montserrat)', fontSize: 11, color: 'var(--taupe)', background: 'rgba(201,169,107,0.1)', border: '1px solid rgba(201,169,107,0.2)', borderRadius: 20, padding: '4px 12px' }}>{b}</span>
            ))}
          </div>
        </div>
        <Link href={`/reservar?t=${treatment.id}&name=${encodeURIComponent(treatment.name)}&price=${treatment.price}&duration=${treatment.duration}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--espresso)', color: '#FEFCF8', padding: '15px', borderRadius: 22, textDecoration: 'none', fontFamily: 'var(--font-montserrat)', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>
          Reservar
        </Link>
      </div>
    </div>
  )
}
