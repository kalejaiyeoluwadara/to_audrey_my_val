import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const GlassCard = ({ children, className = '', delay = 0 }: GlassCardProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      className={`glass-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 ${className}`}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 1.2,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

// Appreciation Message Section Component
export const AppreciationSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const lines = [
    "I just needed a space to say this properly.",
    "Having you in my life has been one of the most beautiful surprises.",
    "Your presence feels like peace wrapped in laughter.",
    "Every moment with you reminds me why some people are worth cherishing.",
    "You make the ordinary feel extraordinary."
  ];

  return (
    <section ref={ref} className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-16 sm:py-24">
      <GlassCard className="max-w-2xl mx-auto relative">
        <div className="space-y-4 sm:space-y-6">
          {lines.map((line, index) => (
            <motion.p
              key={index}
              className="font-elegant text-lg sm:text-xl md:text-2xl lg:text-3xl text-[#FFF5E1] leading-relaxed text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.3 + index * 0.3,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              {line}
            </motion.p>
          ))}
        </div>

        {/* Decorative elements - hidden on very small screens */}
        <motion.div
          className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-6 h-6 sm:w-8 sm:h-8 border-l-2 border-t-2 border-[#D4AF37] opacity-50 hidden sm:block"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 w-6 h-6 sm:w-8 sm:h-8 border-r-2 border-b-2 border-[#D4AF37] opacity-50 hidden sm:block"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
        />
      </GlassCard>
    </section>
  );
};
