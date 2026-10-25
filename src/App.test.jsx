import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

const hero = () => document.querySelector('.hero h1');

beforeEach(() => {
  window.localStorage.clear();
  window.history.replaceState(null, '', '/');
  vi.restoreAllMocks();
});

test('asks who is scrolling and starts in the curious persona', () => {
  render(<App />);
  expect(screen.getByRole('heading', { level: 1, name: /who’s scrolling/i })).toBeInTheDocument();
  expect(hero()).toHaveTextContent("Hi, I'm Manuel. I make computers do useful things.");
});

test('each persona rewrites the page', async () => {
  const user = userEvent.setup();
  render(<App />);
  const lens = screen.getByRole('group', { name: /switch persona/i });

  await user.click(within(lens).getByRole('button', { name: 'Recruiter' }));
  expect(hero()).toHaveTextContent('Manuel Lopes, Software Engineer');
  expect(screen.getByText(/roles, zero gaps/i)).toBeInTheDocument();
  expect(window.location.hash).toBe('#recruiter');

  await user.click(within(lens).getByRole('button', { name: 'Engineer' }));
  expect(hero()).toHaveTextContent('Kotlin by day, side projects by night');
  expect(screen.getByText('Stack and trade-offs')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'francesinhas.top' })).toHaveAttribute('href', 'https://francesinhas.top');

  await user.click(within(lens).getByRole('button', { name: 'Curious' }));
  expect(screen.getByText('How I got here')).toBeInTheDocument();
});

test('private repositories never link to their code, and the GitHub profile card is last', () => {
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
