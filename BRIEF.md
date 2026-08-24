# BRIEF CRAFT — LUCIENNE BEAUTY SPA (rebuild total)
Eres un builder senior. Trabajas en ESTE directorio: ya es el repo turbillon50/lu-spa en la branch claude/craft-lucienne, ya linkeado al proyecto Vercel lu-spa (.vercel/project.json). Es un REBUILD completo del front con la nueva direccion del cliente. NO toques main. Stack: Next.js (respeta la config existente). Idioma de la UI: espanol de Mexico.

## QUE ES
PWA + sitio editorial de LUJO para Lucienne Beauty Spa, spa boutique en Paseos del Pedregal, CDMX. Demo craft NAVEGABLE de TODO el ecosistema con datos demo plausibles, SIN backend real (cero Neon/Clerk/Stripe): estado en memoria + localStorage. Tres modos: publico, cliente (Mi Lucienne) y administracion. Principio del cliente: "No vender tratamientos. Vender experiencias que contienen tratamientos." El resultado debe parecer plataforma de marca wellness de lujo internacional, jamas plantilla de spa.

## ORDEN OBLIGATORIO DE TRABAJO
1. PRIMERO IMAGENES: lee /home/vagent/hornada/skills/higgsfield-generate/SKILL.md y lanza EN PARALELO los 14 jobs de la seccion IMAGENES antes de escribir una sola linea de codigo. Mientras renderizan, construye. Cuando esten, descargalas a public/img/ y sirvelas optimizadas (webp si se puede, lazy loading, blur placeholder). Si un job falla reintenta 1 vez; ultimo recurso SOLO para esa pieza: fondo con tratamiento CSS calido, jamas gris ni gradiente frio.
2. Codigo.
3. Build verde. Node del sistema es v18.19 (compila Next). Si el build exigiera Node 20, instala uno local en ~/.local sin tocar el sistema.
4. Correr la app y verificar RUNTIME real (leccion: build verde con pantalla negra en runtime = fracaso). Probar rutas clave.
5. QA visual: capturas WebKit (no Chrome) a 390 y 1440 de: home, quiz descubrimiento, reservar (paso calendario), membresia, gift card (preview), Mi Lucienne, admin dashboard. MIRALAS y corrige lo que se vea mal.
6. Commits firmados como turbillon50 <turbillon50@gmail.com>, push de la branch claude/craft-lucienne.
7. Deploy PREVIEW con vercel CLI (token ya en env). JAMAS --prod. Verifica que la URL responda y sea publica.
8. Escribe URL.txt con la URL del preview y RESUMEN.md con que quedo y que falto.

## DIRECCION DE ARTE (manda el cliente)
- Paleta calida y neutra: marfil/ivory, blanco calido, beige, nude, arena, taupe, cafe espresso muy oscuro, negro suave para contraste. DORADO MUY SUTIL solo como acento fino (lineas 1px, filos, detalles). PROHIBIDO: colores saturados, neones, azules medicos, verdes hospital, estetica clinica, gradientes agresivos.
- Tipografia editorial: Cormorant Garamond para titulos (alto contraste, grande), Montserrat para texto, y una manuscrita elegante (Pinyon Script o similar de Google Fonts) SOLO en frases joya cortas: "The Lucienne Experience", "Tu momento.", "Regalate tiempo." Nunca cursiva en parrafos.
- Fotografia PROTAGONISTA: full-bleed, recortes editoriales, close-ups, espacio negativo. NO llenar secciones de tarjetitas en grid. Sensacion: hotel boutique + revista de belleza + spa privado + tecnologia premium.
- Capa CRAFT traducida a calido: luz como material (halos marfil suaves, no frios), glass calido (blanco translucido, backdrop blur 16px saturate 140%), canto especular 1px blanco arriba en superficies de cristal, sombras suavisimas, radios 18/12, motion spring cubic-bezier(.22,1,.36,1) sobrio + prefers-reduced-motion, TODA cifra (precios, KPIs) en tabular-nums, iconos SVG PROPIOS de linea fina 1.5px (CERO lucide, CERO emoji), estados por forma no por semaforo.
- Animaciones: fade, slow zoom Ken Burns sutil en heros, parallax leve, aparicion progresiva de textos, hover elegante. Revista de lujo interactiva. Nada exagerado.
- Logo oficial: reutiliza el monograma/identidad Lucienne que ya vive en el repo (icons en public/ y componentes existentes). NO lo redisenes.

