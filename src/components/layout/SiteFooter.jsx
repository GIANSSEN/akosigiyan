import { useEffect, useState } from 'react';
import { AvatarGroup } from '@/components/ui/avatar-group';
import { recommenderAvatars, footerQuote, contactInfo } from '@/data/portfolioData';

const BASE_VISITORS = 170;

export default function SiteFooter() {
    const [visitors, setVisitors] = useState(BASE_VISITORS);

    useEffect(() => {
        try {
            const visits = parseInt(localStorage.getItem('gj-visits') || '0', 10) + 1;
            localStorage.setItem('gj-visits', String(visits));
            setVisitors(BASE_VISITORS + visits);
        } catch { /* private mode */ }
    }, []);

    const avatars = [
        ...recommenderAvatars,
        { src: '/profile-light.png', alt: 'Gianssen G. Jasolin', label: 'Gianssen G. Jasolin' },
    ];

    return (
        <footer className="mt-8 border-t border-gray-200/70 dark:border-white/10 py-8">
            <p className="italic text-[12.5px] text-gray-400 dark:text-gray-500">
                {footerQuote}
            </p>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[12.5px]">
                    <span className="font-bold text-gray-900 dark:text-white">Gianssen G. Jasolin</span>
                    <span className="text-gray-400 dark:text-gray-500">Still sharpening</span>
                    <span className="text-gray-400 dark:text-gray-500">Metro Manila, PH</span>
                </div>

                <div className="flex items-center gap-2.5">
                    <AvatarGroup avatars={avatars} size={26} overlap={10} maxVisible={5} />
                    <span className="text-[12px] font-medium text-gray-400 dark:text-gray-500 tabular-nums">
                        {visitors} visitors
                    </span>
                </div>
            </div>

            <p className="mt-6 text-[11.5px] text-gray-300 dark:text-gray-600">
                © {new Date().getFullYear()} Gianssen G. Jasolin · {contactInfo.email}
            </p>
        </footer>
    );
}
