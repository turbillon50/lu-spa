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
    <div style={{ background: 'var(--ivory)' }}>

      {/* Hero */}
      <div style={{ position: 'relative', height: 340, background: '#EDE6D9', overflow: 'hidden' }}>
        <img src="/img/conocenos.jpg" alt="Espacio Lucienne" loading="eager"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(26,18,9,0.05) 0%, rgba(26,18,9,0.60) 100%)' }} />
        <div style={{ position: 'absolute', bottom: 26, left: 24, right: 24 }}>
          <p style={{ fontFamily: 'var(--font-pinyon)', fontSize: 28, color: 'rgba(232,213,168,0.9)', marginBottom: 8 }}>Regalate tiempo.</p>
          <h1 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 38, color: '#FEFCF8', fontWeight: 300, lineHeight: 1.0 }}>Nuestra historia</h1>
        </div>
      </div>

      {/* Historia */}
      <section style={{ padding: '40px 24px 40px' }}>
        <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 14, color: 'var(--taupe)', lineHeight: 1.85, marginBottom: 20 }}>
          Lucienne nació en 2023 con una convicción: en la Ciudad de México existe una mujer que trabaja duro, que cuida de todos, que sabe exactamente lo que quiere y que rara vez se permite recibirlo.
        </p>
        <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 14, color: 'var(--taupe)', lineHeight: 1.85, marginBottom: 20 }}>
          Creamos este espacio para ella. Un lugar donde el exterior queda afuera desde el momento en que entras. Donde el tiempo no se mide en productividad sino en presencia.
        </p>
        <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 14, color: 'var(--taupe)', lineHeight: 1.85 }}>
          Lucienne está en Paseos del Pedregal porque ahí viven y trabajan muchas de las mujeres que nos inspiran. Y porque creemos que el bienestar debe ser accesible en el sentido más completo: cerca de ti, en tu ritmo, con la calidad que mereces.
        </p>
      </section>

      {/* Quote */}
      <section style={{ padding: '0 24px 40px', textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: 24, fontStyle: 'italic', color: 'var(--espresso)', lineHeight: 1.4 }}>
          "No vendemos tratamientos.<br/>Vendemos experiencias que contienen tratamientos."
        </p>
      </section>

      {/* Valores */}
      <section style={{ padding: '0 24px 40px' }}>
        <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 9, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 500, marginBottom: 20 }}>Nuestros valores</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          {valores.map((v) => (
            <div key={v.titulo} style={{ background: 'rgba(237,230,217,0.4)', border: '1px solid rgba(201,169,107,0.12)', borderRadius: 14, padding: '16px 14px' }}>
              <h3 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 18, color: 'var(--espresso)', marginBottom: 6 }}>{v.titulo}</h3>
              <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 12, color: 'var(--taupe)', lineHeight: 1.6 }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Espacio */}
      <section style={{ padding: '0 24px 40px' }}>
        <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 9, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 500, marginBottom: 14 }}>El espacio</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
          <div style={{ borderRadius: 16, overflow: 'hidden', height: 180 }}>
            <img src="/img/galeria-1.jpg" alt="Recepción Lucienne" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ borderRadius: 16, overflow: 'hidden', height: 180 }}>
            <img src="/img/galeria-2.jpg" alt="Corredor Lucienne" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>
        <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 13, color: 'var(--taupe)', lineHeight: 1.75 }}>
          Cuatro cabinas privadas, una suite doble para experiencias en pareja, recepción con área de espera diseñada para que el ritual empiece antes de entrar a la cabina.
        </p>
      </section>

      {/* CTA */}
      <section style={{ padding: '0 24px 60px' }}>
        <Link href="/reservar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--espresso)', color: '#FEFCF8', padding: '15px', borderRadius: 22, textDecoration: 'none', fontFamily: 'var(--font-montserrat)', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, marginBottom: 10 }}>
          Reserva tu visita
        </Link>
        <Link href="/galeria" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', color: 'var(--taupe)', padding: '14px', borderRadius: 22, textDecoration: 'none', fontFamily: 'var(--font-montserrat)', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', border: '1px solid rgba(140,122,107,0.25)' }}>
          Ver galería completa
        </Link>
      </section>
    </div>
  )
}
