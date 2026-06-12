'use client';

import {
  motion, useMotionValue, useSpring, useTransform,
  AnimatePresence, type SpringOptions, type MotionStyle,
} from 'framer-motion';
import { Children, cloneElement, useEffect, useMemo, useRef, useState } from 'react';
import './Dock.css';

// ── Types ──────────────────────────────────────────────────────
interface DockItemData {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  className?: string;
  isSeparator?: boolean;
}

interface DockItemProps {
  children: React.ReactElement[];
  className?: string;
  onClick?: () => void;
  mouseX: ReturnType<typeof useMotionValue<number>>;
  spring: SpringOptions;
  distance: number;
  magnification: number;
  baseItemSize: number;
}

interface DockLabelProps {
  children: React.ReactNode;
  className?: string;
  isHovered?: ReturnType<typeof useMotionValue<number>>;
}

interface DockIconProps {
  children: React.ReactNode;
  className?: string;
}

interface DockProps {
  items: DockItemData[];
  className?: string;
  distance?: number;
  panelHeight?: number;
  dockHeight?: number;
  baseItemSize?: number;
  magnification?: number;
  spring?: SpringOptions;
}

// ── DockItem ───────────────────────────────────────────────────
function DockItem({
  children, className = '', onClick, mouseX, spring, distance, magnification, baseItemSize,
}: DockItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isHovered = useMotionValue(0);
  const [bouncing, setBouncing] = useState(false);

  const mouseDistance = useTransform(mouseX, (val: number) => {
    const rect = ref.current?.getBoundingClientRect() ?? { x: 0, width: baseItemSize };
    return val - rect.x - baseItemSize / 2;
  });

  const targetSize = useTransform(
    mouseDistance,
    [-distance, 0, distance],
    [baseItemSize, magnification, baseItemSize],
  );
  const size = useSpring(targetSize, spring);

  const handleClick = (e: React.MouseEvent) => {
    setBouncing(true);
    setTimeout(() => setBouncing(false), 950);
    if (onClick) onClick();
  };

  return (
    <motion.div
      ref={ref}
      style={{ width: size, height: size }}
      onHoverStart={() => isHovered.set(1)}
      onHoverEnd={() => isHovered.set(0)}
      onFocus={() => isHovered.set(1)}
      onBlur={() => isHovered.set(0)}
      onClick={handleClick}
      className={`dock-item ${className}`}
      tabIndex={0}
      role="button"
      aria-haspopup="true"
    >
      <motion.div
        animate={bouncing ? {
          y: [0, -18, 0, -10, 0, -4, 0],
        } : { y: 0 }}
        transition={bouncing ? {
          duration: 0.8,
          ease: 'easeInOut',
        } : {}}
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {Children.map(children, (child) =>
          cloneElement(child as React.ReactElement<{ isHovered?: typeof isHovered }>, { isHovered }),
        )}
      </motion.div>
    </motion.div>
  );
}

// ── DockLabel ──────────────────────────────────────────────────
function DockLabel({ children, className = '', isHovered }: DockLabelProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isHovered) return;
    const unsub = isHovered.on('change', (v) => setIsVisible(v === 1));
    return unsub;
  }, [isHovered]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 4, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 4, scale: 0.92 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className={`dock-label ${className}`}
          role="tooltip"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── DockIcon ───────────────────────────────────────────────────
function DockIcon({ children, className = '' }: DockIconProps) {
  return <div className={`dock-icon ${className}`}>{children}</div>;
}

// ── Dock (Main) ────────────────────────────────────────────────
export default function Dock({
  items,
  className = '',
  spring = { mass: 0.1, stiffness: 150, damping: 12 },
  magnification = 68,
  distance = 160,
  panelHeight = 62,
  dockHeight = 256,
  baseItemSize = 46,
}: DockProps) {
  const mouseX = useMotionValue(Infinity);
  const isHovered = useMotionValue(0);

  const maxHeight = useMemo(
    () => Math.max(dockHeight, magnification + magnification / 2 + 4),
    [magnification, dockHeight],
  );

  const heightRow = useTransform(isHovered, [0, 1], [panelHeight, maxHeight]);
  const height = useSpring(heightRow, spring);

  return (
    <motion.div style={{ height, scrollbarWidth: 'none' } as MotionStyle} className="dock-outer">
      <motion.div
        onMouseMove={({ pageX }) => { isHovered.set(1); mouseX.set(pageX); }}
        onMouseLeave={() => { isHovered.set(0); mouseX.set(Infinity); }}
        className={`dock-panel ${className}`}
        style={{ height: panelHeight }}
        role="toolbar"
        aria-label="Navigation dock"
      >
        {items.map((item, index) => {
          if (item.isSeparator) {
            return <div key={index} className="dock-separator" />;
          }
          return (
            <DockItem
              key={index}
              onClick={item.onClick}
              className={item.className ?? ''}
              mouseX={mouseX}
              spring={spring}
              distance={distance}
              magnification={magnification}
              baseItemSize={baseItemSize}
            >
              <DockIcon>{item.icon}</DockIcon>
              <DockLabel>{item.label}</DockLabel>
            </DockItem>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
