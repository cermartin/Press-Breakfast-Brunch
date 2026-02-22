import type { Metadata, Viewport } from 'next'
import { DM_Sans, Lora } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import StickyMobileCTA from '@/components/StickyMobileCTA'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#D32F2F',
}

export const metadata: Metadata = {
  title: 'Press Breakfast & Brunch | Uxbridge, Hillingdon',
  description:
    "Uxbridge's favourite breakfast spot. Halal-friendly, artisan coffee, full English, pancakes and epic brunch at 311 Long Lane, Hillingdon UB10 9JY. Open Mon & Wed–Sat 7am.",
  keywords: [
    'breakfast Uxbridge',
    'brunch Hillingdon',
    'halal breakfast Uxbridge',
    'full English Uxbridge',
    'Press Breakfast Brunch',
    'cafe Uxbridge',
    'eggs benedict Uxbridge',
  ],
  openGraph: {
    title: 'Press Breakfast & Brunch | Uxbridge',
    description:
      "The best breakfast in Uxbridge. Halal-friendly. Full English, Eggs Benedict, Pancakes and more. 311 Long Lane, UB10 9JY.",
    type: 'website',
    locale: 'en_GB',
  },
  robots: { index: true, follow: true },
}

const restaurantJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  name: 'Press Breakfast & Brunch',
  image: '/images/storefront.png',
  description:
    "Uxbridge's favourite breakfast and brunch spot. Halal options available.",
  address: {
    '@type': 'PostalAddress',
    streetAddress: '311 Long Lane',
    addressLocality: 'Hillingdon, Uxbridge',
    postalCode: 'UB10 9JY',
    addressCountry: 'GB',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 51.5513178,
    longitude: -0.4492655,
  },
  telephone: '+441895810648',
  priceRange: '££',
  servesCuisine: ['British', 'Mediterranean', 'Breakfast', 'Brunch'],
  hasMenu: 'https://pressbreakfastbrunch.co.uk/#full-menu',
  acceptsReservations: true,
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '07:00',
      closes: '16:30',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Sunday'],
      opens: '08:00',
      closes: '16:00',
    },
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '241',
    bestRating: '5',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${lora.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantJsonLd) }}
        />
      </head>
      <body className="font-sans">
        <Navbar />
        {children}
        <StickyMobileCTA />
      </body>
    </html>
  )
}
