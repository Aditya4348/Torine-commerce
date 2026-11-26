import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import { AgentFunction } from '@nestjs/ai';
import { z } from 'zod';

@Injectable()
export class ProductTools {
  constructor(private readonly prisma: PrismaService) {}

  @AgentFunction({
    name: 'search_products',
    description:
      'Mencari daftar produk di toko berdasarkan kata kunci nama, kategori, atau harga maksimal.',
    inputSchema: z.object({
      keyword: z
        .string()
        .optional()
        .describe('Kata kunci nama barang (misal: headphone, kemeja, sepatu)'),
      categoryId: z
        .string()
        .optional()
        .describe('ID kategori (elektronik, fashion-pria, sepatu, dll)'),
      maxPrice: z
        .number()
        .optional()
        .describe('Batas harga maksimal dalam Rupiah'),
    }),
  })
  async searchProducts(input: {
    keyword?: string;
    categoryId?: string;
    maxPrice?: number;
  }) {
    const products = await this.prisma.product.findMany({
      where: {
        is_in_stock: true,
        ...(input.categoryId ? { category_id: input.categoryId } : {}),
        ...(input.maxPrice ? { sale_price: { lte: input.maxPrice } } : {}),
        ...(input.keyword
          ? { name: { contains: input.keyword, mode: 'insensitive' } }
          : {}),
      },
      select: {
        id: true,
        sku: true,
        name: true,
        sale_price: true,
        summary: true,
        variants: {
          select: { color_name: true, size_label: true, stock_quantity: true },
        },
      },
      take: 5,
    });

    return products;
  }
}
