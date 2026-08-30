'use client'

import Link from 'next/link'
import { useSiteContent } from '../../components/SiteContentProvider'

const icons = {
  reminder: <><circle cx="12" cy="12" r="8"/><path d="M12 8v4l3 2"/></>,
  promo: <><path d="M4 4h7l9 9-7 7-9-9V4z"/><circle cx="8" cy="8" r="1"/></>,
  news: <><path d="M5 4h14v16H5z"/><path d="M8 8h8M8 12h8M8 16h5"/></>,
  birthday: <><path d="M4 11h16v9H4zM7 11V8h10v3M12 8V4"/><path d="M10 4c0-1 1-2 2-2s2 1 2 2-2 4-2 4-2-3-2-4z"/></>,
}

export default function NotificationsPage() {
  const { notifications } = useSiteContent()
  return <div className="page-enter" style={{ minHeight: '100dvh', padding: '28px 22px 70px', background: 'var(--ivory)' }}>
    <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 9, letterSpacing: '.22em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 7 }}>Lucienne contigo</p>
    <h1 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 38, fontWeight: 400, color: 'var(--espresso)', marginBottom: 6 }}>Notificaciones</h1>
    <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 12, color: 'var(--taupe)', lineHeight: 1.7, marginBottom: 26 }}>Recordatorios, beneficios y novedades importantes del spa.</p>
    {notifications.length ? <div style={{ display: 'grid', gap: 12 }}>
      {notifications.map((item) => {
        const card = <article style={{ display: 'grid', gridTemplateColumns: '42px 1fr', gap: 13, padding: 16, borderRadius: 16, background: 'rgba(237,230,217,.42)', border: '1px solid rgba(201,160,140,.16)' }}>
          <span style={{ width: 42, height: 42, display: 'grid', placeItems: 'center', borderRadius: 13, background: 'rgba(201,160,140,.13)', color: 'var(--espresso)' }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{icons[item.type]}</svg></span>
          <div><strong style={{ fontFamily: 'var(--font-cormorant)', fontSize: 19, fontWeight: 500, color: 'var(--espresso)' }}>{item.title}</strong><p style={{ marginTop: 4, fontFamily: 'var(--font-montserrat)', fontSize: 12, color: 'var(--taupe)', lineHeight: 1.6 }}>{item.body}</p></div>
        </article>
        return item.actionUrl ? <Link href={item.actionUrl} key={item.id} style={{ textDecoration: 'none' }}>{card}</Link> : <div key={item.id}>{card}</div>
      })}
    </div> : <div style={{ padding: '46px 20px', border: '1px solid rgba(201,160,140,.14)', borderRadius: 18, textAlign: 'center' }}><p style={{ fontFamily: 'var(--font-cormorant)', fontSize: 22, color: 'var(--espresso)' }}>Todo está al día</p><p style={{ marginTop: 6, fontFamily: 'var(--font-montserrat)', fontSize: 11, color: 'var(--taupe)' }}>Las novedades aparecerán aquí cuando Lucienne publique algo para ti.</p></div>}
  </div>
}
