'use client'
import Link from 'next/link'

const techs = [
  {
    id: 'hifu',
    name: 'HIFU 360°',
    tagline: 'El lifting sin bisturí.',
    desc: 'Ultrasonido focalizado de alta intensidad que trabaja en las capas profundas de la piel, estimulando colágeno donde actúa el cirujano. Resultados progresivos, sin tiempo de recuperación.',
    image: '/img/transforma-1.jpg',
    zonas: ['Rostro completo', 'Cuello', 'Escote', 'Abdomen'],
    beneficios: ['Firmeza visible', 'Definición del óvalo', 'Estimula colágeno', 'Sin downtime'],
    precio: 'Desde $3,500',
    duracion: '45–90 min',
    faq: ['¿Cuántas sesiones necesito?', '¿Cuándo veo resultados?'],
  },
  {
    id: 'criolipolisis',
    name: 'Criolipólisis',
    tagline: 'Reducción localizada sin cirugía.',
    desc: 'Técnica de enfriamiento controlado que elimina adipocitos de forma selectiva. Segura, eficaz y sin tiempo de recuperación.',
    image: '/img/transforma-2.jpg',
    zonas: ['Abdomen', 'Flancos', 'Muslos', 'Brazos', 'Papada'],
    beneficios: ['Reduce adiposidad', 'Sin cirugía', 'Resultados progresivos', 'Una sola sesión'],
    precio: 'Desde $3,500',
    duracion: '60 min por zona',
    faq: ['¿Cuántas zonas por sesión?', '¿Hay tiempo de recuperación?'],
  },
  {
    id: 'laser',
    name: 'Depilación Láser Tridioide',
    tagline: 'Definitiva. Indolora. Precisa.',
    desc: 'Tecnología tridioide de triple longitud de onda para resultados permanentes en todo tipo de piel y tono de vello.',
    image: '/img/renueva-scanner.jpg',
    zonas: ['Axilas', 'Bikini', 'Piernas', 'Brazos', 'Labio superior', 'Espalda'],
    beneficios: ['Resultados duraderos', 'Indoloro', 'Apto piel sensible', 'Triple longitud de onda'],
    precio: 'Desde $1,200',
    duracion: '15–45 min',
    faq: ['¿Cuántas sesiones necesito?', '¿Cómo prepararme?'],
  },
  {
    id: 'body-up',
    name: 'Body Up',
    tagline: 'Tonificación y firmeza corporal.',
    desc: 'Electroestimulación muscular de alta intensidad que trabaja grupos musculares profundos para tonicidad y firmeza sin esfuerzo.',
    image: '/img/transforma-1.jpg',
    zonas: ['Abdomen', 'Glúteos', 'Piernas', 'Brazos'],
    beneficios: ['Tonicidad muscular', 'Firmeza visible', 'Sin dolor', 'Equivale a 20,000 abdominales'],
    precio: 'Desde $2,200',
    duracion: '30 min',
    faq: ['¿Cuántas sesiones?', '¿Para quién es?'],
  },
  {
    id: 'cavitacion',
    name: 'Cavitación Ultrasónica',
    tagline: 'Reducción de medidas con ultrasonido.',
    desc: 'Ultrasonido de baja frecuencia que destruye células de grasa localizada. Resultado visible desde la primera sesión.',
    image: '/img/transforma-2.jpg',
    zonas: ['Abdomen', 'Cintura', 'Muslos', 'Brazos'],
    beneficios: ['Reducción de medidas', 'Sin cirugía', 'Sin recuperación', 'Inmediato'],
    precio: 'Desde $1,400',
    duracion: '40 min',
    faq: ['¿Necesito preparación?', '¿Qué tan rápido veo resultados?'],
  },
  {
    id: 'facial-multifuncion',
    name: 'Facial Multifunción',
    tagline: 'Limpieza profunda con tecnología.',
    desc: 'Protocolo aparatológico que combina ultrasonido, alta frecuencia, iontoforesis y LED para una piel impecable.',
    image: '/img/renueva-scanner.jpg',
    zonas: ['Rostro completo'],
    beneficios: ['Piel impecable', 'Reduce poros', 'Brillo sano', 'Personalizables'],
    precio: 'Desde $1,800',
    duracion: '75 min',
    faq: ['¿Diferencia con facial manual?', '¿Cada cuánto hacerlo?'],
  },
]

