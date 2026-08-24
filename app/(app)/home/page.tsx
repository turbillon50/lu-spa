'use client'
import Link from 'next/link'
import { treatments } from '../../data/treatments'

const pillars = [
  {
    id: 'relajate',
    href: '/relajate',
    label: 'RELAJATE',
    sub: 'Masajes y rituales',
    image: '/img/relajate-2.jpg',
    desc: 'Deja ir el peso del día. Nuestros masajes trabajan músculo, mente y sistema nervioso.',
  },
  {
    id: 'renueva',
    href: '/renueva',
    label: 'RENUEVA',
    sub: 'Faciales y diagnóstico',
    image: '/img/renueva-1.jpg',
    desc: 'Tu piel merece atención personalizada. Diagnóstico, tratamiento, luminosidad.',
  },
  {
    id: 'transforma',
    href: '/transforma',
    label: 'TRANSFORMA',
    sub: 'Tecnología estética',
    image: '/img/transforma-1.jpg',
    desc: 'Tecnología avanzada con resultados visibles. Sin cirugía, sin tiempo de recuperación.',
  },
]

const entryPaths = [
  { href: '/relajate', label: 'Quiero relajarme' },
  { href: '/renueva', label: 'Quiero cuidar mi piel' },
  { href: '/transforma', label: 'Quiero trabajar una zona' },
  { href: '/gift-cards', label: 'Quiero regalar una experiencia' },
  { href: '/para-dos', label: 'Quiero vivir algo especial' },
  { href: '/quiz', label: 'No sé qué necesito →' },
]

const testimonials = [
  { name: 'Valentina C.', role: 'Membresía Signature', text: 'Desde que empecé mi membresía, cambió mi manera de relacionarme con mi cuerpo. No es un lujo, es una necesidad.' },
  { name: 'Gabriela T.', role: 'Membresía Privé', text: 'El HIFU cambió mi piel de una manera que no esperaba. Resultados reales, sin recuperación, sin drama.' },
  { name: 'Ana Paula R.', role: 'Clienta frecuente', text: 'La experiencia para dos que reservé para mi aniversario fue perfecta. No teníamos nada que hacer más que estar ahí.' },
  { name: 'Sofía M.', role: 'Clienta frecuente', text: 'Vengo con Lucienne desde que abrieron. El equipo te conoce, sabe qué necesitas antes de que lo pidas.' },
]

const instaImgs = [
  { img: '/img/relajate-1.jpg', alt: 'Masaje con piedras calientes' },
  { img: '/img/galeria-1.jpg', alt: 'Recepción del spa' },
  { img: '/img/renueva-scanner.jpg', alt: 'Facial Scanner' },
  { img: '/img/parados.jpg', alt: 'Suite para dos' },
  { img: '/img/gift.jpg', alt: 'Gift card Lucienne' },
  { img: '/img/conocenos.jpg', alt: 'Espacio Lucienne' },
]

const featured = treatments.filter((t) => t.featured).slice(0, 3)

