export interface MenuItem {
  id: string;
  name: string;
  description: string;
  category: 'Breakfast' | 'Brunch' | 'Pancakes' | 'Panini' | 'Omelettes';
  price?: string;
  image?: string;
  isVegetarian?: boolean;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role?: string;
}

export interface BusinessInfo {
  phone: string;
  address: string;
  fullAddress: string;
  hours: string;
  deliveryUrl: string; // Placeholder for UberEats/Deliveroo
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}