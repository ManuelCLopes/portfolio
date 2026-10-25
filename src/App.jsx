import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import Chooser from './components/Chooser';
import LensBar from './components/LensBar';
import Hero from './components/sections/Hero';
import Projects from './components/sections/Projects';
import Career from './components/sections/Career';
import Research from './components/sections/Research';
import Contact from './components/sections/Contact';
import { isPersona, persona as META } from './personas';

const STORAGE_KEY = 'persona';

const initialPersona = () => {
  const fromHash = window.location.hash.slice(1);
  if (isPersona(fromHash)) return fromHash;
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (isPersona(saved)) return saved;
  } catch { /* storage unavailable */ }
  return 'curious';
};

// Animations run only where the browser supports them and the reader hasn't asked for reduced motion.
const motionAllowed = () => typeof window.matchMedia === 'function' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let anim = null; // the GSAP module, loaded lazily so tests and reduced-motion readers skip it
const loadAnim = () => (anim ? Promise.resolve(anim) : import('./animations').then((m) => (anim = m)));

export default function App() {
  const [current, setCurrent] = useState(initialPersona);
  const [readTime, setReadTime] = useState('');
  const [ready, setReady] = useState(false);
  const motion = useRef(motionAllowed()).current;
  const mainRef = useRef(null), wipeRef = useRef(null), wipeLabelRef = useRef(null), cardsRef = useRef(null);
  const meterLabelRef = useRef(null), meterFillRef = useRef(null);
  const busy = useRef(false);

  const setMeter = useCallback((p) => {
    if (meterLabelRef.current) meterLabelRef.current.textContent = META[current].meter(p);
    if (meterFillRef.current) meterFillRef.current.style.width = `${Math.round(p * 100)}%`;
  }, [current]);

  useEffect(() => { if (motion) loadAnim().then(() => setReady(true)); }, [motion]);

  // Accent, reading time and remembered choice follow the persona.
  useLayoutEffect(() => {
    document.documentElement.style.setProperty('--accent', META[current].accent);
    const words = (mainRef.current?.textContent || '').trim().split(/\s+/).length;
    const secs = Math.round((words / 230) * 60);
    setReadTime(`· ≈ ${secs < 60 ? `${secs} s` : `${Math.round(secs / 60)} min`} read`);
    try { window.localStorage.setItem(STORAGE_KEY, current); } catch { /* storage unavailable */ }
  }, [current]);

  // Scroll choreography for the current persona, rebuilt (and fully reverted) on every switch.
  useLayoutEffect(() => {
    if (!motion || !ready) {
      const onScroll = () => setMeter(window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight));
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
      return () => window.removeEventListener('scroll', onScroll);
    }
    const ctx = anim.gsap.context(() => anim.choreograph(mainRef.current, current, { onProgress: setMeter }), mainRef);
    return () => ctx.revert();
  }, [current, motion, ready, setMeter]);

  useEffect(() => {
    if (motion && ready && cardsRef.current) anim.introCards(cardsRef.current.children);
  }, [motion, ready]);

  useEffect(() => {
    let t;
    const onResize = () => { clearTimeout(t); t = setTimeout(() => anim?.ScrollTrigger.refresh(), 250); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const scrollToContent = () => mainRef.current?.scrollIntoView();

  const switchTo = (p, origin, { scroll = false } = {}) => {
    if (busy.current || (p === current && !scroll)) return;
    window.history.replaceState(null, '', `#${p}`);
    if (!motion || !ready) {
      setCurrent(p);
      if (scroll) requestAnimationFrame(scrollToContent);
      return;
    }
    busy.current = true;
    anim.wipeTransition(wipeRef.current, wipeLabelRef.current, {
      origin, color: META[p].accent, text: META[p].wipe,
      swap: () => { flushSync(() => setCurrent(p)); if (scroll) scrollToContent(); },
      onDone: () => { busy.current = false; },
    });
  };

  const pick = (p, el) => {
    if (motion && ready && cardsRef.current) {
      const others = [...cardsRef.current.children].filter((c) => c !== el);
      anim.dropOthers(el, others);
      setTimeout(() => switchTo(p, el, { scroll: true }), 350);
    } else switchTo(p, el, { scroll: true });
  };

  return (
    <>
      <Chooser current={current} onPick={pick} cardsRef={cardsRef} />
      <LensBar current={current} onSwitch={switchTo} meterLabelRef={meterLabelRef} meterFillRef={meterFillRef} readTime={readTime} />
      <main ref={mainRef} className={`mode-${current}`} key={current}>
        <section className="hero wrap"><div className="col"><Hero persona={current} /></div></section>
        <section className="wrap" id="projects"><div className="col"><Projects persona={current} /></div></section>
        <section className="wrap" id="career"><div className="col"><Career persona={current} /></div></section>
        <section className="wrap" id="research"><div className="col"><Research persona={current} /></div></section>
        <section className="wrap" id="contact"><div className="col"><Contact persona={current} /></div></section>
      </main>
      <footer className="wrap">Manuel Lopes · built with React, Vite and GSAP · <a href="https://github.com/ManuelCLopes/portfolio" target="_blank" rel="noopener noreferrer">source</a></footer>
      <div className="wipe" ref={wipeRef} aria-hidden="true"><span ref={wipeLabelRef} /></div>
    </>
  );
}
