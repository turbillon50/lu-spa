import { notFound } from 'next/navigation'
import Link from 'next/link'
import { journalArticles as articles } from '../../../data/journal'

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }))
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = articles.find((a) => a.slug === params.slug)
  if (!article) notFound()

  return (
    <div style={{ background: 'var(--ivory)' }}>

      {/* Hero */}
      <div style={{ position: 'relative', height: 280, background: '#EDE6D9', overflow: 'hidden' }}>
        <img src={article.image} alt={article.title} loading="eager"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(26,18,9,0.1) 0%, rgba(26,18,9,0.7) 100%)' }} />
        <div style={{ position: 'absolute', bottom: 24, left: 22, right: 22 }}>
          <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(201,169,107,0.85)', fontWeight: 600, marginBottom: 8 }}>{article.category}</p>
          <h1 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 30, color: '#FEFCF8', fontWeight: 300, lineHeight: 1.15 }}>{article.title}</h1>
        </div>
      </div>

      {/* Meta */}
      <div style={{ padding: '18px 22px 0', display: 'flex', gap: 12, alignItems: 'center', borderBottom: '1px solid rgba(201,169,107,0.1)', paddingBottom: 18 }}>
        <span style={{ fontFamily: 'var(--font-montserrat)', fontSize: 11, color: 'var(--sand)' }}>{article.readTime} min de lectura</span>
        <div style={{ width: 3, height: 3, borderRadius: '50%', background: 'rgba(201,169,107,0.4)' }} />
        <span style={{ fontFamily: 'var(--font-montserrat)', fontSize: 11, color: 'var(--sand)' }}>{article.date}</span>
      </div>

      {/* Excerpt */}
      <div style={{ padding: '22px 22px 0' }}>
        <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: 20, fontStyle: 'italic', color: 'var(--espresso)', lineHeight: 1.55, marginBottom: 22 }}>{article.excerpt}</p>
      </div>

      {/* Body */}
      <div style={{ padding: '0 22px 60px' }}>
        {article.body.map((para, i) => (
          <p key={i} style={{ fontFamily: 'var(--font-montserrat)', fontSize: 14, color: 'var(--taupe)', lineHeight: 1.85, marginBottom: 20 }}>{para}</p>
        ))}
      </div>

      {/* More articles */}
      <div style={{ padding: '0 22px 32px', borderTop: '1px solid rgba(201,169,107,0.12)' }}>
        <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 9, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 500, margin: '24px 0 16px' }}>Más del journal</p>
        {articles.filter((a) => a.slug !== article.slug).slice(0, 2).map((a) => (
          <Link key={a.slug} href={`/journal/${a.slug}`} style={{ textDecoration: 'none', display: 'flex', gap: 12, marginBottom: 16, alignItems: 'flex-start' }}>
            <div style={{ width: 68, height: 68, borderRadius: 10, overflow: 'hidden', flexShrink: 0, background: '#EDE6D9' }}>
              <img src={a.image} alt={a.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ paddingTop: 2 }}>
              <h4 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 18, color: 'var(--espresso)', lineHeight: 1.2, marginBottom: 4 }}>{a.title}</h4>
              <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 11, color: 'var(--sand)' }}>{a.readTime} min</p>
            </div>
          </Link>
        ))}
      </div>

      {/* CTA */}
      <div style={{ padding: '0 22px 60px' }}>
        <Link href="/reservar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--espresso)', color: '#FEFCF8', padding: '15px', borderRadius: 22, textDecoration: 'none', fontFamily: 'var(--font-montserrat)', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>
          Reservar experiencia
        </Link>
      </div>
    </div>
  )
}
