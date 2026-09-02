import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import Magnet from '@/components/ui/Magnet';

const NAME = 'Gianssen G. Jasolin';

function AnimatedName() {
    return (
        <span
            className="inline-flex overflow-hidden font-extrabold text-gray-900 dark:text-gray-50 leading-tight tracking-tight whitespace-nowrap"
            style={{ fontSize: 'clamp(12px, 3.8vw, 26px)' }}
            aria-label={NAME}
        >
            {NAME.split('').map((ch, i) => (
                <motion.span
                    key={i}
                    aria-hidden="true"
                    className="inline-block whitespace-pre will-change-transform"
                    initial={{ y: '110%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 + i * 0.028, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                    {ch}
                </motion.span>
            ))}
        </span>
    );
}

export default function Hero() {
    const { isDark } = useTheme();
    const [isHovered, setIsHovered] = useState(false);

    // Profile image logic: 4 states = light/dark × normal/hover
    const profileSrc = (() => {
        if (isHovered) return isDark ? '/profile-dark-hover.png' : '/profile-hover.png';
        return isDark ? '/profile-dark.png' : '/profile-light.png';
    })();

    return (
        <div className="w-full mb-4 sm:mb-6 bg-white dark:bg-[#111111] rounded-2xl shadow-sm overflow-hidden transition-colors duration-300">
            <div className="flex items-stretch w-full">

                {/* ── LEFT: Profile photo ── */}
                <div
                    id="profile-wrapper"
                    className="relative shrink-0 overflow-hidden cursor-pointer bg-gray-200 dark:bg-gray-800"
                    style={{
                        width: 'clamp(110px,36%,260px)',
                        minHeight: 'clamp(180px,40vw,260px)',
                        transition: 'transform 0.3s ease',
                        transform: isHovered ? 'scale(1.02)' : 'scale(1)',
                    }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onTouchStart={() => setIsHovered((h) => !h)}
                >
                    {/* Fallback icon */}
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400" style={{ zIndex: 0 }}>
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <img
                        src={profileSrc}
                        alt="Gianssen G. Jasolin"
                        className="absolute inset-0 w-full h-full object-cover object-top"
                        style={{ zIndex: 1, transition: 'opacity 0.4s' }}
                    />
                </div>

                {/* ── RIGHT: Info column ── */}
                <div
                    className="flex-grow flex-1 min-w-0 flex flex-col justify-between relative"
                    style={{ padding: 'clamp(12px, 3.2vw, 24px)' }}
                >
                    {/* ── TOP: Name, location, role ── */}
                    <div className="flex flex-col gap-1 sm:gap-1.5">
                        {/* Name + verified badge */}
                        <div className="flex items-center gap-1.5 pr-[46px]">
                            <AnimatedName />
                            <motion.svg
                                className="shrink-0 text-[#1D9BF0]"
                                style={{ width: 'clamp(13px,3.8vw,22px)', height: 'clamp(13px,3.8vw,22px)', minWidth: '13px' }}
                                viewBox="0 0 24 24"
                                fill="none"
                                title="Verified"
                                initial={{ scale: 0, rotate: -90 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ delay: 0.85, type: 'spring', stiffness: 300, damping: 15 }}
                            >
                                <path d="M12 2L13.8 5.4L17.6 4.4L17.2 8.2L20.8 9.4L18.6 12.4L20.8 15.4L17.2 16.6L17.6 20.4L13.8 19.4L12 22.8L10.2 19.4L6.4 20.4L6.8 16.6L3.2 15.4L5.4 12.4L3.2 9.4L6.8 8.2L6.4 4.4L10.2 5.4L12 2Z" fill="#1D9BF0" />
                                <path d="M9.5 12.5L11 14L14.5 10.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                            </motion.svg>
                        </div>

                        {/* Location */}
                        <motion.div
                            className="flex items-center gap-1"
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.75, duration: 0.4 }}
                        >
                            <svg className="shrink-0 text-gray-400 dark:text-gray-500" style={{ width: 'clamp(11px,2.5vw,14px)', height: 'clamp(11px,2.5vw,14px)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="text-gray-500 dark:text-gray-400 font-semibold" style={{ fontSize: 'clamp(11px,2.5vw,14px)' }}>
                                Metro Manila, Philippines
                            </span>
                        </motion.div>

                        {/* Role — animated gradient text */}
                        <motion.div
                            className="font-bold leading-snug mt-0.5"
                            style={{ fontSize: 'clamp(12px,2.8vw,16px)' }}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.85, duration: 0.4 }}
                        >
                            <span className="animated-gradient-text">AI / Software Engineer / BSIT Student</span>
                        </motion.div>
                    </div>

                    {/* ── BOTTOM: Action buttons (magnetic) ── */}
                    <div className="flex items-center gap-2.5 mt-3 flex-wrap">
                        <Magnet strength={0.25}>
                            <Link
                                to="/resume"
                                className="inline-flex items-center gap-1.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold no-underline whitespace-nowrap transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5 shadow-sm hover:shadow-md border border-transparent group"
                                style={{ fontSize: 'clamp(11px,2.5vw,13px)', padding: 'clamp(8px,2vw,10px) clamp(14px,3vw,20px)', borderRadius: '6px' }}
                            >
                                <svg className="shrink-0 transition-transform duration-300 group-hover:scale-110" style={{ width: 'clamp(11px,2.5vw,14px)', height: 'clamp(11px,2.5vw,14px)' }} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                View Resume
                                <svg className="shrink-0 opacity-75 transition-transform duration-300 group-hover:translate-x-0.5" style={{ width: 'clamp(8px,1.8vw,11px)', height: 'clamp(8px,1.8vw,11px)' }} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </Magnet>

                        <Magnet strength={0.25}>
                            <a
                                href="mailto:jasolingianssen@gmail.com"
                                className="inline-flex items-center gap-1.5 bg-white hover:bg-gray-50 dark:bg-[#1a1a1a] dark:hover:bg-[#252525] text-gray-800 dark:text-gray-200 font-bold no-underline whitespace-nowrap transition-all duration-300 hover:-translate-y-0.5 border border-gray-200 dark:border-[#2a2a2a] shadow-sm hover:shadow-md"
                                style={{ fontSize: 'clamp(11px,2.5vw,13px)', padding: 'clamp(8px,2vw,10px) clamp(14px,3vw,20px)', borderRadius: '6px' }}
                            >
                                <svg className="shrink-0 text-gray-500 dark:text-gray-400" style={{ width: 'clamp(11px,2.5vw,13px)', height: 'clamp(11px,2.5vw,13px)' }} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                My Email
                            </a>
                        </Magnet>
                    </div>
                </div>
            </div>
        </div>
    );
}
