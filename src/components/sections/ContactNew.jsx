import { motion, useReducedMotion } from 'framer-motion';
import { Mail, Phone, ArrowUpRight } from 'lucide-react';
import SectionReveal, { RevealItem } from '@/components/ui/SectionReveal';
import MagneticButton from '@/components/ui/MagneticButton';
import { contactInfo } from '@/data/portfolioData';

export default function ContactNew() {
    const reduceMotion = useReducedMotion();

    return (
        <section id="contact" className="py-24 sm:py-40 scroll-mt-20">
            <div className="max-w-5xl mx-auto px-6 sm:px-8">
                <SectionReveal>
                    <RevealItem>
                        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-indigo-500 dark:text-indigo-400 mb-4">
                            Contact
                        </p>
                    </RevealItem>

                    <RevealItem>
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white leading-[1.1] max-w-2xl">
                            Let's work{' '}
                            <span className="text-gray-300 dark:text-gray-600">together.</span>
                        </h2>
                    </RevealItem>

                    <RevealItem>
                        <p className="mt-6 text-base sm:text-lg leading-relaxed text-gray-500 dark:text-gray-400 max-w-lg">
                            Available for OJT / internship and freelance builds — full-stack web
                            development, AI integrations, and POS / inventory systems.
                        </p>
                    </RevealItem>

                    <RevealItem>
                        <div className="mt-10 flex flex-col sm:flex-row items-start gap-4">
                            <MagneticButton
                                href={`mailto:${contactInfo.email}`}
                                className="group inline-flex items-center gap-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full px-7 py-4 text-[15px] font-semibold no-underline hover:shadow-xl hover:shadow-gray-900/10 dark:hover:shadow-white/10 transition-all duration-300"
                            >
                                <Mail size={16} />
                                {contactInfo.email}
                                <ArrowUpRight size={14} className="opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                            </MagneticButton>

                            <MagneticButton
                                href={contactInfo.phoneHref}
                                className="group inline-flex items-center gap-3 border border-gray-200 dark:border-white/10 rounded-full px-7 py-4 text-[15px] font-semibold text-gray-600 dark:text-gray-400 no-underline hover:border-gray-300 dark:hover:border-white/20 hover:bg-gray-50 dark:hover:bg-white/5 transition-all duration-300"
                            >
                                <Phone size={16} />
                                {contactInfo.phone}
                                <ArrowUpRight size={14} className="opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                            </MagneticButton>
                        </div>
                    </RevealItem>
                </SectionReveal>
            </div>
        </section>
    );
}
