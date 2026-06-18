'use client';

import { motion } from 'framer-motion';

export default function AboutSection() {
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] } },
  };

  const leftColumnVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] } },
  };

  const rightColumnVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] } },
  };

  return (
    <section 
      id="about" 
      className="section"
      style={{
        padding: '100px 0',
        background: 'var(--bg-primary)',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid var(--border)',
      }}
    >
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header" style={{ marginBottom: '56px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '10px' }}>
          <span className="tag">01 / About</span>
          <h2 className="section-title" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 700 }}>
            Who I Am
          </h2>
        </div>

        {/* About Grid */}
        <div 
          className="about-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.6fr',
            gap: '80px',
            alignItems: 'center',
          }}
        >
          {/* Left Column: Avatar & Floating Tags */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={leftColumnVariants}
            className="about-image-wrap"
            style={{ position: 'relative' }}
          >
            <div 
              className="about-image-frame"
              style={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '60px 40px',
              }}
            >
              <div 
                className="about-avatar"
                style={{
                  position: 'relative',
                  width: '148px', height: '148px',
                }}
              >
                <div 
                  className="avatar-inner"
                  style={{
                    width: '148px', height: '148px',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-accent)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '2.2rem',
                    fontWeight: 700,
                    color: 'var(--accent)',
                    position: 'relative',
                    zIndex: 2,
                    boxShadow: '0 0 0 8px rgba(255, 97, 26, 0.06), var(--shadow-glow)',
                  }}
                >
                  <span>RS</span>
                </div>
                <div className="avatar-ring ring-1" />
                <div className="avatar-ring ring-2" />
              </div>

              {/* Floating Badge 1 */}
              <div 
                className="about-card-float card-float-1"
                style={{
                  position: 'absolute',
                  top: '20px', right: 0,
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-md)',
                  padding: '10px 18px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  whiteSpace: 'nowrap',
                  boxShadow: 'var(--shadow-card)',
                }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '14px', height: '14px', color: 'var(--accent)' }}>
                  <polyline points="16 18 22 12 16 6"/>
                  <polyline points="8 6 2 12 8 18"/>
                </svg>
                <span>Full-Stack Dev</span>
              </div>

              {/* Floating Badge 2 */}
              <div 
                className="about-card-float card-float-2"
                style={{
                  position: 'absolute',
                  bottom: '20px', left: 0,
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-md)',
                  padding: '10px 18px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  whiteSpace: 'nowrap',
                  boxShadow: 'var(--shadow-card)',
                }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '14px', height: '14px', color: 'var(--accent)' }}>
                  <path d="M12 20h9"/>
                  <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>
                </svg>
                <span>QA Engineer</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: About Description */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={rightColumnVariants}
            className="about-text"
          >
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 700, marginBottom: '18px', color: 'var(--text-primary)' }}>
              Building things that matter
            </h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '16px', fontSize: '0.98rem', lineHeight: '1.8' }}>
              I'm a <strong style={{ color: 'var(--accent)', fontWeight: 600 }}>Computer Science Engineering student</strong> at R.N. Shetty Institute of Technology, Bengaluru,
              passionate about building products from concept to deployment. I thrive at the intersection of
              clean code, thoughtful architecture, and great user experience.
            </p>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '16px', fontSize: '0.98rem', lineHeight: '1.8' }}>
              Currently interning as an <strong style={{ color: 'var(--accent)', fontWeight: 600 }}>SDE at Firedesk</strong>, where I engineer scalable Node.js REST APIs
              and design normalized PostgreSQL schemas. Previously, I worked as a QA Intern building
              end-to-end test automation with Playwright and TypeScript.
            </p>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '28px', fontSize: '0.98rem', lineHeight: '1.8' }}>
              Outside of work, I actively compete on <strong style={{ color: 'var(--accent)', fontWeight: 600 }}>LeetCode</strong> (rating 1566, Top 28.5%) and
              <strong style={{ color: 'var(--accent)', fontWeight: 600 }}>CodeChef</strong> (2-Star), and love exploring new technologies and open-source projects.
            </p>

            {/* Social Links */}
            <div className="about-links" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a 
                href="https://linkedin.com/in/ronaksinghinda/" 
                target="_blank" 
                rel="noopener" 
                className="social-link"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '15px', height: '15px' }}><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
                LinkedIn
              </a>
              <a 
                href="https://github.com/RonakSinghinda" 
                target="_blank" 
                rel="noopener" 
                className="social-link"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '15px', height: '15px' }}><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>
                GitHub
              </a>
              <a 
                href="mailto:ronakinda3@gmail.com" 
                className="social-link"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '15px', height: '15px' }}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                Email
              </a>
            </div>
          </motion.div>
        </div>

      </div>

      <style>{`
        .avatar-ring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(255, 97, 26, 0.15);
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          animation: ring-pulse 3.5s ease-in-out infinite;
        }
        .ring-1 { width: 190px; height: 190px; animation-delay: 0s; }
        .ring-2 { width: 250px; height: 250px; animation-delay: -1.8s; }

        @keyframes ring-pulse {
          0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.7; transform: translate(-50%, -50%) scale(1.03); }
        }

        .card-float-1 {
          animation: float-card 4.5s ease-in-out infinite;
        }
        .card-float-2 {
          animation: float-card 4.5s ease-in-out infinite reverse;
          animation-delay: -1.5s;
        }

        @keyframes float-card {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .about-links .social-link {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 10px 20px;
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          font-size: 0.82rem;
          font-weight: 500;
          color: var(--text-secondary);
          transition: var(--transition);
          background: transparent;
        }
        .about-links .social-link:hover {
          border-color: var(--accent) !important;
          color: var(--text-primary) !important;
          background: rgba(255, 97, 26, 0.06) !important;
          transform: translateY(-1px);
        }

        @media (max-width: 1024px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .about-image-wrap {
            display: none !important;
          }
        }
        @media (max-width: 480px) {
          .about-links {
            flex-direction: column !important;
          }
          .about-links .social-link {
            justify-content: center !important;
          }
        }
      `}</style>
    </section>
  );
}
