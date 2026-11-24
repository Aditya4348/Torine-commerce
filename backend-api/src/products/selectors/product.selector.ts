import { Prisma } from '../../generated/prisma/client.js';

// Selector Ringkas untuk Halaman Katalog / List (findAll)
export const productSummarySelect = {
  id: true,
  sku: true,
  name: true,
  base_price: true,
  sale_price: true,
  is_in_stock: true,
  is_popular: true,
  description: true,
  is_new: true,
  category: {
    select: {
      id: true,
      name: true,
      icon_name: true,
    },
  },
  images: {
    where: { is_primary: true }, // Ambil foto sampul saja
    select: {
      image_url: true,
    },
  },
} satisfies Prisma.ProductSelect;

// Selector Lengkap untuk Halaman Detail (findOne)
export const productDetailSelect = {
  ...productSummarySelect,
  summary: true,
  description: true,
  created_at: true,
  updated_at: true,
  // Timpa selector images agar mengambil seluruh galeri foto
  images: {
    select: {
      id: true,
      image_url: true,
      display_order: true,
      is_primary: true,
    },
    orderBy: { display_order: 'asc' },
  },
  variants: {
    select: {
      id: true,
      color_name: true,
      color_hex: true,
      size_label: true,
      sku_variant: true,
      stock_quantity: true,
    },
  },
  specifications: {
    select: {
      id: true,
      spec_label: true,
      spec_value: true,
      display_order: true,
    },
    orderBy: { display_order: 'asc' },
  },
} satisfies Prisma.ProductSelect;