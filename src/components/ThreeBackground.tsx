import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom, Noise } from '@react-three/postprocessing';
import * as THREE from 'three';
import { useMousePosition } from '../hooks/useMousePosition';

// Hook to detect mobile devices
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

// Floating particles component
function FloatingParticles({ count = 500 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null);
  const mousePos = useMousePosition();

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    const colorPalette = [
      new THREE.Color('#F8C8DC'), // soft pink
      new THREE.Color('#8B1E3F'), // deep rose
      new THREE.Color('#D4AF37'), // gold
      new THREE.Color('#FFF5E1'), // warm cream
    ];

    for (let i = 0; i < count; i++) {
      // Spread particles in a sphere-like volume
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const radius = 5 + Math.random() * 15;

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi) - 10;

      // Random color from palette
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      // Varied sizes for depth effect
      sizes[i] = Math.random() * 0.5 + 0.1;
    }

    return { positions, colors, sizes };
  }, [count]);

  useFrame((state) => {
    if (mesh.current) {
      const time = state.clock.getElapsedTime();
      
      // Slow rotation
      mesh.current.rotation.y = time * 0.02;
      mesh.current.rotation.x = Math.sin(time * 0.01) * 0.1;
      
      // Mouse influence
      mesh.current.rotation.y += mousePos.normalizedX * 0.001;
      mesh.current.rotation.x += mousePos.normalizedY * 0.001;

      // Update particle positions for floating effect
      const positions = mesh.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        positions[i3 + 1] += Math.sin(time * 0.5 + i * 0.1) * 0.002;
      }
      mesh.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles.positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[particles.colors, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[particles.sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// Bokeh-like glowing orbs
function BokehOrbs({ count = 30 }: { count?: number }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const mousePos = useMousePosition();

  const { positions, scales, colors, speeds } = useMemo(() => {
    const positions: THREE.Vector3[] = [];
    const scales: number[] = [];
    const colors: THREE.Color[] = [];
    const speeds: number[] = [];

    const colorPalette = [
      new THREE.Color('#F8C8DC').multiplyScalar(0.5), // soft pink
      new THREE.Color('#8B1E3F').multiplyScalar(0.4), // deep rose
      new THREE.Color('#D4AF37').multiplyScalar(0.3), // gold
    ];

    for (let i = 0; i < count; i++) {
      positions.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20 - 5
        )
      );
      scales.push(Math.random() * 0.8 + 0.2);
      colors.push(colorPalette[Math.floor(Math.random() * colorPalette.length)]);
      speeds.push(Math.random() * 0.5 + 0.2);
    }

    return { positions, scales, colors, speeds };
  }, [count]);

  useFrame((state) => {
    if (mesh.current) {
      const time = state.clock.getElapsedTime();

      for (let i = 0; i < count; i++) {
        const matrix = new THREE.Matrix4();
        const position = positions[i].clone();

        // Floating motion
        position.y += Math.sin(time * speeds[i] + i) * 0.5;
        position.x += Math.cos(time * speeds[i] * 0.5 + i) * 0.3;

        // Mouse influence
        position.x += mousePos.normalizedX * 0.5;
        position.y += mousePos.normalizedY * 0.5;

        // Breathing scale effect
        const breathingScale = scales[i] * (1 + Math.sin(time * speeds[i] + i) * 0.2);

        matrix.setPosition(position);
        matrix.scale(new THREE.Vector3(breathingScale, breathingScale, breathingScale));
        mesh.current.setMatrixAt(i, matrix);
        mesh.current.setColorAt(i, colors[i]);
      }

      mesh.current.instanceMatrix.needsUpdate = true;
      if (mesh.current.instanceColor) mesh.current.instanceColor.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshBasicMaterial
        transparent
        opacity={0.15}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </instancedMesh>
  );
}

// Light flares
function LightFlares() {
  const flareRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (flareRef.current) {
      const time = state.clock.getElapsedTime();
      flareRef.current.rotation.z = time * 0.05;
      const scale = 1 + Math.sin(time * 0.5) * 0.3;
      flareRef.current.scale.setScalar(scale);
      const material = flareRef.current.material as THREE.MeshBasicMaterial;
      material.opacity = 0.03 + Math.sin(time * 0.3) * 0.02;
    }
  });

  return (
    <mesh ref={flareRef} position={[5, 3, -10]}>
      <ringGeometry args={[2, 4, 6]} />
      <meshBasicMaterial
        color="#D4AF37"
        transparent
        opacity={0.05}
        blending={THREE.AdditiveBlending}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// Camera controller for cinematic drift
function CameraController() {
  const { camera } = useThree();
  const mousePos = useMousePosition();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Subtle cinematic drift
    camera.position.x = Math.sin(time * 0.1) * 0.5;
    camera.position.y = Math.cos(time * 0.08) * 0.3;
    
    // Mouse influence on camera
    camera.position.x += mousePos.normalizedX * 0.3;
    camera.position.y += mousePos.normalizedY * 0.2;
    
    camera.lookAt(0, 0, -5);
  });

  return null;
}

// Main scene component
function Scene({ isMobile }: { isMobile: boolean }) {
  // Reduce counts on mobile for better performance
  const particleCount = isMobile ? 200 : 600;
  const orbCount = isMobile ? 10 : 25;

  return (
    <>
      <color attach="background" args={['#0D0A0B']} />
      <fog attach="fog" args={['#0D0A0B', 5, 30]} />
      
      <CameraController />
      <FloatingParticles count={particleCount} />
      <BokehOrbs count={orbCount} />
      <LightFlares />

      {/* Only render postprocessing on desktop for better mobile performance */}
      {!isMobile && (
        <EffectComposer>
          <Bloom
            luminanceThreshold={0.1}
            luminanceSmoothing={0.9}
            intensity={1.5}
            mipmapBlur
          />
          <Noise opacity={0.02} />
        </EffectComposer>
      )}
    </>
  );
}

export const ThreeBackground = () => {
  const isMobile = useIsMobile();

  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{
          antialias: !isMobile,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={isMobile ? 1 : [1, 2]}
      >
        <Scene isMobile={isMobile} />
      </Canvas>
    </div>
  );
};
