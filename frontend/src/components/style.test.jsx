```jsx
// Necessary imports
import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import HighScore from './HighScore'; // assuming the component is exported from 'HighScore.js'

// Mock the fetch function
global.fetch = jest.fn(() => 
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ highScore: 100 }),
  })
);

beforeEach(() => {
  fetch.mockClear();
});

// Test cases

test('renders without crashing', () => {
  const { container } = render(<HighScore url='http://test.com' />);
  expect(container).toBeTruthy();
});

test('shows loading state', () => {
  render(<HighScore url='http://test.com' />);
  expect(screen.getByText('Loading...')).toBeInTheDocument();
});

test('loads and displays high score', async () => {
  render(<HighScore url='http://test.com' />);
  await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
  expect(screen.getByText('High Score: 100')).toBeInTheDocument();
});

test('handles error when loading score', async () => {
  fetch.mockImplementationOnce(() => Promise.reject('API is down'));
  render(<HighScore url='http://test.com' />);
  await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
  expect(screen.getByText('Error: API is down')).toBeInTheDocument();
});

test('saves new high score', async () => {
  const { getByText } = render(<HighScore url='http://test.com' />);
  await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
  fireEvent.click(getByText('Save High Score'));
  await waitFor(() => expect(fetch).toHaveBeenCalledTimes(2));
  expect(screen.getByText('High Score: 100')).toBeInTheDocument();
});

test('handles error when saving score', async () => {
  fetch.mockImplementationOnce(() => Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ highScore: 100 }),
  }));

  fetch.mockImplementationOnce(() => Promise.reject('API is down'));

  const { getByText } = render(<HighScore url='http://test.com' />);
  await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
  fireEvent.click(getByText('Save High Score'));
  await waitFor(() => expect(fetch).toHaveBeenCalledTimes(2));
  expect(screen.getByText('Error: API is down')).toBeInTheDocument();
});

test('does not render when url prop is missing', () => {
  console.error = jest.fn();

  render(<HighScore />);
  expect(console.error).toHaveBeenCalledTimes(1);
});
```

This set of tests covers the main functionality of the `HighScore` component. It checks that the component renders without crashing, shows a loading state, properly loads and displays the high score, handles errors when loading the score, saves new high scores, and handles errors when saving the score. It also includes a test for when the required `url` prop is missing.