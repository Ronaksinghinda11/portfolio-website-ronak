'use client';

import { useEffect, useRef, useState } from 'react';

export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const mouseCoords = useRef({ x: 0, y: 0 });
  const ringCoords = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Check if device supports hover/desktop
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    setIsVisible(true);

    const onMouseMove = (e) => {
      mouseCoords.current.x = e.clientX;
      mouseCoords.current.y = e.clientY;
      
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }
    };

    // Smooth trailing ring
    let animationId;
    const animateRing = () => {
      const ease = 0.15; // smooth lag speed
      ringCoords.current.x += (mouseCoords.current.x - ringCoords.current.x) * ease;
      ringCoords.current.y += (mouseCoords.current.y - ringCoords.current.y) * ease;
      
      if (ringRef.current) {
        ringRef.current.style.left = `${ringCoords.current.x}px`;
        ringRef.current.style.top = `${ringCoords.current.y}px`;
      }
      animationId = requestAnimationFrame(animateRing);
    };
    
    animateRing();

    // Event delegation for hover states
    const onMouseOver = (e) => {
      const target = e.target;
      if (!target) return;
      
      // Check if target matches interactive elements
      const isInteractive = target.closest('a, button, .btn, [role="button"], .skill-card, .project-card, .edu-card, .contact-card, .social-link, .timeline-item, .tag');
      if (isInteractive) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const onMouseLeaveWindow = () => {
      if (dotRef.current) dotRef.current.style.opacity = '0';
      if (ringRef.current) ringRef.current.style.opacity = '0';
    };

    const onMouseEnterWindow = () => {
      if (dotRef.current) dotRef.current.style.opacity = '1';
      if (ringRef.current) ringRef.current.style.opacity = '1';
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseleave', onMouseLeaveWindow);
    document.addEventListener('mouseenter', onMouseEnterWindow);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseleave', onMouseLeaveWindow);
      document.removeEventListener('mouseenter', onMouseEnterWindow);
      cancelAnimationFrame(animationId);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <div 
        ref={dotRef} 
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: isHovered ? '12px' : '7px',
          height: isHovered ? '12px' : '7px',
          background: isHovered ? 'var(--accent-2)' : 'var(--accent)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 10000,
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.18s ease, height 0.18s ease, background 0.18s ease',
        }}
      />
      <div 
        ref={ringRef} 
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: isHovered ? '52px' : '32px',
          height: isHovered ? '52px' : '32px',
          border: '1.5px solid',
          borderColor: isHovered ? 'rgba(255, 140, 87, 0.7)' : 'rgba(255, 97, 26, 0.5)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.22s ease, height 0.22s ease, border-color 0.22s ease, opacity 0.22s',
        }}
      />
    </>
  );
}
