CREATE TABLE IF NOT EXISTS staff (
  id SERIAL PRIMARY KEY,
  nombre TEXT NOT NULL,
  rol TEXT NOT NULL DEFAULT 'terapeuta',
  especialidades TEXT[] NOT NULL DEFAULT '{}',
  telefono TEXT,
  email TEXT,
  color TEXT,
  activo BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS cabinas (
  id SERIAL PRIMARY KEY,
  nombre TEXT NOT NULL UNIQUE,
  tipo TEXT,
  capacidad INTEGER NOT NULL DEFAULT 1 CHECK (capacidad > 0),
  activa BOOLEAN NOT NULL DEFAULT TRUE,
  notas TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE reservas ADD COLUMN IF NOT EXISTS staff_id INTEGER REFERENCES staff(id) ON DELETE SET NULL;
ALTER TABLE reservas ADD COLUMN IF NOT EXISTS cabina_id INTEGER REFERENCES cabinas(id) ON DELETE SET NULL;
ALTER TABLE reservas ADD COLUMN IF NOT EXISTS origen TEXT NOT NULL DEFAULT 'app';
ALTER TABLE reservas ADD COLUMN IF NOT EXISTS llegada_at TIMESTAMPTZ;
ALTER TABLE reservas ADD COLUMN IF NOT EXISTS inicio_at TIMESTAMPTZ;
ALTER TABLE reservas ADD COLUMN IF NOT EXISTS fin_at TIMESTAMPTZ;
ALTER TABLE reservas ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT now();

ALTER TABLE clientes ADD COLUMN IF NOT EXISTS telefono TEXT;
ALTER TABLE clientes ADD COLUMN IF NOT EXISTS fecha_nacimiento DATE;
ALTER TABLE clientes ADD COLUMN IF NOT EXISTS alergias TEXT;
ALTER TABLE clientes ADD COLUMN IF NOT EXISTS preferencias TEXT;
ALTER TABLE clientes ADD COLUMN IF NOT EXISTS notas_internas TEXT;
ALTER TABLE clientes ADD COLUMN IF NOT EXISTS estado TEXT NOT NULL DEFAULT 'activa';
ALTER TABLE clientes ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT now();

CREATE TABLE IF NOT EXISTS pagos (
  id SERIAL PRIMARY KEY,
  reserva_id INTEGER REFERENCES reservas(id) ON DELETE SET NULL,
  cliente_id INTEGER REFERENCES clientes(id) ON DELETE SET NULL,
  tipo TEXT NOT NULL DEFAULT 'ingreso' CHECK (tipo IN ('ingreso','egreso','reembolso')),
  concepto TEXT NOT NULL,
  monto NUMERIC(12,2) NOT NULL CHECK (monto >= 0),
  metodo TEXT NOT NULL DEFAULT 'efectivo',
  referencia TEXT,
  notas TEXT,
  pagado_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS inventario_productos (
  id SERIAL PRIMARY KEY,
  nombre TEXT NOT NULL,
  sku TEXT UNIQUE,
  categoria TEXT,
  unidad TEXT NOT NULL DEFAULT 'pieza',
  stock NUMERIC(12,2) NOT NULL DEFAULT 0,
  stock_minimo NUMERIC(12,2) NOT NULL DEFAULT 0,
  costo NUMERIC(12,2),
  precio NUMERIC(12,2),
  activo BOOLEAN NOT NULL DEFAULT TRUE,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS inventario_movimientos (
  id SERIAL PRIMARY KEY,
  producto_id INTEGER NOT NULL REFERENCES inventario_productos(id) ON DELETE CASCADE,
  cantidad NUMERIC(12,2) NOT NULL,
  motivo TEXT NOT NULL,
  referencia TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS membresia_planes (
  id SERIAL PRIMARY KEY,
  nombre TEXT NOT NULL UNIQUE,
  precio_mensual NUMERIC(12,2) NOT NULL DEFAULT 0,
  beneficios TEXT[] NOT NULL DEFAULT '{}',
  sesiones_mes INTEGER NOT NULL DEFAULT 0,
  activo BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS membresia_suscripciones (
  id SERIAL PRIMARY KEY,
  cliente_id INTEGER NOT NULL REFERENCES clientes(id) ON DELETE CASCADE,
  plan_id INTEGER NOT NULL REFERENCES membresia_planes(id),
  estado TEXT NOT NULL DEFAULT 'activa',
  inicio DATE NOT NULL DEFAULT CURRENT_DATE,
  renovacion DATE,
  sesiones_disponibles INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS spa_config (
  clave TEXT PRIMARY KEY,
  valor JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS admin_audit_log (
  id BIGSERIAL PRIMARY KEY,
  accion TEXT NOT NULL,
  entidad TEXT NOT NULL,
  entidad_id TEXT,
  detalle JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS reservas_fecha_hora_idx ON reservas(fecha, hora);
CREATE INDEX IF NOT EXISTS reservas_staff_fecha_idx ON reservas(staff_id, fecha) WHERE staff_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS reservas_cabina_fecha_idx ON reservas(cabina_id, fecha) WHERE cabina_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS pagos_pagado_at_idx ON pagos(pagado_at DESC);
CREATE INDEX IF NOT EXISTS inventario_movimientos_producto_idx ON inventario_movimientos(producto_id, created_at DESC);
CREATE INDEX IF NOT EXISTS membresia_suscripciones_cliente_idx ON membresia_suscripciones(cliente_id, estado);
