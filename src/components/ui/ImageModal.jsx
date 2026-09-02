import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';

/**
 * ImageModal — fullscreen image viewer with optional gallery navigation.
 * Escape closes; ArrowLeft/ArrowRight navigate when onPrev/onNext are provided.
 * Click-outside dismiss. Body scroll locked while open.
 */
export default function ImageModal({ src, alt = 'Image', onClose, onPrev, onNext, counter }) {
    const isOpen = Boolean(src);

    const handleClose = useCallback(() => {
        onClose?.();
    }, [onClose]);

    useEffect(() => {
        if (!isOpen) return;
        const handler = (e) => {
            if (e.key === 'Escape') handleClose();
            else if (e.key === 'ArrowLeft') onPrev?.();
            else if (e.key === 'ArrowRight') onNext?.();
        };
        document.addEventListener('keydown', handler);
        return () => document.removeEventListener('keydown', handler);
    }, [isOpen, handleClose, onPrev, onNext]);

    // Lock body scroll while open
    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    if (!isOpen) return null;

    const stop = (e) => e.stopPropagation();

    return createPortal(
        <div
            id="image-modal"
            role="dialog"
            aria-modal="true"
            aria-label={alt}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/85 px-4 py-4 backdrop-blur-md select-none"
            onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
        >
            {counter && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-bold text-white/90 backdrop-blur-sm">
                    {counter}
                </div>
            )}

            <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-10 rounded-full border border-white/10 bg-black/50 p-2.5 text-white transition-all hover:bg-black/80 touch-manipulation"
                aria-label="Close"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            {onPrev && (
                <button
                    onClick={(e) => { stop(e); onPrev(); }}
                    aria-label="Previous image"
                    className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-10 grid place-items-center w-11 h-11 rounded-full border border-white/10 bg-black/50 text-white transition-all hover:bg-black/80 hover:scale-105 touch-manipulation"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
            )}

            {onNext && (
                <button
                    onClick={(e) => { stop(e); onNext(); }}
                    aria-label="Next image"
                    className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-10 grid place-items-center w-11 h-11 rounded-full border border-white/10 bg-black/50 text-white transition-all hover:bg-black/80 hover:scale-105 touch-manipulation"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            )}

            {/* key={src} re-triggers the entrance animation per photo */}
            <img
                key={src}
                src={src}
                alt={alt}
                draggable={false}
                onClick={stop}
                className="max-w-full max-h-[82svh] rounded-lg object-contain shadow-2xl border border-white/10"
                style={{ animation: 'scaleIn 0.25s cubic-bezier(0.22,1,0.36,1) both' }}
            />

            <style>{`
                @keyframes scaleIn {
                    from { opacity: 0; transform: scale(0.92); }
                    to   { opacity: 1; transform: scale(1); }
                }
            `}</style>
        </div>,
        document.body
    );
}
