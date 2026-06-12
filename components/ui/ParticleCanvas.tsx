'use client';
import { useEffect, useRef } from 'react';

interface Node {
  ox: number; oy: number;
  x: number;  y: number;
  vx: number; vy: number;
  z: number; r: number;
  baseAlpha: number; alpha: number;
  phase: number; phaseSpeed: number;
  cr: number; cg: number; cb: number;
  lit: boolean; litDecay: number;
}

interface Pulse {
  x: number; y: number;
  cr: number; cg: number; cb: number;
  r: number; alpha: number; alive: boolean;
}

const PALETTES = [
  { r: 0,   g: 229, b: 255 },
  { r: 255, g: 75,  b: 110 },
  { r: 57,  g: 255, b: 20  },
];

const NODE_COUNT = 110, LINK_DIST = 130, MOUSE_DIST = 180,
  REPEL_DIST = 120, REPEL_FORCE = 0.5, RETURN_EASE = 0.04,
  MAX_SPEED = 1.1, PULSE_INTERVAL = 3200, PULSE_SPEED = 2.2, PULSE_MAX_R = 280;

export default function ParticleCanvas({ mouseRef }: { mouseRef: React.RefObject<{ x: number; y: number }> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = 0, H = 0;
    let nodes: Node[] = [];
    let pulses: Pulse[] = [];
    let lastPulseTime = 0;
    let rafId: number;

    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };

    const makeNode = (): Node => {
      const p = PALETTES[Math.floor(Math.random() * PALETTES.length)];
      const z = Math.random();
      const ox = Math.random() * W, oy = Math.random() * H;
      return {
        ox, oy, x: ox, y: oy,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        z, r: 0.6 + z * 2.2,
        baseAlpha: 0.25 + z * 0.55, alpha: 0.5,
        phase: Math.random() * Math.PI * 2,
        phaseSpeed: 0.008 + Math.random() * 0.018,
        cr: p.r, cg: p.g, cb: p.b,
        lit: false, litDecay: 0,
      };
    };

    const updateNode = (n: Node) => {
      n.ox += n.vx; n.oy += n.vy;
      if (n.ox < 0) n.ox = W; if (n.ox > W) n.ox = 0;
      if (n.oy < 0) n.oy = H; if (n.oy > H) n.oy = 0;
      const rect = canvas.getBoundingClientRect();
      const mx = (mouseRef.current?.x ?? -1000) - rect.left;
      const my = (mouseRef.current?.y ?? -1000) - rect.top;
      const dxM = n.x - mx, dyM = n.y - my;
      const dM = Math.sqrt(dxM * dxM + dyM * dyM);
      if (dM < REPEL_DIST && dM > 0) {
        const f = (REPEL_DIST - dM) / REPEL_DIST;
        n.x += (dxM / dM) * f * REPEL_FORCE * 4;
        n.y += (dyM / dM) * f * REPEL_FORCE * 4;
      }
      n.x += (n.ox - n.x) * RETURN_EASE;
      n.y += (n.oy - n.y) * RETURN_EASE;
      const spd = Math.sqrt(n.vx * n.vx + n.vy * n.vy);
      if (spd > MAX_SPEED) { n.vx = (n.vx / spd) * MAX_SPEED; n.vy = (n.vy / spd) * MAX_SPEED; }
      n.phase += n.phaseSpeed;
      n.alpha = n.baseAlpha + Math.sin(n.phase) * 0.18;
      if (n.litDecay > 0) { n.litDecay -= 0.025; if (n.litDecay < 0) n.litDecay = 0; n.lit = n.litDecay > 0; }
    };

    const drawNode = (n: Node) => {
      const a = Math.max(0, Math.min(1, n.alpha)), lb = n.litDecay;
      ctx.save();
      if (lb > 0) {
        const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * (3 + lb * 5));
        g.addColorStop(0, `rgba(${n.cr},${n.cg},${n.cb},${a * 0.9 + lb * 0.4})`);
        g.addColorStop(0.4, `rgba(${n.cr},${n.cg},${n.cb},${lb * 0.25})`);
        g.addColorStop(1, `rgba(${n.cr},${n.cg},${n.cb},0)`);
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r * (3 + lb * 5), 0, Math.PI * 2);
        ctx.fillStyle = g; ctx.fill();
      }
      ctx.beginPath(); ctx.arc(n.x, n.y, n.r + lb * n.r * 1.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${n.cr},${n.cg},${n.cb},${a + lb * 0.6})`; ctx.fill();
      ctx.restore();
    };

    const drawLinks = () => {
      const rect = canvas.getBoundingClientRect();
      const mx = (mouseRef.current?.x ?? -1000) - rect.left;
      const my = (mouseRef.current?.y ?? -1000) - rect.top;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINK_DIST) {
            const t = 1 - dist / LINK_DIST;
            const la = Math.max(nodes[i].litDecay, nodes[j].litDecay);
            const nc = la > 0 ? (nodes[i].litDecay >= nodes[j].litDecay ? nodes[i] : nodes[j]) : nodes[i];
            ctx.beginPath(); ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(${nc.cr},${nc.cg},${nc.cb},${t * 0.14 + la * 0.55 * t})`;
            ctx.lineWidth = 0.5 + la * 1.2; ctx.stroke();
          }
        }
        const ni = nodes[i];
        const dxM = ni.x - mx, dyM = ni.y - my;
        const dM = Math.sqrt(dxM * dxM + dyM * dyM);
        if (dM < MOUSE_DIST) {
          ctx.beginPath(); ctx.moveTo(ni.x, ni.y); ctx.lineTo(mx, my);
          ctx.strokeStyle = `rgba(${ni.cr},${ni.cg},${ni.cb},${(1 - dM / MOUSE_DIST) * 0.25})`;
          ctx.lineWidth = 0.5; ctx.stroke();
        }
      }
    };

    const makePulse = () => {
      const n = nodes[Math.floor(Math.random() * nodes.length)];
      const p = PALETTES[Math.floor(Math.random() * PALETTES.length)];
      pulses.push({ x: n.x, y: n.y, cr: p.r, cg: p.g, cb: p.b, r: 0, alpha: 0.85, alive: true });
    };

    const updatePulse = (p: Pulse) => {
      p.r += PULSE_SPEED;
      p.alpha -= 0.85 / (PULSE_MAX_R / PULSE_SPEED);
      if (p.r > PULSE_MAX_R || p.alpha <= 0) { p.alive = false; return; }
      nodes.forEach(n => {
        const d = Math.sqrt((n.x - p.x) ** 2 + (n.y - p.y) ** 2);
        if (Math.abs(d - p.r) < 18) { n.litDecay = 1; n.cr = p.cr; n.cg = p.cg; n.cb = p.cb; }
      });
    };

    const drawPulse = (p: Pulse) => {
      ctx.save();
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${p.cr},${p.cg},${p.cb},${Math.max(0, p.alpha)})`;
      ctx.lineWidth = 1.5; ctx.stroke();
      ctx.beginPath(); ctx.arc(p.x, p.y, Math.max(0, p.r - 3), 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${p.cr},${p.cg},${p.cb},${Math.max(0, p.alpha * 0.35)})`;
      ctx.lineWidth = 6; ctx.stroke();
      ctx.restore();
    };

    const loop = (t: number) => {
      ctx.clearRect(0, 0, W, H);
      if (t - lastPulseTime > PULSE_INTERVAL) { makePulse(); lastPulseTime = t; }
      pulses.forEach(p => updatePulse(p));
      pulses = pulses.filter(p => p.alive);
      nodes.forEach(n => updateNode(n));
      drawLinks();
      nodes.forEach(n => drawNode(n));
      pulses.forEach(p => drawPulse(p));
      rafId = requestAnimationFrame(loop);
    };

    const init = () => {
      resize();
      nodes = Array.from({ length: NODE_COUNT }, makeNode);
      rafId = requestAnimationFrame(loop);
    };

    const onResize = () => { resize(); nodes = Array.from({ length: NODE_COUNT }, makeNode); };
    window.addEventListener('resize', onResize);
    canvas.addEventListener('click', () => {
      const p = PALETTES[Math.floor(Math.random() * PALETTES.length)];
      const rect = canvas.getBoundingClientRect();
      const mx = (mouseRef.current?.x ?? W / 2) - rect.left;
      const my = (mouseRef.current?.y ?? H / 2) - rect.top;
      pulses.push({ x: mx, y: my, cr: p.r, cg: p.g, cb: p.b, r: 0, alpha: 0.85, alive: true });
    });

    init();
    return () => { cancelAnimationFrame(rafId); window.removeEventListener('resize', onResize); };
  }, [mouseRef]);

  return <canvas id="particle-canvas" ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }} />;
}
