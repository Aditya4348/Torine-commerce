import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from './categories.service.js';
import { PrismaService } from '../prisma/prisma.service.js';

describe('CategoriesService', () => {
  let service: CategoriesService;
  const prisma = {
    category: {
      create: vi.fn(),
      findMany: vi.fn(),
      findUnique: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
  };

  beforeEach(async () => {
    vi.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('creates a category and returns a category entity', async () => {
    const category = {
      id: 'shirts',
      name: 'Shirts',
      icon_name: 'Shirt',
      display_order: 0,
      is_active: true,
    };
    prisma.category.create.mockResolvedValue(category);

    await expect(
      service.create({ id: 'shirts', name: 'Shirts' }),
    ).resolves.toEqual(category);
    expect(prisma.category.create).toHaveBeenCalledWith({
      data: { id: 'shirts', name: 'Shirts' },
    });
  });

  it('throws NotFoundException when a category does not exist', async () => {
    prisma.category.findUnique.mockResolvedValue(null);

    await expect(service.findOne('missing')).rejects.toThrow(
      'Kategori dengan id missing tidak ditemukan',
    );
  });

  it('passes the update DTO to Prisma', async () => {
    const category = {
      id: 'shirts',
      name: 'Clothing',
      icon_name: 'Shirt',
      display_order: 0,
      is_active: true,
    };
    prisma.category.update.mockResolvedValue(category);

    await service.update('shirts', { name: 'Clothing' });

    expect(prisma.category.update).toHaveBeenCalledWith({
      where: { id: 'shirts' },
      data: { name: 'Clothing' },
    });
  });
});
