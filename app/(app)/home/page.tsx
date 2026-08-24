'use client'
import Link from 'next/link'
import { treatments } from '../../data/treatments'

const pillars = [
  {
    id: 'relajate',
    href: '/relajate',
    label: 'Relajate',
    sub: 'Masajes y rituales',
    image: '/img/relajate-2.jpg',
    desc: 'Deja ir el peso del día. Nuestros masajes trabajan músculo, mente y sistema nervioso.',
  },
  {
    id: 'renueva',
    href: '/renueva',
    label: 'Renueva',
    sub: 'Faciales y diagnóstico',
    image: '/img/renueva-1.jpg',
    desc: 'Tu piel merece atención personalizada. Diagnóstico, tratamiento, luminosidad.',
  },
  {
    id: 'transforma',
    href: '/transforma',
    label: 'Transforma',
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

/* Gold hairline separator */
function Separator({ align = 'center' }: { align?: 'left' | 'center' }) {
  return (
    <div style={{
      width: 64, height: 1,
      background: 'var(--gold)', opacity: 0.45,
      margin: align === 'center' ? '16px auto 0' : '16px 0 0',
    }} />
  )
}

/* Section eyebrow */
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      fontFamily: 'var(--font-montserrat)',
      fontSize: 11, letterSpacing: '0.22em',
      textTransform: 'uppercase', color: 'var(--gold)',
      fontWeight: 500, marginBottom: 0,
    }}>
      {children}
    </p>
  )
}

