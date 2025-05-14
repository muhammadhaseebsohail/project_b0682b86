Here is the comprehensive unit tests for the GameStatus component:

```jsx
import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import GameStatus from './GameStatus';

afterEach(cleanup);

describe('GameStatus', () => {
  it('renders without crashing', () => {
    const { getByText } = render(<GameStatus score={50} />);
    expect(getByText('Game in progress...')).toBeInTheDocument();
  });

  it('renders win message when score >= 100', () => {
    const { getByText } = render(<GameStatus score={100} />);
    expect(getByText('You won the game!')).toBeInTheDocument();
  });

  it('renders loss message when score <= 0', () => {
    const { getByText } = render(<GameStatus score={0} />);
    expect(getByText('You lost the game.')).toBeInTheDocument();
  });

  it('throws an error if score is not a number', () => {
    console.error = jest.fn();

    expect(() => {
      render(<GameStatus score={'not a number'} />);
    }).toThrowError();

    expect(console.error).toBeCalledWith(expect.stringContaining('Failed prop type'));
  });

  it('renders "Game in progress..." when score is within the range', () => {
    const { getByText } = render(<GameStatus score={50} />);
    expect(getByText('Game in progress...')).toBeInTheDocument();
  });
});
```

In these tests:

- We first import the necessary libraries and components.
- `afterEach(cleanup)` is used to unmount or cleanup the DOM after the test is finished.
- Then we define a test suite for the GameStatus component using `describe`.
- Inside the suite, we have individual tests (`it` or `test` blocks).
- In each test, we render the component with different props and check if it behaves as expected.
- We use `getByText` query from RTL to select DOM elements and `toBeInTheDocument` from jest-dom for the assertion.
- We also use `console.error = jest.fn();` to mock the console.error method because when an incorrect prop type is passed to the component, a console.error warning is thrown by PropTypes and we don't want this to appear in our test results.
- The test 'throws an error if score is not a number' checks for the prop validation by supplying a wrong prop and expecting an error.
- The last test checks for the edge case where the score is in between the winning and losing scores. It expects the game status to be "Game in progress...".