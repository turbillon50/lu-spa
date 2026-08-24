import Link from 'next/link'
import { journalArticles as articles } from '../../data/journal'

export default function JournalPage() {
  const [featured, ...rest] = articles

  return (
    <div style={{ background: 'var(--ivory)' }}>

      {/* Header */}
      <div style={{ padding: '40px 22px 24px' }}>
        <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 9, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 500, marginBottom: 8 }}>Editorial</p>
        <h1 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 36, color: 'var(--espresso)', fontWeight: 300, lineHeight: 1.05, marginBottom: 6 }}>Journal</h1>
        <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 13, color: 'var(--taupe)' }}>Bienestar, rituales y la ciencia del cuidado.</p>
      </div>

      {/* Featured */}
      <section style={{ padding: '0 22px 32px' }}>
        <Link href={`/journal/${featured.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
          <div style={{ borderRadius: 20, overflow: 'hidden', background: '#EDE6D9', marginBottom: 16 }}>
            <img src={featured.image} alt={featured.title} loading="eager"
              style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', display: 'block' }} />
          </div>
          <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 600, marginBottom: 8 }}>{featured.category}</p>
          <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 26, color: 'var(--espresso)', lineHeight: 1.2, marginBottom: 8, fontWeight: 400 }}>{featured.title}</h2>
          <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 13, color: 'var(--taupe)', lineHeight: 1.65, marginBottom: 10 }}>{featured.excerpt}</p>
          <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 11, color: 'var(--sand)', letterSpacing: '0.06em' }}>{featured.readTime} min · {featured.date}</p>
        </Link>
      </section>

      {/* Divider */}
      <div style={{ margin: '0 22px 28px', height: 1, background: 'rgba(201,169,107,0.15)' }} />

      {/* Rest */}
      <section className="journal-grid" style={{ padding: '0 22px 60px', display: 'flex', flexDirection: 'column', gap: 24 }}>
        {rest.map((article) => (
          <Link key={article.slug} href={`/journal/${article.slug}`} style={{ textDecoration: 'none', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
            <div style={{ width: 90, height: 90, borderRadius: 14, overflow: 'hidden', flexShrink: 0, background: '#EDE6D9' }}>
              <img src={article.image} alt={article.title} loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
            <div style={{ flex: 1, paddingTop: 2 }}>
              <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 600, marginBottom: 5 }}>{article.category}</p>
              <h3 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 20, color: 'var(--espresso)', lineHeight: 1.2, marginBottom: 5, fontWeight: 400 }}>{article.title}</h3>
              <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 11, color: 'var(--sand)', letterSpacing: '0.06em' }}>{article.readTime} min</p>
            </div>
          </Link>
        ))}
      </section>
    </div>
  )
}
