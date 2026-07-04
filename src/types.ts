export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  category: 'living-room' | 'kitchen' | 'bathroom' | 'full-apartment';
  beforeImage: string;
  afterImage: string;
  duration: string; // e.g., "45 дней"
  cost: number; // in Rubles
  area: number; // in sq. meters
  location: string;
  servicesList: string[];
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  priceFrom: number; // Rubles per m²
  iconName: string;
  features: string[];
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  text: string;
  rating: number;
  date: string;
  avatarUrl: string;
}

export interface ConsultationRequest {
  id: string;
  name: string;
  phone: string;
  email?: string;
  area: number;
  roomCount: number;
  serviceType: 'cosmetic' | 'standard' | 'premium-design';
  estimatedCost?: number;
  createdAt: string;
  status: 'new' | 'contacted' | 'scheduled';
}
