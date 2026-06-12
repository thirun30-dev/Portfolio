'use client';
import { motion } from 'framer-motion';
import { certifications } from '@/data/portfolio';
import BorderGlow from '@/components/ui/BorderGlow';

const providerColors: Record<string, { bg: string; color: string; border: string }> = {
  NPTEL: { bg: 'rgba(0,229,255,0.08)', color: 'var(--accent)', border: 'rgba(0,229,255,0.2)' },
  Udemy: { bg: 'rgba(255,75,110,0.08)', color: 'var(--accent2)', border: 'rgba(255,75,110,0.2)' },
  'LinkedIn Learning': { bg: 'rgba(167,139,250,0.08)', color: 'var(--accent4)', border: 'rgba(167,139,250,0.2)' },
};

const certGlows: Record<string, { glow: string; colors: string[] }> = {
  NPTEL: { glow: '185 100 50', colors: ['#00e5ff', '#a78bfa', '#ff4b6e'] },
  Udemy: { glow: '345 100 60', colors: ['#ff4b6e', '#a78bfa', '#00e5ff'] },
  'LinkedIn Learning': { glow: '260 100 70', colors: ['#a78bfa', '#ff4b6e', '#00e5ff'] },
};

export default function Certifications() {
  return (
    <section id="certifications" style={{ paddingTop: '7rem', paddingBottom: '5rem' }}>
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
        style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.78rem', color: 'var(--accent)', letterSpacing: '0.15em' }}>07 //</span>
        <h2 style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontSize: 'clamp(1.5rem,4vw,2.5rem)', fontWeight: 800, color: 'var(--text)' }}>Certifications</h2>
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, var(--accent), transparent)', opacity: 0.3 }} />
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {certifications.map((cert, i) => {
          const pc = providerColors[cert.provider] ?? providerColors['NPTEL'];
          const glowCfg = certGlows[cert.provider] ?? certGlows['NPTEL'];
          return (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ delay: i * 0.08, duration: 0.55 }}
              whileHover={{ y: -6, scale: 1.03 }}
            >
              <BorderGlow
                glowColor={glowCfg.glow}
                colors={glowCfg.colors}
                borderRadius={14}
                backgroundColor="var(--surface)"
              >
                <div style={{
                  padding: '1.5rem', position: 'relative', minHeight: '150px',
                  display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                  width: '100%',
                }}>
                  {/* Background glow */}
                  <div style={{
                    position: 'absolute', top: '-40px', right: '-40px', width: '120px', height: '120px',
                    borderRadius: '50%', background: pc.bg, filter: 'blur(30px)', pointerEvents: 'none',
                  }} />

                  {/* Provider Badge */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', position: 'relative', zIndex: 2 }}>
                    <span style={{
                      fontFamily: "'Space Mono', monospace", fontSize: '0.65rem',
                      padding: '0.2rem 0.6rem', borderRadius: '4px',
                      background: pc.bg, color: pc.color, border: `1px solid ${pc.border}`,
                    }}>{cert.provider}</span>
                    <span style={{ fontSize: '1.3rem', opacity: 0.7 }}>📜</span>
                  </div>

                  {/* Title */}
                  <h3 style={{
                    fontFamily: "var(--font-space-grotesk), sans-serif", fontSize: '0.98rem',
                    fontWeight: 700, color: 'var(--text)', lineHeight: 1.4,
                    marginTop: 'auto', position: 'relative', zIndex: 2,
                  }}>{cert.title}</h3>
                </div>
              </BorderGlow>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
