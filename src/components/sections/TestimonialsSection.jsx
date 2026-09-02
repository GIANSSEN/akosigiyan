import ScrollReveal from '@/components/ui/ScrollReveal';
import { StaggerTestimonials } from '@/components/ui/stagger-testimonials';

export default function TestimonialsSection() {
    return (
        <section id="testimonials" className="py-12 sm:py-16 scroll-mt-20 overflow-hidden">
            <div className="max-w-[780px] mx-auto px-5 sm:px-8">
                <ScrollReveal>
                    <div className="flex flex-col gap-1.5 mb-8">
                        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
                            Endorsements
                        </span>
                        <h2 className="font-serif text-[26px] sm:text-[32px] font-normal text-gray-900 dark:text-white leading-tight">
                            What People Say
                        </h2>
                        <p className="text-[14px] text-gray-500 dark:text-gray-400">
                            Feedback and recommendations from colleagues, clients, and team leads.
                        </p>
                    </div>
                </ScrollReveal>
            </div>

            {/* Interactive Stagger Testimonial Carousel */}
            <div className="w-full relative">
                <StaggerTestimonials />
            </div>
        </section>
    );
}
