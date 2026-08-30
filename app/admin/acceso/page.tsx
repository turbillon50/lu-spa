import Image from 'next/image'

export default function AdminAccessPage({ searchParams }: { searchParams?: { error?: string } }) {
  return (
    <main className="admin-access">
      <div className="admin-access__aurora" aria-hidden="true" />
      <section className="admin-access__card" aria-labelledby="admin-access-title">
        <Image src="/img/brand/logo-mark.png" alt="Lucienne Beauty Spa" width={68} height={68} priority className="admin-access__logo" />
        <p className="admin-eyebrow">Portal privado</p>
        <h1 id="admin-access-title">Administración Lucienne</h1>
        <p className="admin-access__intro">Acceso exclusivo para la dirección del spa.</p>
        <form action="/api/admin/session" method="post" className="admin-access__form">
          <label><span>Correo propietario</span><input name="email" type="email" autoComplete="username" required /></label>
          <label><span>Contraseña</span><input name="password" type="password" autoComplete="current-password" required minLength={8} /></label>
          {searchParams?.error ? <p className="admin-form-error" role="alert">El correo o la contraseña no coinciden.</p> : null}
          <button type="submit" className="admin-primary-button">Entrar al panel</button>
        </form>
        <a href="/home" className="admin-access__back">Volver a Lucienne</a>
      </section>
    </main>
  )
}
