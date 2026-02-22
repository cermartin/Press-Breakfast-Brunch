import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'
import { emailCustomerConfirmed, emailCustomerCancelled } from '@/lib/email'

function checkAuth(request: NextRequest) {
  const key = request.headers.get('x-admin-key')
  return !!process.env.ADMIN_SECRET_KEY && key === process.env.ADMIN_SECRET_KEY
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  let body: { status?: string }
  try { body = await request.json() }
  catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }) }

  const { status } = body
  if (!status || !['pending', 'accepted', 'deleted'].includes(status)) {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
  }

  const supabase = createServerClient()
  const { error } = await supabase.from('reservations').update({ status }).eq('id', id)

  if (error) return NextResponse.json({ error: 'Failed to update' }, { status: 500 })

  if (status === 'accepted' || status === 'deleted') {
    const { data: r } = await supabase
      .from('reservations')
      .select('id, name, phone, email, date, time, guest_count')
      .eq('id', id)
      .single()

    if (r?.email) {
      const b = { id: r.id, name: r.name, phone: r.phone, email: r.email, date: r.date, time: r.time, guestCount: r.guest_count }
      if (status === 'accepted') await emailCustomerConfirmed(b).catch(() => {})
      else await emailCustomerCancelled(b).catch(() => {})
    }
  }

  return NextResponse.json({ success: true })
}
