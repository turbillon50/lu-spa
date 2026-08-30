import { BrandEmblem } from './components/BrandEmblem'

export default function Loading() {
  return (
    <div className="lucienne-loader" role="status" aria-label="Cargando Lucienne">
      <div className="lucienne-loader__mesh" aria-hidden="true" />
      <div className="lucienne-loader__content">
        <BrandEmblem size="clamp(146px, 38vw, 188px)" priority glow="strong" />
        <p>The Lucienne Experience</p>
        <div className="lucienne-loader__progress" aria-hidden="true"><span /></div>
      </div>
      <style>{`
        .lucienne-loader { position:fixed; inset:0; z-index:9999; display:grid; place-items:center; overflow:hidden; background:radial-gradient(circle at 50% 42%,#1a0d09 0,#090504 38%,#030202 78%); color:#f6e4db; }
        .lucienne-loader__mesh { position:absolute; width:min(130vw,720px); aspect-ratio:1; border-radius:50%; background:conic-gradient(from 180deg,transparent,rgba(223,139,108,.12),transparent 32%,rgba(203,164,148,.1),transparent 68%); filter:blur(30px); animation:loaderOrbit 8s linear infinite; }
        .lucienne-loader__content { position:relative; display:grid; justify-items:center; gap:24px; }
        .lucienne-loader p { margin:0; font-family:var(--font-pinyon); font-size:clamp(25px,6vw,32px); color:rgba(248,228,218,.9); letter-spacing:.015em; }
        .lucienne-loader__progress { width:118px; height:1px; overflow:hidden; background:rgba(235,190,170,.18); }
        .lucienne-loader__progress span { display:block; width:48%; height:100%; background:linear-gradient(90deg,transparent,#f1b99f,transparent); animation:loaderProgress 1.45s ease-in-out infinite; }
        @keyframes loaderOrbit { to { transform:rotate(360deg); } }
        @keyframes loaderProgress { from { transform:translateX(-110%); } to { transform:translateX(220%); } }
      `}</style>
    </div>
  )
}
