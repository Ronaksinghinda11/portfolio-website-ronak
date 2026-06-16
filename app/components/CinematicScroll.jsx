'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function CinematicScroll() {
  const containerRef = useRef(null);
  const workstationRef = useRef(null);
  const screenRef = useRef(null);
  const terminalRef = useRef(null);
  const nameOverlayRef = useRef(null);
  const badgesContainerRef = useRef(null);
  const archRef = useRef(null);
  const projectsRef = useRef(null);

  const [isDesktop, setIsDesktop] = useState(true);

  // Mouse tilt tracking variables
  const mouseCoords = useRef({ x: 0, y: 0 });
  const currentTilt = useRef({ x: -10, y: 12 }); // matching default workstation rotation

  useEffect(() => {
    // Register GSAP ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    const checkDevice = () => {
      const desktop = window.innerWidth > 992;
      setIsDesktop(desktop);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);

    if (!isDesktop) return () => window.removeEventListener('resize', checkDevice);

    // Desktop GSAP Timeline Setup
    const ctx = gsap.context(() => {
      // 1. Initial states
      gsap.set(workstationRef.current, { rotateX: 12, rotateY: -10, scale: 0.9, z: -100 });
      gsap.set(screenRef.current, { filter: 'brightness(0)', boxShadow: '0 0 0px rgba(255, 97, 26, 0)' });
      gsap.set(nameOverlayRef.current, { opacity: 0, scale: 0.4, filter: 'blur(10px)' });
      gsap.set('.badge-item', { opacity: 0, scale: 0, y: 100 });
      gsap.set(archRef.current, { opacity: 0, scale: 0.8 });
      gsap.set('.arch-line', { strokeDashoffset: 100, strokeDasharray: 100 });
      gsap.set('.arch-node', { opacity: 0, scale: 0.5 });
      gsap.set(projectsRef.current, { opacity: 0, pointerEvents: 'none' });
      gsap.set('.project-3d-card', { opacity: 0, y: 150, rotateY: -45, scale: 0.7 });

      // 2. Create the Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=450%', // 4.5 viewport heights of scroll distance
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: (self) => {
            // Check scroll progress to enable/disable pointer events on projects in Act 4
            if (projectsRef.current) {
              if (self.progress > 0.75) {
                projectsRef.current.style.pointerEvents = 'auto';
              } else {
                projectsRef.current.style.pointerEvents = 'none';
              }
            }
          }
        }
      });

      // --- ACT 1: Workstation Powers On (Scroll 0% -> 20%) ---
      tl.to(screenRef.current, {
        filter: 'brightness(1.2)',
        boxShadow: '0 0 35px rgba(255, 97, 26, 0.4)',
        duration: 0.8
      }, 0);

      tl.to(workstationRef.current, {
        scale: 1,
        z: 0,
        rotateX: 6,
        rotateY: -5,
        duration: 1
      }, 0);

      tl.to(nameOverlayRef.current, {
        opacity: 1,
        scale: 1.1,
        filter: 'blur(0px)',
        duration: 0.8
      }, 0.2);

      tl.to(nameOverlayRef.current, {
        opacity: 0,
        scale: 1.3,
        filter: 'blur(8px)',
        duration: 0.6
      }, 1.2);

      // --- ACT 2: Typing & Parallax Tech Badges (Scroll 20% -> 45%) ---
      // Animate code typing height or display
      tl.to('.terminal-code-line', {
        width: '100%',
        stagger: 0.2,
        duration: 1.5
      }, 1.5);

      tl.to('.badge-item', {
        opacity: 1,
        scale: 1,
        y: 0,
        stagger: 0.15,
        duration: 1
      }, 1.8);

      // Add gentle drift to badges
      tl.to('.badge-item-1', { x: -30, y: -40, duration: 1.5 }, 2.5);
      tl.to('.badge-item-2', { x: 30, y: -60, duration: 1.5 }, 2.5);
      tl.to('.badge-item-3', { x: -45, y: 50, duration: 1.5 }, 2.5);
      tl.to('.badge-item-4', { x: 45, y: 40, duration: 1.5 }, 2.5);
      tl.to('.badge-item-5', { x: -60, y: -10, duration: 1.5 }, 2.5);
      tl.to('.badge-item-6', { x: 60, y: -20, duration: 1.5 }, 2.5);

      // Hide badges and text for next act
      tl.to('.badge-item', { opacity: 0, scale: 0.5, duration: 0.6 }, 4);
      tl.to(terminalRef.current, { opacity: 0, duration: 0.5 }, 4);

      // --- ACT 3: Architecture Diagram (Scroll 45% -> 70%) ---
      // Rotate monitor flat to display the diagram as an overlay
      tl.to(workstationRef.current, {
        rotateX: 0,
        rotateY: 0,
        scale: 1.15,
        y: 20,
        duration: 1
      }, 4.2);

      tl.to(archRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.8
      }, 4.5);

      tl.to('.arch-node', {
        opacity: 1,
        scale: 1,
        stagger: 0.15,
        duration: 0.6
      }, 4.8);

      tl.to('.arch-line-1', { strokeDashoffset: 0, duration: 0.8 }, 5.2);
      tl.to('.arch-node-api', { boxShadow: '0 0 20px rgba(255, 97, 26, 0.4)', duration: 0.3 }, 5.8);

      tl.to('.arch-line-2', { strokeDashoffset: 0, duration: 0.6 }, 6);
      tl.to('.arch-node-db', { boxShadow: '0 0 20px rgba(255, 97, 26, 0.4)', duration: 0.3 }, 6.5);

      tl.to('.arch-line-3', { strokeDashoffset: 0, duration: 0.6 }, 6.1);
      tl.to('.arch-node-qa', { boxShadow: '0 0 20px rgba(59, 130, 246, 0.4)', duration: 0.3 }, 6.6);

      // Fade out architecture
      tl.to(archRef.current, { opacity: 0, scale: 0.9, duration: 0.6 }, 7.2);
      
      // Rotate workstation back to 3D angle
      tl.to(workstationRef.current, {
        rotateX: 10,
        rotateY: -8,
        scale: 0.8,
        y: 40,
        duration: 0.8
      }, 7.5);

      // --- ACT 4: Emerging Project Cards (Scroll 70% -> 100%) ---
      tl.to(projectsRef.current, {
        opacity: 1,
        duration: 0.5
      }, 7.8);

      tl.to('.project-3d-card', {
        opacity: 1,
        y: 0,
        rotateY: 0,
        scale: 1,
        stagger: 0.2,
        duration: 1.2,
        ease: 'power2.out'
      }, 8.0);
    });

    // 3. Ambient mouse parallax workstation tilting (only active when not in flat diagram view)
    const handleWorkstationMouseMove = (e) => {
      const scrollTriggerObj = ScrollTrigger.getById(containerRef.current);
      // Only tilt when scroll Trigger is between progress 0 and 0.4 OR 0.75 and 1.0 (avoid tilting during architecture layout)
      const scrollProgress = ScrollTrigger.getAll()[0]?.progress || 0;
      if (scrollProgress > 0.4 && scrollProgress < 0.75) return;

      mouseCoords.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseCoords.current.y = (e.clientY / window.innerHeight - 0.5) * 2;

      const targetTiltX = 6 + mouseCoords.current.y * -12; // rotateX base is 6
      const targetTiltY = -5 + mouseCoords.current.x * 12; // rotateY base is -5

      currentTilt.current.x += (targetTiltX - currentTilt.current.x) * 0.08;
      currentTilt.current.y += (targetTiltY - currentTilt.current.y) * 0.08;

      if (workstationRef.current) {
        workstationRef.current.style.transform = `rotateX(${currentTilt.current.x}deg) rotateY(${currentTilt.current.y}deg) scale(${scrollProgress > 0.7 ? 0.8 : 1})`;
      }
    };

    window.addEventListener('mousemove', handleWorkstationMouseMove);

    return () => {
      ctx.revert();
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('mousemove', handleWorkstationMouseMove);
    };
  }, [isDesktop]);

  // Card mouse tilt handler for Project Cards (Act 4)
  const handleCardMouseMove = (e, index) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `scale(1.03) rotateX(${-y * 12}deg) rotateY(${x * 12}deg)`;
    card.style.boxShadow = `0 15px 35px rgba(255, 97, 26, 0.25)`;
  };

  const handleCardMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.transform = 'scale(1) rotateX(0deg) rotateY(0deg)';
    card.style.boxShadow = 'var(--shadow-card)';
  };

  // --- RENDERING MOBILE FALLBACK ---
  if (!isDesktop) {
    return (
      <>
        {/* Mobile Skills Section */}
        <section className="section" id="skills" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border)' }}>
          <div className="container">
            <div className="section-header">
              <span className="tag">01 / Skills</span>
              <h2 className="section-title" style={{ fontFamily: 'var(--font-heading)' }}>What I Work With</h2>
            </div>
            
            <div className="skills-grid-mobile" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
              <div className="skill-card-mob" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '24px' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--accent)', marginBottom: '16px' }}>Languages</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {['C', 'C++', 'Python', 'Java', 'JavaScript'].map(s => (
                    <span key={s} className="tag-chip" style={{ background: 'rgba(255,97,26,0.1)', color: 'var(--text-primary)', border: '1px solid rgba(255,97,26,0.2)', padding: '6px 12px', borderRadius: '4px', fontSize: '0.78rem', fontFamily: 'var(--font-mono)' }}>{s}</span>
                  ))}
                </div>
              </div>

              <div className="skill-card-mob" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '24px' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--accent)', marginBottom: '16px' }}>Web Technologies</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {['HTML', 'CSS', 'React.js', 'Node.js', 'Express.js', 'Flask'].map(s => (
                    <span key={s} className="tag-chip" style={{ background: 'rgba(255,97,26,0.1)', color: 'var(--text-primary)', border: '1px solid rgba(255,97,26,0.2)', padding: '6px 12px', borderRadius: '4px', fontSize: '0.78rem', fontFamily: 'var(--font-mono)' }}>{s}</span>
                  ))}
                </div>
              </div>

              <div className="skill-card-mob" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '24px' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--accent)', marginBottom: '16px' }}>Tools & Databases</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {['GitHub', 'VS Code', 'MySQL', 'MongoDB', 'PostgreSQL', 'PyMySQL', 'Canva'].map(s => (
                    <span key={s} className="tag-chip" style={{ background: 'rgba(255,97,26,0.1)', color: 'var(--text-primary)', border: '1px solid rgba(255,97,26,0.2)', padding: '6px 12px', borderRadius: '4px', fontSize: '0.78rem', fontFamily: 'var(--font-mono)' }}>{s}</span>
                  ))}
                </div>
              </div>

              <div className="skill-card-mob" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '24px' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--accent)', marginBottom: '16px' }}>Concepts</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {['Data Structures', 'Algorithms', 'DBMS', 'REST APIs', 'OOP'].map(s => (
                    <span key={s} className="tag-chip" style={{ background: 'rgba(255,97,26,0.1)', color: 'var(--text-primary)', border: '1px solid rgba(255,97,26,0.2)', padding: '6px 12px', borderRadius: '4px', fontSize: '0.78rem', fontFamily: 'var(--font-mono)' }}>{s}</span>
                  ))}
                </div>
              </div>

              <div className="skill-card-mob" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '24px' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--accent)', marginBottom: '16px' }}>Soft Skills</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {['Public Speaking', 'Event Management', 'Team Leadership', 'Problem Solving'].map(s => (
                    <span key={s} className="tag-chip" style={{ background: 'rgba(255,97,26,0.1)', color: 'var(--text-primary)', border: '1px solid rgba(255,97,26,0.2)', padding: '6px 12px', borderRadius: '4px', fontSize: '0.78rem', fontFamily: 'var(--font-mono)' }}>{s}</span>
                  ))}
                </div>
              </div>

              <div className="skill-card-mob" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '24px' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--accent)', marginBottom: '16px' }}>Coding Profiles</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem' }}>
                  <div>
                    <strong style={{ color: 'var(--text-primary)' }}>LeetCode:</strong>
                    <span style={{ color: 'var(--text-secondary)', marginLeft: '6px' }}>1566 rating · Top 28.5% · 140+ solved</span>
                  </div>
                  <div>
                    <strong style={{ color: 'var(--text-primary)' }}>CodeChef:</strong>
                    <span style={{ color: 'var(--text-secondary)', marginLeft: '6px' }}>2-Star (Div 3)</span>
                  </div>
                  <div>
                    <strong style={{ color: 'var(--text-primary)' }}>GeeksforGeeks:</strong>
                    <span style={{ color: 'var(--text-secondary)', marginLeft: '6px' }}>Active Practitioner</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mobile Architecture Diagram Section */}
        <section className="section" style={{ background: 'var(--bg-primary)', borderTop: '1px solid var(--border)' }}>
          <div className="container">
            <div className="section-header">
              <span className="tag">02 / Architecture</span>
              <h2 className="section-title" style={{ fontFamily: 'var(--font-heading)' }}>System Flow</h2>
            </div>
            
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '32px 20px', display: 'flex', flexDirection: 'column', gap: '30px', alignItems: 'center', textAlign: 'center' }}>
              <div style={{ padding: '12px 24px', border: '1px solid rgba(255,97,26,0.3)', borderRadius: '8px', background: 'rgba(255,97,26,0.05)', color: 'var(--text-primary)', width: '220px', fontWeight: 600 }}>
                React Frontend
              </div>
              <div style={{ color: 'var(--accent)', fontSize: '1.2rem' }}>↓</div>
              <div style={{ padding: '12px 24px', border: '1px solid rgba(255,97,26,0.3)', borderRadius: '8px', background: 'rgba(255,97,26,0.05)', color: 'var(--text-primary)', width: '220px', fontWeight: 600 }}>
                Node.js REST API
              </div>
              <div style={{ color: 'var(--accent)', fontSize: '1.2rem' }}>↓</div>
              <div style={{ padding: '12px 24px', border: '1px solid rgba(255,97,26,0.3)', borderRadius: '8px', background: 'rgba(255,97,26,0.05)', color: 'var(--text-primary)', width: '220px', fontWeight: 600 }}>
                PostgreSQL DB
              </div>
              
              <div style={{ width: '100%', borderTop: '1px solid var(--border)', margin: '20px 0 10px 0' }} />
              
              <div style={{ padding: '12px 24px', border: '1px solid rgba(59,130,246,0.3)', borderRadius: '8px', background: 'rgba(59,130,246,0.05)', color: 'var(--text-primary)', width: '220px', fontWeight: 600 }}>
                Playwright E2E Pipeline
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', maxWidth: '300px', marginTop: '-10px' }}>
                Automated regression suite executing tests across front-end flows and API endpoints.
              </p>
            </div>
          </div>
        </section>

        {/* Mobile Projects Section */}
        <section className="section" id="projects" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border)' }}>
          <div className="container">
            <div className="section-header">
              <span className="tag">03 / Projects</span>
              <h2 className="section-title" style={{ fontFamily: 'var(--font-heading)' }}>What I've Built</h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
              
              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '28px', position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div style={{ color: 'var(--accent)' }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '28px', height: '28px' }}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  </div>
                  <a href="https://github.com/RonakSinghinda" target="_blank" rel="noopener">
                    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '20px', height: '20px', color: 'var(--text-secondary)' }}><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>
                  </a>
                </div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', marginBottom: '12px' }}>SafeSearch AI Ecosystem</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '20px' }}>
                  A privacy-focused platform featuring a Chrome Extension (Manifest V3, JavaScript) and a React.js–Node.js web application for sensitive data protection and content security.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {['React.js', 'Node.js', 'MongoDB', 'JavaScript', 'Extension'].map(t => (
                    <span key={t} style={{ fontSize: '0.72rem', background: 'rgba(255,255,255,0.04)', color: 'var(--text-secondary)', padding: '4px 10px', borderRadius: '4px', border: '1px solid var(--border)' }}>{t}</span>
                  ))}
                </div>
              </div>

              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '28px', position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div style={{ color: 'var(--accent)' }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '28px', height: '28px' }}><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
                  </div>
                  <a href="https://github.com/RonakSinghinda" target="_blank" rel="noopener">
                    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '20px', height: '20px', color: 'var(--text-secondary)' }}><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>
                  </a>
                </div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', marginBottom: '12px' }}>Solar-Sight AI</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '20px' }}>
                  An AI-powered solar energy analysis platform that evaluates location and environmental data to recommend optimal solar panel placement and energy generation strategies.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {['React.js', 'Node.js', 'Python', 'ML'].map(t => (
                    <span key={t} style={{ fontSize: '0.72rem', background: 'rgba(255,255,255,0.04)', color: 'var(--text-secondary)', padding: '4px 10px', borderRadius: '4px', border: '1px solid var(--border)' }}>{t}</span>
                  ))}
                </div>
              </div>

              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '28px', position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div style={{ color: 'var(--accent)' }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '28px', height: '28px' }}><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>
                  </div>
                  <a href="https://github.com/RonakSinghinda" target="_blank" rel="noopener">
                    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '20px', height: '20px', color: 'var(--text-secondary)' }}><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>
                  </a>
                </div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', marginBottom: '12px' }}>Port-Wise Trade Analytics</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '20px' }}>
                  A trade analytics platform to analyze port-wise import and export data, enabling users to identify trade patterns, volume trends, and key market insights through interactive dashboards.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {['Python', 'React.js', 'Data Viz', 'Analytics'].map(t => (
                    <span key={t} style={{ fontSize: '0.72rem', background: 'rgba(255,255,255,0.04)', color: 'var(--text-secondary)', padding: '4px 10px', borderRadius: '4px', border: '1px solid var(--border)' }}>{t}</span>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>
      </>
    );
  }

  // --- RENDERING DESKTOP CINEMATIC SCROLL ---
  return (
    <div ref={containerRef} style={{ width: '100%', position: 'relative' }}>
      
      {/* 3D Workstation Pinned Viewport Container */}
      <div 
        className="pinned-container"
        style={{
          position: 'relative',
          width: '100%',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        
        {/* Subtle Background Glow behind the monitor */}
        <div 
          className="ambient-glow"
          style={{
            width: '600px',
            height: '600px',
            background: 'var(--gradient-glow)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 0
          }}
        />

        {/* Act 1 Scale Name Overlay (moved outside scene-3d to avoid 3D clipping) */}
        <div 
          ref={nameOverlayRef}
          style={{
            position: 'absolute',
            top: '25%',
            left: 0,
            width: '100%',
            textAlign: 'center',
            fontFamily: 'var(--font-heading)',
            fontSize: '4.8rem',
            fontWeight: 800,
            letterSpacing: '-0.04em',
            zIndex: 15,
            pointerEvents: 'none',
            lineHeight: 1.1,
          }}
        >
          RONAK SINGH INDA
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', color: 'var(--accent)', marginTop: '12px', letterSpacing: '0.2em' }}>
            SOFTWARE ENGINEER · BENGALURU
          </div>
        </div>

        {/* 3D Scene Wrapper */}
        <div 
          className="scene-3d" 
          style={{ 
            zIndex: 1, 
            position: 'relative', 
            width: '100%', 
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            perspective: '1200px',
            transformStyle: 'preserve-3d'
          }}
        >

          {/* Drifting Badges Container (Act 2) */}
          <div 
            ref={badgesContainerRef}
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 5,
              pointerEvents: 'none',
            }}
          >
            {/* Badge Item 1 */}
            <div className="badge-item badge-item-1" style={{ position: 'absolute', top: '15%', left: '15%' }}>
              <span className="badge-span">React.js</span>
            </div>
            {/* Badge Item 2 */}
            <div className="badge-item badge-item-2" style={{ position: 'absolute', top: '12%', right: '18%' }}>
              <span className="badge-span">Node.js</span>
            </div>
            {/* Badge Item 3 */}
            <div className="badge-item badge-item-3" style={{ position: 'absolute', bottom: '22%', left: '18%' }}>
              <span className="badge-span">PostgreSQL</span>
            </div>
            {/* Badge Item 4 */}
            <div className="badge-item badge-item-4" style={{ position: 'absolute', bottom: '25%', right: '15%' }}>
              <span className="badge-span">Playwright</span>
            </div>
            {/* Badge Item 5 */}
            <div className="badge-item badge-item-5" style={{ position: 'absolute', top: '45%', left: '8%' }}>
              <span className="badge-span">Python</span>
            </div>
            {/* Badge Item 6 */}
            <div className="badge-item badge-item-6" style={{ position: 'absolute', top: '48%', right: '8%' }}>
              <span className="badge-span">MongoDB</span>
            </div>
          </div>

          {/* CSS 3D Workstation */}
          <div ref={workstationRef} className="workstation" style={{ transformStyle: 'preserve-3d', position: 'relative' }}>
            
            {/* Desk Surface (horizontal plane) */}
            <div 
              className="desk-base"
              style={{
                width: '580px',
                height: '350px',
                background: '#141414',
                borderTop: '2px solid rgba(255, 97, 26, 0.12)',
                borderRadius: '8px',
                position: 'absolute',
                bottom: '-220px',
                left: '50%',
                transform: 'translateX(-50%) rotateX(85deg)',
                boxShadow: '0 30px 100px rgba(0,0,0,0.9), inset 0 20px 40px rgba(255, 97, 26, 0.03)',
              }}
            />

            {/* Keyboard (on desk surface) */}
            <div 
              className="keyboard"
              style={{
                width: '320px',
                height: '80px',
                background: '#1e1e1e',
                border: '1px solid #2d2d2d',
                borderRadius: '6px',
                position: 'absolute',
                bottom: '-195px',
                left: '50%',
                transform: 'translateX(-50%) rotateX(80deg) translateZ(30px)',
                boxShadow: '0 8px 16px rgba(0,0,0,0.6), inset 0 2px 4px rgba(255,255,255,0.05)',
                padding: '8px',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
              }}
            >
              <div style={{ flex: 1, background: '#171717', border: '1px solid #282828', borderRadius: '3px', position: 'relative', overflow: 'hidden' }}>
                {/* Simulated keys */}
                <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, background: 'repeating-linear-gradient(90deg, transparent, transparent 12px, #262626 12px, #262626 14px)' }} />
                <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, background: 'repeating-linear-gradient(0deg, transparent, transparent 8px, #262626 8px, #262626 9px)' }} />
                {/* Ambient keyboard LED light */}
                <div style={{ position: 'absolute', bottom: '2px', left: '10%', right: '10%', height: '2px', background: 'var(--accent)', filter: 'blur(3px)', opacity: 0.8 }} />
              </div>
            </div>

            {/* Stand */}
            <div 
              className="stand"
              style={{
                width: '56px',
                height: '140px',
                background: 'linear-gradient(to bottom, #2c2c2c, #1a1a1a)',
                position: 'absolute',
                bottom: '-150px',
                left: '50%',
                transform: 'translateX(-50%) translateZ(-40px)',
                borderRadius: '8px',
                border: '1px solid #333',
              }}
            />

            {/* Monitor Cabinet */}
            <div 
              ref={screenRef} 
              className="monitor"
              style={{
                width: '520px',
                height: '320px',
                background: '#1a1a1a',
                border: '12px solid #232323',
                borderRadius: '16px',
                position: 'relative',
                transformStyle: 'preserve-3d',
                transition: 'box-shadow 0.3s ease, filter 0.3s ease',
              }}
            >
              
              {/* Screen Display Panel */}
              <div 
                className="monitor-screen"
                style={{
                  width: '100%',
                  height: '100%',
                  background: '#0a0a0a',
                  overflow: 'hidden',
                  position: 'relative',
                  padding: '24px 20px',
                  boxShadow: 'inset 0 0 40px rgba(0, 0, 0, 0.95)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                {/* Ambient Scanline overlay for retro CRT effect */}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))', backgroundSize: '100% 4px, 6px 100%', pointerEvents: 'none', zIndex: 10 }} />

                {/* CRT Glass reflection curve */}
                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 15%, rgba(255, 255, 255, 0.05) 0%, transparent 60%)', pointerEvents: 'none', zIndex: 11 }} />

                {/* Terminal Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255, 97, 26, 0.15)', paddingBottom: '6px', fontSize: '0.65rem', color: 'rgba(255, 97, 26, 0.6)', fontFamily: 'var(--font-mono)' }}>
                  <span>TERMINAL · RSI-SH</span>
                  <span>ONLINE</span>
                </div>

                {/* Terminal Code Lines (Act 2) */}
                <div 
                  ref={terminalRef} 
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    color: '#ff8c57',
                    lineHeight: '1.4',
                    marginTop: '8px'
                  }}
                >
                  <div className="terminal-code-line" style={{ width: '0%', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                    <span style={{ color: 'var(--accent-muted)' }}>$ </span>
                    <span style={{ color: 'var(--text-primary)' }}>npm run dev</span>
                  </div>
                  
                  <div className="terminal-code-line" style={{ width: '0%', overflow: 'hidden', whiteSpace: 'nowrap', transitionDelay: '0.2s' }}>
                    <span style={{ color: '#888' }}>&gt; portfolio@2.0.0 dev</span>
                  </div>

                  <div className="terminal-code-line" style={{ width: '0%', overflow: 'hidden', whiteSpace: 'nowrap', transitionDelay: '0.4s' }}>
                    <span style={{ color: '#3ccf91' }}>✓ Ready in 1.1s (localhost:3000)</span>
                  </div>

                  <div className="terminal-code-line" style={{ width: '0%', overflow: 'hidden', whiteSpace: 'nowrap', transitionDelay: '0.6s' }}>
                    <span style={{ color: 'var(--accent-muted)' }}>$ </span>
                    <span style={{ color: '#569cd6' }}>const</span> app = <span style={{ color: '#4fc1ff' }}>require</span>(<span style={{ color: '#ce9178' }}>'express'</span>)();
                  </div>

                  <div className="terminal-code-line" style={{ width: '0%', overflow: 'hidden', whiteSpace: 'nowrap', transitionDelay: '0.8s' }}>
                    app.<span style={{ color: '#dcdcaa' }}>get</span>(<span style={{ color: '#ce9178' }}>'/api/skills'</span>, authenticate, getSkills);
                  </div>

                  <div className="terminal-code-line" style={{ width: '0%', overflow: 'hidden', whiteSpace: 'nowrap', transitionDelay: '1s' }}>
                    <span style={{ color: 'var(--accent-muted)' }}>$ </span>
                    <span style={{ color: '#569cd6' }}>import</span> React <span style={{ color: '#569cd6' }}>from</span> <span style={{ color: '#ce9178' }}>'react'</span>;
                  </div>

                  <div className="terminal-code-line" style={{ width: '0%', overflow: 'hidden', whiteSpace: 'nowrap', transitionDelay: '1.2s' }}>
                    <span style={{ color: 'var(--accent-muted)' }}>$ </span>
                    <span style={{ color: '#888' }}>// Playwright pipeline active</span>
                  </div>

                  <div className="terminal-code-line" style={{ width: '0%', overflow: 'hidden', whiteSpace: 'nowrap', transitionDelay: '1.4s' }}>
                    <span style={{ color: '#3ccf91' }}>✓ 102 unit/E2E test suites passed</span>
                  </div>
                </div>

                {/* Architecture Diagram Canvas (Act 3) */}
                <div 
                  ref={archRef}
                  style={{
                    position: 'absolute',
                    inset: '45px 12px 12px 12px',
                    background: '#0d0d0d',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 97, 26, 0.1)',
                    padding: '24px 12px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    pointerEvents: 'none',
                    zIndex: 2,
                  }}
                >
                  {/* SVG Connection paths */}
                  <svg 
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      zIndex: 0,
                    }}
                  >
                    {/* React -> Node API path */}
                    <path 
                      className="arch-line arch-line-1"
                      d="M 235 48 L 235 110" 
                      fill="none" 
                      stroke="var(--accent)" 
                      strokeWidth="1.5"
                    />

                    {/* Node API -> Postgres DB path */}
                    <path 
                      className="arch-line arch-line-2"
                      d="M 235 158 L 235 210" 
                      fill="none" 
                      stroke="var(--accent)" 
                      strokeWidth="1.5"
                    />

                    {/* Playwright -> Node API / Frontend path */}
                    <path 
                      className="arch-line arch-line-3"
                      d="M 75 134 L 140 134" 
                      fill="none" 
                      stroke="#3b82f6" 
                      strokeWidth="1.5"
                    />
                  </svg>

                  {/* Top Layer: React Frontend */}
                  <div 
                    className="arch-node arch-node-fe"
                    style={{
                      padding: '8px 18px',
                      border: '1px solid rgba(255, 97, 26, 0.3)',
                      background: 'rgba(255, 97, 26, 0.08)',
                      borderRadius: '6px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.68rem',
                      color: 'var(--text-primary)',
                      zIndex: 1,
                      fontWeight: 600,
                    }}
                  >
                    React Frontend
                  </div>

                  {/* Middle Layer: Node API & Playwright E2E */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', padding: '0 10px', zIndex: 1 }}>
                    <div 
                      className="arch-node arch-node-qa"
                      style={{
                        padding: '8px 14px',
                        border: '1px solid rgba(59, 130, 246, 0.3)',
                        background: 'rgba(59, 130, 246, 0.08)',
                        borderRadius: '6px',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.62rem',
                        color: 'var(--text-primary)',
                        fontWeight: 600,
                      }}
                    >
                      Playwright E2E
                    </div>

                    <div 
                      className="arch-node arch-node-api"
                      style={{
                        padding: '8px 18px',
                        border: '1px solid rgba(255, 97, 26, 0.3)',
                        background: 'rgba(255, 97, 26, 0.08)',
                        borderRadius: '6px',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.68rem',
                        color: 'var(--text-primary)',
                        fontWeight: 600,
                        marginRight: '22px'
                      }}
                    >
                      Node.js REST API
                    </div>
                  </div>

                  {/* Bottom Layer: Postgres */}
                  <div 
                    className="arch-node arch-node-db"
                    style={{
                      padding: '8px 18px',
                      border: '1px solid rgba(255, 97, 26, 0.3)',
                      background: 'rgba(255, 97, 26, 0.08)',
                      borderRadius: '6px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.68rem',
                      color: 'var(--text-primary)',
                      zIndex: 1,
                      fontWeight: 600,
                    }}
                  >
                    PostgreSQL Database
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Act 4 Overlay emerging project cards (on top of viewport, aligned grid) */}
        <div 
          ref={projectsRef}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100%',
            maxWidth: '1100px',
            padding: '0 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 12,
          }}
        >
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '24px',
              width: '100%',
              marginTop: '40px',
            }}
          >
            {/* Project Card 1 */}
            <div 
              className="project-3d-card"
              onMouseMove={(e) => handleCardMouseMove(e, 0)}
              onMouseLeave={handleCardMouseLeave}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                padding: '28px',
                position: 'relative',
                boxShadow: 'var(--shadow-card)',
                transformStyle: 'preserve-3d',
                perspective: '1000px',
                transition: 'transform 0.1s ease, box-shadow 0.25s ease',
              }}
            >
              <div style={{ transform: 'translateZ(30px)', transformStyle: 'preserve-3d' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <div style={{ color: 'var(--accent)' }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '32px', height: '32px' }}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  </div>
                  <a href="https://github.com/RonakSinghinda" target="_blank" rel="noopener" className="project-github-link">
                    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '22px', height: '22px', color: 'var(--text-secondary)', transition: 'color 0.25s' }}><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>
                  </a>
                </div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '14px' }}>
                  SafeSearch AI Ecosystem
                </h3>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '24px' }}>
                  A privacy-focused platform featuring a Chrome Extension (Manifest V3, JavaScript) and a React.js–Node.js web application for sensitive data protection and content security.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {['React.js', 'Node.js', 'MongoDB', 'Extension'].map(t => (
                    <span key={t} className="tech-tag" style={{ fontSize: '0.72rem', background: 'rgba(255,255,255,0.03)', color: 'var(--text-secondary)', padding: '5px 12px', borderRadius: '4px', border: '1px solid var(--border)', fontFamily: 'var(--font-mono)' }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Project Card 2 */}
            <div 
              className="project-3d-card"
              onMouseMove={(e) => handleCardMouseMove(e, 1)}
              onMouseLeave={handleCardMouseLeave}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                padding: '28px',
                position: 'relative',
                boxShadow: 'var(--shadow-card)',
                transformStyle: 'preserve-3d',
                perspective: '1000px',
                transition: 'transform 0.1s ease, box-shadow 0.25s ease',
              }}
            >
              <div style={{ transform: 'translateZ(30px)', transformStyle: 'preserve-3d' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <div style={{ color: 'var(--accent)' }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '32px', height: '32px' }}><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
                  </div>
                  <a href="https://github.com/RonakSinghinda" target="_blank" rel="noopener" className="project-github-link">
                    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '22px', height: '22px', color: 'var(--text-secondary)', transition: 'color 0.25s' }}><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>
                  </a>
                </div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '14px' }}>
                  Solar-Sight AI
                </h3>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '24px' }}>
                  An AI-powered solar energy analysis platform that evaluates location and environmental data to recommend optimal solar panel placement and energy generation strategies.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {['React.js', 'Node.js', 'Python', 'ML'].map(t => (
                    <span key={t} className="tech-tag" style={{ fontSize: '0.72rem', background: 'rgba(255,255,255,0.03)', color: 'var(--text-secondary)', padding: '5px 12px', borderRadius: '4px', border: '1px solid var(--border)', fontFamily: 'var(--font-mono)' }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Project Card 3 */}
            <div 
              className="project-3d-card"
              onMouseMove={(e) => handleCardMouseMove(e, 2)}
              onMouseLeave={handleCardMouseLeave}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                padding: '28px',
                position: 'relative',
                boxShadow: 'var(--shadow-card)',
                transformStyle: 'preserve-3d',
                perspective: '1000px',
                transition: 'transform 0.1s ease, box-shadow 0.25s ease',
              }}
            >
              <div style={{ transform: 'translateZ(30px)', transformStyle: 'preserve-3d' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <div style={{ color: 'var(--accent)' }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '32px', height: '32px' }}><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>
                  </div>
                  <a href="https://github.com/RonakSinghinda" target="_blank" rel="noopener" className="project-github-link">
                    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '22px', height: '22px', color: 'var(--text-secondary)', transition: 'color 0.25s' }}><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>
                  </a>
                </div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '14px' }}>
                  Port-Wise Trade Analytics
                </h3>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '24px' }}>
                  A trade analytics platform to analyze port-wise import and export data, enabling users to identify trade patterns, volume trends, and key insights through interactive dashboards.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {['Python', 'React.js', 'Data Viz', 'Analytics'].map(t => (
                    <span key={t} className="tech-tag" style={{ fontSize: '0.72rem', background: 'rgba(255,255,255,0.03)', color: 'var(--text-secondary)', padding: '5px 12px', borderRadius: '4px', border: '1px solid var(--border)', fontFamily: 'var(--font-mono)' }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Global styling overrides for badges and 3D scenes */}
      <style jsx global>{`
        .badge-span {
          display: inline-block;
          font-family: var(--font-mono);
          font-size: 0.8rem;
          color: var(--text-primary);
          background: rgba(255, 97, 26, 0.08);
          border: 1px solid rgba(255, 97, 26, 0.25);
          padding: 8px 18px;
          border-radius: 6px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4), 0 0 20px rgba(255, 97, 26, 0.05);
          backdrop-filter: blur(10px);
          white-space: nowrap;
        }
        .project-github-link:hover svg {
          color: var(--accent) !important;
        }
      `}</style>
    </div>
  );
}
