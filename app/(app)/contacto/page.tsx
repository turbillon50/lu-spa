export default function ContactoPage() {
  return (
    <div style={{ background: 'var(--ivory)' }}>

      {/* Header */}
      <div style={{ padding: '40px 22px 32px' }}>
        <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 9, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 500, marginBottom: 8 }}>Encuéntranos</p>
        <h1 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 34, color: 'var(--espresso)', fontWeight: 300, lineHeight: 1.1, marginBottom: 6 }}>Contacto</h1>
        <p style={{ fontFamily: 'var(--font-pinyon)', fontSize: 22, color: 'var(--taupe)' }}>Estamos cerca.</p>
      </div>

      {/* Map placeholder */}
      <div style={{ margin: '0 22px 28px', borderRadius: 18, overflow: 'hidden', background: '#EDE6D9', height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <div style={{ textAlign: 'center' }}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--taupe)" strokeWidth="1.5" style={{ marginBottom: 8 }}>
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/>
          </svg>
          <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 12, color: 'var(--taupe)' }}>Paseos del Pedregal, CDMX</p>
        </div>
        <a href="https://maps.google.com/?q=Paseos+del+Pedregal+CDMX" target="_blank" rel="noopener noreferrer"
          style={{ position: 'absolute', bottom: 12, right: 12, background: 'var(--espresso)', color: '#FEFCF8', padding: '7px 14px', borderRadius: 16, textDecoration: 'none', fontFamily: 'var(--font-montserrat)', fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          Cómo llegar
        </a>
      </div>

      {/* Info cards */}
      <section style={{ padding: '0 22px 28px', display: 'flex', flexDirection: 'column', gap: 12 }}>

        <div style={{ background: 'rgba(237,230,217,0.45)', border: '1px solid rgba(201,169,107,0.12)', borderRadius: 16, padding: '20px 20px' }}>
          <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 600, marginBottom: 10 }}>Dirección</p>
          <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: 19, color: 'var(--espresso)', lineHeight: 1.35 }}>Av. Periférico Sur 3720,<br/>Paseos del Pedregal,<br/>Ciudad de México, CDMX 04500</p>
        </div>

        <div style={{ background: 'rgba(237,230,217,0.45)', border: '1px solid rgba(201,169,107,0.12)', borderRadius: 16, padding: '20px 20px' }}>
          <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 600, marginBottom: 12 }}>Horarios</p>
          {[
            { dia: 'Lunes – Viernes', hrs: '9:00 – 20:00' },
            { dia: 'Sábado', hrs: '9:00 – 18:00' },
            { dia: 'Domingo', hrs: '10:00 – 16:00' },
          ].map((h) => (
            <div key={h.dia} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontFamily: 'var(--font-montserrat)', fontSize: 13, color: 'var(--taupe)' }}>{h.dia}</span>
              <span style={{ fontFamily: 'var(--font-montserrat)', fontSize: 13, color: 'var(--espresso)', fontVariantNumeric: 'tabular-nums', fontWeight: 500 }}>{h.hrs}</span>
            </div>
          ))}
        </div>

        <div style={{ background: 'rgba(237,230,217,0.45)', border: '1px solid rgba(201,169,107,0.12)', borderRadius: 16, padding: '20px 20px' }}>
          <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 600, marginBottom: 12 }}>Contacto directo</p>
          <a href="tel:+525500000000" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', marginBottom: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(201,169,107,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.75" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11.5a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .82h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
            </div>
            <span style={{ fontFamily: 'var(--font-montserrat)', fontSize: 14, color: 'var(--espresso)' }}>+52 55 0000 0000</span>
          </a>
          <a href="mailto:hola@lucienne.mx" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', marginBottom: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(201,169,107,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.75" strokeLinecap="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 6 10-6"/></svg>
            </div>
            <span style={{ fontFamily: 'var(--font-montserrat)', fontSize: 14, color: 'var(--espresso)' }}>hola@lucienne.mx</span>
          </a>
          <a href="https://instagram.com/luciennemx" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(201,169,107,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.75" strokeLinecap="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </div>
            <span style={{ fontFamily: 'var(--font-montserrat)', fontSize: 14, color: 'var(--espresso)' }}>@luciennemx</span>
          </a>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <div style={{ padding: '0 22px 60px' }}>
        <a href="https://wa.me/525500000000" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, background: '#25D366', color: '#fff', padding: '15px', borderRadius: 22, textDecoration: 'none', fontFamily: 'var(--font-montserrat)', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 10 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          Escríbenos por WhatsApp
        </a>
        <a href="tel:+525500000000" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', color: 'var(--taupe)', padding: '14px', borderRadius: 22, textDecoration: 'none', fontFamily: 'var(--font-montserrat)', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', border: '1px solid rgba(140,122,107,0.25)' }}>
          Llamar directamente
        </a>
      </div>
    </div>
  )
}
