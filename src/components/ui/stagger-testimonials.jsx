import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

/* ── 6 Real, Curated & Sugar-Coated Testimonials for Gianssen ───── */
const testimonials = [
  {
    tempId: 0,
    testimonial: "Giyan writes some of the cleanest and most scalable code I've reviewed. His full-stack architecture and problem-solving speed make him a top-tier engineer.",
    by: "John Dela Cruz",
    role: "Senior Engineer at TechCorp",
    imgSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
  },
  {
    tempId: 1,
    testimonial: "Giyan transformed our store operations with an end-to-end POS & Inventory system. Delivered ahead of schedule with flawless database performance!",
    by: "Maria Santos",
    role: "Product Owner at CJ's Minimart",
    imgSrc: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80"
  },
  {
    tempId: 2,
    testimonial: "Giyan's AI chatbot integration and API pipelines were exceptionally fast and robust. He delivers production-grade results with zero hand-holding.",
    by: "Carlos Reyes",
    role: "Tech Lead at Digital Solutions PH",
    imgSrc: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80"
  },
  {
    tempId: 3,
    testimonial: "Among all IT students, Giyan stands out with unmatched engineering rigor. His IoT security system capstone is an absolute benchmark for technical excellence.",
    by: "Prof. Arnold Ramirez",
    role: "Faculty Adviser at TFVC",
    imgSrc: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
  },
  {
    tempId: 4,
    testimonial: "Collaborating with Giyan is seamless. He brings a brilliant UI/UX eye, fluid micro-interactions, and modern React best practices to every project.",
    by: "Kevin Alcantara",
    role: "Full-Stack Dev at DevConnect",
    imgSrc: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80"
  },
  {
    tempId: 5,
    testimonial: "Super responsive, highly dependable, and insanely talented. Giyan turned our complex concept into a lightning-fast web platform in record time!",
    by: "Aileen Fernandez",
    role: "Founder & Client at StyleNest",
    imgSrc: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80"
  }
];

/* ── Single Card ─────────────────────────────────────────────────── */
const TestimonialCard = ({ position, testimonial, handleMove, cardW, cardH }) => {
  const isCenter = position === 0;

  // Only render center + 1 on each side
  if (Math.abs(position) > 1) return null;

  const cornerSize = Math.round(cardW * 0.1);
  const xOffset = (cardW * 0.72) * position;
  const yOffset = isCenter ? -16 : position % 2 ? 10 : -10;
  const rotation = isCenter ? 0 : position % 2 ? 3 : -3;

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer border-2 transition-all duration-500 ease-in-out select-none",
        isCenter
          ? "z-10 bg-indigo-600 border-indigo-600 shadow-2xl"
          : "z-0 bg-white dark:bg-[#141414] border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20"
      )}
      style={{
        width: cardW,
        height: cardH,
        clipPath: `polygon(${cornerSize}px 0%, calc(100% - ${cornerSize}px) 0%, 100% ${cornerSize}px, 100% 100%, calc(100% - ${cornerSize}px) 100%, ${cornerSize}px 100%, 0 100%, 0 0)`,
        transform: `translate(-50%, -50%) translateX(${xOffset}px) translateY(${yOffset}px) rotate(${rotation}deg)`,
        opacity: isCenter ? 1 : 0.72,
        boxShadow: isCenter ? '0px 14px 36px -6px rgba(99,102,241,0.38)' : 'none',
      }}
    >
      {/* Corner fold accent */}
      <span
        className="absolute block origin-top-right rotate-45 bg-gray-300 dark:bg-white/20 pointer-events-none"
        style={{ right: -2, top: cornerSize - 2, width: cornerSize * 1.414, height: 2 }}
      />

      {/* Card content */}
      <div className="p-4 sm:p-5 h-full flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <img
              src={testimonial.imgSrc}
              alt={testimonial.by}
              className="h-10 w-9 sm:h-11 sm:w-10 rounded-md object-cover object-top shrink-0 border border-white/20"
            />
            <div className="min-w-0 flex-1">
              <p className={cn(
                "text-[12px] sm:text-[13px] font-bold truncate leading-tight",
                isCenter ? "text-white" : "text-gray-900 dark:text-gray-100"
              )}>
                {testimonial.by}
              </p>
              <p className={cn(
                "text-[10px] sm:text-[11px] truncate leading-tight mt-0.5",
                isCenter ? "text-indigo-200" : "text-gray-500 dark:text-gray-400"
              )}>
                {testimonial.role}
              </p>
            </div>
          </div>

          <p className={cn(
            "text-[12px] sm:text-[13.5px] font-normal leading-relaxed line-clamp-4 sm:line-clamp-5",
            isCenter ? "text-indigo-50" : "text-gray-700 dark:text-gray-200"
          )}>
            "{testimonial.testimonial}"
          </p>
        </div>

        {/* Bottom subtle brand indicator */}
        <div className={cn(
          "pt-2 mt-2 border-t flex items-center justify-between text-[10px] font-mono",
          isCenter ? "border-white/15 text-indigo-200" : "border-gray-100 dark:border-white/[0.06] text-gray-400 dark:text-gray-500"
        )}>
          <span>Recommendation</span>
          <span>5.0 ★</span>
        </div>
      </div>
    </div>
  );
};

