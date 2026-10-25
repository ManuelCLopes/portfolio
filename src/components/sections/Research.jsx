import { certifications, education, formatMonth, publications } from '../../data/profile';
import Jargon from '../Jargon';

const Papers = () => (
  <ul className="papers">
    {publications.map((p) => (
      <li key={p.title}><a href={p.link} target="_blank" rel="noopener noreferrer">{p.title}</a><span>{p.venue}</span></li>
    ))}
  </ul>
);

const Certs = () => (
  <ul className="mini">
    {certifications.map((c) => <li key={c.name}><strong>{c.name}</strong><span>{c.issuer} · {c.date}</span></li>)}
  </ul>
);

const Degrees = () => (
  <ul className="mini">
    {education.map((d) => <li key={d.degree}><strong>{d.degree}</strong><span>{d.institution} · {formatMonth(d.start).slice(-4)}–{formatMonth(d.end).slice(-4)}</span></li>)}
  </ul>
);

export default function Research({ persona }) {
  if (persona === 'recruiter') {
    return (
      <>
        <p className="eyebrow">Research & credentials</p>
        <div className="big-stat" data-count={publications.length}>{publications.length}</div>
        <h2>peer-reviewed papers</h2>
        <p className="lede">2022 to 2024, on monitoring, IoT and mobile. Translation: he can also write documentation.</p>
        <Papers />
        <h3 className="sub">Degrees</h3><Degrees />
        <h3 className="sub">Certifications</h3><Certs />
      </>
    );
  }

  if (persona === 'engineer') {
    return (
      <>
        <p className="eyebrow">cat papers.bib</p>
        <h2>Publications</h2>
        <p className="lede">Real-time monitoring, message brokers, IoT and mobile databases.</p>
        <Papers />
        <h3 className="sub">Education</h3>
        <ul className="mini">{education.map((d) => <li key={d.degree}><strong>{d.degree}</strong><span>{d.details}</span></li>)}</ul>
        <h3 className="sub">Certifications</h3><Certs />
      </>
    );
  }

  return (
    <>
      <p className="eyebrow">Fun fact</p>
      <h2>Five scientific papers</h2>
      <p className="lede"><Jargon explain text="Yes, really. One is about reading text from photos with your phone. Another is about keeping construction workers safe with [[sensors]]. Yes, the academic kind, with references and everything." /></p>
      <Papers />
      <h3 className="sub">And a few certificates</h3>
      <p className="lede">Six of them: one from Amazon’s cloud and five from OutSystems, plus a master’s degree from the Polytechnic of Viseu. None of them framed. Yet.</p>
    </>
  );
}
