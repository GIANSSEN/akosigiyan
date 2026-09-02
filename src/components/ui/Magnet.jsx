import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * Magnet (ReactBits-style) — child is gently pulled toward the cursor while hovered.
 * Disabled automatically on touch devices.
 */
export default function Magnet({
    children,
    strength = 0.35,
    className = '',
}) {
    const ref = useRef(null);
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [enabled, setEnabled] = useState(false);

    useEffect(() => {
        setEnabled(!window.matchMedia('(pointer: coarse)').matches);
    }, []);

    function handleMouseMove(e) {
        if (!enabled || !ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const x = e.clientX - (rect.left + rect.width / 2);
        const y = e.clientY - (rect.top + rect.height / 2);
        setPos({ x: x * strength, y: y * strength });
    }

    function handleMouseLeave() {
        setPos({ x: 0, y: 0 });
    }

    return (
        <motion.div
            ref={ref}
            className={`inline-block ${className}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ x: pos.x, y: pos.y }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, mass: 0.4 }}
        >
            {children}
        </motion.div>
    );
}
