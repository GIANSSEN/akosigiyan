import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, X, Briefcase, Calendar, MapPin, Sparkles, FileText, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import ScrollReveal from '@/components/ui/ScrollReveal';

/* ── Rich Experience Details Data ────────────────────────────────── */
const DETAILED_EXPERIENCE = [
    {
        role: 'AI Engineer & Full-Stack Developer',
        company: 'Personal Portfolio Labs · Self-Directed',
        location: 'Metro Manila (Remote)',
        period: '2026 — Present',
        type: 'Production & AI Systems',
        description: 'Architected and engineered an intelligent personal portfolio with a stateful, context-aware chatbot assistant powered by the Gemini API. Leveraged React 19, Tailwind CSS v4, and Vite to deliver high-performance, responsive layouts with modern UI/UX paradigms.',
        bullets: [
            'Integrated Google Gemini API with contextual conversation memory, specialized persona prompting, and suggested prompt chips.',
            'Engineered GPU-composited sticky card scroll stack with custom hysteresis to eliminate scroll jitter and frame latency.',
            'Implemented sleek dark/light theme persistence, custom cursor tracking, and accessible responsive layouts.',
        ],
        tech: ['React 19', 'JavaScript', 'Tailwind CSS v4', 'Google Gemini API', 'Vite', 'Framer Motion'],
    },
    {
        role: 'Lead Full-Stack Developer',
        company: "CJ's Minimart POS System",
        location: 'Metro Manila, Philippines',
        period: '2025 (Aug — Dec)',
        type: 'Production Commercial System',
        description: 'Designed and implemented a comprehensive retail Point of Sale (POS) and inventory control system. Handled real-time stock levels, high-throughput bulk operations, automated low-stock alerts, and custom sales reporting using Laravel and MySQL.',
        bullets: [
            'Architected full-featured retail POS system that reduced manual inventory reconciliation time by approximately ~70%.',
            'Implemented real-time stock deductions, automated low-stock threshold triggers, and cashier shift reporting.',
            'Designed normalized relational database schemas in MySQL with indexed queries for low-latency inventory lookups.',
        ],
        tech: ['PHP', 'Laravel', 'MySQL', 'Blade', 'JavaScript', 'Bootstrap'],
    },
    {
        role: 'IoT Systems Developer',
        company: 'Anti-Theft Security System',
        location: 'Metro Manila, Philippines',
        period: '2024 (Feb — Jun)',
        type: 'Academic Capstone',
        description: 'Built a hardware-software integrated security system utilizing Arduino Uno microcontrollers and ultrasonic sensor arrays. Designed scalable mobile push notification concepts with React Native for instant intrusion alerts.',
        bullets: [
            'Programmed Arduino Uno microcontrollers in C++ with ultrasonic distance sensor arrays for continuous perimeter surveillance.',
            'Formulated low-latency threshold detection algorithms to minimize false alarms and trigger audible alarm sirens.',
            'Prototyped mobile alert notification architecture using React Native for instantaneous intrusion alerts.',
        ],
        tech: ['C++', 'Arduino Uno', 'Ultrasonic Sensors', 'React Native', 'Hardware Prototyping'],
    },
    {
        role: 'BS Information Technology Student',
        company: 'The Fisher Valley College',
        location: 'Taguig City, Metro Manila',
        period: '2023 — Present',
        type: 'Academic Degree',
        description: 'Pursuing a Bachelor of Science in Information Technology focusing on modern web frameworks, system architecture, database modeling, and software engineering methodologies.',
        bullets: [
            'Maintained strong academic standing in software engineering, database design, and algorithmic problem solving.',
            'Active contributor in collaborative software capstones, team presentations, and technical documentation.',
        ],
        tech: ['Algorithms', 'Database Design', 'Software Engineering', 'System Architecture'],
    },
    {
        role: 'First "Hello, World!" & Coding Foundations',
        company: 'Self-Taught Developer Journey',
        location: 'Philippines',
        period: '2022',
        type: 'Foundational Milestone',
        description: 'Executed my very first "Hello, World!" program, igniting a lifelong passion for software engineering. Dedicated myself to self-learning core programming fundamentals — turning curiosity into a structured problem-solving mindset.',
        bullets: [
            'Mastered foundational programming paradigms: data structures, control flow, functions, and semantic DOM scripting.',
            'Built structured daily self-learning habits, completing programming challenges and modern web development projects.',
        ],
        tech: ['JavaScript', 'HTML5', 'CSS3', 'Core Programming Logic'],
    },
];

