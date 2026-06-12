'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { navLinks } from '@/data/portfolio';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const handleNavClick = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      id="navbar"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 800,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '1rem 2rem',
        background: 'rgba(8,12,20,0.85)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border)',
        transition: 'padding 0.3s',
      }}
    >
      {/* Logo */}
      <a
        href="#hero"
        onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        style={{
          fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 800, fontSize: '1.3rem',
          color: 'var(--accent)', letterSpacing: '0.05em', textDecoration: 'none',
          position: 'relative',
        }}
      >
        TK
        <span style={{
          position: 'absolute', bottom: '-2px', left: 0, right: 0, height: '2px',
          background: 'var(--accent)', borderRadius: '2px', opacity: 0.5,
        }} />
      </a>

      {/* Desktop links */}
      <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none', alignItems: 'center' }}
        className="nav-links-desktop">
        {navLinks.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
              style={{
                fontFamily: "var(--font-outfit), sans-serif", fontSize: '0.85rem', fontWeight: 500,
                color: 'var(--muted)', textDecoration: 'none', transition: 'color 0.2s',
                letterSpacing: '0.03em',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      {/* Hamburger */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
        className="hamburger-btn"
        style={{
          display: 'none', flexDirection: 'column', gap: '5px', background: 'none',
          border: 'none', cursor: 'pointer', padding: '4px',
        }}
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            animate={open ? {
              rotate: i === 0 ? 45 : i === 2 ? -45 : 0,
              y: i === 0 ? 7 : i === 2 ? -7 : 0,
              opacity: i === 1 ? 0 : 1,
            } : { rotate: 0, y: 0, opacity: 1 }}
            transition={{ duration: 0.25 }}
            style={{ display: 'block', width: '22px', height: '2px', background: 'var(--accent)', borderRadius: '2px', transformOrigin: 'center' }}
          />
        ))}
      </button>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'absolute', top: '100%', left: 0, right: 0,
              background: 'rgba(8,12,20,0.98)', backdropFilter: 'blur(20px)',
              borderBottom: '1px solid var(--border)', padding: '1.5rem 2rem',
              display: 'flex', flexDirection: 'column', gap: '1rem',
            }}
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                style={{ color: 'var(--text)', textDecoration: 'none', fontSize: '1rem', fontWeight: 500, transition: 'color 0.2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text)')}
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
      `}</style>
    </motion.nav>
  );
}
