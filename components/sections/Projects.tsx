'use client';
import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { projects, type Project } from '@/data/portfolio';
import BorderGlow from '@/components/ui/BorderGlow';
import HolographicText from '@/components/ui/HolographicText';
import {
  SiPython, SiCplusplus, SiGithub, SiHtml5, SiJavascript,
  SiReact, SiNextdotjs, SiTailwindcss, SiArduino, SiLinux, SiMysql,
  SiRos, SiOpencv, SiTypescript, SiEspressif
} from 'react-icons/si';
import { FaCss3, FaAws, FaDatabase } from 'react-icons/fa';

// Map technology tags to their corresponding logos and colors
const tagIconMap: Record<string, { icon: React.ReactNode; color?: string }> = {
  'python': { icon: <SiPython />, color: '#3776AB' },
  'opencv': { icon: <SiOpencv />, color: '#5C3EE8' },
  'c++': { icon: <SiCplusplus />, color: '#00599C' },
  'github': { icon: <SiGithub />, color: '#e2e8f0' },
  'html5': { icon: <SiHtml5 />, color: '#E34F26' },
  'css3': { icon: <FaCss3 />, color: '#1572B6' },
  'javascript': { icon: <SiJavascript />, color: '#F7DF1E' },
  'typescript': { icon: <SiTypescript />, color: '#3178C6' },
  'react': { icon: <SiReact />, color: '#61DAFB' },
  'next.js': { icon: <SiNextdotjs />, color: '#e2e8f0' },
  'tailwind css': { icon: <SiTailwindcss />, color: '#06B6D4' },
  'arduino': { icon: <SiArduino />, color: '#00979D' },
  'esp32': { icon: <SiEspressif />, color: '#E7352C' },
  'ros': { icon: <SiRos />, color: '#22314E' },
  'linux': { icon: <SiLinux />, color: '#FCC624' },
  'sql': { icon: <SiMysql />, color: '#4479A1' },
  'aws': { icon: <FaAws />, color: '#FF9900' },
  'aws lambda': { icon: <FaAws />, color: '#FF9900' },
  'dynamodb': { icon: <FaDatabase />, color: '#4053D6' },
};

function getTagIcon(label: string) {
  const clean = label.toLowerCase().trim();
  return tagIconMap[clean];
}

