import { useState, useRef, useEffect } from 'react';
import { ArrowUpRight, ChevronDown, ChevronUp, Bot, ShoppingCart } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import ScrollStack, { ScrollStackItem } from '@/components/ui/ScrollStack';
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

/* ── Inset Screenshot Frame matching Image 2 ─────────────────────── */
function ProjectVisualMockup({ project }) {
    const live = project.link && project.link !== '#';

    if (project.image) {
        return (
            <a
                href={live ? project.link : undefined}
                target={live ? '_blank' : undefined}
                rel={live ? 'noopener noreferrer' : undefined}
                className={`w-full h-full bg-white dark:bg-[#181818] rounded-xl p-1.5 sm:p-2 flex items-center justify-center overflow-hidden transition-transform duration-300 group/img ${
                    live ? 'cursor-pointer hover:opacity-95' : 'cursor-default'
                }`}
                title={live ? `Visit ${project.title}` : project.title}
            >
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-contain object-top rounded-lg transition-transform duration-500 group-hover/img:scale-[1.02]"
                    loading="lazy"
                />
            </a>
        );
    }

    // High-fidelity graphic mockups for projects without static screenshots
    const isAiChatbot = project.title.toLowerCase().includes('chatbot') || project.title.toLowerCase().includes('ai');

    if (isAiChatbot) {
        return (
            <div className="w-full h-full bg-white dark:bg-[#1a1a24] rounded-xl p-3 sm:p-4 flex flex-col justify-between select-none">
                {/* Browser top-bar */}
                <div className="flex items-center justify-between pb-2 border-b border-gray-100 dark:border-white/5">
                    <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                    </div>
                    <span className="font-mono text-[10px] sm:text-[11px] text-gray-400 dark:text-gray-500">gemini-assistant.preview</span>
                </div>
                {/* Chat Mockup bubbles */}
                <div className="space-y-2 py-2 sm:py-3">
                    <div className="flex items-start gap-2">
                        <div className="w-6 h-6 rounded-full bg-indigo-500/15 dark:bg-cyan-500/20 flex items-center justify-center shrink-0 mt-0.5">
                            <Bot size={13} className="text-indigo-600 dark:text-cyan-400" />
                        </div>
                        <div className="bg-gray-100 dark:bg-white/[0.06] rounded-xl rounded-tl-sm px-3 py-1.5 text-[11px] sm:text-[12px] text-gray-700 dark:text-gray-200">
                            Hi! Ask me anything about Giyan's experience, stack, and full-stack projects.
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <div className="bg-indigo-600 text-white rounded-xl rounded-tr-sm px-3 py-1.5 text-[11px] sm:text-[12px]">
                            Tell me about the POS System & SEO architecture
                        </div>
                    </div>
                </div>
                {/* Prompt chips */}
                <div className="flex items-center gap-2 pt-1 border-t border-gray-100 dark:border-white/5">
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-gray-100 dark:bg-white/5 text-gray-500 font-mono">Gemini 2.5 Flash</span>
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-gray-100 dark:bg-white/5 text-gray-500 font-mono">Streaming SSE</span>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full h-full bg-white dark:bg-[#1a1f26] rounded-xl p-3 sm:p-4 flex flex-col justify-between select-none">
            {/* Browser top-bar */}
            <div className="flex items-center justify-between pb-2 border-b border-gray-100 dark:border-white/5">
                <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                </div>
                <span className="font-mono text-[10px] sm:text-[11px] text-gray-400 dark:text-gray-500">ecommerce-store.api</span>
            </div>
            {/* Catalog preview */}
            <div className="grid grid-cols-3 gap-2 py-2 sm:py-3">
                {[1, 2, 3].map(item => (
                    <div key={item} className="bg-gray-50 dark:bg-white/[0.04] rounded-lg p-2.5 border border-gray-100 dark:border-white/5 flex flex-col items-center">
                        <div className="w-9 h-9 rounded bg-indigo-50 dark:bg-white/5 flex items-center justify-center text-indigo-500 dark:text-cyan-400 mb-1.5">
                            <ShoppingCart size={16} />
                        </div>
                        <div className="w-12 h-1.5 bg-gray-200 dark:bg-white/10 rounded mb-1" />
                        <div className="w-8 h-1.5 bg-emerald-400/70 rounded" />
                    </div>
                ))}
            </div>
            {/* Badges */}
            <div className="flex items-center gap-2 pt-1 border-t border-gray-100 dark:border-white/5">
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-gray-100 dark:bg-white/5 text-gray-500 font-mono">React 19</span>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-gray-100 dark:bg-white/5 text-gray-500 font-mono">Laravel API</span>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-gray-100 dark:bg-white/5 text-gray-500 font-mono">PostgreSQL</span>
            </div>
        </div>
    );
}

/* ── Single Project Card matching Image 2 ────────────────────────── */
function ProjectCard({ project, index, total }) {
    const live = project.link && project.link !== '#';

    return (
        <ScrollStackItem itemClassName="relative overflow-hidden group">
            {/* 1. Inset screenshot container with hover interaction */}
            <div className="w-full aspect-[16/8.5] max-h-[190px] sm:max-h-[220px] rounded-xl sm:rounded-2xl overflow-hidden bg-white dark:bg-[#181818] p-1.5 sm:p-2 flex items-center justify-center border border-gray-200/80 dark:border-white/10 shadow-sm mb-3.5 sm:mb-4">
                <ProjectVisualMockup project={project} />
            </div>

            {/* 2. Project Title */}
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white leading-snug mb-1 tracking-tight">
                {project.title}
            </h3>

            {/* 3. Role */}
            <p className="text-[12.5px] sm:text-[13px] font-semibold text-gray-700 dark:text-gray-300 mb-2">
                {project.role}
            </p>

            {/* 4. Description in cyan */}
            <p className="text-[12.5px] sm:text-[13px] leading-relaxed text-cyan-600 dark:text-cyan-400 mb-3 sm:mb-3.5 line-clamp-3 sm:line-clamp-none">
                {project.description}
            </p>

            {/* 5. Tech Stack Icons row */}
            {project.tech && project.tech.length > 0 && (
                <div className="flex items-center gap-3 sm:gap-3.5 mb-3">
                    {project.tech.map(slug => (
                        <TechBadge key={slug} slug={slug} />
                    ))}
                </div>
            )}

            {/* 6. Thin Separator Line */}
            <div className="border-t border-gray-200 dark:border-white/[0.08] my-2.5 sm:my-3" />

            {/* 7. Bottom Row: Status dot + Outlined VISIT SITE CTA button matching Image 2 */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-mono text-[11px] text-gray-400 dark:text-gray-500">
                        {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                    </span>
                </div>

                <div>
                    {live ? (
                        <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 font-mono text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.14em] text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-white/20 rounded-lg px-3.5 py-1.5 hover:bg-gray-100 dark:hover:bg-white/10 hover:border-gray-400 dark:hover:border-white/40 hover:text-black dark:hover:text-white transition-all duration-200 no-underline shadow-sm hover:scale-[1.02] active:scale-[0.98] group/btn"
                        >
                            <span>{project.linkLabel || 'VISIT SITE'}</span>
                            <ArrowUpRight
                                size={13}
                                className="transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                            />
                        </a>
                    ) : (
                        <a
                            href="https://github.com/Gianssen"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 font-mono text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.14em] text-gray-400 dark:text-gray-400 border border-gray-200 dark:border-white/10 rounded-lg px-3.5 py-1.5 hover:border-gray-300 dark:hover:border-white/30 hover:text-gray-900 dark:hover:text-white transition-all duration-200 no-underline group/btn"
                        >
                            <span>{project.linkLabel || 'IN DEVELOPMENT'}</span>
                            <ArrowUpRight
                                size={13}
                                className="transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                            />
                        </a>
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

    // Calculate comfortable stack position below navbar
    const stackPositionVal = isMobile ? '72px' : isShortViewport ? '78px' : '88px';
    const itemDistanceVal = isMobile ? 180 : 220;

    return (
        <section id="projects" className="pt-20 sm:pt-28 pb-14 sm:pb-24 scroll-mt-24">
            {/* 
                Wider container width:
                Uses max-w-[680px] sm:max-w-[720px] w-full mx-auto as requested ("palakihin mo ng kaunti ung width ng stack project border")
            */}
            <div className="max-w-[680px] sm:max-w-[720px] mx-auto px-4 sm:px-6">

                {/* Clean Header matching Image 2 */}
                <ScrollReveal>
                    <div className="flex items-baseline justify-between mb-5 sm:mb-7">
                        <h2 className="font-serif text-[28px] sm:text-[34px] font-normal text-gray-900 dark:text-white tracking-tight">
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
                        itemScale={0.035}
                        itemStackDistance={14}
                        stackPosition={stackPositionVal}
                        scaleEndPosition="20px"
                        baseScale={0.94}
                        rotationAmount={0.5}
                        blurAmount={2}
                        onActiveIndexChange={setActiveIndex}
                    >
                        {projects.map((p, i) => (
                            <ProjectCard key={i} project={p} index={i} total={projects.length} />
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
        </section>
    );
}
