import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext(null);

/**
 * ThemeProvider
 *
 * Lightweight provider that initialises dark/light mode from localStorage
 * (or system preference) and keeps the `isDark` value available to any
 * component that calls `useTheme()`.
 *
 * Theme toggling is now handled entirely by <AnimatedThemeToggler>, which
 * uses the View Transitions API for a smooth radial-clip reveal.  This
 * provider simply syncs with whatever the toggler writes to the DOM.
 */
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

    // Apply/remove the `dark` class and keep meta-theme-color in sync
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

    // Stay in sync when AnimatedThemeToggler mutates the class directly
    useEffect(() => {
        const observer = new MutationObserver(() => {
            setIsDark(document.documentElement.classList.contains('dark'));
        });
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class'],
        });
        return () => observer.disconnect();
    }, []);

    return (
        <ThemeContext.Provider value={{ isDark }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');
    return ctx;
}
