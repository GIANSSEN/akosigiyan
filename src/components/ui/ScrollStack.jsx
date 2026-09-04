import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  forwardRef,
  useImperativeHandle
} from 'react';
import Lenis from 'lenis';
import './ScrollStack.css';

/**
 * ScrollStackItem
 * Individual card wrapper within ScrollStack.
 * Clean, rounded border card matching portfolio design tokens.
 */
export const ScrollStackItem = ({ children, itemClassName = '', style = {}, ...props }) => (
  <div
    className={`scroll-stack-card relative w-full rounded-2xl sm:rounded-[24px] border border-gray-200/90 dark:border-white/[0.1] bg-white dark:bg-[#121212] shadow-[0_10px_30px_-6px_rgba(0,0,0,0.06)] dark:shadow-[0_20px_45px_-12px_rgba(0,0,0,0.65)] box-border origin-top transition-colors duration-300 p-3.5 sm:p-6 ${itemClassName}`.trim()}
    style={{
      backfaceVisibility: 'hidden',
      WebkitBackfaceVisibility: 'hidden',
      ...style
    }}
    {...props}
  >
    {children}
  </div>
);

/**
 * ScrollStack
 * Hardware-composited, vibration-free card stack using native CSS position: sticky.
 * Guarantees buttery-smooth 60/120fps on mobile touch devices with ZERO vibration,
 * jitter, or frame latency lag.
 */
