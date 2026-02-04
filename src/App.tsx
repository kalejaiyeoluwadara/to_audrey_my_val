import { useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ThreeBackground,
  HeroSection,
  AppreciationSection,
  FloatingWords,
  EmotionSlider,
  HeartCenterpiece,
  OutroSection,
  CursorGlow,
  ScrollProgress,
} from './components';

function App() {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleReplay = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        ref={containerRef}
        className="relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* 3D Background */}
        <ThreeBackground />

        {/* Cursor glow effect */}
        <CursorGlow />

        {/* Scroll progress indicator */}
        <ScrollProgress />

        {/* Main content sections */}
        <main className="relative z-10">
          {/* Section 1: Cinematic Hero */}
          <HeroSection />

          {/* Section 2: Appreciation Message */}
          <AppreciationSection />

          {/* Section 3: Floating Words */}
          <FloatingWords />

          {/* Section 4: Emotion Slider */}
          <EmotionSlider />

          {/* Section 5: Heart Centerpiece */}
          <HeartCenterpiece />

          {/* Section 6: Outro */}
          <OutroSection onReplay={handleReplay} />
        </main>

        {/* Gradient overlays for depth */}
        {/* <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#0D0A0B] to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0D0A0B] to-transparent" />
        </div> */}
      </motion.div>
    </AnimatePresence>
  );
}

export default App;
