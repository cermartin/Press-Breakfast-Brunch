import React from 'react';
import { Heart, Star, Clock } from 'lucide-react';

export const Features: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-warm-oatmeal relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">Why We Are Different</h2>
          <div className="w-16 h-1 bg-terracotta mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Feature 1 */}
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm border border-stone-100 h-full hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-sage-light rounded-full flex items-center justify-center mb-6 text-sage-green">
              <Heart className="w-8 h-8 fill-current" />
            </div>
            <h3 className="text-xl font-bold text-charcoal mb-3">Halal & Inclusive</h3>
            <p className="text-stone-600 leading-relaxed">
              We believe great food is for everyone. Our menu is fully Halal-friendly without compromising on the classic brunch flavors you love.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm border border-stone-100 h-full hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6 text-terracotta">
              <Star className="w-8 h-8 fill-current" />
            </div>
            <h3 className="text-xl font-bold text-charcoal mb-3">Quality First</h3>
            <p className="text-stone-600 leading-relaxed">
              Top-quality Cumberland Sausages, thick-cut posh smoked bacon, and locally sourced eggs. We don't cut corners on ingredients.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm border border-stone-100 h-full hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-stone-200 rounded-full flex items-center justify-center mb-6 text-stone-600">
              <Clock className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-charcoal mb-3">Fast & Friendly</h3>
            <p className="text-stone-600 leading-relaxed">
              We know your morning time is precious. Experience quick turnaround times for busy mornings, always served with a smile.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};