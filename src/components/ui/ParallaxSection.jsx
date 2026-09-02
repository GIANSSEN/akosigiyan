import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

export default function ParallaxSection({
    children,
    className = '',
    offset = 50,
    speed = 0.5,
    once = true,
}) {
    const ref = useRef(null);
    const reduceMotion = useReducedMotion();

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    });

    const y = useTransform(
        scrollYProgress,
        [0, 1],
        [offset * speed, -offset * speed]
    );

    if (reduceMotion) {
        return <div className={className}>{children}</div>;
    }

    return (
        <div ref={ref} className={className}>
            <motion.div style={{ y }}>
                {children}
            </motion.div>
        </div>
    );
}
