import { motion, useMotionValue, useTransform } from 'motion/react';
import { useState, useEffect, useRef, useCallback } from 'react';
import './Stack.css';

/* ── Drag-to-swipe card (desktop) ───────────────────────────────── */
function CardRotate({ children, onSendToBack, sensitivity }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [60, -60]);
  const rotateY = useTransform(x, [-100, 100], [-60, 60]);

  function handleDragEnd(_, info) {
    if (Math.abs(info.offset.x) > sensitivity || Math.abs(info.offset.y) > sensitivity) {
      onSendToBack();
    } else {
      x.set(0);
      y.set(0);
    }
  }

  return (
    <motion.div
      className="card-rotate"
      style={{ x, y, rotateX, rotateY }}
      drag
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={0.6}
      whileTap={{ cursor: 'grabbing' }}
      onDragEnd={handleDragEnd}
    >
      {children}
    </motion.div>
  );
}

/* ── Main Stack Component ─────────────────────────────────────────── */
export default function Stack({
  randomRotation = false,
  sensitivity = 200,
  cards = [],
  animationConfig = { stiffness: 260, damping: 20 },
  sendToBackOnClick = false,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  mobileBreakpoint = 768
}) {
  const [isMobile, setIsMobile] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Touch swipe state
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);
  const swipeThreshold = 50; // px needed to trigger swipe

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < mobileBreakpoint);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [mobileBreakpoint]);

  const [stack, setStack] = useState(() => {
    if (cards.length) {
      return cards.map((content, index) => ({ id: index + 1, content }));
    }
    return [
      { id: 1, content: <img src="https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=500&auto=format" alt="card-1" className="card-image" /> },
      { id: 2, content: <img src="https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=500&auto=format" alt="card-2" className="card-image" /> },
      { id: 3, content: <img src="https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=500&auto=format" alt="card-3" className="card-image" /> },
      { id: 4, content: <img src="https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=500&auto=format" alt="card-4" className="card-image" /> },
    ];
  });

  useEffect(() => {
    if (cards.length) {
      setStack(cards.map((content, index) => ({ id: index + 1, content })));
    }
  }, [cards]);

  const sendToBack = useCallback((id) => {
    setStack(prev => {
      const newStack = [...prev];
      const index = newStack.findIndex(card => card.id === id);
      const [card] = newStack.splice(index, 1);
      newStack.unshift(card);
      return newStack;
    });
  }, []);

  /* Autoplay */
  useEffect(() => {
    if (autoplay && stack.length > 1 && !isPaused) {
      const interval = setInterval(() => {
        const topCardId = stack[stack.length - 1].id;
        sendToBack(topCardId);
      }, autoplayDelay);
      return () => clearInterval(interval);
    }
  }, [autoplay, autoplayDelay, stack, isPaused, sendToBack]);

  /* ── Touch handlers for mobile swipe ─────────────────────────── */
  const handleTouchStart = useCallback((e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    // Pause autoplay while user interacts
    setIsPaused(true);
  }, []);

  const handleTouchEnd = useCallback((e) => {
    if (touchStartX.current === null) return;

    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    // Only treat as horizontal swipe if horizontal movement dominates
    const isHorizontalSwipe = Math.abs(deltaX) > Math.abs(deltaY);

    if (isHorizontalSwipe && Math.abs(deltaX) > swipeThreshold) {
      // Swipe left → send top card to back (next photo)
      // Swipe right → same behavior (cycle)
      const topCardId = stack[stack.length - 1].id;
      sendToBack(topCardId);
    }

    touchStartX.current = null;
    touchStartY.current = null;

    // Resume autoplay after 2 seconds
    setTimeout(() => setIsPaused(false), 2000);
  }, [stack, sendToBack]);

  return (
    <div
      className="stack-container"
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{ touchAction: 'pan-y' }} /* allow vertical page scroll, intercept horizontal */
    >
      {stack.map((card, index) => {
        const randomRotate = randomRotation ? Math.random() * 10 - 5 : 0;
        const isTopCard = index === stack.length - 1;

        return (
          <CardRotate
            key={card.id}
            onSendToBack={() => sendToBack(card.id)}
            sensitivity={sensitivity}
          >
            <motion.div
              className="card"
              onClick={() => {
                // On mobile tap, only cycle the top card (not background cards)
                if (isMobile && isTopCard) {
                  sendToBack(card.id);
                } else if (!isMobile && (sendToBackOnClick)) {
                  sendToBack(card.id);
                }
              }}
              animate={{
                rotateZ: (stack.length - index - 1) * 4 + randomRotate,
                scale: 1 + index * 0.06 - stack.length * 0.06,
                transformOrigin: '90% 90%'
              }}
              initial={false}
              transition={{
                type: 'spring',
                stiffness: animationConfig.stiffness,
                damping: animationConfig.damping
              }}
            >
              {card.content}
            </motion.div>
          </CardRotate>
        );
      })}

      {/* Mobile swipe hint — shown only on touch devices */}
      {isMobile && (
        <div
          className="stack-swipe-hint"
          aria-hidden="true"
        >
          ← swipe to flip →
        </div>
      )}
    </div>
  );
}
