import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const certifications = [
  {
    name: 'AWS Certified Cloud Practitioner',
    issuer: 'AWS',
    date: 'September 2022',
    badgeUrl: 'https://images.credly.com/size/340x340/images/00634f82-b07f-4bbd-a6bb-53de397fc3a6/image.png',
  },
  {
    name: 'Associate Developer (ODC)',
    issuer: 'OutSystems',
    date: 'March 2024',
    badgeUrl: 'https://avatars.githubusercontent.com/u/2916417?s=280&v=4',
  },
  {
    name: 'Mobile developer Specialist',
    issuer: 'OutSystems',
    date: 'December 2023',
    badgeUrl: 'https://avatars.githubusercontent.com/u/2916417?s=280&v=4',
  },
  {
    name: 'Architecture Specialist',
    issuer: 'OutSystems',
    date: 'September 2022',
    badgeUrl: 'https://avatars.githubusercontent.com/u/2916417?s=280&v=4',
  },
  {
    name: 'Associate Reactive Developer',
    issuer: 'OutSystems',
    date: 'May 2021',
    badgeUrl: 'https://avatars.githubusercontent.com/u/2916417?s=280&v=4',
  },
  {
    name: 'Associate Traditional Web Developer',
    issuer: 'OutSystems',
    date: 'May 2020',
    badgeUrl: 'https://avatars.githubusercontent.com/u/2916417?s=280&v=4',
  },
];

const FloatingCertificationsButton = () => {
  const [expanded, setExpanded] = useState(false);
  const fabRef = useRef(null); // To reference the FAB container

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  // Close FAB when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (fabRef.current && !fabRef.current.contains(event.target)) {
        setExpanded(false); // Close the FAB if click happens outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Animation variants for the FAB
  const fabVariants = {
    initial: { width: 60, height: 60, borderRadius: '50%', scale: 1 },
    expanded: {
      width: '350px',
      height: '500px',
      borderRadius: '20px',
      scale: 1.1,
      '@media (max-width: 640px)': { // Apply on smaller screens
        width: '80vw', // 90% of viewport width
        height: '80vh', // 80% of viewport height
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeInOut',
        staggerChildren: 0.1,
        when: 'beforeChildren',
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.4 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <div ref={fabRef} className="fixed bottom-12 left-4 z-50">
      {/* Floating Action Button (FAB) */}
      <motion.div
        className="bg-blue-600 text-white shadow-lg cursor-pointer flex items-center justify-center"
        initial="initial"
        animate={expanded ? 'expanded' : 'initial'}
        variants={fabVariants}
        onClick={toggleExpanded}
        whileHover={{ scale: 1.1 }}
        transition={{ type: 'spring', stiffness: 150 }}
        style={{ overflow: 'hidden' }}
      >
        {!expanded && <i className="fas fa-trophy text-2xl"></i>} {/* Icon only when collapsed */}
      </motion.div>

      {/* Expanded List of Certifications */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            className="p-4 bg-gray-800 rounded-lg shadow-lg absolute top-0 left-0 w-full h-full flex flex-col items-center"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={containerVariants}
          >
            <h3 className="text-white text-lg font-semibold mb-4">Certifications</h3>

            {/* Scrollable List */}
            <div className="overflow-y-auto w-full h-full px-4" style={{ maxHeight: '70vh' }}>
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-4 mb-4"
                  variants={itemVariants}
                >
                  {/* Badge Image */}
                  <img
                    src={cert.badgeUrl}
                    alt={`${cert.name} badge`}
                    className="w-10 object-contain"
                  />
                  {/* Certification Info */}
                  <div>
                    <p className="text-lg font-semibold text-blue-400">
                      {cert.name}
                    </p>
                    <p className="text-gray-400">{cert.issuer}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FloatingCertificationsButton;
