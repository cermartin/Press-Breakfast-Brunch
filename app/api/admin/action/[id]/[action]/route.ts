import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'
import { emailCustomerConfirmed, emailCustomerCancelled } from '@/lib/email'

// GET /api/admin/action/[id]/confirm?key=xxx
// GET /api/admin/action/[id]/cancel?key=xxx
// One-click confirm or cancel directly from the owner email
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; action: string }> }
) {
  const { id, action } = await params
  const { searchParams } = new URL(request.url)
  const key = searchParams.get('key')

  const expectedKey = process.env.ADMIN_SECRET_KEY
  if (!expectedKey || key !== expectedKey) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  if (action !== 'confirm' && action !== 'cancel') {
    return new NextResponse('Invalid action', { status: 400 })
  }

  const status = action === 'confirm' ? 'accepted' : 'deleted'
  const supabase = createServerClient()

  const { error } = await supabase
    .from('reservations')
    .update({ status })
    .eq('id', id)

  if (error) {
    return new NextResponse('Failed to update reservation', { status: 500 })
  }

  // Fetch booking details to send customer email
  const { data: reservation } = await supabase
    .from('reservations')
    .select('id, name, phone, email, date, time, guest_count')
    .eq('id', id)
    .single()

  if (reservation?.email) {
    const b = {
      id: reservation.id,
      name: reservation.name,
      phone: reservation.phone,
      email: reservation.email,
      date: reservation.date,
      time: reservation.time,
      guestCount: reservation.guest_count,
    }
    if (action === 'confirm') {
      await emailCustomerConfirmed(b).catch(() => {})
    } else {
      await emailCustomerCancelled(b).catch(() => {})
    }
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://press-breakfast-brunch.vercel.app'
  const params = new URLSearchParams({ action })
  if (reservation?.name) params.set('name', reservation.name)
  if (reservation?.date) params.set('date', reservation.date)
  if (reservation?.time) params.set('time', reservation.time)
  return NextResponse.redirect(`${siteUrl}/booking-done?${params}`)
}
