import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto.js';
import { UpdateCategoryDto } from './dto/update-category.dto.js';
import { CategoryEntity } from './entities/category.entity.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { Prisma } from '../generated/prisma/client.js';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<CategoryEntity> {
    try {
      const category = await this.prisma.category.create({
        data: createCategoryDto,
      });

      return new CategoryEntity(category);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException(
          `Kategori dengan id ${createCategoryDto.id} sudah digunakan`,
        );
      }

      throw error;
    }
  }

  async findAll(): Promise<CategoryEntity[]> {
    const categories = await this.prisma.category.findMany({
      orderBy: {
        display_order: 'asc',
      },
      where: {
        is_active: true
      },
      include: {
        _count: {
          select: {
            products: true
          }
        }
      }
    });

    return categories.map((cat) => new CategoryEntity(cat));
  }

  async findOne(id: string): Promise<CategoryEntity> {
    const category = await this.prisma.category.findUnique({
      where: {
        id,
      },
    });

    if (!category) {
      throw new NotFoundException(`Kategori dengan id ${id} tidak ditemukan`);
    }

    return new CategoryEntity(category);
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<CategoryEntity> {

    try {
      const category = await this.prisma.category.update({
        where: { id },
        data: updateCategoryDto,
      });

      return new CategoryEntity(category);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Kategori dengan id ${id} tidak ditemukan`);
      }

      throw error;
    }
  }

  async remove(id: string): Promise<CategoryEntity> {
    try {
      const category = await this.prisma.category.delete({
        where: { id },
      });

      return new CategoryEntity(category);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Kategori dengan id ${id} tidak ditemukan`);
      }

      throw error;
    }
  }
}
