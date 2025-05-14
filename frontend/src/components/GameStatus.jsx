Here's how you could create a GameStatus component that tracks the win or loss conditions for a game. This component assumes the game has a score that determines the game's outcome. The component has a 'score' prop and two constants, WINNING_SCORE and LOSING_SCORE, that determine the win and loss conditions.

```jsx
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./GameStatus.css";

/**
 * GameStatus component
 * @param {Object} props - props passed from parent component
 * @param {number} props.score - current game score
 * @returns {React.Node} - React component
 */
const GameStatus = ({ score }) => {
  const WINNING_SCORE = 100;
  const LOSING_SCORE = 0;

  const [gameStatus, setGameStatus] = useState("");

  useEffect(() => {
    if (score >= WINNING_SCORE) {
      setGameStatus("You won the game!");
    } else if (score <= LOSING_SCORE) {
      setGameStatus("You lost the game.");
    } else {
      setGameStatus("Game in progress...");
    }
  }, [score]);

  return (
    <div className="game-status">
      <h2>{gameStatus}</h2>
    </div>
  );
};

GameStatus.propTypes = {
  score: PropTypes.number.isRequired,
};

export default GameStatus;
```

Here's the necessary CSS:

```css
/* GameStatus.css */
.game-status {
  text-align: center;
  padding: 10px;
  margin-top: 30px;
  background-color: #f7f7f7;
  border-radius: 4px;
  box-shadow: 0px 0px 5px rgba(0,0,0,0.1);
}
.game-status h2 {
  color: #333;
}
```

In this component, we use React hooks to manage the game's status based on the score. We use the `useEffect` hook to update the game's status whenever the score prop changes. The CSS styles the component for better visibility. The PropTypes enforce that the `score` prop must be a number.