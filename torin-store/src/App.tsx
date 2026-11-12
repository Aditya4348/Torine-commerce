import { useState, useMemo } from 'react';
import { CATEGORIES, PRODUCTS } from './data/dummyData';
import type { FilterState, Product } from './types';
import { Header } from './components/Header';
import { Banner } from './components/Banner';
import { CategoryBar } from './components/CategoryBar';
import { FilterSidebar } from './components/FilterSidebar';
import { ProductGrid } from './components/ProductGrid';
import { ProductDetail } from './components/ProductDetail';
import { FloatingAiChat } from './components/FloatingAiChat';
import { CartDrawer, type CartItem } from './components/CartDrawer';
import { Footer } from './components/Footer';
import { SlidersHorizontal } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { storeApi } from './services/storeApi';

const INITIAL_FILTERS: FilterState = {
  searchQuery: '',
  selectedCategory: 'all',
  minPrice: 0,
  maxPrice: 3000000,
  minRating: 0,
  onlyInStock: false,
  sortBy: 'featured',
};

function App() {
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const DataCategory = useQuery({
    queryKey: ["category"],
    queryFn: storeApi.getCategories,
  })

  // Handle filter changes
  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    // If user searches while on a product detail page, go back to catalog to see results
    if (newFilters.searchQuery !== undefined && selectedProduct) {
      setSelectedProduct(null);
    }
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  // Reset filters
  const handleResetFilters = () => {
    setFilters(INITIAL_FILTERS);
  };

  // Cart Management
  const handleAddToCart = (product: Product, quantity: number = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const handleUpdateCartQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartItems]);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Search query check
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesCat = product.category.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesCat) return false;
      }

      // Category check
      if (filters.selectedCategory !== 'all' && product.category !== filters.selectedCategory) {
        return false;
      }

      // Price range check
      if (product.price > filters.maxPrice) {
        return false;
      }

      // Minimum rating check
      if (filters.minRating > 0 && product.rating < filters.minRating) {
        return false;
      }

      // Stock status check
      if (filters.onlyInStock && !product.inStock) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-asc') return a.price - b.price;
      if (filters.sortBy === 'price-desc') return b.price - a.price;
      if (filters.sortBy === 'rating') return b.rating - a.rating;
      // Default: featured
      if (a.isPopular && !b.isPopular) return -1;
      if (!a.isPopular && b.isPopular) return 1;
      return 0;
    });
  }, [filters]);

  const scrollToProducts = () => {
    const el = document.getElementById('products-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#fafaf9] flex flex-col font-sans text-neutral-900 selection:bg-neutral-900 selection:text-white">
      {/* 1. Header with prominent Search & Cart */}
      <Header
        searchQuery={filters.searchQuery}
        onSearchChange={(query) => handleFilterChange({ searchQuery: query })}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onLogoClick={() => {
          setSelectedProduct(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Main Content Area: Switch between Detail Page and Catalog */}
      {selectedProduct ? (
        <ProductDetail
          product={selectedProduct}
          allProducts={PRODUCTS}
          onBack={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
          onSelectProduct={(p) => {
            setSelectedProduct(p);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      ) : (
        <>
          {/* 2. Banner di bawah Header */}
          <Banner onExploreClick={scrollToProducts} />

          {/* 3. Kategori di bawah Banner */}
          <CategoryBar
            categories={DataCategory.data ?? CATEGORIES}
            selectedCategory={filters.selectedCategory}
            onSelectCategory={(categoryId) => handleFilterChange({ selectedCategory: categoryId })}
          />

          {/* 4. Konten Utama: Filter di Kiri, List Barang di Kanan */}
          <main id="products-section" className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
            {/* Mobile Filter Toggle Button */}
            <div className="lg:hidden mb-4">
              <button
                onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white border border-neutral-200 text-xs font-semibold text-neutral-800 shadow-xs hover:bg-neutral-100 transition-colors cursor-pointer"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>{isMobileFilterOpen ? 'Tutup Filter' : 'Buka Filter & Preferensi'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
              {/* Kolom Kiri: Sidebar Filter */}
              <div className={`lg:block ${isMobileFilterOpen ? 'block' : 'hidden'} lg:col-span-1`}>
                <FilterSidebar
                  categories={CATEGORIES}
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onResetFilters={handleResetFilters}
                  totalProductsCount={filteredProducts.length}
                />
              </div>

              {/* Kolom Kanan: List Barang / Grid Produk */}
              <div className="lg:col-span-3">
                <ProductGrid
                  products={filteredProducts}
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onResetFilters={handleResetFilters}
                  onAddToCart={(p) => handleAddToCart(p, 1)}
                  onSelectProduct={(p) => {
                    setSelectedProduct(p);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
              </div>
            </div>
          </main>
        </>
      )}

      {/* 5. Footer */}
      <Footer />

      {/* 6. Floating AI Chat Button (Bottom Right) */}
      <FloatingAiChat
        products={PRODUCTS}
        onSelectProduct={(p) => {
          setSelectedProduct(p);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* 7. Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
      />
    </div>
  );
}

export default App;