const ScrollStack = forwardRef(function ScrollStack(
  {
    children,
    className = '',
    innerClassName = '',
    itemDistance = 200,
    itemScale = 0.025,
    itemStackDistance = 12,
    stackPosition = '72px',
    scaleEndPosition = '20px',
    baseScale = 0.94,
    rotationAmount = 0,
    blurAmount = 2,
    useWindowScroll = true,
    onStackComplete,
    onActiveIndexChange
  },
  ref
) {
  const scrollerRef = useRef(null);
  const cardsRef = useRef([]);
  const activeIndexRef = useRef(0);
  const stackCompletedRef = useRef(false);
  const scrollRafRef = useRef(null);
  const lenisRef = useRef(null);
  const lenisRafRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const childrenArray = React.Children.toArray(children);
  const totalCards = childrenArray.length;

  const parseStackPosition = useCallback((value, isMobileScreen) => {
    if (typeof value === 'number') return value;
    if (typeof value === 'string') {
      const parsed = parseFloat(value);
      if (!isNaN(parsed)) return parsed;
    }
    return isMobileScreen ? 70 : 85;
  }, []);

  // Update screen size detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Passive scroll listener to update activeIndex for counter and buttons
  const updateActiveCard = useCallback(() => {
    if (!cardsRef.current || !cardsRef.current.length) return;

    const isMobileScreen = typeof window !== 'undefined' && window.innerWidth < 640;
    const baseTopPx = parseStackPosition(stackPosition, isMobileScreen);
    const stackDistPx = isMobileScreen ? Math.min(itemStackDistance, 10) : itemStackDistance;

    let currentActive = 0;
    const count = cardsRef.current.length;

    for (let i = 0; i < count; i++) {
      const el = cardsRef.current[i];
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      const stickyTop = baseTopPx + (isMobileScreen ? Math.min(i, 6) : i) * stackDistPx;

      // When the card top has reached within 28px of its sticky dock, it is the active card
      if (rect.top <= stickyTop + 28) {
        currentActive = i;
      }
    }

    if (currentActive !== activeIndexRef.current) {
      activeIndexRef.current = currentActive;
      setActiveIndex(currentActive);
      onActiveIndexChange?.(currentActive);
    }

    if (currentActive === count - 1 && !stackCompletedRef.current) {
      stackCompletedRef.current = true;
      onStackComplete?.();
    } else if (currentActive < count - 1 && stackCompletedRef.current) {
      stackCompletedRef.current = false;
    }
  }, [itemStackDistance, onActiveIndexChange, onStackComplete, parseStackPosition, stackPosition]);

  // RequestAnimationFrame throttled scroll handler
  const handleScroll = useCallback(() => {
    if (scrollRafRef.current) return;
    scrollRafRef.current = requestAnimationFrame(() => {
      scrollRafRef.current = null;
      updateActiveCard();
    });
  }, [updateActiveCard]);

  // Imperative handle for scrollToIndex and refresh
  useImperativeHandle(
    ref,
    () => ({
      scrollToIndex: (targetIdx) => {
        const total = cardsRef.current.length;
        if (!total) return;
        const clamped = Math.max(0, Math.min(targetIdx, total - 1));
        const el = cardsRef.current[clamped];
        if (!el) return;

        const isMobileScreen = typeof window !== 'undefined' && window.innerWidth < 640;
        const baseTopPx = parseStackPosition(stackPosition, isMobileScreen);
        const stackDistPx = isMobileScreen ? Math.min(itemStackDistance, 10) : itemStackDistance;
        const stickyTop = baseTopPx + (isMobileScreen ? Math.min(clamped, 6) : clamped) * stackDistPx;

        const container = scrollerRef.current;
        if (!container) return;
        const containerRect = container.getBoundingClientRect();
        const currentScrollY = window.scrollY || document.documentElement.scrollTop || 0;
        const containerDocTop = containerRect.top + currentScrollY;

        // Static in-flow offset relative to container ensures deterministic jump
        const targetScroll = Math.max(0, containerDocTop + el.offsetTop - stickyTop + 2);

        if (lenisRef.current) {
          lenisRef.current.scrollTo(targetScroll, { duration: 0.8 });
        } else {
          window.scrollTo({
            top: targetScroll,
            behavior: 'smooth'
          });
        }
      },
      refresh: () => {
        updateActiveCard();
      }
    }),
    [itemStackDistance, parseStackPosition, stackPosition, updateActiveCard]
  );

  // Setup desktop-only Lenis for smooth mouse wheel; mobile uses native 120fps momentum
  useEffect(() => {
    const isTouch = typeof window !== 'undefined' && (
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia?.('(pointer: coarse)')?.matches
    );
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;

    if (isTouch || prefersReducedMotion || !useWindowScroll) {
      return;
    }

    try {
      const lenis = new Lenis({
        duration: 0.85,
        easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
      });

      const raf = time => {
        lenis.raf(time);
        lenisRafRef.current = requestAnimationFrame(raf);
      };
      lenisRafRef.current = requestAnimationFrame(raf);
      lenisRef.current = lenis;

      return () => {
        if (lenisRafRef.current) cancelAnimationFrame(lenisRafRef.current);
        lenis.destroy();
        lenisRef.current = null;
      };
    } catch {
      // Fallback to native smooth scroll
    }
  }, [useWindowScroll]);

  // Attach window scroll listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    updateActiveCard();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollRafRef.current) cancelAnimationFrame(scrollRafRef.current);
    };
  }, [handleScroll, updateActiveCard]);

  const baseTop = parseStackPosition(stackPosition, isMobile);
  const stackDist = isMobile ? Math.min(itemStackDistance, 10) : itemStackDistance;
  const effectiveDistance = isMobile ? Math.max(170, itemDistance) : Math.max(200, itemDistance);

  const containerClassName = useWindowScroll
    ? `relative w-full ${className}`.trim()
    : `scroll-stack-scroller relative w-full overflow-y-auto overflow-x-visible ${className}`.trim();

  return (
    <div className={containerClassName} ref={scrollerRef}>
      <div className={`scroll-stack-inner ${innerClassName || 'pt-2 pb-16 sm:pb-24'}`}>
        {childrenArray.map((child, i) => {
          const stickyTop = isMobile
            ? baseTop + Math.min(i, 6) * stackDist
            : baseTop + i * stackDist;

          const isLast = i === totalCards - 1;
          const isStacked = i < activeIndex;
          const depth = activeIndex - i;

          // Subtle, elegant depth styling for tucked cards; active card is 100% full scale
          const cardScale = isStacked
            ? Math.max(isMobile ? 0.95 : 0.92, 1 - depth * (isMobile ? 0.015 : 0.025))
            : 1;

          const cardOpacity = isStacked
            ? Math.max(isMobile ? 0.78 : 0.72, 1 - depth * (isMobile ? 0.07 : 0.09))
            : 1;

          const cardBlur = isStacked && !isMobile && blurAmount
            ? Math.min(4, depth * blurAmount)
            : 0;

          return (
            <div
              key={i}
              ref={el => (cardsRef.current[i] = el)}
              className="scroll-stack-item-wrapper"
              data-stack-index={i}
              style={{
                position: 'sticky',
                top: `${stickyTop}px`,
                zIndex: i + 1,
                marginBottom: isLast ? '0px' : `${effectiveDistance}px`,
              }}
            >
              <div
                className="scroll-stack-card-inner"
                style={{
                  transform: cardScale !== 1 ? `scale(${cardScale})` : 'scale(1)',
                  opacity: cardOpacity,
                  filter: cardBlur > 0 ? `blur(${cardBlur}px)` : 'none',
                }}
              >
                {child}
              </div>
            </div>
          );
        })}
        <div className="scroll-stack-end w-full h-px" />
      </div>
    </div>
  );
});

export default ScrollStack;
