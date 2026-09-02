import { motion, useReducedMotion } from 'framer-motion';
import ScrollReveal from '@/components/ui/ScrollReveal';
import Stack from '@/components/ui/Stack';
import { hobbies } from '@/data/portfolioData';

const galleryImages = [
    '/gallery/item-1.jpg',
    '/gallery/item-2.jpg',
    '/gallery/item-3.jpg',
    '/gallery/item-4.jpg',
    '/gallery/item-5.jpg',
    '/gallery/item-6.jpg',
    '/gallery/item-7.jpg',
    '/gallery/item-8.jpg',
];

const galleryCards = galleryImages.map((src, i) => (
    <img
        key={i}
        src={src}
        alt={`Memory ${i + 1}`}
        style={{ width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none', userSelect: 'none' }}
        draggable={false}
        loading="lazy"
    />
));

export default function OutsideIDE() {
    const reduceMotion = useReducedMotion();

    return (
        <section className="py-12 scroll-mt-20">
            <div className="max-w-[780px] mx-auto px-5 sm:px-8">

                <ScrollReveal>
                    <h2 className="font-serif text-[26px] sm:text-[28px] font-normal text-gray-900 dark:text-white mb-7">
                        Outside the IDE
                    </h2>
                </ScrollReveal>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">

                    <ScrollReveal delay={0.04}>
                        <p className="text-[14px] leading-[1.85] text-gray-500 dark:text-gray-400 mb-5">
                            When I step away from the tech world, I recharge
                            through physical activity and travel, returning to my
                            projects with fresh energy and perspective.
                        </p>

                        <div className="flex flex-wrap gap-2">
                            {hobbies.map(h => (
                                <motion.span
                                    key={h}
                                    className="text-[12px] font-medium bg-gray-100 dark:bg-white/[0.06] text-gray-600 dark:text-gray-300 rounded-full px-3 py-1.5 cursor-default select-none hover:bg-gray-200 dark:hover:bg-white/[0.1] transition-colors duration-200"
                                    initial={reduceMotion ? {} : { opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                    whileHover={reduceMotion ? {} : { scale: 1.05 }}
                                >
                                    {h}
                                </motion.span>
                            ))}
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={0.08}>
                        <div className="flex justify-center sm:justify-end">
                            {/* Fluid size: 200px on small mobile → 240px on desktop */}
                            <div style={{ width: 'min(240px, 60vw)', height: 'min(280px, 70vw)', paddingBottom: 28 }}>
                                <Stack
                                    randomRotation={true}
                                    sensitivity={180}
                                    sendToBackOnClick={true}
                                    autoplay={true}
                                    autoplayDelay={3500}
                                    pauseOnHover={true}
                                    cards={galleryCards}
                                    animationConfig={{ stiffness: 280, damping: 22 }}
                                />
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
}
