'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { terminalLogs } from '@/data/portfolio';

interface IntroLoaderProps {
  onDone: () => void;
}

export default function IntroLoader({ onDone }: IntroLoaderProps) {
  const [logs, setLogs] = useState<Array<{ text: string; type: string }>>([]);
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Progress bar
    let prog = 0;
    const pInterval = setInterval(() => {
      prog += 2;
      if (prog > 100) { prog = 100; clearInterval(pInterval); }
      setProgress(prog);
    }, 50);

    // Terminal logs
    terminalLogs.forEach((log) => {
      setTimeout(() => {
        setLogs((prev) => [...prev, { text: `> ${log.text}`, type: log.type }]);
        if (terminalRef.current) terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
      }, log.delay);
    });

    // Fade out
    const endTimer = setTimeout(() => {
      setVisible(false);
      setTimeout(onDone, 600);
    }, 2900);

    return () => { clearInterval(pInterval); clearTimeout(endTimer); };
  }, [onDone]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'var(--bg)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <div style={{ textAlign: 'center', width: '100%', maxWidth: 500, padding: '2rem' }}>
            {/* Brand */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              <div style={{ position: 'relative', display: 'inline-block', marginBottom: '0.5rem' }}>
                <div style={{
                  position: 'absolute', inset: '-30px',
                  background: 'radial-gradient(ellipse, rgba(0,229,255,0.18) 0%, transparent 70%)',
                  filter: 'blur(20px)', borderRadius: '50%',
                }} />
                <svg viewBox="0 0 100 100" width="48" height="48" style={{ position: 'relative' }}>
                  <circle cx="50" cy="50" r="45" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeDasharray="12,8" />
                  <circle cx="50" cy="50" r="32" fill="none" stroke="var(--accent2)" strokeWidth="2" strokeDasharray="8,6" />
                  <circle cx="50" cy="50" r="20" fill="none" stroke="var(--accent3)" strokeWidth="1.5" />
                  <circle cx="50" cy="50" r="8" fill="var(--accent)" className="badge-core" />
                  <path d="M50 5v15M50 80v15M5 50h15M80 50h15" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <h1 style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontSize: 'clamp(1.4rem,4vw,2rem)', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text)', marginTop: '1rem' }}>
                Thirunavukkarasu <span style={{ color: 'var(--accent)' }}>Veeramani</span>
              </h1>
            </motion.div>

            {/* Loader bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="intro-loader-track"
            >
              <div className="intro-loader-fill" style={{ width: `${progress}%` }} />
            </motion.div>

            {/* Terminal */}
            <motion.div
              ref={terminalRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              style={{
                marginTop: '1.5rem', maxHeight: '180px', overflowY: 'auto',
                textAlign: 'left', padding: '1rem',
                background: 'rgba(13,18,32,0.7)',
                border: '1px solid rgba(0,229,255,0.1)',
                borderRadius: '8px',
              }}
            >
              {logs.map((log, i) => (
                <div key={i} className={`terminal-line ${log.type}`}>{log.text}</div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
