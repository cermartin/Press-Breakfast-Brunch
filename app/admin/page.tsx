'use client'

import { useState, useEffect, useCallback } from 'react'
import { Lock, RefreshCw, Phone, User, Calendar, Clock, Users, CheckCircle, XCircle, RotateCcw } from 'lucide-react'
import type { Reservation } from '@/lib/types'

type StatusFilter = 'all' | 'pending' | 'accepted' | 'deleted'

const STATUS_STYLES: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-800 border border-amber-200',
  accepted: 'bg-green-100 text-green-800 border border-green-200',
  deleted: 'bg-red-100 text-red-700 border border-red-200',
}

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [authed, setAuthed] = useState(false)
  const [authError, setAuthError] = useState('')
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState<StatusFilter>('pending')
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  const fetchReservations = useCallback(async (pw: string) => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/reservations', {
        headers: { 'x-admin-key': pw },
      })
      if (res.status === 401) {
        setAuthed(false)
        setAuthError('Incorrect password.')
        return
      }
      const data = await res.json()
      setReservations(data.reservations ?? [])
    } catch {
      setAuthError('Connection error. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [])

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    if (!password.trim()) return
    setAuthError('')
    setAuthed(true)
    fetchReservations(password)
  }

  async function updateStatus(id: string, status: 'pending' | 'accepted' | 'deleted') {
    setActionLoading(id + status)
    try {
      await fetch(`/api/admin/reservations/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'x-admin-key': password },
        body: JSON.stringify({ status }),
      })
      setReservations((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status } : r))
      )
    } finally {
      setActionLoading(null)
    }
  }

  useEffect(() => {
    if (authed) {
      const interval = setInterval(() => fetchReservations(password), 60_000)
      return () => clearInterval(interval)
    }
  }, [authed, password, fetchReservations])

  const filtered = reservations.filter((r) => filter === 'all' || r.status === filter)

  const counts = {
    pending: reservations.filter((r) => r.status === 'pending').length,
    accepted: reservations.filter((r) => r.status === 'accepted').length,
    deleted: reservations.filter((r) => r.status === 'deleted').length,
  }

  if (!authed) {
    return (
      <main className="min-h-screen bg-press-dark flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-sm space-y-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-press-dark rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-press-dark">Admin Access</h1>
            <p className="text-stone-500 text-sm mt-1">Press Breakfast & Brunch</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              required
              autoComplete="current-password"
              placeholder="Admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:border-press-dark text-sm"
            />
            {authError && <p className="text-press-red text-sm">{authError}</p>}
            <button type="submit" className="w-full btn-primary justify-center">
              Sign In
            </button>
          </form>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-stone-50">
      {/* Top bar */}
      <div className="bg-press-dark text-white px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div>
          <h1 className="font-bold text-lg">Reservations Dashboard</h1>
          <p className="text-stone-400 text-xs">Press Breakfast & Brunch</p>
        </div>
        <button
          onClick={() => fetchReservations(password)}
          disabled={loading}
          className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-colors px-4 py-2 rounded-xl text-sm font-medium"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-center">
            <p className="text-3xl font-black text-amber-700">{counts.pending}</p>
            <p className="text-amber-600 font-bold text-sm mt-1">Pending</p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-2xl p-4 text-center">
            <p className="text-3xl font-black text-green-700">{counts.accepted}</p>
            <p className="text-green-600 font-bold text-sm mt-1">Accepted</p>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-center">
            <p className="text-3xl font-black text-red-700">{counts.deleted}</p>
            <p className="text-red-600 font-bold text-sm mt-1">Cancelled</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2">
          {(['all', 'pending', 'accepted', 'deleted'] as StatusFilter[]).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-4 py-2 rounded-full text-sm font-bold capitalize transition-all ${
                filter === s
                  ? 'bg-press-dark text-white'
                  : 'bg-white text-stone-600 border border-stone-200 hover:border-stone-400'
              }`}
            >
              {s === 'all' ? `All (${reservations.length})` : `${s} (${counts[s as keyof typeof counts] ?? 0})`}
            </button>
          ))}
        </div>

        {/* Reservations list */}
        {loading ? (
          <div className="text-center py-16 text-stone-400">Loading reservations…</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-stone-400 font-serif italic">
            No {filter !== 'all' ? filter : ''} reservations found.
          </div>
        ) : (
          <div className="space-y-3">
            {filtered
              .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
              .map((r) => (
                <div
                  key={r.id}
                  className="bg-white rounded-2xl border border-stone-200 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  {/* Details */}
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full capitalize ${STATUS_STYLES[r.status]}`}>
                        {r.status}
                      </span>
                      <div className="flex items-center gap-1.5 text-stone-700 font-bold">
                        <User className="w-4 h-4 text-stone-400" />
                        {r.name}
                      </div>
                      <a
                        href={`tel:${r.phone}`}
                        className="flex items-center gap-1.5 text-press-red font-bold hover:underline text-sm"
                      >
                        <Phone className="w-4 h-4" />
                        {r.phone}
                      </a>
                    </div>
                    <div className="flex flex-wrap gap-4 text-stone-500 text-sm">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(r.date + 'T12:00:00').toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {r.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" />
                        {r.guest_count} {r.guest_count === 1 ? 'guest' : 'guests'}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 shrink-0">
                    {r.status !== 'accepted' && (
                      <button
                        onClick={() => updateStatus(r.id, 'accepted')}
                        disabled={actionLoading !== null}
                        className="flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-xl text-sm font-bold transition-colors disabled:opacity-50"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Accept
                      </button>
                    )}
                    {r.status !== 'pending' && (
                      <button
                        onClick={() => updateStatus(r.id, 'pending')}
                        disabled={actionLoading !== null}
                        className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-white px-3 py-2 rounded-xl text-sm font-bold transition-colors disabled:opacity-50"
                      >
                        <RotateCcw className="w-4 h-4" />
                        Pending
                      </button>
                    )}
                    {r.status !== 'deleted' && (
                      <button
                        onClick={() => updateStatus(r.id, 'deleted')}
                        disabled={actionLoading !== null}
                        className="flex items-center gap-1.5 bg-red-100 hover:bg-red-200 text-red-700 px-3 py-2 rounded-xl text-sm font-bold transition-colors disabled:opacity-50"
                      >
                        <XCircle className="w-4 h-4" />
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </main>
  )
}
