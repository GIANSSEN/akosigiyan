import { useLayoutEffect, useEffect, useRef, useCallback, forwardRef, useImperativeHandle } from 'react';
import Lenis from 'lenis';
import './ScrollStack.css';

/**
 * ScrollStackItem
 * Individual card wrapper within ScrollStack with 3D transform preservation.
 * Clean, rounded border card matching portfolio design tokens.
 */
export const ScrollStackItem = ({ children, itemClassName = '', style = {} }) => (
  <div
    className={`scroll-stack-card relative w-full rounded-2xl sm:rounded-[24px] border border-gray-200/90 dark:border-white/[0.1] bg-white dark:bg-[#121212] shadow-[0_10px_30px_-6px_rgba(0,0,0,0.06)] dark:shadow-[0_20px_45px_-12px_rgba(0,0,0,0.65)] box-border origin-top transition-colors duration-300 p-3.5 sm:p-6 ${itemClassName}`.trim()}
    style={{
      backfaceVisibility: 'hidden',
      WebkitBackfaceVisibility: 'hidden',
      transformStyle: 'preserve-3d',
      willChange: 'transform',
      touchAction: 'pan-y',
      ...style
    }}
  >
    {children}
  </div>
);

/**
 * ScrollStack
 * Pinned cards that stack smoothly and dissolve as the page scrolls.
 * Guarantees buttery-smooth, stable 60/120fps scrolling on mobile and desktop
 * with zero jitter, touch-fighting, or layout instability.
 */
