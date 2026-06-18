'use client';

import { motion } from 'framer-motion';

export default function Act5_Timeline() {
  const experiences = [
    {
      role: 'SDE Intern',
      company: 'Firedesk · On-Campus',
      period: 'May 2026 – Present',
      current: true,
      bullets: [
        'Engineered scalable Node.js RESTful APIs and normalized PostgreSQL schemas with robust migrations to support 10+ core domain models (assets, tickets, users).',
        'Built responsive authentication UIs and analyzed the existing system architecture to ensure seamless full-stack integration.',
      ],
      tech: ['Node.js', 'PostgreSQL', 'REST APIs', 'React.js'],
    },
    {
      role: 'QA Intern',
      company: 'Firedesk · On-Campus',
      period: 'Nov 2025 – Apr 2026',
      current: false,
      bullets: [
        'Developed and maintained end-to-end test automation frameworks using Playwright and TypeScript, increasing regression test coverage and reducing manual testing effort.',
        'Collaborated with developers and product stakeholders to identify, reproduce, and track defects, contributing to improved product quality and faster release cycles.',
      ],
      tech: ['Playwright', 'TypeScript', 'Test Automation'],
    },
  ];

  const educations = [
    {
      school: 'R.N. Shetty Institute of Technology',
      degree: 'Bachelor of Engineering in Computer Science',
      location: 'Karnataka, India',
      period: '2024 – 2028',
    },
    {
      school: 'B.S Memorial School',
      degree: 'Central Board of Secondary Education',
      location: 'Abu Road, India',
      period: '2024',
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] } },
  };

  return (
    <section 
      id="experience" 
      className="section section-alt"
      style={{
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border)',
        padding: '100px 0',
      }}
    >
      <div className="container">
        
        {/* Experience Header */}
        <div className="section-header" style={{ marginBottom: '56px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '10px' }}>
          <span className="tag">04 / Experience</span>
          <h2 className="section-title" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 700 }}>
            Where I've Worked
          </h2>
        </div>

        {/* Timeline */}
        <div 
          className="timeline"
          style={{
            maxWidth: '740px',
            margin: '0 auto 80px auto',
            position: 'relative',
          }}
        >
          {/* Vertical timeline bar (hidden on mobile) */}
          <div 
            className="timeline-bar desktop-only"
            style={{
              position: 'absolute',
              left: '13px', top: '14px', bottom: '14px',
              width: '1px',
              background: 'var(--border)',
            }}
          />

          {experiences.map((exp, index) => (
            <motion.div 
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={cardVariants}
              className="timeline-item"
              style={{
                display: 'grid',
                gridTemplateColumns: '28px 1fr',
                gap: '24px',
                marginBottom: '32px',
                position: 'relative',
              }}
            >
              {/* Marker dot */}
              <div 
                className="timeline-marker"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  paddingTop: '6px',
                  position: 'relative',
                }}
              >
                <div 
                  className="marker-dot"
                  style={{
                    width: '13px', height: '13px',
                    background: 'var(--accent)',
                    borderRadius: '50%',
                    flexShrink: 0,
                    boxShadow: '0 0 0 3px rgba(255, 97, 26, 0.15)',
                    position: 'relative',
                    zIndex: 1,
                  }}
                />
              </div>

              {/* Card content */}
              <div 
                className="timeline-content"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '24px 26px',
                  transition: 'border-color var(--transition), background var(--transition)',
                }}
              >
                <div 
                  className="timeline-header"
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    flexWrap: 'wrap',
                    gap: '8px',
                    marginBottom: '8px',
                  }}
                >
                  <div>
                    <h3 className="timeline-role" style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {exp.role}
                    </h3>
                    <p className="timeline-company" style={{ fontSize: '0.82rem', color: 'var(--accent)', marginTop: '2px' }}>
                      {exp.company}
                    </p>
                  </div>
                  <span 
                    className="timeline-period"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.7rem',
                      color: 'var(--text-muted)',
                      background: 'rgba(255, 255, 255, 0.03)',
                      padding: '4px 10px',
                      borderRadius: '100px',
                      border: '1px solid var(--border)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {exp.period}
                  </span>
                </div>

                {exp.current && (
                  <div 
                    className="timeline-badge current"
                    style={{
                      display: 'inline-block',
                      marginBottom: '12px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.68rem',
                      fontWeight: 600,
                      padding: '2px 9px',
                      borderRadius: '100px',
                      background: 'rgba(61, 220, 132, 0.1)',
                      color: '#3ddc84',
                      border: '1px solid rgba(61, 220, 132, 0.2)',
                    }}
                  >
                    Current
                  </div>
                )}

                <ul className="timeline-bullets" style={{ listStyle: 'none', marginBottom: '14px' }}>
                  {exp.bullets.map((bullet, bIndex) => (
                    <li 
                      key={bIndex}
                      style={{
                        fontSize: '0.86rem',
                        color: 'var(--text-secondary)',
                        paddingLeft: '16px',
                        position: 'relative',
                        marginBottom: '8px',
                        lineHeight: '1.65',
                      }}
                    >
                      <span style={{ position: 'absolute', left: 0, color: 'var(--accent)', fontSize: '0.8rem' }}>—</span>
                      {bullet}
                    </li>
                  ))}
                </ul>

                <div className="timeline-tech" style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {exp.tech.map((t) => (
                    <span 
                      key={t}
                      className="tech-mini"
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.68rem',
                        color: 'var(--text-muted)',
                        padding: '2px 9px',
                        background: 'rgba(255, 255, 255, 0.02)',
                        borderRadius: '100px',
                        border: '1px solid var(--border)',
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Education Header */}
        <div className="section-header" style={{ marginBottom: '56px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '10px' }}>
          <span className="tag">05 / Education</span>
          <h2 className="section-title" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 700 }}>
            Academic Background
          </h2>
        </div>

        {/* Education Grid */}
        <div 
          className="education-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1px',
            background: 'var(--border)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            maxWidth: '740px',
            margin: '0 auto',
          }}
        >
          {educations.map((edu, index) => (
            <motion.div 
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={cardVariants}
              className="edu-card"
              style={{
                background: 'var(--bg-card)',
                padding: '24px',
                display: 'flex',
                gap: '16px',
                alignItems: 'flex-start',
                transition: 'background var(--transition)',
              }}
            >
              <div 
                className="edu-icon"
                style={{
                  width: '38px', height: '38px',
                  background: 'rgba(255, 97, 26, 0.1)',
                  borderRadius: 'var(--radius-sm)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  border: '1px solid rgba(255, 97, 26, 0.18)',
                }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '18px', height: '18px', color: 'var(--accent)' }}>
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                  <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                </svg>
              </div>
              <div className="edu-content">
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '5px', lineHeight: 1.35 }}>
                  {edu.school}
                </h3>
                <p className="edu-degree" style={{ fontSize: '0.78rem', color: 'var(--accent)', marginBottom: '3px' }}>
                  {edu.degree}
                </p>
                <p className="edu-location" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                  {edu.location}
                </p>
                <span 
                  className="edu-period"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.68rem',
                    color: 'var(--text-muted)',
                    background: 'rgba(255, 255, 255, 0.03)',
                    padding: '2px 9px',
                    borderRadius: '100px',
                    border: '1px solid var(--border)',
                  }}
                >
                  {edu.period}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      <style>{`
        .timeline-content:hover {
          border-color: var(--border-hover) !important;
          background: var(--bg-card-hover) !important;
        }
        .edu-card:hover {
          background: var(--bg-card-hover) !important;
        }
        @media (max-width: 768px) {
          .timeline-bar {
            display: none !important;
          }
          .timeline-item {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
          .timeline-marker {
            display: none !important;
          }
          .education-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
