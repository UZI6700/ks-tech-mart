import React, { useState, useEffect } from 'react';
import {
  X,
  Trash2,
  ShoppingBag,
  Heart,
  Star,
  CheckCircle2,
  Tag,
  Package,
  ShieldCheck,
  Truck,
  ArrowRight,
} from 'lucide-react';

export function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  products,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
  onNotify,
}) {
  const [promoInput, setPromoInput] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState('cart'); // 'cart' | 'form' | 'done'
  const [customer, setCustomer] = useState({
    name: '',
    email: '',
    address: '',
  });
  const [orderNumber, setOrderNumber] = useState('KS-88421');

  useEffect(() => {
    if (!isOpen) {
      setCheckoutStep('cart');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const detailed = cartItems
    .map((ci) => {
      const prod = products.find((p) => p.id === ci.id);
      return prod ? { ...ci, product: prod } : null;
    })
    .filter(Boolean);

  const subtotal = detailed.reduce((sum, i) => sum + i.product.price * i.qty, 0);
  const discount = promoApplied ? Math.round(subtotal * 0.2) : 0;
  const shipping = subtotal === 0 || subtotal >= 100 ? 0 : 12;
  const total = Math.max(0, subtotal - discount + shipping);
  const progressPct = Math.min(100, Math.round((subtotal / 100) * 100));

  const applyPromo = (codeStr) => {
    const clean = (codeStr ?? promoInput).trim().toUpperCase();
    if (clean === 'KSTECH20') {
      setPromoApplied(true);
      setPromoInput('KSTECH20');
      onNotify('Promo code KSTECH20 applied — 20% off unlocked!');
    } else {
      onNotify('Try code KSTECH20 for 20% VIP savings!');
    }
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const generated = `KS-${Math.floor(10000 + Math.random() * 89999)}`;
    setOrderNumber(generated);
    setCheckoutStep('done');
    onClearCart();
    onNotify(`Order ${generated} confirmed! Express dispatch scheduled.`);
  };

  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <aside className="neu-drawer" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '18px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div className="trust-icon-well" style={{ width: 40, height: 40 }}>
              <ShoppingBag size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.12rem', fontWeight: 800 }}>
                {checkoutStep === 'done'
                  ? 'Order Confirmed'
                  : checkoutStep === 'form'
                  ? 'Express Checkout'
                  : 'Your Tech Cart'}
              </h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--neu-text-muted)' }}>
                {detailed.reduce((s, x) => s + x.qty, 0)} items selected
              </span>
            </div>
          </div>

          <button type="button" className="neu-btn-icon" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        {checkoutStep === 'cart' && (
          <div
            className="neu-well-sm"
            style={{ padding: '12px 14px', marginBottom: '18px' }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.76rem',
                fontWeight: 700,
                marginBottom: '7px',
              }}
            >
              <span>
                {subtotal >= 100
                  ? '🎉 Free Express Shipping Unlocked!'
                  : `Add $${100 - subtotal} more for Free Shipping`}
              </span>
              <span style={{ color: 'var(--neu-accent)' }}>{progressPct}%</span>
            </div>
            <div
              style={{
                height: '8px',
                borderRadius: '99px',
                boxShadow: 'var(--neu-inset-sm)',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${progressPct}%`,
                  height: '100%',
                  background: 'var(--neu-accent-gradient)',
                  borderRadius: '99px',
                  transition: 'width 0.3s ease',
                }}
              />
            </div>
          </div>
        )}

        {checkoutStep === 'done' ? (
          <div
            className="neu-card"
            style={{
              padding: '28px 22px',
              textAlign: 'center',
              marginTop: '16px',
            }}
          >
            <CheckCircle2
              size={52}
              color="#10b981"
              style={{ margin: '0 auto 14px' }}
            />
            <h4 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '8px' }}>
              Thank You for Shopping at KS Tech Mart!
            </h4>
            <p
              style={{
                fontSize: '0.88rem',
                color: 'var(--neu-text-secondary)',
                marginBottom: '16px',
              }}
            >
              Your serialized electronics package is being prepared for 24h dispatch.
            </p>
            <div
              className="neu-well"
              style={{
                padding: '14px',
                marginBottom: '20px',
                fontWeight: 800,
                color: 'var(--neu-accent)',
                fontSize: '1.05rem',
              }}
            >
              Tracking ID: #{orderNumber}
            </div>
            <button
              type="button"
              className="neu-btn-primary"
              style={{ width: '100%' }}
              onClick={onClose}
            >
              Continue Exploring Gadgets
            </button>
          </div>
        ) : checkoutStep === 'form' ? (
          <form
            onSubmit={handlePlaceOrder}
            style={{ display: 'flex', flexDirection: 'column', gap: '14px', flex: 1 }}
          >
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  marginBottom: '6px',
                }}
              >
                Full Name
              </label>
              <input
                type="text"
                required
                className="neu-input"
                placeholder="Jordan Carter"
                value={customer.name}
                onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
              />
            </div>
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  marginBottom: '6px',
                }}
              >
                Receipt Email
              </label>
              <input
                type="email"
                required
                className="neu-input"
                placeholder="jordan@email.com"
                value={customer.email}
                onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
              />
            </div>
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  marginBottom: '6px',
                }}
              >
                Delivery Address
              </label>
              <textarea
                rows={3}
                required
                className="neu-input"
                placeholder="Street, Apartment, City & Postal Code"
                value={customer.address}
                onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
              />
            </div>

            <div className="neu-well" style={{ padding: '16px', marginTop: '6px' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontWeight: 800,
                  fontSize: '1.05rem',
                }}
              >
                <span>Total Due</span>
                <span style={{ color: 'var(--neu-accent)' }}>${total}</span>
              </div>
              <div
                style={{
                  fontSize: '0.75rem',
                  color: 'var(--neu-text-muted)',
                  marginTop: '4px',
                }}
              >
                256-bit SSL Encrypted • 30-Day Return Guarantee
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: 'auto' }}>
              <button
                type="button"
                className="neu-btn"
                onClick={() => setCheckoutStep('cart')}
              >
                Back
              </button>
              <button type="submit" className="neu-btn-primary" style={{ flex: 1 }}>
                Confirm Order • ${total}
              </button>
            </div>
          </form>
        ) : detailed.length === 0 ? (
          <div
            className="neu-card"
            style={{ padding: '32px 20px', textAlign: 'center', marginTop: '20px' }}
          >
            <ShoppingBag
              size={40}
              color="var(--neu-text-muted)"
              style={{ margin: '0 auto 12px' }}
            />
            <div style={{ fontWeight: 700, marginBottom: '6px' }}>
              Your cart is currently empty
            </div>
            <p
              style={{
                fontSize: '0.84rem',
                color: 'var(--neu-text-muted)',
                marginBottom: '18px',
              }}
            >
              Add flagship headphones, smartphones, or gaming gear to get started.
            </p>
            <button type="button" className="neu-btn-primary" onClick={onClose}>
              Browse Electronics
            </button>
          </div>
        ) : (
          <>
            {/* Cart Items List */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                flex: 1,
                marginBottom: '18px',
              }}
            >
              {detailed.map(({ id, qty, variant, product }) => (
                <div
                  key={`${id}-${variant}`}
                  className="neu-card"
                  style={{
                    padding: '12px',
                    borderRadius: '18px',
                    display: 'flex',
                    gap: '12px',
                    alignItems: 'center',
                  }}
                >
                  <div
                    className="neu-well-sm"
                    style={{
                      width: 68,
                      height: 68,
                      padding: 8,
                      flexShrink: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: '0.86rem',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {product.shortName}
                    </div>
                    <div
                      style={{
                        fontSize: '0.72rem',
                        color: 'var(--neu-text-muted)',
                        marginBottom: '8px',
                      }}
                    >
                      {variant}
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div className="qty-stepper">
                        <button
                          type="button"
                          className="qty-btn"
                          onClick={() => onUpdateQty(id, variant, qty - 1)}
                        >
                          −
                        </button>
                        <span
                          style={{
                            fontSize: '0.82rem',
                            fontWeight: 800,
                            minWidth: '18px',
                            textAlign: 'center',
                          }}
                        >
                          {qty}
                        </span>
                        <button
                          type="button"
                          className="qty-btn"
                          onClick={() => onUpdateQty(id, variant, qty + 1)}
                        >
                          +
                        </button>
                      </div>

                      <span
                        style={{
                          fontFamily: 'Space Grotesk, sans-serif',
                          fontWeight: 700,
                          fontSize: '0.98rem',
                        }}
                      >
                        ${product.price * qty}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="mini-neu-circle"
                    onClick={() => onRemoveItem(id, variant)}
                    title="Remove item"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>

            {/* Promo Code Input */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                <input
                  type="text"
                  className="neu-input"
                  style={{ padding: '9px 13px', fontSize: '0.83rem' }}
                  placeholder="Promo code (e.g. KSTECH20)"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                />
                <button
                  type="button"
                  className="neu-btn"
                  onClick={() => applyPromo()}
                >
                  Apply
                </button>
              </div>
              {!promoApplied && (
                <button
                  type="button"
                  onClick={() => applyPromo('KSTECH20')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--neu-accent)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <Tag size={12} /> Tap to auto-apply KSTECH20 (-20%)
                </button>
              )}
            </div>

            {/* Receipt Summary Well */}
            <div className="neu-well" style={{ padding: '16px', marginBottom: '16px' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '0.84rem',
                  marginBottom: '6px',
                  color: 'var(--neu-text-secondary)',
                }}
              >
                <span>Subtotal</span>
                <span>${subtotal}</span>
              </div>
              {promoApplied && (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '0.84rem',
                    marginBottom: '6px',
                    color: '#10b981',
                    fontWeight: 700,
                  }}
                >
                  <span>VIP Discount (KSTECH20)</span>
                  <span>−${discount}</span>
                </div>
              )}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '0.84rem',
                  marginBottom: '10px',
                  color: 'var(--neu-text-secondary)',
                }}
              >
                <span>Shipping</span>
                <span style={{ fontWeight: 700, color: shipping === 0 ? '#10b981' : '' }}>
                  {shipping === 0 ? 'FREE' : `$${shipping}`}
                </span>
              </div>
              <div className="neu-groove-h" style={{ marginBottom: '10px' }} />
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontWeight: 800,
                  fontSize: '1.14rem',
                }}
              >
                <span>Total</span>
                <span style={{ color: 'var(--neu-accent)' }}>${total}</span>
              </div>
            </div>

            <button
              type="button"
              className="neu-btn-primary"
              style={{ width: '100%' }}
              onClick={() => setCheckoutStep('form')}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={17} />
            </button>
          </>
        )}
      </aside>
    </div>
  );
}

export function WishlistDrawer({
  isOpen,
  onClose,
  wishlistIds,
  products,
  onToggleWishlist,
  onAddToCart,
}) {
  if (!isOpen) return null;

  const items = products.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <aside className="neu-drawer" onClick={(e) => e.stopPropagation()}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '20px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div className="trust-icon-well" style={{ width: 40, height: 40 }}>
              <Heart size={18} color="#ef4444" fill="#ef4444" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.12rem', fontWeight: 800 }}>Saved Wishlist</h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--neu-text-muted)' }}>
                {items.length} gadgets saved
              </span>
            </div>
          </div>

          <button type="button" className="neu-btn-icon" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="neu-card" style={{ padding: '28px 20px', textAlign: 'center' }}>
            <p
              style={{
                color: 'var(--neu-text-secondary)',
                fontSize: '0.88rem',
                marginBottom: '16px',
              }}
            >
              Tap the heart icon on any gadget to save it here for quick comparison!
            </p>
            <button type="button" className="neu-btn-primary" onClick={onClose}>
              Explore Top Picks
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {items.map((prod) => (
              <div
                key={prod.id}
                className="neu-card"
                style={{
                  padding: '14px',
                  borderRadius: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <div
                  className="neu-well-sm"
                  style={{ width: 64, height: 64, padding: 8, flexShrink: 0 }}
                >
                  <img
                    src={prod.image}
                    alt={prod.name}
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: '0.86rem' }}>
                    {prod.shortName}
                  </div>
                  <div
                    style={{
                      fontWeight: 800,
                      color: 'var(--neu-accent)',
                      fontSize: '0.92rem',
                      marginBottom: '8px',
                    }}
                  >
                    ${prod.price}
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      type="button"
                      className="neu-btn"
                      style={{ padding: '6px 12px', fontSize: '0.75rem' }}
                      onClick={() => {
                        onAddToCart(prod, 1, prod.variants?.[0] || 'Standard');
                        onToggleWishlist(prod.id);
                      }}
                    >
                      Move to Cart
                    </button>
                    <button
                      type="button"
                      className="neu-btn"
                      style={{ padding: '6px 10px', fontSize: '0.75rem' }}
                      onClick={() => onToggleWishlist(prod.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </aside>
    </div>
  );
}

export function QuickViewModal({
  product,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}) {
  const [selectedVariant, setSelectedVariant] = useState('');
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (product) {
      setSelectedVariant(product.variants?.[0] || 'Standard');
      setQty(1);
    }
  }, [product]);

  if (!product) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="neu-modal-box" onClick={(e) => e.stopPropagation()}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
          }}
        >
          <span className="section-eyebrow" style={{ marginBottom: 0 }}>
            {product.categoryLabel} • KS CERTIFIED HARDWARE
          </span>
          <button type="button" className="neu-btn-icon" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
            gap: '28px',
            alignItems: 'center',
          }}
        >
          {/* Concave Showcase Dish */}
          <div
            className="neu-well"
            style={{
              height: '320px',
              padding: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}
          >
            {product.badge && (
              <span className="product-badge-pill">{product.badge}</span>
            )}
            <img
              src={product.image}
              alt={product.name}
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
                filter: 'drop-shadow(0 16px 20px rgba(0,0,0,0.22))',
              }}
            />
          </div>

          {/* Right Product Specs & Controls */}
          <div>
            <h2
              style={{
                fontSize: '1.45rem',
                fontWeight: 800,
                lineHeight: 1.25,
                marginBottom: '10px',
              }}
            >
              {product.name}
            </h2>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '14px',
              }}
            >
              <span className="product-rating">
                <Star size={15} fill="#f59e0b" color="#f59e0b" />
                {product.rating} ({product.reviews} verified reviews)
              </span>
              <span style={{ color: '#10b981', fontSize: '0.78rem', fontWeight: 700 }}>
                ● In Stock &amp; Ready
              </span>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '12px',
                marginBottom: '16px',
              }}
            >
              <span
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '1.85rem',
                  fontWeight: 700,
                  color: 'var(--neu-accent)',
                }}
              >
                ${product.price}
              </span>
              {product.originalPrice > product.price && (
                <span className="price-old" style={{ fontSize: '1rem' }}>
                  ${product.originalPrice}
                </span>
              )}
            </div>

            <p
              style={{
                fontSize: '0.88rem',
                color: 'var(--neu-text-secondary)',
                lineHeight: 1.65,
                marginBottom: '18px',
              }}
            >
              {product.description}
            </p>

            {/* Variant Selector */}
            {product.variants?.length > 0 && (
              <div style={{ marginBottom: '18px' }}>
                <div
                  style={{
                    fontSize: '0.76rem',
                    fontWeight: 700,
                    marginBottom: '8px',
                    color: 'var(--neu-text-secondary)',
                  }}
                >
                  Select Edition / Configuration:
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {product.variants.map((v) => (
                    <button
                      key={v}
                      type="button"
                      className={`neu-btn ${selectedVariant === v ? 'is-pressed' : ''}`}
                      style={{ padding: '7px 14px', fontSize: '0.78rem' }}
                      onClick={() => setSelectedVariant(v)}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Key Hardware Specs */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '8px',
                marginBottom: '22px',
              }}
            >
              {product.specs.map((sp) => (
                <div
                  key={sp}
                  className="neu-well-sm"
                  style={{
                    padding: '8px 12px',
                    fontSize: '0.76rem',
                    fontWeight: 700,
                  }}
                >
                  ⚡ {sp}
                </div>
              ))}
            </div>

            {/* Qty + Add to Cart */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div className="qty-stepper" style={{ padding: '7px 10px' }}>
                <button
                  type="button"
                  className="qty-btn"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                >
                  −
                </button>
                <span style={{ fontWeight: 800, minWidth: 22, textAlign: 'center' }}>
                  {qty}
                </span>
                <button
                  type="button"
                  className="qty-btn"
                  onClick={() => setQty((q) => q + 1)}
                >
                  +
                </button>
              </div>

              <button
                type="button"
                className="neu-btn-primary"
                style={{ flex: 1 }}
                onClick={() => {
                  onAddToCart(product, qty, selectedVariant);
                  onClose();
                }}
              >
                Add to Cart • ${product.price * qty}
              </button>

              <button
                type="button"
                className={`neu-btn-icon ${isWishlisted ? 'is-active' : ''}`}
                onClick={() => onToggleWishlist(product.id)}
                title="Save to Wishlist"
              >
                <Heart
                  size={18}
                  fill={isWishlisted ? '#ef4444' : 'none'}
                  color={isWishlisted ? '#ef4444' : 'currentColor'}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function UtilityModal({ type, onClose, onNotify }) {
  const [trackingCode, setTrackingCode] = useState('KS-88421');
  const [tracked, setTracked] = useState(true);
  const [openFaq, setOpenFaq] = useState(0);

  if (!type) return null;

  const faqs = [
    [
      'How fast is KS Tech Mart free shipping?',
      'All orders over $100 qualify for Free 24–48 Hour Express Insured Courier with live GPS hub updates.',
    ],
    [
      'Are all gadgets covered by manufacturer warranty?',
      'Yes — 100% of products carry official 1-Year serialized manufacturer warranty plus KS Tech Mart 30-day instant replacement.',
    ],
    [
      'How does your 30-day easy return policy work?',
      'Initiate a return in two clicks from Track Order or Help Center for a prepaid doorstep pickup and full refund.',
    ],
  ];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="neu-modal-box neu-modal-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '18px',
          }}
        >
          <h3 style={{ fontSize: '1.22rem', fontWeight: 800 }}>
            {type === 'track' && 'Track Your KS Tech Order'}
            {type === 'help' && 'KS Tech Mart Help Center'}
            {type === 'account' && 'KS VIP Member Portal'}
          </h3>
          <button type="button" className="neu-btn-icon" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {type === 'track' && (
          <div>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '18px' }}>
              <input
                type="text"
                className="neu-input"
                value={trackingCode}
                onChange={(e) => setTrackingCode(e.target.value)}
                placeholder="Enter Order ID (e.g. KS-88421)"
              />
              <button
                type="button"
                className="neu-btn-primary"
                onClick={() => setTracked(true)}
              >
                Locate
              </button>
            </div>

            {tracked && (
              <div className="neu-well" style={{ padding: '18px' }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '14px',
                    fontWeight: 700,
                    fontSize: '0.88rem',
                  }}
                >
                  <span>Shipment #{trackingCode || 'KS-88421'}</span>
                  <span style={{ color: '#10b981' }}>In Express Transit</span>
                </div>
                {[
                  [Package, 'Order Serialized & Quality Checked', 'Completed • 09:15 AM'],
                  [ShieldCheck, 'Tamper-Proof Security Seal Applied', 'Completed • 11:40 AM'],
                  [Truck, 'Out for Express Courier Delivery', 'Active Step • Arriving Tomorrow'],
                ].map(([Icon, title, sub]) => (
                  <div
                    key={title}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '8px 0',
                    }}
                  >
                    <div className="trust-icon-well" style={{ width: 36, height: 36 }}>
                      <Icon size={16} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.84rem' }}>{title}</div>
                      <div
                        style={{
                          fontSize: '0.73rem',
                          color: 'var(--neu-text-muted)',
                        }}
                      >
                        {sub}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {type === 'help' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {faqs.map(([q, a], idx) => (
              <div
                key={q}
                className="neu-card"
                style={{ padding: '14px 16px', borderRadius: '18px', cursor: 'pointer' }}
                onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
              >
                <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{q}</div>
                {openFaq === idx && (
                  <p
                    style={{
                      marginTop: '8px',
                      fontSize: '0.84rem',
                      color: 'var(--neu-text-secondary)',
                      lineHeight: 1.55,
                    }}
                  >
                    {a}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {type === 'account' && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onNotify('Signed into KS Tech Mart VIP Account!');
              onClose();
            }}
            style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}
          >
            <p style={{ fontSize: '0.86rem', color: 'var(--neu-text-secondary)' }}>
              Sign in to manage serialized warranties, saved hardware builds, and VIP
              rewards points.
            </p>
            <input
              type="email"
              required
              className="neu-input"
              placeholder="member@kstechmart.com"
            />
            <input
              type="password"
              required
              className="neu-input"
              placeholder="••••••••••••"
            />
            <button type="submit" className="neu-btn-primary">
              Sign In to KS Account
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
