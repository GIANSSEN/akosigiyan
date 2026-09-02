import { useRef } from 'react';

const MAX_TILT = 8;
const SCALE = 1.015;

/**
 * TiltCard — 3D perspective tilt on mouse move.
 * Replaces initTiltEffect() from app.js.
 *
 * @param {ReactNode} children
 * @param {string}    className — extra Tailwind classes
 */
export default function TiltCard({ children, className = '' }) {
    const cardRef = useRef(null);
    const rafRef  = useRef(null);

    // Skip on touch devices
    const isTouch = () => window.matchMedia('(pointer: coarse)').matches;

    function handleMouseMove(e) {
        if (isTouch()) return;
        if (rafRef.current) return;
        rafRef.current = requestAnimationFrame(() => {
            rafRef.current = null;
            const card = cardRef.current;
            if (!card) return;
            const rect = card.getBoundingClientRect();
            const cx = rect.left + rect.width  / 2;
            const cy = rect.top  + rect.height / 2;
            const rotY = ((e.clientX - cx) / (rect.width  / 2)) * MAX_TILT;
            const rotX = -((e.clientY - cy) / (rect.height / 2)) * MAX_TILT;
            card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(${SCALE})`;
        });
    }

    function handleMouseLeave() {
        if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
        const card = cardRef.current;
        if (card) card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
    }

    function handleTouchStart() {
        const card = cardRef.current;
        if (card) card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
    }

    return (
        <div
            ref={cardRef}
            className={`tilt-card h-full ${className}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
        >
            {children}
        </div>
    );
}
