import { motion } from 'framer-motion';
import { useMousePosition } from '../hooks/useMousePosition';

export const CursorGlow = () => {
  const { x, y } = useMousePosition();

  return (
    <motion.div
      className="cursor-glow hidden sm:block"
      animate={{
        x: x - 150,
        y: y - 150,
      }}
      transition={{
        type: 'spring',
        damping: 30,
        stiffness: 200,
        mass: 0.5,
      }}
    />
  );
};
