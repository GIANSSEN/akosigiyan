import { useToast } from '@/components/ui/Toast';

/**
 * ProjectCard — individual project card with glow ring, image scroll, "Coming Soon" toast.
 * Converts project-card.blade.php.
 */
export default function ProjectCard({ project }) {
    const { showToast } = useToast();
    const isSoon   = !project.link || project.link === '#';
    const hasImage = Boolean(project.image);

    function handleClick(e) {
        if (isSoon) {
            e.preventDefault();
            showToast('This project is currently in development. Link coming soon!');
        }
    }

    const glowGradient = isSoon
        ? 'from-amber-400 via-orange-400 to-yellow-400'
        : 'from-blue-500 via-indigo-500 to-cyan-400';

    return (
        <a
            href={isSoon ? undefined : project.link}
            onClick={handleClick}
            target={isSoon ? undefined : '_blank'}
            rel={isSoon ? undefined : 'noopener noreferrer'}
            className="project-link block h-full group outline-none relative"
        >
            {/* Animated glow ring */}
            <div className={`absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r ${glowGradient} blur-sm z-0`} />

            <div className="relative z-10 bg-[#f8f9fa] dark:bg-[#1a1a1a] rounded-xl p-4 flex flex-col items-center text-center h-full border border-transparent dark:border-white/5 group-hover:bg-white dark:group-hover:bg-[#222] group-hover:border-blue-500/20 group-hover:-translate-y-1.5 group-hover:shadow-2xl dark:group-hover:shadow-[0_16px_40px_rgba(0,0,0,0.6)] transition-all duration-300 overflow-hidden">

                {/* Image area */}
                <div className="w-full h-32 sm:h-36 mb-4 rounded-lg overflow-hidden relative border border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-[#141414]">
                    {hasImage ? (
                        <>
                            <img
                                src={project.image}
                                alt={project.title}
                                className="absolute inset-0 w-full h-full object-cover object-top transform group-hover:scale-105 group-hover:object-bottom transition-all duration-[4000ms] ease-in-out"
                            />
                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            {/* Slide-up CTA */}
                            {!isSoon && (
                                <div className="absolute inset-x-0 bottom-0 flex items-center justify-center pb-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-10">
                                    <span className="flex items-center gap-1.5 text-white text-[11px] font-black tracking-widest uppercase bg-blue-600/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg">
                                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                        Open Project
                                    </span>
                                </div>
                            )}
                        </>
                    ) : (
                        /* Placeholder */
                        <div className="w-full h-full flex flex-col items-center justify-center bg-gray-200/80 dark:bg-[#141414] text-gray-700 dark:text-white transition-colors duration-500">
                            <svg className="w-6 h-6 mb-1 text-gray-400 dark:text-gray-500 group-hover:text-blue-500 group-hover:-translate-y-1 opacity-80 group-hover:opacity-100 transition-all duration-300" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest opacity-60 group-hover:opacity-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all duration-300">
                                Project Workspace
                            </span>
                        </div>
                    )}

                    {/* Coming soon overlay */}
                    {isSoon && (
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 backdrop-blur-[0px] group-hover:backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
                            <span className="text-white font-bold tracking-wider text-sm bg-amber-500 px-3 py-1 rounded-full shadow-lg scale-90 group-hover:scale-100 transition-transform duration-300">
                                Coming Soon!
                            </span>
                        </div>
                    )}
                </div>

                {/* Title */}
                <h3 className="text-gray-900 dark:text-white font-bold text-[15px] mb-2 text-center group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                    {project.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 text-[12px] mb-5 flex-1 leading-relaxed font-medium text-center">
                    {project.description}
                </p>

                {/* Footer */}
                <div className="flex flex-col items-center justify-end w-full mt-auto gap-3">
                    {isSoon ? (
                        <>
                            <div className="text-[11px] bg-amber-100/50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 px-2.5 py-1 rounded inline-block font-bold border border-amber-200 dark:border-amber-800/50">
                                In Development
                            </div>
                            <div className="p-2 bg-gray-100 dark:bg-[#333] rounded-full transition-all duration-300 opacity-60">
                                <svg className="w-4 h-4 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </>
                    ) : (
                        <div className="text-[11px] bg-gray-100 dark:bg-[#2a2a2a] text-gray-600 dark:text-gray-400 px-3 py-1.5 rounded-full inline-block font-mono font-semibold group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 group-hover:text-blue-700 dark:group-hover:text-blue-300 border border-transparent group-hover:border-blue-200 dark:group-hover:border-blue-800/50 transition-all duration-300">
                            {project.url ?? 'View Project'}
                        </div>
                    )}
                </div>
            </div>
        </a>
    );
}
