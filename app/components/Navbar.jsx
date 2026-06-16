'use client';

import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { label: 'Home', target: 'home' },
    { label: 'About', target: 'about' },
    { label: 'Skills', target: 'skills' },
    { label: 'Projects', target: 'projects' },
    { label: 'Experience', target: 'experience' },
    { label: 'Contact', target: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      // Track active section
      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
      let current = 'home';
      
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          // If top of section is near the middle of viewport
          if (rect.top <= window.innerHeight * 0.4) {
            current = sectionId;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e, targetId) => {
    e.preventDefault();
    setIsOpen(false);
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav 
      className={`navbar ${isScrolled ? 'scrolled' : ''}`}
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 1000,
        padding: isScrolled ? '14px 0' : '24px 0',
        transition: 'background 0.25s ease, padding 0.25s ease, border-color 0.25s ease',
        background: isScrolled ? 'rgba(18, 18, 18, 0.9)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'blur(16px)' : 'none',
        borderBottom: isScrolled ? '1px solid var(--border)' : '1px solid transparent',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a 
          href="#home" 
          onClick={(e) => handleLinkClick(e, 'home')}
          className="nav-logo"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '1.1rem',
            letterSpacing: '0.08em',
            color: 'var(--text-primary)',
            transition: 'color 0.25s ease',
          }}
        >
          <span style={{ color: 'var(--accent)' }}>&lt;</span>RSI<span style={{ color: 'var(--accent)' }}>/&gt;</span>
        </a>

        {/* Desktop Links */}
        <ul 
          className={`nav-links ${isOpen ? 'open' : ''}`}
          style={{
            display: 'flex',
            gap: '40px',
            alignItems: 'center',
            listStyle: 'none',
          }}
        >
          {navLinks.map((link) => (
            <li key={link.target}>
              <a
                href={`#${link.target}`}
                onClick={(e) => handleLinkClick(e, link.target)}
                className={`nav-link ${activeSection === link.target ? 'active' : ''}`}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.85rem',
                  fontWeight: '500',
                  color: activeSection === link.target ? 'var(--text-primary)' : 'var(--text-secondary)',
                  letterSpacing: '0.03em',
                  position: 'relative',
                  paddingBottom: '4px',
                  transition: 'color 0.25s ease',
                  borderBottom: activeSection === link.target ? '1.5px solid var(--accent)' : '1.5px solid transparent'
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Hamburger Button */}
        <button 
          className="hamburger mobile-only" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          style={{
            display: 'none',
            flexDirection: 'column',
            gap: '5px',
            background: 'none',
            border: 'none',
            padding: '4px',
          }}
        >
          <span style={{ display: 'block', width: '22px', height: '1.5px', background: 'var(--text-secondary)', transform: isOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none', transition: '0.2s' }}></span>
          <span style={{ display: 'block', width: '22px', height: '1.5px', background: 'var(--text-secondary)', opacity: isOpen ? 0 : 1, transition: '0.2s' }}></span>
          <span style={{ display: 'block', width: '22px', height: '1.5px', background: 'var(--text-secondary)', transform: isOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'none', transition: '0.2s' }}></span>
        </button>
      </div>

      {/* Mobile Menu Drawer CSS */}
      <style jsx global>{`
        @media (max-width: 768px) {
          .navbar .hamburger {
            display: flex !important;
          }
          .navbar .nav-links {
            position: fixed;
            top: 0;
            right: -100%;
            width: 70%;
            height: 100vh;
            background: rgba(10, 10, 10, 0.98);
            backdrop-filter: blur(20px);
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 32px;
            transition: right 0.4s cubic-bezier(0.25, 1, 0.5, 1);
            border-left: 1px solid var(--border);
            z-index: 999;
          }
          .navbar .nav-links.open {
            right: 0;
          }
        }
      `}</style>
    </nav>
  );
}
