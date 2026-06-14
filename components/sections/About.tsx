'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';

const infoItems = [
  { label: 'Location', val: 'Chennai, Tamil Nadu, India' },
  { label: 'Degree', val: 'B.E. Robotics & Automation (2023–2027)' },
  { label: 'Also', val: 'Online B.S. Data Science · IIT Madras' },
  { label: 'CGPA', val: '8.2 / 10' },
  { label: 'Focus', val: 'Robotics · Embedded Systems · ML · Autonomous Vehicles' },
  { label: 'Email', val: 'thirusriram3012@gmail.com' },
];

export default function About() {
  return (
    <section id="about" style={{ paddingTop: '7rem', paddingBottom: '5rem' }}>
      <div className="section-container">
        {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}
      >
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.78rem', color: 'var(--accent)', letterSpacing: '0.15em' }}>01 //</span>
        <h2 style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontSize: 'clamp(1.5rem,4vw,2.5rem)', fontWeight: 800, color: 'var(--text)' }}>About Me</h2>
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, var(--accent), transparent)', opacity: 0.3 }} />
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'start' }}>
        {/* Left — photo + bio */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
        >
          {/* Profile photo */}
          <div style={{ position: 'relative', width: '220px', margin: '0 auto' }}>
            {/* Corner brackets */}
            {[['top:0','left:0'],['top:0','right:0'],['bottom:0','left:0'],['bottom:0','right:0']].map((pos, i) => {
              const [v, h] = pos;
              const vDir = v.split(':')[0], hDir = h.split(':')[0];
              return (
                <div key={i} style={{
                  position: 'absolute', width: '16px', height: '16px',
                  [vDir]: '-6px', [hDir]: '-6px',
                  borderTop: vDir === 'top' ? '2px solid var(--accent)' : 'none',
                  borderBottom: vDir === 'bottom' ? '2px solid var(--accent)' : 'none',
                  borderLeft: hDir === 'left' ? '2px solid var(--accent)' : 'none',
                  borderRight: hDir === 'right' ? '2px solid var(--accent)' : 'none',
                  zIndex: 2,
                }} />
              );
            })}
            {/* Spinning ring */}
            <div style={{
              position: 'absolute', inset: '-12px', borderRadius: '50%',
              border: '1px dashed rgba(0,229,255,0.25)',
              animation: 'spin-slow 18s linear infinite',
            }} />
            <div style={{
              position: 'relative', borderRadius: '12px', overflow: 'hidden',
              border: '2px solid rgba(0,229,255,0.2)',
              boxShadow: '0 0 40px rgba(0,229,255,0.08)',
            }}>
              <Image
                src="/images/Thirunavukkarasu.png"
                alt="Thirunavukkarasu Veeramani"
                width={220} height={280}
                style={{ width: '100%', height: 'auto', display: 'block', filter: 'brightness(0.95)' }}
              />
            </div>
          </div>

          {/* Bio */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--muted)', lineHeight: 1.75, fontSize: '0.93rem' }}>
            <p>I&apos;m a Robotics and Automation Engineering student at Rajalakshmi Engineering College, Chennai — currently in my 3rd year with a strong CGPA of 8.2. I&apos;m also pursuing an Online B.S. in Data Science from IIT Madras, giving me dual expertise in physical robotics and analytical data science.</p>
            <p>My work sits at the intersection of embedded systems, real-time control, and automation. I&apos;ve built everything from self-balancing robots using PID algorithms to autonomous mobile robots with obstacle avoidance.</p>
            <p>Outside of robotics, I dive deep into data analysis, machine learning, and web development — always looking for ways to make systems more efficient, adaptive, and autonomous.</p>
          </div>
        </motion.div>

        {/* Right — info list */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0' }}>
            {infoItems.map((item, i) => (
              <motion.li
                key={item.label}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                style={{
                  display: 'flex', gap: '1rem', padding: '0.9rem 0',
                  borderBottom: '1px solid rgba(0,229,255,0.07)',
                  alignItems: 'flex-start',
                }}
              >
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.72rem', color: 'var(--accent)', minWidth: '80px', letterSpacing: '0.05em', paddingTop: '2px' }}>{item.label}</span>
                <span style={{ color: 'var(--text)', fontSize: '0.9rem', fontWeight: 500 }}>{item.val}</span>
              </motion.li>
            ))}
          </ul>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
            style={{ marginTop: '2rem' }}
          >
            <motion.a
              href="/TK-Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03, boxShadow: '0 0 20px rgba(0,229,255,0.35)' }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.75rem 1.4rem',
                borderRadius: '8px',
                background: 'rgba(0, 229, 255, 0.06)',
                border: '1.5px solid var(--accent)',
                color: 'var(--accent)',
                fontFamily: "'Space Mono', monospace",
                fontSize: '0.82rem',
                fontWeight: 700,
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
            >
              <span>◈ VIEW RESUME (PDF)</span>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
      </div>
    </section>
  );
}
