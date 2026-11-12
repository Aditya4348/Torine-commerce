import { Exclude } from 'class-transformer';

export class CategoryEntity {
  id: string;
  name: string;
  icon_name: string;
  display_order: number;
  is_active: boolean;
  CategoryCount: number;

  // Sembunyikan _count agar tidak ikut terkirim di JSON response
  @Exclude()
  _count?: {
    products: number;
  };

  constructor(partial: Partial<CategoryEntity>) {
    // Memisahkan Count Untuk kemudian Di Mapping Ke CategoryCount 
    const { _count, ...rest } = partial

    Object.assign(this, rest);
    this.CategoryCount = _count?.products ?? 0; 
  }
}
