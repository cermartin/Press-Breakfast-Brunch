import { notFound } from 'next/navigation'
import { CheckCircle, XCircle } from 'lucide-react'

type Props = {
  searchParams: Promise<{ action?: string; name?: string; date?: string; time?: string }>
}

export default async function BookingDonePage({ searchParams }: Props) {
  const { action, name, date, time } = await searchParams

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
          {confirmed
            ? <CheckCircle className="w-12 h-12 text-white mx-auto mb-3" />
            : <XCircle className="w-12 h-12 text-white mx-auto mb-3" />}
          <h1 className="text-white text-2xl font-bold">
            {confirmed ? 'Booking Confirmed' : 'Booking Cancelled'}
          </h1>
        </div>
        <div className="px-6 py-6 text-center space-y-1">
          {name && <p className="text-xl font-semibold text-[#1A1A1A]">{name}</p>}
          {date && <p className="text-gray-600">{fmtDate(date)}</p>}
          {time && <p className="text-gray-600">{time}</p>}
          <p className="text-sm text-gray-400 pt-3">The customer has been notified.</p>
        </div>
      </div>
    </div>
  )
}
