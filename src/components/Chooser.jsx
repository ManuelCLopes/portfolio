import { PERSONAS, persona as META } from '../personas';
import Character from './Characters';

export default function Chooser({ current, onPick, cardsRef }) {
  return (
    <header className={`chooser wrap${current ? '' : ' alone'}`} id="choose">
      <div className="col">
        <h1 className="q">Who’s scrolling?</h1>
        <p className="sub">Same person, three versions of the story. Pick yours and the whole site rewrites itself, motion included. You can switch at any time.</p>
        {!current && <p className="hint">Pick one to start reading.</p>}
        <div className="personas" role="group" aria-label="Choose how you want to read this site" ref={cardsRef}>
          {PERSONAS.map((p) => {
            const m = META[p];
            return (
              <button key={p} type="button" className="pick" data-p={p} style={{ '--c': m.accent }} aria-pressed={current === p} onClick={(e) => onPick(p, e.currentTarget)}>
                <Character persona={p} />
                <span className="tag">{p === 'curious' ? 'Just curious' : m.label}</span>
                <strong>
                  {m.pick.title}
                  {p === 'engineer' && <span className="caret" aria-hidden="true" />}
                  {p === 'curious' && <span className="qm" aria-hidden="true">?</span>}
                </strong>
                <span className="q2">{m.pick.quote}</span>
                <span className="meter" aria-label={`Detail level ${m.pick.detail} of 5`}>
                  {[1, 2, 3, 4, 5].map((i) => <i key={i} className={i <= m.pick.detail ? 'on' : ''} />)}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