## NAVEGACION
- Movil = se siente APP nativa. Splash: monograma sobre marfil con luz calida respirando ~1.2s, fade a home. Bottom tab bar GLASS fija, UNA sola, exactamente 1 activo: Inicio | Experiencias | RESERVAR (boton central elevado, protagonista visual) | Membresia | Mi Lucienne. CERO toggle flotante.
- Desktop: header editorial fino: logo + Inicio, Experiencias, Tratamientos, Aparatologia, Membresias, Gift Cards, Conocenos, Journal, Contacto + boton "Reserva tu espacio" siempre visible.
- Cambio de modo (demo): desde el avatar del header se abre selector de cuentas elegante (bottom sheet en movil): Invitada / Mariana Reyes — Cliente (palomita en la activa) / Administracion. Chip discreto de rol en header cuando aplique (CLIENTE / ADMINISTRACION). El sheet montado con portal al body (no dentro de headers con transform).
- Admin: sidebar colapsable en desktop, drawer en movil. KPIs sin cajas, cifras mono tabulares.

## PANTALLAS (todas navegables, contenido demo real y coherente, CERO lorem, CERO proximamente)
1. HOME: hero full-bleed con foto 1 + LUCIENNE BEAUTY SPA (Cormorant enorme) + script "The Lucienne Experience" + sub "Un espacio creado para desconectarte del exterior y reconectar contigo." CTAs "Reserva tu espacio" y "Descubre Lucienne". Despues: La experiencia Lucienne (texto breve emocional); 3 pilares con foto grande: RELAJATE / RENUEVA / TRANSFORMA con "Descubrir tratamientos"; caminos de entrada: Quiero relajarme / Quiero cuidar mi piel / Quiero trabajar una zona / Quiero regalar una experiencia / Quiero vivir algo especial / No se que necesito; experiencias destacadas; teaser membresia; testimonios; teaser journal; mosaico Instagram + "Siguenos en Instagram"; footer elegante.
2. QUIZ "No se que necesito" (MOMENTO WOW): 4-5 preguntas suaves de una en una con transiciones -> "Tenemos una experiencia para ti." con 2-3 recomendaciones y CTA Reservar.
3. RELAJATE: 5-6 masajes (relajante, descontracturante, piedras calientes, aromaterapia, drenaje linfatico, para dos) con foto, sensacion, descripcion, duracion, beneficios, para quien, precio discreto tabular, CTA Reservar.
4. RENUEVA: faciales (limpieza profunda, hidratante, antiedad, mascarillas, rejuvenecimiento) + diagnostico Facial Scanner IA: "Primero entendemos tu piel. Despues disenamos tu experiencia." CTA "Descubre que necesita tu piel".
5. TRANSFORMA (Tecnologia estetica): HIFU 360, Criolipolisis, Depilacion laser tridiodo, Body Up, Cavitacion, Facial Scanner con IA, Maquina facial multifuncion. Cada una: foto, que es en lenguaje elegante no clinico, objetivo, zonas, beneficios, mini FAQ, CTAs "Consultar tratamiento" y "Reservar". PROHIBIDO prometer resultados medicos.
6. EXPERIENCIAS & PAQUETES: Ritual de relajacion, Ritual facial, Body Experience, Experiencia Lucienne completa. Editorial: nombre, foto, duracion, incluye, personas, CTA "Reservar experiencia" y "Comprar como regalo".
7. PARA DOS (pagina propia, romantica): masaje + facial + champagne + tabla de quesos + ambientacion. Se vende como recuerdo. CTA "Crear una experiencia para dos".
8. GIFT CARDS "Regala The Lucienne Experience" (MOMENTO WOW 2): elegir experiencia o monto, destinataria, remitente, mensaje, fecha; PREVIEW EN VIVO de la tarjeta digital mientras se escribe; al confirmar genera codigo unico demo y tarjeta final compartible.
9. MEMBRESIA "Lucienne Membership": club privado, 3 niveles con nombres elegantes (Essentielle / Signature / Prive), beneficios, prioridad de reserva, promos privadas, vigencia. Tarjeta de membresia con canto especular en espresso/marfil/oro sutil.
10. RESERVAR (MOMENTO WOW 3): flujo max 5 pasos: tratamiento -> fecha (calendario visual del mes) -> hora (slots) -> datos -> "Tu experiencia Lucienne esta confirmada." con destello dorado sutil y resumen. Accesible desde TODO tratamiento. Reprogramar/cancelar desde Mi Lucienne.
11. MI LUCIENNE (Mariana Reyes logueada): proxima experiencia, mis reservas (proximas + historial), mi membresia (nivel, vigencia, beneficios usados/restantes), mis experiencias, mis gift cards (1 vigente 1 usada), favoritos, mi informacion, notificaciones.
12. CONOCENOS (historia/filosofia emocional editorial) · GALERIA (espacios/cabinas/aparatologia/parejas, fotos grandes) · TESTIMONIOS "Experiencias que hablan por si mismas" (5-6 crebles) · JOURNAL (4-6 articulos editoriales con portada que abren completos) · FAQ (acordeon por temas) · CONTACTO "Encuentranos": Paseos del Pedregal CDMX, mapa embebido, horarios/telefono/email mostrados como configurables por administracion (NO inventes contacto real). WhatsApp "Hablar con Lucienne" discreto solo en reservas, tratamientos, membresias, paquetes y FAQ (wa.me placeholder demo).
13. BUSCADOR (nombre, categoria, beneficio, zona) + FILTROS: Facial / Corporal / Relajacion / Parejas / Tecnologia / Experiencias.
14. CHECKOUT premium demo (tratamiento, paquete, membresia, gift) con pago simulado claramente demo.
15. ADMIN: dashboard (reservas de hoy, proximas, ingresos del mes, clientas, membresias activas, top tratamientos — KPIs sin cajas, cifras tabulares) + gestion de: servicios, categorias, paquetes/experiencias, membresias, reservas (ver/editar/cancelar/reprogramar), clientas con perfil e historial (CRM), gift cards (crear/consultar/canjear), promociones, contenido (banners/FAQs/journal), horarios y disponibilidad, notificaciones. Todo navegable con datos demo coherentes.

