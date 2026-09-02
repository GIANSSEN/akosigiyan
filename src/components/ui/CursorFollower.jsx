import { useEffect, useRef } from 'react';

/**
 * CursorFollower — an ambient trailing glow ring around the cursor.
 * The system cursor is ALWAYS visible and active at all times.
 * This follower provides a modern, interactive aura that smoothly expands
 * on interactive elements and responds to click interactions.
 */
export default function CursorFollower() {
    const ringRef = useRef(null);

    useEffect(() => {
        // Only run on devices with fine pointer (mouse/trackpad)
        if (!window.matchMedia('(pointer: fine)').matches) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const ring = ringRef.current;
        if (!ring) return;

        let mouseX = -100;
        let mouseY = -100;
        let ringX = -100;
        let ringY = -100;
        let isInitialized = false;
        let isVisible = false;
        let rafId;

        const onMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            if (!isInitialized) {
                ringX = mouseX;
                ringY = mouseY;
                isInitialized = true;
            }

            if (!isVisible) {
                isVisible = true;
                ring.style.opacity = '1';
            }
        };

        const onMouseEnterWindow = () => {
            isVisible = true;
            ring.style.opacity = '1';
        };

        const onMouseLeaveWindow = () => {
            isVisible = false;
            ring.style.opacity = '0';
        };

        const onMouseOver = (e) => {
            if (e.target.closest('a, button, [role="button"], input, textarea, select, [tabindex], .cursor-pointer')) {
                ring.classList.add('cursor-ring--hover');
            }
        };

        const onMouseOut = (e) => {
            if (e.target.closest('a, button, [role="button"], input, textarea, select, [tabindex], .cursor-pointer')) {
                ring.classList.remove('cursor-ring--hover');
            }
        };

        const onMouseDown = () => ring.classList.add('cursor-ring--click');
        const onMouseUp = () => ring.classList.remove('cursor-ring--click');

        // Lerp loop for spring lag
        const lerp = (a, b, n) => (1 - n) * a + n * b;
        const tick = () => {
            ringX = lerp(ringX, mouseX, 0.16);
            ringY = lerp(ringY, mouseY, 0.16);

            ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
            rafId = requestAnimationFrame(tick);
        };
        rafId = requestAnimationFrame(tick);

        window.addEventListener('mousemove', onMouseMove, { passive: true });
        document.documentElement.addEventListener('mouseenter', onMouseEnterWindow);
        document.documentElement.addEventListener('mouseleave', onMouseLeaveWindow);
        document.addEventListener('mouseover', onMouseOver);
        document.addEventListener('mouseout', onMouseOut);
        document.addEventListener('mousedown', onMouseDown);
        document.addEventListener('mouseup', onMouseUp);

        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener('mousemove', onMouseMove);
            document.documentElement.removeEventListener('mouseenter', onMouseEnterWindow);
            document.documentElement.removeEventListener('mouseleave', onMouseLeaveWindow);
            document.removeEventListener('mouseover', onMouseOver);
            document.removeEventListener('mouseout', onMouseOut);
            document.removeEventListener('mousedown', onMouseDown);
            document.removeEventListener('mouseup', onMouseUp);
        };
    }, []);

    return (
        <div
            ref={ringRef}
            className="cursor-ring"
            aria-hidden="true"
            style={{
                pointerEvents: 'none',
                opacity: 0,
                transition: 'opacity 0.25s ease, width 0.25s ease, height 0.25s ease, background 0.25s ease, border-color 0.25s ease',
            }}
        />
    );
}
