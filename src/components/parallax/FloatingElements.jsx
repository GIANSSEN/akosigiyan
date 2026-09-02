import { useParallax } from './ParallaxLayout';
import { useTheme } from '@/context/ThemeContext';

const shapes = [
    { type: 'circle', size: 320, x: '10%', y: 120, speed: 0.15, opacity: 0.03 },
    { type: 'ring', size: 200, x: '80%', y: 400, speed: 0.08, opacity: 0.04 },
    { type: 'circle', size: 160, x: '70%', y: 900, speed: 0.12, opacity: 0.025 },
    { type: 'ring', size: 280, x: '20%', y: 1400, speed: 0.06, opacity: 0.035 },
    { type: 'circle', size: 120, x: '85%', y: 2000, speed: 0.1, opacity: 0.03 },
    { type: 'ring', size: 240, x: '15%', y: 2600, speed: 0.07, opacity: 0.025 },
    { type: 'circle', size: 180, x: '60%', y: 3200, speed: 0.09, opacity: 0.03 },
    { type: 'ring', size: 160, x: '40%', y: 3800, speed: 0.11, opacity: 0.02 },
];

export default function FloatingElements() {
    const { scrollY } = useParallax();
    const { isDark } = useTheme();

    const color = isDark ? '255,255,255' : '0,0,0';

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden>
            {shapes.map((s, i) => {
                const parallaxY = s.y - scrollY * s.speed;
                return (
                    <div
                        key={i}
                        className="absolute rounded-full"
                        style={{
                            width: s.size,
                            height: s.size,
                            left: s.x,
                            top: parallaxY,
                            opacity: s.opacity,
                            border: s.type === 'ring' ? `1.5px solid rgba(${color},0.15)` : 'none',
                            background: s.type === 'circle'
                                ? `radial-gradient(circle, rgba(${color},0.06) 0%, transparent 70%)`
                                : 'transparent',
                            transform: 'translate(-50%, -50%)',
                            transition: 'opacity 0.3s',
                        }}
                    />
                );
            })}
        </div>
    );
}
