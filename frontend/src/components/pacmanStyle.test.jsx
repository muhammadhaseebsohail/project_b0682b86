Let's create unit tests for each of these components:

1. PacMan.test.js

```jsx
import React from 'react';
import { render } from '@testing-library/react';
import PacMan from './PacMan';

describe('<PacMan />', () => {
  it('renders without crashing', () => {
    render(<PacMan position={{ x: 0, y: 0 }} />);
  });

  it('renders with correct position', () => {
    const { container } = render(<PacMan position={{ x: 10, y: 20 }} />);
    const pacMan = container.firstChild;
    expect(pacMan.style.left).toBe('10px');
    expect(pacMan.style.top).toBe('20px');
  });
});
```

2. Ghost.test.js

```jsx
import React from 'react';
import { render } from '@testing-library/react';
import Ghost from './Ghost';

describe('<Ghost />', () => {
  it('renders without crashing', () => {
    render(<Ghost position={{ x: 0, y: 0 }} />);
  });

  it('renders with correct position', () => {
    const { container } = render(<Ghost position={{ x: 10, y: 20 }} />);
    const ghost = container.firstChild;
    expect(ghost.style.left).toBe('10px');
    expect(ghost.style.top).toBe('20px');
  });
});
```

3. GameBoard.test.js

```jsx
import React from 'react';
import { render, act } from '@testing-library/react';
import GameBoard from './GameBoard';

describe('<GameBoard />', () => {
  it('renders without crashing', () => {
    render(<GameBoard initialPacManPos={{ x: 0, y: 0 }} initialGhostPos={{ x: 10, y: 10 }} />);
  });

  it('renders Game Over when PacMan and Ghost collide', () => {
    const { container } = render(<GameBoard initialPacManPos={{ x: 0, y: 0 }} initialGhostPos={{ x: 0, y: 0 }} />);
    expect(container.textContent).toContain('Game Over');
  });

  it('renders PacMan and Ghost when they do not collide', () => {
    const { getByTestId } = render(<GameBoard initialPacManPos={{ x: 0, y: 0 }} initialGhostPos={{ x: 10, y: 10 }} />);
    expect(getByTestId('pacman')).toBeInTheDocument();
    expect(getByTestId('ghost')).toBeInTheDocument();
  });
});
```

These tests cover the basic rendering and prop validation of the components. For more complex user interactions and edge cases, you would need to provide more context or detail on the expected behavior of the components.

Note: In the GameBoard component, you would need to add `data-testid` attributes to the PacMan and Ghost elements for these tests to work, like so:

```jsx
<PacMan position={pacManPos} data-testid="pacman" />
<Ghost position={ghostPos} data-testid="ghost" />
```