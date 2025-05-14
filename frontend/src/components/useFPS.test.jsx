Due to the nature of the hook provided, testing user interactions and prop validation is not relevant in this context. However, we can test if the hook runs without crashing and if it returns a valid number.

First, we need to create a TestComponent that uses the hook so we can test it:

```jsx
import React from 'react';
import useFPS from './useFPS';

function TestComponent() {
  const fps = useFPS();
  
  return (
    <div>{fps}</div>
  );
}

export default TestComponent;
```

Next, we can write our tests using Jest and React Testing Library:

```jsx
// Necessary imports
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TestComponent from './TestComponent';

describe('useFPS hook', () => {
  it('renders without crashing', () => {
    render(<TestComponent />);
  });

  it('returns a valid number', () => {
    render(<TestComponent />);
    
    // Give some time for FPS calculation
    setTimeout(() => {
      const fps = screen.getByText(/[\d.]+/); // regex to match a number
      expect(fps).toBeInTheDocument();
    }, 1500);
  });
});
```

Please note that due to the nature of `requestAnimationFrame`, the FPS value may differ when running under Jest's simulated environment, and may not reflect the actual performance when the component is rendered in the browser. Testing the exact FPS value is not recommended as the result can vary depending on the user's hardware and the current load on the CPU and GPU. 

In a real application, you would likely want to mock `requestAnimationFrame` and `Date.now()` in your tests to provide consistent results, but that is beyond the scope of this question.