import React from 'react';
import { Filter, RotateCcw, Star, Check } from 'lucide-react';
import type { Category, FilterState } from '../types';
import { formatRupiah } from '../utils/formatters';

interface FilterSidebarProps {
  categories: Category[];
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
  onResetFilters: () => void;
  totalProductsCount: number;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  categories,
  filters,
  onFilterChange,
  onResetFilters,
  totalProductsCount,
}) => {
  const isFiltered =
    filters.selectedCategory !== 'all' ||
    filters.minPrice > 0 ||
    filters.maxPrice < 3000000 ||
    filters.minRating > 0 ||
    filters.onlyInStock;

  return (
    <aside className="w-full bg-white rounded-2xl border border-neutral-200/80 p-5 shadow-xs sticky top-24 space-y-6 text-left">
      {/* Filter Header */}
      <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-neutral-900" />
          <h3 className="font-bold text-sm tracking-tight text-neutral-900">Filter Produk</h3>
        </div>

        {isFiltered && (
          <button
            onClick={onResetFilters}
            className="flex items-center gap-1 text-[11px] font-medium text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Category Filter */}
      <div className="space-y-3">
        <h4 className="text-xs font-semibold text-neutral-900 uppercase tracking-wider">
          Kategori
        </h4>
        <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1">
          {categories.map((cat) => {
            const isSelected = filters.selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onFilterChange({ selectedCategory: cat.id })}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-neutral-900 text-white font-medium'
                    : 'text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <div
                    className={`w-3.5 h-3.5 rounded border flex items-center justify-center transition-all ${
                      isSelected
                        ? 'border-white bg-white text-neutral-950'
                        : 'border-neutral-300 bg-white'
                    }`}
                  >
                    {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                  </div>
                  <span className="truncate">{cat.name}</span>
                </div>
                {cat.id !== 'all' && (
                  <span
                    className={`text-[10px] ${
                      isSelected ? 'text-neutral-300' : 'text-neutral-400'
                    }`}
                  >
                    ({cat.itemCount})
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="space-y-3 pt-4 border-t border-neutral-100">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-semibold text-neutral-900 uppercase tracking-wider">
            Rentang Harga
          </h4>
          <span className="text-[11px] text-neutral-400">
            s/d {formatRupiah(filters.maxPrice)}
          </span>
        </div>

        <input
          type="range"
          min="100000"
          max="3000000"
          step="50000"
          value={filters.maxPrice}
          onChange={(e) => onFilterChange({ maxPrice: Number(e.target.value) })}
          className="w-full h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-neutral-950"
        />

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <label className="text-[10px] text-neutral-400 block mb-1">Maksimal (Rp)</label>
            <div className="px-2.5 py-1.5 bg-neutral-50 border border-neutral-200 rounded-lg font-mono text-[11px] text-neutral-800">
              {formatRupiah(filters.maxPrice)}
            </div>
          </div>
          <div>
            <label className="text-[10px] text-neutral-400 block mb-1">Minimum (Rp)</label>
            <div className="px-2.5 py-1.5 bg-neutral-50 border border-neutral-200 rounded-lg font-mono text-[11px] text-neutral-500">
              Rp 0
            </div>
          </div>
        </div>
      </div>

      {/* Minimum Rating Filter */}
      <div className="space-y-3 pt-4 border-t border-neutral-100">
        <h4 className="text-xs font-semibold text-neutral-900 uppercase tracking-wider">
          Rating Minimum
        </h4>
        <div className="space-y-1.5">
          {[4.8, 4.5, 4.0, 0].map((rating) => {
            const isSelected = filters.minRating === rating;
            return (
              <button
                key={rating}
                onClick={() => onFilterChange({ minRating: rating })}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-neutral-900 text-white font-medium'
                    : 'text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <Star
                    className={`w-3.5 h-3.5 ${
                      rating > 0
                        ? isSelected
                          ? 'fill-amber-400 text-amber-400'
                          : 'fill-amber-400 text-amber-400'
                        : 'text-neutral-400'
                    }`}
                  />
                  <span>
                    {rating === 0 ? 'Semua Rating' : `${rating} ke atas`}
                  </span>
                </div>
                {isSelected && <Check className="w-3 h-3 text-white" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Availability Filter */}
      <div className="space-y-3 pt-4 border-t border-neutral-100">
        <h4 className="text-xs font-semibold text-neutral-900 uppercase tracking-wider">
          Ketersediaan
        </h4>
        <label className="flex items-center gap-2.5 text-xs text-neutral-700 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={filters.onlyInStock}
            onChange={(e) => onFilterChange({ onlyInStock: e.target.checked })}
            className="w-4 h-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900 cursor-pointer"
          />
          <span>Hanya Stok Tersedia</span>
        </label>
      </div>

      {/* Quick Summary */}
      <div className="pt-4 border-t border-neutral-100">
        <div className="bg-neutral-50 rounded-xl p-3 text-[11px] text-neutral-500 text-center">
          Menampilkan <strong className="text-neutral-900">{totalProductsCount}</strong> barang
        </div>
      </div>
    </aside>
  );
};
