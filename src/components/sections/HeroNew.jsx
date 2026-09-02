import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
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
    const [phase, setPhase]         = useState('typing');

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

/* ── Twitter/X Blue Verified Badge ──────────────────────────────── */
const VerifiedBadge = ({ className = "w-[18px] h-[18px] sm:w-[22px] sm:h-[22px]" }) => (
    <svg
        className={`shrink-0 ${className}`}
        viewBox="0 0 24 24"
        fill="none"
        aria-label="Verified"
    >
        <path
            d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.79-4-4-4-.495 0-.965.084-1.4.238C14.55 2.475 13.18 1.6 11.6 1.6s-2.95.875-3.6 2.148c-.435-.154-.905-.238-1.4-.238-2.21 0-4 1.79-4 4 0 .495.084.965.238 1.4C1.575 9.55.7 10.92.7 12.5s.875 2.95 2.148 3.6c-.154.435-.238.905-.238 1.4 0 2.21 1.79 4 4 4 .495 0 .965-.084 1.4-.238.65 1.273 2.02 2.148 3.6 2.148s2.95-.875 3.6-2.148c.435.154.905.238 1.4.238 2.21 0 4-1.79 4-4 0-.495-.084-.965-.238-1.4 1.273-.65 2.148-2.02 2.148-3.6z"
            fill="#1d9bf0"
        />
        <path
            d="M10.2 16.2l-3.6-3.6 1.4-1.4 2.2 2.2 5.6-5.6 1.4 1.4-7 7z"
            fill="#ffffff"
        />
    </svg>
);

/* ── Clean Filled Social Icons ───────────────────────────────────── */
const GithubIcon = () => (
    <svg className="w-[18px] h-[18px] sm:w-[20px] sm:h-[20px] fill-current" viewBox="0 0 24 24">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
);

const LinkedinIcon = () => (
    <svg className="w-[17px] h-[17px] sm:w-[19px] sm:h-[19px] fill-current" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
);

const MailIcon = () => (
    <svg className="w-[18px] h-[18px] sm:w-[20px] sm:h-[20px] fill-current" viewBox="0 0 24 24">
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
);

/* ── Hero ────────────────────────────────────────────────────────── */
export default function HeroNew() {
    const { isDark } = useTheme();
    const reduceMotion = useReducedMotion();
    const typedRole = useTypewriter(ROLES);

    const socials = [
        { icon: <GithubIcon />,   href: socialLinks[1]?.href || 'https://github.com/Gianssen', label: 'GitHub' },
        { icon: <LinkedinIcon />, href: socialLinks[0]?.href || 'https://www.linkedin.com/in/gianssen-jasolin/', label: 'LinkedIn' },
        { icon: <MailIcon />,     href: `mailto:${contactInfo.email}`, label: 'Email' },
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
                {/* ── Avatar + Identity row — EXACT match to reference layout ── */}
                <motion.div
                    variants={item}
                    className="flex items-center gap-4 sm:gap-6 mb-7 sm:mb-9"
                >
                    {/* Avatar Circle */}
                    <div className="relative shrink-0 w-[84px] h-[84px] sm:w-[98px] sm:h-[98px] md:w-[108px] md:h-[108px] rounded-full border-2 border-black dark:border-white p-[2px] bg-white dark:bg-[#0a0a0a] shadow-xs">
                        <div className="w-full h-full rounded-full overflow-hidden">
                            <PixelTransition
                                firstContent={
                                    <img
                                        src="/profile-light.png"
                                        alt="Gianssen Jasolin"
                                        style={{
                                            width: '100%', height: '100%',
                                            objectFit: 'cover', objectPosition: 'center 15%',
                                            transform: 'scale(1.12)',
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
                                            transform: 'scale(1.12)',
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

                    {/* Name + Verified Badge on 1 SINGLE LINE + Social Icons underneath */}
                    <div className="flex flex-col justify-center min-w-0">
                        <div className="flex items-center gap-2 flex-nowrap whitespace-nowrap">
                            <h1 className="text-[20px] min-[360px]:text-[22px] sm:text-[26px] md:text-[30px] font-bold text-gray-900 dark:text-white tracking-tight leading-none whitespace-nowrap">
                                Gianssen Jasolin
                            </h1>
                            <VerifiedBadge className="w-[18px] h-[18px] min-[360px]:w-[20px] min-[360px]:h-[20px] sm:w-[24px] sm:h-[24px]" />
                        </div>

                        {/* Social Icons row */}
                        <div className="flex items-center gap-3 mt-2 text-gray-700 dark:text-gray-300">
                            {socials.map((s) => (
                                <a
                                    key={s.label}
                                    href={s.href}
                                    target={s.href.startsWith('mailto:') ? '_self' : '_blank'}
                                    rel="noopener noreferrer"
                                    aria-label={s.label}
                                    className="hover:text-black dark:hover:text-white transition-colors duration-150 outline-none"
                                >
                                    {s.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* ── Headline with typewriter ──────────────────────────── */}
                <motion.div variants={item} className="mb-5 sm:mb-6">
                    <h2 className="text-[22px] sm:text-[28px] md:text-[34px] leading-[1.22] tracking-tight text-gray-900 dark:text-white font-bold font-sans">
                        <span>
                            {reduceMotion ? 'Full-Stack Developer' : typedRole}
                        </span>
                        {!reduceMotion && (
                            <span className="hero-cursor ml-[2px] inline-block w-[2.5px] h-[0.9em] bg-indigo-500 align-middle relative top-[-1px]" />
                        )}
                        <span className="block mt-1 font-light text-[16px] sm:text-[19px] md:text-[21px] text-gray-600 dark:text-gray-400">
                            React &nbsp;&amp;&nbsp; Laravel&nbsp; — &nbsp;Metro Manila, PH
                        </span>
                    </h2>
                </motion.div>

                {/* ── Bio paragraphs ── */}
                <motion.div variants={item} className="space-y-3 max-w-[700px] mb-8 text-[14px] sm:text-[15px] leading-[1.8] text-gray-600 dark:text-gray-300 font-normal">
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
