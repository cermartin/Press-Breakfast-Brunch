import Image from 'next/image'
import { MENU_HIGHLIGHTS } from '@/lib/constants'
import type { MenuItem } from '@/lib/types'

function MenuCard({ item }: { item: MenuItem }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-stone-100 flex flex-col h-full hover:-translate-y-1">
      <div className="h-56 overflow-hidden relative bg-gray-100">
        {item.image && (
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        )}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-press-dark font-bold text-sm shadow-sm">
          {item.price}
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-press-dark">{item.name}</h3>
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
  )
}

export default function MenuHighlights() {
  const breakfast = MENU_HIGHLIGHTS.filter((i) => i.category === 'Breakfast' || i.category === 'Brunch')
  const pancakes = MENU_HIGHLIGHTS.filter((i) => i.category === 'Pancakes')
  const lunch = MENU_HIGHLIGHTS.filter((i) => i.category === 'Panini' || i.category === 'Omelettes')

  return (
    <section id="menu" className="py-24 bg-warm-oatmeal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="section-label">Our Kitchen</span>
          <h2 className="section-title mb-6">Menu Highlights</h2>
          <p className="text-stone-600 text-lg max-w-2xl mx-auto font-serif italic">
            A taste of our favourites. See the Full Menu section for every dish.
          </p>
        </div>

        <div className="space-y-16">
          <div>
            <div className="flex items-center gap-4 mb-8">
              <h3 className="text-2xl font-bold text-press-dark border-l-4 border-press-red pl-4">
                Breakfast & Brunch Icons
              </h3>
              <div className="h-px bg-gray-200 flex-grow" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {breakfast.map((item) => <MenuCard key={item.id} item={item} />)}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-4 mb-8">
              <h3 className="text-2xl font-bold text-press-dark border-l-4 border-press-blue pl-4">
                Pancakes & Lunch
              </h3>
              <div className="h-px bg-gray-200 flex-grow" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pancakes.map((item) => <MenuCard key={item.id} item={item} />)}
              {lunch.map((item) => <MenuCard key={item.id} item={item} />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
