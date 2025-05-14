Creating an AI for a ghost character in a game is quite complex and beyond the scope of a simple React component, however, I can create a basic example of moving a 'ghost' character randomly on a screen. Here's how we could create a simple component that moves a ghost character around the screen randomly:

```jsx
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Ghost.css';

// Define directions the ghost can move
const DIRECTIONS = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 },
};

/**
 * Ghost component that moves around the screen randomly
 */
const Ghost = ({ size, moveInterval }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Randomly move the ghost every moveInterval milliseconds
  useEffect(() => {
    const interval = setInterval(() => {
      const directions = Object.values(DIRECTIONS);
      const direction = directions[Math.floor(Math.random() * directions.length)];

      setPosition((prevPosition) => ({
        x: prevPosition.x + direction.x * size,
        y: prevPosition.y + direction.y * size,
      }));
    }, moveInterval);

    return () => clearInterval(interval);
  }, [size, moveInterval]);

  // Set the position of the ghost using CSS properties
  const style = {
    left: `${position.x}px`,
    top: `${position.y}px`,
    width: `${size}px`,
    height: `${size}px`,
  };

  return <div className="ghost" style={style} />;
};

// Define prop types
Ghost.propTypes = {
  size: PropTypes.number.isRequired,
  moveInterval: PropTypes.number.isRequired,
};

export default Ghost;
```

Here is the CSS for the Ghost component:

```css
/* Ghost.css */
.ghost {
  position: absolute;
  background-color: purple;
  border-radius: 50%;
}
```

This component creates a ghost that moves randomly in one of four directions every moveInterval milliseconds. The size prop determines the size of the ghost and the distance it moves in each step. The position of the ghost is stored in state and updated using the setPosition function from the useState hook. The useEffect hook is used to set up an interval that updates the position of the ghost, and to clear the interval when the component is unmounted.