const ScrollStack = forwardRef(function ScrollStack(
  {
    children,
    className = '',
    innerClassName = '',
    itemDistance = 220,
    itemScale = 0.035,
    itemStackDistance = 14,
    stackPosition = '90px',
    scaleEndPosition = '24px',
    baseScale = 0.94,
    rotationAmount = 0.5,
    blurAmount = 2,
    useWindowScroll = true,
    onStackComplete,
    onActiveIndexChange
  },
  ref
) {
  const scrollerRef = useRef(null);
  const stackCompletedRef = useRef(false);
  const animationFrameRef = useRef(null);
  const scrollRafRef = useRef(null);
  const lenisRef = useRef(null);
  const cardsRef = useRef([]);
  const cardOffsetsRef = useRef([]);
  const lastTransformsRef = useRef(new Map());
  const isUpdatingRef = useRef(false);
  const activeIndexRef = useRef(0);
  const lastWidthRef = useRef(typeof window !== 'undefined' ? window.innerWidth : 0);

  const calculateProgress = useCallback((scrollTop, start, end) => {
    if (scrollTop < start) return 0;
    if (scrollTop > end) return 1;
    if (end === start) return 0;
    return (scrollTop - start) / (end - start);
  }, []);

  const parsePercentage = useCallback((value, containerHeight) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value) || 0;
  }, []);

  const getScrollData = useCallback(() => {
    if (useWindowScroll) {
      return {
        scrollTop: window.scrollY || document.documentElement.scrollTop || 0,
        containerHeight: window.innerHeight || 800,
        scrollContainer: document.documentElement
      };
    } else {
      const scroller = scrollerRef.current;
      return {
        scrollTop: scroller ? scroller.scrollTop : 0,
        containerHeight: scroller ? scroller.clientHeight : 560,
        scrollContainer: scroller
      };
    }
  }, [useWindowScroll]);

  // Robust offset measurement invariant to transforms
  const measureCardOffsets = useCallback(() => {
    if (!cardsRef.current.length) return;

    if (useWindowScroll) {
      const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
      cardOffsetsRef.current = cardsRef.current.map((card, i) => {
        if (!card) return 0;
        const prevTransform = lastTransformsRef.current.get(i);
        const prevTranslateY = prevTransform ? prevTransform.translateY : 0;
        const rect = card.getBoundingClientRect();
        return Math.round(rect.top + scrollY - prevTranslateY);
      });
    } else {
      cardOffsetsRef.current = cardsRef.current.map(card => (card ? card.offsetTop : 0));
    }
  }, [useWindowScroll]);

  const updateCardTransforms = useCallback(() => {
    if (!cardsRef.current.length || isUpdatingRef.current) return;

    isUpdatingRef.current = true;

    const { scrollTop, containerHeight } = getScrollData();
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
    const isTouch = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);

    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);

    const cards = cardsRef.current;
    const count = cards.length;
    let newActiveIndex = 0;

    const lastCardIndex = count - 1;
    const lastCardTop = cardOffsetsRef.current[lastCardIndex] || 0;
    const lastCardPinStart = lastCardTop - stackPositionPx - itemStackDistance * lastCardIndex;
    
    // Release stack after last card finishes, allowing seamless continuous scroll to next section
    const releaseBuffer = isMobile ? Math.max(containerHeight * 0.35, 240) : Math.max(containerHeight * 0.4, 320);
    const globalPinEnd = useWindowScroll ? lastCardPinStart + releaseBuffer : 0;

    cards.forEach((card, i) => {
      if (!card) return;

      const cardTop = cardOffsetsRef.current[i] || 0;
      const triggerStart = cardTop - stackPositionPx - itemStackDistance * i;
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinStart = cardTop - stackPositionPx - itemStackDistance * i;
      const pinEnd = useWindowScroll ? globalPinEnd : (pinStart + 600);

      if (scrollTop >= pinStart - 15) {
        newActiveIndex = i;
      }

      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
      // On mobile screens, use a subtle, stable scale to preserve readability
      const effectiveBaseScale = isMobile ? Math.max(0.96, baseScale) : baseScale;
      const effectiveItemScale = isMobile ? Math.min(0.015, itemScale) : itemScale;
      const targetScale = effectiveBaseScale + i * effectiveItemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);

      // Disable rotation on mobile to eliminate horizontal jitter and clipping
      const effectiveRotationAmount = isMobile ? 0 : rotationAmount;
      const rotation = effectiveRotationAmount
        ? (i % 2 === 0 ? 1 : -1) * i * effectiveRotationAmount * scaleProgress
        : 0;

      // Disable blur on mobile/touch for 120fps performance; use subtle opacity shift instead
      let blur = 0;
      let opacity = 1;
      if (scrollTop >= pinStart) {
        let topCardIndex = 0;
        for (let j = 0; j < count; j++) {
          const jCardTop = cardOffsetsRef.current[j] || 0;
          const jTriggerStart = jCardTop - stackPositionPx - itemStackDistance * j;
          if (scrollTop >= jTriggerStart) {
            topCardIndex = j;
          }
        }

        if (i < topCardIndex) {
          const depthInStack = topCardIndex - i;
          if (blurAmount && !isMobile && !isTouch) {
            blur = Math.min(6, depthInStack * blurAmount);
          } else {
            // High-performance hardware-accelerated opacity shift on mobile
            opacity = Math.max(0.65, 1 - depthInStack * 0.08);
          }
        }
      }

      let translateY = 0;
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;

      if (isPinned) {
        translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * i;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * i;
      }

      const newTransform = {
        translateY: Math.round(translateY * 10) / 10,
        scale: Math.round(scale * 1000) / 1000,
        rotation: Math.round(rotation * 100) / 100,
        blur: Math.round(blur * 10) / 10,
        opacity: Math.round(opacity * 100) / 100
      };

      const lastTransform = lastTransformsRef.current.get(i);
      const hasChanged =
        !lastTransform ||
        Math.abs(lastTransform.translateY - newTransform.translateY) > 0.2 ||
        Math.abs(lastTransform.scale - newTransform.scale) > 0.002 ||
        Math.abs(lastTransform.rotation - newTransform.rotation) > 0.05 ||
        Math.abs(lastTransform.blur - newTransform.blur) > 0.1 ||
        Math.abs(lastTransform.opacity - newTransform.opacity) > 0.02;

      if (hasChanged) {
        const transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`;
        card.style.transform = transform;

        if (newTransform.blur > 0) {
          card.style.filter = `blur(${newTransform.blur}px)`;
        } else if (lastTransform?.blur > 0) {
          card.style.filter = 'none';
        }

        if (newTransform.opacity < 1) {
          card.style.opacity = `${newTransform.opacity}`;
        } else if (lastTransform?.opacity !== 1) {
          card.style.opacity = '1';
        }

        lastTransformsRef.current.set(i, newTransform);
      }

      if (i === count - 1) {
        const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;
        if (isInView && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        } else if (!isInView && stackCompletedRef.current) {
          stackCompletedRef.current = false;
        }
      }
    });

    if (newActiveIndex !== activeIndexRef.current) {
      activeIndexRef.current = newActiveIndex;
      onActiveIndexChange?.(newActiveIndex);
    }

    isUpdatingRef.current = false;
  }, [
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    useWindowScroll,
    onStackComplete,
    onActiveIndexChange,
    calculateProgress,
    parsePercentage,
    getScrollData
  ]);

  // RequestAnimationFrame throttled scroll handler for buttery-smooth 60/120fps
  const handleScroll = useCallback(() => {
    if (scrollRafRef.current) return;
    scrollRafRef.current = requestAnimationFrame(() => {
      scrollRafRef.current = null;
      updateCardTransforms();
    });
  }, [updateCardTransforms]);

  useImperativeHandle(
    ref,
    () => ({
      scrollToIndex: index => {
        if (!cardOffsetsRef.current.length) return;
        const targetTop = cardOffsetsRef.current[index] || 0;
        const { containerHeight } = getScrollData();
        const stackPositionPx = parsePercentage(stackPosition, containerHeight);
        const targetScroll = Math.max(0, targetTop - stackPositionPx - itemStackDistance * index + 2);

        if (useWindowScroll) {
          if (lenisRef.current) {
            lenisRef.current.scrollTo(targetScroll, { duration: 0.8 });
          } else {
            window.scrollTo({ top: targetScroll, behavior: 'smooth' });
          }
        } else if (scrollerRef.current) {
          scrollerRef.current.scrollTo({ top: targetScroll, behavior: 'smooth' });
        }
      },
      refresh: () => {
        measureCardOffsets();
        updateCardTransforms();
      }
    }),
    [getScrollData, itemStackDistance, measureCardOffsets, parsePercentage, stackPosition, updateCardTransforms, useWindowScroll]
  );

  const setupLenis = useCallback(() => {
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    if (prefersReducedMotion) return null;

    // Do NOT initialize Lenis on window scroll for touch devices!
    // Native inertial touch momentum with hardware compositing provides
    // buttery-smooth 60/120fps scrolling without touch gesture conflicts.
    const isTouch = typeof window !== 'undefined' && (
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia?.('(pointer: coarse)')?.matches
    );

    if (useWindowScroll && isTouch) {
      return null;
    }

    try {
      const targetWrapper = useWindowScroll ? undefined : scrollerRef.current;
      const targetContent = useWindowScroll
        ? undefined
        : scrollerRef.current?.querySelector('.scroll-stack-inner');

      const lenis = new Lenis({
        wrapper: targetWrapper,
        content: targetContent,
        duration: 0.85,
        easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        infinite: false,
        wheelMultiplier: 1,
        lerp: 0.1
      });

      lenis.on('scroll', handleScroll);

      const raf = time => {
        lenis.raf(time);
        animationFrameRef.current = requestAnimationFrame(raf);
      };
      animationFrameRef.current = requestAnimationFrame(raf);

      lenisRef.current = lenis;
      return lenis;
    } catch (e) {
      return null;
    }
  }, [handleScroll, useWindowScroll]);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller && !useWindowScroll) return;

    const cards = Array.from(
      useWindowScroll
        ? (scrollerRef.current?.querySelectorAll('.scroll-stack-card') || document.querySelectorAll('.scroll-stack-card'))
        : (scroller?.querySelectorAll('.scroll-stack-card') || [])
    );

    cardsRef.current = cards;
    const transformsCache = lastTransformsRef.current;

    cards.forEach((card, i) => {
      card._stackIndex = i;
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }
      card.style.willChange = 'transform';
      card.style.transformOrigin = 'top center';
      card.style.backfaceVisibility = 'hidden';
      card.style.WebkitBackfaceVisibility = 'hidden';
      card.style.transform = 'translate3d(0, 0, 0)';
    });

    measureCardOffsets();
    setupLenis();
    updateCardTransforms();

    // Ignore vertical-only resizes on mobile caused by dynamic address bar show/hide
    const handleResize = () => {
      const currentWidth = window.innerWidth;
      if (Math.abs(currentWidth - lastWidthRef.current) < 8) {
        return;
      }
      lastWidthRef.current = currentWidth;
      measureCardOffsets();
      updateCardTransforms();
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    if (!useWindowScroll && scroller) {
      scroller.addEventListener('scroll', handleScroll, { passive: true });
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      if (!useWindowScroll && scroller) {
        scroller.removeEventListener('scroll', handleScroll);
      }

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (scrollRafRef.current) {
        cancelAnimationFrame(scrollRafRef.current);
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
      stackCompletedRef.current = false;
      cardsRef.current = [];
      transformsCache.clear();
      isUpdatingRef.current = false;
    };
  }, [
    itemDistance,
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    useWindowScroll,
    onStackComplete,
    setupLenis,
    updateCardTransforms,
    measureCardOffsets,
    handleScroll
  ]);

  // Re-measure smoothly once images load
  useEffect(() => {
    const timer1 = setTimeout(() => {
      measureCardOffsets();
      updateCardTransforms();
    }, 150);
    const timer2 = setTimeout(() => {
      measureCardOffsets();
      updateCardTransforms();
    }, 500);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [measureCardOffsets, updateCardTransforms]);

  const containerClassName = useWindowScroll
    ? `relative w-full ${className}`.trim()
    : `scroll-stack-scroller relative w-full overflow-y-auto overflow-x-visible ${className}`.trim();

  return (
    <div className={containerClassName} ref={scrollerRef}>
      <div className={`scroll-stack-inner ${innerClassName || (useWindowScroll ? 'pt-2 pb-20 sm:pb-24' : 'pt-2 pb-28 px-1 sm:px-2')}`}>
        {children}
        <div className="scroll-stack-end w-full h-px" />
      </div>
    </div>
  );
});

export default ScrollStack;
