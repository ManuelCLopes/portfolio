import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const titles = ["Software Engineer", "Problem Solver", "Manuel Lopes"];

const Home = ({ scrollToProjects }) => {
  const [currentTitle, setCurrentTitle] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitle((prevTitle) => (prevTitle + 1) % titles.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-gray-900 via-black to-gray-900 overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 5, repeat: Infinity, repeatType: 'mirror' }}
        className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-20"
      ></motion.div>

      <div className="relative flex flex-col items-center justify-center min-h-screen text-white p-8 z-10">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          className="text-center"
        >
          <motion.h1
            key={currentTitle}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 1.5 }}
            className="text-7xl font-extrabold tracking-tight mb-4"
          >
            {titles[currentTitle]}
          </motion.h1>

          <p className="text-xl font-light text-gray-400 max-w-md mx-auto mb-8">
            My passion lies in two things: innovating and solving problems.
            They allow me to improve people's lives, and that motivates me every day!
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            className="mt-10 px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-full text-lg font-medium"
            onClick={scrollToProjects}
          >
            What I've been doing
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        >
          <div className="text-gray-400">Scroll Down</div>
          <div className="mt-1 h-6 w-6 border-2 border-gray-400 rounded-full animate-bounce"></div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
