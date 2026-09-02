import { ArrowUpRight } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { projects } from '@/data/portfolioData';

export default function ProjectsList() {
    return (
        <section id="projects" className="py-12 scroll-mt-20">
            <ScrollReveal>
                <h2 className="text-[22px] sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Projects
                </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.05}>
                <div className="mt-3">
                    {projects.map((p, idx) => {
                        const live = p.link && p.link !== '#';
                        const Wrapper = live ? 'a' : 'div';
                        return (
                            <Wrapper
                                key={idx}
                                {...(live ? {
                                    href: p.link,
                                    target: '_blank',
                                    rel: 'noopener noreferrer',
                                } : {})}
                                className="group flex items-start justify-between gap-6 py-5 border-b border-gray-100 dark:border-white/5 no-underline"
                            >
                                <div className="min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className="text-[15px] font-bold text-gray-900 dark:text-white">
                                            {p.title}
                                        </span>
                                        {!live && (
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-400/10 rounded-full px-2 py-[3px]">
                                                In Development
                                            </span>
                                        )}
                                    </div>
                                    <p className="mt-1 text-[13.5px] leading-relaxed text-gray-500 dark:text-gray-400 max-w-xl">
                                        {p.description}
                                    </p>
                                    {live && (
                                        <span className="mt-1.5 inline-block text-[12px] font-medium text-gray-400 dark:text-gray-500">
                                            {p.url}
                                        </span>
                                    )}
                                </div>
                                {live && (
                                    <ArrowUpRight
                                        size={18}
                                        className="shrink-0 mt-1 text-gray-300 dark:text-gray-600 group-hover:text-gray-900 dark:group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
                                    />
                                )}
                            </Wrapper>
                        );
                    })}
                </div>
            </ScrollReveal>
        </section>
    );
}
