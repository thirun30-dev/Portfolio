'use client';
import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message { text: string; sender: 'user' | 'bot'; html?: boolean; }

function getBotResponse(query: string): string {
  const q = query.toLowerCase();

  if (q.includes('project') || q.includes('robix') || q.includes('zeno') || q.includes('lane') || q.includes('race')) {
    return `TK has built some highly interesting robotic systems:<br>
    • <strong>ROBIX AMR</strong>: Autonomous mobile robot with ESP32 & ROS, obstacle avoidance.<br>
    • <strong>Zeno</strong>: Self-balancing robot with PID stabilization & MPU6050.<br>
    • <strong>Bluetooth Race Bot</strong>: ESP32 high-speed RC racer.<br>
    • <strong>Lane Detection</strong>: OpenCV autonomous computer vision pipeline.<br><br>
    <button class="chat-scroll-btn" data-target="#projects">◈ Scroll to Projects</button>`;
  }

  if (q.includes('skill') || q.includes('tech') || q.includes('language') || q.includes('ros') || q.includes('python') || q.includes('c++') || q.includes('react') || q.includes('next') || q.includes('tailwind')) {
    return `TK's technical stack covers:<br>
    • <strong>Robotics</strong>: ROS/ROS2, ESP32, PID, Sensor Integration, SolidWorks, PLC.<br>
    • <strong>Programming</strong>: Python, C/C++, HTML, CSS, JavaScript, React, Next.js, Tailwind CSS.<br>
    • <strong>Data Science</strong>: Machine Learning, DSA, OpenCV, SQL, Statistical Modeling.<br><br>
    <button class="chat-scroll-btn" data-target="#skills">◈ Scroll to Skills</button>`;
  }

  if (q.includes('education') || q.includes('iit') || q.includes('rec') || q.includes('college') || q.includes('degree') || q.includes('cgpa')) {
    return `TK is pursuing a double degree:<br>
    1. <strong>B.E. Robotics & Automation</strong> at REC, Chennai — CGPA: <strong>8.2/10</strong><br>
    2. <strong>Online B.S. Data Science</strong> at IIT Madras.<br><br>
    <button class="chat-scroll-btn" data-target="#education">◈ Scroll to Education</button>`;
  }

  if (q.includes('achievement') || q.includes('robocon') || q.includes('hackathon') || q.includes('gold') || q.includes('sih')) {
    return `TK's core achievements:<br>
    • <strong>DD Robocon 2025</strong>: Mechanical & Control Design Lead.<br>
    • <strong>Smart India Hackathon 2024</strong>: National Finalist & Team Lead.<br>
    • <strong>Elite+Gold Medalist</strong>: NPTEL Python for Data Science.<br><br>
    <button class="chat-scroll-btn" data-target="#achievements">◈ Scroll to Achievements</button>`;
  }

  if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('linkedin') || q.includes('hire') || q.includes('github')) {
    return `Reach TK via:<br>
    • ✉ <a href="mailto:thirusriram3012@gmail.com" class="chat-inline-link">thirusriram3012@gmail.com</a><br>
    • 📞 <a href="tel:+919345744397" class="chat-inline-link">+91 93457 44397</a><br>
    • ◈ <a href="https://github.com/thirun30-dev" target="_blank" class="chat-inline-link">github.com/thirun30-dev</a><br>
    • <a href="https://linkedin.com/in/thirunavukkarasu-veeramani-140b6a317" target="_blank" class="chat-inline-link">LinkedIn Profile</a><br><br>
    <button class="chat-scroll-btn" data-target="#contact">◈ Scroll to Contact</button>`;
  }

  return `I'm TK's AI assistant. Ask me about:<br>
  • His <strong>projects</strong> (ROBIX, Zeno, Lane detection…)<br>
  • Technical <strong>skills</strong> (ROS, Python, React, ML…)<br>
  • <strong>Education</strong> (REC Robotics or IIT Madras B.S.)<br>
  • <strong>Achievements</strong> (Robocon, SIH…)<br>
  • How to <strong>contact</strong> him.`;
}

const suggestions = [
  { label: '🤖 Robotics Projects', query: 'projects' },
  { label: '📊 IIT Madras B.S.', query: 'iit' },
  { label: '⚡ Technical Skills', query: 'skills' },
  { label: '✉ Get in Touch', query: 'contact' },
];

