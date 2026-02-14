import { motion, useScroll, useSpring } from 'framer-motion'
import FloatingHearts from './components/FloatingHearts'
import LetterSection from './components/LetterSection'
import DomeGallery from './components/DomeGallery'

const letters = [
  {
    heading: 'Dara really did need a life',
    body: 'Twas always me, my code and I, before you came into the picture and gave me a reason to stop writing code and start writing stories.',
    variant: 'fade-up' as const,
    align: 'center' as const,
  },
  {
    heading: 'No Competion for my Baby',
    body: 'Who, where, it"s you or nobody babe, nobody can compare to you.I most definitely miss you when I am away from you haven"t felt this way in ages.',
    variant: 'slide-left' as const,
    align: 'left' as const,
  },
  {
    heading: 'My heart burns for you Audrey',
    body: 'When your heart burns for someone, and theirs for you, it"s beyond what words can describe. God it"s epic it beautiful...',
    variant: 'scale' as const,
    align: 'left' as const,
  },
  {
    heading: 'I love you to the moon and back babe',
    body: 'It"s not an exaggeration love, it"s a facttttt.',
    variant: 'split' as const,
    align: 'center' as const,
  },
  {
    heading: 'I choose you',
    body: 'not just today, not just tomorrow, but in every lifetime, every universe, every version of us that could ever exist.',
    variant: 'slide-right' as const,
    align: 'right' as const,
  },
  {
    heading: 'You make ordinary moments',
    body: 'feel like magic. A simple walk with you becomes an adventure. Silence with you becomes my favourite song. It"s like drug at this point, that one time you told me you won"t be able to wait for me made me realise how much I"ve fallen for you and I"m never gonna regret it. ',
    variant: 'scale' as const,
    align: 'center' as const,
  },
  {
    heading: 'Forever yours',
    body: 'Totally concluded there wasn"t any girl in Babcock that could perfectly understand me and accept me for who I am and I"m so glad you are the one babe.',
    variant: 'fade-up' as const,
    align: 'center' as const,
  },
]

function App() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <div className="relative valentine-gradient">
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-linear-to-r from-rose-400 via-red-500 to-rose-400 z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Floating hearts */}
      <FloatingHearts />

      {/* Hero section */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.div
            className="mb-6"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 md:w-16 md:h-16 text-rose-400 mx-auto drop-shadow-[0_0_15px_rgba(244,63,94,0.4)]">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </motion.div>

          <h1 className="font-elegant text-5xl md:text-7xl lg:text-8xl text-white/90 text-glow leading-tight tracking-wide mb-4">
            For You, Audrey, My Love
          </h1>

          <motion.p
            className="text-rose-200/60 text-base md:text-lg tracking-widest uppercase"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            scroll down, my heart awaits
          </motion.p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="w-6 h-10 border-2 border-rose-300/30 rounded-full flex justify-center pt-2">
            <motion.div
              className="w-1.5 h-1.5 bg-rose-400/60 rounded-full"
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      </section>

      {/* Letter sections */}
      {letters.map((letter, i) => (
        <LetterSection
          key={i}
          heading={letter.heading}
          body={letter.body}
          variant={letter.variant}
          align={letter.align}
        />
      ))}

      {/* Closing section */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-[60vh] px-6 pb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 1 }}
          className="space-y-6"
        >
          <p className="font-elegant text-2xl md:text-4xl text-rose-300/70 italic">
            &mdash; with all my love, always &amp; forever &mdash;
          </p>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-rose-500/50 mx-auto">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </motion.div>
        </motion.div>
      </section>
       <div style={{ width: '100vw', height: '100vh' }}>
      <DomeGallery
  fit={0.8}
  minRadius={600}
  maxVerticalRotationDeg={0}
  segments={34}
  dragDampening={2}
  grayscale
/>
    </div>
    </div>
  )
}

export default App
