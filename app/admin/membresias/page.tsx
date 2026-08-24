'use client'
import { useState } from 'react'

const planes = [
  {
    id: 'essentielle',
    nombre: 'Essentielle',
    precio: 1490,
    activas: 12,
    color: '#FEFCF8',
    features: ['1 masaje/mes', '10% descuento', 'Cancelación anytime'],
  },
  {
    id: 'signature',
    nombre: 'Signature',
    precio: 2490,
    activas: 16,
    color: '#C9A08C',
    features: ['2 sesiones/mes', '20% descuento', 'Prioridad de agenda', 'Regalo de bienvenida'],
  },
  {
    id: 'prive',
    nombre: 'Privé',
    precio: 4990,
    activas: 6,
    color: '#1A1209',
    features: ['4 sesiones/mes', '30% descuento', 'Lounge privado', 'Consultor asignado', 'Eventos exclusivos'],
  },
]

const miembras = [
  { nombre: 'Valentina C.', plan: 'Signature', inicio: '01/02/2026', proxRenovacion: '01/09/2026', estado: 'activa' },
  { nombre: 'Gabriela T.', plan: 'Privé', inicio: '15/03/2026', proxRenovacion: '15/09/2026', estado: 'activa' },
  { nombre: 'Ana Paula R.', plan: 'Essentielle', inicio: '10/01/2026', proxRenovacion: '10/09/2026', estado: 'activa' },
  { nombre: 'Sofía M.', plan: 'Signature', inicio: '20/06/2026', proxRenovacion: '20/09/2026', estado: 'activa' },
  { nombre: 'Carmen H.', plan: 'Essentielle', inicio: '05/05/2026', proxRenovacion: '05/09/2026', estado: 'por renovar' },
  { nombre: 'Lucía V.', plan: 'Privé', inicio: '01/01/2026', proxRenovacion: '01/09/2026', estado: 'activa' },
]

export default function MembresiasAdminPage() {
  const [activeTab, setActiveTab] = useState<'planes' | 'miembras'>('miembras')
  const [activePlans, setActivePlans] = useState<Record<string, boolean>>({ essentielle: true, signature: true, prive: true })

  return (
    <div style={{ background: '#0A0814', minHeight: '100dvh', color: '#FEFCF8', padding: '32px 22px' }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 10, color: 'rgba(201,160,140,0.5)', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 500, marginBottom: 6 }}>Club privado</p>
        <h1 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(28px, 5vw, 38px)', color: '#FEFCF8', fontWeight: 300, letterSpacing: '-0.01em' }}>Membresías</h1>
      </div>

      {/* Summary cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 28 }}>
        {planes.map((plan) => (
          <div key={plan.id} style={{ borderRadius: 14, background: 'rgba(201,160,140,0.07)', border: '1px solid rgba(201,160,140,0.12)', padding: '16px 14px' }}>
            <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(201,160,140,0.55)', marginBottom: 6 }}>{plan.nombre}</p>
            <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: 28, color: '#C9A08C', fontVariantNumeric: 'tabular-nums', lineHeight: 1, marginBottom: 4 }}>{plan.activas}</p>
            <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 10, color: 'rgba(250,245,240,0.35)' }}>activas · ${plan.precio.toLocaleString('es-MX')}/mes</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 24, background: 'rgba(250,245,240,0.04)', borderRadius: 12, padding: 4 }}>
        {[{ id: 'miembras' as const, label: 'Miembras activas' }, { id: 'planes' as const, label: 'Gestionar planes' }].map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ flex: 1, padding: '9px', borderRadius: 9, border: 'none', cursor: 'pointer', fontFamily: 'var(--font-montserrat)', fontSize: 11, fontWeight: activeTab === tab.id ? 600 : 400, background: activeTab === tab.id ? 'rgba(201,160,140,0.15)' : 'transparent', color: activeTab === tab.id ? '#C9A08C' : 'rgba(250,245,240,0.4)', transition: 'all 0.2s' }}>
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'miembras' && (
        <div>
          {miembras.map((m, i) => (
            <div key={i} style={{ borderBottom: '1px solid rgba(201,160,140,0.06)', padding: '12px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
              <div>
                <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: 17, color: '#FEFCF8', fontWeight: 500, marginBottom: 3 }}>{m.nombre}</p>
                <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 11, color: 'rgba(250,245,240,0.4)' }}>{m.plan} · Desde {m.inicio}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontFamily: 'var(--font-montserrat)', fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: m.estado === 'activa' ? '#C9A08C' : 'rgba(254,165,0,0.8)', fontWeight: 600 }}>{m.estado}</span>
                <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 10, color: 'rgba(250,245,240,0.25)', marginTop: 2 }}>Renueva {m.proxRenovacion}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'planes' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {planes.map((plan) => (
            <div key={plan.id} style={{ borderRadius: 14, background: 'rgba(201,160,140,0.06)', border: '1px solid rgba(201,160,140,0.12)', padding: '18px 16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 20, color: '#FEFCF8', fontWeight: 400 }}>{plan.nombre}</h3>
                  <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 12, color: 'rgba(201,160,140,0.7)', fontVariantNumeric: 'tabular-nums' }}>${plan.precio.toLocaleString('es-MX')}/mes</p>
                </div>
                <button
                  onClick={() => setActivePlans((p) => ({ ...p, [plan.id]: !p[plan.id] }))}
                  style={{ width: 36, height: 20, borderRadius: 10, border: 'none', cursor: 'pointer', background: activePlans[plan.id] ? 'rgba(201,160,140,0.8)' : 'rgba(250,245,240,0.12)', position: 'relative', transition: 'background 0.2s' }}
                >
                  <div style={{ position: 'absolute', top: 2, width: 16, height: 16, borderRadius: '50%', background: '#FEFCF8', transition: 'left 0.2s', left: activePlans[plan.id] ? 18 : 2 }} />
                </button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {plan.features.map((f) => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="rgba(201,160,140,0.6)" strokeWidth="2.5" strokeLinecap="round"><path d="M20 6L9 17l-5-5"/></svg>
                    <span style={{ fontFamily: 'var(--font-montserrat)', fontSize: 12, color: 'rgba(250,245,240,0.55)' }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
