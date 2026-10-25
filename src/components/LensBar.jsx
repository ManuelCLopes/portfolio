import { PERSONAS, persona as META } from '../personas';
import { Stopwatch } from './Icons';

export default function LensBar({ current, onSwitch, meterLabelRef, meterFillRef, readTime }) {
  return (
    <div className="lens wrap">
      <div className="row col">
        <span className="who">viewing as</span>
        <div className="seg" role="group" aria-label="Switch persona">
          {PERSONAS.map((p) => (
            <button key={p} type="button" aria-pressed={current === p} onClick={(e) => onSwitch(p, e.currentTarget)}>{META[p].label}</button>
          ))}
        </div>
        <span className="meter">
          {current === 'recruiter' && <Stopwatch />}
          <span ref={meterLabelRef}>{META[current].meter(0)}</span>
          <span className="track" aria-hidden="true"><i ref={meterFillRef} /></span>
        </span>
        <span className="read">{readTime}</span>
      </div>
    </div>
  );
}
