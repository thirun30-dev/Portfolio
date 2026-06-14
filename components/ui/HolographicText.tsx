'use client';

import React, { useEffect, useState, useRef } from 'react';

const GLYPHS = '01$#@%&?+={}[]▲▼◀▶◈▣▲△▽▷◁○●⚡_';

interface HolographicTextProps {
  text: string;
  delay?: number; // Initial delay before animation starts (ms)
  speed?: number; // Speed per character (ms)
  scrambleCount?: number; // Number of scramble cycles per character
  className?: string;
  style?: React.CSSProperties;
}

export default function HolographicText({
  text,
  delay = 0,
  speed = 20,
  scrambleCount = 2,
  className = '',
  style = {},
}: HolographicTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const indexRef = useRef(0);
  const scrambleTicksRef = useRef(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Reset state on text or source change
    setDisplayedText('');
    indexRef.current = 0;
    scrambleTicksRef.current = 0;

    const startTimeout = setTimeout(() => {
      const tick = () => {
        if (indexRef.current >= text.length) {
          setDisplayedText(text);
          return;
        }

        const baseText = text.slice(0, indexRef.current);
        const currentTargetChar = text[indexRef.current];

        // If whitespace, append immediately and move to next
        if (/\s/.test(currentTargetChar)) {
          indexRef.current++;
          scrambleTicksRef.current = 0;
          setDisplayedText(baseText + currentTargetChar);
          timerRef.current = setTimeout(tick, speed);
          return;
        }

        if (scrambleTicksRef.current < scrambleCount) {
          // Cycle through random glyphs
          const randomGlyph = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          setDisplayedText(baseText + randomGlyph);
          scrambleTicksRef.current++;
          // Cycle faster than typing speed
          timerRef.current = setTimeout(tick, Math.max(8, speed / 2));
        } else {
          // Lock in actual character and move to next
          setDisplayedText(baseText + currentTargetChar);
          indexRef.current++;
          scrambleTicksRef.current = 0;
          timerRef.current = setTimeout(tick, speed);
        }
      };

      tick();
    }, delay);

    return () => {
      clearTimeout(startTimeout);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [text, delay, speed, scrambleCount]);

  const isComplete = displayedText === text;

  return (
    <span className={className} style={{ ...style, position: 'relative' }}>
      {displayedText}
      {!isComplete && (
        <span
          className="holographic-cursor"
          style={{
            display: 'inline-block',
            marginLeft: '2px',
            color: 'var(--accent)',
            textShadow: '0 0 8px var(--accent)',
            animation: 'blink 0.8s step-end infinite',
          }}
        >
          ▋
        </span>
      )}
    </span>
  );
}
