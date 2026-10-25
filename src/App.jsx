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
import { motionAllowed } from './motion';

// Nothing is shown until the visitor picks a persona. Only a shared link (#engineer…) skips the question.
const initialPersona = () => {
  const fromHash = window.location.hash.slice(1);
  return isPersona(fromHash) ? fromHash : null;
};


// The sign-off follows the persona too.
const FOOTER = {
  recruiter: 'You made it past the 30 seconds. Thanks for reading.',
  engineer: <>process exited with code 0 · <a href="https://github.com/ManuelCLopes/portfolio" target="_blank" rel="noopener noreferrer">read the source</a></>,
  curious: 'Made in Viseu, powered by francesinhas.',
};

let anim = null; // the GSAP module, loaded lazily so tests and reduced-motion readers skip it

// While the animation code loads, the chooser cards and the page stay hidden (see .anim-pending in index.css),
// so they first appear through their entrance animation rather than popping in and then animating.
const settle = () => document.documentElement.classList.remove('anim-pending');
if (motionAllowed()) {
  document.documentElement.classList.add('anim-pending');
  setTimeout(settle, 3000); // never leave the page hidden if loading stalls
}
const loadAnim = () => (anim ? Promise.resolve(anim) : import('./animations').then((m) => (anim = m)));

export default function App() {
  const [current, setCurrent] = useState(initialPersona);
  const [readTime, setReadTime] = useState('');
  const [ready, setReady] = useState(false);
  const [rigKey, setRigKey] = useState(0);
  const motion = useRef(motionAllowed()).current;
  const mainRef = useRef(null), wipeRef = useRef(null), wipeLabelRef = useRef(null), cardsRef = useRef(null);
  const meterLabelRef = useRef(null), meterFillRef = useRef(null);
  const busy = useRef(false);
  const rigs = useRef(new Map()); // chooser card -> its character's { hover, pick }

  const setMeter = useCallback((p) => {
    if (!current) return;
    if (meterLabelRef.current) meterLabelRef.current.textContent = META[current].meter(p);
    if (meterFillRef.current) meterFillRef.current.style.width = `${Math.round(p * 100)}%`;
  }, [current]);

  useEffect(() => { if (motion) loadAnim().then(() => setReady(true), settle); }, [motion]);

  // Accent and reading time follow the persona.
  useLayoutEffect(() => {
    if (!current) return;
    document.documentElement.style.setProperty('--accent', META[current].accent);
    const words = (mainRef.current?.textContent || '').trim().split(/\s+/).length;
    const secs = Math.round((words / 230) * 60);
    setReadTime(`· ≈ ${secs < 60 ? `${secs} s` : `${Math.round(secs / 60)} min`} read`);
  }, [current]);

  // Scroll choreography for the current persona, rebuilt (and fully reverted) on every switch.
  useLayoutEffect(() => {
    if (!current) return undefined;
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
    if (ready) settle(); // the entrance states are set by now, in this effect and the choreography's layout effect
  }, [motion, ready]);

  // Each chooser card's character idles, reacts on hover and focus, and plays its reaction when picked.
  useEffect(() => {
    if (!motion || !ready || !cardsRef.current) return undefined;
    const cards = [...cardsRef.current.children];
    const ctxs = cards.map((card) => {
      const ctx = anim.gsap.context(() => {}, card);
      ctx.add(() => {
        const rig = anim.characterRig(card);
        // The reaction is created in the same context, so the reset below reverts it too.
        if (rig) rigs.current.set(card, { ...rig, pick: () => { let tl; ctx.add(() => { tl = rig.pick(); }); return tl; } });
      });
      return ctx;
    });
    const on = (fn) => (e) => { if (e.pointerType !== 'touch' && !busy.current) fn(rigs.current.get(e.currentTarget)?.hover); };
    const enter = on((h) => h?.play()), leave = on((h) => h?.reverse());
    cards.forEach((c) => {
      c.addEventListener('pointerenter', enter); c.addEventListener('pointerleave', leave);
      c.addEventListener('focus', enter); c.addEventListener('blur', leave);
    });
    return () => {
      cards.forEach((c) => {
        c.removeEventListener('pointerenter', enter); c.removeEventListener('pointerleave', leave);
        c.removeEventListener('focus', enter); c.removeEventListener('blur', leave);
      });
      ctxs.forEach((ctx) => ctx.revert());
      rigs.current.clear();
    };
  }, [motion, ready, rigKey]);

  useEffect(() => {
    let t;
    const onResize = () => { clearTimeout(t); t = setTimeout(() => anim?.ScrollTrigger.refresh(), 250); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const scrollToContent = () => mainRef.current?.scrollIntoView?.();

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
    if (busy.current) return;
    // Already reading this one: say so on the card instead of reloading the same page.
    if (p === current) {
      if (motion && ready) anim.alreadyHere(el, rigs.current.get(el)?.hover);
      return;
    }
    if (motion && ready && cardsRef.current) {
      busy.current = true;
      const others = [...cardsRef.current.children].filter((c) => c !== el);
      const reaction = rigs.current.get(el)?.pick();
      anim.dropOthers(el, others);
      // Let the character finish its reaction, then wipe; reset the characters once the chooser is out of view.
      const wait = Math.min(reaction?.duration() ?? 0.35, 1.6) * 1000;
      setTimeout(() => { busy.current = false; switchTo(p, el, { scroll: true }); }, wait);
      setTimeout(() => setRigKey((k) => k + 1), wait + 1800);
    } else switchTo(p, el, { scroll: true });
  };

  return (
    <>
      <Chooser current={current} onPick={pick} cardsRef={cardsRef} />
      {current && (
        <>
          <LensBar current={current} onSwitch={switchTo} meterLabelRef={meterLabelRef} meterFillRef={meterFillRef} readTime={readTime} />
          <main ref={mainRef} className={`mode-${current}`} key={current}>
            <section className="hero wrap"><div className="col"><Hero persona={current} /></div></section>
            <section className="wrap" id="projects"><div className="col"><Projects persona={current} /></div></section>
            <section className="wrap" id="career"><div className="col"><Career persona={current} /></div></section>
            <section className="wrap" id="research"><div className="col"><Research persona={current} /></div></section>
            <section className="wrap" id="contact"><div className="col"><Contact persona={current} /></div></section>
          </main>
        </>
      )}
      <footer className="wrap">Manuel Lopes · {current ? FOOTER[current] : 'Viseu, Portugal'}</footer>
      <div className="wipe" ref={wipeRef} aria-hidden="true"><span ref={wipeLabelRef} /></div>
    </>
  );
}
