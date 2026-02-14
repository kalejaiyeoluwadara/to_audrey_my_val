import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface LetterSectionProps {
  heading: string
  body: string
  align?: 'left' | 'center' | 'right'
  variant?: 'fade-up' | 'slide-left' | 'slide-right' | 'scale' | 'split'
}

/* stagger children one by one */
const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.045 },
  },
}

const charVariant = {
  hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.45, ease: 'easeOut' },
  },
}

/* per-word stagger for the body text */
const wordContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
}

const wordVariant = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

/* whole-block motion presets */
const variants = {
  'fade-up': {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 },
  },
  'slide-left': {
    hidden: { opacity: 0, x: 80 },
    visible: { opacity: 1, x: 0 },
  },
  'slide-right': {
    hidden: { opacity: 0, x: -80 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.75 },
    visible: { opacity: 1, scale: 1 },
  },
  split: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
}

export default function LetterSection({
  heading,
  body,
  align = 'center',
  variant = 'fade-up',
}: LetterSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-15% 0px' })

  const textAlign =
    align === 'left'
      ? 'text-left'
      : align === 'right'
        ? 'text-right'
        : 'text-center'

  const isSplit = variant === 'split'

  return (
    <section
      ref={ref}
      className={`relative min-h-[70vh] md:min-h-[80vh] flex items-center justify-center px-6 md:px-12 py-20 ${textAlign}`}
    >
      <motion.div
        className="max-w-2xl w-full"
        variants={!isSplit ? variants[variant] : undefined}
        initial={!isSplit ? 'hidden' : undefined}
        animate={!isSplit && isInView ? 'visible' : !isSplit ? 'hidden' : undefined}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* ---- Heading ---- */}
        {isSplit ? (
          <motion.h2
            className="font-elegant text-4xl md:text-6xl text-white/90 text-glow mb-6 md:mb-8 leading-snug"
            variants={container}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            {heading.split('').map((char, i) => (
              <motion.span key={i} variants={charVariant} className="inline-block">
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </motion.h2>
        ) : (
          <motion.h2
            className="font-elegant text-4xl md:text-6xl text-white/90 text-glow mb-6 md:mb-8 leading-snug"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
          >
            {heading}
          </motion.h2>
        )}

        {/* ---- Body ---- */}
        <motion.div
          className="font-elegant text-lg md:text-2xl text-rose-200/80 leading-relaxed tracking-wide italic"
          variants={wordContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {body.split(' ').map((word, i) => (
            <motion.span key={i} variants={wordVariant} className="inline-block mr-[0.3em]">
              {word}
            </motion.span>
          ))}
        </motion.div>

        {/* ---- Decorative divider ---- */}
        <motion.div
          className="flex items-center justify-center gap-3 mt-8 md:mt-12"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="h-px w-12 bg-linear-to-r from-transparent to-rose-400/40" />
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-rose-400/60 animate-heartbeat">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <div className="h-px w-12 bg-linear-to-l from-transparent to-rose-400/40" />
        </motion.div>
      </motion.div>
    </section>
  )
}
