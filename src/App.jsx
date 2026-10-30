import React, { useState, useEffect, useCallback } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { PRODUCTS, INITIAL_CART } from './data/products';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import TrustBar from './components/TrustBar';
import CategorySection from './components/CategorySection';
import PromoDealBanner from './components/PromoDealBanner';
import ProductCatalog from './components/ProductCatalog';
import ExperienceAndContact from './components/ExperienceAndContact';
import {
  CartDrawer,
  WishlistDrawer,
  QuickViewModal,
  UtilityModal,
} from './components/DrawersAndModals';
import Footer from './components/Footer';

export default function App() {
  const [theme, setTheme] = useState('ceramic');
  const [activeNav, setActiveNav] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [onlyDeals, setOnlyDeals] = useState(false);

  const [cartItems, setCartItems] = useState(INITIAL_CART);
  const [wishlistIds, setWishlistIds] = useState(['iphone-16-pro-titanium']);

  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [utilityModal, setUtilityModal] = useState(null);
  const [toastMsg, setToastMsg] = useState(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const notify = useCallback((msg) => {
    setToastMsg(msg);
  }, []);

  useEffect(() => {
    if (!toastMsg) return undefined;
    const t = setTimeout(() => setToastMsg(null), 3200);
    return () => clearTimeout(t);
  }, [toastMsg]);

  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const cartSubtotal = cartItems.reduce((acc, item) => {
    const prod = PRODUCTS.find((p) => p.id === item.id);
    return acc + (prod ? prod.price * item.qty : 0);
  }, 0);

  const handleAddToCart = (product, qty = 1, variant = 'Standard') => {
    if (!product) return;
    setCartItems((prev) => {
      const idx = prev.findIndex(
        (x) => x.id === product.id && x.variant === variant
      );
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = { ...updated[idx], qty: updated[idx].qty + qty };
        return updated;
      }
      return [...prev, { id: product.id, qty, variant }];
    });
    notify(`Added ${product.shortName} to your KS Tech Cart`);
  };

  const handleUpdateQty = (id, variant, nextQty) => {
    if (nextQty <= 0) {
      handleRemoveItem(id, variant);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.variant === variant
          ? { ...item, qty: nextQty }
          : item
      )
    );
  };

  const handleRemoveItem = (id, variant) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.id === id && item.variant === variant))
    );
  };

  const handleToggleWishlist = (productId) => {
    const prod = PRODUCTS.find((p) => p.id === productId);
    setWishlistIds((prev) => {
      if (prev.includes(productId)) {
        if (prod) notify(`Removed ${prod.shortName} from Wishlist`);
        return prev.filter((id) => id !== productId);
      }
      if (prod) notify(`Saved ${prod.shortName} to Wishlist`);
      return [...prev, productId];
    });
  };

  const scrollToShop = (dealsOnly = false) => {
    setSelectedCategory('all');
    setOnlyDeals(dealsOnly);
    setActiveNav(dealsOnly ? 'deals' : 'shop');
    const el = document.getElementById('shop');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="ks-app-shell">
      <Navbar
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        cartCount={cartCount}
        cartSubtotal={cartSubtotal}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setCartOpen(true)}
        onOpenWishlist={() => setWishlistOpen(true)}
        onOpenUtilityModal={(type) => setUtilityModal(type)}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setOnlyDeals(false);
        }}
        onQuickView={(prod) => setQuickViewProduct(prod)}
        products={PRODUCTS}
        theme={theme}
        onToggleTheme={() =>
          setTheme((prev) => (prev === 'ceramic' ? 'obsidian' : 'ceramic'))
        }
      />

      <main>
        <HeroSection
          products={PRODUCTS}
          onShopNow={() => scrollToShop(false)}
          onExploreDeals={() => {
            setActiveNav('deals');
            const el = document.getElementById('deals');
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}
          onInspectProduct={(prod) => setQuickViewProduct(prod)}
        />

        <TrustBar />

        <CategorySection
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            setOnlyDeals(false);
          }}
        />

        <PromoDealBanner
          products={PRODUCTS}
          onShopDeals={() => scrollToShop(true)}
          onInspectProduct={(prod) => setQuickViewProduct(prod)}
        />

        <ProductCatalog
          products={PRODUCTS}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onlyDeals={onlyDeals}
          setOnlyDeals={setOnlyDeals}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          onAddToCart={handleAddToCart}
          onQuickView={(prod) => setQuickViewProduct(prod)}
        />

        <ExperienceAndContact onNotify={notify} />
      </main>

      <Footer
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setOnlyDeals(false);
        }}
        onOpenUtilityModal={(type) => setUtilityModal(type)}
      />

      {/* Drawers & Modals */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        products={PRODUCTS}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearCart={() => setCartItems([])}
        onNotify={notify}
      />

      <WishlistDrawer
        isOpen={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        wishlistIds={wishlistIds}
        products={PRODUCTS}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
      />

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        isWishlisted={
          quickViewProduct ? wishlistIds.includes(quickViewProduct.id) : false
        }
        onToggleWishlist={handleToggleWishlist}
      />

      <UtilityModal
        type={utilityModal}
        onClose={() => setUtilityModal(null)}
        onNotify={notify}
      />

      {/* Neumorphic Toast Feedback */}
      {toastMsg && (
        <div className="neu-toast" role="status" aria-live="polite">
          <CheckCircle2 size={18} color="var(--neu-accent)" />
          <span>{toastMsg}</span>
        </div>
      )}
    </div>
  );
}
