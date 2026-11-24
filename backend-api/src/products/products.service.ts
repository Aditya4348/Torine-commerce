import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { Product as ProductEntity } from './entities/product.entity.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { Prisma } from '../generated/prisma/client.js';
import { productSummarySelect } from './selectors/product.selector.js';
import { PaginatedResult, paginate } from '../common/pagination/index.js';
import { ProductQueryDto } from './dto/product-query.dto.js';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  async findAll(productQuery: ProductQueryDto): Promise<PaginatedResult<ProductEntity>> {
    const where: Prisma.ProductWhereInput = {};
    const search = productQuery.search?.trim();

    if (productQuery.onlyInStock) {
      where.is_in_stock = true;
    }

    if (productQuery.category) {
      where.category_id = productQuery.category;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { sku: { contains: search, mode: 'insensitive' } },
        { summary: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { category: { is: { name: { contains: search, mode: 'insensitive' } } } },
      ];
    }

    if (productQuery.minPrice !== undefined || productQuery.maxPrice !== undefined) {
      where.sale_price = {
        ...(productQuery.minPrice !== undefined ? { gte: productQuery.minPrice } : {}),
        ...(productQuery.maxPrice !== undefined ? { lte: productQuery.maxPrice } : {}),
      };
    }

    const orderBy: Prisma.ProductOrderByWithRelationInput[] =
      productQuery.sortBy === 'price-asc'
        ? [{ sale_price: 'asc' }]
        : productQuery.sortBy === 'price-desc'
          ? [{ sale_price: 'desc' }]
          : [{ is_popular: 'desc' }, { is_new: 'desc' }, { created_at: 'desc' }];

    const result = await paginate(this.prisma.product, productQuery, {
      where,
      orderBy,
      select: productSummarySelect,
    });

    return {
      ...result,
      data: result.data.map((cat) => new ProductEntity(cat)),
    };
  }

  async findOne(id: string): Promise<ProductEntity> {
    // Cari Data id Product
    const product = await this.prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        category: true,
        images: true,
        specifications: true,
        variants: true,
      }
    });

    if (!product) {
      throw new NotFoundException(`product tidak ditemukan`);
    }

    return new ProductEntity(product);
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<ProductEntity> {
    // Ambil data product Dari prisma berdasarkan id Dan update
    try {
      const product = await this.prisma.product.update({
        where: { id },
        data: updateProductDto,
      });

      return new ProductEntity(product);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Produk tidak ditemukan`);
      }

      throw error;
    }
  }

  async remove(id: string): Promise<ProductEntity> {
    try {
      const product = await this.prisma.product.delete({
        where: { id },
      })
      
      return new ProductEntity(product)
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Prodcut tidak ditemukan`);
      }

      throw error;
    }
  }
}

