import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const GlassCard = ({ children, className = '', delay = 0 }: GlassCardProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      className={`glass-card rounded-3xl p-8 sm:p-12 ${className}`}
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 1.2,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
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
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const lines = [
    "I just needed a space to say this properly.",
    "Having you in my life has been one of the most beautiful surprises.",
    "Your presence feels like peace wrapped in laughter.",
    "Every moment with you reminds me why some people are worth cherishing.",
    "You make the ordinary feel extraordinary."
  ];

  return (
    <section ref={ref} className="min-h-screen flex items-center justify-center px-6 py-24">
      <GlassCard className="max-w-2xl mx-auto">
        <div className="space-y-6">
          {lines.map((line, index) => (
            <motion.p
              key={index}
              className="font-elegant text-xl sm:text-2xl md:text-3xl text-[#FFF5E1] leading-relaxed text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.3 + index * 0.4,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              {line}
            </motion.p>
          ))}
        </div>

        {/* Decorative elements */}
        <motion.div
          className="absolute -top-4 -left-4 w-8 h-8 border-l-2 border-t-2 border-[#D4AF37] opacity-50"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-4 -right-4 w-8 h-8 border-r-2 border-b-2 border-[#D4AF37] opacity-50"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
        />
      </GlassCard>
    </section>
  );
};
