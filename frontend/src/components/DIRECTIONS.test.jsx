Sure, here is the comprehensive unit test for the given React component:

```jsx
import React from 'react';
import { render, act } from '@testing-library/react';
import Ghost from './Ghost';

jest.useFakeTimers();

describe('Ghost component', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(<Ghost size={10} moveInterval={1000} />);
    expect(getByTestId('ghost')).toBeInTheDocument();
  });

  it('validates props', () => {
    expect(() => {
      render(<Ghost />);
    }).toThrow();

    expect(() => {
      render(<Ghost size={10} />);
    }).toThrow();

    expect(() => {
      render(<Ghost moveInterval={1000} />);
    }).toThrow();

    expect(() => {
      render(<Ghost size={10} moveInterval="1000" />);
    }).toThrow();

    expect(() => {
      render(<Ghost size="10" moveInterval={1000} />);
    }).toThrow();
  });

  it('moves ghost in random directions', () => {
    const { getByTestId } = render(<Ghost size={10} moveInterval={1000} />);
    
    const initialPosition = getByTestId('ghost').style;
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    const newPosition = getByTestId('ghost').style;

    expect(initialPosition).not.toEqual(newPosition);
  });

  it('does not move ghost if moveInterval is 0', () => {
    const { getByTestId } = render(<Ghost size={10} moveInterval={0} />);
    
    const initialPosition = getByTestId('ghost').style;
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    const newPosition = getByTestId('ghost').style;

    expect(initialPosition).toEqual(newPosition);
  });
});
```

For this test, you need to add `data-testid="ghost"` to the div in your Ghost component. This will give React Testing Library a hook to get the element for testing:

```jsx
return <div className="ghost" style={style} data-testid="ghost" />;
```

This test suite covers rendering, prop validation, and the moving functionality of the Ghost component. It uses Jest's timer mocks to control the setInterval used in the component. It also tests an edge case where moveInterval is 0, in which case the ghost should not move.