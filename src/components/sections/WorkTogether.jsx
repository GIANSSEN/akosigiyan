import { Mail, Calendar, ChevronRight, Copy, Check } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { useToast } from '@/components/ui/Toast';
import { contactInfo } from '@/data/portfolioData';

/* ── Letter-by-letter animated heading ──────────────────────────── */
function AnimatedHeading({ text, className }) {
    const reduceMotion = useReducedMotion();

    if (reduceMotion) {
        return <h2 className={className}>{text}</h2>;
    }

    return (
        <h2 className={className} aria-label={text}>
            {text.split('').map((ch, i) => (
                <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                        duration: 0.4,
                        delay: 0.02 + i * 0.022,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    style={{ display: ch === ' ' ? 'inline' : 'inline-block' }}
                >
                    {ch === ' ' ? '\u00A0' : ch}
                </motion.span>
            ))}
        </h2>
    );
}

/* ── Email copy button ───────────────────────────────────────────── */
function CopyEmailButton({ email }) {
    const { showToast }  = useToast();
    const [copied, setCopied] = useState(false);
    const reduceMotion   = useReducedMotion();

    const handleCopy = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            await navigator.clipboard.writeText(email);
            setCopied(true);
            showToast('Email copied to clipboard!');
            setTimeout(() => setCopied(false), 2000);
        } catch {
            showToast('Could not copy — please copy manually.');
        }
    };

    return (
        <motion.button
            onClick={handleCopy}
            aria-label="Copy email address"
            className="shrink-0 w-7 h-7 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-white/[0.06] text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-colors focus-ring"
            whileHover={reduceMotion ? {} : { scale: 1.1 }}
            whileTap={reduceMotion ? {} : { scale: 0.9 }}
        >
            {copied
                ? <Check size={13} className="text-green-500" />
                : <Copy size={13} />
            }
        </motion.button>
    );
}

/* ── Single contact card ─────────────────────────────────────────── */
function ContactCard({ card, index }) {
    const reduceMotion = useReducedMotion();
    const isEmail = card.isEmail;

    return (
        <motion.div
            className="contact-card group relative flex items-center gap-4 border border-gray-200 dark:border-white/[0.08] rounded-2xl px-5 py-4 bg-white dark:bg-white/[0.01] overflow-hidden"
            whileHover={reduceMotion ? {} : {
                y: -2,
                borderColor: index === 0 ? 'rgba(99,102,241,0.4)' : 'rgba(6,182,212,0.4)',
                boxShadow: `0 8px 30px ${card.glowColor}, 0 0 0 1px ${card.glowColor}`,
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        >
            {/* Radial glow layer */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                style={{ background: `radial-gradient(circle at 30% 50%, ${card.glowColor}, transparent 70%)` }}
                aria-hidden="true"
            />

            {/* Icon */}
            <span className="w-10 h-10 shrink-0 rounded-xl bg-gray-100 dark:bg-white/[0.06] flex items-center justify-center text-gray-500 dark:text-gray-400 group-hover:bg-gray-200 dark:group-hover:bg-white/[0.1] transition-colors duration-200 z-10 relative">
                {card.icon}
            </span>

            {/* Label + value — whole left area is a real link */}
            <a
                href={card.href}
                {...(card.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="min-w-0 flex-1 z-10 relative no-underline focus-ring rounded-lg"
                aria-label={`${card.label}: ${card.value}`}
            >
                <span className="block text-[10px] font-bold uppercase tracking-[0.14em] text-gray-400 dark:text-gray-500 mb-[3px]">
                    {card.label}
                </span>
                <span className="block text-[14px] font-medium text-gray-900 dark:text-white truncate">
                    {card.value}
                </span>
            </a>

            {/* Actions */}
            <div className="flex items-center gap-2 shrink-0 z-10 relative">
                {isEmail && <CopyEmailButton email={contactInfo.email} />}
                <ChevronRight
                    size={15}
                    className="text-gray-300 dark:text-gray-600 group-hover:text-gray-500 dark:group-hover:text-gray-400 group-hover:translate-x-0.5 transition-all duration-200"
                />
            </div>
        </motion.div>
    );
}

export default function WorkTogether() {
    const cards = [
        {
            icon:      <Mail size={16} />,
            label:     'Email',
            value:     contactInfo.email,
            href:      `mailto:${contactInfo.email}`,
            external:  false,
            isEmail:   true,
            glowColor: 'rgba(99,102,241,0.15)',
        },
        {
            icon:      <Calendar size={16} />,
            label:     "Let's Talk",
            value:     'Schedule a Call',
            href:      contactInfo.phoneHref,
            external:  false,
            isEmail:   false,
            glowColor: 'rgba(6,182,212,0.15)',
        },
    ];

    return (
        <section id="contact" className="py-14 sm:py-16 scroll-mt-20">
            <div className="max-w-[880px] mx-auto px-5 sm:px-8">

                <AnimatedHeading
                    text="Let's work together."
                    className="font-display text-[28px] sm:text-[34px] lg:text-[40px] font-normal leading-[1.18] text-cyan-700 dark:text-cyan-400 mb-4"
                />

                <ScrollReveal delay={0.04}>
                    <p className="text-[13px] sm:text-[13.5px] font-semibold uppercase tracking-[0.18em] text-gray-400 dark:text-gray-500 mb-8">
                        Open for OJT &bull; Internship &bull; Freelance
                    </p>
                </ScrollReveal>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10 items-start">

                    <ScrollReveal delay={0.07}>
                        <p className="text-[14px] sm:text-[14.5px] leading-[1.9] text-gray-500 dark:text-gray-400">
                            Looking for a <strong className="text-gray-700 dark:text-gray-300 font-semibold">dedicated OJT intern</strong> or a
                            reliable freelance developer? I build clean,
                            fast, and maintainable web systems using
                            React, Laravel, and Node.js — and I ship on schedule.
                        </p>
                        <p className="text-[14px] sm:text-[14.5px] leading-[1.9] text-gray-500 dark:text-gray-400 mt-4">
                            Whether you need a <strong className="text-gray-700 dark:text-gray-300 font-semibold">full-stack build</strong>,
                            a landing page, or SEO support — let's talk.
                            I respond within 24 hours.
                        </p>
                    </ScrollReveal>

                    <ScrollReveal delay={0.12}>
                        <div className="flex flex-col gap-3">
                            {cards.map((card, i) => (
                                <ContactCard key={card.label} card={card} index={i} />
                            ))}
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
}
