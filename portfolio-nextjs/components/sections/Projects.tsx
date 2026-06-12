'use client';
import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { projects, type Project } from '@/data/portfolio';
import BorderGlow from '@/components/ui/BorderGlow';

// ── Tag pill ───────────────────────────────────────────────────
function TagPill({ label, color }: { label: string; color?: 'green' | 'red' | 'default' }) {
  return <span className={`tag${color ? ` ${color}` : ''}`}>{label}</span>;
}

// ── Per-category glow colors (HSL format for BorderGlow) ───────
const categoryGlow: Record<string, { glowColor: string; colors: string[] }> = {
  robotics: { glowColor: '185 100 50', colors: ['#00e5ff', '#a78bfa', '#3b82f6'] },
  ds:       { glowColor: '145 80 45',  colors: ['#39ff14', '#06b6d4', '#a78bfa'] },
};

// ── Project Modal ──────────────────────────────────────────────
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 900,
          background: 'rgba(8,12,20,0.88)', backdropFilter: 'blur(14px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem',
        }}
      >
        <motion.div
          key="card"
          initial={{ scale: 0.88, opacity: 0, y: 24 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 12 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          onClick={(e) => e.stopPropagation()}
          style={{ maxWidth: '700px', width: '100%', maxHeight: '90vh', position: 'relative' }}
        >
          <BorderGlow
            borderRadius={16}
            glowColor={categoryGlow[project.category].glowColor}
            colors={categoryGlow[project.category].colors}
            backgroundColor="#0d1220"
            glowRadius={50}
            glowIntensity={1.2}
            coneSpread={28}
            animated
          >
            <div style={{ maxHeight: '85vh', overflowY: 'auto' }}>
              {/* Image */}
              <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                <Image src={project.image} alt={project.title} fill style={{ objectFit: 'cover', filter: 'brightness(0.75)' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0d1220 0%, transparent 55%)' }} />
              </div>

              <div style={{ padding: '1.5rem 2rem 2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.7rem', color: 'var(--muted)' }}>{project.num}</span>
                  {project.status === 'live' && <span className="badge-ongoing"><span className="badge-dot" />Live</span>}
                </div>
                <h2 style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontSize: '1.5rem', fontWeight: 800, color: 'var(--text)', marginBottom: '0.4rem' }}>{project.title}</h2>
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.7rem', color: 'var(--muted)' }}>{project.date}</span>

                <h4 style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.7rem', color: 'var(--accent)', letterSpacing: '0.1em', marginTop: '1.5rem', marginBottom: '0.75rem' }}>// Key Highlights</h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {project.descBullets.map((b, i) => (
                    <li key={i} style={{ display: 'flex', gap: '0.6rem', color: 'var(--muted)', fontSize: '0.88rem', lineHeight: 1.65 }}>
                      <span style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '3px' }}>▸</span>{b}
                    </li>
                  ))}
                </ul>

                <h4 style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.7rem', color: 'var(--accent)', letterSpacing: '0.1em', marginTop: '1.5rem', marginBottom: '0.75rem' }}>// Technologies</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {project.detailTags.map((t) => <TagPill key={t.label} {...t} />)}
                </div>

                <a href={project.githubUrl} target="_blank" rel="noreferrer" style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  marginTop: '1.5rem', padding: '0.6rem 1.2rem',
                  background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.2)',
                  borderRadius: '8px', color: 'var(--accent)', textDecoration: 'none',
                  fontSize: '0.84rem', fontWeight: 600, transition: 'background 0.2s',
                }}>◈ View on GitHub ↗</a>
              </div>
            </div>
          </BorderGlow>

          {/* Close btn */}
          <button onClick={onClose} style={{
            position: 'absolute', top: '-12px', right: '-12px', zIndex: 10,
            background: 'rgba(8,12,20,0.95)', border: '1px solid rgba(0,229,255,0.2)',
            borderRadius: '50%', width: '32px', height: '32px',
            color: 'var(--muted)', cursor: 'pointer', fontSize: '1rem',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>×</button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
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
      {activeProject && (
        <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
      )}
    </section>
  );
}
