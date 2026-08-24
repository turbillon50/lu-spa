'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import { treatments } from '../../data/treatments'

const filters = ['Todo', 'masajes', 'faciales', 'corporales', 'aparatologia', 'rituales']
const filterLabels: Record<string, string> = { masajes: 'Masajes', faciales: 'Faciales', corporales: 'Corporales', aparatologia: 'Aparatología', rituales: 'Rituales' }

export default function BuscarPage() {
  const [query, setQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('Todo')

  const results = useMemo(() => {
    const q = query.toLowerCase()
    return treatments.filter((t) => {
      const matchesQuery = !q || t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q) || t.category.toLowerCase().includes(q)
      const matchesFilter = activeFilter === 'Todo' || t.category === activeFilter
      return matchesQuery && matchesFilter
    })
  }, [query, activeFilter])

  return (
    <div style={{ background: 'var(--ivory)', minHeight: '100dvh' }}>

      {/* Search bar */}
      <div style={{ padding: '24px 22px 16px', background: 'var(--ivory)', position: 'sticky', top: 0, zIndex: 10, borderBottom: '1px solid rgba(201,160,140,0.1)', backdropFilter: 'blur(12px)' }}>
        <div style={{ position: 'relative' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--taupe)" strokeWidth="1.75" strokeLinecap="round" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }}>
            <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
          </svg>
          <input
            type="search"
            placeholder="Buscar tratamientos, experiencias…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            style={{ width: '100%', padding: '12px 14px 12px 40px', borderRadius: 14, border: '1px solid rgba(201,160,140,0.2)', background: 'rgba(237,230,217,0.4)', fontFamily: 'var(--font-montserrat)', fontSize: 14, color: 'var(--espresso)', outline: 'none', boxSizing: 'border-box' }}
          />
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: '14px 22px', scrollbarWidth: 'none' }}>
        {filters.map((f) => (
          <button key={f} onClick={() => setActiveFilter(f)} style={{ flexShrink: 0, padding: '6px 15px', borderRadius: 20, border: `1px solid ${activeFilter === f ? 'rgba(44,31,23,0.5)' : 'rgba(201,160,140,0.2)'}`, background: activeFilter === f ? 'var(--espresso)' : 'transparent', color: activeFilter === f ? '#FEFCF8' : 'var(--taupe)', fontFamily: 'var(--font-montserrat)', fontSize: 11, letterSpacing: '0.06em', cursor: 'pointer', transition: 'all 0.2s' }}>
            {f === 'Todo' ? 'Todo' : filterLabels[f]}
          </button>
        ))}
      </div>

      {/* Results */}
      <div style={{ padding: '8px 22px 80px' }}>
        {query === '' && activeFilter === 'Todo' && (
          <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 12, color: 'var(--sand)', marginBottom: 20, letterSpacing: '0.04em' }}>{treatments.length} tratamientos y experiencias disponibles</p>
        )}

        {results.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: 24, color: 'var(--espresso)', marginBottom: 8 }}>Sin resultados</p>
            <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 13, color: 'var(--taupe)' }}>Intenta con otras palabras o explora nuestras categorías.</p>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {results.map((t) => (
            <Link key={t.id} href={`/treatments/${t.id}`} style={{ textDecoration: 'none', display: 'flex', gap: 14, background: 'rgba(237,230,217,0.3)', border: '1px solid rgba(201,160,140,0.1)', borderRadius: 16, overflow: 'hidden' }}>
              <div style={{ width: 88, flexShrink: 0, background: '#EFE1D9' }}>
                {t.image && <img src={t.image} alt={t.name} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />}
              </div>
              <div style={{ padding: '16px 14px 16px 0', flex: 1 }}>
                <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 600, marginBottom: 4 }}>{t.category}</p>
                <h3 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 18, color: 'var(--espresso)', lineHeight: 1.2, marginBottom: 4 }}>{t.name}</h3>
                <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 12, color: 'var(--taupe)', lineHeight: 1.5, marginBottom: 6, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{t.description}</p>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <span style={{ fontFamily: 'var(--font-cormorant)', fontSize: 16, color: 'var(--espresso)', fontVariantNumeric: 'tabular-nums' }}>${t.price.toLocaleString('es-MX')}</span>
                  <span style={{ fontFamily: 'var(--font-montserrat)', fontSize: 11, color: 'var(--sand)' }}>{t.duration} min</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
