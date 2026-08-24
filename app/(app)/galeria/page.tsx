'use client'
import Link from 'next/link'
import { useState } from 'react'

const categories = ['Todo', 'Espacios', 'Cabinas', 'Aparatología', 'Parejas']

const photos = [
  { src: '/img/galeria-1.jpg', label: 'Recepción', cat: 'Espacios', wide: true },
  { src: '/img/galeria-2.jpg', label: 'Corredor', cat: 'Espacios', wide: false },
  { src: '/img/relajate-1.jpg', label: 'Cabina masajes', cat: 'Cabinas', wide: false },
  { src: '/img/relajate-2.jpg', label: 'Ritual relax', cat: 'Cabinas', wide: false },
  { src: '/img/renueva-1.jpg', label: 'Faciales', cat: 'Cabinas', wide: true },
  { src: '/img/renueva-scanner.jpg', label: 'Scanner IA', cat: 'Aparatología', wide: false },
  { src: '/img/transforma-1.jpg', label: 'HIFU 360°', cat: 'Aparatología', wide: false },
  { src: '/img/transforma-2.jpg', label: 'Tecnología estética', cat: 'Aparatología', wide: false },
  { src: '/img/parados.jpg', label: 'Suite para dos', cat: 'Parejas', wide: true },
  { src: '/img/hero-home.jpg', label: 'Bienvenida', cat: 'Espacios', wide: false },
  { src: '/img/membresia.jpg', label: 'Zona lounge', cat: 'Espacios', wide: false },
  { src: '/img/gift.jpg', label: 'Gift cards', cat: 'Espacios', wide: false },
]

export default function GaleriaPage() {
  const [active, setActive] = useState('Todo')
  const [lightbox, setLightbox] = useState<string | null>(null)

  const filtered = active === 'Todo' ? photos : photos.filter((p) => p.cat === active)

  return (
    <div className="page-enter" style={{ background: '#0f0c0a', minHeight: '100dvh' }}>

      {/* Header */}
      <div style={{ padding: '48px 22px 24px' }}>
        <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(201,160,140,0.65)', fontWeight: 500, marginBottom: 8 }}>Espacio Lucienne</p>
        <h1 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(36px, 8vw, 54px)', color: '#FEFCF8', fontWeight: 300, lineHeight: 1.02, letterSpacing: '-0.01em', marginBottom: 6 }}>Galería</h1>
        <p style={{ fontFamily: 'var(--font-pinyon)', fontSize: 24, color: 'rgba(201,160,140,0.55)' }}>Un lugar que se siente.</p>
      </div>

      {/* Filtros */}
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: '0 22px 24px', scrollbarWidth: 'none' }}>
        {categories.map((cat) => (
          <button key={cat} onClick={() => setActive(cat)} style={{ flexShrink: 0, padding: '7px 16px', borderRadius: 20, border: `1px solid ${active === cat ? 'rgba(201,160,140,0.6)' : 'rgba(201,160,140,0.15)'}`, background: active === cat ? 'rgba(201,160,140,0.12)' : 'transparent', color: active === cat ? '#C9A08C' : 'rgba(250,245,240,0.45)', fontFamily: 'var(--font-montserrat)', fontSize: 11, letterSpacing: '0.08em', cursor: 'pointer', transition: 'all 0.2s' }}>
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="galeria-masonry" style={{ padding: '0 12px 80px', columns: '2', columnGap: 8, columnFill: 'balance' }}>
        {filtered.map((photo, i) => (
          <div key={i} onClick={() => setLightbox(photo.src)} style={{ breakInside: 'avoid', marginBottom: 8, borderRadius: 10, overflow: 'hidden', cursor: 'pointer', background: '#1A1209', position: 'relative' }}>
            <img src={photo.src} alt={photo.label} loading="lazy"
              style={{ width: '100%', display: 'block', aspectRatio: photo.wide ? '3/2' : '3/4', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(0,0,0,0.55))', padding: '20px 10px 8px' }}>
              <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 10, color: 'rgba(250,245,240,0.75)', letterSpacing: '0.06em' }}>{photo.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div onClick={() => setLightbox(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', zIndex: 9000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
          <img src={lightbox} alt="" style={{ maxWidth: '100%', maxHeight: '90dvh', borderRadius: 8, objectFit: 'contain' }} />
          <button onClick={() => setLightbox(null)} style={{ position: 'absolute', top: 20, right: 20, background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(250,245,240,0.8)" strokeWidth="2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>
      )}

      {/* CTA */}
      <div style={{ padding: '0 22px 20px', position: 'fixed', bottom: 'calc(72px + env(safe-area-inset-bottom))', left: 0, right: 0, background: 'linear-gradient(transparent, rgba(15,12,10,0.95))', paddingTop: 30 }}>
        <Link href="/reservar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#E07560', color: '#FEFCF8', padding: '14px', borderRadius: 22, textDecoration: 'none', fontFamily: 'var(--font-montserrat)', fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700 }}>
          Reservar visita
        </Link>
      </div>
    </div>
  )
}
