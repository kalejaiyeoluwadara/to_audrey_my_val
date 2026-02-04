import { motion } from 'framer-motion';
import { useUrlParams } from '../hooks/useUrlParams';

export const HeroSection = () => {
  const { name } = useUrlParams();
  const mainText = name ? `Hey ${name}…` : "Hey you…";
  const subLines = [
    "This isn&apos;t a proposal.",
    "It&apos;s something better."
  ];

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6">
      {/* Main heading with letter-by-letter animation */}
      <motion.h1
        className="font-elegant text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-[#FFF5E1] text-glow tracking-wide mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        {mainText.split('').map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.5 + index * 0.08,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="inline-block"
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.5 + mainText.length * 0.08 + 0.3,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="inline-block ml-2"
        >
          🤍
        </motion.span>
      </motion.h1>

      {/* Subtitle lines with fade-in */}
      <div className="space-y-4 text-center">
        {subLines.map((line, lineIndex) => (
          <motion.p
            key={lineIndex}
            className="text-xl sm:text-2xl md:text-3xl text-[#F8C8DC] font-light tracking-wider"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 2 + lineIndex * 0.8,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            dangerouslySetInnerHTML={{ __html: line }}
          />
        ))}
      </div>

      {/* Heartbeat animation on container */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ scale: 1 }}
        animate={{
          scale: [1, 1.02, 1, 1.03, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatDelay: 1,
          ease: 'easeInOut',
        }}
      />

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-12 flex flex-col items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4, duration: 1 }}
      >
        <motion.p
          className="text-[#D4AF37] text-sm tracking-[0.3em] uppercase font-light"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Scroll slowly…
        </motion.p>
        <motion.div
          className="w-px h-16 bg-gradient-to-b from-[#D4AF37] to-transparent"
          animate={{ scaleY: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
};
