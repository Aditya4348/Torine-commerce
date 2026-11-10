import React, { useState } from 'react';
import { Star, Plus, Check, Heart } from 'lucide-react';
import type { Product } from '../types';
import { formatRupiah } from '../utils/formatters';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onSelectProduct?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onSelectProduct,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!product.inStock) return;
    onAddToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1200);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  return (
    <div 
      onClick={() => onSelectProduct?.(product)}
      className="group relative bg-white rounded-2xl border border-neutral-200/80 overflow-hidden flex flex-col hover:shadow-lg hover:shadow-neutral-900/5 hover:border-neutral-300 transition-all duration-300 cursor-pointer"
    >
      {/* Top Image Container */}
      <div className="relative aspect-[4/3] bg-neutral-100 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500 ease-out"
        />

        {/* Badges Overlay */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start z-10 pointer-events-none">
          {discountPercent > 0 && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-neutral-900 text-white shadow-xs">
              -{discountPercent}%
            </span>
          )}
          {product.isNew && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-neutral-800 text-white shadow-xs">
              Baru
            </span>
          )}
          {product.isPopular && !product.isNew && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-neutral-700 text-white shadow-xs">
              Favorit
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-neutral-600 hover:text-rose-600 hover:bg-white shadow-xs transition-colors z-10 cursor-pointer"
          aria-label="Simpan ke Wishlist"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isLiked ? 'fill-rose-500 text-rose-500' : ''
            }`}
          />
        </button>

        {/* Out of stock overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-neutral-950/40 backdrop-blur-[2px] flex items-center justify-center">
            <span className="px-3 py-1 rounded-full bg-neutral-900 text-white text-xs font-semibold tracking-wide">
              Stok Habis
            </span>
          </div>
        )}
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex-1 flex flex-col justify-between text-left">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
              {product.category.replace('-', ' ')}
            </span>
            <div className="flex items-center gap-1 text-neutral-600 font-medium">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-mono text-xs">{product.rating}</span>
              <span className="text-neutral-400 text-[10px]">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <h3 className="text-sm font-semibold text-neutral-900 line-clamp-2 group-hover:text-neutral-700 transition-colors leading-snug">
            {product.name}
          </h3>

          <p className="text-xs text-neutral-500 line-clamp-1 mt-1 font-normal">
            {product.description}
          </p>
        </div>

        {/* Price & Add to Cart button */}
        <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between gap-2">
          <div>
            <div className="text-base font-bold text-neutral-950 font-mono tracking-tight">
              {formatRupiah(product.price)}
            </div>
            {product.originalPrice && (
              <div className="text-[11px] text-neutral-400 line-through font-mono">
                {formatRupiah(product.originalPrice)}
              </div>
            )}
          </div>

          <button
            onClick={handleAdd}
            disabled={!product.inStock}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
              !product.inStock
                ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
                : isAdded
                ? 'bg-emerald-600 text-white scale-95 shadow-sm'
                : 'bg-neutral-950 text-white hover:bg-neutral-800 active:scale-95 shadow-xs'
            }`}
            title="Tambah ke Keranjang"
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span className="hidden sm:inline">Masuk</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                <span className="hidden sm:inline">Beli</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
