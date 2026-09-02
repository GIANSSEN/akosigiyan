import { useEffect, useState, useCallback } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Sun, Moon, Menu, X, Github, Linkedin, Mail } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

/* 3 menu items as requested */
const links = [
    { label: 'Projects',    href: '#projects' },
    { label: 'Experience',  href: '#experience' },
    { label: 'Contact',     href: '#contact' },
];

export default function Navbar() {
    const { isDark, toggleTheme } = useTheme();
    const [mobileOpen, setMobileOpen]       = useState(false);
    const [activeSection, setActiveSection] = useState('');
    const [scrolled, setScrolled]           = useState(false);
    const reduceMotion = useReducedMotion();

    /* ── Lock body scroll when mobile menu open ── */
    useEffect(() => {
        document.body.style.overflow = mobileOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [mobileOpen]);

    /* ── Shrink/elevate navbar on scroll ── */
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    /* ── Intersection Observer — active section tracking ── */
    useEffect(() => {
        const sections = document.querySelectorAll('section[id]');
        if (!sections.length) return;
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActiveSection(entry.target.id);
                });
            },
            { rootMargin: '-20% 0px -65% 0px', threshold: 0 }
        );
        sections.forEach((s) => observer.observe(s));
        return () => sections.forEach((s) => observer.unobserve(s));
    }, []);

    const handleClick = useCallback((e, href) => {
        e.preventDefault();
        setMobileOpen(false);
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, []);

    /* ── Escape key closes mobile menu ── */
    useEffect(() => {
        const onKey = (e) => { if (e.key === 'Escape' && mobileOpen) setMobileOpen(false); };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [mobileOpen]);

    return (
        <>
            <header
                className={`fixed top-0 inset-x-0 z-50 transition-all duration-300
                    ${scrolled
                        ? 'bg-white/95 dark:bg-[#0a0a0a]/95 shadow-xs border-b border-gray-200/50 dark:border-white/[0.06]'
                        : 'bg-white/80 dark:bg-[#0a0a0a]/80 border-b border-gray-200/40 dark:border-white/[0.04]'
                    } backdrop-blur-md`}
            >
                <nav className="max-w-[820px] mx-auto px-5 sm:px-8 h-14 flex items-center justify-between">

                    {/* ── GGJ Monogram Logo ── */}
                    <a
                        href="#top"
                        onClick={e => handleClick(e, '#top')}
                        className="flex items-center no-underline outline-none focus:outline-none hover:opacity-80 active:scale-95 transition-all duration-200 shrink-0"
                        aria-label="Gianssen Jasolin - Go to top"
                    >
                        <img
                            src="/logo-ggj.png"
                            alt="GGJ"
                            style={{ height: '20px', maxHeight: '20px', width: 'auto', display: 'block' }}
                            className="h-5 max-h-5 w-auto object-contain select-none dark:invert transition-all duration-200"
                            draggable="false"
                        />
                    </a>

                    {/* ── Desktop nav ── */}
                    <div className="hidden sm:flex items-center gap-1">
                        {links.map((l) => {
                            const isCurrent = activeSection === l.href.slice(1);
                            return (
                                <a
                                    key={l.href}
                                    href={l.href}
                                    onClick={e => handleClick(e, l.href)}
                                    className={`px-3.5 py-1.5 text-[13.5px] no-underline outline-none focus:outline-none transition-all duration-150 ${
                                        isCurrent
                                            ? 'text-gray-900 dark:text-white font-bold'
                                            : 'text-gray-500 dark:text-gray-400 font-medium hover:text-gray-900 dark:hover:text-white hover:font-bold'
                                    }`}
                                    aria-current={isCurrent ? 'true' : undefined}
                                >
                                    {l.label}
                                </a>
                            );
                        })}

                        {/* Divider */}
                        <span className="w-px h-4 bg-gray-200 dark:bg-white/10 mx-2 shrink-0" />

                        {/* ── Theme toggle — Clean Icon Only ── */}
                        <button
                            onClick={toggleTheme}
                            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                            aria-pressed={isDark}
                            className="flex items-center justify-center p-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 outline-none focus:outline-none active:scale-90 cursor-pointer"
                        >
                            <AnimatePresence mode="wait" initial={false}>
                                <motion.span
                                    key={isDark ? 'sun' : 'moon'}
                                    initial={reduceMotion ? {} : { opacity: 0, rotate: -60, scale: 0.6 }}
                                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                                    exit={reduceMotion ? {} : { opacity: 0, rotate: 60, scale: 0.6 }}
                                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                                    className="flex items-center justify-center"
                                >
                                    {isDark ? <Sun size={17} strokeWidth={2} /> : <Moon size={17} strokeWidth={2} />}
                                </motion.span>
                            </AnimatePresence>
                        </button>
                    </div>

                    {/* ── Mobile controls ── */}
                    <div className="flex sm:hidden items-center gap-1.5">
                        {/* Mobile Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                            aria-pressed={isDark}
                            className="flex items-center justify-center p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 outline-none focus:outline-none active:scale-90"
                        >
                            <AnimatePresence mode="wait" initial={false}>
                                <motion.span
                                    key={isDark ? 'sun-m' : 'moon-m'}
                                    initial={reduceMotion ? {} : { opacity: 0, rotate: -60, scale: 0.6 }}
                                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                                    exit={reduceMotion ? {} : { opacity: 0, rotate: 60, scale: 0.6 }}
                                    transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                                    className="flex items-center justify-center"
                                >
                                    {isDark ? <Sun size={18} strokeWidth={2} /> : <Moon size={18} strokeWidth={2} />}
                                </motion.span>
                            </AnimatePresence>
                        </button>

                        {/* Hamburger */}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            aria-label="Toggle menu"
                            aria-expanded={mobileOpen}
                            className="flex items-center justify-center p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 outline-none focus:outline-none active:scale-90"
                        >
                            <AnimatePresence mode="wait" initial={false}>
                                <motion.span
                                    key={mobileOpen ? 'x' : 'menu'}
                                    initial={reduceMotion ? {} : { opacity: 0, rotate: -90 }}
                                    animate={{ opacity: 1, rotate: 0 }}
                                    exit={reduceMotion ? {} : { opacity: 0, rotate: 90 }}
                                    transition={{ duration: 0.16 }}
                                    className="flex items-center justify-center"
                                >
                                    {mobileOpen ? <X size={19} strokeWidth={2} /> : <Menu size={19} strokeWidth={2} />}
                                </motion.span>
                            </AnimatePresence>
                        </button>
                    </div>
                </nav>
            </header>

            {/* ── Mobile menu overlay ── */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        className="fixed inset-0 z-40 sm:hidden flex flex-col justify-between"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {/* Backdrop */}
                        <div
                            className="absolute inset-0 bg-white/98 dark:bg-[#0a0a0a]/98 backdrop-blur-2xl"
                            onClick={() => setMobileOpen(false)}
                        />

                        {/* Menu Navigation items */}
                        <motion.nav
                            className="relative flex flex-col pt-24 px-7 gap-3 z-10"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                            role="navigation"
                            aria-label="Mobile navigation"
                        >
                            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-2">
                                Navigation
                            </span>

                            {links.map((l, i) => {
                                const isCurrent = activeSection === l.href.slice(1);
                                return (
                                    <motion.a
                                        key={l.href}
                                        href={l.href}
                                        onClick={e => handleClick(e, l.href)}
                                        className={`flex items-baseline justify-between py-3 border-b border-gray-100 dark:border-white/[0.06] no-underline outline-none focus:outline-none transition-all duration-150 ${
                                            isCurrent
                                                ? 'text-indigo-600 dark:text-indigo-400 font-bold'
                                                : 'text-gray-800 dark:text-gray-100 font-medium hover:text-indigo-600 dark:hover:text-indigo-400'
                                        }`}
                                        initial={{ opacity: 0, x: -12 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                                    >
                                        <span className="text-[22px] tracking-tight">{l.label}</span>
                                        <span className="text-[11px] font-mono text-gray-400 dark:text-gray-500">
                                            0{i + 1}
                                        </span>
                                    </motion.a>
                                );
                            })}
                        </motion.nav>

                        {/* Mobile Footer / Social Quick Links */}
                        <motion.div
                            className="relative px-7 pb-8 z-10 flex flex-col gap-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ delay: 0.15, duration: 0.2 }}
                        >
                            <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-white/[0.06]">
                                <span className="text-[12px] text-gray-500 dark:text-gray-400 font-medium">
                                    Gianssen Jasolin
                                </span>
                                <div className="flex items-center gap-4">
                                    <a
                                        href="https://github.com/Gianssen"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                                        aria-label="GitHub"
                                    >
                                        <Github size={18} />
                                    </a>
                                    <a
                                        href="https://www.linkedin.com/in/gianssen-jasolin/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                                        aria-label="LinkedIn"
                                    >
                                        <Linkedin size={18} />
                                    </a>
                                    <a
                                        href="mailto:gjasolin@gmail.com"
                                        className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                                        aria-label="Email"
                                    >
                                        <Mail size={18} />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
