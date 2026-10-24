import React, { useRef } from 'react';
import Home from './components/Home';
import Projects from './components/Projects';
import OtherTechnologies from './components/OtherTechnologies';
import FloatingCertificationsButton from './components/FloatingCertificationsButton';
import Academy from './components/Academy';
import Experience from './components/Experience';
import Contact from './components/Contact';

function App() {
  const projectsRef = useRef(null); 

  // Custom smooth scroll function with duration
  const smoothScrollTo = (targetPosition, duration) => {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    const ease = (t, b, c, d) => {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    };

    const animation = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = ease(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    };

    requestAnimationFrame(animation);
  };

  const scrollToProjects = () => {
    if (projectsRef.current) {
      const offsetTop = projectsRef.current.offsetTop;
      smoothScrollTo(offsetTop, 1500);
    }
  };

  return (
    <div className="App">
      <Home scrollToProjects={scrollToProjects} />
      <div ref={projectsRef}>
        <Projects />
      </div>
      <OtherTechnologies />
      <FloatingCertificationsButton />
      <Academy />
      <Experience />
      <Contact />
    </div>
  );
}

export default App;
