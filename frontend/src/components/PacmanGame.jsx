Here's a simple example of a Pac-Man like game layout using a 2D array to represent the game board. This example uses React and CSS-in-JS for styling. It doesn't include actual game logic.

1. Component Code:

```javascript
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './PacmanGame.css';

/**
 * PacmanGame component
 * @param {Array<Array<number>>} props.layout - 2D array representing game layout
 */
const PacmanGame = ({ layout }) => {
  const [gameLayout, setGameLayout] = useState(layout);

  return (
    <div className="pacman-game">
      {gameLayout.map((row, i) => (
        <div key={i} className="row">
          {row.map((cell, j) => (
            <div key={j} className={`cell cell-${cell}`}></div>
          ))}
        </div>
      ))}
    </div>
  );
};

PacmanGame.propTypes = {
  layout: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
};

export default PacmanGame;
```

2. CSS/Styling:

```css
/* PacmanGame.css */

.pacman-game {
  display: flex;
  flex-direction: column;
  width: max-content;
}

.row {
  display: flex;
}

.cell {
  width: 20px;
  height: 20px;
}

.cell-0 {
  background-color: black;
}

.cell-1 {
  background-color: yellow;
}

.cell-2 {
  background-color: blue;
}
```

3. PropTypes:

```javascript
PacmanGame.propTypes = {
  layout: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
};
```

4. Export Statements:

```javascript
export default PacmanGame;
```

In this example, a 2D array is used to represent the game layout. The numbers in the array represent different types of cells: 0 for walls, 1 for Pac-Man, and 2 for dots. This is a very simplified version of a Pac-Man game and doesn't include any game logic or interactivity. It only displays the game layout. Note that proper keys are used when mapping over the layout array to prevent any potential issues with React's diffing algorithm.