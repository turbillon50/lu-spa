'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useUser } from '@clerk/nextjs'
import { ReferralCard } from './ReferralCard'
import { MensajesEntry } from './MensajesEntry'

// Vista de cuenta para una sesion REAL de Clerk (no demo). Hoy no hay base
// de datos conectada a reservas/membresias por usuario -- eso se agrega
// despues -- asi que esta vista es honesta: identidad real + seguridad
// (passkey / Face ID) real, sin inventar reservas que no existen.
export function RealAccountView() {
  const { user } = useUser()
  const [creating, setCreating] = useState(false)
  const [pkError, setPkError] = useState('')
  const [reservas, setReservas] = useState<Array<{
    id: number; fecha: string; hora: string; estado: string
    tratamiento: string; precio: string; duracion_min: number
  }> | null>(null)

  useEffect(() => {
    fetch('/api/reservas')
      .then((r) => (r.ok ? r.json() : { reservas: [] }))
      .then((data) => setReservas(data.reservas || []))
      .catch(() => setReservas([]))
  }, [])

  const handleCancelar = async (id: number) => {
    await fetch(`/api/reservas/${id}`, { method: 'DELETE' })
    setReservas((prev) => prev?.map((r) => (r.id === id ? { ...r, estado: 'cancelada' } : r)) ?? null)
  }

  const fmtFecha = (iso: string) =>
    new Date(iso).toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'long' })

  const passkeys = user?.passkeys ?? []

  const handleCreatePasskey = async () => {
    if (!user) return
    setPkError('')
    setCreating(true)
    try {
      await user.createPasskey()
    } catch (err: unknown) {
      const msg = (err as { errors?: { message: string }[] })?.errors?.[0]?.message
      setPkError(msg || 'No se pudo crear el passkey. Verifica que tu dispositivo soporte Face ID / huella.')
    } finally {
      setCreating(false)
    }
  }

  const handleDeletePasskey = async (id: string) => {
    const pk = passkeys.find((p) => p.id === id)
    if (pk) await pk.delete()
  }

  return (
    <div className="page-enter" style={{ background: 'var(--ivory)' }}>
      <div style={{ background: 'var(--espresso)', padding: '36px 24px 32px' }}>
        <p style={{
          fontFamily: 'var(--font-montserrat)', fontSize: 10, letterSpacing: '0.28em',
          textTransform: 'uppercase', color: 'rgba(201,160,140,0.55)', fontWeight: 500, marginBottom: 12,
        }}>
          Mi Lucienne
        </p>
        <h1 style={{
          fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(34px, 7vw, 48px)',
          color: '#FEFCF8', fontWeight: 300, letterSpacing: '-0.01em', lineHeight: 1.05, marginBottom: 6,
        }}>
          Hola, {user?.firstName || 'bienvenida'}
        </h1>
        <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 13, color: 'rgba(238,221,213,0.7)' }}>
          {user?.primaryEmailAddress?.emailAddress}
        </p>
      </div>

      <ReferralCard />
      <MensajesEntry />

      <div style={{ padding: '0 24px 28px' }}>
        <h2 style={{
          fontFamily: 'var(--font-cormorant)', fontSize: 22, color: 'var(--espresso)',
          fontWeight: 400, marginBottom: 6,
        }}>
          Seguridad de tu cuenta
        </h2>
        <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 13, color: 'var(--taupe)', lineHeight: 1.7, marginBottom: 20 }}>
          Entra mas rapido la proxima vez con Face ID, huella o el desbloqueo de tu dispositivo -- sin escribir contrasena.
        </p>

        {passkeys.length > 0 && (
          <div style={{ marginBottom: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {passkeys.map((pk) => (
              <div key={pk.id} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(201,160,140,0.2)',
                borderRadius: 14, padding: '12px 16px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--gold-deep)" strokeWidth="1.7">
                    <path d="M12 2a5 5 0 0 0-5 5v3a5 5 0 0 0 10 0V7a5 5 0 0 0-5-5Z" />
                    <path d="M8 10v6a4 4 0 0 0 8 0v-6" />
                  </svg>
                  <span style={{ fontFamily: 'var(--font-montserrat)', fontSize: 13, color: 'var(--espresso)' }}>
                    {pk.name || 'Passkey'}
                  </span>
                </div>
                <button
                  onClick={() => handleDeletePasskey(pk.id)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-montserrat)', fontSize: 11, color: 'var(--taupe)', textDecoration: 'underline' }}
                >
                  Quitar
                </button>
              </div>
            ))}
          </div>
        )}

        {pkError && (
          <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 12, color: '#C04040', marginBottom: 14 }}>{pkError}</p>
        )}

        <button
          onClick={handleCreatePasskey}
          disabled={creating}
          className="btn-primary"
          style={{
            width: '100%', padding: '15px', borderRadius: 28, border: 'none',
            cursor: creating ? 'not-allowed' : 'pointer',
            background: creating ? 'rgba(224,117,96,0.5)' : '#E07560',
            color: '#FEFCF8', fontFamily: 'var(--font-montserrat)', fontSize: 12,
            letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 600,
          }}
        >
          {creating ? 'Configurando...' : passkeys.length > 0 ? 'Agregar otro passkey' : 'Activar Passkey / Face ID'}
        </button>

        <h2 style={{
          fontFamily: 'var(--font-cormorant)', fontSize: 22, color: 'var(--espresso)',
          fontWeight: 400, marginTop: 40, marginBottom: 12,
        }}>
          Tus reservas
        </h2>

        {reservas === null && (
          <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 13, color: 'var(--taupe)' }}>Cargando...</p>
        )}

        {reservas !== null && reservas.length === 0 && (
          <div style={{ padding: '20px 20px', background: 'rgba(237,230,217,0.4)', borderRadius: 16, border: '1px solid rgba(201,160,140,0.18)' }}>
            <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 12, color: 'var(--taupe)', lineHeight: 1.7 }}>
              Todavia no tienes reservas. Cuando reserves un tratamiento, aqui vas a ver el historial.
            </p>
          </div>
        )}

        {reservas !== null && reservas.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {reservas.map((r) => (
              <div key={r.id} style={{
                background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(201,160,140,0.2)',
                borderRadius: 14, padding: '14px 16px',
                opacity: r.estado === 'cancelada' ? 0.5 : 1,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                  <span style={{ fontFamily: 'var(--font-cormorant)', fontSize: 18, color: 'var(--espresso)', fontWeight: 500 }}>
                    {r.tratamiento}
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-montserrat)', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase',
                    color: r.estado === 'cancelada' ? '#C04040' : '#6B8F5A', fontWeight: 700,
                  }}>
                    {r.estado}
                  </span>
                </div>
                <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 12, color: 'var(--taupe)', textTransform: 'capitalize' }}>
                  {fmtFecha(r.fecha)} · {r.hora.slice(0, 5)}
                </p>
                {r.estado !== 'cancelada' && (
                  <button
                    onClick={() => handleCancelar(r.id)}
                    style={{ marginTop: 8, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-montserrat)', fontSize: 11, color: 'var(--taupe)', textDecoration: 'underline' }}
                  >
                    Cancelar
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        <Link href="/reservar" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'var(--espresso)', color: '#FEFCF8',
          padding: '15px', borderRadius: 24, textDecoration: 'none',
          fontFamily: 'var(--font-montserrat)', fontSize: 12,
          letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600,
          marginTop: 16,
        }}>
          Nueva reserva
        </Link>
      </div>
    </div>
  )
}
