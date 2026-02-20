import React from 'react';
import { MENU_HIGHLIGHTS } from '../constants';
import { MenuItem } from '../types';

interface MenuCardProps {
  item: MenuItem;
}

const MenuCard: React.FC<MenuCardProps> = ({ item }) => (
  <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 group border border-stone-100 flex flex-col h-full">
    <div className="h-56 overflow-hidden relative bg-gray-100">
      <img 
        src={item.image} 
        alt={item.name} 
        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-press-dark font-bold text-sm shadow-sm">
        {item.price}
      </div>
    </div>
    <div className="p-6 flex flex-col flex-grow">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-bold text-press-dark font-sans">{item.name}</h3>
      </div>
      <p className="text-stone-600 text-sm leading-relaxed flex-grow font-serif">{item.description}</p>
      <div className="mt-4 pt-4 border-t border-stone-100 flex justify-between items-center">
        <span className="text-press-red font-bold text-xs uppercase tracking-wider">{item.category}</span>
        {item.isVegetarian && (
          <span className="text-green-600 text-xs font-bold px-2 py-1 bg-green-50 rounded-md">VEGGIE</span>
        )}
      </div>
    </div>
  </div>
);

export const MenuHighlights: React.FC = () => {
  const breakfast = MENU_HIGHLIGHTS.filter(i => i.category === 'Breakfast' || i.category === 'Brunch');
  const pancakes = MENU_HIGHLIGHTS.filter(i => i.category === 'Pancakes');
  const lunch = MENU_HIGHLIGHTS.filter(i => i.category === 'Panini' || i.category === 'Omelettes');

  return (
    <section id="menu" className="py-24 bg-warm-oatmeal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-press-red font-bold uppercase tracking-widest text-sm">Our Kitchen</span>
          <h2 className="text-4xl md:text-5xl font-bold text-press-dark mt-2 mb-6">Menu Highlights</h2>
          <p className="text-stone-600 text-lg max-w-2xl mx-auto font-serif italic">
            A small selection of our favorites. View the full menu in-store for Omelettes, Jackets, and more.
          </p>
        </div>

        <div className="space-y-16">
          {/* Section 1: Breakfast & Brunch */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <h3 className="text-2xl font-bold text-press-dark border-l-4 border-press-red pl-4">Breakfast & Brunch Icons</h3>
              <div className="h-px bg-gray-200 flex-grow"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {breakfast.map(item => <MenuCard key={item.id} item={item} />)}
            </div>
          </div>

          {/* Section 2: Sweet & Savory */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <h3 className="text-2xl font-bold text-press-dark border-l-4 border-press-blue pl-4">Pancakes & Lunch</h3>
              <div className="h-px bg-gray-200 flex-grow"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pancakes.map(item => <MenuCard key={item.id} item={item} />)}
              {lunch.map(item => <MenuCard key={item.id} item={item} />)}
            </div>
          </div>
        </div>

        <div className="mt-20 text-center">
          <button className="bg-press-dark text-white px-8 py-3 rounded-lg font-bold hover:bg-gray-800 transition-colors">
            Visit Us to See Full Menu
          </button>
        </div>
      </div>
    </section>
  );
};