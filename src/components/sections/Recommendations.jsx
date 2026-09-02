import { useState, useEffect, useCallback, useRef } from 'react';
import BentoCard from '@/components/ui/BentoCard';
import SectionHeader from '@/components/ui/SectionHeader';
import { AvatarGroup } from '@/components/ui/avatar-group';
import { recommendations, recommenderAvatars } from '@/data/portfolioData';

const icon = (
    <svg fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 3H3a2 2 0 00-2 2v14l4-4h16a2 2 0 002-2V5a2 2 0 00-2-2z" />
    </svg>
);

const INTERVAL = 6000;

export default function Recommendations() {
    const [active, setActive] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const resumeTimer = useRef(null);

    const next = useCallback(() => {
        setActive(prev => (prev + 1) % recommendations.length);
    }, []);

    useEffect(() => () => clearTimeout(resumeTimer.current), []);

    useEffect(() => {
        if (isPaused) return;
        const id = setInterval(next, INTERVAL);
        return () => clearInterval(id);
    }, [next, isPaused]);

    return (
        <BentoCard className="flex flex-col">
            <SectionHeader icon={icon} title="Recommendations" />

            {/* Endorsers — hover an avatar to see who said it */}
            <div className="flex items-center gap-3 mb-5">
                <AvatarGroup
                    avatars={recommenderAvatars}
                    maxVisible={2}
                    size={34}
                    overlap={12}
                />
                <p className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 leading-tight">
                    Endorsed by
                    <span className="text-gray-900 dark:text-white"> {recommendations.length} colleagues</span>
                    <br />&amp; mentors
                </p>
            </div>

            <div
                className="flex-1 flex flex-col"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                {/* Slides */}
                <div className="flex-1 relative overflow-hidden">
                    {recommendations.map((rec, idx) => (
                        <div
                            key={idx}
                            className={`rec-slide flex-col gap-3 ${idx === active ? 'active' : ''}`}
                            aria-hidden={idx !== active}
                        >
                            <div className="quote-mark">"</div>
                            <p className="text-gray-700 dark:text-gray-300 text-[13px] leading-relaxed font-medium flex-1">
                                {rec.text}
                            </p>
                            <div className="flex items-center gap-3 mt-2">
                                {/* Avatar initials */}
                                <div className="w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center shrink-0">
                                    <span className="text-[11px] font-bold text-gray-600 dark:text-gray-300">
                                        {rec.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                                    </span>
                                </div>
                                <div>
                                    <div className="text-[13px] font-bold text-gray-900 dark:text-white">{rec.name}</div>
                                    <div className="text-[11px] text-gray-500 dark:text-gray-400">{rec.title}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Dot indicators */}
                <div className="flex items-center justify-center gap-2 mt-4">
                    {recommendations.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => {
                                setActive(idx);
                                setIsPaused(true);
                                clearTimeout(resumeTimer.current);
                                resumeTimer.current = setTimeout(() => setIsPaused(false), 3000);
                            }}
                            className={`h-2 rounded-full transition-all duration-300 outline-none ${
                                idx === active
                                    ? 'bg-gray-800 dark:bg-white w-6'
                                    : 'bg-gray-300 dark:bg-gray-700 w-2 hover:bg-gray-500 dark:hover:bg-gray-500'
                            }`}
                            aria-label={`Slide ${idx + 1}`}
                        />
                    ))}
                </div>
            </div>
        </BentoCard>
    );
}
