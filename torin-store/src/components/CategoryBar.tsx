import React from 'react';
import { 
  LayoutGrid, 
  Laptop, 
  Shirt, 
  Sparkles, 
  Watch, 
  Footprints, 
  Armchair 
} from 'lucide-react';
import type { Category } from '../types';

interface CategoryBarProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

export const CategoryBar: React.FC<CategoryBarProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  // Helper to get matching icon for each category
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Laptop':
        return <Laptop className="w-4 h-4" />;
      case 'Shirt':
        return <Shirt className="w-4 h-4" />;
      case 'Sparkles':
        return <Sparkles className="w-4 h-4" />;
      case 'Watch':
        return <Watch className="w-4 h-4" />;
      case 'Footprints':
        return <Footprints className="w-4 h-4" />;
      case 'Armchair':
        return <Armchair className="w-4 h-4" />;
      default:
        return <LayoutGrid className="w-4 h-4" />;
    }
  };

  return (
    <section className="w-full bg-white border-b border-neutral-200/80 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-3">
          <div className="text-left">
            <h2 className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
              Kategori Pilihan
            </h2>
          </div>
          <span className="text-xs text-neutral-400">
            {categories.length} Kategori Tersedia
          </span>
        </div>

        {/* Scrollable category pills on mobile/tablet */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-neutral-900 text-white shadow-sm ring-2 ring-neutral-900/10 scale-[1.02]'
                    : 'bg-neutral-100/90 text-neutral-700 hover:bg-neutral-200/80 border border-transparent hover:border-neutral-200'
                }`}
              >
                <span className={isSelected ? 'text-white' : 'text-neutral-500'}>
                  {getIcon(cat.icon_name)}
                </span>
                <span>{cat.name}</span>
                {cat.id !== 'all' && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      isSelected
                        ? 'bg-neutral-800 text-neutral-300'
                        : 'bg-neutral-200 text-neutral-600'
                    }`}
                  >
                    {cat.CategoryCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
