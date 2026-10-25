import { certifications, experience, otherTech, yearsSince } from '../../data/profile';
import { Check } from '../Icons';

const firstJob = experience[experience.length - 1].start;
const outsystemsCerts = certifications.filter((c) => c.issuer === 'OutSystems').length;

// Each word in its own span so the Curious intro can bounce them in one by one.
const Words = ({ text }) => text.split(' ').map((w, i, all) => (
  <span key={i}><span className="w">{w}</span>{i < all.length - 1 ? ' ' : ''}</span>
));

export default function Hero({ persona }) {
  const years = yearsSince(firstJob);

  if (persona === 'recruiter') {
    const facts = [
      ['Now', 'Software Engineer @ Talkdesk'],
      ['Experience', `${years} years, since ${firstJob.slice(0, 4)}`],
      ['Taught', 'Invited Assistant, Polytechnic of Viseu, 2023–2026'],
      ['Education', 'MSc Computer Science & Engineering'],
      ['Certified', `AWS Cloud Practitioner + ${outsystemsCerts} OutSystems`],
      ['Based in', 'Viseu, Portugal'],
    ];
    return (
      <>
        <p className="eyebrow">TL;DR</p>
        <h1 data-anim="title">Manuel Lopes, <em>Software Engineer</em></h1>
        <p className="lede">The short version, in bullet points. No buzzword bingo (fine, maybe one: <i>full-stack</i>).</p>
        <ul className="facts">
          {facts.map(([k, v]) => <li key={k}><b>{k}</b>{v}<span className="stamp" aria-hidden="true"><Check /></span></li>)}
        </ul>
      </>
    );
  }

  if (persona === 'engineer') {
    const facts = [
      ['day job', 'Kotlin, plus some Ruby and React, on a gen-AI CX platform @ Talkdesk'],
      ['side projects', 'TypeScript · React · Node.js · PostgreSQL'],
      ['also shipped with', 'Next.js · Prisma · Electron · Flutter · Python · Django · C++'],
      ['data', 'PostgreSQL · Cassandra · Elasticsearch · MySQL · Oracle · MongoDB'],
      ['messaging', 'Kafka · RabbitMQ · ActiveMQ'],
      ['observability', 'Dynatrace · Datadog · Grafana'],
      ['cloud & infra', 'AWS Certified Cloud Practitioner · Docker · Kubernetes'],
      ['testing', 'Vitest · Playwright · JUnit · JMeter'],
      ['low-code', `OutSystems, ${outsystemsCerts} certifications`],
      ['also worked with', otherTech.join(' · ')],
    ];
    return (
      <>
        <p className="eyebrow">$ whoami</p>
        <h1 data-anim="type">Manuel Lopes. <em>Kotlin</em> by day, side projects by night.</h1>
        <p className="lede">Full detail mode: stack, trade-offs, and the upgrades that went fine on the first try (the others are in the git history).</p>
        <ul className="facts">{facts.map(([k, v]) => <li key={k}><b>{k}</b>{v}</li>)}</ul>
      </>
    );
  }

  const facts = [
    ['Day job', 'Building software that helps companies talk to their customers, at Talkdesk.'],
    ['Until recently', 'Taught university students how to program, in Viseu.'],
    ['Hobby', 'Ranking francesinhas. Scientifically.'],
  ];
  return (
    <>
      <p className="eyebrow">Hello there</p>
      <h1 data-anim="words"><Words text="Hi, I'm Manuel. I make computers do" /> <em><Words text="useful things" /></em>.</h1>
      <p className="lede">No jargon, promise. If a word sounds technical, hover it and you get the translation.</p>
      <ul className="facts">{facts.map(([k, v]) => <li key={k}><b>{k}</b>{v}</li>)}</ul>
    </>
  );
}
