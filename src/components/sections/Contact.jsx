import { useRef, useState } from 'react';
import { CONTACT_ENDPOINT, WEB3FORMS_KEY, socials } from '../../data/profile';
import { ArrowUpRight } from '../Icons';
import { Peek } from '../Characters';
import { motionAllowed } from '../../motion';

const COPY = {
  recruiter: {
    eyebrow: 'Next step', title: 'Have a role in mind?', lede: 'A few fields. Faster than reading another CV.',
    button: 'Send the opportunity', sent: 'Received. I’ll get back to you soon.', preview: 'Your email, as I’ll receive it',
  },
  engineer: {
    eyebrow: 'gh issue create', title: 'Open an issue', lede: 'Bug reports about my career are also welcome. PRs even more.',
    button: 'Submit new issue', sent: 'Issue opened. I’ll triage it soon.', preview: 'Preview',
  },
  curious: {
    eyebrow: 'Say hi', title: ['Questions? Ideas?', 'A francesinha tip?'], lede: 'All three are welcome. The third gets priority.',
    button: 'Send a hello', sent: 'Hello received! I’ll write back soon.', preview: 'Your postcard',
  },
};

// The API takes { name, email, message }; persona-specific fields are folded into the message.
const TAG = { recruiter: 'Recruiter', engineer: 'Engineer', curious: 'Curious' };
// The subject carries the persona so messages can be filtered in the inbox.
export const buildSubject = (persona, f) => `[${TAG[persona]}] Portfolio message from ${f.name?.trim() || 'a visitor'}`;

export const buildMessage = (persona, f) => {
  if (persona === 'recruiter') return `[Recruiter] Company: ${f.company || '-'}\nRole: ${f.role || '-'}\n\n${f.message || ''}`.trim();
  if (persona === 'engineer') return `[Engineer] ${f.title || '(no title)'}\n\n${f.message || ''}`.trim();
  return `[Curious] ${f.message || ''}`.trim();
};

const Icon = ({ name }) => (name === 'GitHub' ? (
  <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.1c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.7 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3" /></svg>
) : (
  <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M20.4 20.5h-3.6v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7H9.4V9h3.4v1.6h.1c.5-.9 1.6-1.8 3.4-1.8 3.6 0 4.3 2.4 4.3 5.5v6.2zM5.3 7.4a2.1 2.1 0 1 1 0-4.1 2.1 2.1 0 0 1 0 4.1zM7.1 20.5H3.6V9h3.5v11.5zM22.2 0H1.8C.8 0 0 .8 0 1.7v20.6c0 .9.8 1.7 1.8 1.7h20.4c1 0 1.8-.8 1.8-1.7V1.7C24 .8 23.2 0 22.2 0z" /></svg>
));

// A live preview of exactly what will be sent, dressed for each persona.
function Preview({ persona, fields, label, onPoke }) {
  const v = (k, fallback) => fields[k]?.trim() || fallback;
  const from = `${v('name', 'Your name')} <${v('email', 'you@example.com')}>`;
  const peekRef = useRef(null);
  // Clicking the preview (it looks editable, it isn't) gets a pointer to the real form.
  const poke = () => onPoke(peekRef.current);
  return (
    <aside className={`preview preview-${persona}`} aria-label="Message preview">
      <p className="eyebrow">{label}</p>
      <div className="peek-wrap" onClick={poke}>
      <Peek persona={persona} peekRef={peekRef} />
      {persona === 'recruiter' && (
        <div className="mail">
          <dl>
            <dt>From</dt><dd>{from}</dd>
            <dt>To</dt><dd>Manuel Lopes</dd>
            <dt>Subject</dt><dd>{v('role', 'An opportunity')}{fields.company?.trim() ? ` at ${fields.company.trim()}` : ''}</dd>
          </dl>
          <p className="body">{v('message', 'Hi Manuel, I came across your portfolio and…')}</p>
        </div>
      )}
      {persona === 'engineer' && (
        <div className="issue">
          <p className="issue-title">{v('title', 'feat: let’s build something')} <span>#1</span></p>
          <p className="issue-meta"><span className="pill">Open</span>{v('name', 'you')} opened this issue · 0 comments</p>
          <pre className="body">{v('message', 'Context, constraints, what you’ve tried…')}</pre>
          <p className="labels"><span>enhancement</span><span>good first issue</span></p>
        </div>
      )}
      {persona === 'curious' && (
        <div className="postcard">
          <p className="body">{v('message', 'Hi Manuel! Best francesinha I ever had was…')}</p>
          <div className="addr"><span className="postmark">Viseu · PT</span><p>To: Manuel Lopes<br />From: {v('name', 'a curious visitor')}</p></div>
        </div>
      )}
      </div>
      <p className="socials">
        {socials.map((s) => (
          <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer"><Icon name={s.name} />{s.name}<ArrowUpRight /></a>
        ))}
      </p>
    </aside>
  );
}

