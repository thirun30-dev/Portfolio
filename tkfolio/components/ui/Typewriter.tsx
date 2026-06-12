'use client';
import { useEffect, useState } from 'react';
import { typewriterRoles } from '@/data/portfolio';

export default function Typewriter() {
  const [text, setText] = useState('');
  const [roleIdx, setRoleIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = typewriterRoles[roleIdx];
    let delay = isDeleting ? 55 : 95;

    if (!isDeleting && charIdx === current.length) {
      delay = 1800;
    } else if (isDeleting && charIdx === 0) {
      delay = 300;
    }

    const timer = setTimeout(() => {
      if (!isDeleting && charIdx === current.length) {
        setIsDeleting(true);
      } else if (isDeleting && charIdx === 0) {
        setIsDeleting(false);
        setRoleIdx((r) => (r + 1) % typewriterRoles.length);
      } else {
        const next = isDeleting ? charIdx - 1 : charIdx + 1;
        setCharIdx(next);
        setText(current.slice(0, next));
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [text, charIdx, isDeleting, roleIdx]);

  return (
    <p className="hero-title" style={{ fontFamily: "'Space Mono', monospace", fontSize: 'clamp(1rem,2.5vw,1.4rem)', color: 'var(--accent)', minHeight: '2rem' }}>
      <span>{text}</span>
      <span className="cursor-blink">|</span>
    </p>
  );
}
