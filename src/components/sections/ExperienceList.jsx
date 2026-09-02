import ScrollReveal from '@/components/ui/ScrollReveal';
import { experience } from '@/data/portfolioData';

export default function ExperienceList() {
    return (
        <section id="experience" className="py-12 scroll-mt-20">
            <ScrollReveal>
                <h2 className="text-[22px] sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Experience
                </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.05}>
                <div className="mt-3">
                    {experience.map((e, idx) => (
                        <div
                            key={idx}
                            className="flex gap-5 sm:gap-8 py-5 border-b border-gray-100 dark:border-white/5"
                        >
                            <span className="w-12 shrink-0 pt-[3px] text-[12px] font-bold text-gray-400 dark:text-gray-500 tabular-nums">
                                {e.period}
                            </span>
                            <div className="min-w-0">
                                <div className="text-[15px] font-bold text-gray-900 dark:text-white leading-snug">
                                    {e.role}
                                </div>
                                <div className="mt-0.5 text-[13px] font-medium text-gray-500 dark:text-gray-400">
                                    {e.company}
                                </div>
                                <p className="mt-1.5 text-[13.5px] leading-relaxed text-gray-500 dark:text-gray-400">
                                    {e.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollReveal>
        </section>
    );
}
