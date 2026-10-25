// Animations run only where the browser supports them and the reader hasn't asked for reduced motion.
export const motionAllowed = () => typeof window.matchMedia === 'function' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
