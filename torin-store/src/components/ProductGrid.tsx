import React from 'react';
import { ArrowUpDown, PackageSearch } from 'lucide-react';
import type { Product, FilterState } from '../types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
  onResetFilters: () => void;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  filters,
  onFilterChange,
  onResetFilters,
  onAddToCart,
  onSelectProduct,
}) => {
  return (
    <div className="w-full space-y-4">
      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 sm:px-5 rounded-2xl border border-neutral-200/80 shadow-xs">
        <div className="text-left">
          <p className="text-xs text-neutral-500 font-medium">
            Katalog: <strong className="text-neutral-900 font-bold">{products.length}</strong> produk
            {filters.searchQuery && (
              <span> untuk &ldquo;<span className="text-neutral-900 font-semibold">{filters.searchQuery}</span>&rdquo;</span>
            )}
          </p>
        </div>

        {/* Sort selector */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <ArrowUpDown className="w-3.5 h-3.5 text-neutral-400" />
          <span className="text-xs text-neutral-500 font-medium hidden sm:inline">Urutkan:</span>
          <select
            value={filters.sortBy}
            onChange={(e) => onFilterChange({ sortBy: e.target.value as FilterState['sortBy'] })}
            className="text-xs font-semibold bg-neutral-100 hover:bg-neutral-200/70 text-neutral-800 rounded-xl px-3 py-2 border-none focus:outline-none focus:ring-1 focus:ring-neutral-900 cursor-pointer transition-colors"
          >
            <option value="featured">Koleksi Utama</option>
            <option value="price-asc">Harga: Rendah ke Tinggi</option>
            <option value="price-desc">Harga: Tinggi ke Rendah</option>
            <option value="rating">Rating Tertinggi</option>
          </select>
        </div>
      </div>

      {/* Grid of Products */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onSelectProduct={onSelectProduct}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-3xl border border-dashed border-neutral-300 p-12 text-center space-y-4 my-8">
          <div className="w-14 h-14 mx-auto rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400">
            <PackageSearch className="w-7 h-7 stroke-[1.5]" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-neutral-900">Barang Tidak Ditemukan</h3>
            <p className="text-xs text-neutral-500 max-w-sm mx-auto">
              Tidak ada produk yang cocok dengan kombinasi filter atau kata kunci saat ini.
            </p>
          </div>
          <div>
            <button
              onClick={onResetFilters}
              className="px-5 py-2.5 rounded-full bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800 transition-colors shadow-xs cursor-pointer"
            >
              Kembalikan Filter
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
