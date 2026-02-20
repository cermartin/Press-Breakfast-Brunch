import React from 'react';
import { MapPin, Phone, Clock, Instagram, Facebook } from 'lucide-react';
import { BUSINESS_INFO } from '../constants';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-charcoal text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand & Intro */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold tracking-tight text-white mb-1">PRESS</h3>
              <p className="text-xs text-stone-400 uppercase tracking-widest">Breakfast & Brunch</p>
            </div>
            <p className="text-stone-300 text-sm leading-relaxed">
              A cozy neighborhood favorite meeting artisan kitchen vibes. Serving hearty classics and fresh Mediterranean twists in Uxbridge.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-terracotta transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-terracotta transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold text-white border-b border-stone-700 pb-2 inline-block">Visit Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-stone-300">
                <MapPin className="w-5 h-5 text-terracotta shrink-0 mt-1" />
                <span>{BUSINESS_INFO.fullAddress}</span>
              </li>
              <li className="flex items-center gap-3 text-stone-300">
                <Phone className="w-5 h-5 text-terracotta shrink-0" />
                <span>{BUSINESS_INFO.phone}</span>
              </li>
              <li className="flex items-start gap-3 text-stone-300">
                <Clock className="w-5 h-5 text-terracotta shrink-0 mt-1" />
                <span>{BUSINESS_INFO.hours}</span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold text-white border-b border-stone-700 pb-2 inline-block">Links</h4>
            <ul className="space-y-2">
              <li><a href="#menu" className="text-stone-300 hover:text-white transition-colors">Our Menu</a></li>
              <li><a href="#about" className="text-stone-300 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-stone-300 hover:text-white transition-colors">Jobs</a></li>
              <li><a href="#" className="text-stone-300 hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Map Embed */}
          <div className="space-y-3">
            <div className="h-48 w-full rounded-xl overflow-hidden border border-stone-700">
              <iframe
                title="Press Breakfast & Brunch location"
                src={BUSINESS_INFO.mapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <a
              href={BUSINESS_INFO.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-press-red hover:bg-red-600 text-white font-bold text-sm py-2.5 rounded-lg transition-colors"
            >
              <MapPin className="w-4 h-4" />
              Get Directions
            </a>
          </div>
        </div>

        <div className="border-t border-stone-800 pt-8 text-center text-sm text-stone-500">
          <p>&copy; {new Date().getFullYear()} Press Breakfast & Brunch. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};