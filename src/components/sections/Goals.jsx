import BentoCard from '@/components/ui/BentoCard';
import SectionHeader from '@/components/ui/SectionHeader';
import { goals } from '@/data/portfolioData';

const icon = (
    <svg fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
);

export default function Goals() {
    return (
        <BentoCard className="flex flex-col">
            <SectionHeader icon={icon} title="Goals" />
            <div className="flex flex-col gap-3 flex-1">
                {goals.map((goal, idx) => (
                    <div key={idx} className="bg-[#f8f9fa] dark:bg-[#1a1a1a] rounded-lg p-3">
                        <p className="text-gray-600 dark:text-gray-400 text-[12px] leading-relaxed font-medium">
                            {goal}
                        </p>
                    </div>
                ))}
            </div>
        </BentoCard>
    );
}
