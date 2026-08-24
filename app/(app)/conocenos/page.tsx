'use client'
import Link from 'next/link'

const valores = [
  { titulo: 'Personalización', desc: 'Cada clienta es única. Cada experiencia se diseña para ella.' },
  { titulo: 'Presencia', desc: 'En Lucienne, el tiempo que es tuyo es completamente tuyo.' },
  { titulo: 'Excelencia', desc: 'Desde el protocolo hasta el aroma. Todo tiene intención.' },
  { titulo: 'Bienestar real', desc: 'No vendemos apariencia. Vendemos cómo te sientes.' },
]

export default function ConocenosPage() {
  return (
    <div className="page-enter" style={{ background: 'var(--ivory)' }}>

      {/* Hero */}
      <div style={{ position: 'relative', height: 380, background: '#EDE6D9', overflow: 'hidden' }}>
        <div className="kenburns" style={{ position: 'absolute', inset: 0 }}>
          <img
            src="/img/conocenos.jpg" alt="Espacio Lucienne" loading="eager"
            className="photo-warm"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%' }}
          />
        </div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(26,18,9,0.05) 0%, rgba(26,18,9,0.65) 100%)' }} />
        <div style={{ position: 'absolute', bottom: 32, left: 26, right: 26 }}>
          <p className="fade-up" style={{ fontFamily: 'var(--font-pinyon)', fontSize: 28, color: 'rgba(232,213,168,0.88)', marginBottom: 8, animationDelay: '60ms' }}>
            Regalate tiempo.
          </p>
          <h1 className="fade-up" style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(40px, 9vw, 64px)', color: '#FEFCF8', fontWeight: 300, lineHeight: 1.0, letterSpacing: '-0.01em', animationDelay: '130ms' }}>
            Nuestra historia
          </h1>
        </div>
      </div>

      {/* Historia */}
      <section style={{ padding: '64px 26px 64px', maxWidth: 640, margin: '0 auto' }}>
        <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 14, color: 'var(--taupe)', lineHeight: 1.85, marginBottom: 22 }}>
          Lucienne nació en 2023 con una convicción: en la Ciudad de México existe una mujer que trabaja duro, que cuida de todos, que sabe exactamente lo que quiere y que rara vez se permite recibirlo.
        </p>
        <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 14, color: 'var(--taupe)', lineHeight: 1.85, marginBottom: 22 }}>
          Creamos este espacio para ella. Un lugar donde el exterior queda afuera desde el momento en que entras. Donde el tiempo no se mide en productividad sino en presencia.
        </p>
        <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 14, color: 'var(--taupe)', lineHeight: 1.85 }}>
          Lucienne está en Paseos del Pedregal porque ahí viven y trabajan muchas de las mujeres que nos inspiran. Y porque creemos que el bienestar debe ser accesible en el sentido más completo: cerca de ti, en tu ritmo, con la calidad que mereces.
        </p>
      </section>

      {/* Gold separator */}
      <div style={{ width: 60, height: 1, background: 'var(--gold)', opacity: 0.4, margin: '0 auto 64px' }} />

      {/* Quote */}
      <section style={{ padding: '0 26px 80px', textAlign: 'center', maxWidth: 560, margin: '0 auto' }}>
        <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(22px, 4vw, 32px)', fontStyle: 'italic', color: 'var(--espresso)', lineHeight: 1.45, fontWeight: 300 }}>
          "No vendemos tratamientos.<br/>Vendemos experiencias<br/>que contienen tratamientos."
        </p>
      </section>

      {/* Valores */}
      <section style={{ padding: '0 24px 80px' }}>
        <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 500, marginBottom: 8 }}>
          Nuestros valores
        </p>
        <div style={{ width: 52, height: 1, background: 'var(--gold)', opacity: 0.4, marginBottom: 28 }} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          {valores.map((v) => (
            <div key={v.titulo} style={{ background: 'rgba(237,230,217,0.4)', border: '1px solid rgba(201,169,107,0.12)', borderRadius: 16, padding: '20px 18px' }}>
              <h3 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 20, color: 'var(--espresso)', marginBottom: 8, fontWeight: 500 }}>{v.titulo}</h3>
              <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 12, color: 'var(--taupe)', lineHeight: 1.65 }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Espacio */}
      <section style={{ padding: '0 24px 80px' }}>
        <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 500, marginBottom: 8 }}>
          El espacio
        </p>
        <div style={{ width: 52, height: 1, background: 'var(--gold)', opacity: 0.4, marginBottom: 28 }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
          <div style={{ borderRadius: 18, overflow: 'hidden', height: 200 }}>
            <img src="/img/galeria-1.jpg" alt="Recepción Lucienne" loading="lazy" className="photo-warm" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ borderRadius: 18, overflow: 'hidden', height: 200 }}>
            <img src="/img/galeria-2.jpg" alt="Corredor Lucienne" loading="lazy" className="photo-warm" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>
        <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 14, color: 'var(--taupe)', lineHeight: 1.8 }}>
          Cuatro cabinas privadas, una suite doble para experiencias en pareja, recepción con área de espera diseñada para que el ritual empiece antes de entrar a la cabina.
        </p>
      </section>

      {/* CTA */}
      <section style={{ padding: '0 24px 80px' }}>
        <Link href="/reservar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--espresso)', color: '#FEFCF8', padding: '15px', borderRadius: 24, textDecoration: 'none', fontFamily: 'var(--font-montserrat)', fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600, marginBottom: 12 }}>
          Reserva tu visita
        </Link>
        <Link href="/galeria" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', color: 'var(--taupe)', padding: '14px', borderRadius: 24, textDecoration: 'none', fontFamily: 'var(--font-montserrat)', fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', border: '1px solid rgba(140,122,107,0.22)' }}>
          Ver galería completa
        </Link>
      </section>
    </div>
  )
}
