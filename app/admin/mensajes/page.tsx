'use client'
import { useState, useEffect, useRef, useCallback } from 'react'

type Conv = {
  id: number; cliente_id: number; nombre: string | null; apellido: string | null
  email: string | null; ultimo_texto: string | null; no_leidos: number; ultimo_mensaje_at: string
}
type Mensaje = { id: number; remitente: 'cliente' | 'admin'; texto: string; created_at: string }

export default function AdminMensajesPage() {
  const [conversaciones, setConversaciones] = useState<Conv[] | null>(null)
  const [activaId, setActivaId] = useState<number | null>(null)
  const [mensajes, setMensajes] = useState<Mensaje[] | null>(null)
  const [texto, setTexto] = useState('')
  const [enviando, setEnviando] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  const cargarLista = useCallback(() => {
    fetch('/api/admin/conversaciones')
      .then((r) => (r.ok ? r.json() : { conversaciones: [] }))
      .then((data) => setConversaciones(data.conversaciones || []))
      .catch(() => {})
  }, [])

  useEffect(() => {
    cargarLista()
    const t = setInterval(cargarLista, 6000)
    return () => clearInterval(t)
  }, [cargarLista])

  const cargarConversacion = useCallback((id: number) => {
    fetch(`/api/admin/conversaciones/${id}`)
      .then((r) => (r.ok ? r.json() : { mensajes: [] }))
      .then((data) => setMensajes(data.mensajes || []))
      .catch(() => {})
  }, [])

  useEffect(() => {
    if (activaId === null) return
    cargarConversacion(activaId)
    const t = setInterval(() => cargarConversacion(activaId), 4000)
    return () => clearInterval(t)
  }, [activaId, cargarConversacion])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [mensajes])

  const enviar = async () => {
    const t = texto.trim()
    if (!t || !activaId || enviando) return
    setEnviando(true)
    setTexto('')
    setMensajes((prev) => [
      ...(prev || []),
      { id: Date.now(), remitente: 'admin', texto: t, created_at: new Date().toISOString() },
    ])
    try {
      await fetch(`/api/admin/conversaciones/${activaId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ texto: t }),
      })
      cargarConversacion(activaId)
      cargarLista()
    } finally {
      setEnviando(false)
    }
  }

  const fmtHora = (iso: string) => new Date(iso).toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })
  const activa = conversaciones?.find((c) => c.id === activaId)

  return (
    <div style={{ display: 'flex', height: 'calc(100dvh - 0px)', maxHeight: 'calc(100dvh - 0px)' }}>
      {/* Lista de conversaciones */}
      <div
        className={activaId !== null ? 'hidden lg:flex' : 'flex'}
        style={{
          width: '100%', maxWidth: 340, flexDirection: 'column',
          borderRight: '1px solid rgba(201,160,140,0.12)', overflowY: 'auto',
        }}
      >
        <div style={{ padding: '20px 20px 12px' }}>
          <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: 24, color: '#FEFCF8', fontWeight: 400 }}>Mensajes</p>
          <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 11, color: 'rgba(201,160,140,0.6)', marginTop: 2 }}>
            {conversaciones?.length ?? 0} conversaciones
          </p>
        </div>
        {conversaciones === null && (
          <p style={{ padding: 20, fontFamily: 'var(--font-montserrat)', fontSize: 12, color: 'rgba(250,245,240,0.4)' }}>Cargando...</p>
        )}
        {conversaciones?.length === 0 && (
          <p style={{ padding: 20, fontFamily: 'var(--font-montserrat)', fontSize: 12, color: 'rgba(250,245,240,0.4)' }}>
            Aún no hay mensajes de clientas.
          </p>
        )}
        {conversaciones?.map((c) => (
          <button
            key={c.id}
            onClick={() => setActivaId(c.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: 12, padding: '14px 20px',
              background: activaId === c.id ? 'rgba(201,160,140,0.1)' : 'transparent',
              border: 'none', borderBottom: '1px solid rgba(201,160,140,0.06)',
              cursor: 'pointer', textAlign: 'left', width: '100%',
            }}
          >
            <div style={{
              width: 38, height: 38, borderRadius: '50%', flexShrink: 0,
              background: '#2C1F17', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-montserrat)', fontSize: 12, fontWeight: 700, color: '#FEFCF8',
            }}>
              {(c.nombre?.[0] || '?').toUpperCase()}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{
                fontFamily: 'var(--font-montserrat)', fontSize: 13, fontWeight: c.no_leidos > 0 ? 700 : 500,
                color: '#FEFCF8', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
              }}>
                {c.nombre || 'Clienta'} {c.apellido || ''}
              </p>
              <p style={{
                fontFamily: 'var(--font-montserrat)', fontSize: 11, color: 'rgba(250,245,240,0.45)',
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
              }}>
                {c.ultimo_texto || 'Sin mensajes'}
              </p>
            </div>
            {c.no_leidos > 0 && (
              <span style={{
                background: '#E07560', color: '#FEFCF8', borderRadius: '50%',
                width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 10, fontFamily: 'var(--font-montserrat)', fontWeight: 700, flexShrink: 0,
              }}>
                {c.no_leidos}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Conversacion activa */}
      <div
        className={activaId === null ? 'hidden lg:flex' : 'flex'}
        style={{ flex: 1, flexDirection: 'column' }}
      >
        {activaId === null ? (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 13, color: 'rgba(250,245,240,0.35)' }}>
              Elige una conversación
            </p>
          </div>
        ) : (
          <>
            <div style={{
              padding: '16px 20px', borderBottom: '1px solid rgba(201,160,140,0.12)',
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <button className="lg:hidden" onClick={() => setActivaId(null)} style={{ background: 'none', border: 'none', color: '#FEFCF8', cursor: 'pointer', display: 'flex' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
              </button>
              <div>
                <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: 18, color: '#FEFCF8' }}>
                  {activa?.nombre || 'Clienta'} {activa?.apellido || ''}
                </p>
                <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 10, color: 'rgba(201,160,140,0.6)' }}>{activa?.email}</p>
              </div>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {mensajes?.map((m) => (
                <div key={m.id} style={{ display: 'flex', justifyContent: m.remitente === 'admin' ? 'flex-end' : 'flex-start' }}>
                  <div style={{
                    maxWidth: '70%', padding: '10px 14px', borderRadius: 16,
                    background: m.remitente === 'admin' ? '#E07560' : 'rgba(255,255,255,0.06)',
                    border: m.remitente === 'cliente' ? '1px solid rgba(201,160,140,0.2)' : 'none',
                  }}>
                    <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 13, color: '#FEFCF8', whiteSpace: 'pre-wrap' }}>{m.texto}</p>
                    <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 9, color: 'rgba(254,252,248,0.55)', marginTop: 3, textAlign: 'right' }}>{fmtHora(m.created_at)}</p>
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            <div style={{ display: 'flex', gap: 8, padding: 16, borderTop: '1px solid rgba(201,160,140,0.12)' }}>
              <input
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') enviar() }}
                placeholder="Responder..."
                style={{
                  flex: 1, padding: '11px 16px', borderRadius: 20, border: '1px solid rgba(201,160,140,0.25)',
                  background: 'rgba(255,255,255,0.04)', color: '#FEFCF8', fontFamily: 'var(--font-montserrat)',
                  fontSize: 13, outline: 'none',
                }}
              />
              <button
                onClick={enviar}
                disabled={!texto.trim() || enviando}
                style={{
                  padding: '0 20px', borderRadius: 20, border: 'none',
                  background: texto.trim() ? '#E07560' : 'rgba(224,117,96,0.4)',
                  color: '#FEFCF8', fontFamily: 'var(--font-montserrat)', fontSize: 12,
                  fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
                  cursor: texto.trim() ? 'pointer' : 'not-allowed',
                }}
              >
                Enviar
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
