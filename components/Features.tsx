import { Heart, Star, Clock } from 'lucide-react'

export default function Features() {
  return (
    <section id="about" className="py-20 bg-warm-oatmeal relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="section-label">Why Choose Us</span>
          <h2 className="section-title mb-4">What Makes Press Different</h2>
          <div className="w-16 h-1 bg-press-red mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center p-8 bg-white rounded-2xl shadow-sm border border-stone-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <div className="w-16 h-16 bg-sage-light rounded-full flex items-center justify-center mb-6">
              <Heart className="w-8 h-8 text-sage-green fill-sage-green" />
            </div>
            <h3 className="text-xl font-bold text-press-dark mb-3">Halal & Inclusive</h3>
            <p className="text-stone-600 leading-relaxed font-serif">
              Great food is for everyone. Our menu is fully Halal-friendly without compromising on the classic brunch flavors you love.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-8 bg-white rounded-2xl shadow-sm border border-stone-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6">
              <Star className="w-8 h-8 text-terracotta fill-terracotta" />
            </div>
            <h3 className="text-xl font-bold text-press-dark mb-3">Quality First</h3>
            <p className="text-stone-600 leading-relaxed font-serif">
              Top-quality Cumberland Sausages, thick-cut posh smoked bacon, and locally sourced eggs. We don&apos;t cut corners on ingredients.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-8 bg-white rounded-2xl shadow-sm border border-stone-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mb-6">
              <Clock className="w-8 h-8 text-stone-600" />
            </div>
            <h3 className="text-xl font-bold text-press-dark mb-3">Fast & Friendly</h3>
            <p className="text-stone-600 leading-relaxed font-serif">
              Your morning time is precious. Quick turnaround, always served with a genuine smile. Regulars are family here.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
