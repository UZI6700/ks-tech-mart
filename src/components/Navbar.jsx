import React, { useState, useRef, useEffect } from 'react';
import {
  Truck,
  MapPin,
  HelpCircle,
  User,
  Search,
  Heart,
  ShoppingCart,
  ChevronDown,
  Sun,
  Moon,
  X,
  Menu,
  Sparkles,
} from 'lucide-react';
import { CATEGORIES } from '../data/products';

export default function Navbar({
  activeNav,
  setActiveNav,
  cartCount,
  cartSubtotal,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenUtilityModal,
  onSelectCategory,
  onQuickView,
  products,
  theme,
  onToggleTheme,
}) {
  const [catOpen, setCatOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [query, setQuery] = useState('');
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setCatOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  const navigateSection = (navKey, elementId) => {
    setActiveNav(navKey);
    setMobileMenuOpen(false);
    setCatOpen(false);
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const searchMatches =
    query.trim().length > 0
      ? products
          .filter(
            (p) =>
              p.name.toLowerCase().includes(query.toLowerCase()) ||
              p.categoryLabel.toLowerCase().includes(query.toLowerCase()) ||
              p.specs.some((s) => s.toLowerCase().includes(query.toLowerCase()))
          )
          .slice(0, 4)
      : [];

  return (
    <>
      {/* Top Utility Strip */}
      <div className="utility-bar">
        <div className="ks-container utility-inner">
          <div className="utility-left">
            <Truck size={14} color="#60a5fa" />
            <span>Free Shipping on Orders Over $100</span>
            {cartSubtotal >= 100 ? (
              <span className="utility-shipping-pill">
                <Sparkles size={11} /> Free Shipping Unlocked
              </span>
            ) : (
              <span className="utility-shipping-pill">
                Add ${Math.max(0, 100 - cartSubtotal)} more to unlock
              </span>
            )}
          </div>

          <div className="utility-links">
            <button
              type="button"
              className="utility-link-btn"
              onClick={() => onOpenUtilityModal('track')}
            >
              <MapPin size={13} />
              <span>Track Order</span>
            </button>
            <button
              type="button"
              className="utility-link-btn"
              onClick={() => onOpenUtilityModal('help')}
            >
              <HelpCircle size={13} />
              <span>Help Center</span>
            </button>
            <button
              type="button"
              className="utility-link-btn"
              onClick={() => onOpenUtilityModal('account')}
            >
              <User size={13} />
              <span>My Account</span>
            </button>

            <button
              type="button"
              className="neu-theme-toggle"
              onClick={onToggleTheme}
              title="Switch Neumorphism Surface Theme"
            >
              <span className="neu-theme-knob">
                {theme === 'ceramic' ? <Sun size={12} /> : <Moon size={12} />}
              </span>
              <span>{theme === 'ceramic' ? 'Ceramic UI' : 'Obsidian UI'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Sticky Neumorphic Header */}
      <header className="site-header">
        <div className="ks-container">
          <div className="header-bar">
            {/* Brand Logo: KS Tech Mart */}
            <a
              href="#home"
              className="brand-logo"
              onClick={(e) => {
                e.preventDefault();
                navigateSection('home', 'home');
              }}
            >
              <div className="brand-emblem" aria-hidden="true">
                KS
              </div>
              <div className="brand-wordmark">
                <span className="brand-title">KS Tech Mart</span>
                <span className="brand-tag">Neumorphic Store</span>
              </div>
            </a>

            {/* Neumorphic Navigation Rail */}
            <nav className="nav-rail" aria-label="Main navigation">
              <button
                type="button"
                className={`nav-item ${activeNav === 'home' ? 'active' : ''}`}
                onClick={() => navigateSection('home', 'home')}
              >
                Home
              </button>
              <button
                type="button"
                className={`nav-item ${activeNav === 'shop' ? 'active' : ''}`}
                onClick={() => {
                  onSelectCategory('all');
                  navigateSection('shop', 'shop');
                }}
              >
                Shop
              </button>

              {/* Categories Dropdown */}
              <div className="cat-dropdown-wrap" ref={dropdownRef}>
                <button
                  type="button"
                  className={`nav-item ${activeNav === 'categories' || catOpen ? 'active' : ''}`}
                  onClick={() => setCatOpen((prev) => !prev)}
                >
                  <span>Categories</span>
                  <ChevronDown
                    size={14}
                    style={{
                      transform: catOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s',
                    }}
                  />
                </button>

                {catOpen && (
                  <div className="cat-popover">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        className="cat-popover-item"
                        onClick={() => {
                          onSelectCategory(cat.id);
                          setCatOpen(false);
                          navigateSection('shop', 'shop');
                        }}
                      >
                        <div className="cat-popover-thumb">
                          <img src={cat.image} alt={cat.name} />
                        </div>
                        <div>
                          <div
                            style={{
                              fontWeight: 700,
                              fontSize: '0.86rem',
                              color: 'var(--neu-text-main)',
                            }}
                          >
                            {cat.name}
                          </div>
                          <div
                            style={{
                              fontSize: '0.72rem',
                              color: 'var(--neu-text-muted)',
                            }}
                          >
                            {cat.subtitle}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                type="button"
                className={`nav-item ${activeNav === 'deals' ? 'active' : ''}`}
                onClick={() => navigateSection('deals', 'deals')}
              >
                Deals
              </button>
              <button
                type="button"
                className={`nav-item ${activeNav === 'about' ? 'active' : ''}`}
                onClick={() => navigateSection('about', 'about')}
              >
                About Us
              </button>
              <button
                type="button"
                className={`nav-item ${activeNav === 'contact' ? 'active' : ''}`}
                onClick={() => navigateSection('contact', 'contact')}
              >
                Contact
              </button>
            </nav>

            {/* Tactile Neumorphic Action Icons */}
            <div className="header-actions">
              <button
                type="button"
                className={`neu-btn-icon ${searchOpen ? 'is-active' : ''}`}
                onClick={() => setSearchOpen((prev) => !prev)}
                aria-label="Toggle Search"
                title="Search Electronics"
              >
                {searchOpen ? <X size={18} /> : <Search size={18} />}
              </button>

              <button
                type="button"
                className="neu-btn-icon"
                onClick={onOpenWishlist}
                aria-label="Wishlist"
                title="Saved Wishlist"
              >
                <Heart
                  size={18}
                  fill={wishlistCount > 0 ? '#ef4444' : 'none'}
                  color={wishlistCount > 0 ? '#ef4444' : 'currentColor'}
                />
                {wishlistCount > 0 && (
                  <span className="action-badge">{wishlistCount}</span>
                )}
              </button>

              <button
                type="button"
                className="neu-btn-icon"
                onClick={onOpenCart}
                aria-label="Shopping Cart"
                title="View Cart"
              >
                <ShoppingCart size={18} />
                {cartCount > 0 && <span className="action-badge">{cartCount}</span>}
              </button>

              <button
                type="button"
                className={`neu-btn-icon mobile-only-menu ${mobileMenuOpen ? 'is-active' : ''}`}
                onClick={() => setMobileMenuOpen((p) => !p)}
                aria-label="Mobile menu"
              >
                <Menu size={18} />
              </button>
            </div>
          </div>

          {/* Expandable Inset Neumorphic Live Search Bar */}
          {searchOpen && (
            <div className="search-Ribbon">
              <div className="search-input-wrap">
                <Search size={18} color="var(--neu-accent)" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search KS Tech Mart — try 'iPhone 16 Pro', 'ANC Headphones', 'MacBook', 'Drone'..."
                />
                {query && (
                  <button
                    type="button"
                    className="neu-btn"
                    style={{ padding: '5px 11px', fontSize: '0.75rem' }}
                    onClick={() => setQuery('')}
                  >
                    Clear
                  </button>
                )}
              </div>

              {query.trim().length > 0 && (
                <div className="search-live-results">
                  {searchMatches.length === 0 ? (
                    <div
                      style={{
                        gridColumn: '1 / -1',
                        padding: '12px',
                        color: 'var(--neu-text-muted)',
                        fontSize: '0.88rem',
                      }}
                    >
                      No electronics matched &ldquo;{query}&rdquo;. Try another keyword!
                    </div>
                  ) : (
                    searchMatches.map((item) => (
                      <div
                        key={item.id}
                        className="cat-popover-item"
                        onClick={() => {
                          onQuickView(item);
                          setSearchOpen(false);
                        }}
                      >
                        <div className="cat-popover-thumb">
                          <img src={item.image} alt={item.name} />
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <div
                            style={{
                              fontWeight: 700,
                              fontSize: '0.84rem',
                              color: 'var(--neu-text-main)',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            {item.shortName}
                          </div>
                          <div
                            style={{
                              fontSize: '0.78rem',
                              fontWeight: 700,
                              color: 'var(--neu-accent)',
                            }}
                          >
                            ${item.price}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          )}

          {/* Mobile Nav Drawer */}
          {mobileMenuOpen && (
            <div
              className="neu-card"
              style={{
                marginTop: '14px',
                padding: '14px',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
              }}
            >
              {[
                ['home', 'Home', 'home'],
                ['shop', 'Shop', 'shop'],
                ['categories', 'Categories', 'categories'],
                ['deals', 'Deals', 'deals'],
                ['about', 'About Us', 'about'],
                ['contact', 'Contact', 'contact'],
              ].map(([key, label, target]) => (
                <button
                  key={key}
                  type="button"
                  className={`neu-btn ${activeNav === key ? 'is-pressed' : ''}`}
                  onClick={() => navigateSection(key, target)}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      </header>
    </>
  );
}
