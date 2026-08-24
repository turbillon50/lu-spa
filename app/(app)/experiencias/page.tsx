'use client'
import Link from 'next/link'
import { packages } from '../../data/packages'

const categories = [
  { href: '/relajate', label: 'Relajación', sub: 'Masajes y rituales', image: '/img/relajate-2.jpg', count: 6 },
  { href: '/renueva', label: 'Renovación', sub: 'Faciales y diagnóstico', image: '/img/renueva-1.jpg', count: 5 },
  { href: '/transforma', label: 'Transformación', sub: 'Tecnología estética', image: '/img/transforma-1.jpg', count: 7 },
  { href: '/para-dos', label: 'Para Dos', sub: 'Experiencias en pareja', image: '/img/parados.jpg', count: 3 },
]

export default function ExperienciasPage() {
  return (
    <div style={{ background: 'var(--ivory)' }}>

      {/* Header */}
      <div style={{ padding: '40px 24px 32px' }}>
        <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 9, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 500, marginBottom: 10 }}>
          Catálogo completo
        </p>
        <h1 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 36, color: 'var(--espresso)', fontWeight: 300, lineHeight: 1.1, marginBottom: 12 }}>
          Experiencias<br/>Lucienne
        </h1>
        <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 13, color: 'var(--taupe)', lineHeight: 1.7 }}>
          Cada tratamiento es una experiencia diseñada para transformarte.
        </p>
      </div>

      {/* Categories */}
      <section style={{ padding: '0 20px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {categories.map((cat) => (
            <Link key={cat.href} href={cat.href} style={{ textDecoration: 'none' }}>
              <div style={{ borderRadius: 16, overflow: 'hidden', aspectRatio: '3/4', background: '#EDE6D9', position: 'relative' }}>
                <img src={cat.image} alt={cat.label} loading="lazy"
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,18,9,0.75) 0%, rgba(26,18,9,0.05) 50%)' }} />
                <div style={{ position: 'absolute', bottom: 16, left: 14, right: 14 }}>
                  <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 8, letterSpacing: '0.18em', color: 'rgba(201,169,107,0.85)', textTransform: 'uppercase', fontWeight: 500, marginBottom: 3 }}>
                    {cat.count} tratamientos
                  </p>
                  <h3 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 22, color: '#FEFCF8', fontWeight: 400, lineHeight: 1.1 }}>
                    {cat.label}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Paquetes */}
      <section style={{ padding: '0 20px 60px' }}>
        <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 9, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 500, marginBottom: 8 }}>Paquetes y rituales</p>
        <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 26, color: 'var(--espresso)', marginBottom: 20 }}>Experiencias completas</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {packages.map((pkg) => (
            <Link key={pkg.id} href={`/experiencias/${pkg.id}`} style={{ textDecoration: 'none' }}>
              <div style={{ display: 'flex', gap: 14, padding: '14px', borderRadius: 14, background: 'rgba(237,230,217,0.4)', border: '1px solid rgba(201,169,107,0.12)' }}>
                <div style={{ width: 80, height: 80, borderRadius: 10, overflow: 'hidden', flexShrink: 0, background: '#EDE6D9' }}>
                  <img src={pkg.image} alt={pkg.name} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ flex: 1 }}>
                  {pkg.badge && (
                    <span style={{ fontFamily: 'var(--font-montserrat)', fontSize: 8, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C9A96B', fontWeight: 600, background: 'rgba(201,169,107,0.12)', padding: '2px 8px', borderRadius: 10, marginBottom: 5, display: 'inline-block' }}>
                      {pkg.badge}
                    </span>
                  )}
                  <h3 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 19, color: 'var(--espresso)', fontWeight: 500, marginBottom: 3 }}>{pkg.name}</h3>
                  <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 11, color: 'var(--taupe)', marginBottom: 6 }}>{pkg.duration} min · {pkg.persons === 2 ? 'para dos' : '1 persona'}</p>
                  <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 14, color: 'var(--espresso)', fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>
                    ${pkg.price.toLocaleString('es-MX')}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Quiz */}
      <section style={{ padding: '0 20px 60px' }}>
        <div style={{ background: 'var(--espresso)', borderRadius: 18, padding: '28px 22px' }}>
          <p style={{ fontFamily: 'var(--font-pinyon)', fontSize: 24, color: 'rgba(232,213,168,0.85)', marginBottom: 10 }}>¿No sabes por dónde empezar?</p>
          <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 13, color: 'rgba(254,252,248,0.65)', lineHeight: 1.65, marginBottom: 18 }}>
            4 preguntas y te decimos exactamente qué experiencia es para ti.
          </p>
          <Link href="/quiz" style={{ display: 'inline-flex', background: '#C9A96B', color: '#1A1209', padding: '11px 22px', borderRadius: 22, textDecoration: 'none', fontFamily: 'var(--font-montserrat)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>
            Descubrir mi experiencia
          </Link>
        </div>
      </section>
    </div>
  )
}
