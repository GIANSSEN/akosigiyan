import { useLayoutEffect, useEffect, useRef, useCallback, forwardRef, useImperativeHandle } from 'react';
import Lenis from 'lenis';
import './ScrollStack.css';

/**
 * ScrollStackItem
 * Individual card wrapper within ScrollStack with 3D transform preservation.
 * Clean, rounded border card matching portfolio design tokens and Image 2 reference.
 */
export const ScrollStackItem = ({ children, itemClassName = '', style = {} }) => (
  <div
    className={`scroll-stack-card relative w-full rounded-2xl sm:rounded-[24px] border border-gray-200/90 dark:border-white/[0.1] bg-white dark:bg-[#121212] shadow-[0_12px_36px_-8px_rgba(0,0,0,0.08)] dark:shadow-[0_20px_45px_-12px_rgba(0,0,0,0.65)] box-border origin-top will-change-transform transition-colors duration-300 p-4 sm:p-6 ${itemClassName}`.trim()}
    style={{
      backfaceVisibility: 'hidden',
      WebkitBackfaceVisibility: 'hidden',
      transformStyle: 'preserve-3d',
      ...style
    }}
  >
    {children}
  </div>
);

/**
 * ScrollStack
 * Pinned cards that stack, turn, and dissolve as the page scrolls.
 * Guarantees continuous scroll all the way down to the footer with zero trapping.
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
  const lenisRef = useRef(null);
  const cardsRef = useRef([]);
  const cardOffsetsRef = useRef([]);
  const lastTransformsRef = useRef(new Map());
  const isUpdatingRef = useRef(false);
  const activeIndexRef = useRef(0);

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

  const measureCardOffsets = useCallback(() => {
    if (!cardsRef.current.length) return;

    if (useWindowScroll) {
      cardOffsetsRef.current = cardsRef.current.map(card => {
        if (!card) return 0;
        let top = 0;
        let el = card;
        while (el && el !== document.body) {
          top += el.offsetTop || 0;
          el = el.offsetParent;
        }
        return top;
      });
    } else {
      cardOffsetsRef.current = cardsRef.current.map(card => (card ? card.offsetTop : 0));
    }
  }, [useWindowScroll]);

  const updateCardTransforms = useCallback(() => {
    if (!cardsRef.current.length || isUpdatingRef.current) return;

    isUpdatingRef.current = true;

    const { scrollTop, containerHeight } = getScrollData();
    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);

    const cards = cardsRef.current;
    const count = cards.length;
    let newActiveIndex = 0;

    const lastCardIndex = count - 1;
    const lastCardTop = cardOffsetsRef.current[lastCardIndex] || 0;
    const lastCardPinStart = lastCardTop - stackPositionPx - itemStackDistance * lastCardIndex;
    // Release stack after last card finishes, allowing seamless continuous scroll to footer
    const globalPinEnd = useWindowScroll ? lastCardPinStart + 320 : 0;

    cards.forEach((card, i) => {
      if (!card) return;

      const cardTop = cardOffsetsRef.current[i] || 0;
      const triggerStart = cardTop - stackPositionPx - itemStackDistance * i;
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinStart = cardTop - stackPositionPx - itemStackDistance * i;
      const pinEnd = useWindowScroll ? globalPinEnd : (pinStart + 600);

      if (scrollTop >= pinStart - 20) {
        newActiveIndex = i;
      }

      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
      const targetScale = baseScale + i * itemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);
      const rotation = rotationAmount ? (i % 2 === 0 ? 1 : -1) * i * rotationAmount * scaleProgress : 0;

      let blur = 0;
      if (blurAmount) {
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
          blur = Math.max(0, depthInStack * blurAmount);
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
        translateY: Math.round(translateY * 100) / 100,
        scale: Math.round(scale * 1000) / 1000,
        rotation: Math.round(rotation * 100) / 100,
        blur: Math.round(blur * 100) / 100
      };

      const lastTransform = lastTransformsRef.current.get(i);
      const hasChanged =
        !lastTransform ||
        Math.abs(lastTransform.translateY - newTransform.translateY) > 0.1 ||
        Math.abs(lastTransform.scale - newTransform.scale) > 0.001 ||
        Math.abs(lastTransform.rotation - newTransform.rotation) > 0.1 ||
        Math.abs(lastTransform.blur - newTransform.blur) > 0.1;

      if (hasChanged) {
        const transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`;
        const filter = newTransform.blur > 0 ? `blur(${newTransform.blur}px)` : 'none';

        card.style.transform = transform;
        card.style.filter = filter;

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

  const handleScroll = useCallback(() => {
    updateCardTransforms();
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

    try {
      // For window scroll, keep Lenis smooth without interfering with touch
      const isTouch = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);

      const targetWrapper = useWindowScroll ? undefined : scrollerRef.current;
      const targetContent = useWindowScroll
        ? undefined
        : scrollerRef.current?.querySelector('.scroll-stack-inner');

      const lenis = new Lenis({
        wrapper: targetWrapper,
        content: targetContent,
        duration: 0.9,
        easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: isTouch ? 1 : 1.2,
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
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }
      card.style.willChange = 'transform, filter';
      card.style.transformOrigin = 'top center';
      card.style.backfaceVisibility = 'hidden';
      card.style.WebkitBackfaceVisibility = 'hidden';
      card.style.transform = 'translateZ(0)';
      card.style.perspective = '1000px';
    });

    measureCardOffsets();
    setupLenis();
    updateCardTransforms();

    const handleResize = () => {
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

  // Re-measure when images load or after hydration
  useEffect(() => {
    const timer1 = setTimeout(() => {
      measureCardOffsets();
      updateCardTransforms();
    }, 200);
    const timer2 = setTimeout(() => {
      measureCardOffsets();
      updateCardTransforms();
    }, 600);
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
      <div className={`scroll-stack-inner ${innerClassName || (useWindowScroll ? 'pt-2 pb-24' : 'pt-2 pb-28 px-1 sm:px-2')}`}>
        {children}
        <div className="scroll-stack-end w-full h-px" />
      </div>
    </div>
  );
});

export default ScrollStack;
