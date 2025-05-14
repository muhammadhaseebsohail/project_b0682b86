Here's an example of a functional component in React that connects to the backend to load and save high scores using the fetch API:

```jsx
// Necessary imports
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Style object for the component
const style = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  score: {
    fontSize: '24px',
    fontWeight: 'bold',
  },
};

/**
 * HighScore component to save and load high scores
 * @param {object} props - Component props
 * @param {string} props.url - The backend URL to fetch and save high scores
 */
const HighScore = ({ url }) => {
  const [highScore, setHighScore] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  
  // Load high score from backend once the component mounts
  useEffect(() => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error loading high score');
        }
        return response.json();
      })
      .then((data) => {
        setHighScore(data.highScore);
        setIsLoading(false);
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setIsLoading(false);
      });
  }, [url]);

  // Save high score to backend
  const saveHighScore = async (score) => {
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ highScore: score }),
      });

      if (!response.ok) {
        throw new Error('Error saving high score');
      }

      setHighScore(score);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div style={style.container}>
      {isLoading ? (
        <p>Loading...</p>
      ) : errorMessage ? (
        <p>Error: {errorMessage}</p>
      ) : (
        <p style={style.score}>High Score: {highScore}</p>
      )}
      {/* Replace the onClick function with a function that gets the new score */}
      <button onClick={() => saveHighScore(100)}>Save High Score</button>
    </div>
  );
};

// PropTypes for the component
HighScore.propTypes = {
  url: PropTypes.string.isRequired,
};

export default HighScore;
```

This component expects a `url` prop which is the URL to fetch and save high scores. It maintains `highScore`, `isLoading`, and `errorMessage` state variables to track the high score, loading state, and any errors respectively. It fetches the high score from the backend when the component mounts and provides a `saveHighScore` function to save new high scores.

The render function displays a loading message while the high score is loading, an error message if there was an error, or the high score once it's loaded. It also includes a button to save a new high score.