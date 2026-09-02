import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export default function ScrollTopButton() {
    const [visible, setVisible]     = useState(false);
    const [progress, setProgress]   = useState(0);
    const reduceMotion = useReducedMotion();

    useEffect(() => {
        const onScroll = () => {
            const scrolled = window.scrollY;
            setVisible(scrolled > 600);

            const el  = document.documentElement;
            const pct = scrolled / (el.scrollHeight - el.clientHeight) * 100;
            setProgress(Math.min(100, pct));
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const circumference = 2 * Math.PI * 14; // r=14

    return (
        <AnimatePresence>
            {visible && (
                <motion.button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    aria-label="Scroll to top"
                    className="fixed right-4 bottom-20 sm:right-5 sm:bottom-24 z-40 w-11 h-11 flex items-center justify-center rounded-full border border-gray-200 dark:border-white/10 bg-white/90 dark:bg-[#141414]/90 backdrop-blur-md text-gray-500 dark:text-gray-400 shadow-sm hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-200 dark:hover:border-indigo-500/30 transition-colors duration-200 focus-ring no-print"
                    initial={reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.7, y: 10 }}
                    animate={reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
                    exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.7, y: 10 }}
                    whileHover={reduceMotion ? {} : { scale: 1.08 }}
                    whileTap={reduceMotion ? {} : { scale: 0.93 }}
                    transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                >
                    {/* Circular progress ring */}
                    {!reduceMotion && (
                        <svg
                            className="absolute inset-0 -rotate-90"
                            width="44" height="44"
                            viewBox="0 0 44 44"
                            aria-hidden="true"
                        >
                            <circle
                                cx="22" cy="22" r="14"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeOpacity="0.1"
                            />
                            <circle
                                cx="22" cy="22" r="14"
                                fill="none"
                                stroke="#6366f1"
                                strokeWidth="2"
                                strokeDasharray={circumference}
                                strokeDashoffset={circumference - (progress / 100) * circumference}
                                strokeLinecap="round"
                                style={{ transition: 'stroke-dashoffset 0.15s ease' }}
                            />
                        </svg>
                    )}
                    <ArrowUp size={14} className="relative z-10" />
                </motion.button>
            )}
        </AnimatePresence>
    );
}
