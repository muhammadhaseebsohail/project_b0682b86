Sure, here's how you can write comprehensive unit tests for the `PacDot` component using Jest and React Testing Library:

```jsx
// PacDot.test.tsx

// Importing necessary modules
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import PacDot from './PacDot';

// Test to check if the component renders without crashing
test('renders without crashing', () => {
  const { container } = render(<PacDot eaten={false} />);
  expect(container.firstChild).toHaveClass('pac-dot');
});

// Test to check if the component receives props correctly
test('receives props correctly', () => {
  const { container } = render(<PacDot eaten={false} />);
  expect(container.firstChild).not.toHaveClass('eaten');

  const { container: secondContainer } = render(<PacDot eaten={true} />);
  expect(secondContainer.firstChild).toHaveClass('eaten');
});

// Test to check if the component handles edge cases correctly
test('handles edge cases correctly', () => {
  const { rerender, container } = render(<PacDot eaten={false} />);
  expect(container.firstChild).not.toHaveClass('eaten');

  // Edge case: Changing props after initial render
  rerender(<PacDot eaten={true} />);
  expect(container.firstChild).toHaveClass('eaten');
});

// Test to simulate user interactions
test('simulates user interactions', () => {
  const { container } = render(<PacDot eaten={false} />);
  fireEvent.click(container.firstChild!);
  // Here, as PacDot component does not have any click handler, 
  // we cannot simulate any change on click event.
  // But this is how you'd generally simulate user interactions.
});
```

In the above tests, we are:

1. Checking if the component renders without crashing.
2. Checking if the `eaten` prop is received correctly by the component.
3. Checking if the component handles edge cases like changing props after initial render correctly.
4. Simulating a user interaction (click event) for the component.

Remember to install `@testing-library/react` and `jest` if they are not installed already.

```bash
npm install --save-dev @testing-library/react jest
```