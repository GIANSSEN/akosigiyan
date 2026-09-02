import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ZoomIn } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import ImageModal from '@/components/ui/ImageModal';
import { certifications } from '@/data/portfolioData';

export default function CertificationsNew() {
    const [modalIndex, setModalIndex] = useState(null);

    // Only certs that have an image can be viewed
    const viewableCerts = certifications.filter(c => c.image);

    const openModal = useCallback((cert) => {
        const idx = viewableCerts.findIndex(c => c.image === cert.image);
        if (idx !== -1) setModalIndex(idx);
    }, [viewableCerts]);

    const closeModal = () => setModalIndex(null);

    const goPrev = () => setModalIndex(i => (i - 1 + viewableCerts.length) % viewableCerts.length);
    const goNext = () => setModalIndex(i => (i + 1) % viewableCerts.length);

    const activeCert = modalIndex !== null ? viewableCerts[modalIndex] : null;

    return (
        <section id="certifications" className="py-12 scroll-mt-20">
            <div className="max-w-[780px] mx-auto px-4 sm:px-8">

                <ScrollReveal>
                    <div className="flex items-baseline justify-between mb-6 sm:mb-7">
                        <h2 className="font-serif text-[26px] sm:text-[30px] font-normal text-gray-900 dark:text-white">
                            Certifications
                        </h2>
                        <span className="text-[11.5px] font-medium text-gray-400 dark:text-gray-500 tabular-nums">
                            {certifications.length} earned
                        </span>
                    </div>
                </ScrollReveal>

                {/* Responsive Certification Card List — zero overlap on any screen */}
                <div className="flex flex-col gap-3 sm:gap-3.5">
                    {certifications.map((cert, i) => (
                        <motion.div
                            key={i}
                            className="group relative flex items-center justify-between gap-3 sm:gap-4 p-3 sm:p-4 rounded-2xl border border-gray-200/80 dark:border-white/[0.08] bg-white dark:bg-[#131313] hover:border-gray-300 dark:hover:border-white/20 transition-all duration-200 shadow-2xs"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-30px' }}
                            transition={{ duration: 0.4, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                        >
                            {/* Left: Thumbnail image with click-to-zoom */}
                            {cert.image && (
                                <button
                                    onClick={() => openModal(cert)}
                                    className="relative shrink-0 w-11 h-11 sm:w-13 sm:h-13 rounded-xl overflow-hidden border border-gray-200/80 dark:border-white/10 bg-gray-50 dark:bg-white/[0.02] hover:border-gray-400 dark:hover:border-white/30 transition-all duration-200 focus-ring group/thumb cursor-pointer"
                                    aria-label={`View certificate: ${cert.name}`}
                                    title="Click to view full certificate"
                                >
                                    <img
                                        src={cert.image}
                                        alt={cert.name}
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover/thumb:scale-105"
                                        loading="lazy"
                                        onError={e => { e.target.style.display = 'none'; }}
                                    />
                                    <span className="absolute inset-0 bg-black/35 opacity-0 group-hover/thumb:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                                        <ZoomIn size={16} className="text-white" />
                                    </span>
                                </button>
                            )}

                            {/* Center: Title + Issuer & Date Row */}
                            <div className="min-w-0 flex-1 pr-1">
                                {cert.image ? (
                                    <button
                                        onClick={() => openModal(cert)}
                                        className="text-[13px] sm:text-[14.5px] font-semibold text-gray-900 dark:text-white leading-snug text-left hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors focus-ring line-clamp-2 block break-words cursor-pointer"
                                    >
                                        {cert.name}
                                    </button>
                                ) : (
                                    <h3 className="text-[13px] sm:text-[14.5px] font-semibold text-gray-900 dark:text-white leading-snug line-clamp-2 break-words">
                                        {cert.name}
                                    </h3>
                                )}

                                <div className="flex items-center gap-1.5 text-[11.5px] sm:text-[12px] text-gray-500 dark:text-gray-400 mt-1 flex-wrap">
                                    <span className="truncate max-w-[150px] sm:max-w-none">{cert.issuer}</span>
                                    <span className="text-gray-300 dark:text-gray-600">·</span>
                                    <span className="font-mono text-gray-400 dark:text-gray-500 text-[11px] whitespace-nowrap">{cert.date}</span>
                                </div>
                            </div>

                            {/* Right: Outlined View Button */}
                            <div className="shrink-0">
                                {cert.image && (
                                    <button
                                        onClick={() => openModal(cert)}
                                        className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-xl border border-gray-200 dark:border-white/15 bg-gray-50 dark:bg-white/[0.04] text-[11px] sm:text-[12px] font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10 hover:border-gray-400 dark:hover:border-white/30 hover:text-black dark:hover:text-white transition-all shadow-2xs hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                                        aria-label={`View certificate ${cert.name}`}
                                    >
                                        <span>View</span>
                                        <ExternalLink size={11} />
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* ── Certificate viewer modal ── */}
            <ImageModal
                src={activeCert?.image || null}
                alt={activeCert?.name}
                onClose={closeModal}
                onPrev={viewableCerts.length > 1 ? goPrev : undefined}
                onNext={viewableCerts.length > 1 ? goNext : undefined}
                counter={modalIndex !== null ? `${modalIndex + 1} / ${viewableCerts.length}` : undefined}
            />
        </section>
    );
}
