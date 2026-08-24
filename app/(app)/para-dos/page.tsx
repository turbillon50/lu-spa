'use client'
import Link from 'next/link'

const includes = [
  'Suite doble privada con ambientación especial',
  'Masaje sincronizado de 60 min para ambas',
  'Champagne o prosecco artesanal',
  'Tabla de quesos y frutos del bosque',
  'Aromaterapia dual personalizada',
  'Pediluvio ritual de bienvenida',
  'Música y luz diseñadas para el momento',
]

export default function ParaDosPage() {
  return (
    <div style={{ background: 'var(--ivory)' }}>

      {/* Hero full */}
      <div style={{ position: 'relative', height: '70vw', maxHeight: 520, background: '#EFE1D9', overflow: 'hidden' }}>
        <img src="/img/parados.jpg" alt="Experiencia para dos Lucienne" loading="eager"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(26,18,9,0.05) 0%, rgba(26,18,9,0.68) 100%)' }} />
        <div style={{ position: 'absolute', bottom: 28, left: 24, right: 24 }}>
          <p style={{ fontFamily: 'var(--font-pinyon)', fontSize: 30, color: 'rgba(224,208,196,0.9)', marginBottom: 8, letterSpacing: '0.01em' }}>Compartir es el lujo más grande.</p>
          <h1 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 42, color: '#FEFCF8', fontWeight: 300, lineHeight: 1.0, marginBottom: 16 }}>Experiencia<br/>para Dos</h1>
          <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 13, color: 'rgba(250,245,240,0.75)', lineHeight: 1.65, maxWidth: 280 }}>
            Suite privada, masaje sincronizado y un brindis que sella el momento.
          </p>
        </div>
      </div>

      {/* Incluye */}
      <section style={{ padding: '40px 24px 40px' }}>
        <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 9, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 500, marginBottom: 14 }}>Lo que incluye</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {includes.map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--gold)', flexShrink: 0, marginTop: 6 }} />
              <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 13, color: 'var(--espresso)', lineHeight: 1.6 }}>{item}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Details */}
      <section style={{ padding: '0 24px 40px' }}>
        <div style={{ background: 'rgba(237,230,217,0.5)', border: '1px solid rgba(201,160,140,0.15)', borderRadius: 16, padding: '22px 20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[['Duración', '120 min'], ['Personas', '2'], ['Precio', '$5,800 MXN'], ['Cabina', 'Suite Doble Privada']].map(([label, value]) => (
              <div key={label}>
                <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--taupe)', fontWeight: 500, marginBottom: 4 }}>{label}</p>
                <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: 20, color: 'var(--espresso)', fontVariantNumeric: 'tabular-nums' }}>{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Para quién */}
      <section style={{ padding: '0 24px 40px' }}>
        <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 9, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 500, marginBottom: 10 }}>Perfecta para</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {['Aniversarios', 'Cumpleaños', 'San Valentín', 'Amigos', 'Mama e hija', 'Solo porque sí'].map((tag) => (
            <span key={tag} style={{ fontFamily: 'var(--font-montserrat)', fontSize: 12, color: 'var(--espresso)', background: 'rgba(237,230,217,0.6)', border: '1px solid rgba(201,160,140,0.18)', borderRadius: 24, padding: '6px 16px' }}>{tag}</span>
          ))}
        </div>
      </section>

      {/* CTAs */}
      <section style={{ padding: '0 24px 60px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <Link href="/reservar?t=para-dos&name=Experiencia%20para%20Dos&price=5800&duration=120" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#E07560', color: '#FEFCF8', padding: '16px', borderRadius: 24, textDecoration: 'none', fontFamily: 'var(--font-montserrat)', fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>
          Crear una experiencia para dos
        </Link>
        <Link href="/gift-cards?pkg=para-dos" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', color: 'var(--espresso)', padding: '15px', borderRadius: 24, textDecoration: 'none', fontFamily: 'var(--font-montserrat)', fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, border: '1px solid rgba(44,31,23,0.2)' }}>
          Regalar esta experiencia
        </Link>
      </section>
    </div>
  )
}