export default function AIChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hello! I'm TK's AI assistant. Ask me about his projects, skills, education, or contact — or pick a suggestion below! 🚀", sender: 'bot' },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const msgEndRef = useRef<HTMLDivElement>(null);

  const addMessage = useCallback((msg: Message) => {
    setMessages((prev) => [...prev, msg]);
    setTimeout(() => msgEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
  }, []);

  const handleSend = useCallback((text: string, query: string) => {
    if (!text.trim()) return;
    addMessage({ text, sender: 'user' });
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      addMessage({ text: getBotResponse(query), sender: 'bot', html: true });
    }, 800 + Math.random() * 500);
  }, [addMessage]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend(input, input);
    setInput('');
  };

  // Handle scroll buttons inside chat bubbles
  const handleBubbleClick = (e: React.MouseEvent) => {
    const btn = (e.target as HTMLElement).closest('.chat-scroll-btn') as HTMLElement;
    if (btn) {
      const target = btn.getAttribute('data-target');
      if (target) document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{ position: 'fixed', bottom: '1.5rem', right: '1.5rem', zIndex: 700 }}>
      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat-window"
            initial={{ opacity: 0, y: 20, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.94 }}
            transition={{ type: 'spring', stiffness: 300, damping: 26 }}
            style={{
              position: 'absolute', bottom: '62px', right: 0,
              width: '320px', maxHeight: '480px',
              background: 'rgba(8,12,20,0.97)', backdropFilter: 'blur(20px)',
              border: '1px solid rgba(0,229,255,0.15)', borderRadius: '16px',
              display: 'flex', flexDirection: 'column', overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 40px rgba(0,229,255,0.05)',
            }}
          >
            {/* Header */}
            <div style={{
              padding: '0.9rem 1rem', borderBottom: '1px solid rgba(0,229,255,0.1)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              background: 'rgba(13,18,32,0.8)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <div style={{
                  width: '32px', height: '32px', borderRadius: '50%',
                  background: 'rgba(0,229,255,0.12)', border: '1px solid rgba(0,229,255,0.25)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem',
                }}>🤖</div>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text)' }}>TK Bot</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent3)', animation: 'pulse-dot 1.5s infinite' }} />
                    <span style={{ fontSize: '0.65rem', color: 'var(--muted)' }}>Online</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontSize: '1.1rem' }}>×</button>
            </div>

            {/* Messages */}
            <div onClick={handleBubbleClick} style={{
              flex: 1, overflowY: 'auto', padding: '0.9rem',
              display: 'flex', flexDirection: 'column', gap: '0.6rem',
            }}>
              {messages.map((msg, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  className={`chat-bubble ${msg.sender}`}
                  {...(msg.html ? { dangerouslySetInnerHTML: { __html: msg.text } } : { children: msg.text })}
                />
              ))}
              {typing && (
                <div className="chat-bubble bot typing">
                  Thinking<span /><span /><span />
                </div>
              )}
              <div ref={msgEndRef} />
            </div>

            {/* Suggestions */}
            <div style={{ padding: '0.5rem 0.9rem', display: 'flex', flexWrap: 'wrap', gap: '0.35rem', borderTop: '1px solid rgba(0,229,255,0.07)' }}>
              {suggestions.map((s) => (
                <button key={s.query} onClick={() => handleSend(s.label, s.query)} style={{
                  fontFamily: "'Space Mono', monospace", fontSize: '0.65rem',
                  padding: '0.25rem 0.55rem', borderRadius: '5px', cursor: 'pointer',
                  background: 'rgba(0,229,255,0.06)', border: '1px solid rgba(0,229,255,0.15)',
                  color: 'var(--accent)', transition: 'background 0.2s',
                }}>{s.label}</button>
              ))}
            </div>

            {/* Input */}
            <form onSubmit={onSubmit} style={{
              padding: '0.75rem', borderTop: '1px solid rgba(0,229,255,0.08)',
              display: 'flex', gap: '0.5rem',
            }}>
              <input
                value={input} onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                style={{
                  flex: 1, padding: '0.5rem 0.8rem', borderRadius: '8px',
                  background: 'rgba(13,18,32,0.8)', border: '1px solid rgba(0,229,255,0.15)',
                  color: 'var(--text)', fontSize: '0.82rem', outline: 'none',
                }}
              />
              <button type="submit" style={{
                padding: '0.5rem 0.75rem', borderRadius: '8px',
                background: 'var(--accent)', border: 'none', color: '#080c14',
                cursor: 'pointer', fontWeight: 700, fontSize: '0.9rem',
              }}>➔</button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.93 }}
        onClick={() => setOpen((o) => !o)}
        style={{
          width: '52px', height: '52px', borderRadius: '50%',
          background: open ? 'rgba(0,229,255,0.15)' : 'rgba(8,12,20,0.9)',
          border: '1px solid rgba(0,229,255,0.3)', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.3rem', boxShadow: '0 4px 20px rgba(0,229,255,0.2)',
          transition: 'background 0.2s',
          position: 'relative',
        }}
        aria-label="Open AI assistant"
      >
        {!open && (
          <motion.div
            animate={{ scale: [1, 1.4, 1], opacity: [0.7, 0, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              position: 'absolute', inset: '-4px', borderRadius: '50%',
              border: '1px solid rgba(0,229,255,0.4)',
            }}
          />
        )}
        🤖
      </motion.button>
    </div>
  );
}