export default function HomePage() {
  return (
    <div className="page-enter" style={{ background: 'var(--ivory)' }}>

      {/* ─── HERO ─── */}
      <section style={{
        position: 'relative',
        height: 'min(100vw, 720px)',
        minHeight: 560,
        overflow: 'hidden',
        background: '#EDE6D9',
      }}>
        {/* Ken Burns */}
        <div className="kenburns" style={{ position: 'absolute', inset: 0 }}>
          <img
            src="/img/hero-home.jpg"
            alt="Lucienne Beauty Spa"
            loading="eager"
            className="photo-warm"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%' }}
          />
        </div>

        {/* Espresso → transparent overlay only where text lives */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(26,18,9,0.08) 0%, rgba(26,18,9,0.18) 40%, rgba(26,18,9,0.72) 100%)',
        }} />

        {/* Text — staggered entrance */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 28px 44px' }}>
          <p
            className="fade-up"
            style={{
              fontFamily: 'var(--font-montserrat)',
              fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase',
              color: 'rgba(254,252,248,0.60)', fontWeight: 500,
              marginBottom: 12, animationDelay: '0ms',
            }}
          >
            Paseos del Pedregal · CDMX
          </p>

          <h1
            className="fade-up"
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontWeight: 300,
              fontSize: 'clamp(52px, 11vw, 96px)',
              lineHeight: 1.02,
              letterSpacing: '-0.01em',
              color: '#FEFCF8',
              marginBottom: 10,
              animationDelay: '80ms',
            }}
          >
            Lucienne<br/>Beauty Spa
          </h1>

          <p
            className="fade-up"
            style={{
              fontFamily: 'var(--font-pinyon)',
              fontSize: 'clamp(22px, 4vw, 30px)',
              color: 'rgba(232,213,168,0.88)',
              marginBottom: 14, letterSpacing: '0.01em',
              animationDelay: '160ms',
            }}
          >
            The Lucienne Experience
          </p>

          <p
            className="fade-up"
            style={{
              fontFamily: 'var(--font-montserrat)',
              fontSize: 13, color: 'rgba(254,252,248,0.72)',
              fontWeight: 300, maxWidth: 320, lineHeight: 1.7,
              marginBottom: 24, animationDelay: '220ms',
            }}
          >
            Un espacio creado para desconectarte del exterior y reconectar contigo.
          </p>

          <div className="fade-up" style={{ display: 'flex', gap: 10, flexWrap: 'wrap', animationDelay: '300ms' }}>
            <Link
              href="/reservar"
              style={{
                background: '#FEFCF8', color: '#2C1F17',
                padding: '13px 26px', borderRadius: 28,
                textDecoration: 'none',
                fontFamily: 'var(--font-montserrat)',
                fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600,
                transition: 'all 0.25s var(--spring)',
              }}
            >
              Reserva tu espacio
            </Link>
            <Link
              href="/experiencias"
              style={{
                background: 'rgba(254,252,248,0.1)', color: '#FEFCF8',
                padding: '13px 26px', borderRadius: 28,
                textDecoration: 'none',
                fontFamily: 'var(--font-montserrat)',
                fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 500,
                border: '1px solid rgba(254,252,248,0.28)',
                backdropFilter: 'blur(8px)',
                transition: 'all 0.25s var(--spring)',
              }}
            >
              Descubre Lucienne
            </Link>
          </div>
        </div>
      </section>

      {/* ─── FILOSOFIA ─── */}
      <section style={{ padding: '80px 28px', textAlign: 'center', maxWidth: 600, margin: '0 auto' }}>
        <Eyebrow>Nuestra filosofía</Eyebrow>
        <Separator />
        <h2 style={{
          fontFamily: 'var(--font-cormorant)',
          fontSize: 'clamp(32px, 6vw, 48px)',
          color: 'var(--espresso)', fontWeight: 300,
          lineHeight: 1.1, letterSpacing: '-0.01em',
          marginTop: 24, marginBottom: 20,
        }}>
          No vendemos tratamientos.<br/>
          <em style={{ fontStyle: 'italic' }}>Vendemos experiencias.</em>
        </h2>
        <p style={{
          fontFamily: 'var(--font-montserrat)',
          fontSize: 14, color: 'var(--taupe)',
          lineHeight: 1.8, maxWidth: '68ch', margin: '0 auto',
        }}>
          Cada visita a Lucienne es una pausa diseñada con intención. Desde el momento en que entras, el exterior queda fuera.
        </p>
      </section>

      {/* ─── 3 PILLARS ─── */}
      <section style={{ padding: '0 20px 96px' }}>
        <div style={{ marginBottom: 32, paddingLeft: 2 }}>
          <Eyebrow>Nuestros mundos</Eyebrow>
          <Separator align="left" />
          <h2 style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: 'clamp(28px, 5vw, 40px)',
            color: 'var(--espresso)', fontWeight: 300,
            lineHeight: 1.1, letterSpacing: '-0.01em',
            marginTop: 20,
          }}>
            ¿Qué necesitas hoy?
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {pillars.map((p) => (
            <Link key={p.id} href={p.href} style={{ textDecoration: 'none' }}>
              <div style={{
                position: 'relative', borderRadius: 20, overflow: 'hidden',
                height: 290, background: '#EDE6D9',
                transition: 'transform 0.25s var(--spring)',
              }}>
                <img
                  src={p.image} alt={p.label} loading="lazy"
                  className="photo-warm"
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(26,18,9,0.78) 0%, rgba(26,18,9,0.05) 55%)',
                }} />
                <div style={{ position: 'absolute', bottom: 24, left: 24, right: 24 }}>
                  <p style={{
                    fontFamily: 'var(--font-montserrat)',
                    fontSize: 10, letterSpacing: '0.22em', color: 'rgba(201,169,107,0.9)',
                    fontWeight: 600, marginBottom: 6, textTransform: 'uppercase',
                  }}>
                    {p.sub}
                  </p>
                  <h3 style={{
                    fontFamily: 'var(--font-cormorant)',
                    fontSize: 'clamp(32px, 6vw, 44px)',
                    color: '#FEFCF8', fontWeight: 300,
                    letterSpacing: '-0.01em', lineHeight: 1.0, marginBottom: 8,
                  }}>
                    {p.label}
                  </h3>
                  <p style={{
                    fontFamily: 'var(--font-montserrat)',
                    fontSize: 12, color: 'rgba(254,252,248,0.7)', lineHeight: 1.65,
                  }}>
                    {p.desc}
                  </p>
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 12,
                    fontFamily: 'var(--font-montserrat)',
                    fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase',
                    color: 'rgba(254,252,248,0.8)',
                  }}>
                    Descubrir tratamientos
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── ENTRY PATHS ─── */}
      <section style={{ padding: '0 20px 96px' }}>
        <Eyebrow>Tu camino de entrada</Eyebrow>
        <Separator align="left" />
        <h2 style={{
          fontFamily: 'var(--font-cormorant)',
          fontSize: 'clamp(28px, 5vw, 40px)',
          color: 'var(--espresso)', fontWeight: 300,
          letterSpacing: '-0.01em', marginTop: 20, marginBottom: 24,
        }}>
          ¿Qué buscas hoy?
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {entryPaths.map((path) => {
            const isQuiz = path.label.includes('→')
            return (
              <Link
                key={path.href} href={path.href}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '16px 20px', borderRadius: 14, textDecoration: 'none',
                  background: isQuiz ? 'var(--espresso)' : 'rgba(237,230,217,0.5)',
                  border: isQuiz ? 'none' : '1px solid rgba(201,169,107,0.13)',
                  transition: 'all 0.2s var(--spring)',
                }}
              >
                <span style={{
                  fontFamily: 'var(--font-montserrat)',
                  fontSize: 14, fontWeight: 500,
                  color: isQuiz ? '#FEFCF8' : 'var(--espresso)',
                }}>
                  {path.label}
                </span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                  stroke={isQuiz ? '#C9A96B' : 'var(--taupe)'}
                  strokeWidth="1.5" strokeLinecap="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            )
          })}
        </div>
      </section>

      {/* ─── FEATURED TREATMENTS ─── */}
      <section style={{ padding: '0 0 96px' }}>
        <div style={{ padding: '0 20px', marginBottom: 28 }}>
          <Eyebrow>Más solicitadas</Eyebrow>
          <Separator align="left" />
          <h2 style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: 'clamp(28px, 5vw, 40px)',
            color: 'var(--espresso)', fontWeight: 300,
            letterSpacing: '-0.01em', marginTop: 20,
          }}>
            Experiencias destacadas
          </h2>
        </div>
        <div style={{
          display: 'flex', overflowX: 'auto', gap: 14,
          padding: '0 20px 8px', scrollbarWidth: 'none',
        }}>
          {featured.map((t) => (
            <Link key={t.id} href={`/treatments/${t.id}`} style={{ textDecoration: 'none', flexShrink: 0, width: 220 }}>
              <div style={{ borderRadius: 18, overflow: 'hidden', height: 165, background: '#EDE6D9' }}>
                <img
                  src={t.image} alt={t.name} loading="lazy"
                  className="photo-warm"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ padding: '12px 2px 0' }}>
                <p style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontSize: 19, color: 'var(--espresso)', fontWeight: 500, marginBottom: 4,
                }}>
                  {t.name}
                </p>
                <p style={{
                  fontFamily: 'var(--font-montserrat)',
                  fontSize: 11, color: 'var(--taupe)',
                }}>
                  {t.duration} min · desde ${t.price.toLocaleString('es-MX')}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── MEMBERSHIP TEASER ─── */}
      <section style={{ padding: '0 20px 96px' }}>
        <div style={{
          borderRadius: 22, background: 'var(--espresso)',
          padding: '48px 30px', position: 'relative', overflow: 'hidden',
        }}>
          {/* Ambient glow */}
          <div style={{
            position: 'absolute', top: -60, right: -60, width: 240, height: 240,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(201,169,107,0.12) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />
          <Eyebrow>Lucienne Membership</Eyebrow>
          <h2 style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: 'clamp(30px, 6vw, 44px)',
            color: '#FEFCF8', fontWeight: 300,
            lineHeight: 1.1, letterSpacing: '-0.01em',
            marginTop: 16, marginBottom: 16,
          }}>
            El bienestar constante<br/>cambia todo.
          </h2>
          <p style={{
            fontFamily: 'var(--font-montserrat)',
            fontSize: 13, color: 'rgba(254,252,248,0.55)',
            lineHeight: 1.75, marginBottom: 28, maxWidth: '55ch',
          }}>
            Desde $1,490/mes. Sesiones incluidas, descuentos en todos los tratamientos, prioridad de agenda.
          </p>
          <Link
            href="/membresia"
            style={{
              display: 'inline-flex', background: '#C9A96B', color: '#1A1209',
              padding: '12px 24px', borderRadius: 24, textDecoration: 'none',
              fontFamily: 'var(--font-montserrat)',
              fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700,
            }}
          >
            Conocer membresías
          </Link>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section style={{ padding: '0 0 96px' }}>
        <div style={{ padding: '0 20px', marginBottom: 24 }}>
          <p style={{ fontFamily: 'var(--font-pinyon)', fontSize: 28, color: 'var(--taupe)' }}>
            Experiencias que hablan por sí mismas.
          </p>
        </div>
        <div style={{
          display: 'flex', overflowX: 'auto', gap: 14,
          padding: '0 20px 8px', scrollbarWidth: 'none',
        }}>
          {testimonials.map((t, i) => (
            <div
              key={i}
              style={{
                flexShrink: 0, width: 280,
                background: i % 2 === 0 ? 'rgba(237,230,217,0.5)' : 'var(--espresso)',
                border: i % 2 === 0 ? '1px solid rgba(201,169,107,0.13)' : 'none',
                borderRadius: 18, padding: '24px 22px',
              }}
            >
              <p style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: 18, fontStyle: 'italic',
                color: i % 2 === 0 ? 'var(--espresso)' : '#FEFCF8',
                lineHeight: 1.6, marginBottom: 16,
              }}>
                "{t.text}"
              </p>
              <p style={{
                fontFamily: 'var(--font-montserrat)',
                fontSize: 12, fontWeight: 600,
                color: i % 2 === 0 ? 'var(--espresso)' : '#FEFCF8',
              }}>
                {t.name}
              </p>
              <p style={{
                fontFamily: 'var(--font-montserrat)',
                fontSize: 11,
                color: i % 2 === 0 ? 'var(--taupe)' : 'rgba(201,169,107,0.75)',
                marginTop: 2,
              }}>
                {t.role}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── JOURNAL ─── */}
      <section style={{ padding: '0 20px 96px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 28 }}>
          <div>
            <Eyebrow>Lucienne Journal</Eyebrow>
            <Separator align="left" />
            <h2 style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(26px, 5vw, 36px)',
              color: 'var(--espresso)', fontWeight: 300,
              letterSpacing: '-0.01em', marginTop: 18,
            }}>
              Leer &amp; aprender
            </h2>
          </div>
          <Link href="/journal" style={{
            fontFamily: 'var(--font-montserrat)',
            fontSize: 11, color: 'var(--taupe)', textDecoration: 'none',
            letterSpacing: '0.08em', paddingBottom: 2,
            borderBottom: '1px solid rgba(140,122,107,0.3)',
          }}>
            Ver todos
          </Link>
        </div>

        {[
          { slug: 'ritual-matutino-piel', title: 'El ritual matutino que tu piel necesita', cat: 'Cuidado de la piel', img: '/img/journal-1.jpg' },
          { slug: 'hifu-sin-cirugia', title: 'HIFU: el lifting sin bisturí que no es magia', cat: 'Tecnología estética', img: '/img/transforma-1.jpg' },
        ].map((art) => (
          <Link key={art.slug} href={`/journal/${art.slug}`}
            style={{ display: 'flex', gap: 16, textDecoration: 'none', marginBottom: 18 }}>
            <div style={{
              width: 84, height: 84, borderRadius: 14,
              overflow: 'hidden', flexShrink: 0, background: '#EDE6D9',
            }}>
              <img
                src={art.img} alt={art.title} loading="lazy"
                className="photo-warm"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ paddingTop: 4 }}>
              <p style={{
                fontFamily: 'var(--font-montserrat)',
                fontSize: 10, color: 'var(--gold)', letterSpacing: '0.14em',
                textTransform: 'uppercase', fontWeight: 500, marginBottom: 6,
              }}>
                {art.cat}
              </p>
              <p style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: 18, color: 'var(--espresso)', lineHeight: 1.3,
              }}>
                {art.title}
              </p>
            </div>
          </Link>
        ))}
      </section>

      {/* ─── INSTAGRAM GRID ─── */}
      <section style={{ padding: '0 20px 96px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
          <h2 style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: 'clamp(22px, 4vw, 30px)',
            color: 'var(--espresso)', fontWeight: 300,
          }}>
            @lucienne.spa
          </h2>
          <a href="#" style={{
            fontFamily: 'var(--font-montserrat)',
            fontSize: 11, color: 'var(--taupe)', textDecoration: 'none',
            letterSpacing: '0.08em', paddingBottom: 1,
            borderBottom: '1px solid rgba(140,122,107,0.3)',
          }}>
            Síguenos
          </a>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
          {instaImgs.map((p, i) => (
            <div key={i} style={{ aspectRatio: '1/1', borderRadius: 10, overflow: 'hidden', background: '#EDE6D9' }}>
              <img
                src={p.img} alt={p.alt} loading="lazy"
                className="photo-warm"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{ background: 'var(--espresso)', color: '#FEFCF8', padding: '56px 28px 48px' }}>
        <p style={{
          fontFamily: 'var(--font-pinyon)',
          fontSize: 28, color: 'rgba(232,213,168,0.82)', marginBottom: 8,
        }}>
          Tu momento.
        </p>
        <p style={{
          fontFamily: 'var(--font-montserrat)',
          fontSize: 12, color: 'rgba(254,252,248,0.4)',
          marginBottom: 32, lineHeight: 1.8,
        }}>
          Paseos del Pedregal, CDMX<br/>
          Lun–Vie 9:00–20:00 · Sáb 9:00–18:00 · Dom 10:00–16:00
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 24px', marginBottom: 32 }}>
          {[
            ['Inicio', '/home'], ['Experiencias', '/experiencias'],
            ['Membresías', '/membresia'], ['Gift Cards', '/gift-cards'],
            ['Conócenos', '/conocenos'], ['Journal', '/journal'],
            ['FAQ', '/faq'], ['Contacto', '/contacto'],
          ].map(([label, href]) => (
            <a key={href} href={href} style={{
              fontFamily: 'var(--font-montserrat)',
              fontSize: 11, color: 'rgba(254,252,248,0.45)',
              textDecoration: 'none', letterSpacing: '0.06em',
            }}>
              {label}
            </a>
          ))}
        </div>
        <div style={{
          borderTop: '1px solid rgba(201,169,107,0.12)',
          paddingTop: 24,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 10, color: 'rgba(254,252,248,0.28)' }}>
            © 2026 Lucienne Beauty Spa
          </p>
          <p style={{
            fontFamily: 'var(--font-montserrat)',
            fontSize: 10, color: 'rgba(201,169,107,0.4)', letterSpacing: '0.12em',
          }}>
            CDMX
          </p>
        </div>
      </footer>
    </div>
  )
}
