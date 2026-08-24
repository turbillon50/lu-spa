'use client'
import { Suspense, useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useStore } from '../../lib/providers'
import { useUser } from '@clerk/nextjs'

const CLERK_KEY = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

const TIMES = ['09:00', '10:00', '11:00', '12:00', '13:00', '15:00', '16:00', '17:00', '18:00', '19:00']
const OCCUPIED: Record<string, string[]> = {
  '2026-08-26': ['10:00', '11:00', '15:00'],
  '2026-08-27': ['09:00', '13:00', '17:00'],
  '2026-08-28': ['11:00', '16:00'],
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDay(year: number, month: number) {
  return new Date(year, month, 1).getDay()
}

function pad(n: number) { return String(n).padStart(2, '0') }

type Step = 1 | 2 | 3 | 4 | 5

function ReservarContent() {
  const router = useRouter()
  const params = useSearchParams()
  const { setBookingItem, confirmBooking } = useStore()
  const { isSignedIn } = CLERK_KEY ? useUser() : { isSignedIn: false }
  const [saveError, setSaveError] = useState('')

  const tId = params.get('t') ?? 'masaje-relajante'
  const tName = params.get('name') ?? 'Masaje Relajante'
  const tPrice = Number(params.get('price') ?? 1500)
  const tDuration = Number(params.get('duration') ?? 60)

  const [step, setStep] = useState<Step>(1)
  const today = new Date()
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [form, setForm] = useState({ nombre: '', email: '', telefono: '', notas: '' })
  const [done, setDone] = useState(false)

  useEffect(() => {
    setBookingItem({ treatmentId: tId, treatmentName: tName, price: tPrice, duration: tDuration })
  }, [tId, tName, tPrice, tDuration, setBookingItem])

  const daysInMonth = getDaysInMonth(viewYear, viewMonth)
  const firstDay = getFirstDay(viewYear, viewMonth)
  const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

  const handleConfirm = async () => {
    confirmBooking(selectedDate, selectedTime)

    // Con sesion real de Clerk, ademas la escribimos en Neon de verdad.
    // El modo demo (sin sesion) se queda solo en el store local, como antes.
    if (isSignedIn) {
      try {
        const res = await fetch('/api/reservas', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            tratamientoSlug: tId,
            fecha: selectedDate,
            hora: selectedTime,
            notas: form.notas || undefined,
          }),
        })
        if (!res.ok) setSaveError('Se registro localmente, pero hubo un problema guardandola en el sistema. Contactanos para confirmar.')
      } catch {
        setSaveError('Se registro localmente, pero hubo un problema guardandola en el sistema. Contactanos para confirmar.')
      }
    }

    setDone(true)
  }

  if (done) {
    return (
      <div style={{ background: 'var(--ivory)', minHeight: '80dvh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', textAlign: 'center' }}>
        {saveError && (
          <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 12, color: '#C04040', marginBottom: 16, maxWidth: '32ch' }}>
            {saveError}
          </p>
        )}
        {/* Golden trace checkmark — SVG draw-on animation */}
        <svg width="80" height="80" viewBox="0 0 80 80" style={{ marginBottom: 24 }}>
          {/* Outer ring — fills first */}
          <circle
            cx="40" cy="40" r="34"
            fill="none"
            stroke="rgba(201,160,140,0.15)"
            strokeWidth="1.5"
          />
          <circle
            cx="40" cy="40" r="34"
            fill="none"
            stroke="#C9A08C"
            strokeWidth="1.5"
            pathLength="1"
            strokeDasharray="1"
            strokeDashoffset="1"
            style={{
              animation: 'drawCircle 0.9s cubic-bezier(.22,1,.36,1) 0.1s forwards',
              transformOrigin: 'center',
              transform: 'rotate(-90deg)',
            }}
          />
          {/* Checkmark — draws after ring */}
          <path
            d="M25 41 L35 51 L55 31"
            fill="none"
            stroke="#C9A08C"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength="1"
            strokeDasharray="1"
            strokeDashoffset="1"
            style={{ animation: 'drawPath 0.45s cubic-bezier(.22,1,.36,1) 0.85s forwards' }}
          />
        </svg>
        <p style={{ fontFamily: 'var(--font-pinyon)', fontSize: 32, color: 'var(--taupe)', marginBottom: 8 }}>Tu momento está reservado.</p>
        <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 26, color: 'var(--espresso)', marginBottom: 20, fontWeight: 300, lineHeight: 1.1 }}>Tu experiencia Lucienne<br/>está confirmada.</h2>
        <div style={{ background: 'rgba(237,230,217,0.5)', border: '1px solid rgba(201,160,140,0.18)', borderRadius: 18, padding: '22px 26px', marginBottom: 28, width: '100%', maxWidth: 340, textAlign: 'left' }}>
          <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: 22, color: 'var(--espresso)', marginBottom: 8, fontWeight: 500 }}>{tName}</p>
          <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 13, color: 'var(--taupe)', marginBottom: 4 }}>{selectedDate} · {selectedTime}</p>
          <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 12, color: 'var(--sand)' }}>Cabina Pétalo · Lucienne Beauty Spa</p>
        </div>
        <button
          onClick={() => router.push('/mi-lucienne')}
          style={{
            background: '#E07560', color: '#FEFCF8',
            padding: '14px 30px', borderRadius: 24, border: 'none',
            fontFamily: 'var(--font-montserrat)', fontSize: 12,
            letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600, cursor: 'pointer',
            transition: 'all 0.25s var(--spring)',
          }}
        >
          Ver mis reservas
        </button>
      </div>
    )
  }

  return (
    <div style={{ background: 'var(--ivory)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
      <div className="reservar-2col" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 40 }}>
      {/* Left: stepper form */}
      <div>

      {/* Progress */}
      <div style={{ padding: '24px 24px 0' }}>
        <div style={{ display: 'flex', gap: 4, marginBottom: 28 }}>
          {([1, 2, 3, 4] as const).map((s) => (
            <div key={s} style={{ flex: 1, height: 3, borderRadius: 2, background: s <= step ? 'var(--espresso)' : 'rgba(140,122,107,0.2)', transition: 'background 0.3s' }} />
          ))}
        </div>
      </div>

      {/* Step 1 - Treatment confirm */}
      {step === 1 && (
        <div style={{ padding: '0 24px 40px' }}>
          <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 9, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 500, marginBottom: 8 }}>Paso 1 · Tratamiento</p>
          <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 28, color: 'var(--espresso)', marginBottom: 24 }}>Confirma tu experiencia</h2>
          <div style={{ background: 'rgba(237,230,217,0.5)', border: '1px solid rgba(201,160,140,0.15)', borderRadius: 16, padding: '20px' }}>
            <h3 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 24, color: 'var(--espresso)', marginBottom: 6 }}>{tName}</h3>
            <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 13, color: 'var(--taupe)', marginBottom: 12 }}>{tDuration} min · Lucienne Beauty Spa</p>
            {tPrice > 0 && <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: 26, color: 'var(--espresso)', fontVariantNumeric: 'tabular-nums' }}>${tPrice.toLocaleString('es-MX')}</p>}
          </div>
          <button onClick={() => setStep(2)} style={{ width: '100%', marginTop: 24, background: '#E07560', color: '#FEFCF8', padding: '15px', borderRadius: 22, border: 'none', fontFamily: 'var(--font-montserrat)', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, cursor: 'pointer' }}>
            Elegir fecha →
          </button>
        </div>
      )}

      {/* Step 2 - Calendar */}
      {step === 2 && (
        <div style={{ padding: '0 24px 40px' }}>
          <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 9, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 500, marginBottom: 8 }}>Paso 2 · Fecha</p>
          <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 28, color: 'var(--espresso)', marginBottom: 20 }}>¿Qué día es tu momento?</h2>

          <div style={{ marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <button onClick={() => { if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1) } else setViewMonth(m => m - 1) }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--taupe)', fontSize: 18, padding: '4px 8px' }}>‹</button>
              <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: 20, color: 'var(--espresso)' }}>{monthNames[viewMonth]} {viewYear}</p>
              <button onClick={() => { if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1) } else setViewMonth(m => m + 1) }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--taupe)', fontSize: 18, padding: '4px 8px' }}>›</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, marginBottom: 6 }}>
              {['D', 'L', 'M', 'M', 'J', 'V', 'S'].map((d, i) => (
                <p key={i} style={{ textAlign: 'center', fontFamily: 'var(--font-montserrat)', fontSize: 10, color: 'var(--taupe)', letterSpacing: '0.06em', padding: '4px 0' }}>{d}</p>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
              {Array.from({ length: firstDay }).map((_, i) => <div key={`e${i}`} />)}
              {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
                const dateStr = `${viewYear}-${pad(viewMonth + 1)}-${pad(day)}`
                const isPast = new Date(dateStr) < today
                const isSelected = selectedDate === dateStr
                return (
                  <button key={day} disabled={isPast} onClick={() => setSelectedDate(dateStr)}
                    style={{ aspectRatio: '1/1', borderRadius: 10, border: 'none', cursor: isPast ? 'not-allowed' : 'pointer', background: isSelected ? 'var(--espresso)' : isPast ? 'transparent' : 'rgba(237,230,217,0.3)', color: isSelected ? '#FEFCF8' : isPast ? 'rgba(140,122,107,0.3)' : 'var(--espresso)', fontFamily: 'var(--font-montserrat)', fontSize: 13, fontWeight: isSelected ? 600 : 400, transition: 'all 0.15s' }}>
                    {day}
                  </button>
                )
              })}
            </div>
          </div>

          <button disabled={!selectedDate} onClick={() => setStep(3)} style={{ width: '100%', background: selectedDate ? 'var(--espresso)' : 'rgba(140,122,107,0.2)', color: selectedDate ? '#FEFCF8' : 'var(--taupe)', padding: '15px', borderRadius: 22, border: 'none', fontFamily: 'var(--font-montserrat)', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, cursor: selectedDate ? 'pointer' : 'not-allowed' }}>
            {selectedDate ? 'Elegir horario →' : 'Selecciona una fecha'}
          </button>
        </div>
      )}

      {/* Step 3 - Time */}
      {step === 3 && (
        <div style={{ padding: '0 24px 40px' }}>
          <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 9, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 500, marginBottom: 8 }}>Paso 3 · Horario</p>
          <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 28, color: 'var(--espresso)', marginBottom: 6 }}>¿A qué hora?</h2>
          <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 13, color: 'var(--taupe)', marginBottom: 20 }}>{selectedDate}</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 24 }}>
            {TIMES.map((t) => {
              const occupied = (OCCUPIED[selectedDate] ?? []).includes(t)
              const selected = selectedTime === t
              return (
                <button key={t} disabled={occupied} onClick={() => setSelectedTime(t)} style={{ padding: '14px 8px', borderRadius: 12, border: `1px solid ${selected ? 'rgba(44,31,23,0.6)' : 'rgba(201,160,140,0.18)'}`, background: selected ? 'var(--espresso)' : occupied ? 'rgba(237,230,217,0.2)' : 'rgba(237,230,217,0.35)', cursor: occupied ? 'not-allowed' : 'pointer', fontFamily: 'var(--font-montserrat)', fontSize: 13, color: selected ? '#FEFCF8' : occupied ? 'rgba(140,122,107,0.3)' : 'var(--espresso)', fontVariantNumeric: 'tabular-nums', transition: 'all 0.15s' }}>
                  {occupied ? '—' : t}
                </button>
              )
            })}
          </div>
          <button disabled={!selectedTime} onClick={() => setStep(4)} style={{ width: '100%', background: selectedTime ? 'var(--espresso)' : 'rgba(140,122,107,0.2)', color: selectedTime ? '#FEFCF8' : 'var(--taupe)', padding: '15px', borderRadius: 22, border: 'none', fontFamily: 'var(--font-montserrat)', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, cursor: selectedTime ? 'pointer' : 'not-allowed' }}>
            {selectedTime ? 'Continuar →' : 'Selecciona un horario'}
          </button>
        </div>
      )}

      {/* Step 4 - Data */}
      {step === 4 && (
        <div style={{ padding: '0 24px 40px' }}>
          <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 9, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 500, marginBottom: 8 }}>Paso 4 · Tus datos</p>
          <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 28, color: 'var(--espresso)', marginBottom: 24 }}>Para confirmarte la reserva</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 24 }}>
            {[{ k: 'nombre' as const, label: 'Nombre', type: 'text', placeholder: 'Tu nombre completo' },
              { k: 'email' as const, label: 'Correo electrónico', type: 'email', placeholder: 'Tu correo' },
              { k: 'telefono' as const, label: 'Teléfono', type: 'tel', placeholder: 'Tu número de WhatsApp' },
              { k: 'notas' as const, label: 'Notas adicionales (opcional)', type: 'text', placeholder: 'Alergias, preferencias, etc.' },
            ].map((f) => (
              <div key={f.k}>
                <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--taupe)', fontWeight: 500, marginBottom: 6 }}>{f.label}</p>
                <input type={f.type} value={form[f.k]} onChange={(e) => setForm(prev => ({ ...prev, [f.k]: e.target.value }))} placeholder={f.placeholder}
                  className="input-lucienne"
                  style={{ width: '100%', padding: '12px 14px', borderRadius: 12, border: '1px solid rgba(201,160,140,0.2)', background: 'rgba(237,230,217,0.3)', fontFamily: 'var(--font-montserrat)', fontSize: 13, color: 'var(--espresso)', outline: 'none', boxSizing: 'border-box' }} />
              </div>
            ))}
          </div>
          <button disabled={!form.nombre || !form.email} onClick={handleConfirm} style={{ width: '100%', background: form.nombre && form.email ? 'var(--espresso)' : 'rgba(140,122,107,0.2)', color: form.nombre && form.email ? '#FEFCF8' : 'var(--taupe)', padding: '15px', borderRadius: 22, border: 'none', fontFamily: 'var(--font-montserrat)', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, cursor: form.nombre && form.email ? 'pointer' : 'not-allowed' }}>
            Confirmar reserva
          </button>
        </div>
      )}
      </div>{/* end left column */}

      {/* Right: summary - only visible on desktop */}
      <div className="reservar-summary" style={{ display: 'none', padding: '24px' }}>
        <div style={{ borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(201,160,140,0.2)', background: 'rgba(237,230,217,0.35)' }}>
          {/* Treatment image */}
          <div style={{ height: 200, background: '#EFE1D9', position: 'relative', overflow: 'hidden' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/relajate-2.jpg" alt={tName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} className="photo-warm" />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,18,9,0.6) 0%, transparent 60%)' }} />
            <div style={{ position: 'absolute', bottom: 16, left: 18, right: 18 }}>
              <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: 22, color: '#FEFCF8', fontWeight: 500 }}>{tName}</p>
            </div>
          </div>
          <div style={{ padding: '22px 20px' }}>
            {/* Details */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                <span style={{ fontFamily: 'var(--font-montserrat)', fontSize: 12, color: 'var(--taupe)' }}>Duración</span>
                <span style={{ fontFamily: 'var(--font-montserrat)', fontSize: 12, color: 'var(--espresso)', fontWeight: 600 }}>{tDuration} min</span>
              </div>
              {selectedDate && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                  <span style={{ fontFamily: 'var(--font-montserrat)', fontSize: 12, color: 'var(--taupe)' }}>Fecha</span>
                  <span style={{ fontFamily: 'var(--font-montserrat)', fontSize: 12, color: 'var(--espresso)', fontWeight: 600 }}>{selectedDate}</span>
                </div>
              )}
              {selectedTime && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                  <span style={{ fontFamily: 'var(--font-montserrat)', fontSize: 12, color: 'var(--taupe)' }}>Horario</span>
                  <span style={{ fontFamily: 'var(--font-montserrat)', fontSize: 12, color: 'var(--espresso)', fontWeight: 600 }}>{selectedTime}</span>
                </div>
              )}
              <div style={{ borderTop: '1px solid rgba(201,160,140,0.15)', paddingTop: 14, marginTop: 4 }}>
                <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 11, color: 'var(--taupe)', marginBottom: 6 }}>Lucienne Beauty Spa · Paseos del Pedregal, CDMX</p>
              </div>
            </div>
            {/* Inclusions */}
            <div style={{ marginBottom: 20 }}>
              <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 600, marginBottom: 10 }}>El servicio incluye:</p>
              {['Consulta inicial personalizada', 'Productos de lujo certificados', 'Aftercare exclusivo Lucienne', 'Té de bienvenida'].map((item) => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#C9A08C" strokeWidth="2.5" strokeLinecap="round"><path d="M20 6L9 17l-5-5"/></svg>
                  <span style={{ fontFamily: 'var(--font-montserrat)', fontSize: 12, color: 'var(--espresso)' }}>{item}</span>
                </div>
              ))}
            </div>
            {/* Price */}
            {tPrice > 0 && (
              <div style={{ borderTop: '1px solid rgba(201,160,140,0.18)', paddingTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'var(--font-montserrat)', fontSize: 12, color: 'var(--taupe)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Total</span>
                <span style={{ fontFamily: 'var(--font-cormorant)', fontSize: 28, color: 'var(--espresso)', fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>${tPrice.toLocaleString('es-MX')}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      </div>{/* end 2col */}
      </div>{/* end max-width wrapper */}
    </div>
  )
}

export default function ReservarPage() {
  return (
    <Suspense fallback={<div style={{ background: 'var(--ivory)', minHeight: '100dvh' }} />}>
      <ReservarContent />
    </Suspense>
  )
}
