import React, { useState } from 'react';
import { Menu, X, ShoppingBag, MapPin, Phone, Clock, ChefHat, Sparkles, Coffee } from 'lucide-react';
import { Hero } from './components/Hero';
import { MenuHighlights } from './components/MenuHighlights';
import { Features } from './components/Features';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';
import { MenuAssistant } from './components/MenuAssistant';
import { FullMenu } from './components/FullMenu';
import { Location } from './components/Location';
import { BUSINESS_INFO } from './constants';

const App: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-warm-oatmeal">
      {/* Navigation - Dark Theme like Shop Front */}
      <nav className="sticky top-0 z-40 bg-press-dark border-b border-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-24 items-center">
            {/* Logo - Mimicking the signage */}
            <div className="flex-shrink-0 flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-press-dark">
                <Coffee className="h-6 w-6" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-3xl tracking-tight text-white leading-none font-sans">PRESS</span>
                <span className="text-xs uppercase tracking-[0.2em] text-gray-300 font-medium mt-1">Breakfast & Brunch</span>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#full-menu" className="text-gray-300 hover:text-white font-medium transition-colors text-sm uppercase tracking-wide">Menu</a>
              <a href="#about" className="text-gray-300 hover:text-white font-medium transition-colors text-sm uppercase tracking-wide">About</a>
              <a href="#location" className="text-gray-300 hover:text-white font-medium transition-colors text-sm uppercase tracking-wide">Location</a>
              
              <button 
                onClick={() => setIsAssistantOpen(true)}
                className="flex items-center gap-2 bg-press-blue text-press-dark px-5 py-2.5 rounded-full hover:bg-white transition-all shadow-md font-bold text-sm"
              >
                <Sparkles className="w-4 h-4" />
                <span>Ask AI Assistant</span>
              </button>
              
              <a 
                href={BUSINESS_INFO.deliveryUrl}
                target="_blank"
                rel="noreferrer"
                className="bg-press-red text-white px-6 py-2.5 rounded-full hover:bg-red-600 transition-all shadow-md font-bold text-sm tracking-wide"
              >
                ORDER DELIVERY
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMobileMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white focus:outline-none"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-press-dark border-t border-gray-800">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#menu" className="block px-3 py-3 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800">MENU</a>
              <a href="#about" className="block px-3 py-3 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800">ABOUT</a>
              <a href="#location" className="block px-3 py-3 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800">LOCATION</a>
              <button 
                onClick={() => {
                  setIsAssistantOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left flex items-center gap-2 px-3 py-3 rounded-md text-base font-medium text-press-blue hover:bg-gray-800"
              >
                <Sparkles className="w-4 h-4" />
                Ask AI Recommendation
              </button>
              <a href={BUSINESS_INFO.deliveryUrl} className="block w-full text-center mt-4 bg-press-red text-white px-4 py-3 rounded-md font-bold shadow-sm uppercase">
                Order Delivery
              </a>
            </div>
          </div>
        )}
      </nav>

      <main className="flex-grow">
        <Hero onOpenMenu={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })} />
        <Testimonials />
        <MenuHighlights />
        <FullMenu />
        <Features />
        <Location />
      </main>

      <Footer />

      {/* AI Assistant Modal */}
      <MenuAssistant isOpen={isAssistantOpen} onClose={() => setIsAssistantOpen(false)} />
    </div>
  );
};

export default App;