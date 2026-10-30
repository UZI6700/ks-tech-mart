import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

export default function PromoDealBanner({ onShopDeals, onInspectProduct, products }) {
  const [secondsLeft, setSecondsLeft] = useState(2 * 86400 + 14 * 3600 + 38 * 60 + 42);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 86400));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const days = String(Math.floor(secondsLeft / 86400)).padStart(2, '0');
  const hrs = String(Math.floor((secondsLeft % 86400) / 3600)).padStart(2, '0');
  const mins = String(Math.floor((secondsLeft % 3600) / 60)).padStart(2, '0');
  const secs = String(secondsLeft % 60).padStart(2, '0');

  const findProd = (id) => products.find((p) => p.id === id);

  return (
    <section id="deals" className="promo-section">
      <div className="ks-container">
        <div className="promo-neu-frame">
          <div className="promo-dark-stage">
            {/* Left Copy & Live Neumorphic Countdown */}
            <div style={{ position: 'relative', zIndex: 4 }}>
              <div className="promo-badge-row">
                <div className="promo-percent-orb">%</div>
                <span className="promo-offer-label">Limited Time Offer</span>
              </div>

              <h2 className="promo-headline">
                Big Deals on <br />
                Top Gadgets
              </h2>

              <p className="promo-subcopy">
                Grab the best electronics at unbeatable prices — plus use code{' '}
                <strong style={{ color: '#60a5fa' }}>KSTECH20</strong> at checkout for
                an extra 20% VIP savings.
              </p>

              <div className="promo-countdown" aria-label="Deal countdown timer">
                {[
                  [days, 'Days'],
                  [hrs, 'Hrs'],
                  [mins, 'Mins'],
                  [secs, 'Secs'],
                ].map(([val, lbl]) => (
                  <div className="countdown-cell" key={lbl}>
                    <span className="countdown-val">{val}</span>
                    <span className="countdown-lbl">{lbl}</span>
                  </div>
                ))}
              </div>

              <button
                type="button"
                className="btn-blue-neu-hero"
                onClick={onShopDeals}
              >
                <span>Shop Deals</span>
                <ArrowRight size={17} />
              </button>
            </div>

            {/* Right Studio Showcase Pedestal */}
            <div className="promo-visual-stage">
              <div className="promo-glossy-pedestal" />

              <div
                className="hero-gadget-item promo-item-airpods"
                onClick={() => onInspectProduct(findProd('airpods-pro-2-usbc'))}
                title="Inspect AirPods Pro 2"
              >
                <span className="hero-hotspot-tag">AirPods Pro 2 • $199</span>
                <img src="/images/airpods-pro.png" alt="AirPods Pro 2" />
              </div>

              <div
                className="hero-gadget-item promo-item-speaker"
                onClick={() => onInspectProduct(findProd('marshall-stanmore-speaker'))}
                title="Inspect Stanmore III Speaker"
              >
                <span className="hero-hotspot-tag">Stanmore III • $319</span>
                <img src="/images/marshall-speaker.png" alt="Studio Wireless Speaker" />
              </div>

              <div
                className="hero-gadget-item promo-item-drone"
                onClick={() => onInspectProduct(findProd('mavic-air-4k-drone'))}
                title="Inspect AeroFold 4K Drone"
              >
                <span className="hero-hotspot-tag">AeroFold 4K • $649</span>
                <img src="/images/drone-4k.png" alt="AeroFold 4K Gimbal Drone" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
