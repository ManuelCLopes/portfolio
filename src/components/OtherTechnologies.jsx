import React, { useRef, useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import outsystemsRing from '../assets/outsystems-ring.svg';


const extraTechnologies = [
  { name: 'HTML', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { name: 'CSS', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
  { name: 'React', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Node.js', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'Android', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg' },
  { name: 'iOS', url: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/apple.svg', className: 'invert' },

  { name: 'Java', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
  { name: 'OutSystems', url: outsystemsRing },
  { name: 'Kubernetes', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg' },
  { name: 'AWS', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg' },

  { name: 'mySQL', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
  { name: 'Oracle', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg' },
  { name: 'MongoDB', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },

  { name: 'jMeter', url: 'https://jmeter.apache.org/images/jmeter_square.svg' },
  { name: 'JUnit', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
  { name: 'Postman', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg' },

  { name: 'Github', url: 'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/github-white-icon.png' },
  { name: 'Gitlab', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg' },
  { name: 'Jira', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg' },
];


const OtherTechnologies = () => {
  const containerRef = useRef(null);
  const controls = useAnimation();
  const [containerWidth, setContainerWidth] = useState(0);
  const [viewWidth, setViewWidth] = useState(0);
  const [scrollDuration, setScrollDuration] = useState(20); // Default scroll duration

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.scrollWidth); // Full width of the content
        setViewWidth(containerRef.current.clientWidth); // Visible width (viewport)

        // Adjust scroll speed based on screen width
        const screenWidth = window.innerWidth;
        if (screenWidth < 768) {
          setScrollDuration(10); // Faster speed on mobile (10 seconds)
        } else {
          setScrollDuration(20); // Slower speed on larger screens (20 seconds)
        }
      }
    };

    // Update dimensions on load and resize
    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    const startScrolling = async () => {
      if (containerWidth && viewWidth) {
        await controls.start({
          x: [viewWidth, -containerWidth], // Starts from the right (viewport width) and moves left
          transition: {
            ease: 'linear',
            duration: scrollDuration, // Adjust duration based on the screen size
            repeat: Infinity,
            onRepeat: () => controls.set({ x: viewWidth }), // Reset to the right side when the scroll ends
          },
        });
      }
    };
    startScrolling();
  }, [containerWidth, viewWidth, controls, scrollDuration]);

  return (
    <div className="bg-gray-900 text-white">
      <h3 className="text-xl font-semibold mb-4 text-center">
        Other technologies I've worked with, but weren't mentioned above
      </h3>
      <div className="overflow-hidden w-full max-w-full mx-auto py-4" ref={containerRef}>
        <motion.div
          className="flex space-x-8"
          animate={controls}
          initial={{ x: viewWidth }} // Ensure it starts at the right (visible edge)
        >
          {extraTechnologies.map((tech, index) => (
            <Tippy key={index} content={tech.name}>
              <img
                src={tech.url}
                alt={tech.name}
                className={`w-12 h-12 object-contain ${tech.className || ''}`}
              />
            </Tippy>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default OtherTechnologies;
