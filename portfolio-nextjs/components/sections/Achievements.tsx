import { motion } from 'framer-motion';
import { achievements } from '@/data/portfolio';
import BorderGlow from '@/components/ui/BorderGlow';

const badgeColors: Record<string, { bg: string; color: string; border: string }> = {
  Competition: { bg: 'rgba(255,75,110,0.1)', color: 'var(--accent2)', border: 'rgba(255,75,110,0.25)' },
  Hackathon:   { bg: 'rgba(167,139,250,0.1)', color: 'var(--accent4)', border: 'rgba(167,139,250,0.25)' },
  Academic:    { bg: 'rgba(0,229,255,0.1)', color: 'var(--accent)', border: 'rgba(0,229,255,0.25)' },
  'Open Source': { bg: 'rgba(57,255,20,0.08)', color: 'var(--accent3)', border: 'rgba(57,255,20,0.2)' },
};

const achGlows: Record<string, { glow: string; colors: string[] }> = {
  Competition: { glow: '345 100 60', colors: ['#ff4b6e', '#a78bfa', '#00e5ff'] },
  Hackathon:   { glow: '260 100 70', colors: ['#a78bfa', '#ff4b6e', '#00e5ff'] },
  Academic:    { glow: '185 100 50', colors: ['#00e5ff', '#a78bfa', '#ff4b6e'] },
  'Open Source': { glow: '115 100 50', colors: ['#39ff14', '#00e5ff', '#a78bfa'] },
};

export default function Achievements() {
  return (
    <section id="achievements" style={{ paddingTop: '7rem', paddingBottom: '5rem' }}>
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
        style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.78rem', color: 'var(--accent)', letterSpacing: '0.15em' }}>05 //</span>
        <h2 style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontSize: 'clamp(1.5rem,4vw,2.5rem)', fontWeight: 800, color: 'var(--text)' }}>Achievements</h2>
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, var(--accent), transparent)', opacity: 0.3 }} />
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {achievements.map((ach, i) => {
          const bc = badgeColors[ach.badge] ?? badgeColors['Academic'];
          const glowCfg = achGlows[ach.badge] ?? achGlows['Academic'];
          return (
            <motion.div
              key={ach.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ delay: i * 0.1, duration: 0.55 }}
              whileHover={{ y: -6, scale: 1.03 }}
            >
              <BorderGlow
                glowColor={glowCfg.glow}
                colors={glowCfg.colors}
                borderRadius={14}
                backgroundColor="var(--surface)"
              >
                <div style={{ padding: '1.4rem', position: 'relative', minHeight: '100%' }}>
                  {/* Background glow */}
                  <div style={{
                    position: 'absolute', top: '-40px', right: '-40px', width: '120px', height: '120px',
                    borderRadius: '50%', background: bc.bg, filter: 'blur(30px)', pointerEvents: 'none',
                  }} />

                  {/* Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', position: 'relative', zIndex: 2 }}>
                    <span style={{
                      fontFamily: "'Space Mono', monospace", fontSize: '0.65rem',
                      padding: '0.2rem 0.6rem', borderRadius: '4px',
                      background: bc.bg, color: bc.color, border: `1px solid ${bc.border}`,
                    }}>{ach.badge}</span>
                    <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.7rem', color: 'var(--muted)' }}>{ach.year}</span>
                  </div>

                  {/* Body */}
                  <div style={{ display: 'flex', gap: '0.9rem', alignItems: 'flex-start', position: 'relative', zIndex: 2 }}>
                    <div style={{ fontSize: '2rem', flexShrink: 0, lineHeight: 1 }}>{ach.icon}</div>
                    <div>
                      <h3 style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontSize: '0.95rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.25rem', lineHeight: 1.3 }}>{ach.title}</h3>
                      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.68rem', color: bc.color, marginBottom: '0.5rem' }}>{ach.role}</div>
                      <p style={{ color: 'var(--muted)', fontSize: '0.83rem', lineHeight: 1.65 }}>{ach.desc}</p>
                    </div>
                  </div>
                </div>
              </BorderGlow>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
