import BentoCard from '@/components/ui/BentoCard';
import SectionHeader from '@/components/ui/SectionHeader';
import { socialLinks, contactInfo } from '@/data/portfolioData';

const contactIcon = (
    <svg fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);

const InstagramGradient = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="url(#ig-grad)">
        <defs>
            <linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor="#F58529"/>
                <stop offset="33%"  stopColor="#DD2A7B"/>
                <stop offset="66%"  stopColor="#8134AF"/>
                <stop offset="100%" stopColor="#515BD4"/>
            </linearGradient>
        </defs>
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
);

const contactItems = [
    {
        label: 'Email me',
        href:  `mailto:${contactInfo.email}`,
        icon: (
            <svg fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" className="w-5 h-5 text-gray-600 dark:text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        ),
        value: contactInfo.email,
        color: 'hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-400/30',
    },
    {
        label: 'Call me',
        href:  contactInfo.phoneHref,
        icon: (
            <svg fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" className="w-5 h-5 text-gray-600 dark:text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
        ),
        value: `+63 ${contactInfo.phone}`,
        color: 'hover:text-green-600 dark:hover:text-green-400 hover:border-green-400/30',
    },
    {
        label: 'Message me',
        href:  contactInfo.messenger,
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#0099FF]">
                <path d="M12 0C5.373 0 0 4.975 0 11.111c0 3.497 1.745 6.616 4.472 8.652V24l4.086-2.242c1.09.301 2.246.464 3.442.464 6.627 0 12-4.975 12-11.111S18.627 0 12 0zm1.193 14.963l-3.056-3.259-5.963 3.259 6.554-6.962 3.13 3.259 5.889-3.259-6.554 6.962z"/>
            </svg>
        ),
        value: 'Messenger',
        color: 'hover:text-[#0099FF] hover:border-[#0099FF]/30',
    },
];

export default function SocialContact() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">

            {/* ── Social Links ── */}
            <BentoCard className="flex flex-col">
                <SectionHeader
                    icon={
                        <svg fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    }
                    title="Socials"
                />
                <div className="flex flex-col gap-3 flex-1">
                    {socialLinks.map((s, idx) => (
                        <a
                            key={idx}
                            href={s.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-3 rounded-xl bg-[#f8f9fa] dark:bg-[#1a1a1a] border border-transparent dark:border-white/5 hover:shadow-md dark:hover:shadow-[0_4px_20px_rgba(0,0,0,0.4)] transition-all duration-300 group no-underline"
                        >
                            <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 bg-white dark:bg-[#2a2a2a] shadow-sm group-hover:scale-110 transition-transform duration-200">
                                {s.isInstagram ? (
                                    <InstagramGradient />
                                ) : (
                                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill={s.color}>
                                        <path d={s.iconPath} />
                                    </svg>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-[13px] font-bold text-gray-900 dark:text-white">{s.name}</div>
                                <div className="text-[11px] text-gray-500 dark:text-gray-400 truncate">{s.subtitle}</div>
                            </div>
                            <svg className="w-4 h-4 text-gray-400 dark:text-gray-600 group-hover:translate-x-1 group-hover:text-gray-600 dark:group-hover:text-gray-400 transition-all duration-200 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </a>
                    ))}
                </div>
            </BentoCard>

            {/* ── Contact ── */}
            <BentoCard className="flex flex-col">
                <SectionHeader icon={contactIcon} title="Contact" />
                <div className="flex flex-col gap-3 flex-1">
                    {contactItems.map((c, idx) => (
                        <a
                            key={idx}
                            href={c.href}
                            target={idx === 2 ? '_blank' : undefined}
                            rel={idx === 2 ? 'noopener noreferrer' : undefined}
                            className={`flex items-center gap-3 p-3 rounded-xl bg-[#f8f9fa] dark:bg-[#1a1a1a] border border-transparent dark:border-white/5 hover:shadow-md dark:hover:shadow-[0_4px_20px_rgba(0,0,0,0.4)] transition-all duration-300 group no-underline text-gray-900 dark:text-white ${c.color}`}
                        >
                            <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 bg-white dark:bg-[#2a2a2a] shadow-sm group-hover:scale-110 transition-transform duration-200">
                                {c.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">{c.label}</div>
                                <div className="text-[12px] font-bold truncate">{c.value}</div>
                            </div>
                            <svg className="w-4 h-4 text-gray-400 dark:text-gray-600 group-hover:translate-x-1 transition-transform duration-200 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </a>
                    ))}
                </div>
            </BentoCard>
        </div>
    );
}
