import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsString({ message: 'SKU harus berupa string' })
  @IsNotEmpty({ message: 'SKU wajib diisi' })
  @MaxLength(50, { message: 'SKU maksimal 50 karakter' })
  sku!: string;

  @IsString({ message: 'ID kategori harus berupa string' })
  @IsNotEmpty({ message: 'ID kategori wajib diisi' })
  @MaxLength(50, { message: 'ID kategori maksimal 50 karakter' })
  category_id!: string;

  @IsString({ message: 'Nama produk harus berupa string' })
  @IsNotEmpty({ message: 'Nama produk wajib diisi' })
  @MaxLength(255, { message: 'Nama produk maksimal 255 karakter' })
  name!: string;

  @IsOptional()
  @IsString({ message: 'Ringkasan harus berupa string' })
  @MaxLength(500, { message: 'Ringkasan maksimal 500 karakter' })
  summary?: string;

  @IsOptional()
  @IsString({ message: 'Deskripsi harus berupa string' })
  description?: string;

  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'Harga dasar harus berupa angka dengan maksimal 2 angka desimal' })
  @Min(0, { message: 'Harga dasar minimal 0' })
  base_price!: number;

  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'Harga jual harus berupa angka dengan maksimal 2 angka desimal' })
  @Min(0, { message: 'Harga jual minimal 0' })
  sale_price!: number;

  @IsOptional()
  @IsBoolean({ message: 'is_in_stock harus bernilai boolean (true/false)' })
  is_in_stock?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'is_popular harus bernilai boolean (true/false)' })
  is_popular?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'is_new harus bernilai boolean (true/false)' })
  is_new?: boolean;
}
