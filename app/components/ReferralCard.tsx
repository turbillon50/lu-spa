'use client'
import { useState, useEffect } from 'react'

type ReferidoInfo = { nombre: string | null; apellido: string | null; puntos_otorgados: number; created_at: string }
type ReferralData = {
  codigo: string
  puntos: number
  totalReferidos: number
  referidos: ReferidoInfo[]
  yaCanjeoUnCodigo: boolean
}

// "Invita y gana" -- vive arriba en el perfil a proposito (Luis lo pidio como
// una pieza importante, no un detalle escondido). Codigo unico por clienta,
// puntos reales guardados en Neon, nada simulado.
export function ReferralCard() {
  const [data, setData] = useState<ReferralData | null>(null)
  const [copied, setCopied] = useState(false)
  const [redeemCode, setRedeemCode] = useState('')
  const [redeeming, setRedeeming] = useState(false)
  const [redeemMsg, setRedeemMsg] = useState<{ ok: boolean; text: string } | null>(null)
  const [showRedeemInput, setShowRedeemInput] = useState(false)

  const load = () => {
    fetch('/api/referidos')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => setData(d))
      .catch(() => setData(null))
  }

  useEffect(load, [])

  const shareUrl = data ? `https://luciennespa.beauty/register?ref=${data.codigo}` : ''

  const handleShare = async () => {
    if (!data) return
    const texto = `Te invito a Lucienne Beauty Spa. Usa mi código ${data.codigo} al registrarte: ${shareUrl}`
    if (navigator.share) {
      try { await navigator.share({ text: texto, url: shareUrl }); return } catch { /* cancelado */ }
    }
    await navigator.clipboard.writeText(texto)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleRedeem = async () => {
    if (!redeemCode.trim()) return
    setRedeeming(true)
    setRedeemMsg(null)
    try {
      const res = await fetch('/api/referidos/canjear', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ codigo: redeemCode.trim() }),
      })
      const json = await res.json()
      if (!res.ok) {
        setRedeemMsg({ ok: false, text: json.error || 'No se pudo canjear' })
      } else {
        setRedeemMsg({ ok: true, text: `¡Listo! Ganaste ${json.puntosGanados} puntos de bienvenida.` })
        setRedeemCode('')
        load()
      }
    } catch {
      setRedeemMsg({ ok: false, text: 'Error de conexión. Intenta de nuevo.' })
    } finally {
      setRedeeming(false)
    }
  }

  if (!data) {
    return (
      <div style={{
        margin: '0 24px 28px', padding: '20px', borderRadius: 20,
        background: 'rgba(237,230,217,0.4)', border: '1px solid rgba(201,160,140,0.18)',
      }}>
        <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 12, color: 'var(--taupe)' }}>Cargando tu código...</p>
      </div>
    )
  }

  return (
    <div style={{
      margin: '-20px 24px 28px', position: 'relative', zIndex: 1,
      background: 'linear-gradient(135deg, #2C1F17 0%, #1A1209 100%)',
      borderRadius: 22, padding: '24px 22px',
      boxShadow: '0 12px 40px rgba(44,31,23,0.25)',
      border: '1px solid rgba(201,160,140,0.25)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#C9A08C" strokeWidth="1.8">
          <path d="M2.7 10.3L12 22l9.3-11.7L17 3H7L2.7 10.3z" />
          <path d="M7 3l5 7.3L17 3M2.7 10.3h18.6" />
        </svg>
        <span style={{
          fontFamily: 'var(--font-montserrat)', fontSize: 10, letterSpacing: '0.2em',
          textTransform: 'uppercase', color: '#C9A08C', fontWeight: 700,
        }}>
          Invita y gana
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 18 }}>
        <span style={{ fontFamily: 'var(--font-cormorant)', fontSize: 40, color: '#FEFCF8', fontWeight: 300, lineHeight: 1 }}>
          {data.puntos}
        </span>
        <span style={{ fontFamily: 'var(--font-montserrat)', fontSize: 12, color: 'rgba(238,221,213,0.6)' }}>
          puntos {data.totalReferidos > 0 && `· ${data.totalReferidos} ${data.totalReferidos === 1 ? 'invitada' : 'invitadas'}`}
        </span>
      </div>

      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'rgba(255,255,255,0.06)', border: '1px dashed rgba(201,160,140,0.4)',
        borderRadius: 14, padding: '12px 16px', marginBottom: 12,
      }}>
        <span style={{
          fontFamily: 'var(--font-montserrat)', fontSize: 16, letterSpacing: '0.12em',
          color: '#FEFCF8', fontWeight: 700,
        }}>
          {data.codigo}
        </span>
        <button
          onClick={handleShare}
          style={{
            background: '#E07560', border: 'none', borderRadius: 20, padding: '8px 16px',
            cursor: 'pointer', fontFamily: 'var(--font-montserrat)', fontSize: 10,
            letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 700, color: '#FEFCF8',
          }}
        >
          {copied ? 'Copiado' : 'Compartir'}
        </button>
      </div>

      <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 11, color: 'rgba(238,221,213,0.55)', lineHeight: 1.6, marginBottom: data.yaCanjeoUnCodigo ? 0 : 14 }}>
        Cada amiga que se registre con tu código te suma 100 puntos, y ella gana 50 de bienvenida.
      </p>

      {!data.yaCanjeoUnCodigo && !showRedeemInput && (
        <button
          onClick={() => setShowRedeemInput(true)}
          style={{
            background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-montserrat)',
            fontSize: 11, color: '#C9A08C', textDecoration: 'underline',
          }}
        >
          ¿Alguien te invitó? Ingresa su código
        </button>
      )}

      {!data.yaCanjeoUnCodigo && showRedeemInput && (
        <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
          <input
            value={redeemCode}
            onChange={(e) => setRedeemCode(e.target.value.toUpperCase())}
            placeholder="CÓDIGO"
            style={{
              flex: 1, padding: '11px 14px', borderRadius: 12, border: '1px solid rgba(201,160,140,0.35)',
              background: 'rgba(255,255,255,0.06)', color: '#FEFCF8', fontFamily: 'var(--font-montserrat)',
              fontSize: 13, letterSpacing: '0.08em', outline: 'none',
            }}
          />
          <button
            onClick={handleRedeem}
            disabled={redeeming}
            style={{
              background: '#C9A08C', border: 'none', borderRadius: 12, padding: '0 18px',
              cursor: redeeming ? 'not-allowed' : 'pointer', fontFamily: 'var(--font-montserrat)',
              fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 700, color: '#1A1209',
            }}
          >
            {redeeming ? '...' : 'Canjear'}
          </button>
        </div>
      )}

      {redeemMsg && (
        <p style={{
          marginTop: 10, fontFamily: 'var(--font-montserrat)', fontSize: 11,
          color: redeemMsg.ok ? '#8FBF7A' : '#E08787',
        }}>
          {redeemMsg.text}
        </p>
      )}
    </div>
  )
}
