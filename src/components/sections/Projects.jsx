import BentoCard from '@/components/ui/BentoCard';
import SectionHeader from '@/components/ui/SectionHeader';
import ProjectCard from './ProjectCard';
import { projects } from '@/data/portfolioData';

const icon = (
    <svg fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
);

export default function Projects() {
    return (
        <BentoCard className="flex flex-col">
            <SectionHeader icon={icon} title="Recent Projects" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
                {projects.map((project, idx) => (
                    <ProjectCard key={idx} project={project} />
                ))}
            </div>
        </BentoCard>
    );
}
