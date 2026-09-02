import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, FileText } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { AnimatedThemeToggler } from '@/components/ui/animated-theme-toggler';

const LINKS = [
    { id: 'about',      label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects',   label: 'Projects' },
    { id: 'gallery',    label: 'Gallery' },
    { id: 'contact',    label: 'Contact' },
];

export default function Navbar() {
    const { isDark } = useTheme();
    const [active, setActive] = useState('');
    const [hidden, setHidden] = useState(false);
    const [open, setOpen] = useState(false);
    const lastY = useRef(0);

    // Hide on scroll down, reveal on scroll up
    useEffect(() => {
        const onScroll = () => {
            const y = window.scrollY;
            setHidden(y > 140 && y > lastY.current);
            lastY.current = y;
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Scroll-spy
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActive(entry.target.id);
                });
            },
            { rootMargin: '-40% 0px -55% 0px' }
        );
        LINKS.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, []);

    function goTo(e, id) {
        e.preventDefault();
        setOpen(false);
        const el = document.getElementById(id);
        if (!el) return;
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    }

    return (
        <motion.header
            initial={false}
            animate={{ y: hidden ? '-130%' : '0%' }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="no-print fixed inset-x-0 top-3 z-40 flex justify-center px-3"
        >
            <nav
                className="flex items-center gap-1 rounded-full border border-black/[0.06] bg-white/75 py-1.5 pl-2 pr-1.5 shadow-lg shadow-black/5 backdrop-blur-xl dark:border-white/10 dark:bg-[#141414]/75 dark:shadow-black/40"
                aria-label="Primary"
            >
                {/* Logo */}
                <a href="#home" onClick={(e) => goTo(e, 'home')} className="flex items-center gap-2 rounded-full px-1 py-0.5">
                    <img
                        src="/profile.png"
                        alt=""
                        className="w-7 h-7 rounded-full object-cover object-top ring-1 ring-black/10 dark:ring-white/15"
                    />
                    <span className="hidden md:block text-sm font-extrabold tracking-tight text-gray-900 dark:text-white">
                        akosigiyan
                    </span>
                </a>

                {/* Desktop links */}
                <div className="hidden sm:flex items-center gap-0.5 ml-1">
                    {LINKS.map((link) => (
                        <a
                            key={link.id}
                            href={`#${link.id}`}
                            onClick={(e) => goTo(e, link.id)}
                            aria-current={active === link.id ? 'true' : undefined}
                            className={`relative rounded-full px-3 py-1.5 text-[13px] font-bold transition-colors ${
                                active === link.id
                                    ? 'text-white dark:text-gray-900'
                                    : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
                            }`}
                        >
                            {active === link.id && (
                                <motion.span
                                    layoutId="nav-active-pill"
                                    className="absolute inset-0 rounded-full bg-gray-900 dark:bg-white"
                                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                                />
                            )}
                            <span className="relative z-10">{link.label}</span>
                        </a>
                    ))}
                </div>

                {/* Right controls */}
                <div className="flex items-center gap-1 ml-1 sm:ml-2">
                    <AnimatedThemeToggler
                        className="w-8 h-8 text-gray-500 hover:bg-black/5 dark:text-gray-400 dark:hover:bg-white/10 transition-colors"
                    />

                    <Link
                        to="/resume"
                        className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-gray-900 px-3.5 py-1.5 text-[13px] font-bold text-white transition-opacity hover:opacity-90 dark:bg-white dark:text-gray-900"
                    >
                        <FileText size={14} />
                        Resume
                    </Link>

                    <button
                        onClick={() => setOpen((o) => !o)}
                        aria-label="Toggle menu"
                        aria-expanded={open}
                        className="grid place-items-center w-8 h-8 rounded-full text-gray-500 hover:bg-black/5 dark:text-gray-400 dark:hover:bg-white/10 sm:hidden transition-colors"
                    >
                        {open ? <X size={18} /> : <Menu size={18} />}
                    </button>
                </div>
            </nav>

            {/* Mobile dropdown */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.98 }}
                        transition={{ duration: 0.18, ease: 'easeOut' }}
                        className="absolute top-full inset-x-3 mt-2 rounded-2xl border border-black/[0.06] bg-white/95 p-2 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-[#141414]/95 sm:hidden"
                    >
                        {LINKS.map((link) => (
                            <a
                                key={link.id}
                                href={`#${link.id}`}
                                onClick={(e) => goTo(e, link.id)}
                                className={`block rounded-xl px-3 py-2.5 text-sm font-bold transition-colors ${
                                    active === link.id
                                        ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
                                        : 'text-gray-700 dark:text-gray-300'
                                }`}
                            >
                                {link.label}
                            </a>
                        ))}
                        <Link
                            to="/resume"
                            onClick={() => setOpen(false)}
                            className="mt-1 flex items-center justify-center gap-1.5 rounded-xl bg-gray-900 px-3 py-2.5 text-sm font-bold text-white dark:bg-white dark:text-gray-900"
                        >
                            <FileText size={14} />
                            View Resume
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
