'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Coffee, Sparkles, CalendarDays } from 'lucide-react'
import { BUSINESS_INFO } from '@/lib/constants'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [aiOpen, setAiOpen] = useState(false)

  return (
    <>
      <nav className="sticky top-0 z-40 bg-press-dark border-b border-white/10 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-press-red rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Coffee className="h-5 w-5 text-white" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-bold text-2xl tracking-tight text-white leading-none">PRESS</span>
                <span className="text-[10px] uppercase tracking-[0.25em] text-gray-400 font-medium">Breakfast & Brunch</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-6">
              <a href="/#full-menu" className="text-gray-300 hover:text-white font-medium transition-colors text-sm uppercase tracking-wide">Menu</a>
              <a href="/#about" className="text-gray-300 hover:text-white font-medium transition-colors text-sm uppercase tracking-wide">About</a>
              <a href="/#location" className="text-gray-300 hover:text-white font-medium transition-colors text-sm uppercase tracking-wide">Location</a>

              <Link
                href="/reserve"
                className="flex items-center gap-2 border border-white/20 text-white px-4 py-2 rounded-full hover:border-white/50 transition-all text-sm font-medium"
              >
                <CalendarDays className="w-4 h-4" />
                Reserve
              </Link>

              <a
                href={BUSINESS_INFO.deliveryUrl}
                target="_blank"
                rel="noreferrer"
                className="bg-press-red text-white px-5 py-2.5 rounded-full hover:bg-red-600 transition-all shadow-md font-bold text-sm tracking-wide"
              >
                ORDER DELIVERY
              </a>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-white"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile panel */}
        {mobileOpen && (
          <div className="md:hidden bg-press-dark border-t border-white/10 px-4 py-4 space-y-1">
            <a
              href="/#full-menu"
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 font-medium uppercase tracking-wide text-sm"
            >
              Menu
            </a>
            <a
              href="/#about"
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 font-medium uppercase tracking-wide text-sm"
            >
              About
            </a>
            <a
              href="/#location"
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 font-medium uppercase tracking-wide text-sm"
            >
              Location
            </a>
            <Link
              href="/reserve"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 px-3 py-3 rounded-lg text-press-blue hover:bg-white/5 font-medium text-sm"
            >
              <CalendarDays className="w-4 h-4" />
              Reserve a Table
            </Link>
            <div className="pt-2 pb-1 space-y-2">
              <a
                href={BUSINESS_INFO.deliveryUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center w-full bg-press-red text-white px-4 py-3 rounded-xl font-bold uppercase tracking-wide"
              >
                Order Delivery
              </a>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}
