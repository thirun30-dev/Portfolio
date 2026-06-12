'use client';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import ParticleCanvas from '@/components/ui/ParticleCanvas';
import Typewriter from '@/components/ui/Typewriter';

const stats = [
  { num: '8.2', label: 'CGPA' },
  { num: '3+', label: 'Projects Built' },
  { num: '5+', label: 'Languages' },
  { num: '2+', label: 'Years Building' },
];

export default function Hero() {
  const mouseRef = useRef<{ x: number; y: number }>({ x: -1000, y: -1000 });

  return (
    <section
      id="hero"
      style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden', paddingTop: 'var(--hero-padding-top, 5rem)', paddingBottom: 'var(--hero-padding-bottom, 5rem)' }}
      onMouseMove={(e) => { mouseRef.current = { x: e.clientX, y: e.clientY }; }}
    >
      <ParticleCanvas mouseRef={mouseRef} />

      {/* Glow orbs */}
      <div className="hero-glow" style={{
        position: 'absolute', width: '600px', height: '600px', borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(0,229,255,0.08) 0%, transparent 70%)',
        filter: 'blur(40px)', top: '10%', left: '-10%', pointerEvents: 'none', transition: 'transform 0.3s ease-out',
      }} />
      <div style={{
        position: 'absolute', width: '400px', height: '400px', borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(255,75,110,0.06) 0%, transparent 70%)',
        filter: 'blur(40px)', bottom: '10%', right: '-5%', pointerEvents: 'none',
      }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <div style={{
            fontFamily: "'Space Mono', monospace", fontSize: '0.75rem', color: 'var(--accent)',
            letterSpacing: '0.2em', marginBottom: 'var(--hero-tag-margin-bottom, 1.2rem)', opacity: 0.8,
          }}>
            // Available for Internships &amp; Collaborations
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: 'easeOut' }}
          style={{
            fontFamily: "var(--font-space-grotesk), sans-serif",
            fontSize: 'var(--hero-h1-size, clamp(2.5rem, 8vw, 6rem))',
            fontWeight: 800, lineHeight: 1.05,
            letterSpacing: '-0.03em', marginBottom: 'var(--hero-h1-margin-bottom, 1rem)',
            color: 'var(--text)',
          }}
        >
          Thirunavukkarasu<br />
          <span style={{
            background: 'linear-gradient(135deg, var(--accent), var(--accent4))',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>Veeramani</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Typewriter />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          style={{ maxWidth: '560px', marginLeft: 'auto', marginRight: 'auto', color: 'var(--muted)', lineHeight: 'var(--hero-desc-line-height, 1.7)', fontSize: 'var(--hero-desc-font-size, 1rem)', marginTop: 'var(--hero-desc-margin-top, 1.2rem)', marginBottom: 'var(--hero-desc-margin-bottom, 2rem)' }}
        >
          Building intelligent robotic systems from the ground up.
          Bridging the gap between hardware and software — from PID controllers
          on embedded boards to autonomous navigation pipelines.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: 'var(--hero-cta-margin-bottom, 3rem)', justifyContent: 'center' }}
        >
          {[
            { label: 'View Projects', href: '#projects', primary: true },
            { label: 'Get in Touch', href: '#contact', primary: false },
            { label: 'GitHub ↗', href: 'https://github.com/thirun30-dev', primary: false, external: true },
          ].map((btn) => (
            <motion.a
              key={btn.label}
              href={btn.href}
              target={btn.external ? '_blank' : undefined}
              rel={btn.external ? 'noreferrer' : undefined}
              onClick={!btn.external ? (e) => { e.preventDefault(); document.querySelector(btn.href)?.scrollIntoView({ behavior: 'smooth' }); } : undefined}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-block', padding: 'var(--hero-btn-padding, 0.7rem 1.5rem)',
                borderRadius: '6px', textDecoration: 'none', fontWeight: 600,
                fontSize: 'var(--hero-btn-font-size, 0.88rem)', fontFamily: "var(--font-outfit), sans-serif",
                transition: 'all 0.2s',
                ...(btn.primary ? {
                  background: 'var(--accent)', color: '#080c14',
                  boxShadow: '0 0 20px rgba(0,229,255,0.35)',
                } : {
                  background: 'transparent', color: 'var(--accent)',
                  border: '1px solid rgba(0,229,255,0.35)',
                }),
              }}
            >
              {btn.label}
            </motion.a>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--hero-stats-gap, 2rem)', justifyContent: 'center' }}
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + i * 0.1 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}
            >
              <span style={{
                fontFamily: "var(--font-space-grotesk), sans-serif", fontSize: 'var(--hero-stat-num-size, 2rem)', fontWeight: 800, color: 'var(--accent)', lineHeight: 1,
              }}>{s.num}</span>
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.68rem', color: 'var(--muted)', letterSpacing: '0.1em' }}>
                {s.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
