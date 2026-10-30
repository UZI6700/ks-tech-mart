import React from 'react';
import { CATEGORIES } from '../data/products';

export default function CategorySection({ selectedCategory, onSelectCategory }) {
  const handlePick = (catId) => {
    const next = selectedCategory === catId ? 'all' : catId;
    onSelectCategory(next);
    const shopEl = document.getElementById('shop');
    if (shopEl) {
      shopEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="categories" className="categories-section">
      <div className="ks-container">
        <div className="section-head">
          <div>
            <div className="section-eyebrow">SHOP BY CATEGORY</div>
            <h2 className="section-title">Browse Top Electronics</h2>
          </div>

          <button
            type="button"
            className={`neu-btn ${selectedCategory === 'all' ? 'is-pressed' : ''}`}
            onClick={() => {
              onSelectCategory('all');
              const shopEl = document.getElementById('shop');
              if (shopEl) shopEl.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            View All Categories
          </button>
        </div>

        <div className="categories-grid">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <div
                key={cat.id}
                role="button"
                tabIndex={0}
                className={`category-card ${isSelected ? 'is-selected' : ''}`}
                onClick={() => handlePick(cat.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') handlePick(cat.id);
                }}
              >
                <div className="category-well">
                  <img src={cat.image} alt={cat.name} loading="lazy" />
                </div>
                <div className="category-name">{cat.name}</div>
                <div className="category-sub">{cat.subtitle}</div>
                <span className="category-count-chip">{cat.count} Items</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
