import { apiClient } from '../lib/axios';
import type { Category, Product, ProductDetail } from '../types';

export interface ProductQueryParams {
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  onlyInStock?: boolean;
  sortBy?: 'featured' | 'price-asc' | 'price-desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
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

  getProducts: async (params?: ProductQueryParams): Promise<PaginatedResponse<Product>> => {
    const { data } = await apiClient.get<PaginatedResponse<Product>>('/products', { params });
    return data;
  },

  getProductById: async (id: string): Promise<ProductDetail> => {
    const { data } = await apiClient.get<ProductDetail>(`/products/${id}`);
    return data;
  },

  createOrder: async (payload: CreateOrderPayload) => {
    const { data } = await apiClient.post('/orders', payload);
    return data;
  },
};
