import React, { useState } from 'react';
import { Leaf } from 'lucide-react';

interface MenuItem {
  name: string;
  desc?: string;
  price: string;
  veggie?: boolean;
}

interface MenuSection {
  id: string;
  title: string;
  note?: string;
  items: MenuItem[];
}

const SECTIONS: MenuSection[] = [
  {
    id: 'breakfast',
    title: 'Breakfast',
    note: 'Ask for Halal option',
    items: [
      { name: 'Full English', desc: 'Fried eggs, smoked bacon, Cumberland sausage, mushroom, tomato, hash brown, beans and 2 toasts', price: '£8.90' },
      { name: 'Egg Benedict', desc: 'Two poached eggs, bacon or honey ham, toasted brioche bread served with salad with Hollandaise sauce', price: '£9.70' },
      { name: 'Traditional', desc: 'Two eggs, smoked bacon, Cumberland sausage, chips, beans and 2 toasts', price: '£8.00' },
      { name: 'Egg Florentine', desc: 'Two poached eggs, cooked spinach, toasted brioche bread served with salad with Hollandaise sauce', price: '£9.50', veggie: true },
      { name: 'Mrs Pudding', desc: 'Eggs, bacon, Cumberland sausage, black pudding, hash brown, beans and toast', price: '£8.50' },
      { name: 'London', desc: 'Two poached eggs, smoked bacon, mushroom, Cumberland sausage, hash brown, beans and 2 toasts', price: '£9.00' },
      { name: 'Texas', desc: 'Eggs, homemade beef burger, caramelised fried onion, hash brown, Cumberland sausage, beans and 2 toast', price: '£9.50' },
      { name: 'Press Special Breakfast', desc: 'Two poached eggs, smashed avocado, cooked spinach, grilled tomato, mushroom, beans, veggie sausage and sourdough toast', price: '£10.00', veggie: true },
      { name: 'Veggie', desc: 'Two scrambled eggs, hash brown, veggie sausage, grilled tomato, mushrooms, beans and 2 toasts', price: '£8.00', veggie: true },
      { name: 'Kippers with Eggs', desc: 'Kippers, two poached eggs, avocado, tomatoes, mushrooms and 2 toasts', price: '£9.00' },
      { name: 'Mediterranean Breakfast', desc: 'Two scrambled eggs, halloumi, garlic sausage, hummus, olives, feta cheese, tomato, cucumber, honey, filo pastry, sourdough toast and jam', price: '£11.50' },
      { name: 'Egypt Breakfast', desc: 'Two poached eggs, halloumi, garlic sausage, mushrooms, beans, avocado, olives and sourdough toast', price: '£8.50' },
      { name: 'The Iyo Breakfast', desc: 'Two poached eggs, smashed avocado, smoked bacon or chorizo, 2 sourdough toast', price: '£8.50' },
      { name: 'Halal Breakfast', desc: 'Turkey bacon, egg, beef sausage, hash brown, tomatoes, mushrooms, grilled halloumi, beans and 2 toasts', price: '£9.50' },
    ],
  },
  {
    id: 'hot-sandwiches',
    title: 'Hot Sandwiches',
    note: 'All served with freshly cut salad',
    items: [
      { name: 'Bacon Sandwich', price: '£3.50' },
      { name: 'Ham & Cheese', price: '£4.50' },
      { name: 'Rise & Shine', desc: 'Egg, bacon, sausage', price: '£5.00' },
      { name: 'Hash Brown Morning', desc: 'Egg, hash brown, cheese', price: '£4.70' },
      { name: 'Sun Rise', desc: 'Smoked bacon, egg', price: '£4.50' },
      { name: 'The Rush', desc: 'Smoked bacon, Cumberland sausage', price: '£4.50' },
      { name: 'Healthy', desc: 'Mushrooms, cheese, avocado', price: '£5.50', veggie: true },
      { name: 'BLT', desc: 'Bacon, lettuce, tomato, mayo', price: '£4.50' },
      { name: 'Salmon Avocado', desc: 'Toasted sourdough bread, smashed avocado, scrambled eggs and smoked salmon', price: '£11.50' },
      { name: 'Soul of Avocado', desc: 'Toasted sourdough bread topped with 2 poached eggs, turkey bacon or streaky bacon, grilled tomato', price: '£10.00' },
    ],
  },
  {
    id: 'cold-sandwiches',
    title: 'Cold Sandwiches',
    items: [
      { name: 'Scrambled on Toast', desc: 'Served with salad', price: '£5.50' },
      { name: 'Poached on Toast', desc: 'Served with salad', price: '£5.50' },
      { name: 'Bacon & Chicken', desc: 'Lettuce, Caesar sauce', price: '£5.50' },
      { name: 'Chicken with Corn', desc: 'Chicken, mayo, sweetcorn, cucumber', price: '£5.00' },
      { name: 'Chicken & Avocado', desc: 'Chicken, mayo, avocado, crispy bacon, spinach', price: '£5.80' },
      { name: 'Tuna & Mayo', price: '£5.00' },
    ],
  },
  {
    id: 'omelettes',
    title: 'Omelettes',
    note: 'All served with chips and salad',
    items: [
      { name: 'Spanish Omelette', desc: 'Cheese, spinach, mushrooms, peppers, sweetcorn, olives', price: '£9.00', veggie: true },
      { name: 'Stranger Omelette', desc: 'Mixed peppers, onion, mushrooms, cheddar cheese', price: '£9.00', veggie: true },
      { name: 'Hawaiian Omelette', desc: 'Cheddar cheese with ham', price: '£9.00' },
      { name: 'Cheese Omelette', price: '£7.80', veggie: true },
      { name: 'Feta Cheese & Baby Spinach Omelette', price: '£9.00', veggie: true },
      { name: 'Mushroom Cheese & Spinach Omelette', price: '£9.00', veggie: true },
      { name: 'Mexican Omelette', desc: 'Chorizo, chicken, cheese, peppers, jalapeño', price: '£9.00' },
      { name: 'Press Omelette', desc: 'Smoked bacon, onion, mushrooms', price: '£9.50' },
      { name: 'Yummy Yummy Omelette', desc: 'Cumberland sausage, onion, cheese', price: '£9.50' },
      { name: 'Mediterranean Omelette', desc: 'Turkish garlic sausage, cheddar cheese', price: '£9.50' },
    ],
  },
  {
    id: 'paninis',
    title: 'Paninis',
    note: 'All served with crisps and salad',
    items: [
      { name: 'Early Bird', desc: 'Smoked bacon, cheddar cheese, Cumberland sausage', price: '£8.50' },
      { name: 'The Sugan Panini', desc: 'Grilled halloumi, sun-dried tomatoes, olives', price: '£9.30', veggie: true },
      { name: 'Sweety', desc: 'Mozzarella, chicken escalope and sweet chilli', price: '£9.20' },
      { name: 'Mrs Pesto', desc: 'Avocado, cheese, pesto, crispy bacon, cooked spinach', price: '£9.00' },
      { name: 'Bacon Melt', desc: '3 slices of bacon, cheddar cheese', price: '£9.00' },
      { name: 'Crispy', desc: 'Crispy bacon, chicken escalope, mozzarella, mayo', price: '£9.30' },
      { name: 'Tuna Melt', desc: 'Tuna, mayo, mozzarella', price: '£9.50' },
      { name: 'Le Milan', desc: 'Chicken escalope, mozzarella, vegetables', price: '£9.40' },
      { name: 'Turkish Panini', desc: 'Mozzarella, Turkish garlic sausage, tomato, gherkins with ketchup and mayo', price: '£9.50' },
      { name: 'Chorizo Melt', desc: 'Chorizo, cheese and mayo', price: '£9.00' },
      { name: 'Chicken Pesto', desc: 'Grilled chicken, mozzarella, olives, pesto sauce', price: '£9.70' },
    ],
  },
  {
    id: 'pancakes',
    title: 'Pancakes & Sweet',
    items: [
      { name: 'The American Breakfast', desc: '2 pancakes, streaky bacon, fried egg, mix berries, beans & maple syrup', price: '£11.00' },
      { name: 'The Canadian Breakfast', desc: '2 pancakes, scrambled eggs, smoked bacon, Cumberland sausage, hash brown, mix berries and maple syrup', price: '£11.00' },
      { name: 'Pancakes Lover', desc: '2 pancakes, fried egg, smoked bacon, grilled halloumi, smashed avocado, portobello mushrooms, hash brown, beans, mix berries and maple syrup', price: '£12.00' },
      { name: 'French Toast', desc: 'Brioche bread with cinnamon, clotted cream, mix berries and maple syrup', price: '£10.50' },
      { name: 'French Toast Biscoff', desc: 'Brioche bread, nutella, mix berries, banana, cinnamon, biscoff and biscoff sauce', price: '£10.50' },
      { name: 'Santa Free Breeze', desc: 'French toast topped with fresh berries, smoked bacon, Cumberland sausage, hash brown, beans, maple syrup and egg', price: '£10.50' },
      { name: 'Pancake', desc: 'Served with fresh fruits, maple syrup and clotted cream', price: '£10.50', veggie: true },
    ],
  },
  {
    id: 'jacket',
    title: 'Jacket Potatoes',
    note: 'All served with fresh salad and coleslaw',
    items: [
      { name: 'Cheese', price: '£7.00', veggie: true },
      { name: 'Cheese & Baked Beans', price: '£8.00', veggie: true },
      { name: 'Mushroom, Avocado & Melted Cheese', price: '£9.00', veggie: true },
      { name: 'Tuna Mayo & Cheese', price: '£8.00' },
      { name: 'Bolognaise & Cheese', price: '£9.00' },
      { name: 'Grilled Halloumi, Smoked Ham & Avocado', price: '£9.50' },
      { name: 'Smoked Bacon & Melted Cheese', price: '£8.50' },
      { name: 'Grilled Chicken & Cheese', price: '£9.70' },
    ],
  },
];

