import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export { gsap, ScrollTrigger };

const $ = (s, r) => r.querySelector(s);
const $$ = (s, r) => [...r.querySelectorAll(s)];

// Text effects only change text node values, never the DOM structure React owns,
// and they always end on (or restore) the original text.
const original = new WeakMap();
const textNodes = (el) => {
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) {
    if (!original.has(walker.currentNode)) original.set(walker.currentNode, walker.currentNode.nodeValue);
    nodes.push(walker.currentNode);
  }
  return nodes;
};
const restore = (nodes) => nodes.forEach((n) => { n.nodeValue = original.get(n); });

const GLYPHS = 'ABCDEFGHJKLMNPQRSTUVWXYZ#%&*+<>/{}=?';
// Resolves the text from random glyphs, left to right.
function scramble(el, duration = 0.6) {
  const nodes = textNodes(el);
  const finals = nodes.map((n) => original.get(n));
  const total = finals.join('').length;
  const o = { p: 0 };
  return gsap.to(o, {
    p: 1, duration, ease: 'none',
    onUpdate: () => {
      let budget = Math.floor(o.p * total);
      nodes.forEach((n, i) => {
        const f = finals[i];
        const keep = Math.max(0, Math.min(f.length, budget));
        budget -= f.length;
        n.nodeValue = f.slice(0, keep) + [...f.slice(keep)].map((c) => (c === ' ' ? ' ' : GLYPHS[(Math.random() * GLYPHS.length) | 0])).join('');
      });
    },
    onComplete: () => restore(nodes),
    onInterrupt: () => restore(nodes),
  });
}

// Types the text in, like a terminal.
function typeIn(el, duration = 1.1) {
  const nodes = textNodes(el);
  const finals = nodes.map((n) => original.get(n));
  const total = finals.join('').length;
  el.classList.add('typing');
  const o = { n: 0 };
  return gsap.to(o, {
    n: total, duration, ease: 'none',
    onUpdate: () => {
      let b = Math.round(o.n);
      nodes.forEach((n, i) => { const k = Math.max(0, Math.min(finals[i].length, b)); n.nodeValue = finals[i].slice(0, k); b -= finals[i].length; });
    },
    onComplete: () => restore(nodes),
    onInterrupt: () => { restore(nodes); el.classList.remove('typing'); },
  });
}

const enter = (trigger, fn, start = 'top 78%') => trigger && ScrollTrigger.create({ trigger, start, once: true, onEnter: fn });
// Builds the reveal straight away, so its starting state (hidden, offset…) is in place before the element is
// ever painted, then plays it once the element scrolls into view.
const reveal = (trigger, build, start) => {
  if (!trigger) return;
  const anim = build().pause();
  enter(trigger, () => anim.play(), start);
};

