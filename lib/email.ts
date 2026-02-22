import { Resend } from 'resend'

let _resend: Resend | null = null
function getResend() {
  if (!_resend) _resend = new Resend(process.env.RESEND_API_KEY ?? 'placeholder')
  return _resend
}

const FROM = process.env.RESTAURANT_EMAIL_FROM || 'Press Breakfast & Brunch <onboarding@resend.dev>'
const RESTAURANT_EMAIL = process.env.RESTAURANT_NOTIFY_EMAIL || 'emilyjacksn688@gmail.com'

interface BookingDetails {
  name: string
  phone: string
  email: string
  date: string
  time: string
  guestCount: number
  id: string
}

function formatDate(dateStr: string) {
  return new Date(dateStr + 'T12:00:00').toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

// Email to restaurant owner when a new booking comes in
export async function sendOwnerNewBookingEmail(booking: BookingDetails) {
  if (!RESTAURANT_EMAIL) return

  const { error } = await getResend().emails.send({
    from: FROM,
    to: RESTAURANT_EMAIL,
    subject: `New Reservation — ${booking.name}, ${formatDate(booking.date)} at ${booking.time}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #1A1A1A; padding: 24px; border-radius: 12px 12px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 22px;">🍳 New Reservation Request</h1>
          <p style="color: #aaa; margin: 4px 0 0;">Press Breakfast & Brunch</p>
        </div>
        <div style="background: #f9f9f7; padding: 24px; border-radius: 0 0 12px 12px; border: 1px solid #e5e5e5;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #666; width: 120px;">Name</td><td style="padding: 8px 0; font-weight: bold; color: #1a1a1a;">${booking.name}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;">Phone</td><td style="padding: 8px 0;"><a href="tel:${booking.phone}" style="color: #D32F2F; font-weight: bold;">${booking.phone}</a></td></tr>
            <tr><td style="padding: 8px 0; color: #666;">Email</td><td style="padding: 8px 0;"><a href="mailto:${booking.email}" style="color: #D32F2F;">${booking.email}</a></td></tr>
            <tr><td style="padding: 8px 0; color: #666;">Date</td><td style="padding: 8px 0; font-weight: bold; color: #1a1a1a;">${formatDate(booking.date)}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;">Time</td><td style="padding: 8px 0; font-weight: bold; color: #1a1a1a;">${booking.time}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;">Guests</td><td style="padding: 8px 0; font-weight: bold; color: #1a1a1a;">${booking.guestCount} ${booking.guestCount === 1 ? 'guest' : 'guests'}</td></tr>
          </table>
          <div style="margin-top: 24px; text-align: center;">
            <a href="${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://press-breakfast-brunch.vercel.app'}/admin"
               style="background: #1A1A1A; color: white; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block;">
              Open Admin Dashboard →
            </a>
          </div>
        </div>
      </div>
    `,
  })
  if (error) console.error('[email] sendOwnerNewBookingEmail failed:', error)
}

// Confirmation email to customer when they submit a booking
export async function sendCustomerBookingReceivedEmail(booking: BookingDetails) {
  if (!booking.email) return

  await getResend().emails.send({
    from: FROM,
    to: booking.email,
    subject: `Booking request received — Press Breakfast & Brunch`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #1A1A1A; padding: 24px; border-radius: 12px 12px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 22px;">Thanks, ${booking.name}!</h1>
          <p style="color: #aaa; margin: 4px 0 0;">We've received your reservation request.</p>
        </div>
        <div style="background: #f9f9f7; padding: 24px; border-radius: 0 0 12px 12px; border: 1px solid #e5e5e5;">
          <p style="color: #444; margin-top: 0;">Here's a summary of your request:</p>
          <div style="background: white; border-radius: 8px; padding: 16px; border: 1px solid #e5e5e5;">
            <p style="margin: 6px 0; color: #666;">📅 <strong style="color: #1a1a1a;">${formatDate(booking.date)}</strong></p>
            <p style="margin: 6px 0; color: #666;">🕐 <strong style="color: #1a1a1a;">${booking.time}</strong></p>
            <p style="margin: 6px 0; color: #666;">👥 <strong style="color: #1a1a1a;">${booking.guestCount} ${booking.guestCount === 1 ? 'guest' : 'guests'}</strong></p>
          </div>
          <p style="color: #444; margin-top: 20px;">
            We'll confirm your table shortly. If you need to reach us in the meantime:
          </p>
          <p style="margin: 4px 0;">📞 <a href="tel:+441895810648" style="color: #D32F2F; font-weight: bold;">+44 1895 810648</a></p>
          <p style="margin: 4px 0; color: #666;">📍 311 Long Lane, Hillingdon, Uxbridge, UB10 9JY</p>
          <p style="margin-top: 24px; color: #888; font-size: 13px;">
            Mon & Wed–Sat 7:00–16:30 · Sun 8:00–16:00 · Closed Tuesdays
          </p>
        </div>
      </div>
    `,
  })
}

// Confirmation email to customer when owner accepts their booking
export async function sendCustomerBookingAcceptedEmail(booking: BookingDetails) {
  if (!booking.email) return

  await getResend().emails.send({
    from: FROM,
    to: booking.email,
    subject: `✅ Your table is confirmed — Press Breakfast & Brunch`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #16a34a; padding: 24px; border-radius: 12px 12px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 22px;">✅ You're confirmed, ${booking.name}!</h1>
          <p style="color: rgba(255,255,255,0.8); margin: 4px 0 0;">Your table is booked at Press Breakfast & Brunch.</p>
        </div>
        <div style="background: #f9f9f7; padding: 24px; border-radius: 0 0 12px 12px; border: 1px solid #e5e5e5;">
          <div style="background: white; border-radius: 8px; padding: 16px; border: 1px solid #e5e5e5; margin-bottom: 20px;">
            <p style="margin: 6px 0; color: #666;">📅 <strong style="color: #1a1a1a;">${formatDate(booking.date)}</strong></p>
            <p style="margin: 6px 0; color: #666;">🕐 <strong style="color: #1a1a1a;">${booking.time}</strong></p>
            <p style="margin: 6px 0; color: #666;">👥 <strong style="color: #1a1a1a;">${booking.guestCount} ${booking.guestCount === 1 ? 'guest' : 'guests'}</strong></p>
          </div>
          <p style="margin: 4px 0; color: #444;">📍 <strong>311 Long Lane, Hillingdon, Uxbridge, UB10 9JY</strong></p>
          <p style="margin: 4px 0; color: #666; font-size: 14px;">If your plans change, please let us know:</p>
          <p style="margin: 4px 0;">📞 <a href="tel:+441895810648" style="color: #D32F2F; font-weight: bold;">+44 1895 810648</a></p>
          <div style="margin-top: 24px; text-align: center;">
            <a href="https://www.google.com/maps/place/Press+Breakfast+%26+Brunch/@51.5513178,-0.4492655,17z"
               style="background: #D32F2F; color: white; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block;">
              Get Directions →
            </a>
          </div>
          <p style="margin-top: 24px; color: #888; font-size: 13px; text-align: center;">
            We look forward to seeing you! 🍳
          </p>
        </div>
      </div>
    `,
  })
}

// Cancellation email to customer when owner cancels their booking
export async function sendCustomerBookingCancelledEmail(booking: BookingDetails) {
  if (!booking.email) return

  await getResend().emails.send({
    from: FROM,
    to: booking.email,
    subject: `Your reservation has been cancelled — Press Breakfast & Brunch`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #b91c1c; padding: 24px; border-radius: 12px 12px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 22px;">Reservation Cancelled</h1>
          <p style="color: rgba(255,255,255,0.8); margin: 4px 0 0;">Hi ${booking.name}, unfortunately we've had to cancel your booking.</p>
        </div>
        <div style="background: #f9f9f7; padding: 24px; border-radius: 0 0 12px 12px; border: 1px solid #e5e5e5;">
          <div style="background: white; border-radius: 8px; padding: 16px; border: 1px solid #e5e5e5; margin-bottom: 20px;">
            <p style="margin: 6px 0; color: #666;">📅 <strong style="color: #1a1a1a;">${formatDate(booking.date)}</strong></p>
            <p style="margin: 6px 0; color: #666;">🕐 <strong style="color: #1a1a1a;">${booking.time}</strong></p>
            <p style="margin: 6px 0; color: #666;">👥 <strong style="color: #1a1a1a;">${booking.guestCount} ${booking.guestCount === 1 ? 'guest' : 'guests'}</strong></p>
          </div>
          <p style="color: #444;">
            We&apos;re sorry for any inconvenience. Please call us to rebook or if you have any questions:
          </p>
          <p style="margin: 4px 0;">📞 <a href="tel:+441895810648" style="color: #D32F2F; font-weight: bold;">+44 1895 810648</a></p>
          <p style="margin-top: 20px; color: #888; font-size: 13px;">
            Mon & Wed–Sat 7:00–16:30 · Sun 8:00–16:00 · Closed Tuesdays
          </p>
        </div>
      </div>
    `,
  })
}
