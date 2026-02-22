export interface MenuItem {
  id: string
  name: string
  description: string
  category: 'Breakfast' | 'Brunch' | 'Pancakes' | 'Panini' | 'Omelettes'
  price?: string
  image?: string
  isVegetarian?: boolean
}

export interface Testimonial {
  id: string
  quote: string
  author: string
  role?: string
  stars?: number
}

export interface BusinessInfo {
  phone: string
  address: string
  fullAddress: string
  hours: string
  deliveryUrl: string
  mapsUrl: string
  mapsEmbedUrl: string
}

export interface ChatMessage {
  role: 'user' | 'model'
  text: string
}

export interface Reservation {
  id: string
  name: string
  phone: string
  date: string
  time: string
  status: 'pending' | 'accepted' | 'deleted'
  guest_count: number
  created_at: string
}
