'use client'
import { useState } from 'react'

const sections = [
  {
    titulo: 'Reservas',
    items: [
      { q: '¿Cómo hago una reserva?', a: 'Puedes reservar desde la app o por WhatsApp. Selecciona tu tratamiento, elige fecha y hora, y confirma. Recibirás un recordatorio 24 horas antes.' },
      { q: '¿Con cuánta anticipación debo reservar?', a: 'Recomendamos al menos 48 horas para garantizar disponibilidad en el horario que prefieres. Para fines de semana, sugieren reservar con una semana de anticipación.' },
      { q: '¿Puedo llegar sin cita?', a: 'Sujeto a disponibilidad. Para garantizar tu lugar y la experiencia completa, siempre es mejor reservar.' },
      { q: '¿Qué pasa si necesito cancelar?', a: 'Puedes cancelar hasta 12 horas antes sin cargo. Cancelaciones posteriores generan un cargo del 50% del servicio.' },
    ],
  },
  {
    titulo: 'Tratamientos',
    items: [
      { q: '¿Cómo elijo qué tratamiento necesito?', a: 'Puedes hacer nuestro quiz de experiencias o consultar con nuestras especialistas en recepción. En tu primera visita siempre hacemos una valoración personalizada.' },
      { q: '¿Son seguros los tratamientos de aparatología?', a: 'Todos nuestros equipos cuentan con certificación y son operados por especialistas certificadas. Realizamos una valoración previa para cada tratamiento.' },
      { q: '¿Cuántas sesiones necesito para ver resultados?', a: 'Depende del tratamiento y tu objetivo. En la valoración inicial definimos un plan personalizado con el número de sesiones recomendadas.' },
      { q: '¿Tienen tratamientos para hombres?', a: 'Todos nuestros servicios están disponibles para cualquier persona. La mayoría de nuestros clientes son mujeres, pero atendemos a todos con la misma calidad.' },
    ],
  },
  {
    titulo: 'Membresías',
    items: [
      { q: '¿Las sesiones de membresía se acumulan?', a: 'No se acumulan al siguiente mes, pero puedes ceder tu sesión a alguien de confianza en el mismo periodo.' },
      { q: '¿Puedo pausar mi membresía?', a: 'Sí, puedes pausar hasta 2 meses por año en caso de viaje o circunstancias especiales. Comunícate con nosotros para gestionarlo.' },
      { q: '¿Cómo aplico mi descuento de membresía?', a: 'El descuento se aplica automáticamente al realizar tu reserva con tu cuenta de miembro. No requieres código ni gestión adicional.' },
    ],
  },
  {
    titulo: 'Visita y logística',
    items: [
      { q: '¿Dónde están ubicados?', a: 'Estamos en Paseos del Pedregal, Ciudad de México. Consulta la sección de Contacto para la dirección exacta y cómo llegar.' },
      { q: '¿Tiene estacionamiento?', a: 'Sí, contamos con estacionamiento en el mismo edificio. Los primeros 90 minutos son cortesía para nuestras clientas.' },
      { q: '¿Qué debo llevar a mi cita?', a: 'Solo tú misma. Nosotros proporcionamos todo: bata, pantuflas, productos, música, y lo que necesitas para desconectarte.' },
      { q: '¿Puedo venir con bebé o niños pequeños?', a: 'Por el tipo de ambiente que creamos, preferimos que las visitas sean para adultos. Entendemos que no siempre es fácil y estamos felices de ayudarte a encontrar el momento ideal.' },
    ],
  },
]

export default function FAQPage() {
  const [open, setOpen] = useState<string | null>(null)

  return (
    <div style={{ background: 'var(--ivory)' }}>

      {/* Header */}
      <div style={{ padding: '40px 22px 32px' }}>
        <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 9, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 500, marginBottom: 8 }}>Dudas frecuentes</p>
        <h1 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 34, color: 'var(--espresso)', fontWeight: 300, lineHeight: 1.1 }}>Preguntas</h1>
      </div>

      {sections.map((section) => (
        <section key={section.titulo} style={{ padding: '0 22px 32px' }}>
          <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 22, color: 'var(--espresso)', marginBottom: 14, fontWeight: 400 }}>{section.titulo}</h2>
          {section.items.map((item) => {
            const key = `${section.titulo}-${item.q}`
            const isOpen = open === key
            return (
              <div key={item.q} style={{ borderBottom: '1px solid rgba(201,169,107,0.12)' }}>
                <button onClick={() => setOpen(isOpen ? null : key)} style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', padding: '16px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                  <span style={{ fontFamily: 'var(--font-montserrat)', fontSize: 14, color: 'var(--espresso)', lineHeight: 1.45, fontWeight: isOpen ? 600 : 400 }}>{item.q}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2, transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.25s' }}>
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </button>
                {isOpen && (
                  <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 13, color: 'var(--taupe)', lineHeight: 1.7, paddingBottom: 16 }}>{item.a}</p>
                )}
              </div>
            )
          })}
        </section>
      ))}

      {/* Contacto CTA */}
      <section style={{ padding: '0 22px 60px', textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: 22, color: 'var(--espresso)', marginBottom: 6 }}>¿No encontraste tu respuesta?</p>
        <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 13, color: 'var(--taupe)', marginBottom: 20 }}>Escríbenos, con gusto te orientamos.</p>
        <a href="https://wa.me/525500000000" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--espresso)', color: '#FEFCF8', padding: '13px 24px', borderRadius: 22, textDecoration: 'none', fontFamily: 'var(--font-montserrat)', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          WhatsApp
        </a>
      </section>
    </div>
  )
}
