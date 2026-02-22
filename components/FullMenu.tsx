'use client'

import { useState } from 'react'
import { Leaf } from 'lucide-react'

interface MenuItemRow {
  name: string
  desc?: string
  price: string
  veggie?: boolean
}

interface MenuSection {
  id: string
  title: string
  emoji: string
  note?: string
  items: MenuItemRow[]
}

const SECTIONS: MenuSection[] = [
  {
    id: 'breakfast',
    title: 'Breakfast',
    emoji: '🍳',
    note: 'Halal options available — just ask',
    items: [
      { name: 'Full English', desc: 'Fried eggs, smoked bacon, Cumberland sausage, mushroom, tomato, hash brown, beans, 2 toasts', price: '£8.90' },
      { name: 'Traditional', desc: '2 eggs, smoked bacon, Cumberland sausage, chips, beans, 2 toasts', price: '£8.00' },
      { name: 'Mrs Pudding', desc: 'Eggs, bacon, Cumberland sausage, black pudding, hash brown, beans, toast', price: '£8.50' },
      { name: 'London', desc: '2 poached eggs, smoked bacon, mushroom, Cumberland sausage, hash brown, beans, 2 toasts', price: '£9.00' },
      { name: 'Texas', desc: 'Eggs, homemade beef burger, caramelised fried onion, hash brown, Cumberland sausage, beans, 2 toast', price: '£9.50' },
      { name: 'Press Special Breakfast', desc: '2 poached eggs, smashed avocado, cooked spinach, grilled tomato, mushroom, beans, veggie sausage, sourdough toast', price: '£10.00', veggie: true },
      { name: 'Veggie', desc: '2 scrambled eggs, hash brown, veggie sausage, grilled tomato, mushrooms, beans, 2 toasts', price: '£8.00', veggie: true },
      { name: 'Egg Florentine', desc: '2 poached eggs, cooked spinach, toasted brioche, Hollandaise sauce', price: '£9.50', veggie: true },
      { name: 'Kippers with Eggs', desc: 'Kippers, 2 poached eggs, avocado, tomatoes, mushrooms, 2 toasts', price: '£9.00' },
      { name: 'Mediterranean Breakfast', desc: '2 scrambled eggs, halloumi, garlic sausage, hummus, olives, feta, tomato, cucumber, honey, filo pastry, sourdough toast, jam', price: '£11.50' },
      { name: 'Egypt Breakfast', desc: '2 poached eggs, halloumi, garlic sausage, mushrooms, beans, avocado, olives, sourdough toast', price: '£8.50' },
      { name: 'The Iyo Breakfast', desc: '2 poached eggs, smashed avocado, smoked bacon or chorizo, 2 sourdough toast', price: '£8.50' },
      { name: 'Halal Breakfast', desc: 'Turkey bacon, egg, beef sausage, hash brown, tomatoes, mushrooms, grilled halloumi, beans, 2 toasts', price: '£9.50' },
    ],
  },
  {
    id: 'brunch',
    title: 'Brunch',
    emoji: '🥑',
    items: [
      { name: 'Egg Royal', desc: 'Poached egg, smoked salmon, brioche', price: '£10.80' },
      { name: 'Egg Benedict', desc: '2 poached eggs, bacon or honey ham, toasted brioche, Hollandaise sauce', price: '£9.70' },
      { name: 'Soul of Avocado', desc: 'Sourdough, 2 poached eggs, turkey or streaky bacon, grilled tomato', price: '£10.00' },
      { name: 'Salmon Avocado', desc: 'Sourdough, smashed avocado, scrambled eggs, smoked salmon', price: '£11.50' },
    ],
  },
  {
    id: 'hot-sandwiches',
    title: 'Hot Sandwiches',
    emoji: '🥪',
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
      { name: 'Salmon Avocado', desc: 'Toasted sourdough, smashed avocado, scrambled eggs, smoked salmon', price: '£11.50' },
      { name: 'Soul of Avocado', desc: 'Sourdough, 2 poached eggs, turkey or streaky bacon, grilled tomato', price: '£10.00' },
    ],
  },
  {
    id: 'omelettes',
    title: 'Omelettes',
    emoji: '🍲',
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
    emoji: '🥖',
    note: 'All served with crisps and salad',
    items: [
      { name: 'Early Bird', desc: 'Smoked bacon, cheddar cheese, Cumberland sausage', price: '£8.50' },
      { name: 'The Sugan Panini', desc: 'Grilled halloumi, sun-dried tomatoes, olives', price: '£9.30', veggie: true },
      { name: 'Sweety', desc: 'Mozzarella, chicken escalope, sweet chilli', price: '£9.20' },
      { name: 'Mrs Pesto', desc: 'Avocado, cheese, pesto, crispy bacon, cooked spinach', price: '£9.00' },
      { name: 'Bacon Melt', desc: '3 slices of bacon, cheddar cheese', price: '£9.00' },
      { name: 'Crispy', desc: 'Crispy bacon, chicken escalope, mozzarella, mayo', price: '£9.30' },
      { name: 'Tuna Melt', desc: 'Tuna, mayo, mozzarella', price: '£9.50' },
      { name: 'Le Milan', desc: 'Chicken escalope, mozzarella, vegetables', price: '£9.40' },
      { name: 'Turkish Panini', desc: 'Mozzarella, Turkish garlic sausage, tomato, gherkins, ketchup, mayo', price: '£9.50' },
      { name: 'Chorizo Melt', desc: 'Chorizo, cheese and mayo', price: '£9.00' },
      { name: 'Chicken Pesto', desc: 'Grilled chicken, mozzarella, olives, pesto sauce', price: '£9.70' },
    ],
  },
  {
    id: 'pancakes',
    title: 'Pancakes & Sweet',
    emoji: '🥞',
    items: [
      { name: 'The American Breakfast', desc: '2 pancakes, streaky bacon, fried egg, berries, beans & maple syrup', price: '£11.00' },
      { name: 'The Canadian Breakfast', desc: '2 pancakes, scrambled eggs, smoked bacon, Cumberland sausage, hash brown, berries, maple syrup', price: '£11.00' },
      { name: 'Pancakes Lover', desc: '2 pancakes, fried egg, bacon, grilled halloumi, smashed avocado, portobello mushrooms, hash brown, beans, berries, maple syrup', price: '£12.00' },
      { name: 'French Toast', desc: 'Brioche bread, cinnamon, clotted cream, berries, maple syrup', price: '£10.50', veggie: true },
      { name: 'French Toast Biscoff', desc: 'Brioche bread, nutella, berries, banana, cinnamon, biscoff', price: '£10.50', veggie: true },
      { name: 'Santa Free Breeze', desc: 'French toast topped with berries, smoked bacon, Cumberland sausage, hash brown, beans, maple syrup and egg', price: '£10.50' },
      { name: 'Pancake', desc: 'Served with fresh fruits, maple syrup and clotted cream', price: '£10.50', veggie: true },
    ],
  },
  {
    id: 'jacket',
    title: 'Jacket Potatoes',
    emoji: '🥔',
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
]

