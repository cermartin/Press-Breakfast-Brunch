import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'
import { sendCustomerBookingAcceptedEmail, sendCustomerBookingCancelledEmail } from '@/lib/email'

function checkAdminAuth(request: NextRequest): boolean {
  const adminKey = request.headers.get('x-admin-key')
  const expectedKey = process.env.ADMIN_SECRET_KEY
  if (!expectedKey) return false
  return adminKey === expectedKey
}

// PATCH /api/admin/reservations/[id] — update reservation status
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!checkAdminAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params

  let body: { status?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { status } = body
  if (!status || !['pending', 'accepted', 'deleted'].includes(status)) {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
  }

  const supabase = createServerClient()

  const { error } = await supabase
    .from('reservations')
    .update({ status })
    .eq('id', id)

  if (error) {
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 })
  }

  // Send email to customer when accepted or cancelled
  if (status === 'accepted' || status === 'deleted') {
    const { data: reservation } = await supabase
      .from('reservations')
      .select('id, name, phone, email, date, time, guest_count')
      .eq('id', id)
      .single()

    if (reservation?.email) {
      const bookingDetails = {
        id: reservation.id,
        name: reservation.name,
        phone: reservation.phone,
        email: reservation.email,
        date: reservation.date,
        time: reservation.time,
        guestCount: reservation.guest_count,
      }
      if (status === 'accepted') {
        await sendCustomerBookingAcceptedEmail(bookingDetails).catch(() => {})
      } else {
        await sendCustomerBookingCancelledEmail(bookingDetails).catch(() => {})
      }
    }
  }

  return NextResponse.json({ success: true })
}
