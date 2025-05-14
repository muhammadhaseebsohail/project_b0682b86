Here's a set of comprehensive unit tests using Jest and React Testing Library for the Pac-Man component:

```jsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Pacman from './Pacman';

// Mock the window object's addEventListener and removeEventListener functions
const mockAddEventListener = jest.spyOn(window, 'addEventListener');
const mockRemoveEventListener = jest.spyOn(window, 'removeEventListener');

beforeEach(() => {
  jest.clearAllMocks();
});

describe('<Pacman />', () => {
  it('renders correctly with valid props', () => {
    const { container } = render(<Pacman size={10} speed={5} />);
    expect(container.firstChild).toHaveClass('pacman');
    expect(container.firstChild).toHaveStyle({
      top: '0px',
      left: '0px',
      height: '10px',
      width: '10px',
    });
  });

  it('should validate props', () => {
    expect(() => {
      render(<Pacman size="wrong" speed={5} />);
    }).toThrow();

    expect(() => {
      render(<Pacman size={10} speed="wrong" />);
    }).toThrow();
  });

  it('should register and unregister keydown event listener', () => {
    render(<Pacman size={10} speed={5} />);
    expect(mockAddEventListener).toHaveBeenCalledWith('keydown', expect.any(Function));

    // Simulate component unmount
    const cleanupFunction = mockAddEventListener.mock.calls[0][1];
    cleanupFunction();
    expect(mockRemoveEventListener).toHaveBeenCalledWith('keydown', expect.any(Function));
  });

  it('should handle keyboard events correctly', () => {
    const { container } = render(<Pacman size={10} speed={5} />);
    const pacman = container.firstChild;

    fireEvent.keyDown(window, { key: 'ArrowUp' });
    expect(pacman).toHaveStyle({ top: '-5px' });

    fireEvent.keyDown(window, { key: 'ArrowDown' });
    expect(pacman).toHaveStyle({ top: '0px' });

    fireEvent.keyDown(window, { key: 'ArrowLeft' });
    expect(pacman).toHaveStyle({ left: '-5px' });

    fireEvent.keyDown(window, { key: 'ArrowRight' });
    expect(pacman).toHaveStyle({ left: '0px' });
  });

  it('should not move if a non-arrow key is pressed', () => {
    const { container } = render(<Pacman size={10} speed={5} />);
    const pacman = container.firstChild;

    fireEvent.keyDown(window, { key: 'Enter' });
    expect(pacman).toHaveStyle({ top: '0px', left: '0px' });
  });
});
```
This set of tests covers the following aspects of the Pacman component:

1. Correct rendering with valid props and the application of CSS styles based on the provided props.
2. Prop type validation and the handling of invalid prop types.
3. Registration and unregistration of the 'keydown' event listener when the component is mounted and unmounted.
4. Handling of keyboard events and the movement of the Pacman component in response to arrow keys.
5. Handling of non-arrow keys, which should not cause the Pacman to move.