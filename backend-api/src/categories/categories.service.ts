import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto.js';
import { UpdateCategoryDto } from './dto/update-category.dto.js';
import { promises } from 'dns';
import { CategoryEntity } from './entities/category.entity.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { throwError } from 'rxjs';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  create(createCategoryDto: CreateCategoryDto) {
    return 'This action adds a new category';
  }
 

  async findAll(): Promise<CategoryEntity[]> {
    
    const categories = await this.prisma.category.findMany({
      orderBy: {
        display_order: 'asc',
      },
    });

    return categories.map((cat) => new CategoryEntity(cat));
  }

  async findOne(id: string): Promise<CategoryEntity> {
    // Ambil Data category Dari Prisma
    const categories = await this.prisma.category.findUnique({
      where: {
        id
      },
    });

    if(!categories){
      throw new NotFoundException("Kategori dengan id '${id}' tidak ditemukan");
    }

    return new CategoryEntity(categories)
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
