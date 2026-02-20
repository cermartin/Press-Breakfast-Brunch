import React from 'react';
import { ArrowRight, ShoppingBag, Clock, MapPin } from 'lucide-react';
import { BUSINESS_INFO } from '../constants';

interface HeroProps {
  onOpenMenu: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenMenu }) => {
  return (
    <div className="relative bg-white overflow-hidden">
      {/* Abstract Background - subtle shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-warm-oatmeal skew-x-12 transform origin-top-right translate-x-32"></div>
      </div>

      <div className="max-w-7xl mx-auto z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[600px] px-4 sm:px-6 lg:px-8 py-12 lg:py-0">
          {/* Text Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-press-red/10 border border-press-red/20">
              <span className="w-2 h-2 rounded-full bg-press-red animate-pulse"></span>
              <span className="text-press-red font-bold text-xs tracking-wide uppercase">Open Mon-Sat 7:00 & Sun 8:00</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-press-dark leading-tight font-sans">
              Proper <span className="text-press-red">Breakfast.</span><br/>
              Serious <span className="text-press-blue">Brunch.</span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-lg font-serif leading-relaxed">
              From our famous <b>Press Special</b> to the towering <b>Canadian Pancakes</b>. Hillingdon's go-to spot for Halal breakfasts and artisan coffee.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a 
                href={BUSINESS_INFO.deliveryUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-press-red text-white rounded-lg hover:bg-red-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-bold text-lg uppercase tracking-wide"
              >
                <ShoppingBag className="w-5 h-5" />
                Order Delivery
              </a>
              <button 
                onClick={onOpenMenu}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-press-dark border-2 border-press-dark rounded-lg hover:bg-press-dark hover:text-white transition-all font-bold text-lg uppercase tracking-wide"
              >
                View Menu
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            
            <div className="pt-8 flex items-center gap-6 text-sm text-gray-500 font-medium">
               <div className="flex items-center gap-2">
                 <Clock className="w-4 h-4 text-press-blue" />
                 <span>Closed Tuesdays</span>
               </div>
               <div className="flex items-center gap-2">
                 <MapPin className="w-4 h-4 text-press-red" />
                 <span>Uxbridge, UB10 9JY</span>
               </div>
            </div>
          </div>

          {/* Hero Image Grid */}
          <div className="relative hidden lg:block h-full min-h-[500px]">
             {/* Main Plate Image */}
             <div className="absolute top-10 right-10 w-4/5 h-4/5 bg-white rounded-3xl shadow-2xl overflow-hidden transform rotate-2 z-10 border-4 border-white">
                <img 
                  src="https://picsum.photos/800/800?random=12" 
                  alt="Full English Breakfast" 
                  className="w-full h-full object-cover"
                />
                {/* Sticker */}
                <div className="absolute bottom-4 right-4 bg-press-dark text-white px-4 py-2 rounded-lg font-bold shadow-lg">
                  £8.90 Full English
                </div>
             </div>
             {/* Secondary Image */}
             <div className="absolute bottom-20 left-10 w-2/3 h-2/3 bg-white rounded-3xl shadow-xl overflow-hidden transform -rotate-3 z-0 border-4 border-white opacity-90">
                <img 
                  src="https://picsum.photos/600/600?random=13" 
                  alt="Pancakes" 
                  className="w-full h-full object-cover"
                />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};