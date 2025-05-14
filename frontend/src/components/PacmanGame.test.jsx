Since the PacmanGame component only displays the game layout without any user interaction or game logic, we can only test the component rendering and props validation.

Here is how you can write tests for this component using Jest and React Testing Library:

1. Component Rendering:

```javascript
import { render } from '@testing-library/react';
import PacmanGame from './PacmanGame';

test('renders game layout correctly', () => {
  const layout = [
    [0, 0, 1, 0, 0],
    [0, 2, 2, 2, 0],
    [0, 0, 0, 0, 0],
  ];

  const { getAllByTestId } = render(<PacmanGame layout={layout} />);
  const cells = getAllByTestId('cell');

  expect(cells).toHaveLength(15);
  expect(cells[2].className).toContain('cell-1');
  expect(cells[4].className).toContain('cell-0');
  expect(cells[7].className).toContain('cell-2');
});
```

This test checks whether the component renders the correct number of cells with the correct classes based on the layout array.

2. Props Validation:

```javascript
import PropTypes from 'prop-types';
import { checkPropTypes } from 'prop-types';

test('throws error on invalid props', () => {
  const layout = [
    [0, 0, '1', 0, 0],
    [0, 2, 2, 2, 0],
    [0, 0, 0, 0, 0],
  ];

  const propsErrors = checkPropTypes(PacmanGame.propTypes, { layout }, 'prop', PacmanGame.name);

  expect(propsErrors).toBeDefined();
});
```

This test checks whether an error is thrown when an invalid layout array (containing a string instead of a number) is passed as a prop.

3. Edge cases:

```javascript
test('renders empty layout correctly', () => {
  const layout = [];

  const { getByTestId } = render(<PacmanGame layout={layout} />);
  const game = getByTestId('pacman-game');

  expect(game).toBeDefined();
  expect(game.children).toHaveLength(0);
});
```

This test checks whether the component renders correctly with an empty layout array.

Please note that you need to add `data-testid` attributes to the elements in your component to make these tests work. For example:

```javascript
<div data-testid="pacman-game" className="pacman-game">
  {gameLayout.map((row, i) => (
    <div key={i} className="row">
      {row.map((cell, j) => (
        <div data-testid="cell" key={j} className={`cell cell-${cell}`}></div>
      ))}
    </div>
  ))}
</div>
```

And don't forget to import jest at the top of your test file:

```javascript
import '@testing-library/jest-dom';
```