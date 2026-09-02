import { motion } from 'framer-motion';
import { useReducedMotion } from 'framer-motion';

export default function AnimatedText({
    text,
    className = '',
    delay = 0,
    staggerDelay = 0.03,
    tag: Tag = 'span',
    once = true,
}) {
    const reduceMotion = useReducedMotion();

    if (reduceMotion) {
        return <Tag className={className}>{text}</Tag>;
    }

    const words = text.split(' ');

    return (
        <Tag className={className} aria-label={text}>
            {words.map((word, wi) => (
                <span key={wi} className="inline-block mr-[0.3em]">
                    {word.split('').map((char, ci) => (
                        <motion.span
                            key={ci}
                            className="inline-block"
                            initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
                            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            viewport={{ once, margin: '0px 0px -40px 0px' }}
                            transition={{
                                duration: 0.5,
                                delay: delay + wi * staggerDelay * words.length + ci * staggerDelay,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                        >
                            {char}
                        </motion.span>
                    ))}
                </span>
            ))}
        </Tag>
    );
}
