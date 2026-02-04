import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const words = [
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

interface FloatingWordProps {
  word: typeof words[0];
  index: number;
  isInView: boolean;
}

const FloatingWord = ({ word, index, isInView }: FloatingWordProps) => {
  const [isHovered, setIsHovered] = useState(false);

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
        scale: isHovered ? 1.2 : 1,
      } : {}}
      transition={{
        duration: 0.8,
        delay: 0.2 + index * 0.15,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.span
        className={`
          font-elegant text-2xl sm:text-3xl md:text-4xl lg:text-5xl
          transition-all duration-500 select-none whitespace-nowrap block
          ${isHovered 
            ? 'text-[#D4AF37]' 
            : 'text-[#F8C8DC]'
          }
        `}
        animate={{
          y: [0, -8 - (index % 3) * 4, 0],
        }}
        transition={{
          duration: 4 + index * 0.3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          textShadow: isHovered 
            ? '0 0 40px rgba(212, 175, 55, 0.8), 0 0 80px rgba(212, 175, 55, 0.4)' 
            : '0 0 20px rgba(248, 200, 220, 0.3)',
        }}
      >
        {word.text}
      </motion.span>
    </motion.div>
  );
};

export const FloatingWords = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="min-h-screen flex flex-col items-center justify-center px-6 py-24">
      <motion.h2
        className="font-elegant text-3xl sm:text-4xl md:text-5xl text-[#FFF5E1] text-glow mb-8 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
      >
        What you are to me
      </motion.h2>

      <div className="relative w-full max-w-5xl h-[70vh]">
        {words.map((word, index) => (
          <FloatingWord
            key={word.text}
            word={word}
            index={index}
            isInView={isInView}
          />
        ))}

        {/* Ambient glow in center */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full pointer-events-none"
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
