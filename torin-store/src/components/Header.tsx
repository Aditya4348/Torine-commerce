import React, { useRef, useEffect } from 'react';
import { Search, ShoppingBag, X } from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  onLogoClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  cartCount,
  onOpenCart,
  onLogoClick,
}) => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut Ctrl+K / Cmd+K to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-200/80 bg-white/90 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <button
          onClick={(e) => {
            e.preventDefault();
            onLogoClick?.();
          }}
          className="flex items-center gap-2.5 text-neutral-900 group cursor-pointer text-left"
        >
          <div className="w-9 h-9 rounded-xl bg-neutral-950 flex items-center justify-center text-white font-bold text-sm tracking-wider group-hover:bg-neutral-800 transition-colors shadow-xs">
            T
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg tracking-tight leading-none text-neutral-950">TORIN</span>
            <span className="text-[9px] tracking-widest text-neutral-400 uppercase font-mono">Store</span>
          </div>
        </button>

        {/* Minimalist Search Bar - Prominent Centerpiece */}
        <div className="flex-1 max-w-2xl relative">
          <div className="relative flex items-center w-full">
            <Search className="absolute left-3.5 w-4 h-4 text-neutral-400 pointer-events-none transition-colors" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Cari headphone, kemeja katun, jam tangan, sneakers..."
              className="w-full pl-10 pr-20 py-2.5 bg-neutral-100 hover:bg-neutral-200/60 focus:bg-white text-neutral-900 placeholder:text-neutral-400 text-xs rounded-full border border-transparent focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900 transition-all font-sans"
            />
            
            {searchQuery ? (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 p-1 text-neutral-400 hover:text-neutral-700 rounded-full transition-colors cursor-pointer"
                title="Hapus pencarian"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            ) : (
              <div className="absolute right-3 hidden sm:flex items-center gap-1 text-[10px] font-mono font-medium text-neutral-400 bg-neutral-200/60 px-1.5 py-0.5 rounded-md pointer-events-none">
                Ctrl K
              </div>
            )}
          </div>
        </div>

        {/* Right Action: Minimal Cart Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenCart}
            className="relative flex items-center justify-center w-10 h-10 rounded-full text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 transition-colors cursor-pointer"
            aria-label="Keranjang Belanja"
          >
            <ShoppingBag className="w-4.5 h-4.5 stroke-[1.8]" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-4.5 px-1 bg-neutral-950 text-white text-[10px] font-mono font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
