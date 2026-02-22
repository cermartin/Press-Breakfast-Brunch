'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
  Users,
  Phone,
  User,
  CheckCircle2,
  ArrowLeft,
  Info,
} from 'lucide-react'
import { BUSINESS_INFO, TIME_SLOTS } from '@/lib/constants'

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

type Availability = 'available' | 'slightly-booked' | 'full' | 'closed' | 'past'

function getAvailability(count: number, isClosed: boolean, isPast: boolean): Availability {
  if (isPast) return 'past'
  if (isClosed) return 'closed'
  if (count >= 8) return 'full'
  if (count >= 4) return 'slightly-booked'
  return 'available'
}

const AVAIL_STYLES: Record<Availability, string> = {
  available: 'bg-green-50 text-green-800 border-green-200 hover:bg-green-100 cursor-pointer',
  'slightly-booked': 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100 cursor-pointer',
  full: 'bg-red-50 text-red-400 border-red-100 cursor-not-allowed opacity-60',
  closed: 'bg-stone-100 text-stone-400 border-stone-200 cursor-not-allowed',
  past: 'bg-stone-50 text-stone-300 border-stone-100 cursor-not-allowed',
}

const AVAIL_LABEL: Record<Availability, string> = {
  available: 'Available',
  'slightly-booked': 'Filling up',
  full: 'Full',
  closed: 'Closed',
  past: '—',
}

