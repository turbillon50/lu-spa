'use client'
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { ModeProvider } from './mode'
import { mockUser } from '../data/mockUser'

const STORAGE_KEY = 'lucienne::v2'

export type Appointment = {
  id: string
  treatmentId: string
  treatmentName: string
  date: string
  time: string
  status: 'confirmed' | 'completed' | 'cancelled'
  cabin?: string
  createdAt: number
}

export type BookingItem = {
  treatmentId: string
  treatmentName: string
  price: number
  duration: number
  date?: string
  time?: string
}

type Persisted = {
  appointments: Appointment[]
  favorites: string[]
  bookingItem: BookingItem | null
}

const initial: Persisted = {
  appointments: [],
  favorites: [],
  bookingItem: null,
}

const seedAppointments = (): Appointment[] => {
  const today = new Date()
  const inDays = (days: number) => {
    const d = new Date(today)
    d.setDate(d.getDate() + days)
    return d.toISOString().slice(0, 10)
  }
  return [
    {
      id: 'a-1',
      treatmentId: 'hydrafacial',
      treatmentName: 'Hydrafacial Lumière',
      date: inDays(3),
      time: '11:00',
      status: 'confirmed',
      cabin: 'Cabina Pétalo',
      createdAt: Date.now() - 1000 * 60 * 60 * 24 * 4,
    },
    {
      id: 'a-2',
      treatmentId: 'masaje-relajante',
      treatmentName: 'Masaje Relajante',
      date: inDays(10),
      time: '13:00',
      status: 'confirmed',
      cabin: 'Cabina Almendro',
      createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
    },
    {
      id: 'a-3',
      treatmentId: 'ritual-pareja',
      treatmentName: 'Ritual en Pareja',
      date: inDays(-30),
      time: '15:00',
      status: 'completed',
      cabin: 'Suite Doble',
      createdAt: Date.now() - 1000 * 60 * 60 * 24 * 35,
    },
    {
      id: 'a-4',
      treatmentId: 'radiofrecuencia',
      treatmentName: 'Radiofrecuencia Facial',
      date: inDays(-60),
      time: '10:00',
      status: 'completed',
      cabin: 'Cabina Pétalo',
      createdAt: Date.now() - 1000 * 60 * 60 * 24 * 65,
    },
  ]
}

type Ctx = {
  appointments: Appointment[]
  favorites: string[]
  bookingItem: BookingItem | null
  hydrated: boolean
  setBookingItem: (item: BookingItem | null) => void
  confirmBooking: (date: string, time: string) => Appointment
  cancelAppointment: (id: string) => void
  toggleFavorite: (id: string) => void
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
        setState({
          appointments: parsed.appointments?.length ? parsed.appointments : seedAppointments(),
          favorites: parsed.favorites ?? [],
          bookingItem: parsed.bookingItem ?? null,
        })
      } else {
        setState({ ...initial, appointments: seedAppointments() })
      }
    } catch {
      setState({ ...initial, appointments: seedAppointments() })
    } finally {
      setHydrated(true)
    }
  }, [])

  useEffect(() => {
    if (!hydrated) return
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)) } catch {}
  }, [state, hydrated])

  const setBookingItem = useCallback((item: BookingItem | null) => {
    setState((s) => ({ ...s, bookingItem: item }))
  }, [])

  const confirmBooking = useCallback((date: string, time: string): Appointment => {
    let created!: Appointment
    setState((s) => {
      if (!s.bookingItem) return s
      created = {
        id: `a-${Date.now()}`,
        treatmentId: s.bookingItem.treatmentId,
        treatmentName: s.bookingItem.treatmentName,
        date,
        time,
        status: 'confirmed',
        cabin: 'Cabina Pétalo',
        createdAt: Date.now(),
      }
      return { ...s, bookingItem: null, appointments: [created, ...s.appointments] }
    })
    return created
  }, [])

  const cancelAppointment = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      appointments: s.appointments.map((a) =>
        a.id === id ? { ...a, status: 'cancelled' as const } : a
      ),
    }))
  }, [])

  const toggleFavorite = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      favorites: s.favorites.includes(id)
        ? s.favorites.filter((f) => f !== id)
        : [...s.favorites, id],
    }))
  }, [])

  const value = useMemo<Ctx>(
    () => ({
      ...state,
      hydrated,
      setBookingItem,
      confirmBooking,
      cancelAppointment,
      toggleFavorite,
    }),
    [state, hydrated, setBookingItem, confirmBooking, cancelAppointment, toggleFavorite]
  )

  return (
    <ModeProvider>
      <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
    </ModeProvider>
  )
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be within Providers')
  return ctx
}

export { mockUser }
