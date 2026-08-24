'use client'
import { useState } from 'react'
import Link from 'next/link'

const experiences = [
  { id: 'masaje-relajante', name: 'Masaje Relajante', price: 1500, duration: '60 min' },
  { id: 'hydrafacial', name: 'Hydrafacial Lumière', price: 2300, duration: '60 min' },
  { id: 'ritual-relajacion', name: 'Ritual de Relajación', price: 2900, duration: '90 min' },
  { id: 'ritual-facial', name: 'Ritual Facial Signature', price: 3200, duration: '90 min' },
  { id: 'para-dos', name: 'Experiencia para Dos', price: 5800, duration: '120 min' },
  { id: 'experiencia-lucienne', name: 'Experiencia Lucienne Completa', price: 5800, duration: '150 min' },
]

const amounts = [1000, 1500, 2000, 2500, 3000, 5000]

function generateCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789'
  return 'LUC-' + Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('') +
    '-' + Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
}

export default function GiftCardsPage() {
  const [mode, setMode] = useState<'experience' | 'amount'>('experience')
  const [selectedExp, setSelectedExp] = useState(experiences[0])
  const [selectedAmount, setSelectedAmount] = useState(2000)
  const [form, setForm] = useState({ para: '', de: '', mensaje: '', fecha: '' })
  const [confirmed, setConfirmed] = useState(false)
  const [code] = useState(generateCode)

  const update = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }))
  const value = mode === 'experience' ? selectedExp.price : selectedAmount
  const name = mode === 'experience' ? selectedExp.name : `Gift Card $${selectedAmount.toLocaleString('es-MX')}`

  if (confirmed) {
    return (
      <div style={{ background: 'var(--ivory)', minHeight: '80dvh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>
        <GiftCardPreview name={name} para={form.para || 'A quien la reciba'} de={form.de || 'Con cariño'} mensaje={form.mensaje} value={value} code={code} fecha={form.fecha} />
        <div style={{ marginTop: 32, width: '100%', maxWidth: 380 }}>
          <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 12, color: 'var(--taupe)', textAlign: 'center', marginBottom: 20 }}>
            Código único generado. La tarjeta puede compartirse por mensaje o imprimirse.
          </p>
          <button onClick={() => setConfirmed(false)} style={{ width: '100%', background: 'var(--espresso)', color: '#FEFCF8', padding: '14px', borderRadius: 22, border: 'none', fontFamily: 'var(--font-montserrat)', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, cursor: 'pointer' }}>
            Crear otra gift card
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ background: 'var(--ivory)' }}>

      {/* Header */}
      <div style={{ position: 'relative', height: 220, background: '#EDE6D9', overflow: 'hidden' }}>
        <img src="/img/gift.jpg" alt="Gift Cards Lucienne" loading="eager"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(26,18,9,0.5)' }} />
        <div style={{ position: 'absolute', bottom: 22, left: 24, right: 24 }}>
          <p style={{ fontFamily: 'var(--font-pinyon)', fontSize: 26, color: 'rgba(232,213,168,0.9)', marginBottom: 4 }}>Regala The Lucienne Experience</p>
          <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 12, color: 'rgba(254,252,248,0.7)' }}>Los objetos acumulan polvo. Las experiencias, significado.</p>
        </div>
      </div>

      <div style={{ padding: '28px 22px 40px' }}>

        {/* Mode selector */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 28, background: 'rgba(237,230,217,0.4)', borderRadius: 14, padding: 4 }}>
          {[{ id: 'experience' as const, label: 'Elegir experiencia' }, { id: 'amount' as const, label: 'Elegir monto' }].map((m) => (
            <button key={m.id} onClick={() => setMode(m.id)} style={{ flex: 1, padding: '10px', borderRadius: 11, border: 'none', cursor: 'pointer', fontFamily: 'var(--font-montserrat)', fontSize: 12, fontWeight: mode === m.id ? 600 : 400, background: mode === m.id ? 'var(--espresso)' : 'transparent', color: mode === m.id ? '#FEFCF8' : 'var(--taupe)', transition: 'all 0.2s' }}>
              {m.label}
            </button>
          ))}
        </div>

        {/* Experience or Amount */}
        {mode === 'experience' ? (
          <div style={{ marginBottom: 24 }}>
            <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--taupe)', fontWeight: 500, marginBottom: 10 }}>¿Qué experiencia vas a regalar?</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {experiences.map((exp) => (
                <button key={exp.id} onClick={() => setSelectedExp(exp)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderRadius: 13, border: `1px solid ${selectedExp.id === exp.id ? 'rgba(201,169,107,0.5)' : 'rgba(201,169,107,0.12)'}`, background: selectedExp.id === exp.id ? 'rgba(201,169,107,0.08)' : 'transparent', cursor: 'pointer', width: '100%', textAlign: 'left' }}>
                  <div>
                    <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: 17, color: 'var(--espresso)', fontWeight: 500 }}>{exp.name}</p>
                    <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 11, color: 'var(--taupe)' }}>{exp.duration}</p>
                  </div>
                  <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: 18, color: 'var(--espresso)', fontVariantNumeric: 'tabular-nums', fontWeight: 600 }}>${exp.price.toLocaleString('es-MX')}</p>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ marginBottom: 24 }}>
            <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--taupe)', fontWeight: 500, marginBottom: 10 }}>¿Cuánto quieres regalar?</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
              {amounts.map((a) => (
                <button key={a} onClick={() => setSelectedAmount(a)} style={{ padding: '14px 8px', borderRadius: 12, border: `1px solid ${selectedAmount === a ? 'rgba(201,169,107,0.5)' : 'rgba(201,169,107,0.15)'}`, background: selectedAmount === a ? 'rgba(201,169,107,0.1)' : 'transparent', cursor: 'pointer', fontFamily: 'var(--font-cormorant)', fontSize: 18, color: 'var(--espresso)', fontVariantNumeric: 'tabular-nums', fontWeight: selectedAmount === a ? 600 : 400 }}>
                  ${a.toLocaleString('es-MX')}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 24 }}>
          {[{ key: 'para' as const, label: 'Para (nombre)', placeholder: 'Nombre de quien la recibirá' },
            { key: 'de' as const, label: 'De', placeholder: 'Tu nombre o apodo' },
            { key: 'mensaje' as const, label: 'Mensaje personal', placeholder: 'Un mensaje de tu corazón…' },
            { key: 'fecha' as const, label: 'Entregar el (opcional)', placeholder: 'dd/mm/aaaa' },
          ].map((field) => (
            <div key={field.key}>
              <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--taupe)', fontWeight: 500, marginBottom: 6 }}>{field.label}</p>
              {field.key === 'mensaje' ? (
                <textarea
                  value={form[field.key]}
                  onChange={(e) => update(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  rows={3}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: 12, border: '1px solid rgba(201,169,107,0.2)', background: 'rgba(237,230,217,0.3)', fontFamily: 'var(--font-montserrat)', fontSize: 13, color: 'var(--espresso)', outline: 'none', resize: 'none', boxSizing: 'border-box' }}
                />
              ) : (
                <input
                  value={form[field.key]}
                  onChange={(e) => update(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: 12, border: '1px solid rgba(201,169,107,0.2)', background: 'rgba(237,230,217,0.3)', fontFamily: 'var(--font-montserrat)', fontSize: 13, color: 'var(--espresso)', outline: 'none', boxSizing: 'border-box' }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Live Preview */}
        <div style={{ marginBottom: 24 }}>
          <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--taupe)', fontWeight: 500, marginBottom: 12 }}>Vista previa en vivo</p>
          <GiftCardPreview name={name} para={form.para || 'A quien la reciba'} de={form.de || 'Con cariño'} mensaje={form.mensaje} value={value} code={code} fecha={form.fecha} />
        </div>

        <button onClick={() => setConfirmed(true)} style={{ width: '100%', background: 'var(--espresso)', color: '#FEFCF8', padding: '16px', borderRadius: 24, border: 'none', fontFamily: 'var(--font-montserrat)', fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, cursor: 'pointer' }}>
          Confirmar y generar gift card
        </button>
      </div>
    </div>
  )
}

function GiftCardPreview({ name, para, de, mensaje, value, code, fecha }: {
  name: string; para: string; de: string; mensaje: string; value: number; code: string; fecha: string
}) {
  return (
    <div style={{
      borderRadius: 20, overflow: 'hidden',
      background: 'linear-gradient(145deg, #2C1F17 0%, #1A1209 100%)',
      border: '1px solid rgba(201,169,107,0.25)',
      boxShadow: 'inset 0 1px 0 rgba(201,169,107,0.2), 0 8px 32px rgba(44,31,23,0.25)',
      padding: '28px 22px 22px',
      position: 'relative',
    }}>
      <div style={{ position: 'absolute', top: -30, right: -30, width: 150, height: 150, borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,169,107,0.08) 0%, transparent 70%)' }} />
      <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 9, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(201,169,107,0.6)', fontWeight: 500, marginBottom: 14 }}>LUCIENNE BEAUTY SPA</p>
      <p style={{ fontFamily: 'var(--font-pinyon)', fontSize: 24, color: 'rgba(232,213,168,0.85)', marginBottom: 6, letterSpacing: '0.01em' }}>The Lucienne Experience</p>
      <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: 16, color: 'rgba(254,252,248,0.75)', marginBottom: 16, fontStyle: 'italic' }}>{name}</p>
      {mensaje && <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 12, color: 'rgba(254,252,248,0.55)', lineHeight: 1.6, marginBottom: 16, fontStyle: 'italic' }}>"{mensaje}"</p>}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 16 }}>
        <div>
          <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 9, color: 'rgba(254,252,248,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 2 }}>Para · De</p>
          <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 12, color: 'rgba(254,252,248,0.7)' }}>{para} · {de}</p>
          {fecha && <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 10, color: 'rgba(201,169,107,0.5)', marginTop: 2 }}>{fecha}</p>}
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: 28, color: '#C9A96B', fontVariantNumeric: 'tabular-nums', lineHeight: 1 }}>${value.toLocaleString('es-MX')}</p>
          <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 9, color: 'rgba(201,169,107,0.5)', letterSpacing: '0.12em', marginTop: 4 }}>{code}</p>
        </div>
      </div>
    </div>
  )
}
