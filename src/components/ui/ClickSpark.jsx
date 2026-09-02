import { useEffect, useRef } from 'react';

/**
 * ClickSpark (ReactBits-style) — fires a radial spark burst from every click.
 * Theme-aware color, Web Animations API driven, zero re-renders.
 */
export default function ClickSpark({
    sparkColor,
    sparkSize = 12,
    sparkCount = 8,
    duration = 450,
    children,
}) {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        function createSparks(e) {
            // ── Skip sparks on the theme toggle button to avoid lag
            //    during the View Transition animation ────────────────
            if (e.target.closest('[data-no-spark]')) return;

            const color =
                sparkColor ??
                (document.documentElement.classList.contains('dark') ? '#a78bfa' : '#6366f1');

            for (let i = 0; i < sparkCount; i++) {
                const angle = (360 / sparkCount) * i + Math.random() * 12;
                const spark = document.createElement('span');
                spark.style.cssText = [
                    `position: fixed`,
                    `left: ${e.clientX}px`,
                    `top: ${e.clientY}px`,
                    `width: 2px`,
                    `height: ${sparkSize}px`,
                    `background: ${color}`,
                    `border-radius: 2px`,
                    `pointer-events: none`,
                    `z-index: 65`,
                ].join(';');
                container.appendChild(spark);

                const animation = spark.animate(
                    [
                        {
                            transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(0)`,
                            opacity: 1,
                        },
                        {
                            transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${sparkSize * 2.4}px)`,
                            opacity: 0,
                        },
                    ],
                    { duration, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' }
                );
                animation.finished.then(() => spark.remove()).catch(() => spark.remove());
            }
        }

        window.addEventListener('click', createSparks);
        return () => window.removeEventListener('click', createSparks);
    }, [sparkColor, sparkSize, sparkCount, duration]);

    return (
        <>
            {children}
            <div ref={containerRef} aria-hidden="true" className="pointer-events-none" />
        </>
    );
}
