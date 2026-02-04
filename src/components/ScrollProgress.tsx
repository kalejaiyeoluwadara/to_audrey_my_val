import { motion } from 'framer-motion';
import { useScrollProgress } from '../hooks/useScrollProgress';

export const ScrollProgress = () => {
  const progress = useScrollProgress();

  return (
    <div className="scroll-progress">
      <motion.div
        className="scroll-progress-fill"
        style={{ height: `${progress}%` }}
        initial={{ height: 0 }}
        animate={{ height: `${progress}%` }}
        transition={{ duration: 0.1 }}
      />
    </div>
  );
};
