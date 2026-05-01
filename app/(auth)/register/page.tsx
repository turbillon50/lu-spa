'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Logo } from '../../components/Logo'
import { useStore } from '../../lib/providers'

export default function RegisterPage() {
  const router = useRouter()
  const { register } = useStore()
  const [form, setForm] = useState({ name: '', email: '', phone: '' })

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email) return
    register(form)
    router.push('/home')
  }

  return (
    <section className="relative flex flex-1 flex-col">
      <div
        className="relative flex flex-col items-center px-6 pt-12 pb-8 text-center"
        style={{ backgroundImage: 'linear-gradient(180deg,#e7b0a1 0%,#d99986 100%)' }}
      >
        <Logo size="md" tone="light" />
        <h1 className="mt-5 font-display text-[24px] text-white">Crear cuenta</h1>
        <p className="text-[13px] text-cream-100/90">Tu spa, siempre contigo</p>
      </div>

      <form onSubmit={submit} className="flex flex-1 flex-col gap-4 px-6 pt-6 pb-8">
        <label className="block">
          <span className="eyebrow mb-1 block">Nombre completo</span>
          <input className="field" value={form.name} onChange={update('name')} placeholder="Mariana López" />
        </label>
        <label className="block">
          <span className="eyebrow mb-1 block">Correo</span>
          <input className="field" type="email" value={form.email} onChange={update('email')} placeholder="tu@correo.com" />
        </label>
        <label className="block">
          <span className="eyebrow mb-1 block">Teléfono</span>
          <input className="field" type="tel" value={form.phone} onChange={update('phone')} placeholder="+52 ..." />
        </label>
        <p className="text-[12px] leading-relaxed text-ink-500">
          Al continuar aceptas nuestros términos y aviso de privacidad. Tus datos se usan para personalizar tu experiencia
          en Lucienne.
        </p>
        <button type="submit" className="btn-rose mt-2">
          Crear cuenta
        </button>
        <p className="mt-auto pt-4 text-center text-[13px] text-ink-500">
          ¿Ya tienes cuenta?{' '}
          <Link href="/login" className="font-medium text-rose-600">
            Inicia sesión
          </Link>
        </p>
      </form>
    </section>
  )
}
