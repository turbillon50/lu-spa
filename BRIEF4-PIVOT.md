# RONDA 4 — CAMBIO TOTAL DE LOOK, ESTABILIDAD PWA, CLERK
Repo ya existe (branch claude/craft-lucienne). El ultimo commit (e3244fd) trae desktop/admin/microinteracciones de la ronda 3 y SI se guardo bien. Hay un cambio pendiente sin commitear en app/admin/layout.tsx (guard de hidratacion antes del mount) — es correcto, commitealo tal cual al inicio, no lo deshagas.

## 0. ESTABILIDAD DE BUILD (obligatorio, causa raiz de la caida anterior)
El servidor es compartido y se quedo sin RAM a media QA (proceso next-server matado por OOM). Para evitar que se repita:
- Para cualquier build usa: NODE_OPTIONS=--max-old-space-size=3072
- Para QA de capturas usa `next build` seguido de `next start` en UNA sola instancia; NUNCA dejes `next dev` corriendo en paralelo con otro proceso de build/start tuyo.
- Al terminar cada fase de capturas, mata tu propio proceso next antes de arrancar el siguiente (no acumules servidores vivos).
- Si detectas mas de un `next start`/`next dev` tuyo corriendo a la vez, mata los sobrantes antes de continuar.

## 1. CAMBIO TOTAL DE LOOK AND FEEL (supera la paleta marfil/espresso de rondas previas)
Luis mando la referencia oficial: mockup completo de 26 pantallas (splash, onboarding, home, menu, login, registro, quiz, listados, detalle, renueva, transforma, experiencias, para-dos, gift cards, membresias, mi membresia, reservar x3, confirmacion, mis reservas, journal, contacto) mas el LOGO OFICIAL final. Ya esta commiteado en public/img/brand/logo-oficial.jpg (circulo doble aro rose-gold/cobre metalico sobre negro puro, monograma script "Lc" entrelazado en el mismo rose-gold con una ramita/hoja pequena a la derecha de la c, "LUCIENNE" debajo en versalitas rose-gold, "BEAUTY SPA" mas chico y tracking amplio debajo de eso).

USA SOLO ESE LOGO. Bórralo/reemplázalo de: app/components/Logo.tsx (o donde viva el mark actual), public/apple-icon.svg, public/icon-192.svg, public/icon-512.svg, public/icon-maskable.svg — genera esos tamanos/formatos de icono PWA a partir de public/img/brand/logo-oficial.jpg (crop cuadrado centrado en el circulo, fondo negro solido, exporta a PNG en los tamanos que pide manifest.json). No inventes ni redibujes un logo alterno.

