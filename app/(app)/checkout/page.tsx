'use client'
import { Suspense, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { treatments } from '../../data/treatments'
import { membershipTiers } from '../../data/membership'

function CheckoutContent() {
  const params = useSearchParams()
  const router = useRouter()
  const [step, setStep] = useState<'review' | 'payment' | 'done'>('review')
  const [cardNumber, setCardNumber] = useState('')
  const [cardName, setCardName] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvv, setCvv] = useState('')

  const treatmentId = params.get('t')
  const membershipId = params.get('membership')
  const billing = params.get('billing') || 'monthly'

  let itemName = ''
  let itemPrice = 0
  let itemSub = ''

  if (treatmentId) {
    const t = treatments.find((tr) => tr.id === treatmentId)
    if (t) { itemName = t.name; itemPrice = t.price; itemSub = `${t.duration} min · Una sesión` }
  } else if (membershipId) {
    const m = membershipTiers.find((mt) => mt.id === membershipId)
    if (m) {
      itemName = `Membresía ${m.name}`
      itemPrice = billing === 'annual' ? m.priceAnnual : m.priceMonthly
      itemSub = billing === 'annual' ? 'Anual — 2 meses gratis' : 'Mensual · renovación automática'
    }
  } else {
    const name = params.get('name') || 'Experiencia Lucienne'
    const price = params.get('price') || '0'
    itemName = name
    itemPrice = parseInt(price)
    itemSub = 'Experiencia Lucienne'
  }

  const iva = Math.round(itemPrice * 0.16)
  const total = itemPrice + iva

  if (step === 'done') {
    return (
      <div style={{ background: 'var(--ivory)', minHeight: '90dvh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', textAlign: 'center' }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(201,160,140,0.1)', border: '2px solid rgba(201,160,140,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C9A08C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5"/>
          </svg>
        </div>
        <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 30, color: 'var(--espresso)', marginBottom: 8 }}>Pago confirmado</h2>
        <p style={{ fontFamily: 'var(--font-pinyon)', fontSize: 22, color: 'var(--taupe)', marginBottom: 20 }}>Gracias por confiar en Lucienne.</p>
        <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 14, color: 'var(--taupe)', lineHeight: 1.7, marginBottom: 32, maxWidth: 300 }}>
          Recibirás un correo de confirmación. Te esperamos pronto.
        </p>
        <button onClick={() => router.push('/home')} style={{ background: '#E07560', color: '#FEFCF8', padding: '14px 32px', borderRadius: 22, border: 'none', cursor: 'pointer', fontFamily: 'var(--font-montserrat)', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>
          Volver al inicio
        </button>
      </div>
    )
  }

  return (
    <div style={{ background: 'var(--ivory)', minHeight: '100dvh' }}>
      <div style={{ padding: '32px 22px 24px' }}>
        <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 9, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 500, marginBottom: 8 }}>
          {step === 'review' ? 'Paso 1 — Resumen' : 'Paso 2 — Pago'}
        </p>
        <h1 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 30, color: 'var(--espresso)', fontWeight: 300 }}>Confirmar pedido</h1>
      </div>

      <div style={{ margin: '0 22px 24px', background: 'rgba(237,230,217,0.45)', border: '1px solid rgba(201,160,140,0.15)', borderRadius: 18, padding: '20px' }}>
        <h3 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 22, color: 'var(--espresso)', marginBottom: 4 }}>{itemName}</h3>
        <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 12, color: 'var(--taupe)', marginBottom: 16 }}>{itemSub}</p>
        <div style={{ borderTop: '1px solid rgba(201,160,140,0.12)', paddingTop: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {[['Subtotal', `$${itemPrice.toLocaleString('es-MX')}`], ['IVA 16%', `$${iva.toLocaleString('es-MX')}`], ['Total', `$${total.toLocaleString('es-MX')}`]].map(([label, value], i) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: 'var(--font-montserrat)', fontSize: i === 2 ? 13 : 12, color: i === 2 ? 'var(--espresso)' : 'var(--taupe)', fontWeight: i === 2 ? 600 : 400 }}>{label}</span>
              <span style={{ fontFamily: 'var(--font-cormorant)', fontSize: i === 2 ? 22 : 16, color: i === 2 ? 'var(--espresso)' : 'var(--taupe)', fontVariantNumeric: 'tabular-nums', fontWeight: i === 2 ? 600 : 400 }}>{value}</span>
            </div>
          ))}
        </div>
      </div>

      {step === 'payment' && (
        <div style={{ padding: '0 22px 24px' }}>
          <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 600, marginBottom: 16 }}>Tarjeta de crédito o débito</p>
          {[
            { label: 'Número de tarjeta', value: cardNumber, onChange: setCardNumber, placeholder: '1234 5678 9012 3456' },
            { label: 'Nombre en la tarjeta', value: cardName, onChange: setCardName, placeholder: 'Como aparece en la tarjeta' },
          ].map((field) => (
            <div key={field.label} style={{ marginBottom: 14 }}>
              <label style={{ display: 'block', fontFamily: 'var(--font-montserrat)', fontSize: 11, color: 'var(--taupe)', letterSpacing: '0.06em', marginBottom: 6 }}>{field.label}</label>
              <input value={field.value} onChange={(e) => field.onChange(e.target.value)} placeholder={field.placeholder}
                style={{ width: '100%', padding: '12px 14px', borderRadius: 12, border: '1px solid rgba(201,160,140,0.2)', background: 'rgba(237,230,217,0.35)', fontFamily: 'var(--font-montserrat)', fontSize: 14, color: 'var(--espresso)', outline: 'none', boxSizing: 'border-box' }} />
            </div>
          ))}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
            {[{ label: 'Vencimiento', value: expiry, onChange: setExpiry, placeholder: 'MM/AA' }, { label: 'CVV', value: cvv, onChange: setCvv, placeholder: '123' }].map((field) => (
              <div key={field.label}>
                <label style={{ display: 'block', fontFamily: 'var(--font-montserrat)', fontSize: 11, color: 'var(--taupe)', letterSpacing: '0.06em', marginBottom: 6 }}>{field.label}</label>
                <input value={field.value} onChange={(e) => field.onChange(e.target.value)} placeholder={field.placeholder}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: 12, border: '1px solid rgba(201,160,140,0.2)', background: 'rgba(237,230,217,0.35)', fontFamily: 'var(--font-montserrat)', fontSize: 14, color: 'var(--espresso)', outline: 'none', boxSizing: 'border-box' }} />
              </div>
            ))}
          </div>
          <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 10, color: 'var(--sand)', lineHeight: 1.5 }}>
            * Demo — no se procesa ningún pago real.
          </p>
        </div>
      )}

      <div style={{ padding: '0 22px 60px' }}>
        <button onClick={() => step === 'review' ? setStep('payment') : setStep('done')}
          style={{ width: '100%', background: '#E07560', color: '#FEFCF8', padding: '15px', borderRadius: 22, border: 'none', cursor: 'pointer', fontFamily: 'var(--font-montserrat)', fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700 }}>
          {step === 'review' ? 'Continuar al pago' : 'Confirmar pago'}
        </button>
        <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 10, color: 'var(--sand)', textAlign: 'center', marginTop: 12 }}>
          Pago seguro · SSL · Datos protegidos
        </p>
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div style={{ background: 'var(--ivory)', minHeight: '100dvh' }} />}>
      <CheckoutContent />
    </Suspense>
  )
}
