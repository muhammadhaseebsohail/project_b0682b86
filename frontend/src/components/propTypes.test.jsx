Here is how you could write comprehensive unit tests for the BonusFruitList component using Jest and React Testing Library:

```jsx
// Necessary Imports
import React from 'react';
import { render, screen } from '@testing-library/react';
import BonusFruitList from './BonusFruitList'; // path to your component

// Test data
const bonusFruits = [
  {
    name: "Banana",
    image: "banana.jpg",
    bonusPoints: 10
  },
  {
    name: "Apple",
    image: "apple.jpg",
    bonusPoints: 20
  }
];

// Tests
describe('BonusFruitList', () => {

  it('renders without crashing', () => {
    render(<BonusFruitList bonusFruits={bonusFruits} />);
  });

  it('renders loading state', () => {
    const { rerender } = render(<BonusFruitList bonusFruits={[]} />);
    rerender(<BonusFruitList bonusFruits={bonusFruits} isLoading={true} />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders correct number of fruits', () => {
    render(<BonusFruitList bonusFruits={bonusFruits} />);
    expect(screen.getAllByRole('listitem')).toHaveLength(bonusFruits.length);
  });

  it('renders fruit details correctly', () => {
    render(<BonusFruitList bonusFruits={bonusFruits} />);
    bonusFruits.forEach((fruit) => {
      expect(screen.getByText(fruit.name)).toBeInTheDocument();
      expect(screen.getByText(`+ ${fruit.bonusPoints} points`)).toBeInTheDocument();
    });
  });

  it('renders no bonus fruits available message when no fruits are provided', () => {
    render(<BonusFruitList bonusFruits={[]} />);
    expect(screen.getByText('No bonus fruits available')).toBeInTheDocument();
  });

  it('throws error when bonusFruits prop is missing', () => {
    console.error = jest.fn(); // suppress console.error from PropTypes
    expect(() => render(<BonusFruitList />)).toThrow();
    expect(console.error).toHaveBeenCalled(); // PropTypes should log an error
  });
});
```

In this test suite, we're doing the following:

- Checking that the component renders without crashing
- Testing that the loading state renders correctly
- Asserting that the correct number of fruits is rendered
- Checking that the details of each fruit are displayed correctly
- Verifying that a message is displayed when no fruits are available
- Making sure an error is thrown when the `bonusFruits` prop is missing (this tests the PropTypes validation)