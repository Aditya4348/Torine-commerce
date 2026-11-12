import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  storeApi,
  type CreateOrderPayload,
  type ProductQueryParams,
} from '../services/storeApi';

export const storeKeys = {
  all: ['store'] as const,
  categories: () => [...storeKeys.all, 'categories'] as const,
  products: (params?: ProductQueryParams) =>
    [...storeKeys.all, 'products', params ?? {}] as const,
  productDetail: (id: string) => [...storeKeys.all, 'product', id] as const,
};

export function useCategoriesQuery() {
  return useQuery({
    queryKey: storeKeys.categories(),
    queryFn: storeApi.getCategories,
  });
}

export function useProductsQuery(params?: ProductQueryParams) {
  return useQuery({
    queryKey: storeKeys.products(params),
    queryFn: () => storeApi.getProducts(params),
  });
}

export function useProductDetailQuery(id: string) {
  return useQuery({
    queryKey: storeKeys.productDetail(id),
    queryFn: () => storeApi.getProductById(id),
    enabled: Boolean(id),
  });
}

export function useCreateOrderMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateOrderPayload) => storeApi.createOrder(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: storeKeys.all });
    },
  });
}
