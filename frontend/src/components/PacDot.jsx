Sure, let's create a PacDot component that represents a dot for Pac-Man to eat. We'll use TypeScript for type-checking and CSS-in-JS for the styling. 

```jsx
// PacDot.tsx

// Importing necessary modules
import React from 'react';

// TypeScript interface for PacDot props
interface PacDotProps {
  eaten: boolean;
}

// PacDot functional component
const PacDot: React.FC<PacDotProps> = ({ eaten }) => {
  return <div className={`pac-dot ${eaten ? "eaten" : ""}`}></div>;
};

export default PacDot;
```

And here is the CSS-in-JS styling for the dot:

```css
// PacDot.css

.pac-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #fff;
  visibility: visible;
}

.pac-dot.eaten {
  visibility: hidden;
}
```

In the above component, we are rendering a `div` with the class `pac-dot`. If the `eaten` prop is `true`, we are adding an additional class `eaten` which will hide the dot.