Due to the complexity of the task, it's better to divide it into small components. The PacMan component, the Ghost component, and a GameBoard component to monitor the game state and handle collision detection.

Below is a simplified and abstract implementation of these components.

1. PacMan.js

```jsx
import React from 'react';
import PropTypes from 'prop-types';

// CSS in JS
const pacmanStyle = {
  position: 'absolute',
};

/**
 * PacMan component represents the player in the game
 */
const PacMan = ({ position }) => {
  return <div style={{ ...pacmanStyle, left: position.x, top: position.y }} />;
};

PacMan.propTypes = {
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
};

export default PacMan;
```

2. Ghost.js

```jsx
import React from 'react';
import PropTypes from 'prop-types';

// CSS in JS
const ghostStyle = {
  position: 'absolute',
};

/**
 * Ghost component represents the enemy in the game
 */
const Ghost = ({ position }) => {
  return <div style={{ ...ghostStyle, left: position.x, top: position.y }} />;
};

Ghost.propTypes = {
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
};

export default Ghost;
```

3. GameBoard.js

```jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PacMan from './PacMan';
import Ghost from './Ghost';

/**
 * Function to detect collision
 */
const detectCollision = (pacManPos, ghostPos) => {
  // Implement your own collision detection logic
  return pacManPos.x === ghostPos.x && pacManPos.y === ghostPos.y;
};

/**
 * GameBoard component that handles the game state and collision detection
 */
const GameBoard = ({ initialPacManPos, initialGhostPos }) => {
  const [pacManPos, setPacManPos] = useState(initialPacManPos);
  const [ghostPos, setGhostPos] = useState(initialGhostPos);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (detectCollision(pacManPos, ghostPos)) {
      setGameOver(true);
    }
  }, [pacManPos, ghostPos]);

  return (
    <div>
      {gameOver ? (
        <p>Game Over</p>
      ) : (
        <>
          <PacMan position={pacManPos} />
          <Ghost position={ghostPos} />
        </>
      )}
    </div>
  );
};

GameBoard.propTypes = {
  initialPacManPos: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  initialGhostPos: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
};

export default GameBoard;
```

Please note that this is an abstract representation and doesn't represent the full complexity of a Pac-Man game. The actual implementation would require a more complex state management, user interactions, multiple ghosts, and specific game rules.