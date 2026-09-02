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
const TestimonialCard = ({ position, testimonial, handleMove, cardSize }) => {
  const isCenter = position === 0;

  // Only render the center + 1 adjacent on each side (3 visible at a time)
  if (Math.abs(position) > 1) return null;

  const cornerSize = Math.round(cardSize * 0.12);
  // spacing between cards is tighter so they fit on small screens
  const xOffset = (cardSize * 0.72) * position;
  const yOffset = isCenter ? -20 : position % 2 ? 8 : -8;
  const rotation = isCenter ? 0 : position % 2 ? 2.5 : -2.5;

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer border-2 transition-all duration-500 ease-in-out select-none",
        isCenter
          ? "z-10 bg-indigo-600 border-indigo-600 shadow-xl"
          : "z-0 bg-white dark:bg-[#141414] border-gray-200 dark:border-white/10"
      )}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath: `polygon(${cornerSize}px 0%, calc(100% - ${cornerSize}px) 0%, 100% ${cornerSize}px, 100% 100%, calc(100% - ${cornerSize}px) 100%, ${cornerSize}px 100%, 0 100%, 0 0)`,
        transform: `translate(-50%, -50%) translateX(${xOffset}px) translateY(${yOffset}px) rotate(${rotation}deg)`,
        opacity: isCenter ? 1 : 0.75,
        boxShadow: isCenter ? '0px 8px 24px rgba(99,102,241,0.3)' : 'none',
      }}
    >
      {/* corner fold accent */}
      <span
        className="absolute block origin-top-right rotate-45 bg-gray-300 dark:bg-white/20"
        style={{ right: -2, top: cornerSize - 2, width: cornerSize * 1.414, height: 2 }}
      />

      {/* card content */}
      <div className="p-3.5 h-full flex flex-col">
        <img
          src={testimonial.imgSrc}
          alt={testimonial.by}
          className="mb-2 h-9 w-8 rounded-sm object-cover object-top shrink-0"
        />
        <p className={cn(
          "text-[11px] font-medium leading-snug line-clamp-5 flex-1",
          isCenter ? "text-white" : "text-gray-800 dark:text-gray-200"
        )}>
          "{testimonial.testimonial}"
        </p>
        <div className="mt-2 pt-2 border-t border-white/20">
          <p className={cn(
            "text-[9.5px] font-bold truncate leading-tight",
            isCenter ? "text-indigo-100" : "text-gray-700 dark:text-gray-300"
          )}>
            {testimonial.by}
          </p>
          <p className={cn(
            "text-[8.5px] truncate leading-tight mt-0.5",
            isCenter ? "text-indigo-200" : "text-gray-500 dark:text-gray-400"
          )}>
            {testimonial.role}
          </p>
        </div>
      </div>
    </div>
  );
};

/* ── Main Component ──────────────────────────────────────────────── */
export const StaggerTestimonials = () => {
  const [cardSize, setCardSize] = useState(200);
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

  // Responsive card size
  useEffect(() => {
    const updateSize = () => {
      const w = window.innerWidth;
      if (w < 380)       setCardSize(148);
      else if (w < 480)  setCardSize(165);
      else if (w < 640)  setCardSize(180);
      else if (w < 768)  setCardSize(200);
      else               setCardSize(215);
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

  // Container height = cardSize + padding for buttons below
  const containerH = cardSize + 72;

  return (
    <div
      className="relative w-full"
      style={{ height: containerH }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Card stack — clipped so nothing bleeds outside */}
      <div className="absolute inset-x-0 top-0 overflow-hidden" style={{ height: cardSize + 28 }}>
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
              cardSize={cardSize}
            />
          );
        })}
      </div>

      {/* Nav buttons pinned below cards */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        <button
          onClick={() => handleMove(-1)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-[#181818] text-gray-700 dark:text-gray-200 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white transition-all duration-200 active:scale-95 shadow-xs"
          aria-label="Previous testimonial"
        >
          <ChevronLeft size={17} />
        </button>
        <button
          onClick={() => handleMove(1)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-[#181818] text-gray-700 dark:text-gray-200 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white transition-all duration-200 active:scale-95 shadow-xs"
          aria-label="Next testimonial"
        >
          <ChevronRight size={17} />
        </button>
      </div>
    </div>
  );
};
