import { jargon } from '../data/profile';

// Renders copy that marks technical words as [[word]]. For the Curious persona those
// words get a hover/focus translation; everyone else just sees the word.
export default function Jargon({ text, explain }) {
  const parts = text.split(/\[\[(.+?)\]\]/g);
  return parts.map((part, i) => {
    if (i % 2 === 0) return part;
    if (!explain || !jargon[part]) return part;
    return (
      <span key={i} className="jargon" tabIndex={0} data-plain={jargon[part]}>
        {part}
      </span>
    );
  });
}
