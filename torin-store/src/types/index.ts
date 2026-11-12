export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  gallery?: string[];
  isPopular?: boolean;
  isNew?: boolean;
  inStock: boolean;
  description: string;
  fullDescription?: string;
  specs?: ProductSpec[];
  colors?: { name: string; hex: string }[];
  sizes?: string[];
  sku?: string;
}

export interface Category {
  id: string;
  name: string;
  icon_name: string;
  CategoryCount: number;
}

export interface FilterState {
  searchQuery: string;
  selectedCategory: string;
  minPrice: number;
  maxPrice: number;
  minRating: number;
  onlyInStock: boolean;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedProducts?: string[]; // product IDs
}
