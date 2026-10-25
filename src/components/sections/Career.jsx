import { experience, formatRange, formatTenure, monthsBetween } from '../../data/profile';
import Jargon from '../Jargon';

const Company = ({ e }) => <a href={e.website} target="_blank" rel="noopener noreferrer">{e.company}</a>;

export default function Career({ persona }) {
  if (persona === 'recruiter') {
    const months = experience.map((e) => monthsBetween(e.start, e.end));
    const longest = Math.max(...months);
    return (
      <>
        <p className="eyebrow">Career</p>
        <h2>{experience.length} roles, zero gaps</h2>
        <p className="lede">Banking, security and customer experience. Tenure included, because you were going to calculate it anyway.</p>
        <div className="tl-wrap">
          <span className="rail" aria-hidden="true"><i /></span>
          <ol className="timeline">
            {experience.map((e, i) => (
              <li key={e.role + e.start}>
                <span className="check" aria-hidden="true" />
                <span className="when">{formatRange(e.start, e.end)}</span>
                <div>
                  <strong>{e.role} · <Company e={e} /></strong>
                  {e.recruiterNote && <p>{e.recruiterNote}</p>}
                  <span className="tenure"><i style={{ '--w': months[i] / longest }} />{formatTenure(months[i])}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </>
    );
  }

  if (persona === 'engineer') {
    return (
      <>
        <p className="eyebrow">git log --oneline</p>
        <h2>What I worked on</h2>
        <p className="lede">Systems, not adjectives. HEAD is at the top.</p>
        <div className="tl-wrap">
          <span className="rail" aria-hidden="true"><i /></span>
          <ol className="timeline">
            {experience.map((e) => (
              <li key={e.role + e.start}>
                <span className="when">{formatRange(e.start, e.end)}</span>
                <div><strong><Company e={e} /> · {e.role}</strong><p>{e.engineer}</p></div>
              </li>
            ))}
          </ol>
        </div>
      </>
    );
  }

  // Curious: oldest first, as a story, with a trail drawn alongside.
  const story = [...experience].reverse();
  return (
    <>
      <p className="eyebrow">The story so far</p>
      <h2>How I got here</h2>
      <p className="lede">Six years, told quickly. Follow the dot.</p>
      <div className="tl-wrap">
        <svg className="trail" aria-hidden="true"><path className="ahead" /><path className="walked" /><circle r="7" /></svg>
        <ol className="timeline">
          {story.map((e) => (
            <li key={e.role + e.start}>
              <span className="when">{e.start.slice(0, 4)}</span>
              <div><strong>{e.role} at <Company e={e} /></strong><p><Jargon text={e.curious} explain /></p></div>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}
