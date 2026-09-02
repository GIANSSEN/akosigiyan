/**
 * TechMarquee — horizontally scrolling technology pill rows.
 * Each pill shows a SimpleIcons brand logo + tech name.
 * Rows alternate scroll direction; all pause on hover.
 */

/* ── CSS injected once ─────────────────────────────────────────── */
const css = `
@keyframes tech-marquee-left {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
@keyframes tech-marquee-right {
  from { transform: translateX(-50%); }
  to   { transform: translateX(0); }
}
.tech-marquee-track-left {
  animation: tech-marquee-left 35s linear infinite;
}
.tech-marquee-track-right {
  animation: tech-marquee-right 38s linear infinite;
}
.tech-marquee-wrap:hover .tech-marquee-track-left,
.tech-marquee-wrap:hover .tech-marquee-track-right {
  animation-play-state: paused;
}
@media (prefers-reduced-motion: reduce) {
  .tech-marquee-track-left,
  .tech-marquee-track-right { animation: none; }
}
`;

/* ── Single tech pill ──────────────────────────────────────────── */
function TechPill({ name, slug, color, invertDark, aria }) {
    return (
        <div
            className="flex shrink-0 items-center gap-2 sm:gap-2.5 border border-gray-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.03] rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 mx-1.5 sm:mx-2 cursor-default select-none shadow-[0_1px_3px_rgba(0,0,0,0.06)] dark:shadow-none hover:border-gray-300 dark:hover:border-white/15 hover:shadow-[0_2px_6px_rgba(0,0,0,0.09)] transition-all duration-200"
            aria-hidden={aria || undefined}
        >
            <img
                src={`https://cdn.simpleicons.org/${slug}`}
                alt=""
                className={`w-4 h-4 sm:w-[18px] sm:h-[18px] shrink-0 ${invertDark ? 'dark:invert dark:brightness-150' : ''}`}
                loading="lazy"
                onError={e => { e.target.style.display = 'none'; }}
            />
            <span className="text-[12px] sm:text-[13.5px] font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
                {name}
            </span>
        </div>
    );
}

/* ── Single marquee row ────────────────────────────────────────── */
function MarqueeRow({ items, direction = 'left', speed = 35 }) {
    const trackClass = direction === 'left'
        ? 'tech-marquee-track-left'
        : 'tech-marquee-track-right';

    return (
        <div
            className="tech-marquee-wrap relative overflow-hidden w-full [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
        >
            <div
                className={`${trackClass} flex w-max items-center py-1.5`}
                style={{ animationDuration: `${speed}s` }}
            >
                {/* Duplicate for seamless loop */}
                {[...items, ...items].map((tech, i) => (
                    <TechPill
                        key={`${tech.slug}-${i}`}
                        {...tech}
                        aria={i >= items.length ? 'true' : undefined}
                    />
                ))}
            </div>
        </div>
    );
}

/* ── Exported component ────────────────────────────────────────── */
export default function TechMarquee({ rows }) {
    return (
        <div className="flex flex-col gap-3 w-full">
            <style>{css}</style>
            {rows.map((items, i) => (
                <MarqueeRow
                    key={i}
                    items={items}
                    direction={i % 2 === 1 ? 'right' : 'left'}
                    speed={33 + i * 4}
                />
            ))}
        </div>
    );
}
