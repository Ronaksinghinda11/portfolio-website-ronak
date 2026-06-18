'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

// Reusable Counter component that counts up when it enters viewport
const Counter = ({ target, duration = 1600, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    let started = false;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started) {
          started = true;
          let startTimestamp = null;
          const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
            setCount(Math.floor(eased * target));
            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setCount(target);
            }
          };
          requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

export default function Act6_Stats() {
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] } },
  };

  return (
    <section 
      id="contact" 
      className="section"
      style={{
        padding: '100px 0 0 0', // flush to footer
        background: 'var(--bg-primary)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Zoom-Out Stats Row */}
      <div className="container" style={{ marginBottom: '80px' }}>
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '20px',
            textAlign: 'center',
            padding: '40px 20px',
            borderTop: '1px solid var(--border)',
            borderBottom: '1px solid var(--border)',
          }}
          className="stats-grid"
        >
          <div className="stat-box">
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4.5vw, 3rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
              <Counter target={1566} />
            </h3>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.12em', fontFamily: 'var(--font-mono)', marginTop: '4px' }}>
              LeetCode Rating
            </p>
          </div>
          <div className="stat-box">
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4.5vw, 3rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
              <Counter target={140} suffix="+" />
            </h3>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.12em', fontFamily: 'var(--font-mono)', marginTop: '4px' }}>
              Problems Solved
            </p>
          </div>
          <div className="stat-box">
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4.5vw, 3rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
              <Counter target={3} suffix="+" />
            </h3>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.12em', fontFamily: 'var(--font-mono)', marginTop: '4px' }}>
              Projects Built
            </p>
          </div>
          <div className="stat-box">
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4.5vw, 3rem)', fontWeight: 800, color: 'var(--accent)', letterSpacing: '-0.02em' }}>
              <span>2</span><span style={{ fontSize: '1.8rem', verticalAlign: 'super', marginLeft: '2px' }}>★</span>
            </h3>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.12em', fontFamily: 'var(--font-mono)', marginTop: '4px' }}>
              CodeChef Division
            </p>
          </div>
        </div>
      </div>

      {/* Contact Form/Cards Container */}
      <div className="container" style={{ flex: 1, marginBottom: '80px' }}>
        
        {/* Section Header */}
        <div className="section-header center" style={{ marginBottom: '56px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '10px' }}>
          <span className="tag">06 / Contact</span>
          <h2 className="section-title" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 700 }}>
            Let's Connect
          </h2>
        </div>

        <div className="contact-wrap" style={{ maxWidth: '660px', margin: '0 auto' }}>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            className="contact-text" 
            style={{ textAlign: 'center' }}
          >
            <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '36px' }}>
              I'm currently open to new opportunities — whether it's a full-time role, internship,
              or an interesting project to collaborate on. Feel free to reach out!
            </p>

            <div 
              className="contact-info"
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1px',
                background: 'var(--border)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                textAlign: 'left',
              }}
            >
              <a href="mailto:ronakinda3@gmail.com" className="contact-item">
                <div className="contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                </div>
                <div>
                  <span className="contact-label">Email</span>
                  <span className="contact-value">ronakinda3@gmail.com</span>
                </div>
              </a>

              <a href="tel:7878054187" className="contact-item">
                <div className="contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                </div>
                <div>
                  <span className="contact-label">Phone</span>
                  <span className="contact-value">+91 7878054187</span>
                </div>
              </a>

              <a href="https://linkedin.com/in/ronaksinghinda/" target="_blank" rel="noopener" className="contact-item">
                <div className="contact-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
                </div>
                <div>
                  <span className="contact-label">LinkedIn</span>
                  <span className="contact-value">linkedin.com/in/ronaksinghinda</span>
                </div>
              </a>

              <a href="https://github.com/RonakSinghinda" target="_blank" rel="noopener" className="contact-item">
                <div className="contact-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>
                </div>
                <div>
                  <span className="contact-label">GitHub</span>
                  <span className="contact-value">github.com/RonakSinghinda</span>
                </div>
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Official Declaration Footer */}
      <footer 
        className="footer"
        style={{
          width: '100%',
          background: 'var(--bg-secondary)',
          borderTop: '1px solid var(--border)',
          padding: '36px 24px',
          textAlign: 'center',
          boxSizing: 'border-box'
        }}
      >
        <div className="container">
          <p className="footer-text" style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '6px', fontFamily: 'var(--font-mono)' }}>
            Designed & Built by <strong style={{ color: 'var(--accent)' }}>Ronak Singh Inda</strong>
          </p>
          <p 
            className="footer-sub"
            style={{
              fontSize: '0.72rem',
              color: 'var(--text-muted)',
              fontStyle: 'italic',
              maxWidth: '480px',
              margin: '0 auto',
              lineHeight: '1.6',
              opacity: 0.6,
            }}
          >
            I hereby declare that all the information furnished above is true and correct to the best of my knowledge and belief.
          </p>
        </div>
      </footer>

      <style>{`
        .contact-info .contact-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 20px 22px;
          background: var(--bg-card);
          transition: background var(--transition);
        }
        .contact-info .contact-item:hover {
          background: var(--bg-card-hover) !important;
        }
        .contact-info .contact-icon {
          width: 36px; height: 36px;
          background: rgba(255, 97, 26, 0.1);
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          border: 1px solid rgba(255, 97, 26, 0.18);
        }
        .contact-info .contact-icon svg {
          width: 16px; height: 16px;
          color: var(--accent);
        }
        .contact-info .contact-label {
          display: block;
          font-size: 0.68rem;
          font-family: var(--font-mono);
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 2px;
        }
        .contact-info .contact-value {
          display: block;
          font-size: 0.82rem;
          font-weight: 500;
          color: var(--text-primary);
          transition: color var(--transition);
        }
        .contact-info .contact-item:hover .contact-value {
          color: var(--accent) !important;
        }
        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 24px !important;
          }
          .contact-info {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 480px) {
          .stats-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
        }
      `}</style>
    </section>
  );
}
