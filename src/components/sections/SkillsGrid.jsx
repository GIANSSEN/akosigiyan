import { useState, useMemo } from 'react';
import { ArrowRight, LayoutGrid, Search, X, Layers, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '@/components/ui/ScrollReveal';
import TechMarquee from '@/components/ui/TechMarquee';
import { allTech } from '@/data/portfolioData';

/* Categorization map for interactive filtering */
const CATEGORIES = ['All', 'Frontend', 'Backend & DB', 'DevOps & AI'];

const TECH_CATEGORIES = {
    Frontend: ['react', 'javascript', 'typescript', 'tailwindcss', 'vite', 'nextdotjs', 'vuedotjs', 'html5', 'css3'],
    'Backend & DB': ['php', 'laravel', 'nodedotjs', 'python', 'rust', 'mysql', 'postgresql', 'sqlite', 'supabase'],
    'DevOps & AI': ['git', 'github', 'githubactions', 'docker', 'amazonwebservices', 'linux', 'openai'],
};

/* Split allTech into 3 themed rows for the marquee */
const ROW_SLUGS = [
    TECH_CATEGORIES.Frontend,
    TECH_CATEGORIES['Backend & DB'],
    TECH_CATEGORIES['DevOps & AI'],
];

function buildRow(slugs) {
    return slugs
        .map(slug => allTech.find(t => t.slug === slug))
        .filter(Boolean);
}

const rows = [
    buildRow(ROW_SLUGS[0]),
    buildRow(ROW_SLUGS[1]),
    buildRow(ROW_SLUGS[2]),
];

export default function SkillsGrid() {
    const [isExploreOpen, setIsExploreOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredTech = useMemo(() => {
        return allTech.filter(tech => {
            const matchesSearch = tech.name.toLowerCase().includes(searchQuery.toLowerCase());
            if (!matchesSearch) return false;
            if (selectedCategory === 'All') return true;
            return TECH_CATEGORIES[selectedCategory]?.includes(tech.slug);
        });
    }, [searchQuery, selectedCategory]);

    return (
        <section id="skills" className="py-12 sm:py-16 scroll-mt-20">
            <div className="max-w-[780px] mx-auto px-4 sm:px-8">

                <ScrollReveal>
                    <div className="flex items-baseline justify-between mb-6 sm:mb-8">
                        <div>
                            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400 block mb-1">
                                Technical Stack
                            </span>
                            <h2 className="font-serif text-[26px] sm:text-[32px] font-normal text-gray-900 dark:text-white tracking-tight">
                                Technologies
                            </h2>
                        </div>

                        {/* Interactive Explore Button */}
                        <button
                            onClick={() => setIsExploreOpen(true)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50/80 dark:bg-white/[0.03] text-[11.5px] sm:text-[12px] font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 hover:border-gray-300 dark:hover:border-white/20 transition-all cursor-pointer shadow-2xs group"
                            aria-label="Explore all technologies"
                        >
                            <LayoutGrid size={13} className="text-gray-400 group-hover:text-cyan-500 transition-colors" />
                            <span>Explore ({allTech.length})</span>
                            <ArrowRight size={11} className="text-gray-400 group-hover:translate-x-0.5 transition-transform" />
                        </button>
                    </div>
                </ScrollReveal>

                {/* Seamless Animated Marquee Showcase */}
                <ScrollReveal delay={0.05}>
                    <TechMarquee rows={rows} />
                </ScrollReveal>

            </div>

            {/* ── Interactive Technology Explorer Modal ── */}
            <AnimatePresence>
                {isExploreOpen && (
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-label="Explore Technologies"
                        className="fixed inset-0 z-[75] flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md"
                        onClick={() => setIsExploreOpen(false)}
                    >
                        <motion.div
                            className="relative w-full max-w-[680px] max-h-[88vh] flex flex-col rounded-2xl sm:rounded-3xl border border-gray-200/90 dark:border-white/15 bg-white dark:bg-[#141414] shadow-2xl overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                            initial={{ opacity: 0, scale: 0.94, y: 15 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.94, y: 15 }}
                            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        >
                            {/* Modal Header */}
                            <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-gray-100 dark:border-white/[0.08] bg-gray-50/70 dark:bg-white/[0.02]">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-8 h-8 rounded-lg bg-cyan-500/10 dark:bg-cyan-400/10 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
                                        <Layers size={16} />
                                    </div>
                                    <div>
                                        <h3 className="text-base font-bold text-gray-900 dark:text-white leading-tight">
                                            Technology Stack
                                        </h3>
                                        <p className="text-[11.5px] text-gray-500 dark:text-gray-400">
                                            25+ frameworks, libraries &amp; developer tools
                                        </p>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setIsExploreOpen(false)}
                                    className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-200/70 dark:hover:bg-white/10 transition-colors cursor-pointer"
                                    aria-label="Close modal"
                                >
                                    <X size={17} />
                                </button>
                            </div>

                            {/* Search & Category Filter Controls */}
                            <div className="p-4 sm:p-6 pb-2 space-y-3 border-b border-gray-100 dark:border-white/[0.06]">
                                {/* Search input */}
                                <div className="relative">
                                    <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search technology (e.g. React, Docker, Python)..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 rounded-xl bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 text-[13px] text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-cyan-500 focus:bg-white dark:focus:bg-[#121212] transition-colors outline-none"
                                    />
                                    {searchQuery && (
                                        <button
                                            onClick={() => setSearchQuery('')}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xs"
                                        >
                                            Clear
                                        </button>
                                    )}
                                </div>

                                {/* Category Pills */}
                                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                                    {CATEGORIES.map((cat) => {
                                        const isSelected = selectedCategory === cat;
                                        return (
                                            <button
                                                key={cat}
                                                onClick={() => setSelectedCategory(cat)}
                                                className={`px-3 py-1 rounded-lg text-[11.5px] font-semibold whitespace-nowrap transition-all cursor-pointer ${
                                                    isSelected
                                                        ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-xs'
                                                        : 'bg-gray-100 dark:bg-white/[0.06] text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                                                }`}
                                            >
                                                {cat}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Tech Grid Body */}
                            <div className="overflow-y-auto p-4 sm:p-6 grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                                {filteredTech.length > 0 ? (
                                    filteredTech.map((tech) => (
                                        <div
                                            key={tech.slug}
                                            className="flex items-center gap-2.5 p-2.5 rounded-xl border border-gray-200/80 dark:border-white/[0.08] bg-gray-50/50 dark:bg-white/[0.02] hover:bg-gray-100/70 dark:hover:bg-white/[0.06] hover:border-gray-300 dark:hover:border-white/20 transition-all shadow-2xs group"
                                        >
                                            <img
                                                src={`https://cdn.simpleicons.org/${tech.slug}`}
                                                alt=""
                                                className={`w-5 h-5 shrink-0 ${tech.invertDark ? 'dark:invert dark:brightness-150' : ''}`}
                                                loading="lazy"
                                                onError={(e) => { e.target.style.display = 'none'; }}
                                            />
                                            <span className="text-[12.5px] font-semibold text-gray-800 dark:text-gray-200 truncate group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                                                {tech.name}
                                            </span>
                                        </div>
                                    ))
                                ) : (
                                    <div className="col-span-full py-8 text-center text-gray-400 dark:text-gray-500 text-xs">
                                        No technologies matching "{searchQuery}"
                                    </div>
                                )}
                            </div>

                            {/* Footer info */}
                            <div className="px-4 sm:px-6 py-2.5 border-t border-gray-100 dark:border-white/[0.06] bg-gray-50/50 dark:bg-white/[0.01] flex items-center justify-between text-[11px] text-gray-400 dark:text-gray-500">
                                <span>Showing {filteredTech.length} of {allTech.length} tools</span>
                                <span className="flex items-center gap-1">
                                    <Sparkles size={11} className="text-cyan-500" />
                                    Production-ready stack
                                </span>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
