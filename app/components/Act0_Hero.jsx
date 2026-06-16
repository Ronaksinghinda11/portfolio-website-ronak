'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

export default function Act0_Hero() {
  const [typedText, setTypedText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const orb1Ref = useRef(null);
  const orb2Ref = useRef(null);
  const orb3Ref = useRef(null);

  const phrases = [
    'Full-Stack Developer',
    'Software Engineer',
    'Node.js & React Dev',
    'API Architect',
    'Problem Solver',
  ];

  // Typing effect
  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    let timer;

    if (!isDeleting) {
      timer = setTimeout(() => {
        setTypedText(currentPhrase.slice(0, charIndex + 1));
        setCharIndex(prev => prev + 1);
      }, 75);

      if (charIndex === currentPhrase.length) {
        timer = setTimeout(() => setIsDeleting(true), 2200);
      }
    } else {
      timer = setTimeout(() => {
        setTypedText(currentPhrase.slice(0, charIndex - 1));
        setCharIndex(prev => prev - 1);
      }, 38);

      if (charIndex === 0) {
        setIsDeleting(false);
        setPhraseIndex(prev => (prev + 1) % phrases.length);
      }
    }

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, phraseIndex]);

  // Orb parallax mouse tracking
  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    let frameId;
    const animateOrbs = () => {
      const ease = 0.05;
      currentX += (mouseX * 30 - currentX) * ease;
      currentY += (mouseY * 30 - currentY) * ease;

      if (orb1Ref.current) orb1Ref.current.style.transform = `translate(${currentX}px, ${currentY}px)`;
      if (orb2Ref.current) orb2Ref.current.style.transform = `translate(${-currentX * 0.8}px, ${-currentY * 0.8}px)`;
      if (orb3Ref.current) orb3Ref.current.style.transform = `translate(${currentX * 0.5}px, ${currentY * 0.5}px)`;

      frameId = requestAnimationFrame(animateOrbs);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animateOrbs();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(frameId);
    };
  }, []);

  const handleCtaClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="home" 
      className="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--bg-primary)',
      }}
    >
      {/* Grid Pattern Background */}
      <div 
        className="hero-bg-grid"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255, 97, 26, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 97, 26, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
        }}
      />

      {/* Parallax Blurred Orbs */}
      <div className="hero-orbs" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div 
          ref={orb1Ref}
          className="orb orb-1"
          style={{
            position: 'absolute',
            width: '600px', height: '600px',
            background: 'radial-gradient(circle, rgba(255, 97, 26, 0.08), transparent 65%)',
            top: '-150px', left: '-150px',
            borderRadius: '50%',
            filter: 'blur(100px)',
          }}
        />
        <div 
          ref={orb2Ref}
          className="orb orb-2"
          style={{
            position: 'absolute',
            width: '400px', height: '400px',
            background: 'radial-gradient(circle, rgba(255, 140, 87, 0.05), transparent 65%)',
            bottom: '0', right: '-100px',
            borderRadius: '50%',
            filter: 'blur(100px)',
          }}
        />
        <div 
          ref={orb3Ref}
          className="orb orb-3"
          style={{
            position: 'absolute',
            width: '300px', height: '300px',
            background: 'radial-gradient(circle, rgba(255, 97, 26, 0.04), transparent 65%)',
            top: '40%', left: '55%',
            borderRadius: '50%',
            filter: 'blur(100px)',
          }}
        />
      </div>

      {/* Main Content */}
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="hero-content" style={{ maxWidth: '820px', marginTop: '60px' }}>
          
          {/* Availability Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="hero-tag"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '0.78rem',
              fontFamily: 'var(--font-mono)',
              color: 'var(--text-secondary)',
              marginBottom: '32px',
              letterSpacing: '0.06em',
            }}
          >
            <span 
              className="dot pulse"
              style={{
                width: '7px', height: '7px',
                background: '#3ddc84',
                borderRadius: '50%',
                display: 'inline-block',
                boxShadow: '0 0 8px rgba(61, 220, 132, 0.6)',
              }}
            />
            Available for opportunities
          </motion.div>

          {/* Name Reveal */}
          <h1 
            className="hero-name"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(3.2rem, 8.5vw, 6.5rem)',
              fontWeight: 700,
              letterSpacing: '-0.04em',
              lineHeight: 1.02,
              color: 'var(--text-primary)',
              marginBottom: '22px',
            }}
          >
            <span style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.15em', marginBottom: '-0.15em' }}>
              <motion.span
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
                style={{ display: 'block' }}
              >
                Ronak Singh
              </motion.span>
            </span>
            <span style={{ display: 'block', overflow: 'hidden' }}>
              <motion.span
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 1, 0.5, 1] }}
                className="gradient-text"
                style={{ display: 'block' }}
              >
                Inda
              </motion.span>
            </span>
          </h1>

          {/* Typing Role */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="hero-role"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(0.95rem, 2vw, 1.15rem)',
              color: 'var(--text-muted)',
              marginBottom: '24px',
              minHeight: '1.8rem',
              letterSpacing: '0.02em',
            }}
          >
            <span>{typedText}</span>
            <span className="cursor-blink" style={{ color: 'var(--accent)', animation: 'blink 1s step-end infinite' }}>|</span>
          </motion.p>

          {/* Hero Description */}
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="hero-desc"
            style={{
              fontSize: '1.02rem',
              color: 'var(--text-secondary)',
              maxWidth: '520px',
              marginBottom: '44px',
              lineHeight: '1.8',
            }}
          >
            Computer Science Engineer crafting scalable full-stack solutions,
            engineering RESTful APIs, and solving complex algorithmic challenges.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="hero-cta"
            style={{
              display: 'flex',
              gap: '14px',
              flexWrap: 'wrap',
              marginBottom: '64px',
            }}
          >
            <a 
              href="#projects" 
              onClick={(e) => handleCtaClick(e, 'projects')}
              className="btn btn-primary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 26px',
                borderRadius: 'var(--radius-sm)',
                fontWeight: '600',
                fontSize: '0.85rem',
                fontFamily: 'var(--font-body)',
                background: 'var(--accent)',
                color: '#fff',
                transition: 'var(--transition)',
              }}
            >
              <span>View Projects</span>
              <svg 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                style={{ width: '16px', height: '16px', transition: 'transform var(--transition)' }}
              >
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
            <a 
              href="#contact" 
              onClick={(e) => handleCtaClick(e, 'contact')}
              className="btn btn-outline"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 26px',
                borderRadius: 'var(--radius-sm)',
                fontWeight: '600',
                fontSize: '0.85rem',
                fontFamily: 'var(--font-body)',
                border: '1px solid var(--border-accent)',
                color: 'var(--text-secondary)',
                background: 'transparent',
                transition: 'var(--transition)',
              }}
            >
              Get In Touch
            </a>
          </motion.div>

          {/* Stats Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="hero-stats"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '40px',
              flexWrap: 'wrap',
              paddingTop: '24px',
              borderTop: '1px solid var(--border)',
            }}
          >
            <div className="stat">
              <span className="stat-num" style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>140</span>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent)' }}>+</span>
              <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.09em', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>Problems Solved</p>
            </div>
            <div className="stat-divider" style={{ width: '1px', height: '36px', background: 'var(--border)' }} />
            <div className="stat">
              <span className="stat-num" style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>1566</span>
              <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.09em', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>LeetCode Rating</p>
            </div>
            <div className="stat-divider" style={{ width: '1px', height: '36px', background: 'var(--border)' }} />
            <div className="stat">
              <span className="stat-num" style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>3</span>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent)' }}>+</span>
              <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.09em', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>Projects Built</p>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div 
        className="hero-scroll"
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          color: 'var(--text-muted)',
          fontSize: '0.68rem',
          fontFamily: 'var(--font-mono)',
          letterSpacing: '0.12em',
        }}
      >
        <div 
          className="scroll-indicator"
          style={{
            width: '24px', height: '38px',
            border: '1px solid var(--border-accent)',
            borderRadius: '12px',
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '6px',
          }}
        >
          <div 
            className="scroll-wheel"
            style={{
              width: '3px', height: '7px',
              background: 'var(--accent)',
              borderRadius: '2px',
              animation: 'scroll-anim 2s ease infinite',
            }}
          />
        </div>
        <span>Scroll down</span>
      </div>

      {/* Global CSS Typing blinking cursor and pulse styles */}
      <style jsx global>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes scroll-anim {
          0% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(12px); }
        }
        @keyframes pulse-green {
          0%, 100% { box-shadow: 0 0 0 0 rgba(61, 220, 132, 0.5); }
          50% { box-shadow: 0 0 0 7px rgba(61, 220, 132, 0); }
        }
        .hero-tag .pulse {
          animation: pulse-green 2.5s ease-in-out infinite;
        }
        .hero-cta .btn-primary:hover {
          background: var(--accent-2) !important;
          transform: translateY(-1px);
          box-shadow: 0 6px 24px rgba(255, 97, 26, 0.4);
        }
        .hero-cta .btn-outline:hover {
          border-color: var(--accent) !important;
          color: var(--text-primary) !important;
          transform: translateY(-1px);
          background: rgba(255, 97, 26, 0.05) !important;
        }
      `}</style>
    </section>
  );
}
