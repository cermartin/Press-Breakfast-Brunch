import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'

function checkAdminAuth(request: NextRequest): boolean {
  const adminKey = request.headers.get('x-admin-key')
  const expectedKey = process.env.ADMIN_SECRET_KEY
  if (!expectedKey) return false
  return adminKey === expectedKey
}

// GET /api/admin/reservations — all reservations with full details (admin only)
export async function GET(request: NextRequest) {
  if (!checkAdminAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createServerClient()

  const { data, error } = await supabase
    .from('reservations')
    .select('id, name, phone, date, time, status, guest_count, created_at')
    .order('date', { ascending: true })
    .order('time', { ascending: true })

  if (error) {
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }

  return NextResponse.json({ reservations: data })
}
