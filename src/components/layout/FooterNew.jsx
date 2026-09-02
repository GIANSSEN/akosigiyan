import { motion, useReducedMotion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
import { footerQuote, recommenderAvatars, socialLinks, contactInfo } from '@/data/portfolioData';

export default function FooterNew() {
    const reduceMotion = useReducedMotion();

    const socials = [
        { icon: <Github size={14} />,   href: socialLinks[1]?.href || '#', label: 'GitHub',   color: '#6366f1' },
        { icon: <Linkedin size={14} />, href: socialLinks[0]?.href || '#', label: 'LinkedIn', color: '#0A66C2' },
        { icon: <Mail size={14} />,     href: `mailto:${contactInfo.email}`, label: 'Email',  color: '#EA4335' },
    ];

    return (
        <footer className="py-10">
            <div className="max-w-[880px] mx-auto px-5 sm:px-8">
                <motion.div
                    initial={reduceMotion ? {} : { opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div className="border-t border-dashed border-gray-200 dark:border-white/[0.07] mb-8" />

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">

                        {/* Left — quote + name + socials */}
                        <div className="min-w-0">
                            <p className="text-[12.5px] italic text-gray-400 dark:text-gray-500 mb-2">
                                {footerQuote || 'Repetition until it becomes technique.'}
                            </p>

                            <div className="flex items-center gap-2 text-[12.5px] flex-wrap">
                                <span className="font-semibold text-gray-900 dark:text-white">
                                    Gianssen Jasolin
                                </span>
                                <span className="text-gray-300 dark:text-gray-600">·</span>
                                <span className="text-gray-400 dark:text-gray-500">
                                    Full-Stack Developer
                                </span>
                                <span className="text-gray-300 dark:text-gray-600">·</span>
                                <span className="text-gray-400 dark:text-gray-500">
                                    Metro Manila, PH
                                </span>
                            </div>

                            {/* Social links (GitHub, LinkedIn, Email) */}
                            <div className="flex items-center gap-3 mt-3">
                                {socials.map(s => (
                                    <motion.a
                                        key={s.label}
                                        href={s.href}
                                        target={s.href.startsWith('http') ? '_blank' : undefined}
                                        rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                        aria-label={s.label}
                                        className="text-gray-400 dark:text-gray-500 no-underline flex items-center focus-ring"
                                        whileHover={reduceMotion ? {} : { y: -2, scale: 1.2, color: s.color }}
                                        transition={{ type: 'spring', stiffness: 500, damping: 12 }}
                                    >
                                        {s.icon}
                                    </motion.a>
                                ))}
                            </div>
                        </div>

                        {/* Right — recommender avatars */}
                        <div className="flex items-center gap-3 shrink-0">
                            <div className="flex items-center -space-x-2.5">
                                {(recommenderAvatars || []).slice(0, 3).map((a, i) => (
                                    <img
                                        key={i}
                                        src={a.src}
                                        alt={a.alt}
                                        title={a.alt}
                                        className="w-8 h-8 rounded-full ring-2 ring-white dark:ring-[#0a0a0a] object-cover grayscale"
                                        onError={e => { e.target.style.display = 'none'; }}
                                    />
                                ))}
                            </div>
                            <span className="text-[12px] text-gray-400 dark:text-gray-500 leading-tight">
                                Endorsed by<br />
                                <span className="font-semibold text-gray-700 dark:text-gray-300">colleagues & clients</span>
                            </span>
                        </div>
                    </div>

                    {/* Copyright — name only, no tech stack */}
                    <p className="mt-6 text-[11px] text-gray-300 dark:text-gray-700 select-none">
                        © {new Date().getFullYear()} Gianssen Jasolin. All rights reserved.
                    </p>
                </motion.div>
            </div>
        </footer>
    );
}
