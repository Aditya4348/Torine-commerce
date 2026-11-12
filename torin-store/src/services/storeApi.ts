import { apiClient } from '../lib/axios';
import type { Category, Product } from '../types';

export interface ProductQueryParams {
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  onlyInStock?: boolean;
  sortBy?: 'featured' | 'price-asc' | 'price-desc' | 'rating';
}

export interface CreateOrderPayload {
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  shippingAddress: string;
  paymentMethod?: string;
  items: {
    productId: string;
    selectedVariant?: string;
    quantity: number;
  }[];
}

export const storeApi = {
  
  getCategories: async (): Promise<Category[]> => {
    const { data } = await apiClient.get<Category[]>('/categories');
    return data;
  },

  getProducts: async (params?: ProductQueryParams): Promise<Product[]> => {
    const { data } = await apiClient.get<Product[]>('/products', { params });
    return data;
  },

  getProductById: async (id: string): Promise<Product> => {
    const { data } = await apiClient.get<Product>(`/products/${id}`);
    return data;
  },

  createOrder: async (payload: CreateOrderPayload) => {
    const { data } = await apiClient.post('/orders', payload);
    return data;
  },
};
