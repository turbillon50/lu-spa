export type Package = {
  id: string
  name: string
  tagline: string
  description: string
  image: string
  duration: number
  persons: 1 | 2
  price: number
  includes: string[]
  forWhom: string
  badge?: string
}

export const packages: Package[] = [
  {
    id: 'ritual-relajacion',
    name: 'Ritual de Relajación',
    tagline: 'La pausa perfecta.',
    description:
      'Diseñado para quienes necesitan desconectarse por completo. Masaje sueco profundo, aromaterapia personalizada y cierre con pediluvio caliente.',
    image: '/img/relajate-2.jpg',
    duration: 90,
    persons: 1,
    price: 2900,
    includes: ['Masaje relajante 60 min', 'Aromaterapia premium', 'Pediluvio ritual', 'Té de hierbas'],
    forWhom: 'Para quienes buscan descanso profundo y liberar el estrés acumulado.',
  },
  {
    id: 'ritual-facial',
    name: 'Ritual Facial Signature',
    tagline: 'Piel que brilla desde adentro.',
    description:
      'El facial más completo de Lucienne. Limpieza profunda, diagnóstico de piel, tratamiento personalizado y masaje de drenaje facial.',
    image: '/img/renueva-1.jpg',
    duration: 90,
    persons: 1,
    price: 3200,
    includes: ['Diagnóstico Facial', 'Limpieza doble', 'Tratamiento personalizado', 'Masaje lifting', 'Mascarilla'],
    forWhom: 'Para quienes quieren una piel luminosa y un cuidado profundo y personalizado.',
    badge: 'Más popular',
  },
  {
    id: 'body-experience',
    name: 'Body Experience',
    tagline: 'Transforma tu relación con tu cuerpo.',
    description:
      'Ritual corporal de 2 horas que combina exfoliación, drenaje linfático, envolvente nutritivo y masaje final. La experiencia corporal más completa.',
    image: '/img/transforma-1.jpg',
    duration: 120,
    persons: 1,
    price: 4200,
    includes: [
      'Exfoliación corporal',
      'Drenaje linfático manual',
      'Envolvente mineral',
      'Masaje corporal 30 min',
      'Hidratación profunda',
    ],
    forWhom: 'Para quienes buscan una transformación corporal completa en una sola visita.',
  },
  {
    id: 'experiencia-lucienne',
    name: 'Experiencia Lucienne Completa',
    tagline: 'El lujo de cuidarte por entero.',
    description:
      'Nuestra experiencia flagship. Un día completo de bienestar que incluye desde facial hasta corporal, con rituales de transición entre cada etapa.',
    image: '/img/hero-home.jpg',
    duration: 150,
    persons: 1,
    price: 5800,
    includes: [
      'Ritual facial 60 min',
      'Masaje corporal 60 min',
      'Exfoliación corporal',
      'Aromaterapia',
      'Infusión ceremonial',
      'Tiempo de descanso privado',
    ],
    forWhom: 'Para quien quiere vivir Lucienne en su versión más completa.',
    badge: 'Experiencia flagship',
  },
  {
    id: 'para-dos',
    name: 'Experiencia para Dos',
    tagline: 'Compartir es el lujo más grande.',
    description:
      'Suite privada, dos camillas, masaje sincronizado, champagne y una tabla de quesos artesanales para cerrar. Un momento que no se olvida.',
    image: '/img/parados.jpg',
    duration: 120,
    persons: 2,
    price: 5800,
    includes: [
      'Suite doble privada',
      'Masaje sincronizado 60 min',
      'Champagne y tabla de quesos',
      'Aromaterapia dual',
      'Pediluvio en pareja',
      'Ambientación romántica',
    ],
    forWhom: 'Para parejas, amigas o cualquier celebración especial.',
  },
]

export const getPackage = (id: string) => packages.find((p) => p.id === id)
