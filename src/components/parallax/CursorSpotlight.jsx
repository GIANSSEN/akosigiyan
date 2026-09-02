import { useEffect, useRef, useCallback } from 'react';
import { useTheme } from '@/context/ThemeContext';

export default function CursorSpotlight() {
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: -9999, y: -9999 });
    const targetRef = useRef({ x: -9999, y: -9999 });
    const rafRef = useRef(null);

    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const { width: w, height: h } = canvas;
        const m = mouseRef.current;
        const t = targetRef.current;

        m.x += (t.x - m.x) * 0.08;
        m.y += (t.y - m.y) * 0.08;

        ctx.clearRect(0, 0, w, h);

        if (m.x < -9000) {
            rafRef.current = requestAnimationFrame(draw);
            return;
        }

        const isDark = document.documentElement.classList.contains('dark');
        const r = 300;
        const gradient = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, r);
        gradient.addColorStop(0, isDark ? 'rgba(99,102,241,0.06)' : 'rgba(99,102,241,0.04)');
        gradient.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.fillStyle = gradient;
        ctx.fillRect(m.x - r, m.y - r, r * 2, r * 2);

        rafRef.current = requestAnimationFrame(draw);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        const onMove = (e) => {
            targetRef.current = { x: e.clientX, y: e.clientY };
        };
        window.addEventListener('pointermove', onMove, { passive: true });

        rafRef.current = requestAnimationFrame(draw);

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('pointermove', onMove);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [draw]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-[1]"
            aria-hidden
        />
    );
}
