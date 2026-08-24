export const mockUser = {
  id: 'u-mariana-001',
  name: 'Mariana Reyes',
  firstName: 'Mariana',
  email: 'mariana.reyes@email.com',
  phone: '+52 55 4891 2370',
  membershipLevel: 'Signature' as const,
  membershipSince: '2025-03-01',
  membershipExpires: '2026-09-01',
  joinedAt: new Date('2025-03-01').getTime(),
  giftCards: [
    {
      id: 'gc-001',
      code: 'LUC-2026-XKQM',
      experience: 'Ritual Facial Signature',
      value: 2400,
      purchasedBy: 'Andrea Torres',
      message: '¡Para que te mimes un poco. Te lo mereces!',
      expiresAt: '2026-12-31',
      status: 'active' as const,
    },
    {
      id: 'gc-002',
      code: 'LUC-2025-BRTW',
      experience: 'Masaje Relajante',
      value: 1500,
      purchasedBy: 'Sofía Mendoza',
      message: 'Feliz cumpleaños, amiga.',
      expiresAt: '2025-06-30',
      status: 'used' as const,
    },
  ],
}

export type MockUser = typeof mockUser
