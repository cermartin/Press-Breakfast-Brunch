import { TESTIMONIALS, BUSINESS_INFO } from '@/lib/constants'

function StarRating({ stars }: { stars: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < stars ? 'text-yellow-400' : 'text-stone-600'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" aria-label="Google">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  )
}

export default function Testimonials() {
  return (
    <section className="py-24 bg-press-dark overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-5 py-2 mb-6">
            <GoogleIcon />
            <span className="text-white text-sm font-bold tracking-wide">Google Reviews</span>
          </div>

          <div className="flex flex-col items-center gap-3 mb-6">
            <div className="flex items-end gap-4">
              <span className="text-8xl font-black text-white leading-none">4.9</span>
              <div className="flex flex-col items-start gap-1 pb-3">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} className="w-7 h-7 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-stone-400 text-sm font-medium">Based on 241 Google Reviews</span>
              </div>
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Hillingdon&apos;s Favourite <span className="text-press-red">Breakfast</span>
          </h2>
          <p className="text-stone-400 text-lg font-serif italic max-w-xl mx-auto">
            Don&apos;t take our word for it — here&apos;s what our regulars say every week.
          </p>
        </div>

        {/* Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {TESTIMONIALS.map((t, index) => (
            <div
              key={t.id}
              className={`relative bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-4 hover:bg-white/8 transition-colors ${
                index === 0 ? 'border-yellow-400/30 bg-yellow-400/5' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <StarRating stars={t.stars ?? 5} />
                <GoogleIcon />
              </div>

              <p className="text-stone-200 font-serif italic leading-relaxed flex-grow text-[15px]">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="flex items-center gap-3 pt-2 border-t border-white/10">
                <div className="w-9 h-9 rounded-full bg-press-red flex items-center justify-center text-white font-black text-sm shrink-0">
                  {t.author.charAt(0)}
                </div>
                <div>
                  <p className="text-white font-bold text-sm">{t.author}</p>
                  <p className="text-stone-500 text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href={BUSINESS_INFO.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 bg-white text-press-dark font-bold px-8 py-4 rounded-full hover:bg-stone-100 transition-colors shadow-xl text-base"
          >
            <GoogleIcon />
            See All Reviews on Google
          </a>
        </div>
      </div>
    </section>
  )
}
