Here's an example of a functional component that could be used to implement bonus fruits for extra points. This component takes a `bonusFruits` prop, which should be an array of objects, each representing a bonus fruit. Each bonus fruit object should have a `name`, `image`, and `bonusPoints` property.

```jsx
// Necessary Imports
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Styled Components for CSS-in-JS
const FruitList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const FruitItem = styled.li`
  list-style: none;
  margin: 10px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  text-align: center;
`;

// PropTypes
const propTypes = {
  bonusFruits: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      bonusPoints: PropTypes.number.isRequired,
    })
  ).isRequired,
};

// Main Component
const BonusFruitList = ({ bonusFruits }) => {

  // we could use this state to show some loading indication
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!bonusFruits || bonusFruits.length === 0) {
    return <p>No bonus fruits available</p>;
  }

  return (
    <FruitList>
      {bonusFruits.map((fruit, index) => (
        <FruitItem key={index}>
          <img src={fruit.image} alt={fruit.name} />
          <h2>{fruit.name}</h2>
          <p>+ {fruit.bonusPoints} points</p>
        </FruitItem>
      ))}
    </FruitList>
  );
};

BonusFruitList.propTypes = propTypes;

export default BonusFruitList;
```
This component takes an array of `bonusFruits` as prop, maps over that array, and creates a styled list item for each fruit. Each list item includes the fruit's image, name, and bonus points. 

The component also has a loading state, although it's not used in this example. In a real-world application, you might fetch the list of bonus fruits from an API and display a loading indicator while the request is in progress.

The component also handles the case when there is no bonus fruit available. It displays a message to the user in this case. 

The component uses PropTypes to validate that the `bonusFruits` prop is an array of objects, and that each object has the required properties.