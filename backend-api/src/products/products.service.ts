import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { Product as ProductEntity } from './entities/product.entity.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { promises } from 'node:dns';
import { Prisma } from '../generated/prisma/client.js';
import { productSummarySelect } from './selectors/product.selector.js';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  async findAll(): Promise<ProductEntity[]> {
    const Products = await this.prisma.product.findMany({
      where: {
        is_in_stock: true,
      },
      select: productSummarySelect
    });

    return Products.map((cat) => new ProductEntity(cat));
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
