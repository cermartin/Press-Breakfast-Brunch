import { Resend } from 'resend'

const OWNER_EMAIL = 'emilyjacksn688@gmail.com'
const FROM = 'Press Breakfast & Brunch <onboarding@resend.dev>'
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://pbb-eta.vercel.app'
const ADMIN_KEY = process.env.ADMIN_SECRET_KEY || ''

function getResend() {
  return new Resend(process.env.RESEND_API_KEY)
}

interface Booking {
  id: string
  name: string
  phone: string
  email: string
  date: string
  time: string
  guestCount: number
}

function fmtDate(d: string) {
  return new Date(d + 'T12:00:00').toLocaleDateString('en-GB', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  })
}

// 1. Email to owner when new booking arrives — with confirm/cancel buttons
export async function emailOwnerNewBooking(b: Booking) {
  const confirmUrl = `${SITE_URL}/api/admin/action/${b.id}/confirm?key=${encodeURIComponent(ADMIN_KEY)}`
  const cancelUrl  = `${SITE_URL}/api/admin/action/${b.id}/cancel?key=${encodeURIComponent(ADMIN_KEY)}`

  try {
    const { error } = await getResend().emails.send({
      from: FROM,
      to: OWNER_EMAIL,
      subject: `New reservation — ${b.name}, ${fmtDate(b.date)} at ${b.time}`,
      html: `
        <div style="font-family:sans-serif;max-width:580px;margin:0 auto;background:#f9f9f7;border-radius:12px;overflow:hidden;border:1px solid #e5e5e5">
          <div style="background:#1a1a1a;padding:24px">
            <h2 style="color:white;margin:0;font-size:20px">New Reservation Request</h2>
          </div>
          <div style="padding:24px">
            <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
              <tr><td style="padding:6px 0;color:#666;width:100px">Name</td><td style="padding:6px 0;font-weight:bold">${b.name}</td></tr>
              <tr><td style="padding:6px 0;color:#666">Phone</td><td style="padding:6px 0"><a href="tel:${b.phone}" style="color:#D32F2F;font-weight:bold">${b.phone}</a></td></tr>
              <tr><td style="padding:6px 0;color:#666">Email</td><td style="padding:6px 0">${b.email}</td></tr>
              <tr><td style="padding:6px 0;color:#666">Date</td><td style="padding:6px 0;font-weight:bold">${fmtDate(b.date)}</td></tr>
              <tr><td style="padding:6px 0;color:#666">Time</td><td style="padding:6px 0;font-weight:bold">${b.time}</td></tr>
              <tr><td style="padding:6px 0;color:#666">Guests</td><td style="padding:6px 0;font-weight:bold">${b.guestCount}</td></tr>
            </table>
            <table style="width:100%;border-collapse:collapse">
              <tr>
                <td style="padding-right:8px">
                  <a href="${confirmUrl}" style="display:block;text-align:center;background:#16a34a;color:white;padding:14px 0;border-radius:8px;text-decoration:none;font-weight:bold;font-size:16px">Confirm</a>
                </td>
                <td style="padding-left:8px">
                  <a href="${cancelUrl}" style="display:block;text-align:center;background:#dc2626;color:white;padding:14px 0;border-radius:8px;text-decoration:none;font-weight:bold;font-size:16px">Cancel</a>
                </td>
              </tr>
            </table>
          </div>
        </div>
      `,
    })
    if (error) console.error('[email] owner new booking failed:', error)
  } catch (err) {
    console.error('[email] owner new booking failed:', err)
  }
}

// 2. Email to customer — booking received, pending
export async function emailCustomerPending(b: Booking) {
  if (!b.email) return
  try {
    const { error } = await getResend().emails.send({
      from: FROM,
      to: b.email,
      subject: `We've received your booking — Press Breakfast & Brunch`,
      html: `
        <div style="font-family:sans-serif;max-width:580px;margin:0 auto;background:#f9f9f7;border-radius:12px;overflow:hidden;border:1px solid #e5e5e5">
          <div style="background:#1a1a1a;padding:24px">
            <h2 style="color:white;margin:0;font-size:20px">Thanks, ${b.name}!</h2>
            <p style="color:#aaa;margin:6px 0 0">We've received your reservation request.</p>
          </div>
          <div style="padding:24px">
            <p style="color:#444;margin-top:0">Here's your request summary:</p>
            <div style="background:white;border-radius:8px;padding:16px;border:1px solid #e5e5e5;margin-bottom:20px">
              <p style="margin:6px 0">Date: <strong>${fmtDate(b.date)}</strong></p>
              <p style="margin:6px 0">Time: <strong>${b.time}</strong></p>
              <p style="margin:6px 0">Guests: <strong>${b.guestCount} ${b.guestCount === 1 ? 'guest' : 'guests'}</strong></p>
            </div>
            <p style="color:#555">We'll get back to you shortly to confirm your table. If you need to reach us:</p>
            <p style="margin:4px 0">Phone: <a href="tel:+441895810648" style="color:#D32F2F;font-weight:bold">+44 1895 810648</a></p>
            <p style="margin:4px 0;color:#666">Address: 311 Long Lane, Hillingdon, Uxbridge, UB10 9JY</p>
          </div>
        </div>
      `,
    })
    if (error) console.error('[email] customer pending failed:', error)
  } catch (err) {
    console.error('[email] customer pending failed:', err)
  }
}

