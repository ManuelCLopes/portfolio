import { projects } from '../../data/profile';
import Jargon from '../Jargon';
import { ArrowUpRight } from '../Icons';

const host = (url) => url.replace(/^https?:\/\//, '').replace(/\/$/, '');

const Links = ({ p }) => (
  <p className="links">
    {p.demo && <a href={p.demo} target="_blank" rel="noopener noreferrer">{host(p.demo)}<ArrowUpRight /></a>}
    <a href={p.github} target="_blank" rel="noopener noreferrer">{p.github.includes('github.com') ? 'Code on GitHub' : 'Read the paper'}<ArrowUpRight /></a>
  </p>
);

const featured = projects.filter((p) => p.featured);
const others = projects.filter((p) => !p.featured);

export default function Projects({ persona }) {
  if (persona === 'recruiter') {
    return (
      <>
        <p className="eyebrow">Side projects</p>
        <h2>He ships outside office hours too</h2>
        <p className="lede">Three live products built end to end, each with the signal it sends. {others.length} more below.</p>
        <div className="cards">
          {featured.map((p) => (
            <article className="card" key={p.name}>
              <h3>{p.name}</h3><p>{p.recruiter.pitch}</p>
              <p className="signal"><b>Signal:</b> {p.recruiter.signal}</p>
              <Links p={p} />
            </article>
          ))}
        </div>
        <ul className="mini">
          {others.map((p) => (
            <li key={p.name}><a href={p.demo || p.github} target="_blank" rel="noopener noreferrer">{p.name}</a><span>{p.recruiter.pitch}</span></li>
          ))}
        </ul>
      </>
    );
  }

  if (persona === 'engineer') {
    return (
      <>
        <p className="eyebrow">ls ~/projects</p>
        <h2>Stack and trade-offs</h2>
        <p className="lede">All {projects.length} of them, with what they run on and one decision worth explaining.</p>
        <div className="cards">
          {projects.map((p) => (
            <article className="card" key={p.name}>
              <h3>{p.name}</h3>
              <div className="chips">{p.stack.map((s) => <span className="chip" key={s}>{s}</span>)}</div>
              <p>{p.description}</p>
              <p className="note">// {p.engineer.note}</p>
              <Links p={p} />
            </article>
          ))}
          <article className="card">
            <h3>this portfolio</h3>
            <div className="chips">{['React', 'Vite', 'Vitest', 'GSAP'].map((s) => <span className="chip" key={s}>{s}</span>)}</div>
            <p>Migrated from Create React App to Vite, then rebuilt around three personas.</p>
            <p className="note">// ~98 Dependabot alerts → 0 in production dependencies. react-scripts, you will not be missed.</p>
            <Links p={{ github: 'https://github.com/ManuelCLopes/portfolio' }} />
          </article>
        </div>
      </>
    );
  }

  return (
    <>
      <p className="eyebrow">Things I made</p>
      <h2>For fun, mostly</h2>
      <p className="lede">Small products that started as “wouldn’t it be cool if…”.</p>
      <div className="cards">
        {featured.map((p) => (
          <article className="card" key={p.name}>
            <h3>{p.name}</h3><p><Jargon text={p.curious} explain /></p><Links p={p} />
          </article>
        ))}
      </div>
      <ul className="mini">
        {others.map((p) => (
          <li key={p.name}><a href={p.demo || p.github} target="_blank" rel="noopener noreferrer">{p.name}</a><span><Jargon text={p.curious} explain /></span></li>
        ))}
      </ul>
    </>
  );
}
