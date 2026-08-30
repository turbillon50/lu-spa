-- CMS y comunicación de la PWA Lucienne.
-- Migración no destructiva; se prueba en una rama Neon antes de producción.

ALTER TABLE tratamientos ADD COLUMN IF NOT EXISTS descripcion TEXT;
ALTER TABLE tratamientos ADD COLUMN IF NOT EXISTS resumen TEXT;
ALTER TABLE tratamientos ADD COLUMN IF NOT EXISTS imagen TEXT;
ALTER TABLE tratamientos ADD COLUMN IF NOT EXISTS incluye TEXT[] NOT NULL DEFAULT '{}';
ALTER TABLE tratamientos ADD COLUMN IF NOT EXISTS beneficios TEXT[] NOT NULL DEFAULT '{}';
ALTER TABLE tratamientos ADD COLUMN IF NOT EXISTS destacado BOOLEAN NOT NULL DEFAULT FALSE;
ALTER TABLE tratamientos ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT now();

CREATE TABLE IF NOT EXISTS cms_pages (
  id SERIAL PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE CHECK (slug ~ '^[a-z0-9-]+$'),
  titulo TEXT NOT NULL,
  estado TEXT NOT NULL DEFAULT 'borrador' CHECK (estado IN ('borrador','publicada','archivada')),
  seo JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS cms_blocks (
  id SERIAL PRIMARY KEY,
  page_id INTEGER NOT NULL REFERENCES cms_pages(id) ON DELETE CASCADE,
  block_key TEXT NOT NULL,
  tipo TEXT NOT NULL DEFAULT 'contenido',
  contenido JSONB NOT NULL DEFAULT '{}',
  orden INTEGER NOT NULL DEFAULT 0,
  visible BOOLEAN NOT NULL DEFAULT TRUE,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (page_id, block_key)
);

CREATE TABLE IF NOT EXISTS pwa_notificaciones (
  id BIGSERIAL PRIMARY KEY,
  titulo TEXT NOT NULL,
  cuerpo TEXT NOT NULL,
  tipo TEXT NOT NULL DEFAULT 'news' CHECK (tipo IN ('reminder','promo','news','birthday')),
  audiencia TEXT NOT NULL DEFAULT 'all' CHECK (audiencia IN ('all','members','client')),
  cliente_id INTEGER REFERENCES clientes(id) ON DELETE CASCADE,
  action_url TEXT,
  estado TEXT NOT NULL DEFAULT 'borrador' CHECK (estado IN ('borrador','programada','publicada','archivada')),
  publicar_at TIMESTAMPTZ,
  expira_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS cms_blocks_page_order_idx ON cms_blocks(page_id, orden);
CREATE INDEX IF NOT EXISTS pwa_notificaciones_publicacion_idx ON pwa_notificaciones(estado, publicar_at DESC);

INSERT INTO cms_pages (slug, titulo, estado, seo) VALUES
  ('home', 'Inicio', 'publicada', '{"title":"Lucienne Beauty Spa","description":"Bienestar, belleza y tecnología en un mismo lugar."}'),
  ('relajate', 'Relájate', 'publicada', '{"title":"Relájate | Lucienne"}'),
  ('renueva', 'Renueva', 'publicada', '{"title":"Renueva | Lucienne"}'),
  ('membresia', 'Membresía', 'publicada', '{"title":"Membresías | Lucienne"}')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO cms_blocks (page_id, block_key, tipo, contenido, orden)
SELECT id, 'hero', 'hero',
  CASE slug
    WHEN 'home' THEN '{"eyebrow":"Bienvenida a Lucienne","title":"Tu belleza. Tu tiempo. Tu lugar.","body":"Experiencias diseñadas para hacer una pausa, reconectar y sentirte extraordinaria.","ctaLabel":"Reservar experiencia","ctaHref":"/reservar","image":"/img/hero-home.jpg"}'::jsonb
    WHEN 'relajate' THEN '{"eyebrow":"Terapia manual","title":"Relájate","body":"Masajes y rituales para soltar tensión, recuperar ligereza y volver a ti.","image":"/img/relajate-1.jpg"}'::jsonb
    WHEN 'renueva' THEN '{"eyebrow":"Cuidado experto","title":"Renueva","body":"Faciales, corporales y tecnología estética elegidos para resultados visibles.","image":"/img/renueva-1.jpg"}'::jsonb
    ELSE '{"eyebrow":"The Lucienne Circle","title":"Tu bienestar, cada mes","body":"Una membresía pensada para convertir el autocuidado en una práctica constante.","image":"/img/membresia.jpg"}'::jsonb
  END,
  0
FROM cms_pages WHERE slug IN ('home','relajate','renueva','membresia')
ON CONFLICT (page_id, block_key) DO NOTHING;
