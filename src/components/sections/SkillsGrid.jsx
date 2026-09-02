import { ArrowRight, LayoutGrid } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import TechMarquee from '@/components/ui/TechMarquee';
import { allTech } from '@/data/portfolioData';

/*
 * Split allTech into 3 themed rows matching the reference image:
 *  Row 1 — Frontend / Build tools
 *  Row 2 — Backend / Databases
 *  Row 3 — DevOps / AI / APIs
 */
const ROW_SLUGS = [
    // Row 1 — Frontend & Build tools
    ['react', 'javascript', 'typescript', 'tailwindcss', 'vite', 'nextdotjs', 'vuedotjs', 'html5', 'css3'],
    // Row 2 — Backend & Databases
    ['php', 'laravel', 'nodedotjs', 'python', 'rust', 'mysql', 'postgresql', 'sqlite', 'supabase', 'docker'],
    // Row 3 — DevOps, AI & APIs
    ['git', 'github', 'githubactions', 'amazonwebservices', 'linux', 'openai'],
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
    return (
        <section id="skills" className="py-12 scroll-mt-20">
            <div className="max-w-[880px] mx-auto px-5 sm:px-8">

                <ScrollReveal>
                    <div className="flex items-baseline justify-between mb-7">
                        <h2 className="font-serif text-[26px] sm:text-[28px] font-normal text-gray-900 dark:text-white">
                            Technologies
                        </h2>
                        <button
                            className="inline-flex items-center gap-1.5 text-[12px] text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors focus-ring"
                            aria-label="View all technologies"
                        >
                            <LayoutGrid size={13} />
                            View All
                            <ArrowRight size={11} />
                        </button>
                    </div>
                </ScrollReveal>

                <ScrollReveal delay={0.05}>
                    <TechMarquee rows={rows} />
                </ScrollReveal>

            </div>
        </section>
    );
}
