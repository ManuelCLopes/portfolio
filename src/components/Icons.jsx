// Small line icons drawn in SVG so they look the same everywhere (no emoji fallbacks on iOS).
const base = { width: '1em', height: '1em', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2.4, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true, focusable: 'false' };

export const ArrowUpRight = (props) => (
  <svg {...base} className="icon" {...props}><path d="M7 17 17 7" /><path d="M8 7h9v9" /></svg>
);

export const Check = (props) => (
  <svg {...base} className="icon" strokeWidth={3} {...props}><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>
);

export const Stopwatch = (props) => (
  <svg {...base} className="icon" {...props}><circle cx="12" cy="13.5" r="7.5" /><path d="M12 9.5v4l2.5 2" /><path d="M10 2.5h4" /></svg>
);
