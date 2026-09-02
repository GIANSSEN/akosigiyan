import BentoCard from '@/components/ui/BentoCard';
import SectionHeader from '@/components/ui/SectionHeader';
import { stack, techIcons, invertInDark } from '@/data/portfolioData';

const icon = (
    <svg fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
    </svg>
);

export default function TechStack() {
    return (
        <BentoCard>
            <SectionHeader icon={icon} title="Tech Stack" />

            <div className="space-y-6">
                {Object.entries(stack).map(([category, items]) => (
                    <div key={category}>
                        <h3 className="text-[13px] font-bold text-gray-900 dark:text-white mb-2">{category}</h3>
                        <div className="flex flex-wrap gap-2">
                            {items.map(tech => {
                                const slug = techIcons[tech];
                                const needsInvert = invertInDark.includes(tech);
                                return (
                                    <span key={tech} className="tech-badge">
                                        {slug && (
                                            <img
                                                src={`https://cdn.simpleicons.org/${slug}`}
                                                alt={`${tech} icon`}
                                                className={`w-3.5 h-3.5 tech-icon ${needsInvert ? 'needs-invert' : ''}`}
                                            />
                                        )}
                                        {tech}
                                    </span>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </BentoCard>
    );
}
