import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'
import { emailOwnerNewBooking, emailCustomerPending } from '@/lib/email'

// GET /api/reservations?month=YYYY-MM — returns slot counts, no PII
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const month = searchParams.get('month')

  if (!month || !/^\d{4}-\d{2}$/.test(month)) {
    return NextResponse.json({ error: 'Invalid month parameter' }, { status: 400 })
  }

  const [year, m] = month.split('-').map(Number)
  const startDate = `${month}-01`
  const nextMonth = m === 12
    ? `${year + 1}-01-01`
    : `${year}-${String(m + 1).padStart(2, '0')}-01`

  const supabase = createServerClient()
  const { data, error } = await supabase
    .from('reservations')
    .select('date, status')
    .gte('date', startDate)
    .lt('date', nextMonth)
    .neq('status', 'deleted')

  if (error) return NextResponse.json({ counts: {} })

  const counts: Record<string, number> = {}
  data?.forEach((r) => { counts[r.date] = (counts[r.date] ?? 0) + 1 })

  return NextResponse.json({ counts })
}

// POST /api/reservations — create booking, send emails
export async function POST(request: NextRequest) {
  let body: { name?: string; phone?: string; email?: string; date?: string; time?: string; guest_count?: number }

  try { body = await request.json() }
  catch { return NextResponse.json({ error: 'Invalid request' }, { status: 400 }) }

  const { name, phone, email, date, time, guest_count } = body

  if (!name || !phone || !date || !time) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const supabase = createServerClient()
  const { data, error } = await supabase
    .from('reservations')
    .insert({
      name: name.trim().slice(0, 100),
      phone: phone.trim().slice(0, 30),
      email: email?.trim().slice(0, 200) ?? '',
      date,
      time,
      status: 'pending',
      guest_count: Math.min(Math.max(Number(guest_count) || 2, 1), 20),
    })
    .select('id')
    .single()

  if (error) {
    return NextResponse.json({ error: 'Failed to save. Please call us directly.' }, { status: 500 })
  }

  const booking = {
    id: data.id,
    name: name.trim(),
    phone: phone.trim(),
    email: email?.trim() ?? '',
    date,
    time,
    guestCount: Number(guest_count) || 2,
  }

  await Promise.allSettled([
    emailOwnerNewBooking(booking),
    emailCustomerPending(booking),
  ])

  return NextResponse.json({ id: data.id }, { status: 201 })
}
