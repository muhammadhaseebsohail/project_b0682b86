Here's how you might write tests for this component using Jest and React Testing Library:

```jsx
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import TaskCard from './TaskCard';

describe('TaskCard', () => {
  const defaultProps = {
    task: 'Test task',
    requirements: ['Requirement 1', 'Requirement 2'],
  };

  it('renders without crashing', () => {
    const { getByText } = render(<TaskCard {...defaultProps} />);
    expect(getByText(defaultProps.task)).toBeInTheDocument();
    expect(getByText(defaultProps.requirements[0])).toBeInTheDocument();
    expect(getByText(defaultProps.requirements[1])).toBeInTheDocument();
  });

  it('shows loading indicator when task starts', async () => {
    const { getByText, getByRole } = render(<TaskCard {...defaultProps} />);
    fireEvent.click(getByText('Start Task'));
    await waitFor(() => expect(getByRole('progressbar')).toBeInTheDocument());
  });

  it('hides loading indicator when task finishes', async () => {
    jest.useFakeTimers();
    const { getByText, queryByRole } = render(<TaskCard {...defaultProps} />);
    fireEvent.click(getByText('Start Task'));
    jest.runAllTimers();
    await waitFor(() => expect(queryByRole('progressbar')).not.toBeInTheDocument());
  });

  it('throws error when no task is provided', () => {
    expect(() => render(<TaskCard {...defaultProps} task="" />)).toThrow();
  });

  it('renders correctly even with no requirements', () => {
    const { getByText } = render(<TaskCard {...defaultProps} requirements={[]} />);
    expect(getByText(defaultProps.task)).toBeInTheDocument();
  });
});
```

In these tests, we cover:

- Component rendering: We check that the component renders without crashing, and that the task and requirements are displayed correctly.
- User interactions: We simulate a user clicking the 'Start Task' button and check that the loading indicator is shown and then hidden.
- Props validation: We make sure that an error is thrown when no task is supplied. (This isn't a built-in feature of the component or of TypeScript, so for this test to pass, you'd need to add some additional error checking to your component.)
- Edge cases: We test that the component still renders correctly even when no requirements are provided.

Note: These tests assume that the `handleTask` function is asynchronous and takes some time to complete. If the function is synchronous or completes very quickly, you may need to adjust the tests to account for this.