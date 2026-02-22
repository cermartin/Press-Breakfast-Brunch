import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function GET() {
  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey || apiKey === 'placeholder') {
    return NextResponse.json({ error: 'RESEND_API_KEY is not set in environment variables' }, { status: 500 })
  }

  const resend = new Resend(apiKey)

  const { data, error } = await resend.emails.send({
    from: 'Press Breakfast & Brunch <onboarding@resend.dev>',
    to: 'emilyjacksn688@gmail.com',
    subject: 'Test email — Press Breakfast & Brunch',
    html: '<p>This is a test email. If you see this, Resend is working correctly.</p>',
  })

  if (error) {
    return NextResponse.json({ success: false, error }, { status: 500 })
  }

  return NextResponse.json({ success: true, data })
}
