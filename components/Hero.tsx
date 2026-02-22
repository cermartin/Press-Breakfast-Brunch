'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ShoppingBag, ArrowRight, Clock, MapPin, Phone, Star } from 'lucide-react'
import { BUSINESS_INFO } from '@/lib/constants'

export default function Hero() {
  return (
    <section className="relative bg-white overflow-hidden min-h-[90vh] flex items-center">
      {/* Background texture */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-warm-oatmeal to-warm-latte" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-press-dark/5 [clip-path:polygon(15%_0,100%_0,100%_100%,0%_100%)] hidden lg:block" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* Left: Copy */}
          <div className="space-y-6 z-10">
            {/* Status badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-green-50 border border-green-200">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-green-700 font-bold text-xs tracking-wide uppercase">
                Open Mon & Wed–Sat from 7:00am
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-press-dark leading-[1.05] tracking-tight">
              Proper{' '}
              <span className="text-press-red relative">
                Breakfast.
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" fill="none">
                  <path d="M0 6 Q50 1 100 5 Q150 9 200 4" stroke="#D32F2F" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.4"/>
                </svg>
              </span>
              <br />
              Serious{' '}
              <span className="text-press-blue">Brunch.</span>
            </h1>

            <p className="text-lg text-gray-600 max-w-lg font-serif leading-relaxed">
              From our famous <strong className="text-press-dark">Press Special</strong> to the towering{' '}
              <strong className="text-press-dark">Canadian Pancakes</strong>. Hillingdon&apos;s go-to spot for
              Halal breakfasts, artisan coffee, and weekend brunch done right.
            </p>

            {/* Social proof */}
            <div className="flex items-center gap-3 py-3 px-4 bg-yellow-50 border border-yellow-200 rounded-xl w-fit">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              <span className="font-bold text-gray-800 text-sm">4.9</span>
              <span className="text-gray-500 text-sm">· 241 Google Reviews</span>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={BUSINESS_INFO.deliveryUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-primary text-base"
              >
                <ShoppingBag className="w-5 h-5" />
                Order Delivery
              </a>
              <a
                href="#full-menu"
                className="btn-secondary text-base"
              >
                View Full Menu
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>

            {/* Quick info strip */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-sm text-gray-500">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-press-blue" />
                <span>Closed Tuesdays</span>
              </div>
              <a
                href={`tel:${BUSINESS_INFO.phone}`}
                className="flex items-center gap-1.5 hover:text-press-red transition-colors"
              >
                <Phone className="w-4 h-4 text-press-red" />
                <span>{BUSINESS_INFO.phone}</span>
              </a>
              <a
                href={BUSINESS_INFO.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-press-red transition-colors"
              >
                <MapPin className="w-4 h-4 text-press-red" />
                <span>Uxbridge, UB10 9JY</span>
              </a>
            </div>
          </div>

          {/* Right: Food images */}
          <div className="relative hidden lg:block h-[520px]">
            {/* Main card */}
            <div className="absolute top-8 right-4 w-[75%] h-[70%] bg-white rounded-3xl shadow-2xl overflow-hidden rotate-2 border-4 border-white z-10">
              <Image
                src="/images/full-english.png"
                alt="Full English Breakfast at Press"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 0px, 400px"
              />
              <div className="absolute bottom-4 left-4 bg-press-dark/90 backdrop-blur-sm text-white px-4 py-2 rounded-xl font-bold text-sm shadow-lg">
                Full English · £8.90
              </div>
            </div>

            {/* Secondary card */}
            <div className="absolute bottom-8 left-4 w-[58%] h-[55%] bg-white rounded-3xl shadow-xl overflow-hidden -rotate-2 border-4 border-white z-0 opacity-95">
              <Image
                src="/images/french-toast.png"
                alt="French Toast Biscoff at Press"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 0px, 300px"
              />
              <div className="absolute top-3 right-3 bg-press-red text-white text-xs font-black px-3 py-1 rounded-full shadow">
                BESTSELLER
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute top-4 left-4 z-20 bg-white rounded-2xl shadow-xl p-3 border border-stone-100">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Halal</p>
              <p className="text-sm font-bold text-press-dark">Options Available</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
