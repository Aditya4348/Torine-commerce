// src/categories/dto/create-category.dto.ts
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateCategoryDto {
  @IsString({ message: 'ID kategori harus berupa string' })
  @IsNotEmpty({ message: 'ID kategori wajib diisi' })
  @MaxLength(50, { message: 'ID maksimal 50 karakter' })
  id: string;

  @IsString({ message: 'Nama kategori harus berupa string' })
  @IsNotEmpty({ message: 'Nama kategori wajib diisi' })
  @MaxLength(100, { message: 'Nama kategori maksimal 100 karakter' })
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  icon_name?: string;

  @IsOptional()
  @IsInt({ message: 'Display order harus berupa angka bulat' })
  @Min(0, { message: 'Display order minimal bernilai 0' })
  display_order?: number;

  @IsOptional()
  @IsBoolean({ message: 'is_active harus bernilai boolean (true/false)' })
  is_active?: boolean;
}