// 3. Email to customer — confirmed
export async function emailCustomerConfirmed(b: Booking) {
  if (!b.email) return
  try {
    const { error } = await getResend().emails.send({
      from: FROM,
      to: b.email,
      subject: `Your table is confirmed — Press Breakfast & Brunch`,
      html: `
        <div style="font-family:sans-serif;max-width:580px;margin:0 auto;background:#f9f9f7;border-radius:12px;overflow:hidden;border:1px solid #e5e5e5">
          <div style="background:#16a34a;padding:24px">
            <h2 style="color:white;margin:0;font-size:20px">You're confirmed, ${b.name}!</h2>
            <p style="color:rgba(255,255,255,0.8);margin:6px 0 0">Your table is booked.</p>
          </div>
          <div style="padding:24px">
            <div style="background:white;border-radius:8px;padding:16px;border:1px solid #e5e5e5;margin-bottom:20px">
              <p style="margin:6px 0">Date: <strong>${fmtDate(b.date)}</strong></p>
              <p style="margin:6px 0">Time: <strong>${b.time}</strong></p>
              <p style="margin:6px 0">Guests: <strong>${b.guestCount} ${b.guestCount === 1 ? 'guest' : 'guests'}</strong></p>
            </div>
            <p style="margin:4px 0">Address: <strong>311 Long Lane, Hillingdon, Uxbridge, UB10 9JY</strong></p>
            <p style="margin:4px 0">Phone: <a href="tel:+441895810648" style="color:#D32F2F;font-weight:bold">+44 1895 810648</a></p>
            <p style="margin-top:20px;color:#888;font-size:13px">We look forward to seeing you!</p>
          </div>
        </div>
      `,
    })
    if (error) console.error('[email] customer confirmed failed:', error)
  } catch (err) {
    console.error('[email] customer confirmed failed:', err)
  }
}

// 4. Email to customer — cancelled
export async function emailCustomerCancelled(b: Booking) {
  if (!b.email) return
  try {
    const { error } = await getResend().emails.send({
      from: FROM,
      to: b.email,
      subject: `Your reservation has been cancelled — Press Breakfast & Brunch`,
      html: `
        <div style="font-family:sans-serif;max-width:580px;margin:0 auto;background:#f9f9f7;border-radius:12px;overflow:hidden;border:1px solid #e5e5e5">
          <div style="background:#b91c1c;padding:24px">
            <h2 style="color:white;margin:0;font-size:20px">Reservation Cancelled</h2>
            <p style="color:rgba(255,255,255,0.8);margin:6px 0 0">Hi ${b.name}, unfortunately we've had to cancel your booking.</p>
          </div>
          <div style="padding:24px">
            <div style="background:white;border-radius:8px;padding:16px;border:1px solid #e5e5e5;margin-bottom:20px">
              <p style="margin:6px 0">Date: <strong>${fmtDate(b.date)}</strong></p>
              <p style="margin:6px 0">Time: <strong>${b.time}</strong></p>
              <p style="margin:6px 0">Guests: <strong>${b.guestCount} ${b.guestCount === 1 ? 'guest' : 'guests'}</strong></p>
            </div>
            <p style="color:#444">We're sorry for any inconvenience. Please call us to rebook:</p>
            <p style="margin:4px 0">Phone: <a href="tel:+441895810648" style="color:#D32F2F;font-weight:bold">+44 1895 810648</a></p>
          </div>
        </div>
      `,
    })
    if (error) console.error('[email] customer cancelled failed:', error)
  } catch (err) {
    console.error('[email] customer cancelled failed:', err)
  }
}
