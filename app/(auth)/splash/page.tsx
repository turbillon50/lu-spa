'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function SplashPage() {
  const router = useRouter()

  useEffect(() => {
    const t = setTimeout(() => {
      try { localStorage.setItem('lucienne::splash', '1') } catch {}
      router.replace('/home')
    }, 2400)
    return () => clearTimeout(t)
  }, [router])

  return (
    <div
      style={{
        position: 'fixed', inset: 0,
        background: '#0A0603',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
        zIndex: 9999,
      }}
    >
      {/* Warm amber/peach glow behind logo */}
      <div style={{
        position: 'absolute',
        width: 520, height: 520,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(224,117,96,0.18) 0%, rgba(201,160,140,0.10) 40%, transparent 70%)',
        animation: 'glowPulse 2.4s ease-in-out infinite',
        pointerEvents: 'none',
      }} />

      {/* Logo */}
      <div style={{ animation: 'logoIn 1.0s cubic-bezier(.22,1,.36,1) forwards', opacity: 0 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/img/brand/logo-oficial.jpg"
          alt="Lucienne Beauty Spa"
          style={{
            width: 168,
            height: 168,
            objectFit: 'cover',
            objectPosition: 'center',
            borderRadius: '50%',
            display: 'block',
            boxShadow: '0 0 60px rgba(201,160,140,0.25)',
          }}
        />
      </div>

      {/* Script tagline */}
      <div style={{
        marginTop: 40,
        fontFamily: 'var(--font-pinyon)',
        fontSize: 32,
        color: 'rgba(238,221,213,0.88)',
        animation: 'fadeIn 0.8s ease 0.7s forwards',
        opacity: 0,
        letterSpacing: '0.01em',
      }}>
        The Lucienne Experience
      </div>

      {/* Subtext */}
      <div style={{
        marginTop: 12,
        fontFamily: 'var(--font-montserrat)',
        fontSize: 10,
        letterSpacing: '0.28em',
        textTransform: 'uppercase',
        color: 'rgba(201,160,140,0.60)',
        animation: 'fadeIn 0.6s ease 1.0s forwards',
        opacity: 0,
      }}>
        Paseos del Pedregal · CDMX
      </div>

      {/* Loading dots */}
      <div style={{
        position: 'absolute', bottom: 56,
        display: 'flex', gap: 7,
        animation: 'fadeIn 0.6s ease 1.3s forwards',
        opacity: 0,
      }}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{
            width: 5, height: 5, borderRadius: '50%',
            background: '#C9A08C',
            animation: `dotPulse 1.2s ease ${i * 0.22}s infinite`,
          }} />
        ))}
      </div>

      <style>{`
        @keyframes logoIn {
          from { opacity: 0; transform: scale(0.88); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes fadeIn { to { opacity: 1 } }
        @keyframes glowPulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50%       { transform: scale(1.12); opacity: 0.5; }
        }
        @keyframes dotPulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50%       { opacity: 1; transform: scale(1.5); }
        }
      `}</style>
    </div>
  )
}
