import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Github, Facebook, Instagram, Mail, ArrowRight } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { heroChips, socialLinks, contactInfo } from '@/data/portfolioData';

const VerifiedBadge = () => (
    <svg
        className="shrink-0"
        style={{ width: 20, height: 20 }}
        viewBox="0 0 24 24"
        fill="none"
        title="Verified"
    >
        <path
            d="M12 2L13.8 5.4L17.6 4.4L17.2 8.2L20.8 9.4L18.6 12.4L20.8 15.4L17.2 16.6L17.6 20.4L13.8 19.4L12 22.8L10.2 19.4L6.4 20.4L6.8 16.6L3.2 15.4L5.4 12.4L3.2 9.4L6.8 8.2L6.4 4.4L10.2 5.4L12 2Z"
            fill="#1D9BF0"
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

const Chip = ({ name, color }) => (
    <span className="inline-flex items-center gap-1.5 align-[2px] border border-gray-200 dark:border-white/10 bg-white dark:bg-white/[0.04] rounded-md px-1.5 py-[2.5px] mx-[3px] text-[12px] font-semibold text-gray-700 dark:text-gray-300 shadow-sm whitespace-nowrap">
        <span className="w-[7px] h-[7px] rounded-full shrink-0" style={{ backgroundColor: color }} />
        {name}
    </span>
);

export default function Hero() {
    const { isDark } = useTheme();
    const [hovered, setHovered] = useState(false);

    const profileSrc = hovered
        ? (isDark ? '/profile-dark-hover.png' : '/profile-hover.png')
        : (isDark ? '/profile-dark.png' : '/profile-light.png');

    const socials = [
        { icon: <Github size={17} />, href: socialLinks[1].href, label: 'GitHub' },
        { icon: <Facebook size={17} />, href: socialLinks[2].href, label: 'Facebook' },
        { icon: <Instagram size={17} />, href: socialLinks[3].href, label: 'Instagram' },
        { icon: <Mail size={17} />, href: `mailto:${contactInfo.email}`, label: 'Email' },
    ];

    return (
        <section className="pt-28 sm:pt-32 pb-14">
            {/* Photo + name + socials */}
            <div className="flex items-center gap-5">
                <img
                    src={profileSrc}
                    alt="Gianssen G. Jasolin"
                    className="w-[96px] h-[96px] sm:w-[120px] sm:h-[120px] rounded-full object-cover object-top shrink-0 cursor-pointer"
                    style={{ transition: 'transform 0.3s ease' }}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                />
                <div className="min-w-0">
                    <div className="flex items-center gap-2">
                        <h1 className="text-[24px] sm:text-[28px] font-bold tracking-tight text-gray-900 dark:text-white leading-tight">
                            Gianssen G. Jasolin
                        </h1>
                        <VerifiedBadge />
                    </div>
                    <div className="flex items-center gap-3.5 mt-2 text-gray-400 dark:text-gray-500">
                        {socials.map(s => (
                            <a
                                key={s.label}
                                href={s.href}
                                target={s.href.startsWith('http') ? '_blank' : undefined}
                                rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                aria-label={s.label}
                                className="hover:text-gray-900 dark:hover:text-white transition-colors"
                            >
                                {s.icon}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Headline */}
            <h2 className="mt-8 text-[26px] sm:text-[32px] font-bold tracking-tight leading-snug text-gray-900 dark:text-white">
                AI / Software Engineer
                <span className="text-gray-400 dark:text-gray-500"> — Full-Stack &amp; AI</span>
            </h2>

            {/* Bio */}
            <div className="mt-4 space-y-2 text-[14.5px] leading-[1.85] text-gray-600 dark:text-gray-400 max-w-2xl">
                <p>
                    I'm a full-stack developer. I build modern web &amp; mobile apps, and these days I'm focused on generative AI.
                </p>
                <p>
                    Right now I'm building cool new stuff every day. I love turning rough ideas into things people actually use.
                </p>
            </div>

            {/* CTA */}
            <Link
                to="/resume"
                className="group mt-7 inline-flex items-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg px-5 h-10 text-[13px] font-bold no-underline hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200"
            >
                View Resume
                <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
        </section>
    );
}
