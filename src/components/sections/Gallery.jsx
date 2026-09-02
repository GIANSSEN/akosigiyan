import { useRef, useState, useCallback, useMemo } from 'react';
import {
    motion,
    useInView,
    useMotionValue,
    useSpring,
    useTransform,
    useReducedMotion,
    AnimatePresence,
} from 'framer-motion';
import ImageModal from '@/components/ui/ImageModal';

const ITEMS = [1, 2, 3, 4, 5, 6, 7, 8];
const MAX_SPREAD = 26; // deg of the outermost cards in the fan

export default function Gallery() {
    const [openIdx, setOpenIdx] = useState(null);
    const [activeIdx, setActiveIdx] = useState(null);
    const reduceMotion = useReducedMotion();
    const deckRef = useRef(null);
    const inView = useInView(deckRef, { once: true, margin: '0px 0px -60px 0px' });

    // Deck-level parallax (subtle tilt that follows the cursor)
    const mx = useMotionValue(0);
    const sx = useSpring(mx, { stiffness: 100, damping: 20, mass: 0.6 });
    const deckRotate = useTransform(sx, [-1, 1], [-3.5, 3.5]);
    const deckLift = useTransform(sx, [-1, 1], [4, -4]);

    const cards = useMemo(() => {
        const n = ITEMS.length;
        return ITEMS.map((item, i) => {
            const t = (i - (n - 1) / 2) / ((n - 1) / 2); // -1 … 1 across the deck
            return {
                item,
                i,
                angle: t * MAX_SPREAD,
                z: 30 - Math.round(Math.abs(t) * 10), // center cards stack on top
            };
        });
    }, []);

    const handleMove = useCallback(
        (e) => {
            if (reduceMotion) return;
            const rect = e.currentTarget.getBoundingClientRect();
            mx.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
        },
        [mx, reduceMotion]
    );

    const handleLeave = useCallback(() => {
        mx.set(0);
        setActiveIdx(null);
    }, [mx]);

    const close = useCallback(() => setOpenIdx(null), []);
    const prev  = useCallback(() => setOpenIdx((i) => (i - 1 + ITEMS.length) % ITEMS.length), []);
    const next  = useCallback(() => setOpenIdx((i) => (i + 1) % ITEMS.length), []);

    const current =
        openIdx === null
            ? null
            : {
                  src: `/gallery/item-${ITEMS[openIdx]}.jpg`,
                  alt: `Gallery photo ${openIdx + 1}`,
                  counter: `${openIdx + 1} / ${ITEMS.length}`,
              };

    const anyActive = activeIdx !== null;
    const spring = (snappy) =>
        reduceMotion
            ? { duration: 0.01 }
            : snappy
              ? { type: 'spring', stiffness: 260, damping: 24 }
              : { type: 'spring', stiffness: 110, damping: 15 };

    return (
        <section aria-label="Photo gallery" className="w-full py-6 select-none">
            {/* Header */}
            <div className="mb-2 flex items-center justify-center gap-2.5">
                <span className="flex w-5 h-5 shrink-0 items-center text-gray-700 dark:text-gray-300">
                    <svg fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                </span>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Gallery</h2>
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-[#1f1f1f] rounded-full px-2.5 py-1">
                    {ITEMS.length} moments
                </span>
            </div>

            {/* Fan deck */}
            <div
                ref={deckRef}
                onMouseMove={handleMove}
                onMouseLeave={handleLeave}
                className="relative flex h-[210px] items-end justify-center sm:h-[290px] lg:h-[330px]"
                style={{ perspective: '1200px' }}
            >
                <motion.div
                    style={{
                        rotate: deckRotate,
                        y: deckLift,
                        transformOrigin: '50% 100%',
                    }}
                    className="flex items-end justify-center"
                >
                    {cards.map(({ item, i, angle, z }) => {
                        const isActive = activeIdx === i;
                        const isNeighbor = !isActive && Math.abs(activeIdx - i) === 1;
                        const away = Math.sign(i - activeIdx);

                        const target = inView
                            ? {
                                  rotate: isActive ? 0 : isNeighbor ? angle + away * 6 : angle,
                                  y: isActive ? -32 : isNeighbor ? -12 : anyActive ? 6 : 0,
                                  scale: isActive ? 1.1 : isNeighbor ? 1.04 : anyActive ? 0.985 : 1,
                                  opacity: 1,
                                  zIndex: isActive ? 60 : isNeighbor ? 45 : z,
                              }
                            : { rotate: 0, y: 64, scale: 0.72, opacity: 0, zIndex: z };

                        return (
                            <motion.button
                                key={item}
                                type="button"
                                aria-label={`Open photo ${i + 1}`}
                                animate={target}
                                transition={anyActive || !inView ? spring(true) : { ...spring(false), delay: i * 0.055 }}
                                whileTap={{ scale: 0.96 }}
                                onClick={() => setOpenIdx(i)}
                                onFocus={() => setActiveIdx(i)}
                                onBlur={() => setActiveIdx((cur) => (cur === i ? null : cur))}
                                onMouseEnter={() => setActiveIdx(i)}
                                className="group relative block cursor-pointer rounded-xl outline-none"
                                style={{
                                    width: 'clamp(58px, 16vw, 148px)',
                                    marginLeft: i === 0 ? 0 : 'clamp(-56px, -7vw, -20px)',
                                    transformOrigin: '50% 130%',
                                    zIndex: z,
                                }}
                            >
                                <div
                                    className={`relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-gray-100 ring-1 transition-shadow duration-300 dark:bg-[#181818] ${
                                        isActive
                                            ? 'shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] ring-black/10 dark:ring-white/15'
                                            : 'shadow-[0_18px_40px_-12px_rgba(0,0,0,0.35)] ring-black/5 dark:ring-white/10'
                                    }`}
                                >
                                    <img
                                        src={`/gallery/item-${item}.jpg`}
                                        alt={`Gallery photo ${i + 1}`}
                                        loading="lazy"
                                        decoding="async"
                                        draggable={false}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />

                                    {/* Dim siblings while one is focused */}
                                    <motion.div
                                        aria-hidden
                                        animate={{ opacity: anyActive && !isActive ? 1 : 0 }}
                                        transition={{ duration: 0.25 }}
                                        className="absolute inset-0 bg-black/35"
                                    />

                                    {/* Hover caption + expand icon */}
                                    <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 via-transparent to-transparent p-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:p-3">
                                        <span className="text-[9px] font-black uppercase tracking-widest text-white sm:text-[11px]">
                                            Memory {String(item).padStart(2, '0')}
                                        </span>
                                    </div>
                                    <div className="absolute inset-0 grid place-items-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                        <span className="grid place-items-center w-8 h-8 rounded-full bg-white/90 text-gray-900 shadow-lg transition-transform duration-300 scale-75 group-hover:scale-100">
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            </motion.button>
                        );
                    })}
                </motion.div>
            </div>

            {/* Ground shadow */}
            <motion.div
                aria-hidden
                animate={{ opacity: anyActive ? 0.45 : 0.22, scaleX: anyActive ? 1.06 : 1 }}
                transition={{ duration: 0.3 }}
                className="mx-auto mt-1 h-5 w-[62%] rounded-[100%] bg-gray-400/50 blur-2xl dark:bg-black/80"
            />

            {/* Live caption */}
            <div className="mt-3 h-4 text-center" aria-live="polite">
                <AnimatePresence mode="wait">
                    <motion.span
                        key={activeIdx ?? 'hint'}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.16 }}
                        className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 sm:text-[11px]"
                    >
                        {activeIdx !== null
                            ? `Memory ${String(ITEMS[activeIdx]).padStart(2, '0')}`
                            : 'Hover to fan \u00b7 Click to view'}
                    </motion.span>
                </AnimatePresence>
            </div>

            <ImageModal {...(current ?? {})} onClose={close} onPrev={prev} onNext={next} />
        </section>
    );
}
