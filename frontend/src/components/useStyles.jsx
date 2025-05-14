Here's a simplified version of a player-controlled Pac-Man component in React. We'll use functional components with hooks and CSS-in-JS styling.

Below is the complete code for the component.

```jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';

// Define the styles for the Pac-Man component
const useStyles = createUseStyles({
  pacman: {
    position: 'absolute',
    transition: 'top 0.2s, left 0.2s',
  },
});

// This component's props interface
interface PacmanProps {
  size: number;
  speed: number;
}

const Pacman: React.FC<PacmanProps> = ({ size, speed }) => {
  const classes = useStyles();

  // Initialize Pac-Man's position
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Handle the keyboard events
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowUp':
          setPosition((prev) => ({ ...prev, y: prev.y - speed }));
          break;
        case 'ArrowDown':
          setPosition((prev) => ({ ...prev, y: prev.y + speed }));
          break;
        case 'ArrowLeft':
          setPosition((prev) => ({ ...prev, x: prev.x - speed }));
          break;
        case 'ArrowRight':
          setPosition((prev) => ({ ...prev, x: prev.x + speed }));
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Cleanup after the component is unmounted
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [speed]);

  return (
    <div
      className={classes.pacman}
      style={{ top: `${position.y}px`, left: `${position.x}px`, height: `${size}px`, width: `${size}px` }}
    />
  );
};

Pacman.propTypes = {
  size: PropTypes.number.isRequired,
  speed: PropTypes.number.isRequired,
};

export default Pacman;
```

Please note that this is a simplified version, and it doesn't include boundaries or any game logic. Also, the Pac-Man is represented by a square div here. You might want to replace it with a suitable image or a more complex element to make it look like the real Pac-Man.