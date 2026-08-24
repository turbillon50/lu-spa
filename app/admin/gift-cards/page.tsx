'use client'
import { useState } from 'react'

type EstadoGC = 'vigente' | 'usada' | 'vencida'

const giftCardsData = [
  { codigo: 'LUC-ABCD-1234', para: 'Valentina C.', de: 'Carlos M.', valor: 2300, estado: 'vigente' as EstadoGC, vencimiento: '30/09/2026' },
  { codigo: 'LUC-EFGH-5678', para: 'Sofía R.', de: 'Mamá', valor: 1500, estado: 'usada' as EstadoGC, vencimiento: '15/08/2026' },
  { codigo: 'LUC-IJKL-9012', para: 'Ana L.', de: 'Empresa XYZ', valor: 5000, estado: 'vigente' as EstadoGC, vencimiento: '31/12/2026' },
  { codigo: 'LUC-MNOP-3456', para: 'Gabriela T.', de: 'Rodrigo V.', valor: 2900, estado: 'vigente' as EstadoGC, vencimiento: '01/10/2026' },
  { codigo: 'LUC-QRST-7890', para: 'Carmen H.', de: 'Familia', valor: 3200, estado: 'vencida' as EstadoGC, vencimiento: '01/07/2026' },
  { codigo: 'LUC-UVWX-2345', para: 'Lucía V.', de: 'Amigas', valor: 1000, estado: 'usada' as EstadoGC, vencimiento: '10/08/2026' },
]

const estadoColors: Record<EstadoGC, string> = {
  vigente: '#C9A96B',
  usada: 'rgba(254,252,248,0.35)',
  vencida: 'rgba(220,80,80,0.7)',
}

export default function GiftCardsAdminPage() {
  const [filtro, setFiltro] = useState<EstadoGC | 'todas'>('todas')
  const [showCrear, setShowCrear] = useState(false)

  const filtered = filtro === 'todas' ? giftCardsData : giftCardsData.filter((g) => g.estado === filtro)

  const stats = {
    vigentes: giftCardsData.filter((g) => g.estado === 'vigente').length,
    usadas: giftCardsData.filter((g) => g.estado === 'usada').length,
    vencidas: giftCardsData.filter((g) => g.estado === 'vencida').length,
    total: giftCardsData.filter((g) => g.estado === 'vigente').reduce((acc, g) => acc + g.valor, 0),
  }

  return (
    <div style={{ background: '#0A0814', minHeight: '100dvh', color: '#FEFCF8', padding: '32px 22px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
        <div>
          <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 10, color: 'rgba(201,169,107,0.5)', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 500, marginBottom: 6 }}>Regalos</p>
          <h1 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(28px, 5vw, 38px)', color: '#FEFCF8', fontWeight: 300, letterSpacing: '-0.01em' }}>Gift Cards</h1>
        </div>
        <button
          onClick={() => setShowCrear(true)}
          style={{ background: 'rgba(201,169,107,0.12)', border: '1px solid rgba(201,169,107,0.25)', borderRadius: 12, padding: '10px 18px', cursor: 'pointer', fontFamily: 'var(--font-montserrat)', fontSize: 11, color: '#C9A96B', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
          Crear nueva
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, marginBottom: 24 }}>
        <div style={{ borderRadius: 12, background: 'rgba(201,169,107,0.07)', border: '1px solid rgba(201,169,107,0.1)', padding: '14px 12px' }}>
          <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 9, color: 'rgba(201,169,107,0.5)', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 4 }}>Vigentes</p>
          <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: 28, color: '#C9A96B', fontVariantNumeric: 'tabular-nums', lineHeight: 1 }}>{stats.vigentes}</p>
        </div>
        <div style={{ borderRadius: 12, background: 'rgba(201,169,107,0.07)', border: '1px solid rgba(201,169,107,0.1)', padding: '14px 12px' }}>
          <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 9, color: 'rgba(201,169,107,0.5)', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 4 }}>Valor total vigente</p>
          <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: 24, color: '#FEFCF8', fontVariantNumeric: 'tabular-nums', lineHeight: 1 }}>${stats.total.toLocaleString('es-MX')}</p>
        </div>
      </div>

      {/* Filtros */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {([['todas', 'Todas'], ['vigente', 'Vigentes'], ['usada', 'Usadas'], ['vencida', 'Vencidas']] as const).map(([id, label]) => (
          <button key={id} onClick={() => setFiltro(id)} style={{ flexShrink: 0, padding: '6px 14px', borderRadius: 20, border: `1px solid ${filtro === id ? 'rgba(201,169,107,0.5)' : 'rgba(201,169,107,0.12)'}`, background: filtro === id ? 'rgba(201,169,107,0.12)' : 'transparent', color: filtro === id ? '#C9A96B' : 'rgba(254,252,248,0.4)', fontFamily: 'var(--font-montserrat)', fontSize: 11, letterSpacing: '0.06em', cursor: 'pointer', transition: 'all 0.2s' }}>
            {label}
          </button>
        ))}
      </div>

      {/* Cards list */}
      <div>
        {filtered.map((gc, i) => (
          <div key={i} style={{ borderBottom: '1px solid rgba(201,169,107,0.06)', padding: '14px 0', display: 'grid', gridTemplateColumns: '1fr auto', gap: 12, alignItems: 'center' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: 16, color: '#FEFCF8', fontWeight: 500 }}>Para: {gc.para}</p>
                <span style={{ fontFamily: 'var(--font-montserrat)', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: estadoColors[gc.estado], fontWeight: 600 }}>{gc.estado}</span>
              </div>
              <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 11, color: 'rgba(254,252,248,0.35)', marginBottom: 2 }}>De: {gc.de}</p>
              <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 10, color: 'rgba(201,169,107,0.45)', letterSpacing: '0.08em' }}>{gc.codigo}</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: 20, color: '#C9A96B', fontVariantNumeric: 'tabular-nums', fontWeight: 600, lineHeight: 1, marginBottom: 4 }}>${gc.valor.toLocaleString('es-MX')}</p>
              <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 10, color: 'rgba(254,252,248,0.25)' }}>Vence {gc.vencimiento}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Crear modal (simple overlay) */}
      {showCrear && (
        <div onClick={() => setShowCrear(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 9000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: '#0A0814', border: '1px solid rgba(201,169,107,0.2)', borderRadius: 20, padding: '28px 24px', width: '100%', maxWidth: 380 }}>
            <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 24, color: '#FEFCF8', fontWeight: 300, marginBottom: 20 }}>Crear gift card</h2>
            <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 13, color: 'rgba(254,252,248,0.5)', lineHeight: 1.6, marginBottom: 20 }}>
              Ve a la sección pública de Gift Cards para generar una nueva tarjeta con todos los datos personalizados.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setShowCrear(false)} style={{ flex: 1, padding: '12px', borderRadius: 14, border: '1px solid rgba(201,169,107,0.2)', background: 'transparent', color: 'rgba(254,252,248,0.5)', fontFamily: 'var(--font-montserrat)', fontSize: 11, cursor: 'pointer', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Cancelar
              </button>
              <a href="/gift-cards" style={{ flex: 1, padding: '12px', borderRadius: 14, border: 'none', background: 'rgba(201,169,107,0.85)', color: '#1A1209', fontFamily: 'var(--font-montserrat)', fontSize: 11, cursor: 'pointer', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                Ir a Gift Cards
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