export default function Contact({ persona }) {
  const c = COPY[persona];
  const [fields, setFields] = useState({});
  const [status, setStatus] = useState({ type: '', message: '' });
  const [sending, setSending] = useState(false);
  const formRef = useRef(null);
  const trapRef = useRef(null); // hidden checkbox: people never see it, simple bots tick it
  const set = (k) => (e) => setFields((f) => ({ ...f, [k]: e.target.value }));

  // Draws the eye to the first empty field (or the first field) and puts the cursor there.
  const nudgeForm = () => {
    const inputs = [...(formRef.current?.querySelectorAll('input:not(.trap), textarea') || [])];
    const field = inputs.find((f) => !f.value) || inputs[0];
    if (!field) return;
    field.classList.remove('nudge');
    void field.offsetWidth; // restart the pulse
    field.classList.add('nudge');
    const r = field.getBoundingClientRect();
    if (r.top < 0 || r.bottom > window.innerHeight) field.scrollIntoView?.({ behavior: 'smooth', block: 'center' });
    field.focus({ preventScroll: true });
  };
  const pointAtForm = (peek) => {
    if (!motionAllowed() || !peek) { nudgeForm(); return; }
    import('../../animations').then((m) => {
      m.peekAndPoint(peek, { vertical: window.matchMedia('(max-width: 860px)').matches });
      setTimeout(nudgeForm, 650);
    });
  };
  const val = (k) => fields[k] || '';

  const submit = async (e) => {
    e.preventDefault();
    setSending(true);
    setStatus({ type: '', message: '' });
    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: buildSubject(persona, fields),
          from_name: 'Portfolio contact form',
          name: val('name'),
          email: val('email'),
          message: buildMessage(persona, fields),
          botcheck: !!trapRef.current?.checked,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.success === false) throw new Error(data.message || String(res.status));
      setStatus({ type: 'success', message: c.sent });
      setFields({});
    } catch {
      setStatus({ type: 'error', message: 'The message didn’t go through. Please try again, or reach me on LinkedIn.' });
    } finally {
      setSending(false);
    }
  };

  const field = (k, label, props = {}) => (
    <label htmlFor={`f-${k}`}>{label}
      {props.rows ? <textarea id={`f-${k}`} value={val(k)} onChange={set(k)} {...props} />
        : <input id={`f-${k}`} value={val(k)} onChange={set(k)} {...props} />}
    </label>
  );

  return (
    <>
      <p className="eyebrow">{c.eyebrow}</p>
      <h2>{Array.isArray(c.title) ? c.title.map((line, i) => <span key={line} className="line">{i > 0 && ' '}{line}</span>) : c.title}</h2>
      <p className="lede">{c.lede}</p>
      <div className="contact-grid">
        <form onSubmit={submit} ref={formRef}>
          <input type="checkbox" name="botcheck" ref={trapRef} className="trap" tabIndex={-1} autoComplete="off" aria-hidden="true" />
          {persona === 'engineer' && field('title', 'title', { placeholder: 'feat: let’s build something', required: true })}
          {field('name', persona === 'engineer' ? 'author' : 'Your name', { autoComplete: 'name', required: true })}
          {field('email', persona === 'engineer' ? 'email' : 'Your email', { type: 'email', autoComplete: 'email', required: true })}
          {persona === 'recruiter' && field('company', 'Company', { autoComplete: 'organization' })}
          {persona === 'recruiter' && field('role', 'Role you’re hiring for')}
          {field('message', persona === 'engineer' ? 'body' : persona === 'recruiter' ? 'Anything else? (optional)' : 'Message',
            { rows: persona === 'engineer' ? 4 : 3, required: persona !== 'recruiter', placeholder: persona === 'engineer' ? 'Context, constraints, what you’ve tried…' : undefined })}
          <button type="submit" disabled={sending}>{sending ? 'Sending…' : c.button}</button>
          <div className={`out ${status.type}`} role="status" aria-live="polite">{status.message}</div>
        </form>
        <Preview persona={persona} fields={fields} label={c.preview} onPoke={pointAtForm} />
      </div>
    </>
  );
}
