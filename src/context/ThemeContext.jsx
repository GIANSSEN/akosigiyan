import { createContext, useContext, useEffect, useState, useRef, useCallback } from 'react';

const ThemeContext = createContext(null);

// Snappy, silky curtain — fall fast, rise slightly faster
const FALL_DURATION = 320;   // ms — curtain sweeps down
const RISE_DURATION = 260;   // ms — curtain sweeps up (slightly faster)
const FALL_EASING   = 'cubic-bezier(0.4, 0, 0.2, 1)';  // smooth accelerate-decelerate
const RISE_EASING   = 'cubic-bezier(0.4, 0, 1, 1)';    // ease-in for quick reveal

export function ThemeProvider({ children }) {
    const [isDark, setIsDark] = useState(() => {
        try {
            const saved = localStorage.getItem('theme');
            if (saved) return saved === 'dark';
            return window.matchMedia('(prefers-color-scheme: dark)').matches;
        } catch {
            return false;
        }
    });

    // Curtain phase: 'idle' | 'falling' | 'rising'
    const [curtainPhase, setCurtainPhase] = useState('idle');
    const curtainColorRef = useRef('');
    const timeoutRef = useRef(null);

    // Apply dark class + storage whenever isDark changes
    useEffect(() => {
        const html = document.documentElement;
        if (isDark) {
            html.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            const metaTheme = document.querySelector('meta[name="theme-color"]');
            if (metaTheme) metaTheme.setAttribute('content', '#0a0a0a');
        } else {
            html.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            const metaTheme = document.querySelector('meta[name="theme-color"]');
            if (metaTheme) metaTheme.setAttribute('content', '#ffffff');
        }
    }, [isDark]);

    // Cleanup on unmount
    useEffect(() => () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }, []);

    const toggleTheme = useCallback(() => {
        if (curtainPhase !== 'idle') return; // block while animating

        const next = !isDark;
        // Curtain color = destination background
        curtainColorRef.current = next ? '#0a0a0a' : '#ffffff';

        // Phase 1 — curtain falls down covering screen
        setCurtainPhase('falling');

        timeoutRef.current = setTimeout(() => {
            // Swap theme while fully hidden behind curtain
            setIsDark(next);

            // Phase 2 — curtain rises up revealing new theme
            setCurtainPhase('rising');

            timeoutRef.current = setTimeout(() => {
                setCurtainPhase('idle');
            }, RISE_DURATION + 40);
        }, FALL_DURATION);
    }, [curtainPhase, isDark]);

    return (
        <ThemeContext.Provider value={{
            isDark,
            toggleTheme,
            curtainPhase,
            curtainColorRef,
            FALL_DURATION,
            RISE_DURATION,
            FALL_EASING,
            RISE_EASING,
        }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');
    return ctx;
}

/* ── Curtain Overlay ─────────────────────────────────────────────────────────
   Renders a fixed full-viewport div that sweeps down then up on theme toggle.
   Mounted once at App root so it covers every element on screen.
─────────────────────────────────────────────────────────────────────────────*/
export function CurtainOverlay() {
    const { curtainPhase, curtainColorRef, FALL_DURATION, RISE_DURATION, FALL_EASING, RISE_EASING } = useTheme();
    const isAnimating = curtainPhase !== 'idle';

    // falling → scaleY(1) from top; rising → scaleY(0) from bottom
    const isFalling = curtainPhase === 'falling';
    const duration  = isFalling ? FALL_DURATION : RISE_DURATION;
    const easing    = isFalling ? FALL_EASING   : RISE_EASING;

    const style = {
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        pointerEvents: isAnimating ? 'all' : 'none',
        background: curtainColorRef.current || 'transparent',
        transformOrigin: isFalling ? 'top' : 'bottom',
        transform: isFalling ? 'scaleY(1)' : 'scaleY(0)',
        transition: isAnimating
            ? `transform ${duration}ms ${easing}`
            : 'none',
        // GPU-composite only — no repaints during animation
        willChange: 'transform',
    };

    return <div aria-hidden="true" style={style} />;
}
