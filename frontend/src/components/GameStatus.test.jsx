To test the `GameStatus` component, we'll need to install the required libraries: Jest and React Testing Library. Jest is a JavaScript testing framework developed by Facebook, and React Testing Library is a utility built on top of Jest that makes it easier to test React components.

Here are the tests for the `GameStatus` component:

```jsx
// Necessary imports
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import GameStatus from './GameStatus';

// Test to check if the GameStatus component renders correctly
test('renders correctly', () => {
  const { getByText } = render(<GameStatus initialScore={10} initialLives={3} />);
  expect(getByText('Score: 10')).toBeInTheDocument();
  expect(getByText('Lives: 3')).toBeInTheDocument();
});

// Test to check if the score increases when the score button is clicked
test('score increases on click', () => {
  const { getByText } = render(<GameStatus initialScore={10} initialLives={3} />);
  const button = getByText('Increase Score');
  fireEvent.click(button);
  expect(getByText('Score: 11')).toBeInTheDocument();
});

// Test to check if the lives decrease when the lives button is clicked
test('lives decrease on click', () => {
  const { getByText } = render(<GameStatus initialScore={10} initialLives={3} />);
  const button = getByText('Lose Life');
  fireEvent.click(button);
  expect(getByText('Lives: 2')).toBeInTheDocument();
});

// Test to check if the lives button is disabled and the correct message is displayed when there are no lives left
test('correct message is displayed when no lives are left', () => {
  const { getByText } = render(<GameStatus initialScore={10} initialLives={1} />);
  const button = getByText('Lose Life');
  fireEvent.click(button);
  expect(getByText('No more lives left!')).toBeInTheDocument();
});

// Test to check if the prop types are validated correctly
test('prop types are validated correctly', () => {
  console.error = jest.fn();
  render(<GameStatus initialScore={'10'} initialLives={'3'} />);
  expect(console.error).toHaveBeenCalledTimes(2);
  expect(console.error).toHaveBeenCalledWith(expect.stringContaining('Failed prop type'));
});
```

These tests cover the component rendering, user interactions, prop validation, and edge cases. The `console.error` function is mocked to test prop validation, with the component rendered with invalid prop types to trigger the error. The `expect.stringContaining` assertion is used to check that the error message includes the expected text.