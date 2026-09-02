import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { socialLinks, contactInfo } from '@/data/portfolioData';
import PixelTransition from '@/components/ui/PixelTransition';

/* ── Typewriter hook ─────────────────────────────────────────────── */
const ROLES = [
    'Full-Stack Developer',
    'React & Laravel Builder',
    'Gen AI Explorer',
    'Mobile App Craftsman',
    'Open Source Contributor',
];

function useTypewriter(words, { typingSpeed = 80, deletingSpeed = 40, pause = 1800 } = {}) {
    const [displayed, setDisplayed] = useState('');
    const [wordIdx, setWordIdx]     = useState(0);
    const [phase, setPhase]         = useState('typing'); // 'typing' | 'pausing' | 'deleting'

    useEffect(() => {
        const word = words[wordIdx];
        let timeout;

        if (phase === 'typing') {
            if (displayed.length < word.length) {
                timeout = setTimeout(
                    () => setDisplayed(word.slice(0, displayed.length + 1)),
                    typingSpeed
                );
            } else {
                timeout = setTimeout(() => setPhase('pausing'), pause);
            }
        } else if (phase === 'pausing') {
            setPhase('deleting');
        } else if (phase === 'deleting') {
            if (displayed.length > 0) {
                timeout = setTimeout(
                    () => setDisplayed(displayed.slice(0, -1)),
                    deletingSpeed
                );
            } else {
                setWordIdx((i) => (i + 1) % words.length);
                setPhase('typing');
            }
        }

        return () => clearTimeout(timeout);
    }, [displayed, phase, wordIdx, words, typingSpeed, deletingSpeed, pause]);

    return displayed;
}

