import type { User } from '../lib/types'

export const guestUser: User = {
  id: 'guest',
  name: 'Invitada',
  email: 'guest@lucienne.spa',
  member: false,
  joinedAt: Date.now()
}

export const seedUser: User = {
  id: 'user-fernanda',
  name: 'Fernanda López',
  email: 'fernanda@email.com',
  phone: '+52 55 4321 8765',
  avatar:
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=85',
  member: true,
  preferences: 'Aromaterapia suave · presión media · cabina privada',
  joinedAt: Date.now() - 1000 * 60 * 60 * 24 * 90
}
