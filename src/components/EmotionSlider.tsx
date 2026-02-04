import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const emotions = [
  {
    text: "You make normal days feel special.",
    accent: "special"
  },
  {
    text: "Your smile fixes things you don&apos;t even know are broken.",
    accent: "smile"
  },
  {
    text: "I&apos;m genuinely excited to see where life goes with you in it.",
    accent: "excited"
  },
  {
    text: "With you, silence feels comfortable, not awkward.",
    accent: "comfortable"
  },
  {
    text: "You&apos;ve shown me what it means to feel truly seen.",
    accent: "seen"
  }
];

interface EmotionSlideProps {
  emotion: typeof emotions[0];
  index: number;
}

const EmotionSlide = ({ emotion, index }: EmotionSlideProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-20%' });

  // Highlight the accent word
  const renderText = () => {
    const parts = emotion.text.split(new RegExp(`(${emotion.accent})`, 'i'));
    return parts.map((part, i) => {
      if (part.toLowerCase() === emotion.accent.toLowerCase()) {
        return (
          <span key={i} className="text-[#D4AF37] text-glow-gold">
            {part}
          </span>
        );
      }
      return <span key={i} dangerouslySetInnerHTML={{ __html: part }} />;
    });
  };

  return (
    <motion.div
      ref={ref}
      className="flex-shrink-0 w-[80vw] sm:w-[60vw] md:w-[50vw] h-[50vh] flex items-center justify-center px-8"
      initial={{ opacity: 0, x: 100 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 1,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      <div className="glass-card rounded-3xl p-8 sm:p-12 max-w-lg relative overflow-hidden">
        <motion.p
          className="font-elegant text-2xl sm:text-3xl md:text-4xl text-[#FFF5E1] leading-relaxed text-center"
          animate={{ y: [0, -5, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {renderText()}
        </motion.p>

        {/* Slide number indicator */}
        <motion.div
          className="absolute bottom-4 right-6 text-[#D4AF37] text-sm font-light tracking-wider opacity-50"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.5 } : {}}
          transition={{ delay: 0.5 }}
        >
          {String(index + 1).padStart(2, '0')}
        </motion.div>

        {/* Ambient glow */}
        <motion.div
          className="absolute -inset-4 rounded-3xl pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(248, 200, 220, 0.1) 0%, transparent 70%)',
          }}
          animate={{
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
    </motion.div>
  );
};

export const EmotionSlider = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const x = useTransform(scrollYProgress, [0.2, 0.8], ['0%', '-60%']);

  return (
    <section ref={sectionRef} className="min-h-[150vh] relative py-24">
      <motion.h2
        className="font-elegant text-3xl sm:text-4xl md:text-5xl text-[#FFF5E1] text-glow text-center mb-12 px-6"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
      >
        Moments that matter
      </motion.h2>

      <div ref={containerRef} className="sticky top-1/4 overflow-hidden">
        <motion.div
          className="flex gap-8 pl-[10vw]"
          style={{ x }}
        >
          {emotions.map((emotion, index) => (
            <EmotionSlide key={index} emotion={emotion} index={index} />
          ))}

          {/* End spacer */}
          <div className="flex-shrink-0 w-[20vw]" />
        </motion.div>
      </div>

      {/* Parallax background elements */}
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 rounded-full bg-[#8B1E3F] opacity-10 blur-3xl"
        style={{
          y: useTransform(scrollYProgress, [0, 1], [0, -100]),
        }}
      />
      <motion.div
        className="absolute bottom-40 right-20 w-48 h-48 rounded-full bg-[#D4AF37] opacity-5 blur-3xl"
        style={{
          y: useTransform(scrollYProgress, [0, 1], [0, 100]),
        }}
      />
    </section>
  );
};
