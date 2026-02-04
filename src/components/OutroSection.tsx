import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useUrlParams } from '../hooks/useUrlParams';

interface OutroSectionProps {
  onReplay: () => void;
}

export const OutroSection = ({ onReplay }: OutroSectionProps) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-50px' });
  const { name } = useUrlParams();

  const lines = [
    "Not asking you to be my Valentine.",
    `Just thankful you&apos;re here${name ? `, ${name}` : ''}.`,
    "And excited about us, in the most beautiful way."
  ];

  return (
    <section ref={sectionRef} className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-16 sm:py-24 relative">
      {/* Main text content */}
      <div className="max-w-2xl text-center space-y-6 sm:space-y-8">
        {lines.map((line, index) => (
          <motion.p
            key={index}
            className="font-elegant text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-[#FFF5E1] leading-relaxed px-2"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 1,
              delay: 0.5 + index * 0.5,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            dangerouslySetInnerHTML={{ __html: line }}
          />
        ))}
      </div>

      {/* Signature / closing */}
      <motion.div
        className="mt-12 sm:mt-16 text-center"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 2.2 }}
      >
        <motion.div
          className="w-12 sm:w-16 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mb-6 sm:mb-8"
          animate={{ scaleX: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <p className="text-[#F8C8DC] text-base sm:text-lg tracking-wider font-light">
          With love, always.
        </p>
      </motion.div>

      {/* Replay button */}
      <motion.button
        className="mt-12 sm:mt-16 group relative touch-manipulation"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 2.7 }}
        onClick={onReplay}
      >
        <span className="relative z-10 px-6 sm:px-8 py-3 sm:py-4 block text-[#FFF5E1] text-xs sm:text-sm tracking-[0.15em] sm:tracking-[0.2em] uppercase font-light transition-colors duration-500 group-hover:text-[#D4AF37] group-active:text-[#D4AF37]">
          Replay the experience
        </span>
        
        {/* Button border */}
        <span className="absolute inset-0 border border-[#D4AF37] opacity-50 rounded-full transition-all duration-500 group-hover:opacity-100 group-hover:scale-105 group-active:opacity-100 group-active:scale-105" />
        
        {/* Glow effect on hover/active */}
        <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-500 bg-[#D4AF37]/10 blur-xl" />
      </motion.button>

      {/* Decorative elements */}
      <motion.div
        className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 flex gap-2"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.3 } : {}}
        transition={{ duration: 1, delay: 3 }}
      >
        {[...Array(3)].map((_, i) => (
          <motion.span
            key={i}
            className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-[#F8C8DC]"
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </motion.div>

      {/* Ambient glows */}
      <motion.div
        className="absolute top-1/4 left-[10%] sm:left-1/4 w-48 sm:w-64 h-48 sm:h-64 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(139, 30, 63, 0.15) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-[10%] sm:right-1/4 w-36 sm:w-48 h-36 sm:h-48 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.1) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </section>
  );
};
