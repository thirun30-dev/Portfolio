'use client';
import { motion } from 'framer-motion';
import { educationItems } from '@/data/portfolio';
import BorderGlow from '@/components/ui/BorderGlow';

const eduGlows = [
  { glow: '185 100 50', colors: ['#00e5ff', '#a78bfa', '#ff4b6e'] }, // REC (Cyan)
  { glow: '345 100 60', colors: ['#ff4b6e', '#a78bfa', '#00e5ff'] }, // IITM (Rose)
  { glow: '220 100 65', colors: ['#6495ed', '#00e5ff', '#a78bfa'] }, // Class XII (Blue)
  { glow: '115 100 50', colors: ['#39ff14', '#00e5ff', '#a78bfa'] }, // Class X (Green)
];

export default function Education() {
  return (
    <section id="education" style={{ paddingTop: '7rem', paddingBottom: '5rem' }}>
      <div className="section-container">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
        style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.78rem', color: 'var(--accent)', letterSpacing: '0.15em' }}>06 //</span>
        <h2 style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontSize: 'clamp(1.5rem,4vw,2.5rem)', fontWeight: 800, color: 'var(--text)' }}>Education</h2>
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, var(--accent), transparent)', opacity: 0.3 }} />
      </motion.div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {educationItems.map((edu, i) => {
          const glowCfg = eduGlows[i % eduGlows.length];
          return (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              whileHover={{ y: -4, scale: 1.015 }}
            >
              <BorderGlow
                glowColor={glowCfg.glow}
                colors={glowCfg.colors}
                borderRadius={14}
                backgroundColor="var(--surface)"
              >
                <div style={{
                  padding: '1.8rem 2rem', position: 'relative', overflow: 'hidden',
                  display: 'flex', flexWrap: 'wrap', gap: '1.5rem',
                  justifyContent: 'space-between', alignItems: 'flex-start',
                  width: '100%',
                }}>
                  {/* Ambient corner */}
                  <div style={{
                    position: 'absolute', top: 0, left: 0, width: '200px', height: '200px',
                    background: 'radial-gradient(ellipse at 20% 20%, rgba(0,229,255,0.04) 0%, transparent 70%)',
                    pointerEvents: 'none',
                  }} />

                  {/* Left */}
                  <div style={{ position: 'relative', zIndex: 2 }}>
                    <div style={{
                      fontFamily: "var(--font-space-grotesk), sans-serif", fontSize: '1.15rem', fontWeight: 800,
                      color: 'var(--text)', marginBottom: '0.4rem',
                    }}>{edu.degree}</div>
                    <div style={{ fontFamily: "var(--font-outfit), sans-serif", fontWeight: 600, fontSize: '0.95rem', color: 'var(--accent)', marginBottom: '0.65rem' }}>
                      {edu.institution}
                    </div>
                    {edu.coursework && (
                      <div style={{
                        fontFamily: "'Space Mono', monospace", fontSize: '0.72rem', color: 'var(--muted)',
                        lineHeight: 1.6, maxWidth: '480px',
                      }}>
                        <span style={{ color: 'rgba(0,229,255,0.5)' }}>Coursework: </span>{edu.coursework}
                      </div>
                    )}
                  </div>

                  {/* Right */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem', flexShrink: 0, position: 'relative', zIndex: 2 }}>
                    <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.75rem', color: 'var(--muted)' }}>{edu.dates}</div>
                    {edu.cgpa ? (
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.15 + 0.3, type: 'spring', stiffness: 200 }}
                        style={{
                          background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.2)',
                          borderRadius: '10px', padding: '0.6rem 1rem', textAlign: 'center',
                          boxShadow: '0 0 20px rgba(0,229,255,0.08)',
                        }}
                      >
                        <div style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontSize: '1.8rem', fontWeight: 900, color: 'var(--accent)', lineHeight: 1 }}>{edu.cgpa}</div>
                        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.62rem', color: 'var(--muted)', marginTop: '0.2rem', letterSpacing: '0.08em' }}>CURRENT CGPA</div>
                      </motion.div>
                    ) : edu.percentage ? (
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.15 + 0.3, type: 'spring', stiffness: 200 }}
                        style={{
                          background: 'rgba(255,75,110,0.08)', border: '1px solid rgba(255,75,110,0.2)',
                          borderRadius: '10px', padding: '0.6rem 1rem', textAlign: 'center',
                          boxShadow: '0 0 20px rgba(255,75,110,0.08)',
                        }}
                      >
                        <div style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontSize: '1.8rem', fontWeight: 900, color: 'var(--accent2)', lineHeight: 1 }}>{edu.percentage}</div>
                        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.62rem', color: 'var(--muted)', marginTop: '0.2rem', letterSpacing: '0.08em' }}>PERCENTAGE</div>
                      </motion.div>
                    ) : null}
                  </div>
                </div>
              </BorderGlow>
            </motion.div>
          );
        })}
      </div>
      </div>
    </section>
  );
}
