import React from 'react';
import { motion } from 'framer-motion';

const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-80 z-50">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="w-16 h-16 border-4 border-t-purple-500 border-r-blue-500 border-b-indigo-500 border-l-violet-500 rounded-full"
      />
      <p className="text-white text-xl font-bold ml-4">Loading...</p>
    </div>
  );
};

export default Loader;