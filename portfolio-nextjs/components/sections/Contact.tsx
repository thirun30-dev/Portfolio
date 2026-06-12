'use client';
import { motion } from 'framer-motion';

const contactItems = [
  { icon: '✉', label: 'Email', val: 'thirusriram3012@gmail.com', href: 'mailto:thirusriram3012@gmail.com' },
  { icon: '📞', label: 'Phone', val: '+91 93457 44397', href: 'tel:+919345744397' },
  { icon: '◈', label: 'GitHub', val: 'github.com/thirun30-dev', href: 'https://github.com/thirun30-dev' },
  { icon: 'in', label: 'LinkedIn', val: 'thirunavukkarasu-veeramani', href: 'https://linkedin.com/in/thirunavukkarasu-veeramani-140b6a317' },
];

export default function Contact() {
  return (
    <section id="contact" style={{ paddingTop: '7rem', paddingBottom: '8rem' }}>
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
        style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.78rem', color: 'var(--accent)', letterSpacing: '0.15em' }}>07 //</span>
        <h2 style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontSize: 'clamp(1.5rem,4vw,2.5rem)', fontWeight: 800, color: 'var(--text)' }}>Contact</h2>
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, var(--accent), transparent)', opacity: 0.3 }} />
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem', alignItems: 'center' }}>
        {/* Left text */}
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }}>
          <p style={{ color: 'var(--muted)', lineHeight: 1.75, fontSize: '1rem', marginBottom: '1rem' }}>
            I&apos;m currently open to internship opportunities, research collaborations, and freelance robotics/embedded projects.
          </p>
          <p style={{ color: 'var(--muted)', lineHeight: 1.75, fontSize: '1rem', marginBottom: '1rem' }}>
            Whether you&apos;re building something ambitious in robotics, autonomous systems, or AI — I&apos;d love to hear from you.
          </p>
          <motion.p
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ color: 'var(--accent)', fontWeight: 600, fontSize: '1.05rem', fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            Let&apos;s build something remarkable.
          </motion.p>
        </motion.div>

        {/* Contact links */}
        <motion.div
          initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
        >
          {contactItems.map((item, i) => (
            <motion.a
              key={item.label}
              href={item.href}
              target={item.href.startsWith('http') ? '_blank' : undefined}
              rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ x: 6, backgroundColor: 'rgba(0,229,255,0.08)' }}
              className="contact-item"
              style={{
                display: 'flex', alignItems: 'center', gap: '1rem',
                padding: '0.9rem 1.1rem', borderRadius: '10px',
                background: 'var(--surface)', border: '1px solid var(--border)',
                textDecoration: 'none', transition: 'all 0.25s',
              }}
            >
              <div style={{
                width: '38px', height: '38px', borderRadius: '8px',
                background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--accent)', fontSize: '1rem', fontWeight: 700, flexShrink: 0,
              }}>{item.icon}</div>
              <div>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.68rem', color: 'var(--muted)', letterSpacing: '0.08em', marginBottom: '0.15rem' }}>{item.label}</div>
                <div style={{ color: 'var(--text)', fontSize: '0.88rem', fontWeight: 500 }}>{item.val}</div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
