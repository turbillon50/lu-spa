import type { Treatment } from '../lib/types'

export const treatments: Treatment[] = [
  {
    id: 'hydrafacial',
    name: 'Hydrafacial Lumière',
    category: 'faciales',
    duration: 60,
    price: 2300,
    short: 'Limpieza profunda e hidratación.',
    description:
      'Tecnología patentada que limpia, extrae y rejuvenece la piel en una sola sesión. Glow inmediato y sin tiempo de recuperación.',
    includes: ['Limpieza profunda', 'Extracción de impurezas', 'Hidratación intensiva', 'Antioxidantes'],
    benefits: ['Glow inmediato', 'Reduce poros visibles', 'Hidratación 7 días', 'Sin descanso post-tratamiento'],
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=85',
    featured: true
  },
  {
    id: 'ritual-facial-lumiere',
    name: 'Ritual Facial Lumière',
    category: 'faciales',
    duration: 75,
    price: 2400,
    short: 'Limpieza, glow y masaje lifting.',
    description:
      'Ritual completo de bienvenida con limpieza profunda, mascarilla iluminadora y masaje lifting modelador. Piel luminosa al instante.',
    includes: ['Doble limpieza', 'Exfoliación enzimática', 'Mascarilla iluminadora', 'Masaje lifting'],
    benefits: ['Tono uniforme', 'Lifting natural', 'Iluminación duradera'],
    image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'oxigeno-anti-edad',
    name: 'Oxígeno Anti-Edad',
    category: 'faciales',
    duration: 60,
    price: 2100,
    short: 'Oxigenación y firmeza.',
    description:
      'Infusión de oxígeno hiperbárico con cocktail de péptidos para restaurar firmeza y luminosidad en pieles maduras.',
    includes: ['Limpieza enzimática', 'Oxigenoterapia', 'Cocktail de péptidos', 'Mascarilla reafirmante'],
    benefits: ['Firmeza visible', 'Reduce líneas finas', 'Piel descansada'],
    image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'peeling-medico',
    name: 'Peeling Médico',
    category: 'faciales',
    duration: 45,
    price: 1900,
    short: 'Renovación celular profunda.',
    description:
      'Peeling químico personalizado para renovar la piel, atenuar manchas y mejorar la textura.',
    includes: ['Diagnóstico', 'Peeling personalizado', 'Mascarilla post-peel', 'Protocolo en casa'],
    benefits: ['Reduce manchas', 'Textura uniforme', 'Renovación celular'],
    image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'masaje-relajante',
    name: 'Masaje Relajante',
    category: 'masajes',
    duration: 60,
    price: 1500,
    short: 'Reduce estrés y tensión.',
    description:
      'Masaje sueco con aromaterapia personalizada para liberar tensión muscular y restaurar el sistema nervioso.',
    includes: ['Aromaterapia', 'Maniobras suecas', 'Estiramientos asistidos'],
    benefits: ['Relajación profunda', 'Mejora calidad del sueño', 'Reduce ansiedad'],
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=85',
    featured: true
  },
  {
    id: 'masaje-sensorial-signature',
    name: 'Masaje Sensorial Signature',
    category: 'masajes',
    duration: 90,
    price: 2900,
    short: 'Aromaterapia y descanso profundo.',
    description:
      'Experiencia signature con piedras tibias, aromaterapia personalizada y presión a medida. El descanso más profundo.',
    includes: ['Piedras tibias', 'Aromaterapia premium', 'Masaje craneal', 'Pediluvio ritual'],
    benefits: ['Descanso profundo', 'Liberación emocional', 'Sistema nervioso en calma'],
    image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1200&q=85',
    featured: true
  },
  {
    id: 'masaje-deep-tissue',
    name: 'Deep Tissue',
    category: 'masajes',
    duration: 75,
    price: 2100,
    short: 'Liberación muscular profunda.',
    description:
      'Masaje terapéutico de presión profunda enfocado en zonas de tensión crónica y postura.',
    includes: ['Diagnóstico postural', 'Presión profunda', 'Estiramientos PNF'],
    benefits: ['Libera nudos musculares', 'Mejora postura', 'Recuperación deportiva'],
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'masaje-craneo-facial',
    name: 'Cráneo-facial',
    category: 'masajes',
    duration: 45,
    price: 1300,
    short: 'Drenaje y descanso mental.',
    description:
      'Masaje sutil en cuello, cráneo y rostro para liberar tensión, mejorar circulación y promover claridad mental.',
    includes: ['Drenaje craneal', 'Acupresión facial', 'Aromaterapia ligera'],
    benefits: ['Reduce migrañas', 'Claridad mental', 'Descanso facial'],
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'body-sculpt',
    name: 'Body Sculpt Ritual',
    category: 'corporales',
    duration: 80,
    price: 3200,
    short: 'Drenaje y tonificación.',
    description:
      'Ritual corporal premium que combina drenaje linfático manual, exfoliación y mascarilla termoactiva tonificante.',
    includes: ['Exfoliación corporal', 'Drenaje linfático', 'Mascarilla termoactiva', 'Hidratación final'],
    benefits: ['Reduce retención', 'Tonifica', 'Piel sedosa'],
    image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'drenaje-linfatico',
    name: 'Drenaje Linfático',
    category: 'corporales',
    duration: 60,
    price: 1600,
    short: 'Desintoxicación y reducción.',
    description:
      'Maniobras precisas para activar el sistema linfático, reducir inflamación y mejorar el contorno corporal.',
    includes: ['Diagnóstico', 'Drenaje manual', 'Vendaje frío'],
    benefits: ['Desinflama', 'Mejora contorno', 'Energía renovada'],
    image: 'https://images.unsplash.com/photo-1571907480495-c1faff2fa4c0?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'envolvente-pedregal',
    name: 'Envolvente Pedregal',
    category: 'corporales',
    duration: 70,
    price: 2400,
    short: 'Aromaterapia mineral.',
    description:
      'Envolvente con barros termales, sales del pedregal y aceites aromáticos para nutrir profundamente la piel.',
    includes: ['Exfoliación', 'Envolvente mineral', 'Hidratación premium'],
    benefits: ['Nutre la piel', 'Detox profundo', 'Calma cuerpo y mente'],
    image: 'https://images.unsplash.com/photo-1591343395082-e120087004b4?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'depilacion-laser',
    name: 'Depilación Láser',
    category: 'aparatologia',
    duration: 30,
    price: 1200,
    short: 'Zona a elegir.',
    description:
      'Depilación con láser de diodo de última generación. Sesiones cómodas y resultados duraderos.',
    includes: ['Diagnóstico capilar', 'Sesión personalizada', 'Postcuidado'],
    benefits: ['Resultados duraderos', 'Indoloro', 'Apto piel sensible'],
    image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'radiofrecuencia',
    name: 'Radiofrecuencia',
    category: 'aparatologia',
    duration: 60,
    price: 2800,
    short: 'Reafirma y estimula colágeno.',
    description:
      'Radiofrecuencia tripolar que estimula la producción de colágeno y reafirma la piel sin tiempo de recuperación.',
    includes: ['Diagnóstico', 'Sesión RF tripolar', 'Mascarilla reafirmante'],
    benefits: ['Firmeza visible', 'Estimula colágeno', 'Sin downtime'],
    image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=1200&q=85',
    featured: true
  },
  {
    id: 'criolipolisis',
    name: 'Criolipólisis',
    category: 'aparatologia',
    duration: 60,
    price: 3500,
    short: 'Reducción localizada.',
    description:
      'Reducción de adipocitos por enfriamiento controlado. Tratamiento avanzado, resultados visibles desde la primera sesión.',
    includes: ['Diagnóstico', 'Sesión criolipólisis', 'Drenaje post-sesión'],
    benefits: ['Reduce adiposidad', 'Sin cirugía', 'Resultados progresivos'],
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'limpieza-aparatologica',
    name: 'Limpieza Aparatológica',
    category: 'aparatologia',
    duration: 75,
    price: 1800,
    short: 'Ultrasonido + LED.',
    description:
      'Limpieza profunda con ultrasonido, alta frecuencia y terapia LED para una piel impecable.',
    includes: ['Vapor ozono', 'Ultrasonido', 'LED multicromática'],
    benefits: ['Piel impecable', 'Reduce poros', 'Brillo sano'],
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'ritual-pareja',
    name: 'Ritual en Pareja',
    category: 'rituales',
    duration: 120,
    price: 5800,
    short: 'Cabina doble privada.',
    description:
      'Experiencia íntima en cabina doble: hidromasaje, exfoliación, masaje sensorial y brindis de cierre.',
    includes: ['Hidromasaje', 'Exfoliación dual', 'Masaje 60 min', 'Brindis Lucienne'],
    benefits: ['Conexión profunda', 'Descanso compartido', 'Memorable'],
    image: 'https://images.unsplash.com/photo-1591343395082-e120087004b4?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'ritual-novia',
    name: 'Ritual Novia Lucienne',
    category: 'rituales',
    duration: 180,
    price: 7800,
    short: 'Pre-evento integral.',
    description:
      'Protocolo de 3 horas para el día más esperado: facial, corporal, manos, pies y pequeño espacio para meditar.',
    includes: ['Facial premium', 'Body sculpt', 'Manos & pies', 'Meditación guiada'],
    benefits: ['Glow nupcial', 'Calma absoluta', 'Listo para el gran día'],
    image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'ritual-detox',
    name: 'Detox Sensorial',
    category: 'rituales',
    duration: 150,
    price: 4900,
    short: '2.5h de reseteo total.',
    description:
      'Ritual diseñado para resetear cuerpo y mente: sauna, drenaje, aromaterapia y cierre con té herbal.',
    includes: ['Sauna infrarroja', 'Drenaje linfático', 'Aromaterapia', 'Té ceremonial'],
    benefits: ['Detox profundo', 'Energía renovada', 'Mente despejada'],
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85'
  }
]

export const treatmentById = (id: string) => treatments.find((t) => t.id === id)

export const treatmentsByCategory = (slug: string) => treatments.filter((t) => t.category === slug)

export const featuredTreatments = () => treatments.filter((t) => t.featured)