const TAB_COLORS: Record<string, string> = {
  breakfast: 'bg-press-red text-white',
  brunch: 'bg-amber-500 text-white',
  'hot-sandwiches': 'bg-orange-600 text-white',
  'cold-sandwiches': 'bg-amber-300 text-press-dark',
  omelettes: 'bg-press-blue text-press-dark',
  paninis: 'bg-press-dark text-white',
  pancakes: 'bg-pink-500 text-white',
  jacket: 'bg-green-700 text-white',
}

export default function FullMenu() {
  const [active, setActive] = useState('breakfast')
  const section = SECTIONS.find((s) => s.id === active)!

  return (
    <section id="full-menu" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="section-label">Every dish</span>
          <h2 className="section-title mb-4">Full Menu</h2>
          <p className="text-stone-500 font-serif italic text-lg">
            Halal options available — just ask your server
          </p>
        </div>

        {/* Tab Bar — horizontally scrollable on mobile */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-10 scrollbar-hide justify-start lg:justify-center">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full font-bold text-sm transition-all shadow-sm whitespace-nowrap
                ${TAB_COLORS[s.id]}
                ${active === s.id ? 'ring-4 ring-offset-2 ring-black/20 scale-105' : 'opacity-60 hover:opacity-90'}`}
            >
              <span>{s.emoji}</span>
              {s.title}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="bg-warm-oatmeal rounded-3xl p-6 md:p-10 shadow-inner">
          <div className="flex flex-wrap items-baseline gap-4 mb-6 border-b-2 border-stone-200 pb-4">
            <h3 className="text-3xl font-bold text-press-dark">
              {section.emoji} {section.title}
            </h3>
            {section.note && (
              <span className="text-sm font-medium text-stone-500 italic">{section.note}</span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {section.items.map((item, i) => (
              <div
                key={i}
                className="flex justify-between gap-4 bg-white rounded-xl px-5 py-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-press-dark text-[15px]">{item.name}</span>
                    {item.veggie && (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full">
                        <Leaf className="w-3 h-3" /> V
                      </span>
                    )}
                  </div>
                  {item.desc && (
                    <p className="text-stone-500 text-sm mt-0.5 font-serif leading-snug">{item.desc}</p>
                  )}
                </div>
                <div className="shrink-0 font-bold text-press-red text-base whitespace-nowrap self-start pt-0.5">
                  {item.price}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
