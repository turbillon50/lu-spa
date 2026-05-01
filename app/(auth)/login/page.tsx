'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Eye, EyeOff } from 'lucide-react'
import { Logo } from '../../components/Logo'
import { SocialIcon } from '../../components/SocialIcon'
import { useStore } from '../../lib/providers'

export default function LoginPage() {
  const router = useRouter()
  const { signIn, signInGuest } = useStore()
  const [email, setEmail] = useState('fernanda@email.com')
  const [password, setPassword] = useState('luciennespa')
  const [show, setShow] = useState(false)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    signIn(email)
    router.push('/home')
  }

  const social = (provider: string) => {
    signIn(`${provider}@lucienne.spa`)
    router.push('/home')
  }

  return (
    <section className="relative flex flex-1 flex-col">
      <div
        className="relative flex flex-col items-center px-6 pt-16 pb-10 text-center"
        style={{
          backgroundImage:
            'linear-gradient(180deg, rgba(231,176,161,0.95) 0%, rgba(217,153,134,0.95) 100%)'
        }}
      >
        <Logo size="lg" tone="light" />
        <h1 className="mt-7 font-display text-[24px] leading-tight text-white">Bienvenida</h1>
        <p className="text-[13px] text-cream-100/90">a tu espacio de bienestar</p>
      </div>

      <form onSubmit={submit} className="flex flex-1 flex-col gap-4 px-6 pt-6 pb-8">
        <label className="block">
          <span className="eyebrow mb-1 block">Correo o teléfono</span>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="field"
            placeholder="tu@correo.com"
            autoComplete="email"
          />
        </label>
        <label className="block">
          <span className="eyebrow mb-1 block">Contraseña</span>
          <div className="relative">
            <input
              type={show ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="field pr-12"
              placeholder="••••••••"
              autoComplete="current-password"
            />
            <button
              type="button"
              aria-label={show ? 'Ocultar' : 'Mostrar'}
              onClick={() => setShow((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-500"
            >
              {show ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </label>

        <button type="button" className="btn-link self-end">
          ¿Olvidaste tu contraseña?
        </button>

        <button type="submit" className="btn-rose mt-2">
          Iniciar sesión
        </button>

        <div className="my-2 flex items-center gap-3 text-[11px] uppercase tracking-[0.32em] text-ink-500">
          <span className="h-px flex-1 bg-rose-100" />
          o continúa con
          <span className="h-px flex-1 bg-rose-100" />
        </div>

        <div className="flex justify-center gap-4">
          <button type="button" onClick={() => social('google')} aria-label="Google">
            <SocialIcon provider="google" />
          </button>
          <button type="button" onClick={() => social('apple')} aria-label="Apple">
            <SocialIcon provider="apple" />
          </button>
          <button type="button" onClick={() => social('facebook')} aria-label="Facebook">
            <SocialIcon provider="facebook" />
          </button>
        </div>

        <p className="mt-auto pt-6 text-center text-[13px] text-ink-500">
          ¿No tienes cuenta?{' '}
          <Link href="/register" className="font-medium text-rose-600">
            Regístrate
          </Link>
        </p>
        <button
          type="button"
          onClick={() => {
            signInGuest()
            router.push('/home')
          }}
          className="text-center text-[13px] text-ink-500 underline-offset-4 hover:underline"
        >
          Explorar como invitada
        </button>
      </form>
    </section>
  )
}
