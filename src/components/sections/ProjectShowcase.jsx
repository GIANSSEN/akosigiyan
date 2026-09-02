import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { projects } from '@/data/portfolioData';

/* ── Colored tech icon from SimpleIcons CDN ─────────────────────── */
const TechBadge = ({ slug }) => (
    <img
        src={`https://cdn.simpleicons.org/${slug}`}
        alt={slug}
        title={slug}
        className="w-5 h-5 opacity-90 hover:opacity-100 transition-opacity"
        loading="lazy"
        onError={e => { e.target.style.display = 'none'; }}
    />
);

function ProjectCard({ project, index }) {
    const reduceMotion = useReducedMotion();
    const live = project.link && project.link !== '#';

    return (
        <motion.div
            className="project-card border border-gray-200 dark:border-white/[0.09] rounded-2xl overflow-hidden transition-all duration-300 flex flex-col bg-white dark:bg-white/[0.01] group relative"
            initial={reduceMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            whileHover={reduceMotion ? {} : { y: -5, boxShadow: '0 20px 40px -10px rgba(0,0,0,0.12)' }}
        >
            {/* ── Thumbnail ─────────────────────────────────────── */}
            <div className="relative overflow-hidden bg-gray-100 dark:bg-white/[0.03] aspect-[16/10]">
                {project.image ? (
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.06]"
                        loading="lazy"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-indigo-50 to-gray-100 dark:from-indigo-900/20 dark:to-white/[0.02] flex items-center justify-center">
                        <span className="text-3xl font-bold text-indigo-200 dark:text-indigo-900/60">
                            {project.title.slice(0, 2).toUpperCase()}
                        </span>
                    </div>
                )}

                {/* ── Hover overlay ────────────────────────────── */}
                {live && !reduceMotion && (
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent flex items-end p-4"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        style={{ originY: 1 }}
                    >
                        <motion.a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-white text-gray-900 rounded-full px-4 py-2 text-[12px] font-bold no-underline hover:bg-gray-100 transition-colors"
                            initial={{ y: 12, opacity: 0 }}
                            whileHover={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
                            onClick={e => e.stopPropagation()}
                        >
                            <ExternalLink size={12} />
                            {project.linkLabel || 'Visit Site'}
                        </motion.a>
                    </motion.div>
                )}

                {/* Subtle gradient top-left */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>

            {/* ── Content ───────────────────────────────────────── */}
            <div className="p-5 sm:p-6 flex flex-col flex-1">

                {/* Title */}
                <h3 className="text-[16px] sm:text-[17px] font-bold text-gray-900 dark:text-white leading-snug mb-1">
                    {project.title}
                </h3>

                {/* Role */}
                <p className="text-[13px] font-semibold text-cyan-600 dark:text-cyan-400 mb-2.5">
                    {project.role}
                </p>

                {/* Description */}
                <p className="text-[13px] leading-[1.7] text-gray-500 dark:text-gray-400 mb-4 flex-1">
                    {project.description}
                </p>

                {/* Tech icons row */}
                {project.tech && (
                    <div className="flex items-center gap-2 mb-5 flex-wrap">
                        {project.tech.map(slug => (
                            <TechBadge key={slug} slug={slug} />
                        ))}
                    </div>
                )}

                {/* Bottom row */}
                <div className="border-t border-gray-100 dark:border-white/[0.06] pt-4 flex justify-between items-center">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" title="Active project" />
                    <div className="flex justify-end">
                        {live ? (
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors no-underline group/link"
                            >
                                {project.linkLabel || 'VISIT SITE'}
                                <ArrowUpRight size={12} className="transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                            </a>
                        ) : (
                            <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-gray-300 dark:text-gray-600">
                                {project.linkLabel || 'IN DEVELOPMENT'}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default function ProjectShowcase() {
    return (
        <section id="projects" className="py-12 scroll-mt-20">
            <div className="max-w-[880px] mx-auto px-6 sm:px-8">

                {/* Section header */}
                <ScrollReveal>
                    <div className="flex items-baseline justify-between mb-7">
                        <h2 className="font-serif text-[26px] sm:text-[28px] font-normal text-gray-900 dark:text-white">
                            Projects
                        </h2>
                        <a
                            href="https://github.com/Gianssen"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[12px] text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors no-underline"
                        >
                            View All
                            <ArrowUpRight size={12} />
                        </a>
                    </div>
                </ScrollReveal>

                {/* 2-column card grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {projects.map((p, i) => (
                        <ProjectCard key={i} project={p} index={i} />
                    ))}
                </div>

                {/* "Explore 25+ Projects →" pill */}
                <ScrollReveal delay={0.1}>
                    <div className="mt-8 flex justify-center">
                        <motion.a
                            href="https://github.com/Gianssen"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full px-6 py-2.5 text-[13px] font-bold no-underline hover:opacity-90 transition-opacity duration-200 group"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            Explore 25+ Projects
                            <ArrowUpRight size={13} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </motion.a>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}
