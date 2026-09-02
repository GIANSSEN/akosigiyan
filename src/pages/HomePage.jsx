import Navbar       from '@/components/layout/Navbar';
import FooterNew    from '@/components/layout/FooterNew';
import HeroNew      from '@/components/sections/HeroNew';
import TimelineNew  from '@/components/sections/TimelineNew';
import ProjectShowcase from '@/components/sections/ProjectShowcase';
import SkillsGrid   from '@/components/sections/SkillsGrid';
import CertificationsNew from '@/components/sections/CertificationsNew';
import Education    from '@/components/sections/Education';
import OutsideIDE   from '@/components/sections/OutsideIDE';
import GithubActivity from '@/components/sections/GithubActivity';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import WorkTogether from '@/components/sections/WorkTogether';

export default function HomePage() {
    return (
        <div id="top" className="min-h-screen bg-white dark:bg-[#0a0a0a] transition-colors duration-300">
            <Navbar />

            <main>
                {/* 1. Hero — left-aligned editorial */}
                <HeroNew />

                {/* 2. Experience timeline */}
                <TimelineNew />

                {/* 4. Projects 2-col grid */}
                <ProjectShowcase />

                {/* 5. Technologies flat tag list */}
                <SkillsGrid />

                {/* 6. Certifications timeline */}
                <CertificationsNew />

                {/* 7. Education */}
                <Education />

                {/* 8. Outside the IDE */}
                <OutsideIDE />

                {/* 9. GitHub Activity */}
                <GithubActivity />

                {/* 10. Testimonials & Recommendations */}
                <TestimonialsSection />

                {/* 11. Let's work together */}
                <WorkTogether />
            </main>

            <FooterNew />
        </div>
    );
}
