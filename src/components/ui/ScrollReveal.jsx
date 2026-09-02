import { motion } from 'framer-motion';

/**
 * ScrollReveal — Framer Motion scroll-triggered entrance wrapper.
 * Replaces the IntersectionObserver + CSS .reveal class approach from app.js.
 *
 * @param {ReactNode} children
 * @param {number}    delay       — animation delay in seconds (default 0)
 * @param {'up'|'left'|'right'|'scale'} direction — entrance direction
 * @param {string}    className   — extra Tailwind classes on the wrapper
 */
const variants = {
    hidden: {
        up:    { opacity: 0, y: 28 },
        left:  { opacity: 0, x: -24 },
        right: { opacity: 0, x: 24 },
        scale: { opacity: 0, scale: 0.95 },
    },
    visible: { opacity: 1, y: 0, x: 0, scale: 1 },
};

export default function ScrollReveal({
    children,
    delay = 0,
    direction = 'up',
    className = '',
    ...rest
}) {
    return (
        <motion.div
            className={className}
            initial={variants.hidden[direction]}
            whileInView={variants.visible}
            viewport={{ once: true, margin: '0px 0px -40px 0px' }}
            transition={{
                duration: 0.65,
                delay,
                ease: [0.22, 1, 0.36, 1],
            }}
            {...rest}
        >
            {children}
        </motion.div>
    );
}
