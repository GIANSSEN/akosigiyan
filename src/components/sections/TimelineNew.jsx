import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { experience } from '@/data/portfolioData';

export default function TimelineNew() {
    const reduceMotion = useReducedMotion();

    return (
        <section id="experience" className="py-12 scroll-mt-20">
            <div className="max-w-[780px] mx-auto px-5 sm:px-8">

                <ScrollReveal>
                    <div className="flex items-baseline justify-between mb-7">
                        <h2 className="font-serif text-[26px] sm:text-[28px] font-normal text-gray-900 dark:text-white">
                            Experience
                        </h2>
                        <a
                            href="https://github.com/Gianssen"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[12px] text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors no-underline focus-ring"
                        >
                            View Details
                            <ArrowUpRight size={12} />
                        </a>
                    </div>
                </ScrollReveal>

                <div className="flex flex-col gap-0">
                    {experience.map((e, i) => (
                        <motion.div
                            key={i}
                            className="grid grid-cols-1 sm:grid-cols-[130px_1fr] gap-1 sm:gap-6 py-5 border-t border-gray-100 dark:border-white/[0.06] first:border-t-0"
                            initial={reduceMotion ? {} : { opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-40px' }}
                            transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <span className="text-[11.5px] font-medium text-gray-400 dark:text-gray-500 tabular-nums pt-[3px] leading-snug">
                                {e.period}
                            </span>

                            <div className="min-w-0">
                                <h3 className="text-[14px] sm:text-[14.5px] font-bold text-cyan-600 dark:text-cyan-400 leading-snug mb-0.5">
                                    {e.role}
                                </h3>
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
        </section>
    );
}
