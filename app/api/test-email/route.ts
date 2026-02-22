import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const OWNER_EMAIL = 'martin777cz@gmail.com'
const FROM = 'Press Breakfast & Brunch <onboarding@resend.dev>'
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://press-breakfast-brunch.vercel.app'
const ADMIN_KEY = process.env.ADMIN_SECRET_KEY || ''

export async function GET() {
  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey || apiKey === 'placeholder') {
    return NextResponse.json({ error: 'RESEND_API_KEY is not set' }, { status: 500 })
  }

  const resend = new Resend(apiKey)

  // Test 1: simple plain email to owner
  const simple = await resend.emails.send({
    from: FROM,
    to: OWNER_EMAIL,
    subject: 'Test 1 — simple email',
    html: '<p>Simple test. If you see this, Resend can reach your inbox.</p>',
  })

  // Test 2: same HTML as the real owner notification email
  const confirmUrl = `${SITE_URL}/api/admin/action/test-id/confirm?key=${encodeURIComponent(ADMIN_KEY)}`
  const cancelUrl  = `${SITE_URL}/api/admin/action/test-id/cancel?key=${encodeURIComponent(ADMIN_KEY)}`

  const owner = await resend.emails.send({
    from: FROM,
    to: OWNER_EMAIL,
    subject: `Test 2 — owner notification (New reservation — Test User, Saturday 1 March 2026 at 09:00)`,
    html: `
      <div style="font-family:sans-serif;max-width:580px;margin:0 auto;background:#f9f9f7;border-radius:12px;overflow:hidden;border:1px solid #e5e5e5">
        <div style="background:#1a1a1a;padding:24px">
          <h2 style="color:white;margin:0;font-size:20px">New Reservation Request (TEST)</h2>
        </div>
        <div style="padding:24px">
          <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
            <tr><td style="padding:6px 0;color:#666;width:100px">Name</td><td style="padding:6px 0;font-weight:bold">Test User</td></tr>
            <tr><td style="padding:6px 0;color:#666">Phone</td><td style="padding:6px 0"><a href="tel:+441234567890" style="color:#D32F2F;font-weight:bold">+44 1234 567890</a></td></tr>
            <tr><td style="padding:6px 0;color:#666">Email</td><td style="padding:6px 0">test@example.com</td></tr>
            <tr><td style="padding:6px 0;color:#666">Date</td><td style="padding:6px 0;font-weight:bold">Saturday 1 March 2026</td></tr>
            <tr><td style="padding:6px 0;color:#666">Time</td><td style="padding:6px 0;font-weight:bold">09:00</td></tr>
            <tr><td style="padding:6px 0;color:#666">Guests</td><td style="padding:6px 0;font-weight:bold">2</td></tr>
          </table>
          <div style="display:flex;gap:12px">
            <a href="${confirmUrl}" style="flex:1;display:inline-block;text-align:center;background:#16a34a;color:white;padding:14px 0;border-radius:8px;text-decoration:none;font-weight:bold;font-size:16px">Confirm</a>
            <a href="${cancelUrl}"  style="flex:1;display:inline-block;text-align:center;background:#dc2626;color:white;padding:14px 0;border-radius:8px;text-decoration:none;font-weight:bold;font-size:16px">Cancel</a>
          </div>
        </div>
      </div>
    `,
  })

  return NextResponse.json({
    simpleEmail: {
      success: !simple.error,
      id: simple.data?.id ?? null,
      error: simple.error ?? null,
    },
    ownerEmail: {
      success: !owner.error,
      id: owner.data?.id ?? null,
      error: owner.error ?? null,
    },
    config: {
      apiKeySet: !!apiKey,
      adminKeySet: !!ADMIN_KEY,
      siteUrl: SITE_URL,
      sendingTo: OWNER_EMAIL,
    },
  })
}