// Builds the scroll choreography for one persona. Call inside gsap.context so
// everything is reverted when the persona changes.
export function choreograph(root, persona, { onProgress } = {}) {
  const cleanups = [];
  ScrollTrigger.create({ start: 0, end: 'max', onUpdate: (st) => onProgress?.(st.progress) });

  // Section headings decode as they arrive, in every persona.
  // They stay hidden until then, so the readable heading never flashes before the effect.
  $$('section:not(.hero) h2', root).forEach((h) => {
    gsap.set(h, { opacity: 0 });
    enter(h, () => { gsap.set(h, { opacity: 1 }); scramble(h); }, 'top 85%');
  });
  const h1 = $('.hero h1', root);

  if (persona === 'recruiter') {
    gsap.from(h1, { y: 30, opacity: 0, duration: 0.5, ease: 'power3.out' });
    reveal($('.facts', root), () => gsap.timeline()
      .from($$('.facts li', root), { y: 16, opacity: 0, duration: 0.35, stagger: 0.06, ease: 'power2.out' })
      .fromTo($$('.stamp', root), { scale: 2.6, opacity: 0, rotation: -40 }, { scale: 1, opacity: 1, rotation: -12, duration: 0.35, stagger: 0.09, ease: 'back.out(2.2)' }, 0.25), 'top 92%');
    reveal($('.cards', root), () => gsap.from($$('.card', root), { x: 60, opacity: 0, duration: 0.45, stagger: 0.08, ease: 'power3.out' }));
    // Career: the rail fills with scroll; each role is ticked and its tenure bar grows.
    gsap.to($('.rail i', root), { height: '100%', ease: 'none', scrollTrigger: { trigger: $('.tl-wrap', root), start: 'top 65%', end: 'bottom 65%', scrub: 0.4 } });
    $$('.timeline li', root).forEach((li) => {
      gsap.timeline({ scrollTrigger: { trigger: li, start: 'top 66%', toggleActions: 'play none none reverse' } })
        .fromTo(li, { opacity: 0.25 }, { opacity: 1, duration: 0.25 })
        .fromTo($('.check', li), { scale: 0.4, rotation: -30 }, { scale: 1, rotation: 0, duration: 0.35, ease: 'back.out(3)' }, 0)
        .fromTo($('.tenure i', li), { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: 'power3.out' }, 0.1);
    });
    const stat = $('.big-stat', root);
    if (stat) {
      const target = Number(stat.dataset.count); const o = { v: 0 };
      reveal(stat, () => gsap.to(o, { v: target, duration: 1.1, ease: 'power2.out', onUpdate: () => { stat.textContent = Math.round(o.v); } }));
      stat.textContent = '0';
      cleanups.push(() => { stat.textContent = String(target); });
    }
  }

  if (persona === 'engineer') {
    typeIn(h1);
    reveal($('.facts', root), () => gsap.from($$('.facts li', root), { clipPath: 'inset(0 100% 0 0)', duration: 0.4, stagger: 0.12, ease: 'steps(12)' }), 'top 92%');
    $$('.card', root).forEach((card) => reveal(card, () => gsap.timeline()
      .from(card, { y: 30, opacity: 0, duration: 0.4, ease: 'power2.out' })
      .from($$('.chip', card), { scale: 0, opacity: 0, duration: 0.25, stagger: 0.05, ease: 'back.out(3)' }, 0.15)
      .from($('.note', card), { clipPath: 'inset(0 0 100% 0)', duration: 0.7, ease: 'steps(6)' }, 0.3)));
    gsap.to($('.rail i', root), { height: '100%', ease: 'none', scrollTrigger: { trigger: $('.tl-wrap', root), start: 'top 65%', end: 'bottom 65%', scrub: 0.4 } });
    $$('.timeline li', root).forEach((li) => gsap.fromTo(li, { opacity: 0.2, x: -14 }, { opacity: 1, x: 0, duration: 0.4, scrollTrigger: { trigger: li, start: 'top 66%', toggleActions: 'play none none reverse' } }));
    $$('.papers li', root).forEach((li) => reveal(li, () => gsap.from(li, { opacity: 0, x: 20, duration: 0.35 }), 'top 92%'));
  }

  if (persona === 'curious') {
    gsap.from($$('.w', h1), { y: 60, rotation: () => gsap.utils.random(-14, 14), opacity: 0, duration: 0.9, stagger: 0.05, ease: 'elastic.out(1, 0.55)' });
    reveal($('.facts', root), () => gsap.from($$('.facts li', root), { scale: 0.6, opacity: 0, rotation: (i) => (i % 2 ? 6 : -6), duration: 0.6, stagger: 0.1, ease: 'back.out(2)' }), 'top 92%');
    reveal($('.cards', root), () => gsap.from($$('.card', root), { rotationY: -100, y: 40, opacity: 0, transformOrigin: '0% 50%', duration: 0.8, stagger: 0.14, ease: 'power3.out' }));
    // Career: a dotted trail is drawn beside the story and a dot walks it.
    const wrap = $('.tl-wrap', root);
    const svg = $('.trail', wrap), walked = $('.walked', svg), ahead = $('.ahead', svg), dot = $('circle', svg);
    const items = $$('.timeline li', wrap);
    const H = wrap.offsetHeight;
    let d = 'M 28 6';
    items.forEach((li, i) => { const y = li.offsetTop + 26; d += ` S ${i % 2 ? 46 : 10} ${y - 30} 28 ${y}`; });
    d += ` L 28 ${H - 6}`;
    svg.setAttribute('viewBox', `0 0 56 ${H}`);
    walked.setAttribute('d', d); ahead.setAttribute('d', d);
    dot.setAttribute('cx', '28'); dot.setAttribute('cy', '6');
    const len = walked.getTotalLength();
    gsap.set(walked, { strokeDasharray: len, strokeDashoffset: len });
    gsap.timeline({ scrollTrigger: { trigger: wrap, start: 'top 60%', end: 'bottom 60%', scrub: 0.5 } })
      .to(walked, { strokeDashoffset: 0, ease: 'none' }, 0)
      .to(dot, { ease: 'none', motionPath: { path: walked, align: walked, alignOrigin: [0.5, 0.5] } }, 0);
    items.forEach((li) => gsap.fromTo(li, { opacity: 0.25, x: 16 }, { opacity: 1, x: 0, duration: 0.5, ease: 'back.out(2)', scrollTrigger: { trigger: li, start: 'top 62%', toggleActions: 'play none none reverse' } }));
  }

  ScrollTrigger.refresh();
  // gsap.context runs this on revert, for the changes it doesn't track itself.
  return () => cleanups.forEach((fn) => fn());
}

