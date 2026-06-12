'use client';
import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mouseX = -1000, mouseY = -1000;
    let cursorX = -1000, cursorY = -1000;
    let ringX = -1000, ringY = -1000;
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      const glow = document.querySelector<HTMLElement>('.hero-glow');
      if (glow) {
        const x = (e.clientX / window.innerWidth) * 24 - 12;
        const y = (e.clientY / window.innerHeight) * 24 - 12;
        glow.style.transform = `translate(${x}px, ${y}px)`;
      }
    };

    const animate = () => {
      cursorX += (mouseX - cursorX) * 0.25;
      cursorY += (mouseY - cursorY) * 0.25;
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      if (cursorRef.current) {
        cursorRef.current.style.left = `${cursorX}px`;
        cursorRef.current.style.top = `${cursorY}px`;
      }
      if (ringRef.current) {
        ringRef.current.style.left = `${ringX}px`;
        ringRef.current.style.top = `${ringY}px`;
      }
      rafId = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', onMove);
    rafId = requestAnimationFrame(animate);

    const setupHover = () => {
      document.querySelectorAll<HTMLElement>('a, button, .contact-item').forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
      });
      document.querySelectorAll<HTMLElement>('.project-card-outer').forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-card-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-card-hover'));
      });
    };
    // Small delay to wait for DOM
    setTimeout(setupHover, 500);

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div id="custom-cursor" ref={cursorRef} />
      <div id="custom-cursor-ring" ref={ringRef} />
    </>
  );
}
