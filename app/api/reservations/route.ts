import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'

// GET /api/reservations?month=YYYY-MM
// Returns slot counts per date — NO personal data exposed
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const month = searchParams.get('month') // e.g. "2025-06"

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

  if (error) {
    // Supabase not configured — return empty counts so the page still works
    return NextResponse.json({ counts: {} })
  }

  // Only return counts, never names or phone numbers
  const counts: Record<string, number> = {}
  data?.forEach((r) => {
    counts[r.date] = (counts[r.date] ?? 0) + 1
  })

  return NextResponse.json({ counts })
}

// POST /api/reservations
// Create a new reservation (publicly accessible)
export async function POST(request: NextRequest) {
  let body: {
    name?: string
    phone?: string
    date?: string
    time?: string
    guest_count?: number
  }

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const { name, phone, date, time, guest_count } = body

  if (!name || !phone || !date || !time) {
    return NextResponse.json({ error: 'Missing required fields: name, phone, date, time' }, { status: 400 })
  }

  // Basic validation
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: 'Invalid date format (expected YYYY-MM-DD)' }, { status: 400 })
  }

  const supabase = createServerClient()

  const { data, error } = await supabase
    .from('reservations')
    .insert({
      name: name.trim().slice(0, 100),
      phone: phone.trim().slice(0, 30),
      date,
      time,
      status: 'pending',
      guest_count: Math.min(Math.max(Number(guest_count) || 2, 1), 20),
    })
    .select('id')
    .single()

  if (error) {
    return NextResponse.json({ error: 'Failed to save reservation. Please call us directly.' }, { status: 500 })
  }

  return NextResponse.json({ id: data.id }, { status: 201 })
}