/* ── Verified badge ──────────────────────────────────────────────── */
const VerifiedBadge = ({ className = "w-[18px] h-[18px] sm:w-[22px] sm:h-[22px]" }) => (
    <svg
        className={`shrink-0 ${className}`}
        viewBox="0 0 24 24"
        fill="none"
        title="Verified"
    >
        <path
            d="M12 2L13.8 5.4L17.6 4.4L17.2 8.2L20.8 9.4L18.6 12.4L20.8 15.4L17.2 16.6L17.6 20.4L13.8 19.4L12 22.8L10.2 19.4L6.4 20.4L6.8 16.6L3.2 15.4L5.4 12.4L3.2 9.4L6.8 8.2L6.4 4.4L10.2 5.4L12 2Z"
            fill="#3b82f6"
        />
        <path
            d="M9.5 12.5L11 14L14.5 10.5"
            stroke="white"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

/* ── Hero ────────────────────────────────────────────────────────── */
export default function HeroNew() {
    const { isDark } = useTheme();
    const reduceMotion = useReducedMotion();
    const typedRole = useTypewriter(ROLES);

    // Only GitHub, LinkedIn, Email (IG and Facebook removed)
    const socials = [
        { icon: <Github size={15} />,   href: socialLinks[1]?.href || '#', label: 'GitHub',   color: '#24292e', darkColor: '#e5e7eb' },
        { icon: <Linkedin size={15} />, href: socialLinks[0]?.href || '#', label: 'LinkedIn', color: '#0A66C2', darkColor: '#60a5fa' },
        { icon: <Mail size={15} />,     href: `mailto:${contactInfo.email}`, label: 'Email',  color: '#EA4335', darkColor: '#fca5a5' },
    ];

    const container = {
        hidden: {},
        show: { transition: { staggerChildren: 0.09 } },
    };
    const item = {
        hidden: reduceMotion ? {} : { opacity: 0, y: 16 },
        show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
    };

    return (
        <section className="relative pt-20 pb-12 sm:pt-24 sm:pb-16 lg:pt-28 lg:pb-20 scroll-mt-20 overflow-hidden">

            {/* ── Ambient glow blobs ─────────────────────────────────── */}
            {!reduceMotion && (
                <>
                    <div
                        aria-hidden="true"
                        className="hero-blob hero-blob-1 pointer-events-none select-none"
                    />
                    <div
                        aria-hidden="true"
                        className="hero-blob hero-blob-2 pointer-events-none select-none"
                    />
                </>
            )}

            <motion.div
                className="max-w-[880px] mx-auto px-5 sm:px-8 relative z-10"
                variants={container}
                initial="hidden"
                animate="show"
            >
                {/* ── Avatar + Identity row ─────────────────────────────── */}
                <motion.div
                    variants={item}
                    className="flex items-center gap-4 sm:gap-6 mb-7 sm:mb-9"
                >
                    {/* Avatar with solid black circular border & slightly zoomed photo */}
                    <div
                        className="relative shrink-0 rounded-full border-2 border-black dark:border-white p-[2px] bg-white dark:bg-[#0a0a0a] shadow-xs"
                        style={{
                            width:  'clamp(102px, 22vw, 144px)',
                            height: 'clamp(102px, 22vw, 144px)',
                        }}
                    >
                        <div className="w-full h-full rounded-full overflow-hidden">
                            <PixelTransition
                                firstContent={
                                    <img
                                        src="/profile-light.png"
                                        alt="Gianssen Jasolin"
                                        style={{
                                            width: '100%', height: '100%',
                                            objectFit: 'cover', objectPosition: 'center 15%',
                                            transform: 'scale(1.08)',
                                            pointerEvents: 'none', userSelect: 'none',
                                        }}
                                        draggable={false}
                                    />
                                }
                                secondContent={
                                    <img
                                        src="/profile-anime.jpg"
                                        alt="Gianssen alter ego"
                                        style={{
                                            width: '100%', height: '100%',
                                            objectFit: 'cover', objectPosition: 'center 15%',
                                            transform: 'scale(1.08)',
                                            pointerEvents: 'none', userSelect: 'none',
                                        }}
                                        draggable={false}
                                    />
                                }
                                gridSize={9}
                                pixelColor={isDark ? '#262626' : '#e5e7eb'}
                                animationStepDuration={0.38}
                                once={false}
                                aspectRatio="100%"
                                style={{
                                    width: '100%', height: '100%',
                                    borderRadius: '9999px',
                                }}
                            />
                        </div>
                    </div>

                    {/* Name + Title + Social icons */}
                    <div className="flex flex-col min-w-0 justify-center">
                        <div className="flex items-center gap-1.5 flex-nowrap whitespace-nowrap mb-1">
                            <h1 className="font-sans text-[20px] min-[360px]:text-[22px] sm:text-[28px] md:text-[32px] font-bold text-gray-900 dark:text-white tracking-tight leading-none truncate">
                                Gianssen Jasolin
                            </h1>
                            <VerifiedBadge />
                        </div>

                        {/* Social icon row */}
                        <div className="flex items-center gap-2 mt-1">
                            {socials.map((s) => (
                                <a
                                    key={s.label}
                                    href={s.href}
                                    target={s.href.startsWith('mailto:') ? '_self' : '_blank'}
                                    rel="noopener noreferrer"
                                    aria-label={s.label}
                                    className="p-1.5 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors duration-150 outline-none"
                                >
                                    {s.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* ── Headline with typewriter ──────────────────────────── */}
                <motion.div variants={item} className="mb-5 sm:mb-6">
                    <h2 className="text-[24px] sm:text-[30px] md:text-[36px] leading-[1.22] tracking-tight text-gray-900 dark:text-white font-bold font-sans">
                        <span>
                            {reduceMotion ? 'Full-Stack Developer' : typedRole}
                        </span>
                        {!reduceMotion && (
                            <span className="hero-cursor ml-[2px] inline-block w-[2.5px] h-[0.9em] bg-indigo-500 align-middle relative top-[-1px]" />
                        )}
                        <span className="block mt-1 font-light text-[17px] sm:text-[20px] md:text-[22px] text-gray-600 dark:text-gray-400">
                            React &nbsp;&amp;&nbsp; Laravel&nbsp; — &nbsp;Metro Manila, PH
                        </span>
                    </h2>
                </motion.div>

                {/* ── Bio paragraphs ── */}
                <motion.div variants={item} className="space-y-3 max-w-[700px] mb-8 text-[14.5px] sm:text-[15.5px] leading-[1.85] text-gray-600 dark:text-gray-300 font-normal">
                    <p>
                        I'm a full-stack developer. I build modern web &amp; mobile apps, and these days I'm focused on generative AI.
                    </p>
                    <p>
                        Right now I'm building cool new stuff every day. I love turning rough ideas into things people actually use.
                    </p>
                </motion.div>

                {/* ── CTA ── */}
                <motion.div variants={item} className="flex items-center gap-4 flex-wrap">
                    <Link
                        to="/resume"
                        className="inline-flex items-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg px-5 py-2.5 text-[13.5px] sm:text-[14px] font-semibold no-underline hover:opacity-90 active:scale-[0.97] transition-all duration-200 group shadow-sm"
                    >
                        View Resume
                        <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
                    </Link>
                </motion.div>
            </motion.div>
        </section>
    );
}