Paleta NUEVA (reemplaza la anterior por completo):
- Splash y Onboarding (3 pantallas): fondo casi negro/espresso muy oscuro (#0A0603 o similar) con GLOW calido ambar/durazno detras del logo, texto en blanco calido y rose-gold para acentos. Dramatico, cinematografico.
- Resto de la app (home, listados, membresias, gift cards, reservar, journal, contacto, etc.): fondo CREMA/BLUSH claro y calido (tono piel/rosa muy palido, no blanco puro), tarjetas en blush mas claro o blanco calido con borde sutil, textos en espresso oscuro.
- Acento primario: rose-gold metalico (el tono exacto del logo, aprox #C9A08C a #B87D63) para iconos, bordes, dividers, precios destacados.
- CTA / botones primarios: pill en tono coral-salmon calido (aprox #E8927C a #E0765C) con texto blanco — NO el negro/espresso de antes.
- Tipografia: conserva Cormorant Garamond (titulos) + Montserrat (texto) + Pinyon Script (frases joya) — eso ya esta bien, no lo cambies.
- Tarjetas de tratamiento: imagen arriba con radio suave, nombre y duracion abajo, category label chico en mayusculas rose-gold.

Aplica esta paleta a TODAS las pantallas ya construidas (no reconstruyas la arquitectura de informacion, que ya es correcta y calca casi 1:1 el mockup de Luis — solo cambia colores, fondos, botones y el logo).

## 2. ESTABILIDAD PWA — checklist duro, verifica cada punto con evidencia real
- manifest.json: name, short_name, colores actualizados a la nueva paleta (background crema, theme rose-gold), iconos regenerados del logo oficial en 192/512 + maskable, display standalone.
- Service worker (sw.js): precache del shell, estrategia de cache correcta, pagina /offline con la nueva identidad visual (no error generico del navegador).
- Verifica instalabilidad real: abre el sitio, confirma que Chrome/Safari detectan manifest + SW validos (sin errores en consola).
- CONFIRMA que la ruta raiz "/" ya no muestra el artefacto id="__next_error__" (bug de ronda 3) — si sigue paso, arreglalo: probablemente el redirect() en app/page.tsx necesita ejecutarse limpio; valida con curl -I que responda bien.
- CONFIRMA que la tab bar de movil sigue oculta en >=1024px (fix de ronda 3, no lo rompas con los cambios de paleta).
- Cero errores de hidratacion en consola (React) en ninguna pantalla.

## 3. CLERK — registro e inicio de sesion reales (scaffolding listo, activable con llaves)
Instala @clerk/nextjs. Estructura EXACTA (no inventes otra):
- middleware.ts en la raiz con clerkMiddleware() y createRouteMatcher protegiendo /mi-lucienne(.*) y /admin(.*) — ver ejemplo:
```
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
const isProtectedRoute = createRouteMatcher(['/mi-lucienne(.*)', '/admin(.*)'])
export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) await auth.protect()
})
export const config = { matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'] }
```
- Envuelve app/layout.tsx con <ClerkProvider> de @clerk/nextjs.
- NO uses los componentes prefabricados <SignIn>/<SignUp> de Clerk (rompen la direccion de arte). En su lugar, conecta los flujos CUSTOM a las pantallas de login/registro YA DISENADAS (app/(auth)/login y app/(auth)/register) usando los hooks useSignIn y useSignUp de @clerk/nextjs:
```
import { useSignIn } from '@clerk/nextjs'
// en el submit del form de login:
const { signIn, setActive } = useSignIn()
const result = await signIn.create({ identifier: email, password })
if (result.status === 'complete') await setActive({ session: result.createdSessionId })
```
```
import { useSignUp } from '@clerk/nextjs'
// registro:
const { signUp, setActive } = useSignUp()
await signUp.create({ emailAddress: email, password, firstName, lastName })
await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
// pantalla de codigo -> signUp.attemptEmailAddressVerification({ code }) -> setActive
```
- Agrega una pantalla corta de verificacion por codigo despues de registro (mismo sistema visual, campo de 6 digitos).
- IMPORTANTE — llaves ausentes por ahora: envuelve el arranque de Clerk en una verificacion de env var. Si NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY no esta seteada, la app debe seguir funcionando en modo demo actual (selector de cuentas con Mariana Reyes / Administracion, como ya existe) SIN CRASHEAR — es decir: si no hay llave, no montes <ClerkProvider> real, usa el mode context actual como fallback. Cuando lleguen las llaves reales, ClerkProvider toma el control y las pantallas de login/registro ya construidas quedan conectadas de una vez.
- Deja documentado en RESUMEN4.md exactamente que 2 variables de entorno faltan (NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY y CLERK_SECRET_KEY) para que Clerk quede 100% vivo.

## CIERRE OBLIGATORIO
1. git add -A del cambio pendiente en admin/layout.tsx + todo lo nuevo de esta ronda. Commit firmado turbillon50 <turbillon50@gmail.com>, push a claude/craft-lucienne.
2. Build con NODE_OPTIONS=--max-old-space-size=3072, verifica verde.
3. Corre la app real (next start), confirma runtime sin errores de consola en las 10 pantallas clave.
4. Capturas WebKit 390 y 1440 de: splash, onboarding, home, login, registro, relajate, membresia, gift-cards, reservar, mi-lucienne, admin dashboard — en qa/ronda4/. MIRALAS: confirma que la paleta nueva (crema/blush + rose-gold + coral) reemplazo la vieja (marfil/espresso) en TODAS, y que el logo oficial se ve nitido donde aparece.
5. Deploy PREVIEW vercel (jamas --prod). Actualiza URL.txt.
6. RESUMEN4.md: que se hizo de cada punto (0-3), evidencia, y las 2 env vars pendientes de Clerk explicitas.
