export type MembershipTier = {
  id: 'essentielle' | 'signature' | 'prive'
  name: string
  tagline: string
  priceMonthly: number
  priceAnnual: number
  bgColor: string
  textColor: string
  accentColor: string
  features: string[]
  freeSessions: number
  discount: number
  priorityBooking: boolean
  privateEvents: boolean
  welcomeGift: string
}

export const membershipTiers: MembershipTier[] = [
  {
    id: 'essentielle',
    name: 'Essentielle',
    tagline: 'Tu primer paso al bienestar.',
    priceMonthly: 1490,
    priceAnnual: 14900,
    bgColor: '#EDE6D9',
    textColor: '#2C1F17',
    accentColor: '#8C7A6B',
    features: [
      '1 sesión de 45 min al mes',
      '10% de descuento en tratamientos',
      'Acceso a promociones miembro',
      'Reserva con 48h de anticipación',
    ],
    freeSessions: 1,
    discount: 10,
    priorityBooking: false,
    privateEvents: false,
    welcomeGift: 'Kit de bienvenida Lucienne',
  },
  {
    id: 'signature',
    name: 'Signature',
    tagline: 'El estándar Lucienne.',
    priceMonthly: 2490,
    priceAnnual: 24900,
    bgColor: '#2C1F17',
    textColor: '#FEFCF8',
    accentColor: '#C9A96B',
    features: [
      '2 sesiones de 60 min al mes',
      '15% de descuento en todos los servicios',
      'Prioridad en agenda (24h)',
      'Acceso a eventos privados',
      'Regalo de cumpleaños',
    ],
    freeSessions: 2,
    discount: 15,
    priorityBooking: true,
    privateEvents: true,
    welcomeGift: 'Tratamiento facial de bienvenida (60 min)',
  },
  {
    id: 'prive',
    name: 'Privé',
    tagline: 'El acceso más exclusivo.',
    priceMonthly: 4490,
    priceAnnual: 44900,
    bgColor: '#C9A96B',
    textColor: '#1A1209',
    accentColor: '#1A1209',
    features: [
      '4 sesiones de 60–90 min al mes',
      '20% de descuento en todos los servicios',
      'Reserva inmediata en cualquier horario',
      'Cabina siempre disponible',
      'Consultoría de bienestar personalizada',
      'Invitación a lanzamientos exclusivos',
      'Concierge Lucienne',
    ],
    freeSessions: 4,
    discount: 20,
    priorityBooking: true,
    privateEvents: true,
    welcomeGift: 'Experiencia Lucienne completa (150 min)',
  },
]

export const getMembershipTier = (id: string) =>
  membershipTiers.find((t) => t.id === id) ?? membershipTiers[1]
