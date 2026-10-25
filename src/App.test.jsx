import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

const hero = () => document.querySelector('.hero h1');

beforeEach(() => {
  window.localStorage.clear();
  window.history.replaceState(null, '', '/');
  vi.restoreAllMocks();
});

test('shows nothing but the question until a persona is picked', async () => {
  const user = userEvent.setup();
  window.localStorage.setItem('persona', 'engineer'); // an old remembered choice must not skip the question
  render(<App />);
  expect(screen.getByRole('heading', { level: 1, name: /who’s scrolling/i })).toBeInTheDocument();
  expect(hero()).toBeNull();
  expect(screen.queryByRole('group', { name: /switch persona/i })).toBeNull();

  const chooser = screen.getByRole('group', { name: /choose how you want to read/i });
  await user.click(within(chooser).getAllByRole('button')[2]);
  expect(hero()).toHaveTextContent("Hi, I'm Manuel. I make computers do useful things.");
  expect(window.location.hash).toBe('#curious');
});

test('each persona rewrites the page', async () => {
  const user = userEvent.setup();
  window.history.replaceState(null, '', '/#curious');
  render(<App />);
  const lens = screen.getByRole('group', { name: /switch persona/i });

  await user.click(within(lens).getByRole('button', { name: 'Recruiter' }));
  expect(hero()).toHaveTextContent('Manuel Lopes, Software Engineer');
  expect(screen.getByText(/\d+ roles in \d+ years/i)).toBeInTheDocument();
  expect(window.location.hash).toBe('#recruiter');

  await user.click(within(lens).getByRole('button', { name: 'Engineer' }));
  expect(hero()).toHaveTextContent('Kotlin by day, side projects by night');
  expect(screen.getByText('Stack and trade-offs')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'francesinhas.top' })).toHaveAttribute('href', 'https://francesinhas.top');

  await user.click(within(lens).getByRole('button', { name: 'Curious' }));
  expect(screen.getByText('How I got here')).toBeInTheDocument();
});

test('private repositories never link to their code, and the GitHub profile comes last', () => {
  window.history.replaceState(null, '', '/#engineer');
  render(<App />);
  const projects = document.querySelector('#projects');
  const codeLinks = within(projects).getAllByRole('link', { name: /code on github/i }).map((a) => a.getAttribute('href'));
  ['aura-league', 'radar-real-estate', 'francesinhas', 'real-estate-lead-ops'].forEach((repo) => {
    expect(codeLinks.some((h) => h.endsWith(`/${repo}`))).toBe(false);
  });
  expect(within(projects).getAllByText('Private repo').length).toBeGreaterThan(0);
  expect(within(projects).getByRole('link', { name: /aura league|auraleague\.app/i })).toHaveAttribute('href', 'https://auraleague.app');
  const cards = projects.querySelectorAll('.cards > *');
  expect(cards[cards.length - 1]).toHaveAttribute('href', 'https://github.com/ManuelCLopes');
});

test('recruiter and curious list the GitHub profile after the smaller projects, not as a card', async () => {
  const user = userEvent.setup();
  window.history.replaceState(null, '', '/#recruiter');
  render(<App />);
  for (const name of ['Recruiter', 'Curious']) {
    await user.click(within(screen.getByRole('group', { name: /switch persona/i })).getByRole('button', { name }));
    const projects = document.querySelector('#projects');
    expect(projects.querySelector('.cards a.more')).toBeNull();
    const rows = projects.querySelectorAll('.mini li');
    expect(within(rows[rows.length - 1]).getByRole('link')).toHaveAttribute('href', 'https://github.com/ManuelCLopes');
  }
});

test('opens the persona from the link hash', () => {
  window.history.replaceState(null, '', '/#engineer');
  render(<App />);
  expect(hero()).toHaveTextContent('Kotlin by day');
});

test('the contact form posts name, email and a persona-tagged message', async () => {
  const fetchMock = vi.spyOn(window, 'fetch').mockResolvedValue(new Response('{}', { status: 200 }));
  const user = userEvent.setup();
  window.history.replaceState(null, '', '/#recruiter');
  render(<App />);

  await user.type(screen.getByLabelText('Your name'), 'Ana');
  await user.type(screen.getByLabelText('Your email'), 'ana@example.com');
  await user.type(screen.getByLabelText('Company'), 'Acme');
  await user.type(screen.getByLabelText('Role you’re hiring for'), 'Backend Engineer');
  await user.click(screen.getByRole('button', { name: 'Send the opportunity' }));

  expect(fetchMock).toHaveBeenCalledTimes(1);
  const [url, init] = fetchMock.mock.calls[0];
  expect(url).toMatch(/\/api\/send-email$/);
  const body = JSON.parse(init.body);
  expect(body).toMatchObject({ name: 'Ana', email: 'ana@example.com' });
  expect(body.message).toContain('[Recruiter] Company: Acme');
  expect(body.message).toContain('Role: Backend Engineer');
  expect(await screen.findByRole('status')).toHaveTextContent(/received/i);
});

test('clicking the message preview points the visitor to the first empty field', async () => {
  const user = userEvent.setup();
  window.history.replaceState(null, '', '/#recruiter');
  render(<App />);
  await user.type(screen.getByLabelText('Your name'), 'Ana');
  await user.click(document.querySelector('.preview .mail'));
  expect(screen.getByLabelText('Your email')).toHaveFocus();
  expect(screen.getByLabelText('Your email')).toHaveClass('nudge');
});
