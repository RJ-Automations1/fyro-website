/*
 * AGENT NETWORK — the hero background.
 *
 * Hexagon "agents" (the logo's shape) drift slowly; nearby agents are linked
 * like the logo's circuit traces. Orange task pulses travel along a link, and
 * when one arrives the receiving agent lights up and hands the task on to a
 * neighbour — a picture of autonomous agents passing work between themselves.
 *
 * Canvas, not DOM: ~60 nodes and their links redraw every frame. Pauses when
 * off screen or the tab is hidden, follows the cursor lightly, and renders a
 * single still frame for prefers-reduced-motion.
 */
import { useEffect, useRef } from "react";

type Node = { x: number; y: number; vx: number; vy: number; r: number; hex: boolean; glow: number; phase: number };
type Pulse = { from: number; to: number; t: number; speed: number; hops: number };

const ORANGE = "248,121,4";
const LINK_DIST = 170;

function hexPath(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 3) * i + Math.PI / 6;
    const px = x + r * Math.cos(a);
    const py = y + r * Math.sin(a);
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
}

export default function AgentNetwork({ className, style }: { className?: string; style?: React.CSSProperties }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let nodes: Node[] = [];
    let pulses: Pulse[] = [];
    let raf = 0;
    let visible = true;
    let last = performance.now();
    let spawnClock = 0;
    const mouse = { x: -9999, y: -9999 };

    const seed = () => {
      const count = Math.min(70, Math.max(22, Math.round((w * h) / 20000)));
      nodes = Array.from({ length: count }, () => {
        const hex = Math.random() < 0.38;
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.14,
          vy: (Math.random() - 0.5) * 0.14,
          r: hex ? 5 + Math.random() * 5 : 1.2 + Math.random() * 1.4,
          hex,
          glow: 0,
          phase: Math.random() * Math.PI * 2,
        };
      });
      pulses = [];
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const neighbours = (i: number) => {
      const a = nodes[i];
      const out: number[] = [];
      for (let j = 0; j < nodes.length; j++) {
        if (j === i) continue;
        const b = nodes[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        if (dx * dx + dy * dy < LINK_DIST * LINK_DIST) out.push(j);
      }
      return out;
    };

    const spawn = (from?: number, hops = 0) => {
      let src = from ?? -1;
      if (src < 0) {
        const agents = nodes.map((n, i) => (n.hex ? i : -1)).filter((i) => i >= 0);
        src = agents.length ? agents[Math.floor(Math.random() * agents.length)] : Math.floor(Math.random() * nodes.length);
      }
      const ns = neighbours(src);
      if (!ns.length) return;
      const to = ns[Math.floor(Math.random() * ns.length)];
      pulses.push({ from: src, to, t: 0, speed: 0.0009 + Math.random() * 0.0008, hops });
      nodes[src].glow = Math.max(nodes[src].glow, 0.6);
    };

    const draw = (dt: number) => {
      ctx.clearRect(0, 0, w, h);

      // Move
      for (const n of nodes) {
        n.x += n.vx * dt * 0.06;
        n.y += n.vy * dt * 0.06;
        if (n.x < -20) n.x = w + 20;
        if (n.x > w + 20) n.x = -20;
        if (n.y < -20) n.y = h + 20;
        if (n.y > h + 20) n.y = -20;
        n.glow = Math.max(0, n.glow - dt * 0.0012);
        n.phase += dt * 0.0015;
      }

      // Links
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > LINK_DIST * LINK_DIST) continue;
          const alpha = (1 - Math.sqrt(d2) / LINK_DIST) * 0.16;
          ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
        // Cursor link
        const mdx = a.x - mouse.x;
        const mdy = a.y - mouse.y;
        const md2 = mdx * mdx + mdy * mdy;
        if (md2 < 200 * 200) {
          const alpha = (1 - Math.sqrt(md2) / 200) * 0.35;
          ctx.strokeStyle = `rgba(${ORANGE},${alpha})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }

      // Pulses
      pulses = pulses.filter((p) => {
        p.t += p.speed * dt;
        const a = nodes[p.from];
        const b = nodes[p.to];
        if (!a || !b) return false;
        if (p.t >= 1) {
          b.glow = 1;
          if (p.hops < 5 && Math.random() < 0.8) spawn(p.to, p.hops + 1);
          return false;
        }
        const x = a.x + (b.x - a.x) * p.t;
        const y = a.y + (b.y - a.y) * p.t;
        // trail
        const tx = a.x + (b.x - a.x) * Math.max(0, p.t - 0.18);
        const ty = a.y + (b.y - a.y) * Math.max(0, p.t - 0.18);
        const grad = ctx.createLinearGradient(tx, ty, x, y);
        grad.addColorStop(0, `rgba(${ORANGE},0)`);
        grad.addColorStop(1, `rgba(${ORANGE},0.85)`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.lineWidth = 1;
        ctx.fillStyle = `rgba(${ORANGE},1)`;
        ctx.shadowColor = `rgba(${ORANGE},0.9)`;
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(x, y, 2.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        return true;
      });

      // Nodes
      for (const n of nodes) {
        if (n.hex) {
          const breathe = 0.5 + 0.5 * Math.sin(n.phase);
          if (n.glow > 0) {
            ctx.fillStyle = `rgba(${ORANGE},${0.18 * n.glow})`;
            hexPath(ctx, n.x, n.y, n.r + 7 * n.glow);
            ctx.fill();
          }
          ctx.strokeStyle = n.glow > 0.05 ? `rgba(${ORANGE},${0.5 + 0.5 * n.glow})` : `rgba(255,255,255,${0.22 + 0.12 * breathe})`;
          ctx.lineWidth = 1.3;
          hexPath(ctx, n.x, n.y, n.r);
          ctx.stroke();
          ctx.fillStyle = n.glow > 0.05 ? `rgba(${ORANGE},${0.9 * n.glow})` : "rgba(255,255,255,0.35)";
          ctx.beginPath();
          ctx.arc(n.x, n.y, 1.4, 0, Math.PI * 2);
          ctx.fill();
          ctx.lineWidth = 1;
        } else {
          ctx.fillStyle = n.glow > 0.05 ? `rgba(${ORANGE},${0.4 + 0.6 * n.glow})` : "rgba(255,255,255,0.28)";
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const loop = (now: number) => {
      const dt = Math.min(48, now - last);
      last = now;
      if (visible && !document.hidden) {
        spawnClock += dt;
        if (spawnClock > 900 && pulses.length < 14) {
          spawnClock = 0;
          spawn();
        }
        draw(dt);
      }
      raf = requestAnimationFrame(loop);
    };

    resize();
    if (reduced) {
      draw(16);
    } else {
      for (let i = 0; i < 4; i++) spawn();
      raf = requestAnimationFrame(loop);
    }

    const ro = new ResizeObserver(() => {
      resize();
      if (reduced) draw(16);
    });
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);

    const parent = canvas.parentElement;
    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    parent?.addEventListener("pointermove", onMove);
    parent?.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      parent?.removeEventListener("pointermove", onMove);
      parent?.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block", ...style }}
    />
  );
}
