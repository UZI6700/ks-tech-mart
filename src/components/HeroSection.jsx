import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function HeroSection({ onShopNow, onExploreDeals, onInspectProduct, products }) {
  const findProd = (id) => products.find((p) => p.id === id);

  return (
    <section id="home" className="hero-section">
      <div className="ks-container">
        <div className="hero-neu-frame">
          <div className="hero-dark-stage">
            <div className="hero-ambient-glow" />

            {/* Left Column Copy */}
            <div className="hero-copy">
              <div className="hero-eyebrow-pill">
                <Sparkles size={13} color="#60a5fa" />
                <span>NEW ARRIVALS</span>
              </div>

              <h1 className="hero-headline">
                Upgrade Your <br />
                World with
                <span className="hero-headline-accent">Latest Electronics</span>
              </h1>

              <p className="hero-subcopy">
                Discover top-quality electronic gadgets and devices that make life
                smarter, easier, and more connected — crafted inside KS Tech Mart&apos;s
                signature tactile Neumorphic experience.
              </p>

              <div className="hero-cta-row">
                <button
                  type="button"
                  className="btn-blue-neu-hero"
                  onClick={onShopNow}
                >
                  <span>Shop Now</span>
                  <ArrowRight size={17} />
                </button>

                <button
                  type="button"
                  className="btn-dark-neu-hero"
                  onClick={onExploreDeals}
                >
                  <span>Explore Deals</span>
                </button>
              </div>
            </div>

            {/* Right Column 3D Studio Pedestal & Interactive Hardware */}
            <div className="hero-stage-visual">
              <div className="hero-neon-ring" />
              <div className="hero-pedestal-base" />
              <div className="hero-pedestal-lip" />

              {/* Headphones */}
              <div
                className="hero-gadget-item hero-gadget-headphones"
                onClick={() => onInspectProduct(findProd('xm5-anc-headphones'))}
                title="Click to inspect SonicPro XM5 ANC"
              >
                <span className="hero-hotspot-tag">SonicPro XM5 • $329</span>
                <img
                  src="/images/headphones.png"
                  alt="SonicPro Wireless ANC Headphones"
                />
              </div>

              {/* Smartphone */}
              <div
                className="hero-gadget-item hero-gadget-phone"
                onClick={() => onInspectProduct(findProd('iphone-16-pro-titanium'))}
                title="Click to inspect iPhone 16 Pro Titanium"
              >
                <span className="hero-hotspot-tag">iPhone 16 Pro • $999</span>
                <img
                  src="/images/iphone-pro.png"
                  alt="iPhone 16 Pro Black Titanium"
                />
              </div>

              {/* Dual USB-C Charger */}
              <div
                className="hero-gadget-item hero-gadget-charger"
                onClick={() => onInspectProduct(findProd('gan-35w-dual-charger'))}
                title="Click to inspect 35W Dual USB-C GaN Charger"
              >
                <span className="hero-hotspot-tag">35W Dual GaN • $49</span>
                <img
                  src="/images/gan-charger.png"
                  alt="35W Dual USB-C Power Adapter"
                />
              </div>

              {/* Smartwatch */}
              <div
                className="hero-gadget-item hero-gadget-watch"
                onClick={() => onInspectProduct(findProd('watch-ultra-2-black'))}
                title="Click to inspect Watch Ultra 2 Black Titanium"
              >
                <span className="hero-hotspot-tag">Watch Ultra 2 • $729</span>
                <img
                  src="/images/watch-ultra.png"
                  alt="Watch Ultra 2 Black Titanium"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