export default function TimelineNew() {
    const reduceMotion = useReducedMotion();
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [selectedExpIndex, setSelectedExpIndex] = useState(null);

    // Escape key listener & body scroll lock
    useEffect(() => {
        if (!isDetailsOpen) return;
        const onKeyDown = (e) => {
            if (e.key === 'Escape') setIsDetailsOpen(false);
        };
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', onKeyDown);
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [isDetailsOpen]);

    const handleOpenDetails = (index = null) => {
        setSelectedExpIndex(index);
        setIsDetailsOpen(true);
    };

    return (
        <section id="experience" className="pt-6 sm:pt-8 pb-8 sm:pb-10 scroll-mt-20">
            <div className="max-w-[780px] mx-auto px-5 sm:px-8">

                <ScrollReveal>
                    <div className="flex items-baseline justify-between mb-7">
                        <div>
                            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400 block mb-1">
                                Career Journey
                            </span>
                            <h2 className="font-serif text-[26px] sm:text-[28px] font-normal text-gray-900 dark:text-white">
                                Experience
                            </h2>
                        </div>

                        {/* Interactive View Details link (triggers custom modal instead of direct GitHub redirect) */}
                        <button
                            type="button"
                            onClick={() => handleOpenDetails(null)}
                            className="inline-flex items-center gap-1 text-[12px] text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer no-underline focus-ring"
                            aria-label="View detailed work experience"
                        >
                            <span>View Details</span>
                            <ArrowUpRight size={12} />
                        </button>
                    </div>
                </ScrollReveal>

                {/* Main Timeline List with clickable interactive rows */}
                <div className="flex flex-col gap-0">
                    {DETAILED_EXPERIENCE.map((e, i) => (
                        <motion.div
                            key={i}
                            onClick={() => handleOpenDetails(i)}
                            className="group/row grid grid-cols-1 sm:grid-cols-[130px_1fr] gap-1 sm:gap-6 py-5 border-t border-gray-100 dark:border-white/[0.06] first:border-t-0 cursor-pointer transition-colors duration-200 hover:bg-gray-50/50 dark:hover:bg-white/[0.02] -mx-2 px-2 rounded-xl"
                            initial={reduceMotion ? {} : { opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-40px' }}
                            transition={{ duration: 0.45, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                            title="Click to view detailed responsibilities & tech stack"
                        >
                            <span className="text-[11.5px] font-medium text-gray-400 dark:text-gray-500 tabular-nums pt-[3px] leading-snug font-mono">
                                {e.period}
                            </span>

                            <div className="min-w-0">
                                <div className="flex items-center justify-between gap-2 mb-0.5">
                                    <h3 className="text-[14px] sm:text-[14.5px] font-bold text-cyan-600 dark:text-cyan-400 leading-snug group-hover/row:text-cyan-700 dark:group-hover/row:text-cyan-300 transition-colors">
                                        {e.role}
                                    </h3>
                                    <span className="opacity-0 group-hover/row:opacity-100 transition-opacity text-[11px] font-mono text-gray-400 dark:text-gray-500 flex items-center gap-0.5">
                                        <span>Details</span>
                                        <ArrowUpRight size={11} />
                                    </span>
                                </div>
                                <p className="text-[13px] font-medium text-gray-900 dark:text-white mb-0.5">
                                    {e.company}
                                </p>
                                <p className="text-[12px] text-gray-400 dark:text-gray-500">
                                    {e.location}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* ── Minimalist, Informative Experience Details Modal ── */}
            <AnimatePresence>
                {isDetailsOpen && (
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-label="Experience Details"
                        className="fixed inset-0 z-[75] flex items-center justify-center p-3.5 sm:p-6 bg-black/80 backdrop-blur-md"
                        onClick={() => setIsDetailsOpen(false)}
                    >
                        <motion.div
                            className="relative w-full max-w-[700px] max-h-[88vh] flex flex-col rounded-2xl sm:rounded-3xl border border-gray-200/90 dark:border-white/15 bg-white dark:bg-[#141414] shadow-2xl overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                            initial={{ opacity: 0, scale: 0.95, y: 12 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 12 }}
                            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                        >
                            {/* Modal Header */}
                            <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-gray-100 dark:border-white/[0.08] bg-gray-50/70 dark:bg-white/[0.02]">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-8 h-8 rounded-lg bg-cyan-500/10 dark:bg-cyan-400/10 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
                                        <Briefcase size={16} />
                                    </div>
                                    <div>
                                        <h3 className="text-base font-bold text-gray-900 dark:text-white leading-tight">
                                            Professional Experience &amp; Track Record
                                        </h3>
                                        <p className="text-[11.5px] text-gray-500 dark:text-gray-400">
                                            Detailed engineering milestones, responsibilities &amp; impact
                                        </p>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => setIsDetailsOpen(false)}
                                    className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
                                    aria-label="Close modal"
                                >
                                    <X size={17} />
                                </button>
                            </div>

                            {/* Modal Body: Scrollable Dossier */}
                            <div className="overflow-y-auto p-5 sm:p-6 space-y-6 divide-y divide-gray-100 dark:divide-white/[0.06]">
                                {DETAILED_EXPERIENCE.map((exp, idx) => {
                                    const isHighlighted = selectedExpIndex === idx;

                                    return (
                                        <div
                                            key={exp.role}
                                            className={`${idx > 0 ? 'pt-6' : ''} ${
                                                isHighlighted
                                                    ? 'p-3 rounded-xl bg-cyan-500/[0.03] border border-cyan-500/20'
                                                    : ''
                                            }`}
                                        >
                                            {/* Role & Company Header */}
                                            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1.5">
                                                <div>
                                                    <h4 className="text-[15px] sm:text-[15.5px] font-bold text-gray-900 dark:text-white leading-snug">
                                                        {exp.role}
                                                    </h4>
                                                    <p className="text-[13px] font-medium text-cyan-600 dark:text-cyan-400">
                                                        {exp.company}
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-2 font-mono text-[11px] text-gray-400 dark:text-gray-500 shrink-0">
                                                    <span className="flex items-center gap-1">
                                                        <Calendar size={11} />
                                                        {exp.period}
                                                    </span>
                                                    <span>·</span>
                                                    <span className="flex items-center gap-1">
                                                        <MapPin size={11} />
                                                        {exp.location}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Overview Paragraph */}
                                            <p className="text-[12px] sm:text-[12.5px] leading-relaxed text-gray-600 dark:text-gray-300 mt-2 mb-3">
                                                {exp.description}
                                            </p>

                                            {/* Key Achievements Bullet Points */}
                                            {exp.bullets && exp.bullets.length > 0 && (
                                                <div className="space-y-1.5 mb-3.5 pl-0.5">
                                                    {exp.bullets.map((b, bIdx) => (
                                                        <div key={bIdx} className="flex items-start gap-2 text-[12px] text-gray-600 dark:text-gray-300 leading-relaxed">
                                                            <CheckCircle2 size={13} className="text-emerald-500 mt-0.5 shrink-0" />
                                                            <span>{b}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                            {/* Tech Stack Chips */}
                                            <div className="flex flex-wrap items-center gap-1.5 pt-1">
                                                {exp.tech.map((t) => (
                                                    <span
                                                        key={t}
                                                        className="font-mono text-[10px] font-medium px-2 py-0.5 rounded-md bg-gray-100 dark:bg-white/[0.05] text-gray-600 dark:text-gray-400 border border-gray-200/70 dark:border-white/[0.06]"
                                                    >
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Modal Footer: Quick Link to Formal Printable Resume */}
                            <div className="px-5 sm:px-6 py-3 border-t border-gray-100 dark:border-white/[0.08] bg-gray-50/60 dark:bg-white/[0.02] flex items-center justify-between">
                                <Link
                                    to="/resume"
                                    className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors no-underline group/res"
                                >
                                    <FileText size={13} />
                                    <span>View &amp; Print Full Resume</span>
                                    <ArrowUpRight size={12} className="transition-transform group-hover/res:translate-x-0.5 group-hover/res:-translate-y-0.5" />
                                </Link>

                                <button
                                    type="button"
                                    onClick={() => setIsDetailsOpen(false)}
                                    className="text-xs font-semibold text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
                                >
                                    Close
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
