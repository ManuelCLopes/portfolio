import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the portfolio sections', () => {
  render(<App />);
  expect(screen.getByText(/Tech roles that shaped my journey/i)).toBeInTheDocument();
  expect(screen.getByText(/Words I’ve compiled while not compiling code/i)).toBeInTheDocument();
  expect(screen.getByText(/Let's discuss some ideas/i)).toBeInTheDocument();
});
