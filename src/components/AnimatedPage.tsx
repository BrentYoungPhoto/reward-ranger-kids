
import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedPageProps {
  children: React.ReactNode;
}

const AnimatedPage: React.FC<AnimatedPageProps> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="flex-1 w-full"
    >
      {children}
    </motion.div>
  );
};

export default AnimatedPage;
