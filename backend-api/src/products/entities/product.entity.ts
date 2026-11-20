import type {
  ProductSpecification,
  ProductVariant,
  ProductImage,
  Category,
  Product as PrismaProduct,
} from '../../generated/prisma/client.js';

export type ProductRelations = Partial<PrismaProduct> & {
  category?: Partial<Category> | null;
  _count?: Record<string, number>;
  images?: Array<Partial<ProductImage>>;
  variants?: Array<Partial<ProductVariant>>;
  specifications?: Array<Partial<ProductSpecification>>;
};

export class Product {
  id!: PrismaProduct['id'];
  sku!: PrismaProduct['sku'];
  category_id?: PrismaProduct['category_id'];
  name!: PrismaProduct['name'];
  summary?: PrismaProduct['summary'];
  description?: PrismaProduct['description'];

  base_price!: number;
  sale_price!: number;

  is_in_stock!: PrismaProduct['is_in_stock'];
  is_popular!: PrismaProduct['is_popular'];
  is_new!: PrismaProduct['is_new'];
  created_at?: PrismaProduct['created_at'];
  updated_at?: PrismaProduct['updated_at'];

  category?: Partial<Category> | null;
  images?: Array<Partial<ProductImage>>;
  variants?: Array<Partial<ProductVariant>>;
  specifications?: Array<Partial<ProductSpecification>>;

  constructor(partial: ProductRelations) {
    Object.assign(this, partial);

    if (partial.base_price !== undefined && partial.base_price !== null) {
      this.base_price = Number(partial.base_price);
    }

    if (partial.sale_price !== undefined && partial.sale_price !== null) {
      this.sale_price = Number(partial.sale_price);
    }
  }
}