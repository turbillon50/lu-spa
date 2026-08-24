// Pantalla de carga global -- se muestra automaticamente mientras Next.js
// resuelve datos de cualquier ruta (Suspense boundary de App Router).
// Misma identidad visual que /splash: fondo oscuro, glow calido, logo real.
export default function Loading() {
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
      <div style={{
        position: 'absolute',
        width: 360, height: 360,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(224,117,96,0.18) 0%, rgba(201,160,140,0.10) 40%, transparent 70%)',
        animation: 'loadingGlow 1.6s ease-in-out infinite',
        pointerEvents: 'none',
      }} />

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/img/brand/logo-mark.png"
        alt="Lucienne Beauty Spa"
        style={{
          width: 88,
          height: 88,
          objectFit: 'cover',
          objectPosition: 'center',
          borderRadius: '50%',
          display: 'block',
          boxShadow: '0 0 40px rgba(201,160,140,0.22)',
          animation: 'loadingPulse 1.6s ease-in-out infinite',
        }}
      />

      <div style={{
        position: 'absolute', bottom: 64,
        display: 'flex', gap: 7,
      }}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{
            width: 5, height: 5, borderRadius: '50%',
            background: '#C9A08C',
            animation: `loadingDot 1.2s ease ${i * 0.22}s infinite`,
          }} />
        ))}
      </div>

      <style>{`
        @keyframes loadingGlow {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50%       { transform: scale(1.1); opacity: 0.5; }
        }
        @keyframes loadingPulse {
          0%, 100% { transform: scale(1); }
          50%       { transform: scale(1.05); }
        }
        @keyframes loadingDot {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50%       { opacity: 1; transform: scale(1.5); }
        }
      `}</style>
    </div>
  )
}
