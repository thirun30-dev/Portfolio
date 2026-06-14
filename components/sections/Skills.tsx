'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  SiPython, SiCplusplus, SiGithub, SiHtml5, SiJavascript,
  SiReact, SiNextdotjs, SiTailwindcss, SiArduino, SiLinux, SiMysql,
} from 'react-icons/si';
import { FaCss3, FaRobot } from 'react-icons/fa';
import { skillCards } from '@/data/portfolio';
import LogoLoop from '@/components/ui/LogoLoop';
import type { LogoItem } from '@/components/ui/LogoLoop';
import BorderGlow from '@/components/ui/BorderGlow';

// Map icon names to components
const iconMap: Record<string, React.ReactNode> = {
  SiPython:      <SiPython />,
  SiCplusplus:   <SiCplusplus />,
  SiGithub:      <SiGithub />,
  SiHtml5:       <SiHtml5 />,
  SiCss3:        <FaCss3 />,
  SiJavascript:  <SiJavascript />,
  SiReact:       <SiReact />,
  SiNextdotjs:   <SiNextdotjs />,
  SiTailwindcss: <SiTailwindcss />,
  SiArduino:     <SiArduino />,
  SiOpencv:      <FaRobot />,
  SiLinux:       <SiLinux />,
  SiMysql:       <SiMysql />,
};

const techLogoColors: Record<string, string> = {
  SiPython: '#3776AB', SiCplusplus: '#00599C', SiGithub: '#e2e8f0',
  SiHtml5: '#E34F26', SiCss3: '#1572B6', SiJavascript: '#F7DF1E',
  SiReact: '#61DAFB', SiNextdotjs: '#e2e8f0', SiTailwindcss: '#06B6D4',
  SiArduino: '#00979D', SiOpencv: '#5C3EE8', SiLinux: '#FCC624', SiMysql: '#4479A1',
};

const techIconKeys = Object.keys(iconMap);

// Glow colors for BorderGlow (HSL and hex gradients)
const skillGlows: Record<string, { glow: string; colors: string[] }> = {
  cyan:  { glow: '185 100 50', colors: ['#00e5ff', '#a78bfa', '#ff4b6e'] },
  rose:  { glow: '345 100 60', colors: ['#ff4b6e', '#a78bfa', '#00e5ff'] },
  blue:  { glow: '220 100 65', colors: ['#6495ed', '#00e5ff', '#a78bfa'] },
  green: { glow: '115 100 50', colors: ['#39ff14', '#00e5ff', '#a78bfa'] },
};

const dotColors: Record<string, string> = {
  cyan: 'var(--accent)', rose: 'var(--accent2)', green: 'var(--accent3)', blue: '#6495ed',
};

function SkillBar({ name, pct, delay = 0 }: { name: string; pct: number; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.8rem', color: 'var(--text)', fontWeight: 500 }}>{name}</span>
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.7rem', color: 'var(--muted)' }}>{pct}%</span>
      </div>
      <div style={{ height: '4px', background: 'rgba(255,255,255,0.06)', borderRadius: '999px', overflow: 'hidden' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${pct}%` } : { width: 0 }}
          transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1], delay }}
          style={{
            height: '100%', borderRadius: '999px',
            background: 'linear-gradient(90deg, var(--accent), var(--accent4))',
            boxShadow: '0 0 8px rgba(0,229,255,0.4)',
          }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  // Build LogoLoop items
  const logoItems: LogoItem[] = techIconKeys.map((key) => ({
    node: (
      <span style={{ color: techLogoColors[key], fontSize: '2rem', display: 'flex', alignItems: 'center' }}>
        {iconMap[key]}
      </span>
    ),
    title: key.replace('Si', ''),
  }));

  return (
    <section id="skills" style={{ paddingTop: '7rem', paddingBottom: '5rem' }}>
      <div className="section-container">
        {/* Header */}
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
        style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.78rem', color: 'var(--accent)', letterSpacing: '0.15em' }}>03 //</span>
        <h2 style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontSize: 'clamp(1.5rem,4vw,2.5rem)', fontWeight: 800, color: 'var(--text)' }}>Skills</h2>
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, var(--accent), transparent)', opacity: 0.3 }} />
      </motion.div>

      {/* LogoLoop ticker */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        transition={{ delay: 0.1, duration: 0.6 }}
        style={{
          marginBottom: '3rem', padding: '1.2rem 0',
          background: 'rgba(0,229,255,0.03)', border: '1px solid rgba(0,229,255,0.08)',
          borderRadius: '12px', overflow: 'hidden',
        }}
      >
        <div style={{ height: '64px', position: 'relative', overflow: 'hidden' }}>
          <LogoLoop
            logos={logoItems}
            speed={80}
            direction="left"
            logoHeight={36}
            gap={48}
            hoverSpeed={20}
            fadeOut
            fadeOutColor="#080c14"
            scaleOnHover
            ariaLabel="Tech stack logos"
          />
        </div>
      </motion.div>

      {/* Skill cards grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {skillCards.map((card, ci) => {
          const glowCfg = skillGlows[card.glowColor] ?? skillGlows['cyan'];
          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ delay: ci * 0.1, duration: 0.6 }}
              whileHover={{ y: -6, scale: 1.02 }}
            >
              <BorderGlow
                glowColor={glowCfg.glow}
                colors={glowCfg.colors}
                borderRadius={14}
                backgroundColor="var(--surface)"
              >
                <div style={{ padding: '1.5rem', width: '100%', minHeight: '100%' }}>
                  {/* Card header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: dotColors[card.glowColor], boxShadow: `0 0 8px ${dotColors[card.glowColor]}` }} />
                      <h3 style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontSize: '0.95rem', fontWeight: 700, color: 'var(--text)' }}>{card.title}</h3>
                    </div>
                    <span style={{ fontSize: '1.4rem' }}>{card.icon}</span>
                  </div>

                  {/* Skill bars */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.2rem' }}>
                    {card.bars.map((bar, bi) => (
                      <SkillBar key={bar.name} name={bar.name} pct={bar.pct} delay={bi * 0.1 + ci * 0.05} />
                    ))}
                  </div>

                  {/* Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                    {card.tags.map((tag) => (
                      <span key={tag} style={{
                        fontFamily: "'Space Mono', monospace", fontSize: '0.65rem', padding: '0.2rem 0.55rem',
                        borderRadius: '4px', background: 'rgba(0,229,255,0.06)', border: '1px solid rgba(0,229,255,0.12)',
                        color: 'var(--muted)',
                      }}>{tag}</span>
                    ))}
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
