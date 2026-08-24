'use client'
import { useState } from 'react'

const serviciosData = [
  { id: 1, nombre: 'Masaje Relajante', categoria: 'Masajes', precio: 1500, duracion: '60 min', activo: true },
  { id: 2, nombre: 'Masaje Sueco', categoria: 'Masajes', precio: 1800, duracion: '75 min', activo: true },
  { id: 3, nombre: 'Ritual de Relajación', categoria: 'Rituales', precio: 2900, duracion: '90 min', activo: true },
  { id: 4, nombre: 'Hydrafacial Lumière', categoria: 'Faciales', precio: 2300, duracion: '60 min', activo: true },
  { id: 5, nombre: 'Facial Antiedad Profundo', categoria: 'Faciales', precio: 2800, duracion: '75 min', activo: true },
  { id: 6, nombre: 'HIFU 360°', categoria: 'Aparatología', precio: 6500, duracion: '90 min', activo: true },
  { id: 7, nombre: 'Radiofrecuencia Corporal', categoria: 'Aparatología', precio: 3200, duracion: '60 min', activo: false },
  { id: 8, nombre: 'Mesoterapia Facial', categoria: 'Faciales', precio: 3500, duracion: '45 min', activo: true },
]

const categorias = ['Todos', 'Masajes', 'Rituales', 'Faciales', 'Aparatología']

export default function ServiciosPage() {
  const [filtro, setFiltro] = useState('Todos')
  const [servicios, setServicios] = useState(serviciosData)

  const filtered = filtro === 'Todos' ? servicios : servicios.filter((s) => s.categoria === filtro)

  const toggleActivo = (id: number) => {
    setServicios((prev) => prev.map((s) => s.id === id ? { ...s, activo: !s.activo } : s))
  }

  return (
    <div style={{ background: '#0A0814', minHeight: '100dvh', color: '#FEFCF8', padding: '32px 22px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
        <div>
          <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 10, color: 'rgba(201,160,140,0.5)', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 500, marginBottom: 6 }}>Catálogo</p>
          <h1 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(28px, 5vw, 38px)', color: '#FEFCF8', fontWeight: 300, letterSpacing: '-0.01em' }}>Servicios</h1>
        </div>
        <button style={{ background: 'rgba(201,160,140,0.12)', border: '1px solid rgba(201,160,140,0.25)', borderRadius: 12, padding: '10px 18px', cursor: 'pointer', fontFamily: 'var(--font-montserrat)', fontSize: 11, color: '#C9A08C', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
          Nuevo servicio
        </button>
      </div>

      {/* Filtros */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24, overflowX: 'auto', scrollbarWidth: 'none' }}>
        {categorias.map((cat) => (
          <button key={cat} onClick={() => setFiltro(cat)} style={{ flexShrink: 0, padding: '7px 16px', borderRadius: 20, border: `1px solid ${filtro === cat ? 'rgba(201,160,140,0.5)' : 'rgba(201,160,140,0.12)'}`, background: filtro === cat ? 'rgba(201,160,140,0.12)' : 'transparent', color: filtro === cat ? '#C9A08C' : 'rgba(250,245,240,0.4)', fontFamily: 'var(--font-montserrat)', fontSize: 11, letterSpacing: '0.08em', cursor: 'pointer', transition: 'all 0.2s' }}>
            {cat}
          </button>
        ))}
      </div>

      {/* Table header */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto auto auto', gap: 12, padding: '8px 12px', marginBottom: 4 }}>
        <span style={{ fontFamily: 'var(--font-montserrat)', fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(201,160,140,0.4)' }}>Servicio</span>
        <span style={{ fontFamily: 'var(--font-montserrat)', fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(201,160,140,0.4)', minWidth: 90 }}>Categoría</span>
        <span style={{ fontFamily: 'var(--font-montserrat)', fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(201,160,140,0.4)', minWidth: 60 }}>Precio</span>
        <span style={{ fontFamily: 'var(--font-montserrat)', fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(201,160,140,0.4)', minWidth: 60 }}>Duración</span>
        <span style={{ fontFamily: 'var(--font-montserrat)', fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(201,160,140,0.4)', minWidth: 50 }}>Estado</span>
      </div>

      {/* Rows */}
      <div>
        {filtered.map((s) => (
          <div key={s.id} style={{ display: 'grid', gridTemplateColumns: '1fr auto auto auto auto', gap: 12, padding: '14px 12px', borderBottom: '1px solid rgba(201,160,140,0.06)', alignItems: 'center' }}>
            <div>
              <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: 17, color: '#FEFCF8', fontWeight: 500 }}>{s.nombre}</p>
            </div>
            <span style={{ fontFamily: 'var(--font-montserrat)', fontSize: 11, color: 'rgba(250,245,240,0.4)', minWidth: 90 }}>{s.categoria}</span>
            <span style={{ fontFamily: 'var(--font-montserrat)', fontSize: 13, color: '#C9A08C', fontVariantNumeric: 'tabular-nums', fontWeight: 600, minWidth: 60 }}>${s.precio.toLocaleString('es-MX')}</span>
            <span style={{ fontFamily: 'var(--font-montserrat)', fontSize: 11, color: 'rgba(250,245,240,0.4)', minWidth: 60 }}>{s.duracion}</span>
            {/* Toggle */}
            <button
              onClick={() => toggleActivo(s.id)}
              style={{
                width: 36, height: 20, borderRadius: 10, border: 'none', cursor: 'pointer', minWidth: 50,
                background: s.activo ? 'rgba(201,160,140,0.8)' : 'rgba(250,245,240,0.12)',
                position: 'relative', transition: 'background 0.2s',
              }}
              aria-label={s.activo ? 'Desactivar' : 'Activar'}
            >
              <div style={{ position: 'absolute', top: 2, width: 16, height: 16, borderRadius: '50%', background: '#FEFCF8', transition: 'left 0.2s', left: s.activo ? 18 : 2 }} />
            </button>
          </div>
        ))}
      </div>

      <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 11, color: 'rgba(250,245,240,0.25)', marginTop: 20, textAlign: 'center' }}>
        {filtered.length} servicios · {filtered.filter((s) => s.activo).length} activos
      </p>
    </div>
  )
}
