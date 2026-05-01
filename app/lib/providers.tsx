'use client'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'
import type {
  Appointment,
  AppNotification,
  CartItem,
  User
} from './types'
import { seedUser } from '../data/mockUser'

const STORAGE_KEY = 'lucienne::v1'

type Persisted = {
  user: User | null
  cart: CartItem[]
  appointments: Appointment[]
  favorites: string[]
  notifications: AppNotification[]
}

const initial: Persisted = {
  user: null,
  cart: [],
  appointments: [],
  favorites: [],
  notifications: []
}

const seedNotifications = (): AppNotification[] => [
  {
    id: 'n-1',
    title: 'Tu cita está próxima',
    body: 'Hydrafacial · Mañana 11:00 AM',
    date: 'Hoy',
    type: 'reminder',
    read: false
  },
  {
    id: 'n-2',
    title: 'Promoción exclusiva',
    body: '15% OFF en tratamientos faciales',
    date: 'Hace 2 días',
    type: 'promo',
    read: false
  },
  {
    id: 'n-3',
    title: 'Nuevo tratamiento',
    body: 'Conoce nuestro nuevo láser de diodo',
    date: 'Hace 4 días',
    type: 'news',
    read: true
  },
  {
    id: 'n-4',
    title: '¡Feliz cumpleaños!',
    body: 'Tienes un regalo especial esperándote',
    date: 'Hace 1 semana',
    type: 'birthday',
    read: true
  }
]

const seedAppointments = (): Appointment[] => {
  const today = new Date()
  const inDays = (days: number) => {
    const d = new Date(today)
    d.setDate(d.getDate() + days)
    return d.toISOString().slice(0, 10)
  }
  return [
    {
      id: 'a-seed-1',
      treatmentId: 'hydrafacial',
      date: inDays(2),
      time: '11:00 AM',
      status: 'confirmed',
      cabin: 'Cabina Pétalo',
      createdAt: Date.now() - 1000 * 60 * 60 * 24 * 4
    },
    {
      id: 'a-seed-2',
      treatmentId: 'masaje-relajante',
      date: inDays(9),
      time: '12:00 PM',
      status: 'confirmed',
      cabin: 'Cabina Almendro',
      createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2
    },
    {
      id: 'a-seed-3',
      treatmentId: 'radiofrecuencia',
      date: inDays(-21),
      time: '11:00 AM',
      status: 'completed',
      cabin: 'Cabina Almendro',
      createdAt: Date.now() - 1000 * 60 * 60 * 24 * 30
    }
  ]
}

type Ctx = {
  user: User | null
  cart: CartItem[]
  appointments: Appointment[]
  favorites: string[]
  notifications: AppNotification[]
  hydrated: boolean
  signIn: (email: string) => void
  signInGuest: () => void
  register: (data: { name: string; email: string; phone?: string }) => void
  signOut: () => void
  addToCart: (item: CartItem) => void
  removeFromCart: (treatmentId: string) => void
  clearCart: () => void
  bookFromCart: () => Appointment[]
  cancelAppointment: (id: string) => void
  toggleFavorite: (id: string) => void
  markNotificationRead: (id: string) => void
  markAllNotificationsRead: () => void
}

const StoreContext = createContext<Ctx | null>(null)

export function Providers({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<Persisted>(initial)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as Persisted
        const next: Persisted = {
          user: parsed.user ?? null,
          cart: parsed.cart ?? [],
          appointments: parsed.appointments ?? [],
          favorites: parsed.favorites ?? [],
          notifications: parsed.notifications?.length ? parsed.notifications : seedNotifications()
        }
        setState(next)
      } else {
        setState({ ...initial, notifications: seedNotifications() })
      }
    } catch {
      setState({ ...initial, notifications: seedNotifications() })
    } finally {
      setHydrated(true)
    }
  }, [])

  useEffect(() => {
    if (!hydrated) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {}
  }, [state, hydrated])

  const signIn = useCallback((email: string) => {
    setState((s) => ({
      ...s,
      user: { ...seedUser, email },
      appointments: s.appointments.length ? s.appointments : seedAppointments()
    }))
  }, [])

  const signInGuest = useCallback(() => {
    setState((s) => ({
      ...s,
      user: { ...seedUser, name: 'Invitada', email: 'guest@lucienne.spa', member: false }
    }))
  }, [])

  const register = useCallback(({ name, email, phone }: { name: string; email: string; phone?: string }) => {
    setState((s) => ({
      ...s,
      user: { ...seedUser, name, email, phone, id: `u-${Date.now()}`, joinedAt: Date.now() }
    }))
  }, [])

  const signOut = useCallback(() => {
    setState((s) => ({ ...s, user: null }))
  }, [])

  const addToCart = useCallback((item: CartItem) => {
    setState((s) => ({
      ...s,
      cart: [...s.cart.filter((c) => c.treatmentId !== item.treatmentId), item]
    }))
  }, [])

  const removeFromCart = useCallback((treatmentId: string) => {
    setState((s) => ({ ...s, cart: s.cart.filter((c) => c.treatmentId !== treatmentId) }))
  }, [])

  const clearCart = useCallback(() => {
    setState((s) => ({ ...s, cart: [] }))
  }, [])

  const bookFromCart = useCallback(() => {
    let created: Appointment[] = []
    setState((s) => {
      created = s.cart.map((c, i) => ({
        id: `a-${Date.now()}-${i}`,
        treatmentId: c.treatmentId,
        date: c.date,
        time: c.time,
        status: 'confirmed' as const,
        cabin: i % 2 === 0 ? 'Cabina Pétalo' : 'Cabina Almendro',
        createdAt: Date.now()
      }))
      return { ...s, cart: [], appointments: [...s.appointments, ...created] }
    })
    return created
  }, [])

  const cancelAppointment = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      appointments: s.appointments.map((a) => (a.id === id ? { ...a, status: 'cancelled' as const } : a))
    }))
  }, [])

  const toggleFavorite = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      favorites: s.favorites.includes(id) ? s.favorites.filter((f) => f !== id) : [...s.favorites, id]
    }))
  }, [])

  const markNotificationRead = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      notifications: s.notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    }))
  }, [])

  const markAllNotificationsRead = useCallback(() => {
    setState((s) => ({
      ...s,
      notifications: s.notifications.map((n) => ({ ...n, read: true }))
    }))
  }, [])

  const value = useMemo<Ctx>(
    () => ({
      ...state,
      hydrated,
      signIn,
      signInGuest,
      register,
      signOut,
      addToCart,
      removeFromCart,
      clearCart,
      bookFromCart,
      cancelAppointment,
      toggleFavorite,
      markNotificationRead,
      markAllNotificationsRead
    }),
    [
      state,
      hydrated,
      signIn,
      signInGuest,
      register,
      signOut,
      addToCart,
      removeFromCart,
      clearCart,
      bookFromCart,
      cancelAppointment,
      toggleFavorite,
      markNotificationRead,
      markAllNotificationsRead
    ]
  )

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used within <Providers>')
  return ctx
}
