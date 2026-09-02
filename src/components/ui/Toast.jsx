import { createContext, useCallback, useContext, useRef } from 'react';
import { createPortal } from 'react-dom';

// ─── Context ───────────────────────────────────────────────────────────────────
const ToastContext = createContext(null);

export function useToast() {
    const ctx = useContext(ToastContext);
    if (!ctx) throw new Error('useToast must be used inside ToastProvider');
    return ctx;
}

// ─── Provider ─────────────────────────────────────────────────────────────────
export function ToastProvider({ children }) {
    const containerRef = useRef(null);

    const showToast = useCallback((message) => {
        const container = containerRef.current;
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = [
            'bg-gray-900/90 dark:bg-white/90 text-white dark:text-gray-900',
            'px-6 py-3 rounded-full shadow-2xl font-bold text-sm',
            'backdrop-blur-md flex items-center gap-2',
            'transition-all duration-300 opacity-0 translate-y-full',
        ].join(' ');
        toast.setAttribute('role', 'status');

        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('class', 'w-5 h-5 text-blue-400 dark:text-blue-600 shrink-0');
        svg.setAttribute('fill', 'none');
        svg.setAttribute('stroke', 'currentColor');
        svg.setAttribute('viewBox', '0 0 24 24');
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('stroke-linecap', 'round');
        path.setAttribute('stroke-linejoin', 'round');
        path.setAttribute('stroke-width', '2');
        path.setAttribute('d', 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z');
        svg.appendChild(path);

        const label = document.createElement('span');
        label.textContent = message;

        toast.append(svg, label);
        container.appendChild(toast);

        requestAnimationFrame(() => {
            toast.classList.remove('opacity-0', 'translate-y-full');
        });
        setTimeout(() => {
            toast.classList.add('opacity-0', 'translate-y-full');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }, []);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {createPortal(
                <div
                    id="toast-container"
                    ref={containerRef}
                    className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 pointer-events-none"
                />,
                document.body
            )}
        </ToastContext.Provider>
    );
}
