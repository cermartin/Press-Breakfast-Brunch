import { MapPin, Clock, Phone, Navigation } from 'lucide-react'
import { BUSINESS_INFO } from '@/lib/constants'

export default function Location() {
  return (
    <section id="location" className="py-24 bg-press-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-press-red font-bold uppercase tracking-widest text-sm">Find Us</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">Come Visit Us</h2>
          <p className="text-stone-400 font-serif italic text-lg">Hillingdon&apos;s favourite breakfast spot</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* Info Cards */}
          <div className="space-y-4">
            <a
              href={BUSINESS_INFO.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-start gap-4 bg-stone-800 hover:bg-stone-700 transition-colors rounded-2xl p-5 group"
            >
              <div className="w-12 h-12 bg-press-red rounded-xl flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-white font-bold mb-1">Address</p>
                <p className="text-stone-400 text-sm leading-relaxed">{BUSINESS_INFO.fullAddress}</p>
                <p className="text-press-red text-xs font-bold mt-2 group-hover:underline">Open in Google Maps →</p>
              </div>
            </a>

            <div className="flex items-start gap-4 bg-stone-800 rounded-2xl p-5">
              <div className="w-12 h-12 bg-press-blue rounded-xl flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6 text-press-dark" />
              </div>
              <div>
                <p className="text-white font-bold mb-2">Opening Hours</p>
                <div className="space-y-1 text-sm text-stone-400">
                  <div className="flex justify-between gap-6">
                    <span>Mon & Wed–Sat</span>
                    <span className="text-white font-medium">7:00–16:30</span>
                  </div>
                  <div className="flex justify-between gap-6">
                    <span>Sunday</span>
                    <span className="text-white font-medium">8:00–16:00</span>
                  </div>
                  <div className="flex justify-between gap-6">
                    <span>Tuesday</span>
                    <span className="text-press-red font-bold">Closed</span>
                  </div>
                </div>
              </div>
            </div>

            <a
              href={`tel:${BUSINESS_INFO.phone}`}
              className="flex items-start gap-4 bg-stone-800 hover:bg-stone-700 transition-colors rounded-2xl p-5 group"
            >
              <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-white font-bold mb-1">Phone</p>
                <p className="text-stone-400 text-sm">{BUSINESS_INFO.phone}</p>
                <p className="text-green-400 text-xs font-bold mt-2 group-hover:underline">Tap to call →</p>
              </div>
            </a>

            <a
              href={BUSINESS_INFO.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-3 w-full bg-press-red hover:bg-red-600 text-white font-bold py-4 rounded-2xl transition-colors shadow-lg"
            >
              <Navigation className="w-5 h-5" />
              Get Directions
            </a>
          </div>

          {/* Map */}
          <div className="lg:col-span-2 rounded-3xl overflow-hidden shadow-2xl border-4 border-stone-700" style={{ height: '420px' }}>
            <iframe
              title="Press Breakfast & Brunch on Google Maps"
              src={BUSINESS_INFO.mapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