export default function TransformaPage() {
  return (
    <div style={{ background: 'var(--ivory)' }}>

      {/* Hero */}
      <div style={{ position: 'relative', height: 260, background: '#D4C5B0', overflow: 'hidden' }}>
        <img src="/img/transforma-1.jpg" alt="Tecnología estética Lucienne" loading="eager"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(26,18,9,0.08) 0%, rgba(26,18,9,0.65) 100%)' }} />
        <div style={{ position: 'absolute', bottom: 24, left: 24, right: 24 }}>
          <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 9, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(201,169,107,0.85)', fontWeight: 500, marginBottom: 6 }}>Tecnología estética</p>
          <h1 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 38, color: '#FEFCF8', fontWeight: 300, lineHeight: 1.05 }}>Transforma</h1>
        </div>
      </div>

      <div style={{ padding: '28px 22px 8px' }}>
        <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 14, color: 'var(--taupe)', lineHeight: 1.75 }}>
          Tecnología de última generación con resultados visibles. Sin cirugía, sin tiempo de recuperación, con toda la elegancia de Lucienne.
        </p>
        <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 11, color: 'var(--sand)', marginTop: 8, lineHeight: 1.6 }}>
          Todos los tratamientos incluyen diagnóstico previo. No prometemos resultados médicos.
        </p>
      </div>

      <section style={{ padding: '24px 22px 60px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {techs.map((tech) => (
            <div key={tech.id} style={{ borderRadius: 18, overflow: 'hidden', background: 'rgba(237,230,217,0.4)', border: '1px solid rgba(201,169,107,0.12)' }}>
              <div style={{ height: 155, background: '#D4C5B0', position: 'relative' }}>
                <img src={tech.image} alt={tech.name} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(26,18,9,0.2)' }} />
              </div>
              <div style={{ padding: '18px 18px 14px' }}>
                <h3 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 22, color: 'var(--espresso)', fontWeight: 500, marginBottom: 3 }}>{tech.name}</h3>
                <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 11, color: 'var(--gold)', letterSpacing: '0.08em', marginBottom: 10 }}>{tech.tagline}</p>
                <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 12, color: 'var(--taupe)', lineHeight: 1.65, marginBottom: 12 }}>{tech.desc}</p>
                <div style={{ marginBottom: 12 }}>
                  <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 10, color: 'var(--cocoa)', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, marginBottom: 6 }}>Zonas</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                    {tech.zonas.map((z) => (
                      <span key={z} style={{ fontFamily: 'var(--font-montserrat)', fontSize: 10, color: 'var(--espresso)', background: 'rgba(44,31,23,0.06)', border: '1px solid rgba(44,31,23,0.1)', borderRadius: 20, padding: '3px 10px' }}>{z}</span>
                    ))}
                  </div>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
                  {tech.beneficios.map((b) => (
                    <span key={b} style={{ fontFamily: 'var(--font-montserrat)', fontSize: 10, color: 'var(--taupe)', background: 'rgba(201,169,107,0.1)', border: '1px solid rgba(201,169,107,0.2)', borderRadius: 20, padding: '3px 10px' }}>{b}</span>
                  ))}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 11, color: 'var(--taupe)', marginBottom: 2 }}>{tech.duracion}</p>
                    <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: 20, color: 'var(--espresso)', fontWeight: 600 }}>{tech.precio}</p>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <Link href={`/contacto?consulta=${tech.id}`} style={{ background: 'rgba(237,230,217,0.8)', color: 'var(--espresso)', padding: '10px 14px', borderRadius: 22, textDecoration: 'none', fontFamily: 'var(--font-montserrat)', fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600, border: '1px solid rgba(201,169,107,0.2)' }}>
                      Consultar
                    </Link>
                    <Link href={`/reservar?t=${tech.id}&name=${encodeURIComponent(tech.name)}&duration=60`} style={{ background: 'var(--espresso)', color: '#FEFCF8', padding: '10px 16px', borderRadius: 22, textDecoration: 'none', fontFamily: 'var(--font-montserrat)', fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600 }}>
                      Reservar
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
