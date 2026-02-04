import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

// Desktop positions (spread out)
const desktopWords = [
  { text: 'Peace', x: -35, y: -40 },
  { text: 'Light', x: 30, y: -45 },
  { text: 'Comfort', x: -40, y: 5 },
  { text: 'Joy', x: 40, y: 0 },
  { text: 'Safe place', x: -30, y: 45 },
  { text: 'Home', x: 35, y: 40 },
  { text: 'Warmth', x: 0, y: -55 },
  { text: 'Serenity', x: -45, y: -20 },
  { text: 'Bliss', x: 45, y: -25 },
];

// Mobile positions (tighter, organized grid-like)
const mobileWords = [
  { text: 'Peace', x: -25, y: -35 },
  { text: 'Light', x: 25, y: -35 },
  { text: 'Warmth', x: 0, y: -20 },
  { text: 'Comfort', x: -30, y: 0 },
  { text: 'Joy', x: 30, y: 0 },
  { text: 'Serenity', x: 0, y: 15 },
  { text: 'Safe place', x: -25, y: 35 },
  { text: 'Home', x: 25, y: 35 },
  { text: 'Bliss', x: 0, y: 50 },
];

interface FloatingWordProps {
  word: { text: string; x: number; y: number };
  index: number;
  isInView: boolean;
  isMobile: boolean;
}

const FloatingWord = ({ word, index, isInView, isMobile }: FloatingWordProps) => {
  const [isActive, setIsActive] = useState(false);

  const handleInteraction = () => {
    setIsActive(true);
    setTimeout(() => setIsActive(false), 1000);
  };

  return (
    <motion.div
      className="absolute cursor-default"
      style={{
        left: `${50 + word.x}%`,
        top: `${50 + word.y}%`,
        transform: 'translate(-50%, -50%)',
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? {
        opacity: 1,
        scale: isActive ? 1.2 : 1,
      } : {}}
      transition={{
        duration: 0.8,
        delay: 0.2 + index * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      onMouseEnter={() => !isMobile && setIsActive(true)}
      onMouseLeave={() => !isMobile && setIsActive(false)}
      onTouchStart={handleInteraction}
    >
      <motion.span
        className={`
          font-elegant select-none whitespace-nowrap block
          text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl
          transition-all duration-500
          ${isActive 
            ? 'text-[#D4AF37]' 
            : 'text-[#F8C8DC]'
          }
        `}
        animate={{
          y: [0, -6 - (index % 3) * 2, 0],
        }}
        transition={{
          duration: 4 + index * 0.3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          textShadow: isActive 
            ? '0 0 30px rgba(212, 175, 55, 0.8), 0 0 60px rgba(212, 175, 55, 0.4)' 
            : '0 0 15px rgba(248, 200, 220, 0.3)',
        }}
      >
        {word.text}
      </motion.span>
    </motion.div>
  );
};

export const FloatingWords = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const words = isMobile ? mobileWords : desktopWords;

  return (
    <section ref={ref} className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-16 sm:py-24">
      <motion.h2
        className="font-elegant text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#FFF5E1] text-glow mb-6 sm:mb-8 text-center px-4"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
      >
        What you are to me
      </motion.h2>

      <motion.p
        className="text-[#F8C8DC] text-sm sm:text-base opacity-60 mb-8 text-center md:hidden"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.6 } : {}}
        transition={{ delay: 1.5 }}
      >
        tap a word
      </motion.p>

      <div className="relative w-full max-w-5xl h-[60vh] sm:h-[65vh] md:h-[70vh]">
        {words.map((word, index) => (
          <FloatingWord
            key={word.text}
            word={word}
            index={index}
            isInView={isInView}
            isMobile={isMobile}
          />
        ))}

        {/* Ambient glow in center */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 sm:w-64 h-48 sm:h-64 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(248, 200, 220, 0.1) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
    </section>
  );
};
