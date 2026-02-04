import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

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
  isInView: boolean;
}

const EmotionSlide = ({ emotion, index, isInView }: EmotionSlideProps) => {
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
      className="flex-shrink-0 w-[85vw] sm:w-[75vw] md:w-[60vw] lg:w-[50vw] snap-center px-3 sm:px-4"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: 0.2 + index * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      <div className="glass-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 relative overflow-hidden h-full min-h-[200px] sm:min-h-[250px] flex items-center justify-center">
        <motion.p
          className="font-elegant text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[#FFF5E1] leading-relaxed text-center"
          animate={{ y: [0, -4, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {renderText()}
        </motion.p>

        {/* Slide number indicator */}
        <div className="absolute bottom-3 sm:bottom-4 right-4 sm:right-6 text-[#D4AF37] text-xs sm:text-sm font-light tracking-wider opacity-50">
          {String(index + 1).padStart(2, '0')}
        </div>

        {/* Ambient glow */}
        <motion.div
          className="absolute -inset-4 rounded-3xl pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(248, 200, 220, 0.08) 0%, transparent 70%)',
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
  const sectionRef = useRef(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-50px' });
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const itemWidth = scrollRef.current.offsetWidth * 0.85;
      const newIndex = Math.round(scrollLeft / itemWidth);
      setActiveIndex(Math.min(newIndex, emotions.length - 1));
    }
  };

  return (
    <section ref={sectionRef} className="min-h-screen relative py-16 sm:py-24 flex flex-col justify-center">
      <motion.h2
        className="font-elegant text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#FFF5E1] text-glow text-center mb-8 sm:mb-12 px-4 sm:px-6"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
      >
        Moments that matter
      </motion.h2>

      {/* Horizontal scroll container */}
      <div
        ref={scrollRef}
        className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 px-[7.5vw] sm:px-[12.5vw] md:px-[20vw]"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
        onScroll={handleScroll}
      >
        {emotions.map((emotion, index) => (
          <EmotionSlide 
            key={index} 
            emotion={emotion} 
            index={index}
            isInView={isInView}
          />
        ))}
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-6 sm:mt-8">
        {emotions.map((_, index) => (
          <motion.button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === activeIndex 
                ? 'bg-[#D4AF37] w-6' 
                : 'bg-[#F8C8DC] opacity-40'
            }`}
            onClick={() => {
              if (scrollRef.current) {
                const itemWidth = scrollRef.current.offsetWidth * 0.85;
                scrollRef.current.scrollTo({
                  left: index * itemWidth,
                  behavior: 'smooth'
                });
              }
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Swipe hint for mobile */}
      <motion.p
        className="text-center text-[#F8C8DC] text-sm opacity-50 mt-4 md:hidden"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.5 } : {}}
        transition={{ delay: 1.5 }}
      >
        swipe to explore
      </motion.p>

      {/* Ambient background elements */}
      <motion.div
        className="absolute top-20 left-5 sm:left-10 w-24 sm:w-32 h-24 sm:h-32 rounded-full bg-[#8B1E3F] opacity-10 blur-3xl pointer-events-none"
        animate={{
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-20 right-5 sm:right-20 w-32 sm:w-48 h-32 sm:h-48 rounded-full bg-[#D4AF37] opacity-5 blur-3xl pointer-events-none"
        animate={{
          y: [0, 20, 0],
          scale: [1.1, 1, 1.1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </section>
  );
};
