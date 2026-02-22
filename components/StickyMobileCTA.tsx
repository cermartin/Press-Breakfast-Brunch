'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ShoppingBag, CalendarDays } from 'lucide-react'
import { BUSINESS_INFO } from '@/lib/constants'

export default function StickyMobileCTA() {
  const [visible, setVisible] = useState(false)
  const [showOrder, setShowOrder] = useState(true)

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 300)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => setShowOrder((p) => !p), 3500)
    return () => clearInterval(timer)
  }, [])

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden safe-bottom">
      <div className="flex gap-3 p-3 bg-gradient-to-t from-black/60 via-black/30 to-transparent pt-8">
        <a
          href={BUSINESS_INFO.deliveryUrl}
          target="_blank"
          rel="noreferrer"
          className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-base transition-all duration-500 shadow-2xl ${
            showOrder
              ? 'bg-press-red text-white scale-100 shadow-red-500/40'
              : 'bg-white/90 text-press-dark scale-95'
          }`}
        >
          <ShoppingBag className="w-5 h-5" />
          Order Now
        </a>
        <Link
          href="/reserve"
          className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-base transition-all duration-500 shadow-2xl ${
            !showOrder
              ? 'bg-press-dark text-white scale-100'
              : 'bg-white/90 text-press-dark scale-95'
          }`}
        >
          <CalendarDays className="w-5 h-5" />
          Reserve
        </Link>
      </div>
    </div>
  )
}
