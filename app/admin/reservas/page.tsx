'use client'
import { useState } from 'react'
import { reservasHoy } from '../../data/admin'

const estados = ['Todas', 'confirmada', 'en-curso', 'pendiente', 'cancelada']
const estadoLabel: Record<string, string> = { 'confirmada': 'Confirmada', 'en-curso': 'En curso', 'pendiente': 'Pendiente', 'cancelada': 'Cancelada' }
const estadoColor: Record<string, string> = { 'confirmada': '#C9A96B', 'en-curso': '#FEFCF8', 'pendiente': 'rgba(254,252,248,0.5)', 'cancelada': 'rgba(254,100,100,0.5)' }

export default function ReservasPage() {
  const [filter, setFilter] = useState('Todas')

  const filtered = filter === 'Todas' ? reservasHoy : reservasHoy.filter((r) => r.estado === filter)

  return (
    <div style={{ background: '#0A0814', minHeight: '100dvh', color: '#FEFCF8' }}>
      <div style={{ padding: '28px 22px 20px' }}>
        <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(201,169,107,0.55)', fontWeight: 500, marginBottom: 6 }}>Hoy — Lunes 24 ago</p>
        <h1 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 30, color: '#FEFCF8', fontWeight: 300 }}>Reservas</h1>
      </div>

      {/* Filtros */}
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: '0 22px 20px', scrollbarWidth: 'none' }}>
        {estados.map((e) => (
          <button key={e} onClick={() => setFilter(e)} style={{ flexShrink: 0, padding: '6px 14px', borderRadius: 20, border: `1px solid ${filter === e ? '#C9A96B' : 'rgba(201,169,107,0.15)'}`, background: filter === e ? 'rgba(201,169,107,0.12)' : 'transparent', color: filter === e ? '#C9A96B' : 'rgba(254,252,248,0.4)', fontFamily: 'var(--font-montserrat)', fontSize: 10, letterSpacing: '0.06em', textTransform: 'uppercase', cursor: 'pointer' }}>
            {e === 'Todas' ? 'Todas' : estadoLabel[e]}
          </button>
        ))}
      </div>

      {/* Lista */}
      <div style={{ padding: '0 22px 20px' }}>
        {filtered.map((r) => (
          <div key={r.id} style={{ background: 'rgba(201,169,107,0.04)', border: '1px solid rgba(201,169,107,0.08)', borderRadius: 14, padding: '16px', marginBottom: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
              <div>
                <h3 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 20, color: '#FEFCF8', marginBottom: 2 }}>{r.clienta}</h3>
                <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 12, color: 'rgba(254,252,248,0.5)' }}>{r.tratamiento}</p>
              </div>
              <span style={{ fontFamily: 'var(--font-montserrat)', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: estadoColor[r.estado] || '#FEFCF8', fontWeight: 600 }}>
                {estadoLabel[r.estado] || r.estado}
              </span>
            </div>
            <div style={{ display: 'flex', gap: 16 }}>
              <div>
                <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(201,169,107,0.4)', marginBottom: 2 }}>Hora</p>
                <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 13, color: '#FEFCF8', fontVariantNumeric: 'tabular-nums' }}>{r.hora}</p>
              </div>
              <div>
                <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(201,169,107,0.4)', marginBottom: 2 }}>Cabina</p>
                <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 13, color: '#FEFCF8' }}>{r.cabina}</p>
              </div>
              <div>
                <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(201,169,107,0.4)', marginBottom: 2 }}>Duración</p>
                <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 13, color: '#FEFCF8' }}>{r.duracion}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
