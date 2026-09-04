import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, ShieldCheck, ChevronLeft, ChevronRight, X, ArrowUpRight, Award } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { certifications } from '@/data/portfolioData';

export default function CertificationsNew() {
    const [selectedCertIndex, setSelectedCertIndex] = useState(null);

    const openModal = useCallback((index) => {
        setSelectedCertIndex(index);
    }, []);

    const closeModal = useCallback(() => {
        setSelectedCertIndex(null);
    }, []);

    const goPrev = useCallback((e) => {
        e?.stopPropagation();
        setSelectedCertIndex(i => (i - 1 + certifications.length) % certifications.length);
    }, []);

    const goNext = useCallback((e) => {
        e?.stopPropagation();
        setSelectedCertIndex(i => (i + 1) % certifications.length);
    }, []);

    const currentCert = selectedCertIndex !== null ? certifications[selectedCertIndex] : null;

    return (
        <section id="certifications" className="py-12 sm:py-16 scroll-mt-20">
            <div className="max-w-[780px] mx-auto px-4 sm:px-8">

                {/* ── Section Header ── */}
                <ScrollReveal>
                    <div className="flex items-baseline justify-between mb-6 sm:mb-8">
                        <div>
                            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400 block mb-1">
                                Credentials &amp; Honors
                            </span>
                            <h2 className="font-serif text-[26px] sm:text-[32px] font-normal text-gray-900 dark:text-white tracking-tight">
                                Certifications
                            </h2>
                        </div>

                        {/* Minimalist Verified Counter Pill */}
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-gray-200/80 dark:border-white/10 bg-gray-50 dark:bg-white/[0.03] text-[11px] font-medium text-gray-500 dark:text-gray-400">
                            <ShieldCheck size={13} className="text-emerald-500 shrink-0" />
                            <span className="tabular-nums font-semibold text-gray-700 dark:text-gray-300">
                                {certifications.length}
                            </span>
                            <span>verified</span>
                        </div>
                    </div>
                </ScrollReveal>

                {/* ── Certifications Card List ── */}
                <div className="flex flex-col gap-3.5 sm:gap-4">
                    {certifications.map((cert, i) => (
                        <motion.div
                            key={cert.name}
                            className="group relative flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 sm:gap-4 p-3.5 sm:p-4 rounded-2xl border border-gray-200/80 dark:border-white/[0.08] bg-white dark:bg-[#121212] hover:border-gray-300 dark:hover:border-white/20 transition-all duration-200 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.04)] dark:shadow-none hover:shadow-[0_8px_24px_-8px_rgba(0,0,0,0.08)] cursor-pointer"
                            onClick={() => openModal(i)}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-30px' }}
                            transition={{ duration: 0.45, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                        >
                            {/* Main row: Thumbnail + Details */}
                            <div className="flex items-start sm:items-center gap-3 sm:gap-4 min-w-0 flex-1">
                                
                                {/* Certificate Thumbnail with Click-to-Zoom Hint */}
                                <div
                                    className="relative shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border border-gray-200/80 dark:border-white/10 bg-gray-50 dark:bg-white/[0.02] shadow-2xs group-hover:border-cyan-500/40 transition-all duration-200"
                                    title={`Click to inspect ${cert.name}`}
                                >
                                    <img
                                        src={cert.image}
                                        alt={cert.name}
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                        loading="lazy"
                                        onError={e => { e.target.style.display = 'none'; }}
                                    />
                                    <span className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                                        <Maximize2 size={15} className="text-white" />
                                    </span>
                                </div>

                                {/* Text Details */}
                                <div className="min-w-0 flex-1">
                                    {/* Category & Status Badge */}
                                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                                        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 dark:bg-cyan-400/10 px-2 py-0.5 rounded-md border border-cyan-500/20 dark:border-cyan-400/20">
                                            {cert.category || 'Credential'}
                                        </span>
                                        {cert.credentialType && (
                                            <span className="font-mono text-[9.5px] font-semibold text-gray-500 dark:text-gray-400 hidden min-[400px]:inline">
                                                {cert.credentialType}
                                            </span>
                                        )}
                                    </div>

                                    {/* Certificate Title */}
                                    <h3 className="text-[13.5px] sm:text-[15px] font-bold text-gray-900 dark:text-white leading-snug tracking-tight group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                                        {cert.name}
                                    </h3>

                                    {/* Issuer & Date Metadata */}
                                    <div className="flex items-center gap-2 mt-1 text-[11.5px] sm:text-[12px] text-gray-500 dark:text-gray-400">
                                        <span className="font-semibold text-gray-700 dark:text-gray-300">
                                            {cert.issuer}
                                        </span>
                                        <span className="text-gray-300 dark:text-gray-600 select-none">&bull;</span>
                                        <span className="font-mono text-[11px] text-gray-400 dark:text-gray-500 tabular-nums">
                                            {cert.date}
                                        </span>
                                    </div>

                                    {/* Competency Skills Tags */}
                                    {cert.skills && cert.skills.length > 0 && (
                                        <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                                            {cert.skills.map(skill => (
                                                <span
                                                    key={skill}
                                                    className="text-[10px] sm:text-[10.5px] font-medium text-gray-600 dark:text-gray-300 bg-gray-100/90 dark:bg-white/[0.06] rounded-md px-2 py-0.5 border border-gray-200/50 dark:border-white/[0.04]"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Right / Bottom Action: Minimalist Inspect Trigger */}
                            <div className="flex items-center justify-end sm:justify-center shrink-0 pt-1 sm:pt-0 border-t sm:border-t-0 border-gray-100 dark:border-white/[0.04]">
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        openModal(i);
                                    }}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3 sm:py-2 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50/80 dark:bg-white/[0.03] text-gray-700 dark:text-gray-200 group-hover:bg-cyan-50 dark:group-hover:bg-cyan-500/10 group-hover:border-cyan-500/30 group-hover:text-cyan-700 dark:group-hover:text-cyan-300 text-[11px] sm:text-[11.5px] font-semibold transition-all duration-200 shadow-2xs group/btn cursor-pointer"
                                    aria-label={`Inspect certificate: ${cert.name}`}
                                >
                                    <Maximize2 size={12} className="text-gray-400 dark:text-gray-400 group-hover:text-cyan-500 transition-colors" />
                                    <span>Inspect</span>
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* ── High-Fidelity Certificate Inspector Modal ── */}
            <AnimatePresence>
                {currentCert && (
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-label={`Certificate Details: ${currentCert.name}`}
                        className="fixed inset-0 z-[75] flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md"
                        onClick={closeModal}
                    >
                        <motion.div
                            className="relative w-full max-w-[640px] max-h-[92vh] flex flex-col rounded-2xl sm:rounded-3xl border border-gray-200/90 dark:border-white/15 bg-white dark:bg-[#141414] shadow-2xl overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                            initial={{ opacity: 0, scale: 0.94, y: 15 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.94, y: 15 }}
                            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        >
                            {/* Modal Header Bar */}
                            <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-gray-100 dark:border-white/[0.08] bg-gray-50/70 dark:bg-white/[0.02]">
                                <div className="flex items-center gap-2">
                                    <Award size={16} className="text-cyan-500" />
                                    <span className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-gray-500 dark:text-gray-400">
                                        Certificate {selectedCertIndex + 1} of {certifications.length}
                                    </span>
                                </div>

                                <div className="flex items-center gap-1.5">
                                    {certifications.length > 1 && (
                                        <>
                                            <button
                                                onClick={goPrev}
                                                className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-200/70 dark:hover:bg-white/10 transition-colors cursor-pointer"
                                                aria-label="Previous certificate"
                                                title="Previous certificate"
                                            >
                                                <ChevronLeft size={16} />
                                            </button>
                                            <button
                                                onClick={goNext}
                                                className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-200/70 dark:hover:bg-white/10 transition-colors cursor-pointer"
                                                aria-label="Next certificate"
                                                title="Next certificate"
                                            >
                                                <ChevronRight size={16} />
                                            </button>
                                            <div className="w-px h-4 bg-gray-200 dark:bg-white/10 mx-1" />
                                        </>
                                    )}

                                    <button
                                        onClick={closeModal}
                                        className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-200/70 dark:hover:bg-white/10 transition-colors cursor-pointer"
                                        aria-label="Close modal"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            </div>

                            {/* Modal Content — Scrollable Body */}
                            <div className="overflow-y-auto p-4 sm:p-6 space-y-4">
                                {/* Certificate High-Res Image Container */}
                                <div className="w-full aspect-[4/3] sm:aspect-[16/10] rounded-xl overflow-hidden border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#0a0a0a] flex items-center justify-center shadow-inner relative group/image">
                                    <img
                                        src={currentCert.image}
                                        alt={currentCert.name}
                                        className="w-full h-full object-contain p-2"
                                    />
                                    <a
                                        href={currentCert.image}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/75 hover:bg-black text-white text-[11px] font-mono font-medium backdrop-blur-sm opacity-0 group-hover/image:opacity-100 transition-opacity no-underline shadow-md"
                                    >
                                        <span>Full Image</span>
                                        <ArrowUpRight size={12} />
                                    </a>
                                </div>

                                {/* Information Block */}
                                <div>
                                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                                        <span className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/20">
                                            {currentCert.category || 'Credential'}
                                        </span>
                                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                                            <ShieldCheck size={12} />
                                            Verified Issuer
                                        </span>
                                    </div>

                                    <h4 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white leading-snug">
                                        {currentCert.name}
                                    </h4>

                                    <p className="text-[12.5px] font-semibold text-gray-600 dark:text-gray-300 mt-1">
                                        Issued by {currentCert.issuer} &bull; <span className="font-mono text-[12px] text-gray-400">{currentCert.date}</span>
                                    </p>

                                    {currentCert.description && (
                                        <p className="text-[13px] text-gray-600 dark:text-gray-400 leading-relaxed mt-2.5">
                                            {currentCert.description}
                                        </p>
                                    )}

                                    {currentCert.skills && currentCert.skills.length > 0 && (
                                        <div className="mt-3.5 pt-3 border-t border-gray-100 dark:border-white/[0.06]">
                                            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-gray-400 dark:text-gray-500 block mb-2">
                                                Verified Competencies:
                                            </span>
                                            <div className="flex items-center gap-1.5 flex-wrap">
                                                {currentCert.skills.map(s => (
                                                    <span
                                                        key={s}
                                                        className="text-[11px] font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-white/[0.06] rounded-md px-2.5 py-1 border border-gray-200/70 dark:border-white/10"
                                                    >
                                                        {s}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
