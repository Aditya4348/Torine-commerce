import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import { AgentFunction } from '@nestjs/ai';
import { z } from 'zod';
import { Prisma } from '../../generated/prisma/client.js';

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
        .describe('ID atau nama kategori (misal: elektronik, fashion-pria, sepatu)'),
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
    const { keyword, categoryId, maxPrice } = input;

    // 1. Beri tipe eksplisit Prisma.ProductWhereInput[] agar TypeScript tidak kehilangan inferensi 'include'
    const andConditions: Prisma.ProductWhereInput[] = [];

    if (keyword) {
      andConditions.push({
        OR: [
          { name: { contains: keyword, mode: 'insensitive' } },
          { summary: { contains: keyword, mode: 'insensitive' } },
          { description: { contains: keyword, mode: 'insensitive' } },
          { category: { name: { contains: keyword, mode: 'insensitive' } } },
        ],
      });
    }

    if (categoryId) {
      andConditions.push({
        category: {
          OR: [
            { id: categoryId },
            { name: { contains: categoryId, mode: 'insensitive' } },
          ],
        },
      });
    }

    // 2. Karena sale_price bertipe Decimal wajib (tidak nullable), cukup bandingkan langsung
    if (maxPrice !== undefined) {
      andConditions.push({
        OR: [
          { sale_price: { lte: maxPrice } },
          { base_price: { lte: maxPrice } },
        ],
      });
    }

    const products = await this.prisma.product.findMany({
      where: andConditions.length > 0 ? { AND: andConditions } : undefined,
      include: {
        category: true,
      },
      take: 5,
    });

    return products.map((p) => ({
      id: p.id,
      name: p.name,
      summary: p.summary,
      category: p.category?.name,
      base_price: Number(p.base_price),
      sale_price: Number(p.sale_price),
      is_in_stock: p.is_in_stock,
    }));
  }
}