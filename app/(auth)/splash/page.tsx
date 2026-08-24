'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Logo } from '../../components/Logo'

export default function SplashPage() {
  const router = useRouter()

  useEffect(() => {
    const t = setTimeout(() => {
      try { localStorage.setItem('lucienne::splash', '1') } catch {}
      router.replace('/home')
    }, 2200)
    return () => clearTimeout(t)
  }, [router])

  return (
    <div
      style={{
        position: 'fixed', inset: 0,
        background: 'var(--ivory)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
        zIndex: 9999,
      }}
    >
      <div style={{
        position: 'absolute', width: 360, height: 360,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(201,169,107,0.14) 0%, transparent 70%)',
        animation: 'pulse 2s ease-in-out infinite',
      }} />

      <div style={{ animation: 'fadeIn 0.9s ease forwards', opacity: 0 }}>
        <Logo size="xl" tone="gold" />
      </div>

      <div style={{
        marginTop: 36,
        fontFamily: 'var(--font-pinyon)',
        fontSize: 28,
        color: 'var(--taupe)',
        animation: 'fadeIn 0.8s ease 0.5s forwards',
        opacity: 0,
        letterSpacing: '0.01em',
      }}>
        The Lucienne Experience
      </div>

      <div style={{
        position: 'absolute', bottom: 56,
        display: 'flex', gap: 6,
        animation: 'fadeIn 0.6s ease 1.2s forwards',
        opacity: 0,
      }}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{
            width: 5, height: 5, borderRadius: '50%',
            background: 'var(--gold)',
            animation: `dotPulse 1.2s ease ${i * 0.22}s infinite`,
          }} />
        ))}
      </div>

      <style>{`
        @keyframes fadeIn { to { opacity: 1 } }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.1); opacity: 0.4; }
        }
        @keyframes dotPulse {
          0%, 100% { opacity: 0.35; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.4); }
        }
      `}</style>
    </div>
  )
}
