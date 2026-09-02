import { useState, useRef, useEffect } from 'react';
import { ArrowUpRight, ChevronDown, ChevronUp, Maximize2 } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import ScrollStack, { ScrollStackItem } from '@/components/ui/ScrollStack';
import ImageModal from '@/components/ui/ImageModal';
import { projects } from '@/data/portfolioData';

/* ── Colored tech icon from SimpleIcons CDN ─────────────────────── */
const TechBadge = ({ slug }) => (
    <img
        src={`https://cdn.simpleicons.org/${slug}`}
        alt={slug}
        title={slug}
        className="w-4 h-4 sm:w-5 sm:h-5 opacity-85 hover:opacity-100 transition-opacity"
        loading="lazy"
        onError={e => { e.target.style.display = 'none'; }}
    />
);

/* ── Inset Screenshot Frame ──────────────────────────────────────── */
function ProjectVisualMockup({ project, onPreview }) {
    if (project.image) {
        return (
            <div
                onClick={() => onPreview?.(project.image, project.title)}
                className="w-full h-full relative group/img cursor-zoom-in overflow-hidden rounded-lg bg-gray-50 dark:bg-[#151515] flex items-center justify-center"
                title={`Click to preview full screenshot of ${project.title}`}
            >
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-top rounded-lg transition-transform duration-500 group-hover/img:scale-[1.03]"
                    loading="lazy"
                />
                {/* Hover zoom overlay badge */}
                <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/25 transition-all duration-200 rounded-lg flex items-center justify-center pointer-events-none">
                    <span className="opacity-0 group-hover/img:opacity-100 transition-all duration-200 bg-black/80 backdrop-blur-sm text-white font-mono text-[11px] px-3 py-1 rounded-full shadow-lg flex items-center gap-1.5 transform translate-y-1 group-hover/img:translate-y-0">
                        <Maximize2 size={12} />
                        View Full Screenshot
                    </span>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full h-full bg-white dark:bg-[#1a1f26] rounded-xl p-4 flex items-center justify-center text-gray-400 font-mono text-xs">
            Preview coming soon
        </div>
    );
}

/* ── Single Project Card ─────────────────────────────────────────── */
function ProjectCard({ project, index, total, onPreview }) {
    const live = project.link && project.link !== '#';
    const isInProgress = project.status === 'In Progress' || project.linkLabel === 'IN PROGRESS';

    return (
        <ScrollStackItem itemClassName="relative overflow-hidden group">
            {/* 1. Inset screenshot container with hover interaction */}
            <div className="w-full aspect-[16/9] max-h-[170px] sm:max-h-[220px] rounded-xl sm:rounded-2xl overflow-hidden bg-white dark:bg-[#181818] p-1.5 sm:p-2 flex items-center justify-center border border-gray-200/80 dark:border-white/10 shadow-sm mb-3 sm:mb-4">
                <ProjectVisualMockup project={project} onPreview={onPreview} />
            </div>

            {/* 2. Project Title & Status Badge */}
            <div className="flex items-center justify-between gap-2 mb-1">
                <h3 className="text-base sm:text-xl font-bold text-gray-900 dark:text-white leading-snug tracking-tight">
                    {project.title}
                </h3>
                {isInProgress && (
                    <span className="shrink-0 text-[9.5px] sm:text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-full px-2 py-0.5">
                        In Progress
                    </span>
                )}
            </div>

            {/* 3. Role */}
            <p className="text-[12px] sm:text-[13px] font-semibold text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2">
                {project.role}
            </p>

            {/* 4. Description in cyan */}
            <p className="text-[12px] sm:text-[13px] leading-relaxed text-cyan-600 dark:text-cyan-400 mb-2.5 sm:mb-3.5 line-clamp-2 sm:line-clamp-none">
                {project.description}
            </p>

            {/* 5. Tech Stack Icons row */}
            {project.tech && project.tech.length > 0 && (
                <div className="flex items-center gap-2.5 sm:gap-3.5 mb-2.5 sm:mb-3">
                    {project.tech.map(slug => (
                        <TechBadge key={slug} slug={slug} />
                    ))}
                </div>
            )}

            {/* 6. Thin Separator Line */}
            <div className="border-t border-gray-200 dark:border-white/[0.08] my-2 sm:my-3" />

            {/* 7. Bottom Row: Status dot + Outlined CTA button */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${isInProgress ? 'bg-amber-400' : 'bg-emerald-500'} animate-pulse`} />
                    <span className="font-mono text-[10.5px] sm:text-[11px] text-gray-400 dark:text-gray-500">
                        {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                    </span>
                </div>

                <div>
                    {live ? (
                        <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 font-mono text-[10.5px] sm:text-[12px] font-bold uppercase tracking-[0.14em] text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-white/20 rounded-lg px-3 py-1.5 sm:px-3.5 sm:py-1.5 hover:bg-gray-100 dark:hover:bg-white/10 hover:border-gray-400 dark:hover:border-white/40 hover:text-black dark:hover:text-white transition-all duration-200 no-underline shadow-sm hover:scale-[1.02] active:scale-[0.98] group/btn"
                        >
                            <span>{project.linkLabel || 'VISIT SITE'}</span>
                            <ArrowUpRight
                                size={13}
                                className="transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                            />
                        </a>
                    ) : (
                        <button
                            type="button"
                            onClick={() => onPreview?.(project.image, project.title)}
                            className="inline-flex items-center gap-1.5 font-mono text-[10.5px] sm:text-[12px] font-bold uppercase tracking-[0.14em] text-amber-600 dark:text-amber-400 border border-amber-500/30 dark:border-amber-400/25 bg-amber-500/5 hover:bg-amber-500/10 rounded-lg px-3 py-1.5 sm:px-3.5 sm:py-1.5 transition-all duration-200 cursor-pointer group/btn"
                            title="Click to preview full project image"
                        >
                            <span>{project.linkLabel || 'IN PROGRESS'}</span>
                            <Maximize2
                                size={12}
                                className="transition-transform duration-200 group-hover/btn:scale-110"
                            />
                        </button>
                    )}
                </div>
            </div>
        </ScrollStackItem>
    );
}

/* ── Main Section ───────────────────────────────────────────────── */
export default function ProjectShowcase() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [isShortViewport, setIsShortViewport] = useState(false);
    const [previewModal, setPreviewModal] = useState(null);
    const stackRef = useRef(null);

    useEffect(() => {
        const checkDimensions = () => {
            setIsMobile(window.innerWidth < 640);
            setIsShortViewport(window.innerHeight < 700);
        };
        checkDimensions();
        window.addEventListener('resize', checkDimensions);
        return () => window.removeEventListener('resize', checkDimensions);
    }, []);

    const isLastCard = activeIndex >= projects.length - 1;

    const handleNextClick = () => {
        if (isLastCard) {
            stackRef.current?.scrollToIndex(0);
        } else {
            stackRef.current?.scrollToIndex(activeIndex + 1);
        }
    };

    const handlePreview = (src, title) => {
        if (src) {
            setPreviewModal({ src, alt: title });
        }
    };

    // Calculate comfortable stack position below navbar
    const stackPositionVal = isMobile ? '70px' : isShortViewport ? '78px' : '88px';
    const itemDistanceVal = isMobile ? 190 : 220;
    const itemStackDistVal = isMobile ? 10 : 14;
    const itemScaleVal = isMobile ? 0.015 : 0.035;
    const rotationVal = isMobile ? 0 : 0.4;
    const blurVal = isMobile ? 0 : 2;
    const baseScaleVal = isMobile ? 0.96 : 0.94;

    return (
        <section id="projects" className="pt-20 sm:pt-28 pb-14 sm:pb-24 scroll-mt-24">
            {/* 
                Wider container width:
                Uses max-w-[680px] sm:max-w-[720px] w-full mx-auto as requested ("palakihin mo ng kaunti ung width ng stack project border")
            */}
            <div className="max-w-[680px] sm:max-w-[720px] mx-auto px-3.5 sm:px-6">

                {/* Clean Header matching Image 2 */}
                <ScrollReveal>
                    <div className="flex items-baseline justify-between mb-4 sm:mb-7">
                        <h2 className="font-serif text-[26px] sm:text-[34px] font-normal text-gray-900 dark:text-white tracking-tight">
                            Projects
                        </h2>

                        {/* Subtle counter */}
                        <span className="font-mono text-[11px] font-medium text-gray-400 dark:text-gray-500">
                            {String(activeIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                        </span>
                    </div>
                </ScrollReveal>

                {/* 
                    Continuous Window Scroll Stack:
                    - useWindowScroll={true} ensures scrolling is 100% continuous all the way down to the footer!
                    - The whole card border is visible before scrolling and during stacking!
                */}
                <div className="relative w-full">
                    <ScrollStack
                        ref={stackRef}
                        useWindowScroll={true}
                        itemDistance={itemDistanceVal}
                        itemScale={itemScaleVal}
                        itemStackDistance={itemStackDistVal}
                        stackPosition={stackPositionVal}
                        scaleEndPosition="20px"
                        baseScale={baseScaleVal}
                        rotationAmount={rotationVal}
                        blurAmount={blurVal}
                        onActiveIndexChange={setActiveIndex}
                    >
                        {projects.map((p, i) => (
                            <ProjectCard
                                key={i}
                                project={p}
                                index={i}
                                total={projects.length}
                                onPreview={handlePreview}
                            />
                        ))}
                    </ScrollStack>

                    {/* 
                        Bottom Right Chevron Button:
                        Visible at bottom-right matching Image 2!
                        Clicking advances to the next card or cycles to the top.
                    */}
                    <div className="sticky bottom-6 float-right z-30 pointer-events-auto pr-2 pb-2">
                        <button
                            onClick={handleNextClick}
                            className="inline-flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-xl border border-gray-300 dark:border-white/15 bg-white/90 dark:bg-[#1c1c1c]/90 backdrop-blur-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10 shadow-md transition-all cursor-pointer hover:scale-105 active:scale-95"
                            title={isLastCard ? "Back to first project" : "Next project"}
                            aria-label={isLastCard ? "Back to first project" : "Next project"}
                        >
                            {isLastCard ? (
                                <ChevronUp size={16} />
                            ) : (
                                <ChevronDown size={16} />
                            )}
                        </button>
                    </div>
                </div>

                {/* Bottom View All Link */}
                <div className="mt-12 sm:mt-16 flex justify-center">
                    <a
                        href="https://github.com/Gianssen"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[12px] font-semibold text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors no-underline"
                    >
                        <span>View all 25+ repositories on GitHub</span>
                        <ArrowUpRight size={13} />
                    </a>
                </div>

            </div>

            {/* High-res Image Preview Modal */}
            <ImageModal
                src={previewModal?.src}
                alt={previewModal?.alt || 'Project Preview'}
                onClose={() => setPreviewModal(null)}
            />
        </section>
    );
}
