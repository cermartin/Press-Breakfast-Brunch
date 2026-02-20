import React from 'react';
import { Quote } from 'lucide-react';
import { TESTIMONIALS } from '../constants';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal">What the Locals Are Saying</h2>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {TESTIMONIALS.map((testimonial, index) => (
            <div 
              key={testimonial.id} 
              className={`flex-1 min-w-[300px] max-w-md bg-stone-50 p-8 rounded-2xl relative ${index === 1 ? 'md:-mt-4 bg-orange-50' : ''}`}
            >
              <Quote className="w-10 h-10 text-terracotta/20 absolute top-4 right-4" />
              <p className="text-lg text-stone-700 font-serif italic mb-6 relative z-10">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-stone-300 flex items-center justify-center text-stone-600 font-bold text-sm">
                  {testimonial.author.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-charcoal text-sm">{testimonial.author}</h4>
                  <p className="text-xs text-stone-500 uppercase tracking-wide">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};