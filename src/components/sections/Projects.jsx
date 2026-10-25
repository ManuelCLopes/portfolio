import { GITHUB_PROFILE, projects } from '../../data/profile';
import Jargon from '../Jargon';
import { ArrowUpRight } from '../Icons';

const host = (url) => url.replace(/^https?:\/\//, '').replace(/\/$/, '');
const isPaper = (p) => !p.github.includes('github.com');

const Links = ({ p }) => (
  <p className="links">
    {p.demo && <a href={p.demo} target="_blank" rel="noopener noreferrer">{host(p.demo)}<ArrowUpRight /></a>}
    {p.repoPublic
      ? <a href={p.github} target="_blank" rel="noopener noreferrer">{isPaper(p) ? 'Read the paper' : 'Code on GitHub'}<ArrowUpRight /></a>
      : <span className="private">Private repo</span>}
  </p>
);

const Status = ({ p }) => (p.status ? <span className="status">{p.status}</span> : null);
const mainLink = (p) => p.demo || (p.repoPublic ? p.github : null);

const MORE = {
  recruiter: { title: 'More on GitHub', text: 'Older experiments, coursework and the odd weekend project.' },
  engineer: { title: 'gh repo list', text: 'Everything else: coursework, experiments, and the repos that taught me what not to do.' },
  curious: { title: 'There’s more', text: 'Every other thing I’ve built, including a few I’m slightly embarrassed about.' },
};

const MoreCard = ({ persona }) => (
  <a className="card more" href={GITHUB_PROFILE} target="_blank" rel="noopener noreferrer">
    <h3>{MORE[persona].title}</h3>
    <p>{MORE[persona].text}</p>
    <p className="links"><span>github.com/ManuelCLopes<ArrowUpRight /></span></p>
  </a>
);

// The smaller projects, ending with the GitHub profile, since that's where everything else lives.
const Others = ({ items, text, persona }) => (
  <ul className="mini">
    {items.map((p) => {
      const href = mainLink(p);
      return (
        <li key={p.name}>
          {href ? <a href={href} target="_blank" rel="noopener noreferrer">{p.name}</a> : <strong>{p.name}</strong>}
          <span>{text(p)}</span>
        </li>
      );
    })}
    <li className="more-row">
      <a href={GITHUB_PROFILE} target="_blank" rel="noopener noreferrer">{MORE[persona].title}<ArrowUpRight /></a>
      <span>{MORE[persona].text}</span>
    </li>
  </ul>
);

const featured = projects.filter((p) => p.featured);
const others = projects.filter((p) => !p.featured);

export default function Projects({ persona }) {
  if (persona === 'recruiter') {
    return (
      <>
        <p className="eyebrow">Side projects</p>
        <h2>He ships after hours too</h2>
        <p className="lede">Four products built end to end, each with the signal it sends. {others.length} smaller ones below.</p>
        <div className="cards">
          {featured.map((p) => (
            <article className="card" key={p.name}>
              <h3>{p.name}</h3><Status p={p} /><p>{p.recruiter.pitch}</p>
              <p className="signal"><b>Signal:</b> {p.recruiter.signal}</p>
              <Links p={p} />
            </article>
          ))}
        </div>
        <Others items={others} text={(p) => p.recruiter.pitch} persona={persona} />
      </>
    );
  }

  if (persona === 'engineer') {
    return (
      <>
        <p className="eyebrow">ls ~/projects</p>
        <h2>Stack and trade-offs</h2>
        <p className="lede">What each one runs on, and one decision worth explaining.</p>
        <div className="cards">
          {projects.map((p) => (
            <article className="card" key={p.name}>
              <h3>{p.name}</h3><Status p={p} />
              <div className="chips">{p.stack.map((s) => <span className="chip" key={s}>{s}</span>)}</div>
              <p>{p.description}</p>
              <p className="note">// {p.engineer.note}</p>
              <Links p={p} />
            </article>
          ))}
          <article className="card">
            <h3>this portfolio</h3>
            <div className="chips">{['React', 'Vite', 'GSAP', 'Vitest'].map((s) => <span className="chip" key={s}>{s}</span>)}</div>
            <p>One React codebase, three readers. Copy, level of detail and scroll choreography change with who is visiting.</p>
            <p className="note">// Each persona’s animations live in a GSAP context that is torn down on every switch, and text effects only touch text nodes, so React keeps ownership of the DOM.</p>
            <Links p={{ github: 'https://github.com/ManuelCLopes/portfolio', repoPublic: true }} />
          </article>
          <MoreCard persona={persona} />
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
            <h3>{p.name}</h3><Status p={p} /><p><Jargon text={p.curious} explain /></p><Links p={p} />
          </article>
        ))}
      </div>
      <Others items={others} text={(p) => <Jargon text={p.curious} explain />} persona={persona} />
    </>
  );
}
