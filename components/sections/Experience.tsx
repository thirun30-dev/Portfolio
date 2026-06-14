'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Bot } from 'lucide-react';
import BorderGlow from '@/components/ui/BorderGlow';
import { timelineItems } from '@/data/portfolio';

const expGlows: Record<string, { glow: string; colors: string[] }> = {
  'robix-lead': { glow: '185 100 50', colors: ['#00e5ff', '#a78bfa', '#ff4b6e'] },
  'robo-race':  { glow: '345 100 60', colors: ['#ff4b6e', '#a78bfa', '#00e5ff'] },
  'rec-student': { glow: '260 100 70', colors: ['#a78bfa', '#ff4b6e', '#00e5ff'] },
};

function TagPill({ label, color }: { label: string; color?: 'green' | 'red' | 'default' }) {
  return <span className={`tag${color ? ` ${color}` : ''}`}>{label}</span>;
}

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 70%"]
  });

  const robotY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" style={{ paddingTop: '7rem', paddingBottom: '5rem' }}>
      <div className="section-container">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
        style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3.5rem' }}>
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.78rem', color: 'var(--accent)', letterSpacing: '0.15em' }}>04 //</span>
        <h2 style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontSize: 'clamp(1.5rem,4vw,2.5rem)', fontWeight: 800, color: 'var(--text)' }}>Experience</h2>
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, var(--accent), transparent)', opacity: 0.3 }} />
      </motion.div>

      <div ref={containerRef} style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '0' }}>
        {/* Centre line */}
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          style={{
            position: 'absolute', left: '50%', top: 0, bottom: 0, width: '1px',
            background: 'linear-gradient(to bottom, var(--accent), rgba(0,229,255,0.05))',
            transform: 'translateX(-50%)', display: 'block',
            originY: 0,
          }} className="timeline-center-line" />

        {/* Robot scroll indicator */}
        <motion.div
          style={{
            position: 'absolute',
            left: '50%',
            top: robotY,
            x: '-50%',
            y: '-50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            pointerEvents: 'none',
            background: '#0d1220',
            border: '2px solid var(--accent)',
            borderRadius: '50%',
            boxShadow: '0 0 15px rgba(0,229,255,0.6), inset 0 0 10px rgba(0,229,255,0.3)',
            color: 'var(--accent)',
          }}
          className="timeline-robot"
        >
          <Bot size={22} style={{ filter: 'drop-shadow(0 0 2px var(--accent))' }} />
        </motion.div>

        {timelineItems.map((item, i) => {
          const isLeft = item.side === 'left';
          return (
            <div
              key={item.id}
              style={{
                display: 'grid', gridTemplateColumns: '1fr 32px 1fr',
                gap: '0 1.5rem', marginBottom: '2.5rem', alignItems: 'flex-start',
              }}
            >
              {/* Left content or spacer */}
              {isLeft ? (
                <motion.div 
                  initial={{ opacity: 0, x: -70, rotate: -3, scale: 0.93 }}
                  whileInView={{ opacity: 1, x: 0, rotate: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ type: 'spring', stiffness: 90, damping: 15, delay: 0.05 }}
                  style={{ gridColumn: '1', display: 'flex', justifyContent: 'flex-end' }}
                >
                  <TimelineCard item={item} align="right" />
                </motion.div>
              ) : <div style={{ gridColumn: '1' }} />}

              {/* Dot + line */}
              <div style={{ gridColumn: '2', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '1rem' }}>
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.1 }}
                  className="timeline-dot"
                />
              </div>

              {/* Right content or spacer */}
              {!isLeft ? (
                <motion.div
                  initial={{ opacity: 0, x: 70, rotate: 3, scale: 0.93 }}
                  whileInView={{ opacity: 1, x: 0, rotate: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ type: 'spring', stiffness: 90, damping: 15, delay: 0.05 }}
                  style={{ gridColumn: '3', display: 'flex', justifyContent: 'flex-start' }}
                >
                  <TimelineCard item={item} align="left" />
                </motion.div>
              ) : <div style={{ gridColumn: '3' }} />}
            </div>
          );
        })}
      </div>

      <style>{`
        @media (max-width: 640px) {
          .timeline-center-line { display: none !important; }
          .timeline-robot { display: none !important; }
        }
      `}</style>
      </div>
    </section>
  );
}

function TimelineCard({ item, align }: { item: typeof timelineItems[0]; align: 'left' | 'right' }) {
  const glowCfg = expGlows[item.id] ?? expGlows['robix-lead'];
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      style={{ maxWidth: '400px', width: '100%' }}
    >
      <BorderGlow
        glowColor={glowCfg.glow}
        colors={glowCfg.colors}
        borderRadius={12}
        backgroundColor="var(--surface)"
      >
        <div style={{ padding: '1.2rem 1.4rem', width: '100%', position: 'relative' }}>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.7rem', color: 'var(--accent)', marginBottom: '0.5rem' }}>{item.date}</div>
          <div style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 700, fontSize: '1rem', color: 'var(--text)', marginBottom: '0.25rem' }}>{item.role}</div>
          <div style={{ fontSize: '0.82rem', color: 'var(--accent2)', fontWeight: 600, marginBottom: '0.6rem' }}>{item.org}</div>
          <p style={{ color: 'var(--muted)', fontSize: '0.84rem', lineHeight: 1.65, marginBottom: '0.9rem' }}>{item.desc}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', justifyContent: align === 'right' ? 'flex-end' : 'flex-start' }}>
            {item.tags.map((t) => <span key={t.label} className={`tag${t.color ? ` ${t.color}` : ''}`}>{t.label}</span>)}
          </div>
        </div>
      </BorderGlow>
    </motion.div>
  );
}
