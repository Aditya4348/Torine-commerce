import type { PaginatedResult } from './interfaces/paginated-result.interface.js';
import type { PaginationQueryDto } from './dto/pagination-query.dto.js';

export interface PrismaModelDelegate<T, TArgs = any> {
  findMany: (args?: TArgs) => Promise<T[]>;
  count: (args?: { where?: any }) => Promise<number>;
}

/**
 * Helper pagination reusable untuk Prisma di NestJS.
 *
 * @param model - Model delegate Prisma (misal: this.prisma.product, this.prisma.order, dsb.)
 * @param pagination - Objek { page, limit } dari PaginationQueryDto
 * @param args - Argumen Prisma findMany ({ where, select, include, orderBy })
 */
export async function paginate<
  T,
  TArgs extends { where?: any; select?: any; include?: any; orderBy?: any } = any,
>(
  model: PrismaModelDelegate<T, any>,
  pagination: PaginationQueryDto = {},
  args: TArgs = {} as TArgs,
): Promise<PaginatedResult<T>> {
  const page = Math.max(1, Number(pagination?.page) || 1);
  const limit = Math.max(1, Math.min(100, Number(pagination?.limit) || 10));
  const skip = (page - 1) * limit;

  // Jalankan count dan findMany secara paralel (Promise.all) untuk kecepatan tinggi
  const [total, data] = await Promise.all([
    model.count({ where: args.where }),
    model.findMany({
      ...args,
      skip,
      take: limit,
    }),
  ]);

  const totalPages = Math.ceil(total / limit);

  return {
    data,
    meta: {
      total,
      page,
      limit,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  };
}