export default function HomePage() {
  return (
    <div style={{ background: 'var(--ivory)' }}>

      {/* HERO */}
      <section style={{ position: 'relative', height: 'min(92vw, 680px)', overflow: 'hidden', background: '#EDE6D9' }}>
        <img src="/img/hero-home.jpg" alt="Lucienne Beauty Spa" loading="eager"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(26,18,9,0.12) 0%, rgba(26,18,9,0.62) 100%)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '40px 28px' }}>
          <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 9, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(254,252,248,0.65)', fontWeight: 500, marginBottom: 10 }}>
            Paseos del Pedregal · CDMX
          </p>
          <h1 style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: 'clamp(40px, 9vw, 64px)', lineHeight: 1.0, color: '#FEFCF8', marginBottom: 8 }}>
            Lucienne<br/>Beauty Spa
          </h1>
          <p style={{ fontFamily: 'var(--font-pinyon)', fontSize: 22, color: 'rgba(232,213,168,0.9)', marginBottom: 12, letterSpacing: '0.01em' }}>
            The Lucienne Experience
          </p>
          <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 13, color: 'rgba(254,252,248,0.75)', fontWeight: 300, maxWidth: 300, lineHeight: 1.65, marginBottom: 20 }}>
            Un espacio creado para desconectarte del exterior y reconectar contigo.
          </p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Link href="/reservar" style={{ background: '#FEFCF8', color: '#2C1F17', padding: '12px 22px', borderRadius: 24, textDecoration: 'none', fontFamily: 'var(--font-montserrat)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>
              Reserva tu espacio
            </Link>
            <Link href="/experiencias" style={{ background: 'rgba(254,252,248,0.12)', color: '#FEFCF8', padding: '12px 22px', borderRadius: 24, textDecoration: 'none', fontFamily: 'var(--font-montserrat)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500, border: '1px solid rgba(254,252,248,0.30)', backdropFilter: 'blur(8px)' }}>
              Descubre Lucienne
            </Link>
          </div>
        </div>
      </section>

      {/* FILOSOFIA */}
      <section style={{ padding: '60px 28px', textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 9, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 500, marginBottom: 14 }}>Nuestra filosofía</p>
        <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 30, color: 'var(--espresso)', fontWeight: 400, lineHeight: 1.2, marginBottom: 18 }}>
          No vendemos tratamientos.<br/><em style={{ fontStyle: 'italic' }}>Vendemos experiencias.</em>
        </h2>
        <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 14, color: 'var(--taupe)', lineHeight: 1.75, maxWidth: 500, margin: '0 auto' }}>
          Cada visita a Lucienne es una pausa diseñada con intención. Desde el momento en que entras, el exterior queda fuera.
        </p>
      </section>

      {/* 3 PILLARS */}
      <section style={{ padding: '0 20px 60px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {pillars.map((p) => (
            <Link key={p.id} href={p.href} style={{ textDecoration: 'none' }}>
              <div style={{ position: 'relative', borderRadius: 20, overflow: 'hidden', height: 270, background: 'linear-gradient(135deg, #EDE6D9, #D4C5B0)' }}>
                <img src={p.image} alt={p.label} loading="lazy" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,18,9,0.72) 0%, rgba(26,18,9,0.08) 55%)' }} />
                <div style={{ position: 'absolute', bottom: 22, left: 22, right: 22 }}>
                  <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 9, letterSpacing: '0.22em', color: 'rgba(201,169,107,0.9)', fontWeight: 600, marginBottom: 5, textTransform: 'uppercase' }}>{p.sub}</p>
                  <h3 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 32, color: '#FEFCF8', fontWeight: 300, letterSpacing: '0.05em', marginBottom: 6 }}>{p.label}</h3>
                  <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 12, color: 'rgba(254,252,248,0.72)', lineHeight: 1.6 }}>{p.desc}</p>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 10, fontFamily: 'var(--font-montserrat)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(254,252,248,0.8)' }}>
                    Descubrir tratamientos <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ENTRY PATHS */}
      <section style={{ padding: '0 20px 60px' }}>
        <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 9, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 500, marginBottom: 6 }}>Tu camino de entrada</p>
        <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 26, color: 'var(--espresso)', marginBottom: 20 }}>¿Qué buscas hoy?</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
          {entryPaths.map((path) => {
            const isQuiz = path.label.includes('→')
            return (
              <Link key={path.href} href={path.href} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px 18px', borderRadius: 13, textDecoration: 'none', background: isQuiz ? 'var(--espresso)' : 'rgba(237,230,217,0.5)', border: isQuiz ? 'none' : '1px solid rgba(201,169,107,0.13)' }}>
                <span style={{ fontFamily: 'var(--font-montserrat)', fontSize: 14, fontWeight: 500, color: isQuiz ? '#FEFCF8' : 'var(--espresso)' }}>{path.label}</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={isQuiz ? '#C9A96B' : 'var(--taupe)'} strokeWidth="1.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            )
          })}
        </div>
      </section>

      {/* FEATURED */}
      <section style={{ padding: '0 0 60px' }}>
        <div style={{ padding: '0 20px', marginBottom: 20 }}>
          <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 9, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 500, marginBottom: 6 }}>Más solicitadas</p>
          <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 26, color: 'var(--espresso)' }}>Experiencias destacadas</h2>
        </div>
        <div style={{ display: 'flex', overflowX: 'auto', gap: 14, padding: '0 20px 8px', scrollbarWidth: 'none' }}>
          {featured.map((t) => (
            <Link key={t.id} href={`/treatments/${t.id}`} style={{ textDecoration: 'none', flexShrink: 0, width: 210 }}>
              <div style={{ borderRadius: 14, overflow: 'hidden', height: 155, background: '#EDE6D9' }}>
                <img src={t.image} alt={t.name} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '10px 2px 0' }}>
                <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: 17, color: 'var(--espresso)', fontWeight: 500, marginBottom: 3 }}>{t.name}</p>
                <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 11, color: 'var(--taupe)' }}>{t.duration} min · desde ${t.price.toLocaleString('es-MX')}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* MEMBERSHIP TEASER */}
      <section style={{ padding: '0 20px 60px' }}>
        <div style={{ borderRadius: 20, background: 'var(--espresso)', padding: '40px 26px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -50, right: -50, width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,169,107,0.1) 0%, transparent 70%)' }} />
          <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 9, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(201,169,107,0.7)', fontWeight: 600, marginBottom: 10 }}>Lucienne Membership</p>
          <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 28, color: '#FEFCF8', fontWeight: 300, lineHeight: 1.2, marginBottom: 14 }}>El bienestar constante<br/>cambia todo.</h2>
          <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 13, color: 'rgba(254,252,248,0.6)', lineHeight: 1.7, marginBottom: 22 }}>Desde $1,490/mes. Sesiones incluidas, descuentos en todos los tratamientos, prioridad de agenda.</p>
          <Link href="/membresia" style={{ display: 'inline-flex', background: '#C9A96B', color: '#1A1209', padding: '11px 22px', borderRadius: 22, textDecoration: 'none', fontFamily: 'var(--font-montserrat)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>
            Conocer membresías
          </Link>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: '0 0 60px' }}>
        <div style={{ padding: '0 20px', marginBottom: 20 }}>
          <p style={{ fontFamily: 'var(--font-pinyon)', fontSize: 26, color: 'var(--taupe)' }}>Experiencias que hablan por sí mismas.</p>
        </div>
        <div style={{ display: 'flex', overflowX: 'auto', gap: 14, padding: '0 20px 8px', scrollbarWidth: 'none' }}>
          {testimonials.map((t, i) => (
            <div key={i} style={{ flexShrink: 0, width: 268, background: i % 2 === 0 ? 'rgba(237,230,217,0.5)' : 'var(--espresso)', border: i % 2 === 0 ? '1px solid rgba(201,169,107,0.13)' : 'none', borderRadius: 16, padding: '20px 18px' }}>
              <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: 17, fontStyle: 'italic', color: i % 2 === 0 ? 'var(--espresso)' : '#FEFCF8', lineHeight: 1.55, marginBottom: 14 }}>"{t.text}"</p>
              <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 12, fontWeight: 600, color: i % 2 === 0 ? 'var(--espresso)' : '#FEFCF8' }}>{t.name}</p>
              <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 11, color: i % 2 === 0 ? 'var(--taupe)' : 'rgba(201,169,107,0.8)' }}>{t.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* JOURNAL */}
      <section style={{ padding: '0 20px 60px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
          <div>
            <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 9, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 500, marginBottom: 5 }}>Lucienne Journal</p>
            <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 24, color: 'var(--espresso)' }}>Leer &amp; aprender</h2>
          </div>
          <Link href="/journal" style={{ fontFamily: 'var(--font-montserrat)', fontSize: 11, color: 'var(--taupe)', textDecoration: 'none' }}>Ver todos →</Link>
        </div>
        {[{ slug: 'ritual-matutino-piel', title: 'El ritual matutino que tu piel necesita', cat: 'Cuidado de la piel', img: '/img/journal-1.jpg' },
          { slug: 'hifu-sin-cirugia', title: 'HIFU: el lifting sin bisturí que no es magia', cat: 'Tecnología estética', img: '/img/transforma-1.jpg' }
        ].map((art) => (
          <Link key={art.slug} href={`/journal/${art.slug}`} style={{ display: 'flex', gap: 14, textDecoration: 'none', marginBottom: 14 }}>
            <div style={{ width: 76, height: 76, borderRadius: 11, overflow: 'hidden', flexShrink: 0, background: '#EDE6D9' }}>
              <img src={art.img} alt={art.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ paddingTop: 2 }}>
              <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 9, color: 'var(--gold)', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 500, marginBottom: 5 }}>{art.cat}</p>
              <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: 16, color: 'var(--espresso)', lineHeight: 1.3 }}>{art.title}</p>
            </div>
          </Link>
        ))}
      </section>

      {/* INSTAGRAM */}
      <section style={{ padding: '0 20px 60px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 22, color: 'var(--espresso)' }}>@lucienne.spa</h2>
          <a href="#" style={{ fontFamily: 'var(--font-montserrat)', fontSize: 11, color: 'var(--taupe)', textDecoration: 'none' }}>Síguenos →</a>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 5 }}>
          {instaImgs.map((p, i) => (
            <div key={i} style={{ aspectRatio: '1/1', borderRadius: 9, overflow: 'hidden', background: '#EDE6D9' }}>
              <img src={p.img} alt={p.alt} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: 'var(--espresso)', color: '#FEFCF8', padding: '48px 28px 40px' }}>
        <p style={{ fontFamily: 'var(--font-pinyon)', fontSize: 26, color: 'rgba(232,213,168,0.82)', marginBottom: 6 }}>Tu momento.</p>
        <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 12, color: 'rgba(254,252,248,0.45)', marginBottom: 28, lineHeight: 1.7 }}>
          Paseos del Pedregal, CDMX<br/>Lun–Vie 9:00–20:00 · Sáb 9:00–18:00 · Dom 10:00–16:00
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 22px', marginBottom: 28 }}>
          {[['Inicio', '/home'], ['Experiencias', '/experiencias'], ['Membresías', '/membresia'], ['Gift Cards', '/gift-cards'], ['Conócenos', '/conocenos'], ['Journal', '/journal'], ['FAQ', '/faq'], ['Contacto', '/contacto']].map(([label, href]) => (
            <a key={href} href={href} style={{ fontFamily: 'var(--font-montserrat)', fontSize: 11, color: 'rgba(254,252,248,0.5)', textDecoration: 'none', letterSpacing: '0.05em' }}>{label}</a>
          ))}
        </div>
        <div style={{ borderTop: '1px solid rgba(201,169,107,0.14)', paddingTop: 22, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 10, color: 'rgba(254,252,248,0.3)' }}>© 2026 Lucienne Beauty Spa</p>
          <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 10, color: 'rgba(201,169,107,0.45)', letterSpacing: '0.1em' }}>CDMX</p>
        </div>
      </footer>
    </div>
  )
}
