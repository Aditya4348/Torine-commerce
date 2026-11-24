import { Test, TestingModule } from '@nestjs/testing';
import { vi } from 'vitest';
import { PrismaService } from '../prisma/prisma.service.js';
import { ProductQueryDto } from './dto/product-query.dto.js';
import { ProductsService } from './products.service.js';

describe('ProductsService', () => {
  let service: ProductsService;
  let findMany: ReturnType<typeof vi.fn>;
  let count: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    findMany = vi.fn().mockResolvedValue([]);
    count = vi.fn().mockResolvedValue(0);

    const prismaMock = {
      product: { findMany, count },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('applies search, category, price, stock, and sort filters', async () => {
    const query = Object.assign(new ProductQueryDto(), {
      page: 2,
      limit: 5,
      search: ' sepatu ',
      category: 'sepatu',
      minPrice: 100000,
      maxPrice: 500000,
      onlyInStock: true,
      sortBy: 'price-asc',
    });

    await service.findAll(query);

    const expectedWhere = expect.objectContaining({
      category_id: 'sepatu',
      is_in_stock: true,
      sale_price: { gte: 100000, lte: 500000 },
      OR: expect.arrayContaining([
        { name: { contains: 'sepatu', mode: 'insensitive' } },
      ]),
    });

    expect(count).toHaveBeenCalledWith({ where: expectedWhere });
    expect(findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expectedWhere,
        orderBy: [{ sale_price: 'asc' }],
        skip: 5,
        take: 5,
      }),
    );
  });

  it('does not force stock filtering when onlyInStock is false', async () => {
    const query = Object.assign(new ProductQueryDto(), {
      onlyInStock: false,
    });

    await service.findAll(query);

    expect(findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: {},
        orderBy: [
          { is_popular: 'desc' },
          { is_new: 'desc' },
          { created_at: 'desc' },
        ],
      }),
    );
  });
});
