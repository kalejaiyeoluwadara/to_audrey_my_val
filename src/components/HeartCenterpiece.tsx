import { useRef, useState, useMemo, useCallback, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion, useInView } from 'framer-motion';
import * as THREE from 'three';
import { useUrlParams } from '../hooks/useUrlParams';

// Generate heart shape points
function generateHeartPoints(count: number): Float32Array {
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const t = (i / count) * Math.PI * 2;
    const scale = 0.5;

    // Heart parametric equations
    const x = 16 * Math.pow(Math.sin(t), 3) * scale;
    const y =
      (13 * Math.cos(t) -
        5 * Math.cos(2 * t) -
        2 * Math.cos(3 * t) -
        Math.cos(4 * t)) *
      scale;
    const z = (Math.random() - 0.5) * 2;

    // Add some randomness for a particle cloud effect
    const spread = 0.5;
    positions[i * 3] = x * 0.1 + (Math.random() - 0.5) * spread;
    positions[i * 3 + 1] = y * 0.1 + (Math.random() - 0.5) * spread;
    positions[i * 3 + 2] = z * 0.3;
  }

  return positions;
}

// Rising heart particles when clicked
interface RisingHeart {
  id: number;
  x: number;
  y: number;
}

function HeartParticles({ particleCount }: { particleCount: number }) {
  const mesh = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const positions = generateHeartPoints(particleCount);
    const colors = new Float32Array(particleCount * 3);

    const colorPalette = [
      new THREE.Color('#F8C8DC'),
      new THREE.Color('#8B1E3F'),
      new THREE.Color('#D4AF37'),
    ];

    for (let i = 0; i < particleCount; i++) {
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    return { positions, colors };
  }, [particleCount]);

  useFrame((state) => {
    if (mesh.current) {
      const time = state.clock.getElapsedTime();

      // Slow pulse effect
      const pulse = 1 + Math.sin(time * 0.8) * 0.08;
      mesh.current.scale.setScalar(pulse);

      // Gentle rotation
      mesh.current.rotation.y = Math.sin(time * 0.2) * 0.1;

      // Update particle positions for breathing effect
      const posAttr = mesh.current.geometry.attributes.position;
      const basePositions = generateHeartPoints(particleCount);

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const wave = Math.sin(time * 0.5 + i * 0.01) * 0.02;
        posAttr.array[i3] = basePositions[i3] + wave;
        posAttr.array[i3 + 1] = basePositions[i3 + 1] + wave;
        posAttr.array[i3 + 2] = basePositions[i3 + 2] + Math.sin(time + i) * 0.01;
      }
      posAttr.needsUpdate = true;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// Mini rising heart component
const MiniHeart = ({ x, y, onComplete }: { x: number; y: number; onComplete: () => void }) => {
  return (
    <motion.div
      className="fixed text-[#F8C8DC] text-xl sm:text-2xl pointer-events-none select-none z-50"
      style={{ left: x, top: y }}
      initial={{ opacity: 1, y: 0, scale: 0.5 }}
      animate={{
        opacity: 0,
        y: -120,
        scale: 1.3,
        x: (Math.random() - 0.5) * 80,
      }}
      transition={{
        duration: 1.5,
        ease: 'easeOut',
      }}
      onAnimationComplete={onComplete}
    >
      💕
    </motion.div>
  );
};

export const HeartCenterpiece = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-50px' });
  const [risingHearts, setRisingHearts] = useState<RisingHeart[]>([]);
  const nextHeartId = useRef(0);
  const { name } = useUrlParams();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleHeartClick = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    // Get click/touch position
    let clientX: number, clientY: number;
    
    if ('touches' in e) {
      clientX = e.touches[0]?.clientX || window.innerWidth / 2;
      clientY = e.touches[0]?.clientY || window.innerHeight / 2;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    // Add multiple rising hearts
    const newHearts: RisingHeart[] = [];
    const heartCount = isMobile ? 3 : 5;
    for (let i = 0; i < heartCount; i++) {
      newHearts.push({
        id: nextHeartId.current++,
        x: clientX + (Math.random() - 0.5) * 100,
        y: clientY + (Math.random() - 0.5) * 60,
      });
    }
    setRisingHearts((prev) => [...prev, ...newHearts]);
  }, [isMobile]);

  const removeHeart = useCallback((id: number) => {
    setRisingHearts((prev) => prev.filter((h) => h.id !== id));
  }, []);

  // Reduce particle count on mobile for performance
  const particleCount = isMobile ? 400 : 800;

  return (
    <section ref={sectionRef} className="min-h-screen flex flex-col items-center justify-center relative px-4 sm:px-6 py-16 sm:py-24">
      <motion.h2
        className="font-elegant text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#FFF5E1] text-glow text-center mb-6 sm:mb-8 z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
      >
        From my heart
      </motion.h2>

      {/* 3D Heart Canvas */}
      <motion.div
        ref={containerRef}
        className="w-full max-w-md sm:max-w-lg h-[45vh] sm:h-[50vh] relative cursor-pointer touch-manipulation"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1.5, delay: 0.3 }}
        onClick={handleHeartClick}
        onTouchStart={handleHeartClick}
      >
        <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }}
          gl={{ antialias: !isMobile, alpha: true, powerPreference: 'high-performance' }}
          dpr={isMobile ? 1 : [1, 2]}
        >
          <ambientLight intensity={0.5} />
          <HeartParticles particleCount={particleCount} />
        </Canvas>

        {/* Central message */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1 }}
        >
          <motion.p
            className="font-elegant text-lg sm:text-xl md:text-2xl lg:text-3xl text-[#FFF5E1] text-center px-6 sm:px-8 text-glow"
            animate={{
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            I&apos;m just really grateful for you{name ? `, ${name}` : ''}.
          </motion.p>
        </motion.div>

        {/* Click hint */}
        <motion.p
          className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 text-[#D4AF37] text-xs sm:text-sm tracking-wider opacity-50"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.5 } : {}}
          transition={{ duration: 1, delay: 1.5 }}
        >
          tap the heart
        </motion.p>
      </motion.div>

      {/* Rising hearts */}
      {risingHearts.map((heart) => (
        <MiniHeart
          key={heart.id}
          x={heart.x}
          y={heart.y}
          onComplete={() => removeHeart(heart.id)}
        />
      ))}

      {/* Ambient glow */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(139, 30, 63, 0.2) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </section>
  );
};
