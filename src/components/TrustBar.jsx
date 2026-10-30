import React from 'react';
import { Truck, ShieldCheck, RefreshCw, Headphones } from 'lucide-react';

const TRUST_FEATURES = [
  {
    icon: Truck,
    title: 'Free Shipping',
    desc: 'On orders over $100',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Payment',
    desc: '100% safe & secure',
  },
  {
    icon: RefreshCw,
    title: 'Easy Returns',
    desc: '30-day return policy',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    desc: "We're here to help",
  },
];

export default function TrustBar() {
  return (
    <section className="trust-section" aria-label="Store guarantees">
      <div className="ks-container">
        <div className="trust-plate">
          {TRUST_FEATURES.map((item) => {
            const Icon = item.icon;
            return (
              <div className="trust-item" key={item.title}>
                <div className="trust-icon-well">
                  <Icon size={21} strokeWidth={2.1} />
                </div>
                <div>
                  <div className="trust-title">{item.title}</div>
                  <div className="trust-desc">{item.desc}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
