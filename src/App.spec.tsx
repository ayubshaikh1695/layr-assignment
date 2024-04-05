import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

test('renders the correct content', () => {
  // Render the component
  render(<App />);

  // Use queries to find elements, and assert their content
  expect(screen.getByText('App Component')).toBeInTheDocument();
});