## PWA DE VERDAD
manifest completo (iconos existentes, theme marfil, standalone), service worker registrado con cache basico, splash, instalable iPhone/Android, offline basico, responsive impecable 360-1920.

## MICROCOPY
Elegante, calida, aspiracional, femenina sin infantil. Verbos: Descubre, Regalate, Vive, Reserva, Conoce, Tu momento. PROHIBIDO: OFERTA, BARATO, APROVECHA YA, ULTIMA OPORTUNIDAD, Click aqui.

## DATOS DEMO
Coherentes con agosto 2026: Mariana Reyes con membresia Signature activa, 2 reservas proximas y 4 pasadas, 1 gift card vigente y 1 usada. Admin: ~70 clientas, ingresos del mes crebles, ocupacion por dia, top 5 tratamientos. Precios demo razonables MXN. Nada de lorem.

## IMAGENES — 14 jobs Higgsfield EN PARALELO ANTES DE CODIFICAR
Direccion global (agregala a cada prompt): luxury boutique spa editorial photography, warm ivory and beige palette, soft warm window light, shallow depth of field, natural textures (linen, stone, orchids, water), no recognizable faces (hands, silhouettes, back of head only), refined, calm, expensive feel, magazine quality.
1 hero-home: serene luxury spa lounge interior, cream linen daybed, warm golden hour window light, orchid detail
2 relajate-1: hot stone massage close-up, hands placing warm stones on back, candlelight
3 relajate-2: massage cabin with white linen bed, folded towels, soft morning light
4 renueva-1: elegant facial treatment close-up, gloved hands applying serum, glowing skin, ivory towels
5 renueva-scanner: futuristic yet warm facial analysis device in elegant spa cabin, soft screen glow, beige interior
6 transforma-1: premium aesthetic technology cabin, sleek white body-contouring machine, warm accent lighting
7 transforma-2: elegant detail shot of modern aesthetic device arm and applicator, marble surface
8 parados: couples spa suite, two massage beds, champagne glasses and rose petals, candles, intimate warm light
9 gift: elegant gift card on linen fabric with white orchid and gold ribbon detail, top view
10 membresia: dark espresso background with subtle gold foil texture detail, luxury card mockup feel
11 galeria-1: boutique spa reception, warm wood and stone, soft pendant lighting
12 galeria-2: spa corridor with arch, ivory walls, dried pampas and ceramic decor
13 conocenos: woman in white spa robe from behind looking at garden window, warm light, serene
14 journal-1: flat lay skincare ritual, cream textures, gua sha stone, towel, warm light

## REGLAS DURAS
- Nada roto: cada boton lleva a algo. Nada de librerias de iconos; SVG propios inline. Sheets/modales con portal al body.
- Commits chicos y claros; push SOLO a claude/craft-lucienne.
- Al final: URL.txt (solo la URL del preview) + RESUMEN.md + capturas en carpeta qa/.
