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
            <div className="max-w-[780px] mx-auto px-5 sm:px-8">

                <ScrollReveal>
                    <div className="flex items-baseline justify-between mb-7">
                        <h2 className="font-serif text-[26px] sm:text-[28px] font-normal text-gray-900 dark:text-white">
                            Certifications
                        </h2>
                        <span className="text-[11.5px] font-medium text-gray-400 dark:text-gray-500 tabular-nums">
                            {certifications.length} earned
                        </span>
                    </div>
                </ScrollReveal>

                <div className="flex flex-col">
                    {certifications.map((cert, i) => (
                        <motion.div
                            key={i}
                            className="group flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 py-4 border-t border-gray-100 dark:border-white/[0.06] first:border-t-0"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-40px' }}
                            transition={{ duration: 0.45, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                        >
                            {/* Thumbnail — click to view */}
                            {cert.image && (
                                <button
                                    onClick={() => openModal(cert)}
                                    className="relative shrink-0 w-14 h-14 sm:w-[58px] sm:h-[58px] rounded-xl overflow-hidden border border-gray-100 dark:border-white/[0.07] bg-gray-50 dark:bg-white/[0.02] hover:border-gray-300 dark:hover:border-white/20 transition-all duration-200 focus-ring group/thumb"
                                    aria-label={`View certificate: ${cert.name}`}
                                    title="Click to view certificate"
                                >
                                    <img
                                        src={cert.image}
                                        alt={cert.name}
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover/thumb:scale-105"
                                        loading="lazy"
                                        onError={e => { e.target.style.display = 'none'; }}
                                    />
                                    {/* Hover overlay */}
                                    <span className="absolute inset-0 bg-black/30 opacity-0 group-hover/thumb:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                                        <ZoomIn size={18} className="text-white" />
                                    </span>
                                </button>
                            )}

                            {/* Meta */}
                            <div className="flex-1 min-w-0">
                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-3">
                                    <div className="min-w-0">
                                        {/* Title — click to view if has image, link to verify if has url */}
                                        {cert.image ? (
                                            <button
                                                onClick={() => openModal(cert)}
                                                className="text-[14px] font-semibold text-gray-900 dark:text-white leading-snug text-left hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors focus-ring"
                                            >
                                                {cert.name}
                                            </button>
                                        ) : (
                                            <h3 className="text-[14px] font-semibold text-gray-900 dark:text-white leading-snug">
                                                {cert.name}
                                            </h3>
                                        )}

                                        <p className="text-[12.5px] text-gray-500 dark:text-gray-400 mt-0.5">
                                            {cert.issuer}
                                        </p>
                                    </div>

                                    {/* Right: date + view button */}
                                    <div className="flex items-center gap-2 shrink-0">
                                        <span className="text-[11.5px] font-medium text-gray-400 dark:text-gray-500 tabular-nums whitespace-nowrap">
                                            {cert.date}
                                        </span>

                                        {cert.image && (
                                            <button
                                                onClick={() => openModal(cert)}
                                                className="inline-flex items-center gap-1 text-[11.5px] font-medium text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors focus-ring opacity-0 group-hover:opacity-100"
                                                aria-label={`View ${cert.name}`}
                                            >
                                                View
                                                <ExternalLink size={11} />
                                            </button>
                                        )}
                                    </div>
                                </div>
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
