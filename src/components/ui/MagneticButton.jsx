import { useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useReducedMotion } from 'framer-motion';

export default function MagneticButton({ children, className = '', href, ...props }) {
    const ref = useRef(null);
    const reduceMotion = useReducedMotion();
    const [hovered, setHovered] = useState(false);

    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const sx = useSpring(mx, { stiffness: 150, damping: 15, mass: 0.1 });
    const sy = useSpring(my, { stiffness: 150, damping: 15, mass: 0.1 });

    const handleMove = useCallback((e) => {
        if (reduceMotion) return;
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
        const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
        mx.set(x);
        my.set(y);
    }, [mx, my, reduceMotion]);

    const handleLeave = useCallback(() => {
        mx.set(0);
        my.set(0);
        setHovered(false);
    }, [mx, my]);

    const scale = useTransform(sx, [-20, 0, 20], [1.05, 1, 1.05]);

    const Tag = href ? 'a' : 'button';

    return (
        <motion.span
            ref={ref}
            style={{ x: sx, y: sy, scale }}
            onMouseMove={handleMove}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={handleLeave}
            className="inline-block"
        >
            <Tag
                href={href}
                className={className}
                {...(href ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                {...props}
            >
                {children}
            </Tag>
        </motion.span>
    );
}
