# RESUMEN RONDA 4 — Lucienne Beauty Spa

**Fecha:** 2026-08-24
**Branch:** claude/craft-lucienne
**Preview:** https://lu-65trjkjnw-luis-projects-48b011f9.vercel.app
**Build:** 52 páginas — verde ✓
**tsc --noEmit:** sin errores ✓

---

## 0. ESTABILIDAD DE BUILD

- `NODE_OPTIONS=--max-old-space-size=3072` aplicado en todos los builds
- Servidor anterior killed con `fuser -k 3000/tcp` antes de cada restart
- Nunca se corrió `next dev` paralelo a `next start`
- Admin hydration guard commiteado al inicio de la ronda (e9e02b1)
- `.npmrc` con `legacy-peer-deps=true` para resolver conflicto `@clerk/nextjs@7` + `next@14`

---

## 1. CAMBIO TOTAL DE LOOK

### Logo oficial
- Fuente única: `/public/img/brand/logo-oficial.jpg` (JPG original WhatsApp, fondo negro, monograma "Lc", doble anillo rose-gold)
- `app/components/Logo.tsx` reescrito — `<img>` con `borderRadius: '50%'`, `objectFit: 'cover'`
- Logo eliminado como SVG generado; todos los componentes usan la imagen real

### Paleta crema/blush (pantallas principales)
```
--ivory: #FAF5F0        (fondo principal — era #FEFCF8)
--ivory-warm: #F6EBE4
--cream: #EFE1D9
--beige: #E8D5CB
--gold: #C9A08C         (acento rose-gold — era #C9A96B amarillo-dorado)
--gold-hair: #EEDDD5
--gold-deep: #9A6452
--coral: #E07560        (NUEVO — botones CTA)
--coral-deep: #C85A42   (NUEVO)
```

### Splash oscuro dramático
- Fondo: `#0A0603` (negro cálido)
- Glow ámbar: `radial-gradient` rosa-coral-ámbar centrado en logo
- Logo: 168px circular, `box-shadow` rose-gold
- Script: "The Lucienne Experience" en `rgba(238,221,213,0.88)`
- Subtítulo: "PASEOS DEL PEDREGAL · CDMX" en `rgba(201,160,140,0.60)`
- Animaciones: `logoIn` (scale 0.88→1), `fadeIn`, `glowPulse`, `dotPulse`

### CTAs coral aplicados en
- `TopBar.tsx`: fullscreen menu (línea 169) + desktop header (línea 447)
- `BottomNav.tsx`: FAB central Reservar (línea 120)
- `home/page.tsx`: hero CTA + membership teaser CTA

---

## 2. ESTABILIDAD PWA

### Manifest
- `background_color`: `#FAF5F0`
- `theme_color`: `#C9A08C`
- Íconos: PNG generados desde logo real (PIL con `LOAD_TRUNCATED_IMAGES=True`)
  - `icon-192.png` (192×192)
  - `icon-512.png` (512×512)
  - `icon-maskable.png` (512×512, padding 51px fondo `#0A0603`)
  - `apple-icon.png` (180×180)

### Service Worker
- Cache bumpeado `lucienne-v1` → `lucienne-v4`
- Referencias de íconos actualizadas a PNG

### Fix bottom nav en desktop
- Problema: elementos con `style={{ display: 'flex' }}` inline sobreescribían `lg:hidden` de Tailwind
- Fix en `globals.css`:
  ```css
  @media (min-width: 1024px) {
    .lg\:hidden { display: none !important; }
  }
  ```
- Bottom nav ahora correctamente oculto en ≥1024px

### Verificado (capturas en qa/ronda4/)
- `/` no tiene `__next_error__`
- `/home` responde 200 en servidor real
- Admin desktop: sidebar visible, no bottom nav

---

## 3. CLERK INTEGRATION (preparado, sin keys)

### Instalado
```bash
npm install @clerk/nextjs   # → v7.8.0
```

### middleware.ts
Ubicación: `/middleware.ts` (raíz del proyecto)

Actualmente: **passthrough puro** — app funciona sin keys Clerk.

Para activar protección cuando lleguen las keys:
```ts
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
const isProtectedRoute = createRouteMatcher(['/mi-lucienne(.*)', '/admin(.*)'])
export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) await auth.protect()
})
export const config = { matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'] }
```

### ClerkProvider condicional
`app/layout.tsx` monta `<ClerkProvider>` SOLO si `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` está presente.
Sin la variable, la app corre en modo demo sin crashes.

### Login (app/(auth)/login/page.tsx)
- Con keys Clerk: form real con `useSignIn()` (Clerk v7 API)
  - `signIn.create({ identifier, password })`
  - `signIn.finalize()` (reemplaza `setActive()` de v5/v6)
- Sin keys Clerk: botones demo (Mariana Reyes / Administración)

### Register (app/(auth)/register/page.tsx)
- Con keys Clerk: registro en 2 pasos
  1. `signUp.create({ emailAddress, password, firstName, lastName })`
  2. `signUp.verifications.sendEmailCode()`
  3. Pantalla de código de 6 dígitos
  4. `signUp.verifications.verifyEmailCode({ code })`
  5. `signUp.finalize()` → redirect `/home`
- Sin keys Clerk: botón "Explorar en modo demo"

---

## ENV VARS PENDIENTES DE CLERK

Para activar autenticación real, agregar en Vercel y `.env.local`:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...
```

Obtener desde: https://dashboard.clerk.com → tu aplicación → API Keys

Después de agregar las keys:
1. Reemplazar `middleware.ts` con la versión Clerk (está comentada en el archivo)
2. Redeploy — la app activará autenticación real automáticamente

---

## CAPTURAS QA (qa/ronda4/)

20 capturas: 390px móvil + 1440px desktop para:
splash, home, login, register, relajate, membresia, gift-cards, reservar, mi-lucienne, admin

Todas confirmadas visualmente correctas.

---

## COMMITS RONDA 4

```
c4e0d38  Fix Vercel npm install — legacy-peer-deps for @clerk/nextjs v7 + Next 14
ff5f238  Ronda 4 — nuevo look, estabilidad PWA, Clerk prep
e9e02b1  Add hydration guard to admin layout — prevents flash/redirect before mount
```
