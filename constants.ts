import { BusinessInfo, MenuItem, Testimonial } from './types';

export const BUSINESS_INFO: BusinessInfo = {
  phone: "+44 1895 810648",
  address: "311 Long Lane, Hillingdon, Uxbridge",
  fullAddress: "311 Long Lane, Hillingdon, Uxbridge, UB10 9JY",
  hours: "Mon-Sat 7:00-16:30 | Sun 8:00-16:00 | Tue CLOSED",
  mapsUrl: "https://www.google.com/maps/place/Press+Breakfast+%26+Brunch/@51.5513178,-0.4492655,17z/data=!3m1!4b1!4m6!3m5!1s0x48766d53a1de10db:0xfb34649d7bf53171!8m2!3d51.5513178!4d-0.4492655!16s%2Fg%2F11l1f7c0y9",
  mapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2481.874!2d-0.4514528!3d51.5513178!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48766d53a1de10db%3A0xfb34649d7bf53171!2sPress%20Breakfast%20%26%20Brunch!5e0!3m2!1sen!2suk!4v1708609200000!5m2!1sen!2suk",
  deliveryUrl: "https://www.google.com/viewer/chooseprovider?mid=/g/11l1f7c0y9&g2lbs=AIBNGdUa5SBBmWqzrEPC98RLHVwd8i1gF82hy3lWzf-6q5S-az3TIKVZnQnmNI178HSocP3ATLmdVJ6SMl9AX1TkqntJmDJklw%3D%3D&hl=en-GB&gl=uk&fo_m=MfohQo559jFvMUOzJVpjPL1YMfZ3bInYwBDuMfaXTPp5KXh-&utm_source=tactile&gei=GUSYaeucKoSBhbIPnv2J2A0&ei=GUSYaeucKoSBhbIPnv2J2A0&fo_s=OA&opi=79508299&ebb=1&cs=0&foub=mcpp",
};

export const MENU_HIGHLIGHTS: MenuItem[] = [
  // Breakfast & Brunch Stars
  {
    id: '1',
    name: 'Press Special Breakfast',
    description: 'Two poached eggs, smashed avocado, cooked spinach, grilled tomato, mushroom, beans, veggie sausage and sourdough toast.',
    category: 'Breakfast',
    price: '£10.00',
    image: '/images/halal-breakfast.png',
    isVegetarian: true,
  },
  {
    id: '2',
    name: 'Halal Breakfast',
    description: 'Turkey bacon, egg, beef sausage, hash brown, tomatoes, mushrooms, grilled halloumi, beans and 2 toasts.',
    category: 'Breakfast',
    price: '£9.50',
    image: '/images/full-english.png',
  },
  {
    id: '3',
    name: 'Full English',
    description: 'Fried eggs, smoked bacon, Cumberland sausage, mushroom, tomato, hash brown, beans and 2 toasts.',
    category: 'Breakfast',
    price: '£8.90',
    image: '/images/full-english.png',
  },
  {
    id: '4',
    name: 'Soul of Avocado',
    description: 'Toasted sourdough bread topped with 2 poached eggs, turkey bacon or streaky bacon, grilled tomato.',
    category: 'Brunch',
    price: '£10.00',
    image: '/images/egg-benedict.png',
  },
  {
    id: '5',
    name: 'Salmon Avocado',
    description: 'Toasted sourdough bread, smashed avocado, scrambled eggs and smoked salmon.',
    category: 'Brunch',
    price: '£11.50',
    image: '/images/salmon-avocado.png',
  },
  // Sweet Treats
  {
    id: '6',
    name: 'The Canadian Breakfast',
    description: '2 pancakes, scrambled eggs, smoked bacon, Cumberland sausage, hash brown, mix berries and maple syrup.',
    category: 'Pancakes',
    price: '£11.00',
    image: '/images/pancakes.png',
  },
  {
    id: '7',
    name: 'French Toast Biscoff',
    description: 'Brioche bread, nutella, mix berries, banana, cinnamon, biscoff and biscoff sauce.',
    category: 'Pancakes',
    price: '£10.50',
    image: '/images/french-toast.png',
  },
  // Lunch / Panini
  {
    id: '8',
    name: 'Turkish Panini',
    description: 'Mozzarella, Turkish garlic sausage, tomato, gherkins with ketchup and mayo.',
    category: 'Panini',
    price: '£9.50',
    image: '/images/kippers.png',
  },
  {
    id: '9',
    name: 'Mediterranean Omelette',
    description: 'Turkish garlic sausage, cheddar cheese. Served with chips and salad.',
    category: 'Omelettes',
    price: '£9.50',
    image: '/images/egg-benedict.png',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    quote: "The Press Special Breakfast is honestly the best veggie breakfast I've had in Hillingdon. The sourdough is perfect.",
    author: "Elena R.",
    role: "Local Guide",
  },
  {
    id: 't2',
    quote: "Love that they have a proper Halal option with beef sausage and turkey bacon. The portions are massive!",
    author: "Amir K.",
    role: "Regular",
  },
  {
    id: 't3',
    quote: "French Toast Biscoff. That is all you need to know. Life changing.",
    author: "Jessica M.",
    role: "Foodie",
  },
];

