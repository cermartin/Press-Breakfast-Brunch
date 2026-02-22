import { Suspense } from 'react'
import { notFound } from 'next/navigation'

function BookingDoneContent({ searchParams }: { searchParams: { action?: string; name?: string; date?: string; time?: string } }) {
  const { action, name, date, time } = searchParams

  if (action !== 'confirm' && action !== 'cancel') notFound()

  const confirmed = action === 'confirm'

  const fmtDate = (d: string) =>
    new Date(d + 'T12:00:00').toLocaleDateString('en-GB', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    })

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9F9F7] px-4">
      <div className="max-w-sm w-full bg-white rounded-2xl shadow-md overflow-hidden">
        <div className={`px-6 py-8 text-center ${confirmed ? 'bg-green-600' : 'bg-red-700'}`}>
          <div className="text-4xl mb-3">{confirmed ? '✓' : '✕'}</div>
          <h1 className="text-white text-2xl font-bold">
            {confirmed ? 'Booking Confirmed' : 'Booking Cancelled'}
          </h1>
        </div>
        <div className="px-6 py-6 text-center space-y-2">
          {name && <p className="text-xl font-semibold text-[#1A1A1A]">{name}</p>}
          {date && <p className="text-gray-600">{fmtDate(date)}</p>}
          {time && <p className="text-gray-600">{time}</p>}
          <p className="text-sm text-gray-400 pt-2">
            {confirmed
              ? 'The customer has been notified.'
              : 'The customer has been notified.'}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function BookingDonePage({ searchParams }: { searchParams: { action?: string; name?: string; date?: string; time?: string } }) {
  return (
    <Suspense>
      <BookingDoneContent searchParams={searchParams} />
    </Suspense>
  )
}
