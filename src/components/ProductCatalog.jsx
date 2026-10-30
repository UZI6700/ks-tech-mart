import React, { useState } from 'react';
import {
  Heart,
  Eye,
  ShoppingCart,
  Star,
  Check,
  SlidersHorizontal,
} from 'lucide-react';
import { CATEGORIES } from '../data/products';

export default function ProductCatalog({
  products,
  selectedCategory,
  onSelectCategory,
  onlyDeals,
  setOnlyDeals,
  wishlistIds,
  onToggleWishlist,
  onAddToCart,
  onQuickView,
}) {
  const [sortBy, setSortBy] = useState('featured');
  const [showAll, setShowAll] = useState(false);
  const [justAddedId, setJustAddedId] = useState(null);

  const filtered = products
    .filter((p) => {
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }
      if (onlyDeals && !p.onSale) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

  const visibleProducts =
    showAll || selectedCategory !== 'all' || onlyDeals
      ? filtered
      : filtered.slice(0, 8);

  const handleAddClick = (product) => {
    onAddToCart(product, 1, product.variants?.[0] || 'Standard');
    setJustAddedId(product.id);
    setTimeout(() => {
      setJustAddedId((curr) => (curr === product.id ? null : curr));
    }, 1100);
  };

  return (
    <section id="shop" className="catalog-section">
      <div className="ks-container">
        <div className="section-head">
          <div>
            <div className="section-eyebrow">BEST SELLERS</div>
            <h2 className="section-title">Top Picks for You</h2>
          </div>

          <button
            type="button"
            className={`neu-btn ${showAll ? 'is-pressed' : ''}`}
            onClick={() => {
              setShowAll((prev) => !prev);
              if (selectedCategory !== 'all' || onlyDeals) {
                onSelectCategory('all');
                setOnlyDeals(false);
              }
            }}
          >
            {showAll ? 'Show Top 8 Picks' : `View All Products (${products.length})`}
          </button>
        </div>

        {/* Neumorphic Filter Pills & Sort Controls */}
        <div className="catalog-controls">
          <div className="filter-pills-rail">
            <button
              type="button"
              className={`filter-pill ${selectedCategory === 'all' && !onlyDeals ? 'active' : ''}`}
              onClick={() => {
                onSelectCategory('all');
                setOnlyDeals(false);
              }}
            >
              All Gadgets
            </button>

            <button
              type="button"
              className={`filter-pill ${onlyDeals ? 'active' : ''}`}
              onClick={() => setOnlyDeals((prev) => !prev)}
            >
              🔥 Hot Deals
            </button>

            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`filter-pill ${selectedCategory === cat.id ? 'active' : ''}`}
                onClick={() =>
                  onSelectCategory(selectedCategory === cat.id ? 'all' : cat.id)
                }
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="sort-select-well">
            <SlidersHorizontal size={14} color="var(--neu-accent)" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort products"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="products-grid">
          {visibleProducts.map((product) => {
            const isWish = wishlistIds.includes(product.id);
            const isAdded = justAddedId === product.id;

            return (
              <article className="product-card" key={product.id}>
                {/* Concave Neumorphic Showcase Dish */}
                <div
                  className="product-stage-well"
                  onClick={() => onQuickView(product)}
                >
                  {product.badge && (
                    <span
                      className={`product-badge-pill ${
                        product.badge === 'New' ? 'is-new' : ''
                      }`}
                    >
                      {product.badge}
                    </span>
                  )}

                  <div
                    className="product-floating-actions"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      type="button"
                      className={`mini-neu-circle ${isWish ? 'is-wishlisted' : ''}`}
                      onClick={() => onToggleWishlist(product.id)}
                      aria-label="Toggle wishlist"
                      title={isWish ? 'Remove from Wishlist' : 'Save to Wishlist'}
                    >
                      <Heart
                        size={15}
                        fill={isWish ? '#ef4444' : 'none'}
                        color={isWish ? '#ef4444' : 'currentColor'}
                      />
                    </button>

                    <button
                      type="button"
                      className="mini-neu-circle"
                      onClick={() => onQuickView(product)}
                      aria-label="Quick view"
                      title="Quick View Specs"
                    >
                      <Eye size={15} />
                    </button>
                  </div>

                  <img src={product.image} alt={product.name} loading="lazy" />
                </div>

                {/* Product Metadata */}
                <div className="product-meta-top">
                  <span className="product-cat-tag">{product.categoryLabel}</span>
                  <span className="product-rating">
                    <Star size={13} fill="#f59e0b" color="#f59e0b" />
                    {product.rating.toFixed(1)}
                    <span style={{ color: 'var(--neu-text-muted)', fontWeight: 500 }}>
                      ({product.reviews})
                    </span>
                  </span>
                </div>

                <h3
                  className="product-title"
                  onClick={() => onQuickView(product)}
                >
                  {product.name}
                </h3>

                <div className="product-spec-chips">
                  {product.specs.slice(0, 2).map((spec) => (
                    <span className="spec-chip" key={spec}>
                      {spec}
                    </span>
                  ))}
                </div>

                <div className="product-bottom-row">
                  <div className="price-stack">
                    <span className="price-current">${product.price}</span>
                    {product.originalPrice > product.price && (
                      <span className="price-old">${product.originalPrice}</span>
                    )}
                  </div>

                  <button
                    type="button"
                    className={`add-cart-neu-btn ${isAdded ? 'is-just-added' : ''}`}
                    onClick={() => handleAddClick(product)}
                  >
                    {isAdded ? (
                      <>
                        <Check size={15} />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart size={15} />
                        <span>Add</span>
                      </>
                    )}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