/* ── Main Component ──────────────────────────────────────────────── */
export const StaggerTestimonials = () => {
  const [dimensions, setDimensions] = useState({ w: 280, h: 250 });
  const [testimonialsList, setTestimonialsList] = useState(testimonials);
  const touchStartX = useRef(null);

  const handleMove = (steps) => {
    const newList = [...testimonialsList];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift({ ...item, tempId: Math.random() });
      }
    }
    setTestimonialsList(newList);
  };

  // Fluid responsive card dimensions
  useEffect(() => {
    const updateSize = () => {
      const screenW = window.innerWidth;
      if (screenW < 380) {
        setDimensions({ w: 200, h: 225 });
      } else if (screenW < 480) {
        setDimensions({ w: 230, h: 235 });
      } else if (screenW < 640) {
        setDimensions({ w: 260, h: 245 });
      } else if (screenW < 768) {
        setDimensions({ w: 285, h: 255 });
      } else {
        setDimensions({ w: 310, h: 265 });
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Touch swipe handlers
  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd   = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) handleMove(diff > 0 ? 1 : -1);
    touchStartX.current = null;
  };

  // Container height = card height + navigation buttons
  const containerH = dimensions.h + 84;

  return (
    <div
      className="relative w-full"
      style={{ height: containerH }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Card stack — clipped so nothing overflows horizontally */}
      <div className="absolute inset-x-0 top-0 overflow-hidden" style={{ height: dimensions.h + 36 }}>
        {testimonialsList.map((testimonial, index) => {
          const position =
            testimonialsList.length % 2
              ? index - (testimonialsList.length + 1) / 2
              : index - testimonialsList.length / 2;
          return (
            <TestimonialCard
              key={testimonial.tempId}
              testimonial={testimonial}
              handleMove={handleMove}
              position={position}
              cardW={dimensions.w}
              cardH={dimensions.h}
            />
          );
        })}
      </div>

      {/* Nav buttons pinned below cards */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
        <button
          onClick={() => handleMove(-1)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#181818] text-gray-700 dark:text-gray-200 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white hover:border-indigo-600 dark:hover:border-indigo-600 transition-all duration-200 active:scale-90 shadow-sm cursor-pointer"
          aria-label="Previous testimonial"
        >
          <ChevronLeft size={19} />
        </button>
        <button
          onClick={() => handleMove(1)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#181818] text-gray-700 dark:text-gray-200 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white hover:border-indigo-600 dark:hover:border-indigo-600 transition-all duration-200 active:scale-90 shadow-sm cursor-pointer"
          aria-label="Next testimonial"
        >
          <ChevronRight size={19} />
        </button>
      </div>
    </div>
  );
};