// The persona switch: a circle in the new accent grows from the button that was
// pressed, the page is swapped underneath, then the cover slides away upwards.
export function wipeTransition(wipe, label, { origin, color, text, swap, onDone }) {
  const r = origin.getBoundingClientRect();
  const x = r.left + r.width / 2, y = r.top + r.height / 2;
  wipe.style.background = color;
  label.textContent = text;
  return gsap.timeline({ onComplete: onDone })
    .set(wipe, { visibility: 'visible', clipPath: `circle(0px at ${x}px ${y}px)` })
    .fromTo(label, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3 }, 0.25)
    .to(wipe, { clipPath: `circle(${Math.hypot(innerWidth, innerHeight)}px at ${x}px ${y}px)`, duration: 0.6, ease: 'power3.in' }, 0)
    .add(swap, '+=0.3')
    .set(wipe, { clipPath: 'inset(0% 0% 0% 0%)' })
    .to(wipe, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.55, ease: 'power3.inOut' })
    .set(wipe, { visibility: 'hidden' });
}

export function dropOthers(chosen, others) {
  return gsap.timeline()
    .to(chosen, { scale: 1.04, duration: 0.18, yoyo: true, repeat: 1 }, 0)
    .to(others, { y: () => innerHeight * 0.7, rotation: (i) => (i ? 22 : -22), opacity: 0, duration: 0.55, ease: 'power2.in' }, 0)
    .set(others, { clearProps: 'transform,opacity' }, 2.2);
}

export function introCards(cards) {
  return gsap.from(cards, { y: 40, opacity: 0, rotation: (i) => (i - 1) * 4, duration: 0.7, stagger: 0.09, ease: 'back.out(1.6)', delay: 0.1 });
}

// Persona characters on the chooser cards (see components/Characters.jsx). Each rig runs an idle loop and
// returns a paused hover timeline plus a pick() reaction. Call inside gsap.context so it can be reverted.
const blinkLoop = (eyes) => gsap.timeline({ repeat: -1, repeatDelay: 2 + Math.random() * 2.5, delay: Math.random() * 2 })
  .to(eyes, { scaleY: 0.1, transformOrigin: '50% 50%', duration: 0.07, yoyo: true, repeat: 1 });
const steamLoop = (svg) => $$('.steam', svg).forEach((s, i) => gsap.fromTo(s,
  { y: 6, opacity: 0 }, { y: -6, opacity: 0.9, duration: 1.6, repeat: -1, ease: 'sine.inOut', delay: i * 0.8, yoyo: true }));

