// 1. Category (mendukung versi ringkas di list & lengkap di detail)
export interface Category {
  id: string;
  name: string;
  icon_name: string;
  display_order?: number;
  is_active?: boolean;
  CategoryCount?: number;
}

// 2. ProductImage (mendukung versi ringkas di list & lengkap di detail)
export interface ProductImage {
  image_url: string;
  id?: string;
  product_id?: string;
  display_order?: number;
  is_primary?: boolean;
}

// 3. ProductSpec (sesuai key "specifications" di JSON)
export interface ProductSpec {
  id: string;
  product_id: string;
  spec_label: string;
  spec_value: string;
  display_order: number;
}

// 4. ProductVariant (singular lebih disarankan untuk representasi 1 item array)
export interface ProductVariant {
  id: string;
  product_id: string;
  color_name: string | null;
  color_hex: string | null;
  size_label: string | null;
  sku_variant: string | null;
  stock_quantity: number;
}

// 5. Base Product (untuk response endpoint "Product All")
export interface Product {
  id: string;
  sku: string;
  name: string;
  description: string;
  base_price: number;
  sale_price: number | null; // null jika produk sedang tidak diskon
  is_in_stock: boolean;
  is_popular: boolean;
  is_new: boolean;
  category: Category;
  images: ProductImage[];

  // Properti tambahan jika suatu saat ditambahkan di backend
  rating?: number;
  reviewsCount?: number;
}

// 6. ProductDetail (extends Product untuk response endpoint "Product Detail")
export interface ProductDetail extends Product {
  category_id: string;
  summary: string;
  created_at: string;
  updated_at: string;
  variants: ProductVariant[];
  specifications: ProductSpec[]; // Diperbaiki dari "specs" menjadi "specifications"
}

// 7. View Model untuk kebutuhan UI Component
export interface ProductDetailView {
  id: string;
  sku: string;
  name: string;
  category: Category;
  price: number;
  originalPrice?: number;
  image: string;
  gallery: string[];
  isNew: boolean;
  rating?: number;
  reviewsCount?: number;
  description: string;
  fullDescription?: string;
  inStock: boolean;
  colors: { name: string; hex: string }[];
  variants: ProductVariant[];
  specifications: { label: string; value: string }[];
}

export interface FilterState {
  searchQuery: string;
  selectedCategory: string;
  minPrice: number;
  maxPrice: number;
  onlyInStock: boolean;
  sortBy: "featured" | "price-asc" | "price-desc";
}

export interface ChatMessage {
  id: string;
  sender: "user" | "assistant";
  text: string;
  timestamp: string;
  suggestedProducts?: string[]; // product IDs
}