export default function ReservePage() {
  const today = new Date()
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1))
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState('')
  const [counts, setCounts] = useState<Record<string, number>>({})
  const [form, setForm] = useState({ name: '', phone: '', guests: '2' })
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const monthKey = `${viewDate.getFullYear()}-${String(viewDate.getMonth() + 1).padStart(2, '0')}`

  const fetchAvailability = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/reservations?month=${monthKey}`)
      if (res.ok) {
        const data = await res.json()
        setCounts(data.counts ?? {})
      }
    } catch {
      // silently fail — show all as available if Supabase not configured
    } finally {
      setLoading(false)
    }
  }, [monthKey])

  useEffect(() => {
    fetchAvailability()
  }, [fetchAvailability])

  // Build calendar days
  const firstDay = viewDate.getDay()
  const daysInMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate()
  const calendarDays: (Date | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(viewDate.getFullYear(), viewDate.getMonth(), i + 1)),
  ]

  function getDayAvailability(date: Date): Availability {
    const isTuesday = date.getDay() === 2
    const isPast = date < new Date(today.getFullYear(), today.getMonth(), today.getDate())
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
    const count = counts[key] ?? 0
    return getAvailability(count, isTuesday, isPast)
  }

  function getAvailableTimeSlots(date: Date): string[] {
    const isSunday = date.getDay() === 0
    // Sunday: 08:00–16:00, others: 07:00–16:30
    return TIME_SLOTS.filter((t) => {
      const [h, m] = t.split(':').map(Number)
      const mins = h * 60 + m
      if (isSunday) return mins >= 480 && mins <= 960 // 8:00–16:00
      return mins >= 420 && mins <= 960 // 7:00–16:00
    })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!selectedDate || !selectedTime) return

    setSubmitting(true)
    setError('')

    const dateStr = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`

    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          date: dateStr,
          time: selectedTime,
          guest_count: parseInt(form.guests),
        }),
      })

      if (res.ok) {
        setSubmitted(true)
      } else {
        const data = await res.json()
        setError(data.error ?? 'Something went wrong. Please call us to book.')
      }
    } catch {
      setError('Unable to connect. Please call us directly: ' + BUSINESS_INFO.phone)
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-warm-oatmeal flex items-center justify-center px-4 py-16">
        <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full text-center space-y-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-press-dark mb-2">Reservation Requested!</h2>
            <p className="text-stone-600 font-serif">
              We&apos;ve received your request for{' '}
              <strong>{form.guests} guest{parseInt(form.guests) > 1 ? 's' : ''}</strong> on{' '}
              <strong>
                {selectedDate?.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}
              </strong>{' '}
              at <strong>{selectedTime}</strong>.
            </p>
            <p className="text-stone-500 text-sm mt-3">
              We&apos;ll confirm shortly. If you don&apos;t hear from us, please call{' '}
              <a href={`tel:${BUSINESS_INFO.phone}`} className="text-press-red font-bold hover:underline">
                {BUSINESS_INFO.phone}
              </a>
            </p>
          </div>
          <Link href="/" className="btn-secondary w-full justify-center">
            Back to Home
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-warm-oatmeal">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-stone-500 hover:text-press-dark transition-colors text-sm mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-press-dark mb-2">Reserve a Table</h1>
          <p className="text-stone-600 font-serif text-lg">Pick a date, choose your time, and we&apos;ll see you soon.</p>
        </div>

        {/* Disclaimer */}
        <div className="flex items-start gap-3 bg-press-blue/10 border border-press-blue/30 rounded-2xl p-4 mb-8 text-sm text-stone-700">
          <Info className="w-5 h-5 text-press-blue shrink-0 mt-0.5" />
          <p>
            Reservations are requests — we&apos;ll confirm by phone. For same-day bookings please call us directly on{' '}
            <a href={`tel:${BUSINESS_INFO.phone}`} className="font-bold text-press-red hover:underline">
              {BUSINESS_INFO.phone}
            </a>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* Calendar */}
          <div className="lg:col-span-3 bg-white rounded-3xl shadow-sm border border-stone-100 p-6">

            {/* Month navigation */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1))}
                className="p-2 rounded-xl hover:bg-stone-100 transition-colors"
                aria-label="Previous month"
              >
                <ChevronLeft className="w-5 h-5 text-stone-600" />
              </button>
              <h2 className="text-xl font-bold text-press-dark">
                {MONTHS[viewDate.getMonth()]} {viewDate.getFullYear()}
              </h2>
              <button
                onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1))}
                className="p-2 rounded-xl hover:bg-stone-100 transition-colors"
                aria-label="Next month"
              >
                <ChevronRight className="w-5 h-5 text-stone-600" />
              </button>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 mb-2">
              {DAYS.map((d) => (
                <div key={d} className="text-center text-xs font-bold text-stone-400 uppercase py-1">
                  {d}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            {loading ? (
              <div className="h-48 flex items-center justify-center text-stone-400 text-sm">
                Loading availability…
              </div>
            ) : (
              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((date, i) => {
                  if (!date) return <div key={i} />
                  const avail = getDayAvailability(date)
                  const isSelected =
                    selectedDate?.toDateString() === date.toDateString()
                  const isSelectable = avail === 'available' || avail === 'slightly-booked'

                  return (
                    <button
                      key={i}
                      disabled={!isSelectable}
                      onClick={() => {
                        if (isSelectable) {
                          setSelectedDate(date)
                          setSelectedTime('')
                        }
                      }}
                      className={`relative aspect-square rounded-xl border text-sm font-medium transition-all flex flex-col items-center justify-center gap-0.5 p-1
                        ${AVAIL_STYLES[avail]}
                        ${isSelected ? '!bg-press-dark !text-white !border-press-dark ring-2 ring-press-dark ring-offset-1' : ''}
                      `}
                    >
                      <span className="font-bold text-base">{date.getDate()}</span>
                      {avail !== 'past' && (
                        <span className="text-[9px] leading-none opacity-70 hidden sm:block">
                          {AVAIL_LABEL[avail]}
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
            )}

            {/* Legend */}
            <div className="flex flex-wrap gap-3 mt-5 pt-4 border-t border-stone-100">
              {[
                { label: 'Available', color: 'bg-green-200' },
                { label: 'Filling up', color: 'bg-amber-200' },
                { label: 'Full', color: 'bg-red-200' },
                { label: 'Closed (Tue)', color: 'bg-stone-200' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-1.5 text-xs text-stone-600">
                  <span className={`w-3 h-3 rounded-full ${item.color}`} />
                  {item.label}
                </div>
              ))}
            </div>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-2">
            {!selectedDate ? (
              <div className="bg-white rounded-3xl border border-stone-100 p-8 text-center h-full flex flex-col items-center justify-center gap-4">
                <div className="w-16 h-16 bg-warm-oatmeal rounded-full flex items-center justify-center">
                  <Calendar className="w-8 h-8 text-stone-400" />
                </div>
                <p className="text-stone-500 font-serif">Select a date on the calendar to see available time slots</p>
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-stone-100 p-6 space-y-5">
                <div>
                  <h3 className="font-bold text-press-dark text-lg">
                    {selectedDate.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}
                  </h3>
                  <p className="text-stone-500 text-sm mt-1">Complete your details below</p>
                </div>

                {/* Time slots */}
                <div>
                  <p className="text-sm font-bold text-stone-700 mb-2 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-press-red" />
                    Choose a time
                  </p>
                  <div className="grid grid-cols-3 gap-1.5">
                    {getAvailableTimeSlots(selectedDate).map((t) => (
                      <button
                        key={t}
                        onClick={() => setSelectedTime(t)}
                        className={`py-2 rounded-lg text-sm font-bold border transition-all ${
                          selectedTime === t
                            ? 'bg-press-dark text-white border-press-dark'
                            : 'bg-white text-stone-700 border-stone-200 hover:border-press-dark'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3">
                  {/* Name */}
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                    <input
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="Full name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:border-press-dark text-sm"
                    />
                  </div>

                  {/* Phone */}
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                    <input
                      type="tel"
                      required
                      autoComplete="tel"
                      placeholder="Phone number"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:border-press-dark text-sm"
                    />
                  </div>

                  {/* Party size */}
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                    <select
                      required
                      value={form.guests}
                      onChange={(e) => setForm({ ...form, guests: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:border-press-dark text-sm bg-white appearance-none"
                    >
                      {[1,2,3,4,5,6,7,8,9,10].map((n) => (
                        <option key={n} value={n}>{n} {n === 1 ? 'guest' : 'guests'}</option>
                      ))}
                    </select>
                  </div>

                  {error && (
                    <p className="text-press-red text-sm font-medium">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={!selectedTime || submitting}
                    className="w-full btn-primary justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? 'Sending…' : 'Request Reservation'}
                  </button>

                  <p className="text-center text-xs text-stone-400">
                    We&apos;ll confirm by phone within a few hours
                  </p>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
