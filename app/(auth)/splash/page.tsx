'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { BrandEmblem } from '../../components/BrandEmblem'

export default function SplashPage() {
  const router = useRouter()

  useEffect(() => {
    const t = setTimeout(() => {
      try { localStorage.setItem('lucienne::splash', '1') } catch {}
      router.replace('/home')
    }, 2600)
    return () => clearTimeout(t)
  }, [router])

  return (
    <div className="splash-stage">
      <div className="splash-stage__mesh" aria-hidden="true" />
      <div className="splash-stage__orbit splash-stage__orbit--one" aria-hidden="true" />
      <div className="splash-stage__orbit splash-stage__orbit--two" aria-hidden="true" />

      <div className="splash-stage__content">
        <div className="splash-stage__logo">
          <BrandEmblem size="clamp(210px, 58vw, 286px)" priority glow="strong" />
        </div>
        <p className="splash-stage__tagline">The Lucienne Experience</p>
        <p className="splash-stage__place">Paseos del Pedregal · CDMX</p>
        <div className="splash-stage__progress" aria-hidden="true"><span /></div>
      </div>

      <style>{`
        .splash-stage { position:fixed; inset:0; z-index:9999; display:grid; place-items:center; overflow:hidden; padding:max(24px,env(safe-area-inset-top)) 24px max(28px,env(safe-area-inset-bottom)); background:radial-gradient(circle at 50% 39%,#26110b 0,#0b0504 38%,#030202 76%); }
        .splash-stage::after { content:''; position:absolute; inset:0; pointer-events:none; background:linear-gradient(115deg,transparent 28%,rgba(255,222,205,.035) 47%,transparent 64%); }
        .splash-stage__mesh { position:absolute; width:min(148vw,820px); aspect-ratio:1; border-radius:50%; background:conic-gradient(from 225deg,transparent,rgba(229,147,114,.16),transparent 28%,rgba(183,129,119,.1),transparent 62%,rgba(241,187,163,.1),transparent); filter:blur(38px); animation:splashMesh 11s linear infinite; }
        .splash-stage__orbit { position:absolute; border:1px solid rgba(239,192,170,.08); border-radius:50%; transform:rotate(-18deg); }
        .splash-stage__orbit--one { width:min(88vw,430px); aspect-ratio:1; }
        .splash-stage__orbit--two { width:min(118vw,610px); aspect-ratio:1; border-color:rgba(239,192,170,.045); }
        .splash-stage__content { position:relative; display:grid; justify-items:center; text-align:center; transform:translateY(-1.5vh); }
        .splash-stage__logo { opacity:0; animation:splashLogoIn 1.15s cubic-bezier(.22,1,.36,1) .1s forwards; }
        .splash-stage__tagline { margin:30px 0 0; opacity:0; font-family:var(--font-pinyon); font-size:clamp(30px,8vw,40px); line-height:1; color:rgba(251,232,222,.94); letter-spacing:.012em; animation:splashFadeUp .8s ease .72s forwards; text-shadow:0 0 28px rgba(224,151,121,.18); }
        .splash-stage__place { margin:14px 0 0; opacity:0; font-family:var(--font-montserrat); font-size:9px; font-weight:500; letter-spacing:.31em; text-transform:uppercase; color:rgba(218,176,158,.66); animation:splashFadeUp .7s ease .98s forwards; }
        .splash-stage__progress { width:132px; height:1px; margin-top:38px; overflow:hidden; opacity:0; background:rgba(236,188,166,.16); animation:splashFadeUp .6s ease 1.15s forwards; }
        .splash-stage__progress span { display:block; width:44%; height:100%; background:linear-gradient(90deg,transparent,#f4bea6,transparent); animation:splashProgress 1.5s ease-in-out 1.1s infinite; }
        @keyframes splashLogoIn { from { opacity:0; transform:translateY(12px) scale(.9); filter:blur(7px); } to { opacity:1; transform:none; filter:none; } }
        @keyframes splashFadeUp { from { opacity:0; transform:translateY(9px); } to { opacity:1; transform:none; } }
        @keyframes splashMesh { to { transform:rotate(360deg); } }
        @keyframes splashProgress { from { transform:translateX(-120%); } to { transform:translateX(245%); } }
        @media (max-height:650px) { .splash-stage__content { transform:scale(.82); } .splash-stage__tagline { margin-top:22px; } .splash-stage__progress { margin-top:26px; } }
      `}</style>
    </div>
  )
}
