'use client';
import { useEffect, useRef } from 'react';

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docH > 0 ? (scrollTop / docH) * 100 : 0;
      if (barRef.current) barRef.current.style.width = `${pct}%`;
      if (btnRef.current) {
        if (scrollTop > 400) btnRef.current.classList.add('visible');
        else btnRef.current.classList.remove('visible');
      }
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <>
      <div id="scroll-progress" ref={barRef} />
      <button
        id="back-to-top"
        ref={btnRef}
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >↑</button>
    </>
  );
}
