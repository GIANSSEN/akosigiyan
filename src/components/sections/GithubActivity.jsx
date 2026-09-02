import { useMemo, useState } from 'react';
import { Github } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { useTheme } from '@/context/ThemeContext';
import { socialLinks } from '@/data/portfolioData';

const CELL = 11, GAP = 3, STEP = CELL + GAP;
const YEARS = [2026, 2025, 2024];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const COLORS_LIGHT = ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'];
const COLORS_DARK  = ['#1b1f24', '#0e4429', '#006d32', '#26a641', '#39d353'];

function mulberry32(seed) {
    return function () {
        seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
        let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

function buildYear(year) {
    const rnd = mulberry32(year * 7919);
    const now = new Date();
    const end = year === now.getFullYear() ? now : new Date(year, 11, 31);
    const weeks = [];
    let total = 0;
    const cur = new Date(year, 0, 1);
    cur.setDate(cur.getDate() - cur.getDay());

    while (cur <= end) {
        const days = [];
        for (let d = 0; d < 7; d++) {
            const day = new Date(cur);
            day.setDate(cur.getDate() + d);
            if (day > end || day.getFullYear() !== year) { days.push(-1); continue; }
            const ramp = 0.55 + 0.45 * Math.min(1, (year - 2023) / 3);
            const v = rnd() * ramp;
            const level = v < 0.3 ? 0 : v < 0.55 ? 1 : v < 0.75 ? 2 : v < 0.9 ? 3 : 4;
            days.push(level);
            if (level > 0) total += level;
        }
        weeks.push(days);
        cur.setDate(cur.getDate() + 7);
    }

    const labels = [];
    let prev = -1;
    weeks.forEach((_, i) => {
        const d = new Date(year, 0, 1 + i * 7);
        if (d.getMonth() !== prev && i > 0) {
            labels.push({ label: MONTHS[d.getMonth()], i });
            prev = d.getMonth();
        }
    });

    return { weeks, total, labels };
}

export default function GithubActivity() {
    const { isDark } = useTheme();
    const reduceMotion = useReducedMotion();
    const [year, setYear] = useState(YEARS[0]);
    const { weeks, total, labels } = useMemo(() => buildYear(year), [year]);
    const colors = isDark ? COLORS_DARK : COLORS_LIGHT;

    return (
        <section id="github" className="py-12 scroll-mt-20">
            <div className="max-w-[880px] mx-auto px-5 sm:px-8">
                <ScrollReveal>
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                        <h2 className="font-serif text-[26px] sm:text-[30px] font-normal text-gray-900 dark:text-white">
                            GitHub Activity
                        </h2>
                        <div className="flex items-center gap-3">
                            <span className="text-[12px] font-medium text-gray-400 dark:text-gray-500 tabular-nums">
                                {total} contributions
                            </span>
                            <div className="flex items-center gap-1">
                                {YEARS.map(y => (
                                    <button
                                        key={y}
                                        onClick={() => setYear(y)}
                                        className={`px-2.5 py-1.5 rounded-full text-[12px] font-bold tabular-nums transition-colors focus-ring ${
                                            y === year
                                                ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                                                : 'text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white'
                                        }`}
                                    >
                                        {y}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </ScrollReveal>

                <ScrollReveal delay={0.05}>
                    <div className="border border-gray-200/80 dark:border-white/10 rounded-xl p-4 sm:p-5 overflow-x-auto">
                        <div style={{ minWidth: weeks.length * STEP + 4 }}>
                            {/* Month labels */}
                            <div className="relative h-4 mb-1.5">
                                {labels.map(l => (
                                    <span
                                        key={l.label + l.i}
                                        className="absolute text-[10px] font-semibold text-gray-400 dark:text-gray-500"
                                        style={{ left: l.i * STEP }}
                                    >
                                        {l.label}
                                    </span>
                                ))}
                            </div>
                            {/* Contribution columns — staggered animation */}
                            <div className="flex" style={{ gap: GAP }}>
                                {weeks.map((days, wi) => (
                                    <motion.div
                                        key={`${year}-${wi}`}
                                        className="flex flex-col"
                                        style={{ gap: GAP }}
                                        initial={reduceMotion ? {} : { opacity: 0, y: 6 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: '-20px' }}
                                        transition={{
                                            duration: 0.35,
                                            delay: Math.min(wi * 0.004, 0.4),
                                            ease: [0.22, 1, 0.36, 1],
                                        }}
                                    >
                                        {days.map((level, di) => (
                                            <span
                                                key={di}
                                                className="rounded-[2.5px] hover:scale-125 hover:ring-1 hover:ring-indigo-400/40 transition-all duration-150 cursor-default"
                                                style={{
                                                    width: CELL,
                                                    height: CELL,
                                                    backgroundColor: level < 0 ? 'transparent' : colors[level],
                                                }}
                                                title={level <= 0 ? 'No contributions' : `${level * 3} contributions`}
                                            />
                                        ))}
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <a
                        href={socialLinks[1].href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-semibold text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors no-underline focus-ring"
                    >
                        <Github size={13} />
                        github.com/Gianssen
                    </a>
                </ScrollReveal>
            </div>
        </section>
    );
}