const OMELETTE_EXTRAS = [
  { name: 'Any meat', price: '£1.50' },
  { name: 'Any vegetables', price: '£1.00' },
];

const TAB_COLORS: Record<string, string> = {
  breakfast: 'bg-press-red text-white',
  'hot-sandwiches': 'bg-amber-600 text-white',
  'cold-sandwiches': 'bg-amber-400 text-press-dark',
  omelettes: 'bg-press-blue text-press-dark',
  paninis: 'bg-press-dark text-white',
  pancakes: 'bg-pink-500 text-white',
  jacket: 'bg-green-700 text-white',
};

const TAB_ACTIVE_RING: Record<string, string> = {
  breakfast: 'ring-press-red',
  'hot-sandwiches': 'ring-amber-600',
  'cold-sandwiches': 'ring-amber-400',
  omelettes: 'ring-press-blue',
  paninis: 'ring-press-dark',
  pancakes: 'ring-pink-500',
  jacket: 'ring-green-700',
};

export const FullMenu: React.FC = () => {
  const [active, setActive] = useState('breakfast');
  const section = SECTIONS.find(s => s.id === active)!;

  return (
    <section id="full-menu" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-press-red font-bold uppercase tracking-widest text-sm">Every dish</span>
          <h2 className="text-4xl md:text-5xl font-bold text-press-dark mt-2 mb-4">Full Menu</h2>
          <p className="text-stone-500 font-serif italic text-lg">Halal options available — just ask your server</p>
        </div>

        {/* Tab Bar */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {SECTIONS.map(s => (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              className={`px-4 py-2 rounded-full font-bold text-sm transition-all shadow-sm
                ${TAB_COLORS[s.id]}
                ${active === s.id ? `ring-4 ring-offset-2 ${TAB_ACTIVE_RING[s.id]} scale-105` : 'opacity-70 hover:opacity-100'}`}
            >
              {s.title}
            </button>
          ))}
        </div>

        {/* Active Section */}
        <div className="bg-warm-oatmeal rounded-3xl p-6 md:p-10 shadow-inner">
          <div className="flex flex-wrap items-baseline gap-4 mb-6 border-b-2 border-stone-200 pb-4">
            <h3 className="text-3xl font-bold text-press-dark">{section.title}</h3>
            {section.note && (
              <span className="text-sm font-medium text-stone-500 italic">{section.note}</span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {section.items.map((item, i) => (
              <div
                key={i}
                className="flex justify-between gap-4 bg-white rounded-xl px-5 py-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-press-dark text-base">{item.name}</span>
                    {item.veggie && (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full">
                        <Leaf className="w-3 h-3" /> V
                      </span>
                    )}
                  </div>
                  {item.desc && (
                    <p className="text-stone-500 text-sm mt-1 font-serif leading-snug">{item.desc}</p>
                  )}
                </div>
                <div className="shrink-0 font-bold text-press-red text-base whitespace-nowrap">{item.price}</div>
              </div>
            ))}
          </div>

          {/* Omelette Extras */}
          {active === 'omelettes' && (
            <div className="mt-8">
              <h4 className="text-lg font-bold text-press-dark mb-3 border-l-4 border-press-blue pl-3">Extras</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {OMELETTE_EXTRAS.map((item, i) => (
                  <div key={i} className="flex justify-between bg-white rounded-xl px-5 py-4 shadow-sm">
                    <span className="font-medium text-press-dark">{item.name}</span>
                    <span className="font-bold text-press-red">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
