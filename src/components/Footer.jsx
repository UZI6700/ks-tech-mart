import React from 'react';
import { ArrowUp } from 'lucide-react';
import { CATEGORIES } from '../data/products';

export default function Footer({ onSelectCategory, onOpenUtilityModal }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="site-footer">
      <div className="ks-container">
        <div className="footer-grid">
          {/* Brand Column */}
          <div>
            <div className="brand-logo" style={{ marginBottom: '14px' }}>
              <div className="brand-emblem">KS</div>
              <div className="brand-wordmark">
                <span className="brand-title">KS Tech Mart</span>
                <span className="brand-tag">Neumorphic Electronics</span>
              </div>
            </div>
            <p
              style={{
                fontSize: '0.86rem',
                color: 'var(--neu-text-secondary)',
                lineHeight: 1.65,
                maxWidth: '300px',
                marginBottom: '18px',
              }}
            >
              Upgrade your world with genuine flagship smartphones, studio audio, pro
              laptops, wearables, and next-gen gaming — crafted with tactile Neumorphism
              UI.
            </p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {['VISA', 'Mastercard', 'Apple Pay', 'PayPal'].map((pay) => (
                <span key={pay} className="spec-chip">
                  {pay}
                </span>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <div className="footer-heading">Top Categories</div>
            <ul className="footer-links">
              {CATEGORIES.map((c) => (
                <li key={c.id}>
                  <button
                    type="button"
                    onClick={() => {
                      onSelectCategory(c.id);
                      scrollTo('shop');
                    }}
                  >
                    {c.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <div className="footer-heading">Customer Care</div>
            <ul className="footer-links">
              <li>
                <button type="button" onClick={() => onOpenUtilityModal('track')}>
                  Track Your Order
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onOpenUtilityModal('help')}>
                  Help Center &amp; FAQs
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onOpenUtilityModal('account')}>
                  My VIP Account
                </button>
              </li>
              <li>
                <button type="button" onClick={() => scrollTo('deals')}>
                  Flash Deals (KSTECH20)
                </button>
              </li>
              <li>
                <button type="button" onClick={() => scrollTo('contact')}>
                  30-Day Return Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Store Hours & Back to Top */}
          <div>
            <div className="footer-heading">Flagship Promise</div>
            <div
              className="neu-card"
              style={{ padding: '18px', borderRadius: '20px', marginBottom: '14px' }}
            >
              <div style={{ fontWeight: 700, fontSize: '0.86rem', marginBottom: '4px' }}>
                Free Express Delivery
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--neu-text-muted)' }}>
                Automatically unlocked on all orders over $100 with 100% insured transit.
              </div>
            </div>

            <button
              type="button"
              className="neu-btn"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <ArrowUp size={15} />
              <span>Back to Top</span>
            </button>
          </div>
        </div>

        <div className="neu-groove-h" style={{ marginBottom: '20px' }} />

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
            fontSize: '0.8rem',
            color: 'var(--neu-text-muted)',
          }}
        >
          <span>© 2026 KS Tech Mart. All rights reserved.</span>
          <span>Designed with Tactile Soft-UI Neumorphism Architecture</span>
        </div>
      </div>
    </footer>
  );
}
