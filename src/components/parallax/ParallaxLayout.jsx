import { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react';

const ParallaxContext = createContext({ scrollY: 0, viewportH: 0 });

export function useParallax() {
    return useContext(ParallaxContext);
}

export default function ParallaxLayout({ children }) {
    const [scrollY, setScrollY] = useState(0);
    const [viewportH, setViewportH] = useState(typeof window !== 'undefined' ? window.innerHeight : 800);
    const rafRef = useRef(null);
    const targetRef = useRef(0);

    const update = useCallback(() => {
        setScrollY(targetRef.current);
    }, []);

    useEffect(() => {
        const onScroll = () => {
            targetRef.current = window.scrollY;
            if (!rafRef.current) {
                rafRef.current = requestAnimationFrame(() => {
                    rafRef.current = null;
                    update();
                });
            }
        };

        const onResize = () => setViewportH(window.innerHeight);

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onResize);

        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onResize);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [update]);

    return (
        <ParallaxContext.Provider value={{ scrollY, viewportH }}>
            {children}
        </ParallaxContext.Provider>
    );
}
