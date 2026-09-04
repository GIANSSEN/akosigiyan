import { useState, useEffect } from 'react';
import { ArrowUpRight, X, Layers, Cpu, Database, Cloud } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '@/components/ui/ScrollReveal';
import TechMarquee from '@/components/ui/TechMarquee';
import { allTech } from '@/data/portfolioData';

/* Themed categories for pro-dev modal view */
const TECH_GROUPS = [
    {
        title: 'Frontend Engineering',
        icon: Cpu,
        slugs: ['react', 'javascript', 'typescript', 'tailwindcss', 'vite', 'nextdotjs', 'vuedotjs', 'html5', 'css3'],
        description: 'Responsive, fluid user interfaces built with modern reactive architectures and design systems.',
    },
    {
        title: 'Backend & Databases',
        icon: Database,
        slugs: ['php', 'laravel', 'nodedotjs', 'python', 'rust', 'mysql', 'postgresql', 'sqlite', 'supabase'],
        description: 'Robust REST APIs, relational database schemas, and performant server-side business logic.',
    },
    {
        title: 'DevOps, Cloud & AI',
        icon: Cloud,
        slugs: ['git', 'github', 'githubactions', 'docker', 'amazonwebservices', 'linux', 'openai'],
        description: 'CI/CD automation, cloud deployments, containerization, and generative AI API integrations.',
    },
];

/* Split allTech into 3 themed rows for the marquee */
const rows = [
    TECH_GROUPS[0].slugs.map(s => allTech.find(t => t.slug === s)).filter(Boolean),
    TECH_GROUPS[1].slugs.map(s => allTech.find(t => t.slug === s)).filter(Boolean),
    TECH_GROUPS[2].slugs.map(s => allTech.find(t => t.slug === s)).filter(Boolean),
];

export default function SkillsGrid() {
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);

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

    return (
        <section id="skills" className="pt-4 sm:pt-6 pb-8 sm:pb-10 scroll-mt-20">
            <div className="max-w-[780px] mx-auto px-4 sm:px-8">

                <ScrollReveal>
                    <div className="mb-6 sm:mb-8">
                        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400 block mb-1">
                            Technical Stack
                        </span>
                        <div className="flex items-baseline justify-between">
                            <h2 className="font-serif text-[26px] sm:text-[32px] font-normal text-gray-900 dark:text-white tracking-tight">
                                Technologies
                            </h2>

                            {/* Minimalist View Details link leveled directly with Technologies */}
                            <button
                                type="button"
                                onClick={() => setIsDetailsOpen(true)}
                                className="inline-flex items-center gap-1 text-[12px] text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer no-underline focus-ring"
                                aria-label="View technology stack details"
                            >
                                <span>View Details</span>
                                <ArrowUpRight size={12} />
                            </button>
                        </div>
                    </div>
                </ScrollReveal>

                {/* Seamless Animated Marquee Showcase */}
                <ScrollReveal delay={0.05}>
                    <TechMarquee rows={rows} />
                </ScrollReveal>

            </div>

            {/* ── Minimalist Pro Developer Tech Stack Details Modal ── */}
            <AnimatePresence>
                {isDetailsOpen && (
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-label="Technology Stack Details"
                        className="fixed inset-0 z-[75] flex items-center justify-center p-3.5 sm:p-6 bg-black/80 backdrop-blur-md"
                        onClick={() => setIsDetailsOpen(false)}
                    >
                        <motion.div
                            className="relative w-full max-w-[680px] max-h-[88vh] flex flex-col rounded-2xl sm:rounded-3xl border border-gray-200/90 dark:border-white/15 bg-white dark:bg-[#141414] shadow-2xl overflow-hidden"
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
                                        <Layers size={16} />
                                    </div>
                                    <div>
                                        <h3 className="text-base font-bold text-gray-900 dark:text-white leading-tight">
                                            Technology Stack Breakdown
                                        </h3>
                                        <p className="text-[11.5px] text-gray-500 dark:text-gray-400">
                                            {allTech.length} production-grade frameworks, languages &amp; developer tools
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

                            {/* Modal Body: Organized by Category */}
                            <div className="overflow-y-auto p-5 sm:p-6 space-y-6 divide-y divide-gray-100 dark:divide-white/[0.06]">
                                {TECH_GROUPS.map((group, gIdx) => {
                                    const GroupIcon = group.icon;
                                    const groupTechs = group.slugs.map(s => allTech.find(t => t.slug === s)).filter(Boolean);

                                    return (
                                        <div key={group.title} className={gIdx > 0 ? 'pt-6' : ''}>
                                            <div className="flex items-center justify-between gap-2 mb-2">
                                                <div className="flex items-center gap-2">
                                                    <GroupIcon size={15} className="text-cyan-600 dark:text-cyan-400" />
                                                    <h4 className="text-[13.5px] font-bold text-gray-900 dark:text-white">
                                                        {group.title}
                                                    </h4>
                                                </div>
                                                <span className="font-mono text-[10.5px] text-gray-400 dark:text-gray-500">
                                                    {groupTechs.length} technologies
                                                </span>
                                            </div>

                                            <p className="text-[11.5px] text-gray-500 dark:text-gray-400 mb-3 leading-relaxed">
                                                {group.description}
                                            </p>

                                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                                {groupTechs.map((tech) => (
                                                    <div
                                                        key={tech.slug}
                                                        className="flex items-center gap-2 p-2 rounded-xl border border-gray-200/80 dark:border-white/[0.06] bg-gray-50/60 dark:bg-white/[0.02] hover:bg-gray-100/90 dark:hover:bg-white/[0.05] hover:border-gray-300 dark:hover:border-white/20 transition-all shadow-2xs group"
                                                    >
                                                        <img
                                                            src={`https://cdn.simpleicons.org/${tech.slug}`}
                                                            alt=""
                                                            className={`w-4 h-4 shrink-0 ${tech.invertDark ? 'dark:invert dark:brightness-150' : ''}`}
                                                            loading="lazy"
                                                            onError={(e) => { e.target.style.display = 'none'; }}
                                                        />
                                                        <span className="text-[12px] font-semibold text-gray-800 dark:text-gray-200 truncate group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                                                            {tech.name}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Footer */}
                            <div className="px-5 sm:px-6 py-3 border-t border-gray-100 dark:border-white/[0.08] bg-gray-50/60 dark:bg-white/[0.02] flex items-center justify-between text-[11px] font-mono text-gray-400 dark:text-gray-500">
                                <span>Modern Full-Stack · AI-Integrated</span>
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
