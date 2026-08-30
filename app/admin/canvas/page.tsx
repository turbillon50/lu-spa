import Link from 'next/link'
import { getCmsAdminData } from '../../lib/admin-data'
import { saveCmsBlock, saveCmsPage, setCmsBlockState } from '../actions'
import { Badge, Card, EmptyState, PageHeader } from '../_components/AdminUI'

export const dynamic = 'force-dynamic'

const routeFor = (slug: string) => slug === 'home' ? '/home' : `/${slug}`

export default async function CanvasPage({ searchParams }: { searchParams: { page?: string } }) {
  const pages = await getCmsAdminData()
  const selected = pages.find((page) => page.slug === searchParams.page) || pages[0]
  return <div className="admin-page">
    <PageHeader eyebrow="Editor visual" title="Canvas PWA" description="Ordena bloques, edita mensajes y revisa la vista publicada en paralelo." actions={<Link className="admin-secondary-button" href="/admin/contenido">Contenido y precios</Link>}/>
    {pages.length ? <>
      <div className="admin-toolbar" style={{ marginBottom: 14 }}>{pages.map((page) => <Link key={page.id} href={`/admin/canvas?page=${page.slug}`} className={selected?.id === page.id ? 'admin-primary-button' : 'admin-secondary-button'}>{page.titulo}</Link>)}</div>
      {selected ? <div className="admin-cms-grid">
        <div className="admin-stack">
          <Card title={selected.titulo} subtitle={`/${selected.slug} · ${selected.blocks.length} bloques`} action={<Badge status={selected.estado}/> }>
            <form action={saveCmsPage} className="admin-form"><input type="hidden" name="id" value={selected.id}/><label>Título<input name="titulo" defaultValue={selected.titulo}/></label><label>Slug<input name="slug" defaultValue={selected.slug}/></label><label>Estado<select name="estado" defaultValue={selected.estado}><option value="borrador">Borrador</option><option value="publicada">Publicada</option><option value="archivada">Archivada</option></select></label><label>SEO title<input name="seoTitle" defaultValue={selected.seoTitle || ''}/></label><label>SEO descripción<textarea name="seoDescription" defaultValue={selected.seoDescription || ''}/></label><button className="admin-primary-button">Guardar página</button></form>
          </Card>
          <Card title="Bloques" subtitle="El orden se refleja al publicar">
            {selected.blocks.length ? <div className="admin-canvas-list">{selected.blocks.map((block) => <div className="admin-canvas-block" key={block.id}><div className="admin-canvas-block__top"><span className="admin-badge">{block.type}</span><strong>{block.key}</strong><div className="admin-toolbar"><form action={setCmsBlockState}><input type="hidden" name="id" value={block.id}/><input type="hidden" name="accion" value="up"/><button className="admin-secondary-button" aria-label="Subir bloque">↑</button></form><form action={setCmsBlockState}><input type="hidden" name="id" value={block.id}/><input type="hidden" name="accion" value="down"/><button className="admin-secondary-button" aria-label="Bajar bloque">↓</button></form><form action={setCmsBlockState}><input type="hidden" name="id" value={block.id}/><input type="hidden" name="accion" value="toggle"/><button className="admin-secondary-button">{block.visible ? 'Ocultar' : 'Mostrar'}</button></form></div></div><details><summary>Editar contenido</summary><BlockForm pageId={selected.id} block={block}/></details></div>)}</div> : <EmptyState title="Página sin bloques" description="Agrega un hero o una sección de contenido para empezar."/>}
            <div className="admin-divider"/><details><summary className="admin-secondary-button" style={{ width: 'fit-content' }}>Agregar bloque</summary><BlockForm pageId={selected.id}/></details>
          </Card>
        </div>
        <div><div className="admin-card admin-content-card" style={{ marginBottom: 10 }}><h3>Vista publicada</h3><p>El preview muestra la versión que hoy ve la clienta. Los borradores aparecen al publicarlos.</p></div><div className="admin-canvas-preview"><iframe src={routeFor(selected.slug)} title={`Vista de ${selected.titulo}`}/></div></div>
      </div> : null}
    </> : <Card title="Crea tu primera página"><EmptyState title="Canvas vacío" description="Ve a Contenido y precios, crea una página como “home” y vuelve para diseñarla."/></Card>}
  </div>
}

function BlockForm({ pageId, block }: { pageId: number; block?: { id: number; key: string; type: string; content: Record<string, unknown> } }) {
  const text = (key: string) => block?.content[key] ? String(block.content[key]) : ''
  return <form action={saveCmsBlock} className="admin-form" style={{ marginTop: 14 }}><input type="hidden" name="pageId" value={pageId}/>{block ? <input type="hidden" name="id" value={block.id}/> : null}<div className="admin-form admin-form--2"><label>Clave<input name="key" defaultValue={block?.key || 'hero'} required pattern="[a-z0-9-]+"/></label><label>Tipo<select name="tipo" defaultValue={block?.type || 'hero'}><option value="hero">Hero</option><option value="contenido">Contenido</option><option value="cta">Llamado a acción</option><option value="imagen">Imagen</option></select></label></div><label>Antetítulo<input name="eyebrow" defaultValue={text('eyebrow')}/></label><label>Título<input name="title" defaultValue={text('title')}/></label><label>Texto<textarea name="body" defaultValue={text('body')}/></label><div className="admin-form admin-form--2"><label>Botón<input name="ctaLabel" defaultValue={text('ctaLabel')}/></label><label>Ruta del botón<input name="ctaHref" defaultValue={text('ctaHref')} placeholder="/reservar"/></label></div><label>Imagen<input name="image" defaultValue={text('image')} placeholder="/img/hero-home.jpg"/></label><button className="admin-primary-button">Guardar bloque</button></form>
}
