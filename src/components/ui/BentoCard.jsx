import { useRef } from 'react';

/**
 * BentoCard — reusable card wrapper with spotlight hover effect.
 * Replaces the .bento-card CSS class pattern from the Blade components.
 *
 * @param {string}    className   — extra Tailwind classes
 * @param {ReactNode} children
 * @param {object}    rest        — forwarded to the div
 */
export default function BentoCard({ className = '', children, ...rest }) {
    const cardRef = useRef(null);

    function handleMouseMove(e) {
        const card = cardRef.current;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
    }

    function handleMouseLeave() {
        const card = cardRef.current;
        if (!card) return;
        card.style.setProperty('--mouse-x', '-9999px');
        card.style.setProperty('--mouse-y', '-9999px');
    }

    return (
        <div
            ref={cardRef}
            className={`bento-card h-full ${className}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            {...rest}
        >
            {children}
        </div>
    );
}
