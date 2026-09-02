/**
 * SectionHeader — icon + title header used at the top of every bento card.
 *
 * @param {ReactNode} icon  — SVG element
 * @param {string}    title — section heading text
 * @param {string}    className — optional extra classes on the wrapper
 */
export default function SectionHeader({ icon, title, className = '' }) {
    return (
        <div className={`flex items-center gap-2 mb-6 ${className}`}>
            <span className="w-5 h-5 text-gray-700 dark:text-gray-300 shrink-0 flex items-center">
                {icon}
            </span>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h2>
        </div>
    );
}
