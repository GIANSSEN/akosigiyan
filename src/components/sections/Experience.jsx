import BentoCard from '@/components/ui/BentoCard';
import SectionHeader from '@/components/ui/SectionHeader';
import { experience } from '@/data/portfolioData';

const icon = (
    <svg fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 0H8m8 0a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2" />
    </svg>
);

export default function Experience() {
    return (
        <BentoCard className="flex flex-col">
            <SectionHeader icon={icon} title="Experience" />

            <div className="pl-2">
                {experience.map((job, idx) => {
                    const isFirst = idx === 0;
                    const isLast  = idx === experience.length - 1;
                    const lineClass = `exp-line${isFirst ? ' active' : isLast ? ' completed' : ''}`;

                    return (
                        <div key={idx} className={lineClass}>
                            <div className="flex flex-col mb-1 relative -top-1.5">
                                <div className="flex justify-between items-start w-full">
                                    <h3 className="text-[13px] font-bold text-gray-900 dark:text-white pr-4">
                                        {job.role}
                                    </h3>
                                    <span className="text-[11px] text-gray-600 dark:text-gray-200 font-bold whitespace-nowrap mt-1 uppercase tracking-wider">
                                        {job.period}
                                    </span>
                                </div>
                                <span className="text-[12px] text-gray-800 dark:text-white mt-1 font-bold leading-tight">
                                    {job.company}
                                </span>
                                <p className="text-[11px] text-gray-700 dark:text-gray-100 mt-1 leading-relaxed font-medium">
                                    {job.description}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </BentoCard>
    );
}
