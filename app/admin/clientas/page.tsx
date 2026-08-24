'use client'
import { useState } from 'react'
import { clientasRecientes } from '../../data/admin'

const membresias = ['Todas', 'Signature', 'Privé', 'Essentielle', 'Sin membresía']

export default function ClientasPage() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('Todas')

  const filtered = clientasRecientes.filter((c) => {
    const matchSearch = !search || c.nombre.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'Todas' || (filter === 'Sin membresía' ? !c.membresia : c.membresia === filter)
    return matchSearch && matchFilter
  })

  return (
    <div style={{ background: '#0A0814', minHeight: '100dvh', color: '#FEFCF8' }}>
      <div style={{ padding: '28px 22px 20px' }}>
        <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(201,169,107,0.55)', fontWeight: 500, marginBottom: 6 }}>CRM</p>
        <h1 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 30, color: '#FEFCF8', fontWeight: 300, marginBottom: 18 }}>Clientas</h1>

        {/* Search */}
        <div style={{ position: 'relative', marginBottom: 14 }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(254,252,248,0.3)" strokeWidth="1.75" strokeLinecap="round" style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)' }}>
            <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
          </svg>
          <input type="search" placeholder="Buscar clienta…" value={search} onChange={(e) => setSearch(e.target.value)}
            style={{ width: '100%', padding: '11px 14px 11px 36px', borderRadius: 12, border: '1px solid rgba(201,169,107,0.12)', background: 'rgba(201,169,107,0.04)', fontFamily: 'var(--font-montserrat)', fontSize: 13, color: '#FEFCF8', outline: 'none', boxSizing: 'border-box' }} />
        </div>
      </div>

      {/* Filtros */}
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: '0 22px 20px', scrollbarWidth: 'none' }}>
        {membresias.map((m) => (
          <button key={m} onClick={() => setFilter(m)} style={{ flexShrink: 0, padding: '6px 14px', borderRadius: 20, border: `1px solid ${filter === m ? '#C9A96B' : 'rgba(201,169,107,0.12)'}`, background: filter === m ? 'rgba(201,169,107,0.12)' : 'transparent', color: filter === m ? '#C9A96B' : 'rgba(254,252,248,0.4)', fontFamily: 'var(--font-montserrat)', fontSize: 10, letterSpacing: '0.06em', cursor: 'pointer' }}>
            {m}
          </button>
        ))}
      </div>

      {/* Lista */}
      <div style={{ padding: '0 22px 30px' }}>
        <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 10, color: 'rgba(254,252,248,0.25)', letterSpacing: '0.06em', marginBottom: 12 }}>{filtered.length} clientas</p>
        {filtered.map((c) => (
          <div key={c.nombre} style={{ background: 'rgba(201,169,107,0.03)', border: '1px solid rgba(201,169,107,0.07)', borderRadius: 14, padding: '16px', marginBottom: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(201,169,107,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontFamily: 'var(--font-cormorant)', fontSize: 20, color: '#C9A96B' }}>{c.nombre[0]}</span>
              </div>
              <div>
                <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 14, color: '#FEFCF8', fontWeight: 600, marginBottom: 2 }}>{c.nombre}</p>
                <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 11, color: c.membresia ? '#C9A96B' : 'rgba(254,252,248,0.35)' }}>{c.membresia || 'Sin membresía'}</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 16, paddingTop: 10, borderTop: '1px solid rgba(201,169,107,0.06)' }}>
              <div>
                <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 9, color: 'rgba(201,169,107,0.4)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 3 }}>Visitas</p>
                <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: 20, color: '#FEFCF8', fontVariantNumeric: 'tabular-nums' }}>{c.visitas}</p>
              </div>
              <div>
                <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 9, color: 'rgba(201,169,107,0.4)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 3 }}>Última visita</p>
                <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 12, color: 'rgba(254,252,248,0.5)' }}>{c.ultimaVisita}</p>
              </div>
              <div>
                <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 9, color: 'rgba(201,169,107,0.4)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 3 }}>Gasto total</p>
                <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: 18, color: '#C9A96B', fontVariantNumeric: 'tabular-nums' }}>${c.gasto.toLocaleString('es-MX')}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
