import { adjustInventory, createInventoryProduct } from '../actions'
import { Badge, Card, EmptyState, formatMXN, PageHeader } from '../_components/AdminUI'
import { getInventory } from '../../lib/admin-data'

export const dynamic = 'force-dynamic'

export default async function InventoryPage() {
  const items = await getInventory()
  return <div className="admin-page">
    <PageHeader eyebrow="Insumos y retail" title="Inventario" description="Existencias, mínimos y movimientos auditables." />
    <div className="admin-grid admin-grid--main">
      <Card title="Existencias" subtitle={`${items.length} productos activos`}>
        {items.length ? <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Producto</th><th>SKU</th><th>Existencia</th><th>Mínimo</th><th>Costo</th><th>Precio</th><th>Ajuste</th></tr></thead><tbody>{items.map((item) => <tr key={item.id}><td><strong>{item.nombre}</strong><br/><small>{item.categoria || 'Sin categoría'}</small></td><td>{item.sku || '—'}</td><td className="admin-number">{item.stock} {item.unidad}</td><td className="admin-number">{item.minimo}</td><td>{item.costo == null ? '—' : formatMXN(item.costo)}</td><td className="admin-money">{item.precio == null ? '—' : formatMXN(item.precio)}</td><td><details className="admin-inline-details"><summary><Badge status={item.stock <= item.minimo ? 'Pendiente' : 'Activo'}/></summary><form action={adjustInventory} className="admin-form"><input type="hidden" name="id" value={item.id}/><label>Cantidad<input name="cantidad" type="number" step="0.01" required placeholder="Usa negativo para salida"/></label><label>Motivo<input name="motivo" required placeholder="Compra, consumo, merma…"/></label><label>Referencia<input name="referencia"/></label><button className="admin-primary-button">Aplicar ajuste</button></form></details></td></tr>)}</tbody></table></div> : <EmptyState title="Inventario sin productos" description="Da de alta insumos de cabina o productos de venta para activar las alertas de stock." />}
      </Card>
      <Card title="Nuevo producto" subtitle="Alta inicial de inventario">
        <form action={createInventoryProduct} className="admin-form">
          <label>Nombre<input name="nombre" required/></label><label>SKU<input name="sku"/></label><label>Categoría<input name="categoria"/></label><label>Unidad<select name="unidad"><option value="pieza">Pieza</option><option value="ml">Mililitro</option><option value="g">Gramo</option><option value="caja">Caja</option></select></label>
          <div className="admin-form admin-form--2"><label>Stock inicial<input name="stock" type="number" step="0.01" defaultValue="0"/></label><label>Stock mínimo<input name="minimo" type="number" step="0.01" defaultValue="0"/></label><label>Costo<input name="costo" type="number" min="0" step="0.01"/></label><label>Precio<input name="precio" type="number" min="0" step="0.01"/></label></div>
          <button className="admin-primary-button">Crear producto</button>
        </form>
      </Card>
    </div>
  </div>
}