const RIGS = {
  recruiter(svg) {
    const q = (s) => $(s, svg);
    const tap = gsap.timeline({ repeat: -1, repeatDelay: 1.4 }).to(q('.arm circle'), { y: -3, duration: 0.08, yoyo: true, repeat: 5 });
    const hover = gsap.timeline({ paused: true, defaults: { duration: 0.35, ease: 'power2.out' } })
      .to(q('.arm'), { rotation: -62, svgOrigin: '150 123' })
      .to(q('.eyes'), { x: 4, y: 2 }, '<')
      .to(q('.brows'), { y: -4 }, '<')
      .add(() => tap.pause(), 0);
    const pick = () => gsap.timeline()
      .add(() => hover.play())
      .fromTo(q('.rubber'), { y: -90, opacity: 1 }, { y: 0, duration: 0.35, ease: 'power3.in' }, 0.25)
      .to(q('.rubber'), { scaleY: 0.8, svgOrigin: '201 102', duration: 0.07, yoyo: true, repeat: 1 })
      .fromTo(q('.mark-g'), { opacity: 0, scale: 1.5, svgOrigin: '201 107' }, { opacity: 1, scale: 1, duration: 0.2, ease: 'back.out(3)' }, '<')
      .to(q('.cv'), { x: 1, duration: 0.04, yoyo: true, repeat: 3 }, '<')
      .to(q('.rubber'), { y: -100, opacity: 0, duration: 0.45, ease: 'power2.out' }, '+=0.15')
      .to(q('.brows'), { y: -1 }, '<');
    return { hover, pick };
  },

  engineer(svg) {
    const q = (s) => $(s, svg);
    const typing = gsap.timeline({ repeat: -1 })
      .to(q('.hand-l'), { y: -3, duration: 0.11, yoyo: true, repeat: 1 })
      .to(q('.hand-r'), { y: -3, duration: 0.11, yoyo: true, repeat: 1 })
      .to(q('.hand-l'), { y: -2, duration: 0.09, yoyo: true, repeat: 1 })
      .to({}, { duration: 0.25 });
    const scroll = gsap.to(q('.code'), { y: -112, duration: 7, ease: 'none', repeat: -1 });
    const glow = gsap.to(q('.glow'), { opacity: 0.24, duration: 0.15, repeat: -1, yoyo: true, repeatDelay: 0.6, ease: 'steps(1)' });
    const hover = gsap.timeline({ paused: true })
      .to(typing, { timeScale: 2.6, duration: 0.3 }, 0)
      .to(scroll, { timeScale: 5, duration: 0.3 }, 0)
      .to(q('.head'), { y: 3, duration: 0.3, ease: 'power2.out' }, 0);
    const pick = () => gsap.timeline()
      .add(() => { hover.reverse(); typing.pause(); scroll.pause(); glow.pause(); })
      .to(q('.code'), { opacity: 0, duration: 0.2 }, 0.1)
      .fromTo(q('.success'), { opacity: 0, scale: 0.4, svgOrigin: '201 52' }, { opacity: 1, scale: 1, duration: 0.45, ease: 'back.out(2.5)' }, 0.25)
      .to(q('.hand-r'), { x: -22, y: -58, duration: 0.3, ease: 'power2.out' }, 0.2)
      .to(q('.glasses'), { y: -3, duration: 0.12 }, '>-0.05')
      .to(q('.hand-r'), { x: 0, y: 0, duration: 0.35, ease: 'power2.inOut' }, '+=0.15')
      .to(q('.mouth'), { opacity: 0, duration: 0.1 }, 0.4)
      .to(q('.smile'), { opacity: 1, duration: 0.1 }, 0.4)
      .to(q('.glow'), { opacity: 0.3, duration: 0.3 }, 0.25);
    return { hover, pick };
  },

  curious(svg) {
    const q = (s) => $(s, svg);
    gsap.set(q('.head'), { rotation: -6, svgOrigin: '120 96' });
    const sway = gsap.to(q('.head'), { rotation: 4, svgOrigin: '120 96', duration: 1.8, ease: 'sine.inOut', yoyo: true, repeat: -1 });
    gsap.to(q('.qm1'), { y: -5, rotation: 10, transformOrigin: '50% 80%', duration: 1.1, ease: 'sine.inOut', yoyo: true, repeat: -1 });
    const extra = $$('.qm2, .qm3, .qm4', svg);
    const hover = gsap.timeline({ paused: true, onReverseComplete: () => sway.play() })
      .add(() => sway.pause(), 0)
      .to(q('.head'), { rotation: -12, svgOrigin: '120 96', duration: 0.35, ease: 'power2.out' }, 0)
      .fromTo(extra, { opacity: 0, scale: 0, transformOrigin: '50% 80%' }, { opacity: 1, scale: 1, duration: 0.3, stagger: 0.08, ease: 'back.out(3)' }, 0)
      .to(q('.lens'), { x: 2, y: -79, rotation: -10, svgOrigin: '130 146', duration: 0.45, ease: 'back.out(1.6)' }, 0.1);
    const pick = () => gsap.timeline()
      .add(() => { sway.pause(); hover.play(); })
      .to([q('.qm1'), ...extra], { opacity: 0, scale: 0, transformOrigin: '50% 80%', duration: 0.25, stagger: 0.05, ease: 'back.in(2)' }, 0.45)
      .to(q('.lens'), { y: 0, rotation: 0, duration: 0.4, ease: 'power2.in' }, 0.5)
      .to(q('.head'), { rotation: 0, svgOrigin: '120 96', duration: 0.4, ease: 'back.out(2)' }, 0.55)
      .fromTo(q('.bulb'), { opacity: 0, scale: 0, svgOrigin: '184 40' }, { opacity: 1, scale: 1, duration: 0.6, ease: 'elastic.out(1, 0.5)' }, 0.7)
      .fromTo($$('.ray', svg), { opacity: 0 }, { opacity: 1, duration: 0.12, yoyo: true, repeat: 3, stagger: 0.04 }, 0.85)
      .to(q('.mouth'), { opacity: 0, duration: 0.1 }, 0.7)
      .to(q('.smile'), { opacity: 1, duration: 0.1 }, 0.7)
      .to(q('.eyes'), { scale: 1.15, svgOrigin: '120 67', duration: 0.2, yoyo: true, repeat: 1 }, 0.75);
    return { hover, pick };
  },
};

export function characterRig(card) {
  const svg = $('svg.fig', card);
  const build = RIGS[card.dataset.p];
  if (!svg || !build) return null;
  steamLoop(svg);
  blinkLoop($('.eyes', svg));
  return build(svg);
}
