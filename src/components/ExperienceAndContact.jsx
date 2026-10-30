import React, { useState } from 'react';
import {
  Award,
  Zap,
  Star,
  Send,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
} from 'lucide-react';
import { REVIEWS } from '../data/products';

export default function ExperienceAndContact({ onNotify }) {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    topic: 'Product Inquiry',
    message: '',
  });
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [sentMessage, setSentMessage] = useState(false);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactForm.name.trim() || !contactForm.email.trim()) return;
    setSentMessage(true);
    onNotify(`Thanks ${contactForm.name}! Our KS Tech Specialist will reply within 2 hours.`);
    setContactForm({ name: '', email: '', topic: 'Product Inquiry', message: '' });
    setTimeout(() => setSentMessage(false), 4000);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    onNotify(`Subscribed ${newsletterEmail} — Welcome code KSTECH20 unlocked!`);
    setNewsletterEmail('');
  };

  return (
    <>
      {/* ABOUT US & CUSTOMER REVIEWS */}
      <section id="about" className="experience-section">
        <div className="ks-container">
          <div className="section-head">
            <div>
              <div className="section-eyebrow">WHY KS TECH MART</div>
              <h2 className="section-title">Engineered for Tech Enthusiasts</h2>
            </div>
          </div>

          <div className="about-bento">
            <div className="neu-card about-story-card">
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 14px',
                  borderRadius: '999px',
                  marginBottom: '18px',
                }}
                className="neu-well-sm"
              >
                <Award size={15} color="var(--neu-accent)" />
                <span
                  style={{
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    color: 'var(--neu-accent)',
                  }}
                >
                  AUTHORIZED FLAGSHIP RETAILER
                </span>
              </div>

              <h3
                style={{
                  fontSize: '1.55rem',
                  fontWeight: 800,
                  marginBottom: '14px',
                  lineHeight: 1.25,
                }}
              >
                Curating Genuine Flagship Hardware with Zero Compromise.
              </h3>

              <p
                style={{
                  color: 'var(--neu-text-secondary)',
                  fontSize: '0.95rem',
                  lineHeight: 1.7,
                  marginBottom: '22px',
                }}
              >
                At <strong>KS Tech Mart</strong>, every smartphone, laptop, mirrorless
                camera, and studio headphone is sourced sealed from official manufacturer
                channels. Combined with 24-hour express dispatch, serialized warranty
                protection, and 30-day hassle-free returns, upgrading your setup feels
                effortless.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                {[
                  '100% Factory-Sealed Serials',
                  '1-Year Official Warranty',
                  'Same-Day Dispatch Hub',
                ].map((pill) => (
                  <span
                    key={pill}
                    className="neu-well-sm"
                    style={{
                      padding: '8px 14px',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <Zap size={14} color="var(--neu-accent)" />
                    {pill}
                  </span>
                ))}
              </div>
            </div>

            <div className="stats-neu-grid">
              {[
                ['58K+', 'Happy Tech Buyers'],
                ['99.4%', 'On-Time Express Delivery'],
                ['100%', 'Genuine Sealed Stock'],
                ['4.9 ★', 'Verified Store Rating'],
              ].map(([num, label]) => (
                <div className="stat-neu-box" key={label}>
                  <div className="stat-number">{num}</div>
                  <div
                    style={{
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      color: 'var(--neu-text-secondary)',
                    }}
                  >
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Verified Reviews */}
          <div className="reviews-grid">
            {REVIEWS.map((rev) => (
              <div className="neu-card review-neu-card" key={rev.id}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ display: 'flex', gap: '3px' }}>
                    {Array.from({ length: rev.rating }).map((_, idx) => (
                      <Star key={idx} size={15} fill="#f59e0b" color="#f59e0b" />
                    ))}
                  </div>
                  <span className="spec-chip">{rev.product}</span>
                </div>

                <p
                  style={{
                    fontSize: '0.9rem',
                    color: 'var(--neu-text-secondary)',
                    lineHeight: 1.6,
                    flex: 1,
                  }}
                >
                  &ldquo;{rev.quote}&rdquo;
                </p>

                <div
                  style={{
                    paddingTop: '12px',
                    borderTop: '1px solid var(--neu-groove-dark)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.88rem' }}>
                      {rev.author}
                    </div>
                    <div
                      style={{
                        fontSize: '0.75rem',
                        color: 'var(--neu-text-muted)',
                      }}
                    >
                      {rev.role}
                    </div>
                  </div>
                  <CheckCircle2 size={18} color="#10b981" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT & NEWSLETTER SECTION */}
      <section id="contact" className="experience-section">
        <div className="ks-container">
          <div className="section-head">
            <div>
              <div className="section-eyebrow">GET IN TOUCH</div>
              <h2 className="section-title">KS Tech Concierge &amp; Support</h2>
            </div>
          </div>

          <div className="contact-grid">
            {/* Left Info & Newsletter */}
            <div
              className="neu-card contact-card"
              style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}
            >
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '8px' }}>
                  Need Custom Tech Advice?
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--neu-text-secondary)' }}>
                  Speak directly with our hardware specialists for workstation builds,
                  studio audio setups, or corporate bulk pricing.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {[
                  [Phone, '+1 (800) 578-8324', 'Mon–Sun, 24/7 Live Tech Desk'],
                  [Mail, 'concierge@kstechmart.com', 'Average response under 2 hours'],
                  [MapPin, 'KS Tech Flagship Hub', '740 Innovation Blvd, Suite 200'],
                ].map(([Icon, title, sub]) => (
                  <div
                    key={title}
                    style={{ display: 'flex', alignItems: 'center', gap: '14px' }}
                  >
                    <div className="trust-icon-well" style={{ width: 42, height: 42 }}>
                      <Icon size={18} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{title}</div>
                      <div
                        style={{
                          fontSize: '0.76rem',
                          color: 'var(--neu-text-muted)',
                        }}
                      >
                        {sub}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="neu-groove-h" />

              {/* Newsletter */}
              <form onSubmit={handleSubscribe}>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    marginBottom: '10px',
                  }}
                >
                  Join VIP Deal Alerts (Get 20% Off)
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <input
                    type="email"
                    required
                    className="neu-input"
                    placeholder="Enter your email..."
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                  />
                  <button type="submit" className="neu-btn-primary">
                    Join
                  </button>
                </div>
              </form>
            </div>

            {/* Right Tactile Neumorphic Contact Form */}
            <form className="neu-card contact-card" onSubmit={handleContactSubmit}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '18px' }}>
                Send Us a Direct Message
              </h3>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '14px',
                  marginBottom: '14px',
                }}
              >
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      marginBottom: '6px',
                      color: 'var(--neu-text-secondary)',
                    }}
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    className="neu-input"
                    placeholder="Alex Morgan"
                    value={contactForm.name}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      marginBottom: '6px',
                      color: 'var(--neu-text-secondary)',
                    }}
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    className="neu-input"
                    placeholder="alex@domain.com"
                    value={contactForm.email}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, email: e.target.value })
                    }
                  />
                </div>
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    marginBottom: '6px',
                    color: 'var(--neu-text-secondary)',
                  }}
                >
                  Topic
                </label>
                <select
                  className="neu-input"
                  value={contactForm.topic}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, topic: e.target.value })
                  }
                >
                  <option>Product Inquiry</option>
                  <option>Order &amp; Express Shipping</option>
                  <option>Warranty &amp; Easy Returns</option>
                  <option>Corporate / Bulk Quote</option>
                </select>
              </div>

              <div style={{ marginBottom: '18px' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    marginBottom: '6px',
                    color: 'var(--neu-text-secondary)',
                  }}
                >
                  Message
                </label>
                <textarea
                  rows={4}
                  required
                  className="neu-input"
                  placeholder="Tell us which gadget or setup you're looking for..."
                  value={contactForm.message}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, message: e.target.value })
                  }
                />
              </div>

              <button type="submit" className="neu-btn-primary" style={{ width: '100%' }}>
                <Send size={16} />
                <span>{sentMessage ? 'Message Dispatched ✓' : 'Send Message'}</span>
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
