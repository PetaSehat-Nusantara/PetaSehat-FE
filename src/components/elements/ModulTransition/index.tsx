'use client';
import { motion } from 'framer-motion';
import React from 'react';

const ModuleTransition = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ y: 30 }}
      animate={{ y: 0 }}
      transition={{ ease: 'easeInOut', duration: 0.5 }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
};

export default ModuleTransition;
