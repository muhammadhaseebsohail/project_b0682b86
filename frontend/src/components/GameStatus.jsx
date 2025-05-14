Here is a simple functional component named `GameStatus` in React using hooks to implement a score tracking and lives system.

```jsx
// Necessary imports
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './GameStatus.css';

/**
 * GameStatus component to track score and lives of a player
 * @param {object} props - Component props
 * @param {number} props.initialScore - Initial score of the player
 * @param {number} props.initialLives - Initial number of lives of the player
 */
const GameStatus = ({ initialScore, initialLives }) => {
  const [score, setScore] = useState(initialScore);
  const [lives, setLives] = useState(initialLives);

  // Handlers for score and lives
  const handleScoreIncrease = () => setScore(score + 1);
  const handleLiveLoss = () => setLives(lives - 1);

  return (
    <div className="game-status">
      <div className="score">
        <h2>Score: {score}</h2>
        <button onClick={handleScoreIncrease}>Increase Score</button>
      </div>
      <div className="lives">
        <h2>Lives: {lives}</h2>
        {lives > 0 ? (
          <button onClick={handleLiveLoss}>Lose Life</button>
        ) : (
          <p>No more lives left!</p>
        )}
      </div>
    </div>
  );
};

// Prop Types for component checking
GameStatus.propTypes = {
  initialScore: PropTypes.number.isRequired,
  initialLives: PropTypes.number.isRequired,
};

// Exporting component
export default GameStatus;
```

CSS styling using CSS Modules:

```css
/* GameStatus.css */
.game-status {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background-color: #f4f4f4;
  color: #333;
  margin-bottom: 20px;
}

.score, .lives {
  display: flex;
  flex-direction: column;
}

button {
  margin-top: 10px;
  padding: 10px 20px;
  border: none;
  background-color: #333;
  color: #fff;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
```

The `GameStatus` component receives two initial values for score and lives. It then manages its state using the React `useState` hook, and provides two functions to increase the score and decrease the lives. The score will always increase by 1 when the score button is clicked, and the lives will decrease by 1 when the lives button is clicked, provided there are any lives left. If there are no lives left, the lives button will be disabled and a message will be displayed.