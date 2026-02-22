import Link from 'next/link'
import { MapPin, Phone, Clock, Instagram, Facebook, Coffee } from 'lucide-react'
import { BUSINESS_INFO } from '@/lib/constants'

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

          {/* Brand */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-press-red rounded-full flex items-center justify-center">
                <Coffee className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold tracking-tight text-white leading-none">PRESS</h3>
                <p className="text-[10px] text-stone-400 uppercase tracking-widest mt-0.5">Breakfast & Brunch</p>
              </div>
            </div>
            <p className="text-stone-400 text-sm leading-relaxed font-serif">
              A cozy neighborhood favourite serving hearty classics and Mediterranean twists in Uxbridge since day one.
            </p>
            <div className="flex gap-3">
              <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-press-red transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" aria-label="Facebook" className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-press-red transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-5">
            <h4 className="text-base font-bold text-white border-b border-stone-700 pb-2">Visit Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-stone-300 text-sm">
                <MapPin className="w-5 h-5 text-press-red shrink-0 mt-0.5" />
                <span>{BUSINESS_INFO.fullAddress}</span>
              </li>
              <li>
                <a
                  href={`tel:${BUSINESS_INFO.phone}`}
                  className="flex items-center gap-3 text-stone-300 text-sm hover:text-white transition-colors"
                >
                  <Phone className="w-5 h-5 text-press-red shrink-0" />
                  {BUSINESS_INFO.phone}
                </a>
              </li>
              <li className="flex items-start gap-3 text-stone-300 text-sm">
                <Clock className="w-5 h-5 text-press-red shrink-0 mt-0.5" />
                <span>Mon & Wed–Sat 7:00–16:30<br />Sun 8:00–16:00<br /><span className="text-press-red font-semibold">Tue Closed</span></span>
              </li>
            </ul>
          </div>

          {/* Links */}
          <div className="space-y-5">
            <h4 className="text-base font-bold text-white border-b border-stone-700 pb-2">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="/#full-menu" className="text-stone-400 hover:text-white transition-colors text-sm">Our Menu</a></li>
              <li><a href="/#about" className="text-stone-400 hover:text-white transition-colors text-sm">About Us</a></li>
              <li>
                <Link href="/reserve" className="text-stone-400 hover:text-white transition-colors text-sm">
                  Reserve a Table
                </Link>
              </li>
              <li><a href={BUSINESS_INFO.mapsUrl} target="_blank" rel="noreferrer" className="text-stone-400 hover:text-white transition-colors text-sm">Get Directions</a></li>
            </ul>
          </div>

          {/* Map embed */}
          <div className="space-y-3">
            <h4 className="text-base font-bold text-white border-b border-stone-700 pb-2">Find Us</h4>
            <div className="h-44 w-full rounded-xl overflow-hidden border border-stone-700">
              <iframe
                title="Press Breakfast & Brunch location"
                src={BUSINESS_INFO.mapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <a
              href={BUSINESS_INFO.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-press-red hover:bg-red-600 text-white font-bold text-sm py-2.5 rounded-lg transition-colors"
            >
              <MapPin className="w-4 h-4" />
              Get Directions
            </a>
          </div>
        </div>

        <div className="border-t border-stone-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-sm text-stone-500">
          <p>&copy; {new Date().getFullYear()} Press Breakfast & Brunch. All rights reserved.</p>
          <p className="text-xs">311 Long Lane, Hillingdon, UB10 9JY</p>
        </div>
      </div>
    </footer>
  )
}