export const SYSTEM_INSTRUCTION = `
You are an AI server for "Press Breakfast & Brunch" in Uxbridge.
Your goal is to assist customers based on our REAL menu.

**Opening Hours:**
- Mon-Sat: 7:00 - 16:30
- Sun: 8:00 - 16:00
- TUESDAY: CLOSED

**Menu Items & Ingredients (Source of Truth):**

**BREAKFAST:**
- Full English (£8.90): Fried eggs, smoked bacon, Cumberland sausage, mushroom, tomato, hash brown, beans, 2 toasts.
- Traditional (£8.00): 2 eggs, smoked bacon, Cumberland sausage, chips, beans, 2 toasts.
- Mrs Pudding (£8.50): Eggs, smoked bacon, Cumberland sausage, black pudding, hash brown, beans, toast.
- London (£9.00): 2 poached eggs, smoked bacon, mushroom, Cumberland sausage, hash brown, beans, 2 toasts.
- Texas (£9.50): Eggs, homemade beef burger, caramelised fried onion, hash brown, Cumberland sausage, beans, 2 toast.
- Press Special Breakfast (£10.00): 2 poached eggs, smashed avocado, cooked spinach, grilled tomato, mushroom, beans, veggie sausage, sourdough toast. (Veggie)
- Veggie V (£8.00): 2 scrambled eggs, hash brown, veggie sausage, grilled tomato, mushrooms, beans, 2 toasts.
- Kippers with Eggs (£9.00).
- Mediterranean Breakfast (£11.50): 2 scrambled eggs, halloumi, garlic sausage, hummus, olives, feta cheese, tomato, cucumber, honey, filo pastry, sourdough toast, jam.
- Egypt Breakfast (£8.50): 2 poached eggs, halloumi, garlic sausage, mushrooms, beans, avocado, olives, sourdough toast.
- The Iyo Breakfast (£8.50): 2 poached eggs, smashed avocado, smoked bacon or chorizo, 2 sourdough toast.
- Halal Breakfast (£9.50): Turkey bacon, egg, beef sausage, hash brown, tomatoes, mushrooms, grilled halloumi, beans, 2 toasts.

**BRUNCH:**
- Egg Royal (£10.80): Poached egg, smoked salmon, brioche.
- Egg Benedict (£9.70): Poached eggs, bacon or honey ham, toasted brioche.
- Soul of Avocado (£10.00): Sourdough, 2 poached eggs, turkey or streaky bacon, grilled tomato.
- Salmon Avocado (£11.50): Sourdough, smashed avocado, scrambled eggs, smoked salmon.

**PANCAKES & SWEET:**
- The American Breakfast (£11.00): 2 pancakes, streaky bacon, fried egg, berries, maple syrup.
- The Canadian Breakfast (£11.00): 2 pancakes, scrambled eggs, smoked bacon, Cumberland sausage, hash brown, berries, maple syrup.
- Pancakes Lover (£12.00): 2 pancakes, fried egg, smoked bacon, grilled halloumi, smashed avocado, portobello mushrooms, hash brown, beans, berries, maple syrup.
- French Toast Biscoff (£10.50): Brioche, nutella, berries, banana, cinnamon, biscoff.

**PANINI / LUNCH:**
- Turkish Panini (£9.50): Mozzarella, Turkish garlic sausage, tomato, gherkins, ketchup, mayo.
- Chicken Pesto (£9.70): Grilled chicken, mozzarella, olives, pesto sauce.

**Important Notes:**
- We have Halal options (Halal Breakfast, Turkish Panini, etc).
- We are closed on Tuesdays.
- Address: 311 Long Lane, Hillingdon.

Be helpful, friendly, and concise.
`;