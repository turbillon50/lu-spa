'use client'
import { useEffect, useState } from 'react'
import { Download, Share, X } from 'lucide-react'

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

const DISMISS_KEY = 'lucienne::install-dismissed'

const isStandalone = () =>
  window.matchMedia('(display-mode: standalone)').matches ||
  // iOS Safari
  (window.navigator as Navigator & { standalone?: boolean }).standalone === true

const isiOS = () =>
  /iphone|ipad|ipod/i.test(window.navigator.userAgent) &&
  !/crios|fxios|edgios/i.test(window.navigator.userAgent)

export function InstallPrompt() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null)
  const [showIosHint, setShowIosHint] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (isStandalone()) return
    if (localStorage.getItem(DISMISS_KEY)) return

    const onBeforeInstall = (event: Event) => {
      event.preventDefault()
      setDeferred(event as BeforeInstallPromptEvent)
      setVisible(true)
    }
    const onInstalled = () => {
      setVisible(false)
      setDeferred(null)
      try {
        localStorage.setItem(DISMISS_KEY, '1')
      } catch {}
    }

    window.addEventListener('beforeinstallprompt', onBeforeInstall)
    window.addEventListener('appinstalled', onInstalled)

    // iOS never fires beforeinstallprompt — surface manual instructions instead.
    if (isiOS()) {
      setShowIosHint(true)
      setVisible(true)
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstall)
      window.removeEventListener('appinstalled', onInstalled)
    }
  }, [])

  const dismiss = () => {
    setVisible(false)
    try {
      localStorage.setItem(DISMISS_KEY, '1')
    } catch {}
  }

  const install = async () => {
    if (!deferred) return
    await deferred.prompt()
    const { outcome } = await deferred.userChoice
    if (outcome === 'accepted') dismiss()
    setDeferred(null)
  }

  if (!visible) return null

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-[92px] z-50 flex justify-center px-4">
      <div className="card-soft pointer-events-auto flex w-full max-w-[412px] items-center gap-3 shadow-lift">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/icon-192.png"
          alt="Lucienne"
          width={44}
          height={44}
          className="h-11 w-11 shrink-0 rounded-2xl shadow-soft"
        />
        <div className="min-w-0 flex-1">
          <p className="text-[13px] font-semibold text-ink-900">Instala Lucienne</p>
          {showIosHint ? (
            <p className="mt-0.5 flex items-center gap-1 text-[11px] leading-snug text-ink-500">
              Toca <Share size={13} strokeWidth={1.8} className="inline shrink-0" /> y luego
              “Añadir a pantalla de inicio”.
            </p>
          ) : (
            <p className="mt-0.5 text-[11px] leading-snug text-ink-500">
              Acceso directo desde tu pantalla de inicio, sin navegador.
            </p>
          )}
        </div>
        {!showIosHint && deferred && (
          <button
            onClick={install}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-gold-gradient px-4 py-2 text-[12px] font-semibold text-white shadow-glow active:scale-95"
          >
            <Download size={14} strokeWidth={2} />
            Instalar
          </button>
        )}
        <button
          onClick={dismiss}
          aria-label="Cerrar"
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-ink-500 transition hover:bg-rose-50"
        >
          <X size={16} strokeWidth={1.8} />
        </button>
      </div>
    </div>
  )
}