// ── Tag pill ───────────────────────────────────────────────
function TagPill({ label, color, showIcon = true }: { label: string; color?: 'green' | 'red' | 'default'; showIcon?: boolean }) {
  const iconData = showIcon ? getTagIcon(label) : null;
  return (
    <span className={`tag${color ? ` ${color}` : ''}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
      {iconData && <span style={{ color: iconData.color, display: 'flex', alignItems: 'center', fontSize: '0.82rem' }}>{iconData.icon}</span>}
      <span>{label}</span>
    </span>
  );
}

// ── Tech badge for modal ───────────────────────────────────────
function TechBadge({ label }: { label: string }) {
  const iconData = getTagIcon(label);
  return (
    <motion.div
      whileHover={{ scale: 1.05, borderColor: 'rgba(0, 229, 255, 0.85)', boxShadow: '0 0 12px rgba(0, 229, 255, 0.3)' }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.55rem',
        padding: '0.45rem 0.9rem',
        background: 'rgba(6, 12, 28, 0.65)',
        border: '1px solid rgba(0, 229, 255, 0.25)',
        borderRadius: '4px',
        color: 'var(--text)',
        fontFamily: "'Space Mono', monospace",
        fontSize: '0.78rem',
        transition: 'all 0.2s ease-in-out',
        cursor: 'none',
      }}
    >
      {iconData ? (
        <span style={{ color: iconData.color, fontSize: '1.15rem', display: 'flex', alignItems: 'center' }}>
          {iconData.icon}
        </span>
      ) : (
        <span style={{ color: 'var(--accent)', fontSize: '1.15rem', display: 'flex', alignItems: 'center' }}>
          ◈
        </span>
      )}
      <span style={{ color: '#ffffff', fontWeight: 500 }}>{label}</span>
    </motion.div>
  );
}

// ── Per-category glow colors (HSL format for BorderGlow) ───────
const categoryGlow: Record<string, { glowColor: string; colors: string[] }> = {
  robotics: { glowColor: '185 100 50', colors: ['#00e5ff', '#a78bfa', '#3b82f6'] },
  ds:       { glowColor: '145 80 45',  colors: ['#39ff14', '#06b6d4', '#a78bfa'] },
};

// ── Framer Motion Animations for Hologram Open/Close ───────────
const modalVariants = {
  hidden: {
    scaleX: 0.005,
    scaleY: 0.005,
    opacity: 0,
  },
  visible: {
    scaleX: [0.005, 1, 1],
    scaleY: [0.005, 0.005, 1],
    opacity: [0, 1, 1],
    transition: {
      times: [0, 0.35, 0.7],
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as any,
    }
  },
  exit: {
    scaleY: [1, 0.005, 0.005],
    scaleX: [1, 1, 0.005],
    opacity: [1, 1, 0],
    transition: {
      times: [0, 0.35, 0.7],
      duration: 0.5,
      ease: [0.7, 0, 0.84, 0] as any,
    }
  }
};

const contentVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { delay: 0.5, duration: 0.3 } 
  },
  exit: { opacity: 0, transition: { duration: 0.15 } }
};

// ── Project Modal ──────────────────────────────────────────────
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      key="overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 900,
        background: 'rgba(4, 7, 16, 0.85)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
    >
      <motion.div
        key="card"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
        className="holo-panel"
        style={{
          maxWidth: '700px',
          width: '100%',
          maxHeight: '90vh',
          position: 'relative',
          borderRadius: '4px',
          border: '1px solid rgba(0, 229, 255, 0.4)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Holographic Overlays */}
        <div className="holo-grid" />
        <div className="holo-scanlines" />

        {/* Top Sci-Fi Glowing Header Bar */}
        <div style={{
          position: 'absolute',
          top: '-5px',
          left: '-10px',
          right: '-10px',
          height: '10px',
          pointerEvents: 'none',
          zIndex: 10,
        }}>
          {/* Horizontal Line */}
          <div style={{
            height: '2px',
            width: '100%',
            background: '#00e5ff',
            boxShadow: '0 0 10px #00e5ff, 0 0 3px #00e5ff',
          }} />
          {/* Sub thick line */}
          <div style={{
            height: '3px',
            width: '65%',
            margin: '2px auto 0',
            background: '#00e5ff',
            opacity: 0.8,
            boxShadow: '0 0 12px #00e5ff',
          }} />
          {/* Left Bracket */}
          <div style={{
            position: 'absolute',
            left: 0,
            top: '-4px',
            width: '12px',
            height: '10px',
            borderLeft: '2px solid #00e5ff',
            borderTop: '2px solid #00e5ff',
            transform: 'skewX(-25deg)',
            boxShadow: '-2px -2px 6px rgba(0, 229, 255, 0.6)',
          }} />
          {/* Right Bracket */}
          <div style={{
            position: 'absolute',
            right: 0,
            top: '-4px',
            width: '12px',
            height: '10px',
            borderRight: '2px solid #00e5ff',
            borderTop: '2px solid #00e5ff',
            transform: 'skewX(25deg)',
            boxShadow: '2px -2px 6px rgba(0, 229, 255, 0.6)',
          }} />
        </div>

        {/* Bottom Sci-Fi Glowing Footer Bar */}
        <div style={{
          position: 'absolute',
          bottom: '-5px',
          left: '-10px',
          right: '-10px',
          height: '10px',
          pointerEvents: 'none',
          zIndex: 10,
        }}>
          {/* Horizontal Line */}
          <div style={{
            height: '2px',
            width: '100%',
            background: '#00e5ff',
            boxShadow: '0 0 10px #00e5ff, 0 0 3px #00e5ff',
          }} />
          {/* Sub thick line */}
          <div style={{
            height: '3px',
            width: '65%',
            margin: '0 auto 2px',
            background: '#00e5ff',
            opacity: 0.8,
            boxShadow: '0 0 12px #00e5ff',
          }} />
          {/* Left Bracket */}
          <div style={{
            position: 'absolute',
            left: 0,
            bottom: '-4px',
            width: '12px',
            height: '10px',
            borderLeft: '2px solid #00e5ff',
            borderBottom: '2px solid #00e5ff',
            transform: 'skewX(25deg)',
            boxShadow: '-2px 2px 6px rgba(0, 229, 255, 0.6)',
          }} />
          {/* Right Bracket */}
          <div style={{
            position: 'absolute',
            right: 0,
            bottom: '-4px',
            width: '12px',
            height: '10px',
            borderRight: '2px solid #00e5ff',
            borderBottom: '2px solid #00e5ff',
            transform: 'skewX(-25deg)',
            boxShadow: '2px 2px 6px rgba(0, 229, 255, 0.6)',
          }} />
        </div>

        {/* Main Modal Content */}
        <motion.div
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="holo-scroll"
          style={{
            maxHeight: '85vh',
            overflowY: 'auto',
            position: 'relative',
            zIndex: 5,
            width: '100%',
          }}
        >
          {/* Image */}
          <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
            <Image src={project.image} alt={project.title} fill style={{ objectFit: 'cover', filter: 'brightness(0.65) contrast(1.1)' }} />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(6, 12, 28, 1) 0%, transparent 100%)',
            }} />
            <div style={{
              position: 'absolute', inset: 0,
              borderBottom: '1px solid rgba(0, 229, 255, 0.3)',
            }} />
          </div>

          <div style={{ padding: '1.5rem 2rem 2.2rem' }}>
            
            {/* Notification Title block */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <div className="solo-leveling-title-box">
                <span className="holo-alert-circle">!</span>
                <span style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '1rem',
                  fontWeight: 800,
                  color: '#ffffff',
                  letterSpacing: '0.15em',
                  textShadow: '0 0 8px rgba(0, 229, 255, 0.6)',
                }}>
                  NOTIFICATION
                </span>
              </div>
            </div>

            {/* Divider line */}
            <div style={{
              height: '1px',
              background: 'linear-gradient(to right, transparent, rgba(0, 229, 255, 0.4) 15%, rgba(0, 229, 255, 0.4) 85%, transparent)',
              marginBottom: '1.5rem',
            }} />

            {/* Project Title Block */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem' }}>
                <HolographicText 
                  text={project.num} 
                  delay={700}
                  speed={25}
                  style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.75rem', color: 'var(--accent)' }}
                />
                {project.status === 'live' && (
                  <motion.span 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="badge-ongoing"
                  >
                    <span className="badge-dot" />Live
                  </motion.span>
                )}
              </div>
              
              <h2 style={{
                fontFamily: "var(--font-space-grotesk), sans-serif",
                fontSize: '1.65rem',
                fontWeight: 800,
                color: '#ffffff',
                marginBottom: '0.4rem',
                textShadow: '0 0 10px rgba(255, 255, 255, 0.15)',
              }}>
                <HolographicText text={project.title} delay={850} speed={15} />
              </h2>
              
              <div>
                <HolographicText 
                  text={project.date} 
                  delay={1100}
                  speed={20}
                  style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.75rem', color: 'var(--muted)' }}
                />
              </div>
            </div>

            {/* Highlights section */}
            <h4 style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '0.75rem',
              color: 'var(--accent)',
              letterSpacing: '0.1em',
              marginTop: '1.8rem',
              marginBottom: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}>
              <span>//</span> 
              <HolographicText text="Key Highlights" delay={1300} speed={20} />
            </h4>

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {project.descBullets.map((bullet, idx) => (
                <li key={idx} style={{ display: 'flex', gap: '0.6rem', color: 'var(--text)', fontSize: '0.88rem', lineHeight: 1.65 }}>
                  <motion.span 
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 1500 + idx * 300, type: 'spring' }}
                    style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '3px', textShadow: '0 0 8px var(--accent)' }}
                  >
                    ▸
                  </motion.span>
                  <HolographicText 
                    text={bullet} 
                    delay={1500 + idx * 300} 
                    speed={12} 
                    style={{ color: 'rgba(226, 232, 240, 0.85)' }}
                  />
                </li>
              ))}
            </ul>

            {/* Technologies section */}
            <h4 style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '0.75rem',
              color: 'var(--accent)',
              letterSpacing: '0.1em',
              marginTop: '1.8rem',
              marginBottom: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}>
              <span>//</span>
              <HolographicText text="Technologies" delay={2400} speed={20} />
            </h4>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2600, duration: 0.4 }}
              style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}
            >
              {project.detailTags.map((t) => <TechBadge key={t.label} label={t.label} />)}
            </motion.div>

            {/* Bottom HUD buttons */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '1.5rem',
              marginTop: '2.5rem',
              width: '100%',
            }}>
              <motion.a 
                href={project.githubUrl} 
                target="_blank" 
                rel="noreferrer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2800, type: 'spring' }}
                className="holo-btn"
                style={{
                  flex: 1,
                  textAlign: 'center',
                  textDecoration: 'none',
                  display: 'inline-block',
                  border: '1px solid rgba(0, 229, 255, 0.6)',
                  boxShadow: '0 0 12px rgba(0, 229, 255, 0.25)',
                }}
              >
                [ ACCESS GITHUB ]
              </motion.a>

              <motion.button 
                onClick={onClose}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2950, type: 'spring' }}
                className="holo-btn"
                style={{
                  flex: 1,
                  textAlign: 'center',
                  border: '1px solid rgba(226, 232, 240, 0.3)',
                  color: 'var(--muted)',
                  background: 'rgba(226, 232, 240, 0.02)',
                }}
                onMouseEnter={(e) => {
                  const target = e.currentTarget;
                  target.style.borderColor = 'rgba(255, 75, 110, 0.8)';
                  target.style.color = '#ff4b6e';
                  target.style.boxShadow = '0 0 16px rgba(255, 75, 110, 0.35)';
                }}
                onMouseLeave={(e) => {
                  const target = e.currentTarget;
                  target.style.borderColor = 'rgba(226, 232, 240, 0.3)';
                  target.style.color = 'var(--muted)';
                  target.style.boxShadow = 'none';
                }}
              >
                [ CLOSE SYSTEM ]
              </motion.button>
            </div>

          </div>
        </motion.div>

        {/* Close Button top-right */}
        <button 
          onClick={onClose} 
          className="holo-btn"
          style={{
            position: 'absolute', 
            top: '16px', 
            right: '16px', 
            zIndex: 15,
            width: '32px', 
            height: '32px',
            padding: 0,
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            borderRadius: '50%',
            fontSize: '1.2rem',
            border: '1px solid rgba(0, 229, 255, 0.5)',
            background: 'rgba(6, 12, 28, 0.95)',
            color: 'var(--accent)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 229, 255, 0.6)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 0 8px rgba(0, 229, 255, 0.1)';
          }}
        >×</button>
      </motion.div>
    </motion.div>
  );
}

// ── Filter config ──────────────────────────────────────────────
const filters = [
  { key: 'all',      label: 'All' },
  { key: 'robotics', label: 'Robotics & Embedded' },
  { key: 'ds',       label: 'Data Science' },
];

// ── Main section ───────────────────────────────────────────────
export default function Projects() {
  const [filter, setFilter] = useState<'all' | 'robotics' | 'ds'>('all');
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const filtered = projects.filter((p) => filter === 'all' || p.category === filter);

  return (
    <section id="projects" style={{ paddingTop: '7rem', paddingBottom: '5rem' }}>
      <div className="section-container">
        {/* Section header */}
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
        style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.78rem', color: 'var(--accent)', letterSpacing: '0.15em' }}>02 //</span>
        <h2 style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontSize: 'clamp(1.5rem,4vw,2.5rem)', fontWeight: 800, color: 'var(--text)' }}>Projects</h2>
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, var(--accent), transparent)', opacity: 0.3 }} />
      </motion.div>

      {/* Filter tabs */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
        style={{ display: 'flex', gap: '0.5rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
        {filters.map((f) => (
          <motion.button key={f.key} onClick={() => setFilter(f.key as typeof filter)}
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
            style={{
              padding: '0.45rem 1.1rem', borderRadius: '6px', border: '1px solid',
              cursor: 'pointer', fontFamily: "'Space Mono', monospace", fontSize: '0.75rem',
              transition: 'all 0.2s',
              ...(filter === f.key
                ? { background: 'var(--accent)', color: '#080c14', borderColor: 'var(--accent)', boxShadow: '0 0 16px rgba(0,229,255,0.3)' }
                : { background: 'transparent', color: 'var(--muted)', borderColor: 'var(--border)' }),
            }}>
            {f.label}
          </motion.button>
        ))}
      </motion.div>

      {/* Project grid */}
      <motion.div layout style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => {
            const glow = categoryGlow[project.category];
            return (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.94, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -10 }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
                className="project-card-outer"
                onClick={() => setActiveProject(project)}
                style={{ cursor: 'none' }}
                role="button"
                tabIndex={0}
              >
                <BorderGlow
                  borderRadius={14}
                  backgroundColor="#0d1220"
                  glowColor={glow.glowColor}
                  colors={glow.colors}
                  glowRadius={36}
                  glowIntensity={1.1}
                  coneSpread={22}
                >
                  {/* Image */}
                  <div style={{ position: 'relative', height: '190px', overflow: 'hidden' }}>
                    <Image src={project.image} alt={project.title} fill
                      style={{ objectFit: 'cover', transition: 'transform 0.5s ease', filter: 'brightness(0.8)' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0d1220 0%, transparent 55%)' }} />

                    {project.featured && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                        style={{
                          position: 'absolute', top: '0.75rem', left: '0.75rem',
                          background: 'rgba(0,229,255,0.15)', border: '1px solid rgba(0,229,255,0.35)',
                          borderRadius: '5px', padding: '0.2rem 0.55rem',
                          fontFamily: "'Space Mono', monospace", fontSize: '0.65rem', color: 'var(--accent)',
                        }}>★ Featured</motion.div>
                    )}
                    {project.status === 'live' && (
                      <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem' }}>
                        <span className="badge-ongoing"><span className="badge-dot" />Live</span>
                      </div>
                    )}
                  </div>

                  {/* Body */}
                  <div style={{ padding: '1.2rem 1.3rem 1.4rem' }}>
                    <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.68rem', color: 'var(--muted)', marginBottom: '0.4rem' }}>
                      {project.num}
                    </div>
                    <h3 style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontSize: '1.05rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.5rem' }}>
                      {project.title}
                    </h3>
                    <p style={{ color: 'var(--muted)', fontSize: '0.84rem', lineHeight: 1.65, marginBottom: '0.85rem' }}>
                      {project.summary}
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1rem' }}>
                      {project.tags.map((t) => <TagPill key={t.label} {...t} />)}
                    </div>
                    <motion.button
                      whileHover={{ x: 4 }}
                      onClick={() => setActiveProject(project)}
                      style={{
                        background: 'none', border: '1px solid rgba(0,229,255,0.25)',
                        borderRadius: '6px', color: 'var(--accent)', fontSize: '0.78rem',
                        padding: '0.4rem 0.9rem', cursor: 'pointer',
                        fontFamily: "'Space Mono', monospace", transition: 'background 0.2s',
                      }}
                    >
                      View Details →
                    </motion.button>
                  </div>
                </BorderGlow>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {activeProject && (
          <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
        )}
      </AnimatePresence>
      </div>
    </section>
  );
}
