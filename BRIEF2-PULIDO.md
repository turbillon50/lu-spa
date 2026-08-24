# RONDA 2 — PULIDO NIVEL TOP · LUCIENNE
Ya existe la app completa en este repo (branch claude/craft-lucienne). Tu unica mision: subir la EJECUCION VISUAL a nivel marca de lujo internacional. No agregues features. Corrige, refina, unifica. Se extraordinario.

## TIPOGRAFIA (donde se nota el lujo)
- Display Cormorant grande de verdad: 64-96px desktop / 40-52px movil en heros, tracking levemente negativo (-0.01em), line-height 1.05.
- Eyebrows/labels en MAYUSCULAS Montserrat 11-12px con letter-spacing amplio (0.18-0.25em) y color taupe.
- Manuscrita SOLO como joya (1 frase por pantalla max), tamano generoso, nunca como boton ni parrafo.
- Jerarquia impecable: en cada pantalla debe haber UN protagonista tipografico claro.

## RITMO Y AIRE
- Secciones con aire de revista: 120-160px de separacion desktop, 72-96 movil. Si algo se siente apretado, dale aire.
- Separadores hairline dorados 1px cortos (60-80px) centrados o alineados a titulo, no lineas de borde a borde.
- Contenedor de lectura max 68-72ch. Nada de parrafos anchos.

## FOTOGRAFIA (protagonista, tratamiento UNIFORME)
- Mismo grade calido en todas: leve calidez, contraste suave, negros hacia espresso (no negro puro). Si alguna foto desentona en tono, corrigela con filtro CSS consistente.
- Heros full-bleed con overlay degradado espresso->transparente sutil solo donde hay texto, para legibilidad AAA.
- Ken Burns lentisimo (20-30s) solo en heros; blur-up placeholder en todas; object-position cuidada (que el sujeto no se corte feo en movil).
- Esquinas coherentes: full-bleed sin radio; fotos en tarjeta radio 18.

## MICRODETALLE (lo que separa top de bonito)
- Botones pill: primario espresso con texto marfil que al hover "enciende" (glow marfil suave + lift 2px); secundario contorno hairline que se rellena al hover. Transicion 250-300ms spring.
- Inputs de etiqueta flotante finos, focus ring elegante (halo marfil 2px, nunca azul de sistema), selection color arena.
- Bottom bar glass: canto especular 1px arriba, item activo con punto/pastilla sutil, boton RESERVAR central elevado con sombra suavisima y micro-pulso de luz en idle (respetando reduced-motion).
- Transicion de pagina: fade + lift 8px, 300ms. Aparicion escalonada de textos en heros (stagger 60-90ms).
- Confirmacion de reserva: destello dorado como TRAZO fino que recorre el sello/checkmark, jamas confetti.
- Scrollbar discreto tono arena; tap highlight transparente; safe-areas iOS respetadas (env(safe-area-inset-bottom) en la tab bar).

## CONSISTENCIA TOTAL
- Mi Lucienne y el ADMIN deben sentirse de la MISMA casa: misma paleta calida, mismos radios, mismas sombras, mismas tipografias (admin puede ser mas denso, nunca mas feo). KPIs sin cajas, cifras tabulares grandes con eyebrow arriba.
- Estados vacios DISENADOS (icono fino + frase calida + CTA), nunca un hueco.
- Revisar que TODAS las fotos carguen (cero 404, cero alt roto), cero emoji, cero icono de libreria, cero texto placeholder.
- Contraste AA minimo en todo texto sobre foto u oscuro.

## CIERRE OBLIGATORIO
1. Recorre pantalla por pantalla (home, quiz, relajate, renueva, transforma, experiencias, para dos, gift, membresia, reservar completo, Mi Lucienne, conocenos, galeria, journal, faq, contacto, admin dashboard y 3 subpaginas admin) y aplica esta lista.
2. Build verde + runtime verificado.
3. Capturas WebKit 390 y 1440 de las 10 pantallas clave en qa/ronda2/ — MIRALAS y corrige lo que no se vea de lujo.
4. Commit firmado turbillon50 <turbillon50@gmail.com>, push a claude/craft-lucienne, deploy PREVIEW vercel (jamas --prod), actualiza URL.txt.

## HAMBURGUESA + NAVEGACION COMPLETA (obligatorio)
- Movil: ADEMAS de la tab bar, icono hamburguesa fino en el header -> menu FULL-SCREEN elegante (fondo marfil o espresso a eleccion, transicion suave, items en Cormorant grande con stagger 60ms): Conocenos, Galeria, Journal, Testimonios, FAQ, Encuentranos, Gift Cards, Para Dos, Buscar, y acceso a cuenta. Cierre con X fina arriba a la derecha. Debe sentirse un momento de marca, no un drawer generico.
- Desktop: si el header se satura, lo secundario vive en un menu "Mas" o hamburguesa igual de elegante; el header JAMAS amontonado.
- TAB BAR DE PRIMER NIVEL: glass real con canto especular, safe-area iOS (env(safe-area-inset-bottom)), labels 10-11px Montserrat, RESERVAR central elevado protagonista, estado activo con transicion suave y exactamente 1 activo, micro-scale al tap, y NUNCA encimada al contenido (padding-bottom del main correcto en TODAS las vistas). Persiste en toda la experiencia app.

## PWA DE PRIMER NIVEL (checklist duro)
- Manifest completo: name/short_name Lucienne, theme_color y background marfil, display standalone, iconos 192/512 + maskable, orientation portrait.
- Service worker: precache del shell + imagenes clave; offline basico con pagina offline ELEGANTE de marca (no error del navegador).
- Meta iOS: apple-mobile-web-app-capable, status bar translucent, apple-touch-icon.
- Banner de instalacion PROPIO discreto y de marca (aparece una vez, se puede cerrar), no el prompt feo por defecto.
- Debe pasar como instalable (manifest + SW verdes).

## USUARIO PRIMERO
- Reservar en 1 tap desde CUALQUIER tratamiento/experiencia; CTA permanente visible.
- Mi Lucienne como hogar del cliente: proxima cita arriba con cuenta regresiva suave y accesos rapidos (reservar de nuevo, beneficios, gift, favoritos).
- Carga con skeletons calidos de marca, jamas spinner generico.
- Todo lo importante a maximo 2 taps desde home. Nada roto, nada a medio camino.
